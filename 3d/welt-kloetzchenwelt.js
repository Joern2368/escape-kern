document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-kristall\" viewBox=\"-20 -20 40 40\"><path d=\"M-10 -15h20v5h-20zM-15 -10h5v5h-5zM-5 -10h10v5h-10zM10 -10h5v5h-5zM-20 -5h40v5h-40zM-15 0h30v5h-30zM-10 5h20v5h-20zM-5 10h10v5h-10z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-apfel\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -20h10v5h-10zM-5 -15h5v5h-5zM-15 -10h10v5h-10zM0 -10h15v5h-15zM-20 -5h40v5h-40zM-20 0h40v5h-40zM-20 5h40v5h-40zM-15 10h30v5h-30zM-10 15h20v5h-20z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-blume\" viewBox=\"-20 -20 40 40\"><path d=\"M-10 -20h5v5h-5zM5 -20h5v5h-5zM-15 -15h30v5h-30zM-15 -10h10v5h-10zM5 -10h10v5h-10zM-15 -5h30v5h-30zM-10 0h5v5h-5zM5 0h5v5h-5zM-5 5h10v5h-10zM-15 10h5v5h-5zM-5 10h10v5h-10zM10 10h5v5h-5zM-10 15h20v5h-20z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-schluessel\" viewBox=\"-20 -20 40 40\"><path d=\"M-15 -15h15v5h-15zM-20 -10h5v5h-5zM0 -10h5v5h-5zM-20 -5h5v5h-5zM0 -5h20v5h-20zM-20 0h5v5h-5zM0 0h5v5h-5zM10 0h10v5h-10zM-15 5h15v5h-15zM10 5h5v5h-5z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-stern\" viewBox=\"-20 -20 40 40\"><path d=\"M-5 -20h10v5h-10zM-5 -15h10v5h-10zM-20 -10h40v5h-40zM-15 -5h30v5h-30zM-10 0h20v5h-20zM-15 5h10v5h-10zM5 5h10v5h-10zM-15 10h5v5h-5zM10 10h5v5h-5z\" fill=\"currentColor\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const R=(x,y,w,h,f)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;
const K=(x,y,w,h,f)=>{const b=Math.max(2,Math.min(6,Math.round(h/5)));return R(x,y,w,h,f)+R(x,y,w,b,'rgba(255,255,255,.28)')+R(x,y+h-b,w,b,'rgba(0,0,0,.22)')+`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`;};
function P(m,s,c,x,y,bev){
if(typeof c==='string')c=Object.fromEntries(c.split(' ').map(t=>[t[0],t.slice(1)]));
const z=m.split('|');x=x??-z[0].length*s/2;y=y??-z.length*s;let o='';
z.forEach((r,j)=>{for(let i=0;i<r.length;){let k=i+1;if(!bev)while(k<r.length&&r[k]===r[i])k++;if(c[r[i]])o+=(bev?K:R)(x+i*s,y+j*s,(k-i)*s,s,c[r[i]]);i=k;}});
return o;
}
const sch=rx=>R(-rx,-5,2*rx,10,'rgba(0,0,0,.3)');
const defs=(l,extra,h1,h2)=>`<defs>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".55"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
 <linearGradient id="tief" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
 <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${h1||'#5ab4f0'}"/><stop offset="1" stop-color="${h2||'#d8f0ff'}"/></linearGradient>${extra||''}
</defs>`;
function muster(s,f){let o='';for(let i=0;i<3;i++)for(let j=0;j<3;j++)o+=K(i*s,j*s,s,s,f[(i*2+j*5)%f.length]);return`<pattern id="wm" width="${3*s}" height="${3*s}" patternUnits="userSpaceOnUse">${o}</pattern>`;}
function boden(f,extra){let o='';const ys=[470,492,518,550,590,638,694,760,830];for(let j=0;j<8;j++){const w=50+j*18;for(let x=-((j*23)%w),i=0;x<1600;x+=w,i++)o+=K(x,ys[j],w,ys[j+1]-ys[j],f[(i+j)%f.length]);}return o+(extra||'')+R(0,470,1600,310,'url(#tief)');}
function reihe(y,s,c){let o='';for(let x=0;x<1600;x+=s)o+=K(x,y,s,s,c);return o;}
function saeule(x,y0,y1,s,c){let o='';for(let y=y0;y<y1;y+=s)o+=K(x,y,s,s,c);return o;}
function fenster(x,y,f,innen){return`${K(x-70,y-70,140,140,'#5a3a2a')}${R(x-56,y-56,112,112,f)}${innen||''}${R(x-4,y-56,8,112,'#5a3a2a')}${R(x-56,y-4,112,8,'#5a3a2a')}${R(x-48,y-48,16,16,'rgba(255,255,255,.5)')}`;}
function lampe(x,l,c){return`<circle cx="${x}" cy="${l+20}" r="120" fill="url(#licht)"/>${R(x-2,0,4,l,'#2a2238')}${K(x-20,l,40,16,c)}${R(x-14,l+16,28,14,'#fff3b0')}`;}
const wolke=(x,y,k)=>P('..ww....|.wwwwww.|wwwwwwww',k||14,'w#ffffff',x,y);
const biene=(x,y)=>P('.ww.|ykyk|.k..',5,'w#ffffff y#ffd34a k#222',x,y);
function zapfen(x,n,c){let o='';for(let k=0;k<n;k++){const w=(n-k)*16;o+=K(x-w/2,k*28,w,28,c);}return o;}
const glitzer=(x,y,a,b)=>P('.a..|.ab.|aab.|aabb|aabb',12,'a'+a+' b'+b,x,y);
function bogen(c){return`${R(c-100,200,200,270,'url(#himmel)')}${R(c-80,170,160,30,'url(#himmel)')}${R(c-50,150,100,20,'url(#himmel)')}${wolke(c-80,380,12)}${wolke(c-10,300,9)}`;}
const ofen=()=>`${sch(56)}${P('...gg...|...gg...|gggggggg|gssssssg|gssssssg|gsddddsg|gdffffdg|gdfyyfdg|gddddddg|gssssssg|gggggggg',12,'g#6e6a80 s#a9a4c0 d#2a2238 f#ff8a3a y#ffe066')}<circle cy="-50" r="60" fill="url(#licht)"/>`;
const holztruhe=()=>`${sch(56)}${P('bbbbbbbbbb|baaaaaaaab|bbbbbbbbbb|baaaayaaab|baaaayaaab|baaaaaaaab|bbbbbbbbbb',10,'a#c77d3a b#7a4420 y#ffd34a')}`;
const bett=()=>`${sch(64)}${P('w.........|w.........|wpp.......|wpprbrbrbr|wwbrbrbrbr|wwwwwwwwww|w........w',12,'w#8a5228 p#f4f0e8 r#e0566b b#f5b8c4')}`;
const kuchentisch=()=>`${sch(54)}${P('....cc....|...kkkk...|..kkkkkk..|..ssssss..|..kkkkkk..|tttttttttt|.t......t.|.t......t.|.t......t.|.t......t.',12,'c#e0566b k#fff4e0 s#f0b860 t#a0602c')}`;
const pixeluhr=()=>P('..wwwww..|.wcccccw.|wcccccccw|wccchcccw|wccchhccw|wcccccccw|.wcccccw.|..wwwww..|....p....|....p....|...ppp...',10,'w#8a5228 c#fff4e0 h#2a2238 p#ffd34a',-45,-55);
const bergbild=()=>P('rrrrrrrrrrrr|rsssssssssyr|rssssssssssr|rsssmssssssr|rssmmmssmssr|rsmmwmmmmmsr|rggggggggggr|rrrrrrrrrrrr',10,'r#7a4420 s#9fd8ff y#ffe066 m#8a84a8 w#ffffff g#6cc06a',-60,-40);
const buecher=()=>`${sch(50)}${P('..bbbbbb..|.ggggggg..|..rrrrrrr.|.yyyyyy...|..pppppppp|.bbbbbbb..',12,'b#4a8ae8 g#3aa860 r#e0566b y#ffd34a p#a07cf0')}`;
const wollkorb=()=>`${sch(54)}${P('..pp..bb..|.pppp.bbbb|.pppppbbbb|kkkkkkkkkk|kakakakaka|kkkkkkkkkk|.kakakaka.',10,'p#e0566b b#6ab8e8 k#c08a44 a#8a5a28')}`;
const kristalle=()=>`<circle cy="-50" r="80" fill="url(#licht)"/>${sch(60)}${P('....c.....|...cc...p.|...cl..pp.|.c.cl..pl.|.cccl.ppl.|ccclllppll|rrrrrrrrrr',12,'c#59e0f0 l#c8faff p#e870d0 r#5a5478')}`;
const lore=()=>`${sch(56)}${R(-70,-4,140,6,'#6a6070')}${P('..gcppcg..|mmmmmmmmmm|maaaaaaaam|maaaaaaaam|.mmmmmmmm.|..o....o..',12,'g#8a84a8 c#59e0f0 p#e870d0 m#4a5468 a#6a7488 o#222222')}`;
const pilze=()=>`<circle cy="-40" r="60" fill="url(#licht)"/>${sch(50)}${P('.bbb......|bbwbb.....|bbbbb.ooo.|..s..owooo|..s..ooooo|..s....s..|..s....s..',12,'b#4ad0a0 w#ffffff o#a07cf0 s#e8e0d0')}`;
const saeulenstein=()=>`${sch(40)}${P('..a...|..ab..|..ab..|.aab..|.aabb.|.aabb.|aaabbb|aaabbb|aaabbb',12,'a#6a6488 b#4a4468')}`;
const ader=()=>P('rrrrrrrrrrrr|rrcrrrrrprrr|rcclrrrppprr|rrcrrprrprrr|rrrrpppcrrrr|rrrrrprcclrr|rrrrrrrrcrrr|rrrrrrrrrrrr',10,'r#4e4672 c#59e0f0 l#ffffff p#e870d0',-60,-40);
const malerei=()=>`${R(-60,-40,120,80,'#8e84a8')}${P('ssssssssssss|syy......o.s|syy.....ooos|s......o.o.s|s.oooo.....s|s.oooooo...s|s.o..o..o..s|ssssssssssss',10,'s#6a6080 y#ffcf5a o#d0703a',-60,-40)}`;
const grubenlampe=()=>`<circle cy="-50" r="70" fill="url(#licht)"/>${sch(30)}${P('...kk...|kkkkkkkk|.kyyyyk.|.kywyyk.|.kyyyyk.|.kyyyyk.|kkkkkkkk',12,'k#3a3a48 y#ffd34a w#fff8d0')}`;
const edelsteinkiste=()=>`${sch(56)}${P('..c.p.g...|.cccpppgg.|bbbbbbbbbb|baaaaaaaab|baaaayaaab|baaaaaaaab|bbbbbbbbbb',12,'a#5a6ab0 b#2a2f5a y#ffd34a c#59e0f0 p#e870d0 g#7ae070')}`;
const werkbank=()=>`${sch(64)}${P('..h.....ss..|..hh...ssss.|wwwwwwwwwwww|wwwwwwwwwwww|.l........l.|.l..bbbb..l.|.l..bbbb..l.|.l........l.',10,'h#8a8a96 s#6ab8e8 w#c08a44 l#7a4420 b#ffd34a')}`;
const kran=()=>`${sch(40)}${P('yyyyyyyyyyy|y.y.....k..|yyy.....k..|.y......k..|.y.....rrr.|.y.....rrr.|.y.........|.y.........|.y.........|.y.........|yyy........|ggggg......',12,'y#ffc23a k#333333 r#e0566b g#555566')}`;
const farbeimer=()=>`${sch(64)}${P('rrr.yyy.bbb|mrm.mym.mbm|mmm.mmm.mmm|mmm.mmm.mmm',12,'m#b8bcc8 r#e0566b y#ffd34a b#4a8ae8')}`;
const schubkarre=()=>`${sch(52)}${P('rr.ppp....|rmmmmmmmm.|.mmmmmmm..|..mmmmm...|...o..l...|..ooo..l..|...o...l..',10,'r#e0566b p#f08a5a m#3aa8a0 o#333333 l#7a4420')}`;
const bauplan=()=>`${R(-70,-45,140,90,'#2f6ac8')}${P('..............|.wwwwww.......|.w....w..www..|.w.ww.w..w.w..|.w....w..www..|.wwwwww.......|........wwww..|..............|',10,'w#e8f4ff',-70,-45)}${R(-70,-45,140,6,'#1f4a98')}`;
const werkzeugwand=()=>`${R(-70,-40,140,80,'#d8b070')}${P('..............|.y..r..b...kk.|.y..r..b..k..k|.y..r..b...kk.|.y..g..bb.....|.y..g..bb.....|.y......b.....|..............',10,'y#ffd34a r#e0566b b#4a8ae8 g#555566 k#3aa860',-70,-40)}`;
const blockstapel=()=>`${sch(60)}${P('...rr...|..yybb..|.ggrryy.|bbyyggrr',16,'r#e0566b y#ffd34a b#4a8ae8 g#3aa860',undefined,undefined,1)}`;
const klotzkiste=()=>`${sch(56)}${P('r.yb.g.r..|kkkkkkkkkk|kaaaaaaaak|kaaawwaaak|kaaaaaaaak|kkkkkkkkkk',10,'r#e0566b y#ffd34a b#4a8ae8 g#a07cf0 k#3a7a30 a#7ac060 w#ffffff')}`;
const bienenstock=()=>`${sch(52)}${P('..rrrr..|.rrrrrr.|wwwwwwww|yyyyyyyy|wwwwwwww|yyyddyyy|wwwwwwww|.l....l.|.l....l.',12,'r#e0566b w#fff4e0 y#ffd34a d#2a2238 l#7a4420')}${biene(40,-120)}${biene(-60,-90)}`;
const bienenkorb=()=>`${sch(50)}${P('...ooo...|..ooooo..|.oaoaoao.|ooooooooo|oaoaoaoao|oooodoooo|ggggggggg',11,'o#e0a040 a#c07a28 d#2a2238 g#7a4420')}${biene(50,-90)}${biene(-30,-100)}${biene(10,-110)}`;
const giesskanne=()=>`${sch(40)}${P('...hhh....|..h...h...|.bbbbbb..s|.bbbbbbbs.|.bbbbbbs..|.bbbbbb...|.bbbbbb...',12,'b#4a9ae8 h#2a6ac0 s#2a6ac0')}`;
const blockbaum=()=>`${sch(60)}${P('.gggg.|gglggr|gggggl|grlggg|.gggg.|..tt..|..tt..|..tt..|..tt..',18,'g#3aa860 l#7ad870 r#e0566b t#8a5228')}`;
const vogelhaus=()=>P('....rr....|...rrrr...|..rrrrrr..|.rrrrrrrr.|..wwwwww..|..wwddww..|..wwddww..|..wwwwww..|...pppp...|....ll....|....ll....',10,'r#e0566b w#fff4e0 d#2a2238 p#a0602c l#7a4420',-50,-55);
const blumenschild=()=>P('kkkkkkkkkkkk|kwwwwwwwwwwk|kwrwwywwbwwk|kwgwwgwwgwwk|kwwwwwwwwwwk|kkkkkkkkkkkk|.....ll.....|.....ll.....',10,'k#8a5228 w#fff4e0 r#e0566b y#ffd34a b#4a8ae8 g#3aa860 l#7a4420',-60,-40);
const honig=()=>`${sch(48)}${P('kkkk..kkkk|.yy....yy.|yyyy..yyyy|ywwy..ywwy|yyyy..yyyy|yyyy..yyyy',12,'k#e0566b y#f0a020 w#fff4e0')}`;
const blumenbeet=()=>`${sch(64)}${P('.r...y...p..|rwr.ywy.pwp.|.r...y...p..|.g...g...g..|ggg.ggg.ggg.|eeeeeeeeeeee|eeeeeeeeeeee',11,'r#e0566b y#ffd34a p#a07cf0 w#ffffff g#3aa860 e#8a5228')}`;
const fernrohr=()=>`${sch(50)}${P('........bb|......bbbb|....bbbb..|..bbbb....|.bbb......|....l.....|...l.l....|..l...l...|.l.....l..',12,'b#4a5ac8 l#7a4420')}`;
const windrad=()=>`${sch(40)}${P('rrr..bbbb|rrrr.bbb.|.rrrwbb..|..www....|..ggwyyy.|.ggg.yyyy|gggg..yyy|....l....|....l....|....l....|...lll...',11,'r#e0566b b#4a8ae8 w#ffffff g#3aa860 y#ffd34a l#7a4420')}`;
const schatztruhe=()=>`${sch(56)}${P('.bbbbbbbb.|bwwwwwwwwb|bbbbbbbbbb|bwwwyywwwb|bwwwyywwwb|bbbbbbbbbb',10,'w#b8a0f0 b#ffd34a y#ffffff')}`;
const ballon=()=>`${sch(36)}${P('...rrrr...|..rryyrr..|.rryyyyrr.|.rrrrrrrr.|.rryyyyrr.|..rryyrr..|...rrrr...|...k..k...|...k..k...|...k..k...|...bbbb...|...bbbb...',12,'r#e0566b y#ffd34a k#555566 b#c08a44')}`;
const himmelskarte=()=>P('kkkkkkkkkkkk|knnnnnnnnnnk|knynnnnnynnk|knnnnynnnnnk|knnnnnnnnwnk|knynnnnynnnk|knnnnnnnnnnk|kkkkkkkkkkkk',10,'k#ffd34a n#1d2a5a y#ffe066 w#ffffff',-60,-40);
const turmfahne=()=>P('llllllllll|.gggggggg.|.gggwwggg.|.ggwwwwgg.|.gggwwggg.|.gggggggg.|.gg....gg.|.g......g.',10,'l#7a4420 g#3aa8a0 w#ffffff',-50,-40);
const sonnenuhr=()=>`${sch(50)}${P('....k.....|....kk....|....kkk...|ssssssssss|.mmmmmmmm.|..mmmmmm..|..mmmmmm..|.mmmmmmmm.',12,'s#e8e0d0 k#555566 m#b8b0c8')}`;
const vogelnest=()=>`${sch(50)}${P('...bbb....|..bbwbbr..|..bbbbbrr.|...bbb....|nnnnnnnnnn|.nnnnnnnn.|..nnnnnn..',12,'b#6ab8e8 w#ffffff r#f0a020 n#a07040')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*12;for(let k=0;k<n;k++)d+=`<rect x="${x0+k*24-8}" y="${y-8}" width="16" height="16" fill="#1d2440" stroke="#ffd34a" stroke-width="2"/>`;return`<rect x="${500-n*12-12}" y="${y-18}" width="${n*24+24}" height="36" fill="#2a2238" stroke="#ffd34a" stroke-width="3"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.1s ease-in-out,opacity 1.1s ease-in-out}.tuer .lang{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen #luke{transform:scaleY(.12)}.tuer.offen #pslab{transform:translateY(262px)}.tuer.offen #pwir rect{animation:pw .6s ease-in-out infinite alternate}@keyframes pw{from{opacity:.3}to{opacity:1}}.tuer.offen .wh{transform:translateY(-130px);opacity:0}.tuer .bl{transform:translateY(46px);opacity:0}.tuer.offen .bl{transform:translateY(0);opacity:1}.tuer.offen #bal{transform:translateY(-240px)}.tuer.offen #bseil{opacity:0}</style>`;
function tuerLuke(n){
const f='400,484 600,484 640,548 360,548';
return`<polygon points="388,478 612,478 654,556 346,556" fill="#8a5228" stroke="#3a2010" stroke-width="4"/>
   <polygon points="${f}" fill="#0c0a14"/><path d="M452 488L440 546M548 488L560 546" stroke="#d8a050" stroke-width="8"/><path d="M448 504H552M444 520H556M441 536H559" stroke="#d8a050" stroke-width="6"/>
   <g id="luke" class="lang" style="transform-origin:500px 484px"><polygon points="${f}" fill="#c27a36" stroke="#3a2010" stroke-width="4"/><path d="M433 484L420 548M466 484L460 548M500 484V548M534 484L540 548M567 484L580 548" stroke="#7a4420" stroke-width="3"/>${sPl(n,516)}</g>`;
}
function tuerPortal(n){
const c=['#4a4468','#59e0f0','#3a3458','#e870d0','#463e66','#7ae070'];
let r='',w='';
for(let i=0;i<5;i++){r+=K(380,210+i*52,50,52,c[i%6])+K(570,210+i*52,50,52,c[(i+3)%6]);}
for(let i=0;i<6;i++)r+=K(380+i*40,158,40,52,c[(i*5+1)%6]);
[[440,230,'#59e0f0'],[470,270,'#e870d0'],[520,250,'#ffffff'],[550,300,'#7ae070'],[450,340,'#ffffff'],[500,370,'#59e0f0'],[540,410,'#e870d0'],[460,430,'#7ae070'],[500,300,'#c8faff'],[480,220,'#ffd34a']].forEach((q,k)=>{w+=`<rect x="${q[0]}" y="${q[1]}" width="16" height="16" fill="${q[2]}" style="animation-delay:${(k*.13).toFixed(2)}s"/>`;});
return`<defs><clipPath id="pclip"><rect x="430" y="210" width="140" height="260"/></clipPath></defs>
   <rect x="430" y="210" width="140" height="260" fill="#2a1a50"/>
   <g clip-path="url(#pclip)"><circle cx="500" cy="340" r="130" fill="url(#licht)"/><g id="pwir">${w}</g>
   <g id="pslab" class="lang">${K(430,210,140,87,'#7a7498')}${K(430,297,140,87,'#6a6488')}${K(430,384,140,86,'#7a7498')}${sPl(n,300)}</g></g>${r}`;
}
function tuerKran(n){
const fa=['#e0566b','#ffd34a','#4a8ae8','#3aa860'];
const reihen=(a,b)=>{let o='';for(let j=a;j<b;j++)for(let i=0;i<3;i++)o+=K(410+i*60,190+j*40,60,40,fa[(i+j*2)%4]);return o;};
return`<defs><linearGradient id="himmelK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc8f4"/><stop offset="1" stop-color="#e8f8d8"/></linearGradient></defs>
   <rect x="410" y="190" width="180" height="280" fill="url(#himmelK)"/><path d="M410 400Q470 350 520 385T590 370V470H410Z" fill="#8cc06a"/>${wolke(430,250,8)}
   <g class="tb wh" style="transition-delay:.7s">${reihen(5,7)}</g>
   <g class="tb wh" style="transition-delay:.35s">${reihen(2,5)}${sPl(n,330)}</g>
   <g class="tb wh">${reihen(0,2)}<path d="M500 160V196" stroke="#333" stroke-width="4"/><rect x="490" y="196" width="20" height="14" fill="#555566"/></g>
   ${saeule(378,160,470,31,'#ffc23a')}${saeule(591,160,470,31,'#ffc23a')}${K(378,129,244,31,'#ffc23a')}${R(486,160,28,8,'#555566')}`;
}
function tuerBruecke(n){
const g=['#3a9a50','#2e8a44','#46a85c'];
let h='',b='',s='';
for(let i=0;i<6;i++)h+=K(380+i*40,150,40,40,g[i%3])+K(380+i*40,190,40,40,g[(i+1)%3]);
for(let j=0;j<6;j++)h+=K(380,230+j*40,40,40,g[j%3])+K(580,230+j*40,40,40,g[(j+2)%3]);
[420,540].forEach(x=>{b+=K(x,330,40,28,'#7ac860')+K(x,358,40,28,'#8a5228')+K(x,386,40,28,'#6a4420')+K(x,414,40,28,'#8a5228')+K(x,442,40,28,'#6a4420');});
for(let i=0;i<4;i++)s+=`<g class="tb bl" style="transition-delay:${(i*.2).toFixed(1)}s">${K(460+i*20,330,20,24,i%2?'#e0566b':'#ffd34a')}</g>`;
return`<defs><linearGradient id="himmelB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0e8"/><stop offset="1" stop-color="#e8f4d8"/></linearGradient></defs>
   <rect x="420" y="230" width="160" height="240" fill="url(#himmelB)"/>${wolke(436,252,6)}<path d="M420 330V290Q470 262 505 288T580 280V330Z" fill="#8cc06a"/><rect x="460" y="330" width="80" height="140" fill="#1a2a50"/><path d="M460 380H540M460 420H540M460 456H540" stroke="#2a3c70" stroke-width="4"/>${b}${s}${h}${sPl(n,170)}`;
}
function tuerBallon(n){
const c=['#a898cc','#8a7ab8','#b8a8d8'];
let r='';
for(let i=0;i<7;i++){r+=K(380,190+i*40,40,40,c[i%3])+K(580,190+i*40,40,40,c[(i+1)%3]);}
for(let i=0;i<6;i++)r+=K(380+i*40,150,40,40,c[(i+2)%3]);
return`<defs><clipPath id="aclip"><rect x="420" y="190" width="160" height="280"/></clipPath><linearGradient id="himmelA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ab4f0"/><stop offset="1" stop-color="#ffe8f0"/></linearGradient></defs>
   <rect x="420" y="190" width="160" height="280" fill="url(#himmelA)"/>
   <g clip-path="url(#aclip)">${wolke(425,300,6)}${wolke(520,360,7)}
   <g id="bal" class="lang">${P('...rrrr...|..rryyrr..|.rryyyyrr.|.rrrrrrrr.|.rryyyyrr.|..rryyrr..|...rrrr...|...k..k...|...k..k...|...k..k...|...bbbb...|...bbbb...',14,'r#e0566b y#ffd34a k#555566 b#c08a44',430,212)}<g id="bseil" class="lang"><path d="M480 380L466 420M520 380L534 420" stroke="#6a4a28" stroke-width="4"/></g></g></g>
   ${K(420,420,160,50,'#a07040')}${sPl(n,445)}${r}`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'luke';
const arten={luke:[tuerLuke,'Kellerluke mit Zahlenschloss'],portal:[tuerPortal,'Portal mit Zahlenschloss'],kran:[tuerKran,'Blockwand mit Zahlenschloss'],bruecke:[tuerBruecke,'Brücke mit Zahlenschloss'],ballon:[tuerBallon,'Ballon mit Zahlenschloss']};
const a=arten[art]||arten.luke;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.kloetzchenwelt={
name:"Die Klötzchenwelt",
symbole:["kristall","apfel","blume","schluessel","stern"],
symbolNamen:["Kristall","Apfel","Blume","Schlüssel","Stern"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M60 8L100 26L60 44L20 26Z" fill="#ffd34a" stroke="#6a4a1a" stroke-width="3"/><path d="M20 26L60 44V84L20 66Z" fill="#ff8a5c" stroke="#6a4a1a" stroke-width="3"/><path d="M100 26L60 44V84L100 66Z" fill="#d9576b" stroke="#6a4a1a" stroke-width="3"/><path d="M28 34L60 48L92 34" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/><use href="#sym-kristall" x="88" y="0" width="28" height="28" color="#59e0f0"/></svg>`,
texte:{
einleitung:"Ihr seid in der Klötzchenwelt gelandet! Hier ist alles aus bunten Blöcken gebaut: Häuser, Bäume, Höhlen und sogar die Wolken. Die Baumeisterin dieser Welt hat jeden Durchgang mit einem Zahlenschloss gesichert. Untersucht die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe steckt eine Ziffer. Findet ihr den Weg hinaus?",
startKnopf:"Die Klötzchenwelt betreten",
hinweisGeber:"Die kleine Pixelbiene summt:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Pixelbiene summt leise … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss aus Blöcken",
schlossSymbol:"Über jedem Rad leuchtet ein Pixelzeichen. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Die Blöcke wackeln – aber der Weg bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Sonne geht unter!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Ihr seid frei!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus der Klötzchenwelt gefunden. Die Baumeisterin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du bist in der Klötzchenwelt gelandet! Hier ist alles aus bunten Blöcken gebaut: Häuser, Bäume, Höhlen und sogar die Wolken. Die Baumeisterin dieser Welt hat jeden Durchgang mit einem Zahlenschloss gesichert. Untersuche die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe steckt eine Ziffer. Findest du den Weg hinaus?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Pixelbiene summt leise … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad leuchtet ein Pixelzeichen. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Die Blöcke wackeln – aber der Weg bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Du bist frei!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus der Klötzchenwelt gefunden. Die Baumeisterin ist stolz auf dich!"
},
einfach:{
name:"Die Klötzchenwelt",
symbolNamen:["Kristall","Apfel","Blume","Schlüssel","Stern"],
texte:{
einleitung:"Ihr seid in der Klötzchenwelt. Hier ist alles aus bunten Blöcken gebaut. Plötzlich ist der Weg zurück zu! An jedem Durchgang hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach Hause?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach Hause gefunden!"
},
texteDu:{
einleitung:"Du bist in der Klötzchenwelt. Hier ist alles aus bunten Blöcken gebaut. Plötzlich ist der Weg zurück zu! An jedem Durchgang hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach Hause?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach Hause gefunden!"
},
raeume:[
{titel:"Das Blockhaus",intro:"Ein warmes Haus aus Holz-Blöcken. Im Ofen brennt ein Feuer. Hier sind die Zahlen für das erste Schloss versteckt.",
objekte:[{name:"Ofen",fund:"Neben dem Ofen liegt:"},{name:"Truhe aus Holz",fund:"In der Truhe liegt:"},{name:"Bett",fund:"Unter dem Kissen liegt:"},{name:"Tisch mit Kuchen",fund:"Unter dem Teller liegt:"},{name:"Uhr",fund:"Hinter der Uhr klebt:"}],
infoObjekte:[{name:"Bild mit Berg",fund:"Hinter dem Bild klebt:"},{name:"Stapel Bücher",fund:"Im Buch liegt:"},{name:"Korb mit Wolle",fund:"In der Wolle steckt:"}]},
{titel:"Die Höhle mit Kristallen",intro:"Ihr seid in einer dunklen Höhle. Bunte Kristalle leuchten an den Wänden. Findet die Zahlen für das Schloss am Block-Portal!",introDu:"Du bist in einer dunklen Höhle. Bunte Kristalle leuchten an den Wänden. Finde die Zahlen für das Schloss am Block-Portal!",
objekte:[{name:"Kristalle",fund:"Zwischen den Kristallen liegt:"},{name:"Wagen mit Steinen",fund:"Im Wagen liegt:"},{name:"Pilze",fund:"Unter einem Pilz liegt:"},{name:"Stein-Säule",fund:"An der Säule klebt:"},{name:"Glitzer an der Wand",fund:"In der Wand steckt:"}],
infoObjekte:[{name:"Bild an der Wand",fund:"Neben dem Bild steckt:"},{name:"Lampe",fund:"Unter der Lampe liegt:"},{name:"Kiste mit Steinen",fund:"In der Kiste liegt:"}]},
{titel:"Die Werkstatt",intro:"Hier bauen Menschen mit Blöcken. Überall liegen Werkzeuge und bunte Steine.",
objekte:[{name:"Tisch zum Bauen",fund:"Auf dem Tisch liegt:"},{name:"Kran",fund:"Am Kran hängt:"},{name:"Eimer mit Farbe",fund:"Unter einem Eimer liegt:"},{name:"Schubkarre",fund:"In der Schubkarre liegt:"},{name:"Plan an der Wand",fund:"Hinter dem Plan steckt:"}],
infoObjekte:[{name:"Wand mit Werkzeug",fund:"Hinter dem Werkzeug hängt:"},{name:"Turm aus Blöcken",fund:"Zwischen den Blöcken steckt:"},{name:"Kiste mit Blöcken",fund:"In der Kiste liegt:"}]},
{titel:"Die Wiese mit Bienen",intro:"Ihr seid draußen auf einer Wiese. Bienen summen um die Blumen. Baut die Brücke!",introDu:"Du bist draußen auf einer Wiese. Bienen summen um die Blumen. Baue die Brücke!",
objekte:[{name:"Haus für Bienen",fund:"Neben dem Bienenhaus liegt:"},{name:"Korb für Bienen",fund:"Unter dem Korb liegt:"},{name:"Gießkanne",fund:"In der Gießkanne liegt:"},{name:"Baum",fund:"Im Baum hängt:"},{name:"Haus für Vögel",fund:"Im Vogelhaus liegt:"}],
infoObjekte:[{name:"Schild mit Blumen",fund:"Hinter dem Schild klebt:"},{name:"Töpfe mit Honig",fund:"Unter dem Honig liegt:"},{name:"Beet",fund:"Zwischen den Blumen steckt:"}]},
{titel:"Der Turm über den Wolken",intro:"Ihr seid ganz oben im Turm. Unter euch sind die Wolken. Löst das letzte Schloss, dann fliegt der Ballon los!",introDu:"Du bist ganz oben im Turm. Unter dir sind die Wolken. Löse das letzte Schloss, dann fliegt der Ballon los!",
objekte:[{name:"Fernrohr",fund:"Im Fernrohr steckt:"},{name:"Windrad",fund:"Am Windrad hängt:"},{name:"Schatzkiste",fund:"In der Kiste liegt:"},{name:"Korb vom Ballon",fund:"Im Korb liegt:"},{name:"Karte mit Sternen",fund:"Hinter der Karte steckt:"}],
infoObjekte:[{name:"Fahne",fund:"An der Fahne hängt:"},{name:"Uhr mit Sonne",fund:"Unter der Uhr liegt:"},{name:"Nest",fund:"Im Nest liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Das Blockhaus",
intro:"Ein gemütliches Blockhaus, gebaut aus warmen Holzblöcken. Im Ofen knistert ein Feuer, durch die Fenster scheint die Sonne. Irgendwo hier sind die Ziffern für das erste Schloss versteckt. Es hält die Kellerluke mit der Leiter zu …",
tuerX:1250,tuerArt:"luke",
hintergrund:()=>`${defs('#ffd890',muster(40,['#c98a4c','#b8773a','#d49556']))}${R(0,0,1600,470,'url(#wm)')}${saeule(180,40,470,40,'#7a4420')}${saeule(1020,40,470,40,'#7a4420')}${reihe(0,40,'#6a3a1a')}${fenster(420,200,'#9fd8ff',wolke(372,170,8))}${fenster(1480,200,'#9fd8ff')}${reihe(430,40,'#8a5228')}${boden(['#8a5228','#9a6232','#7a4420'])}${lampe(300,100,'#e0566b')}${lampe(780,100,'#e0566b')}`,
objekte:[
{name:"Blockofen",x:300,boden:560,fuss:0,by:-170,zeichne:ofen,fund:"Neben dem Ofen liegt:"},
{name:"Holztruhe",x:620,boden:700,fuss:0,by:-100,zeichne:holztruhe,fund:"In der Holztruhe liegt:"},
{name:"Karobett",x:1500,boden:620,fuss:0,by:-115,zeichne:bett,fund:"Unter dem Kopfkissen liegt:"},
{name:"Tisch mit Kuchen",x:950,boden:600,fuss:0,by:-140,zeichne:kuchentisch,fund:"Unter dem Kuchenteller liegt:"},
{name:"Pixeluhr",x:600,y:230,wand:true,by:-80,zeichne:pixeluhr,fund:"Hinter dem Pendel klebt:"}
],
infoObjekte:[{name:"Bild vom Blockberg",x:860,y:220,wand:true,by:-65,zeichne:bergbild,fund:"Hinter dem Bild klebt:"},{name:"Bücherstapel",x:150,boden:740,fuss:0,by:-100,zeichne:buecher,fund:"Im obersten Buch liegt:"},{name:"Wollkorb",x:1150,boden:740,fuss:0,by:-100,zeichne:wollkorb,fund:"Zwischen den Wollknäueln steckt:"}]},
{titel:"Die Kristallhöhle",
intro:"Ihr klettert hinab in eine Höhle aus dunklen Steinblöcken. An den Wänden leuchten Kristalle in Blau und Rosa. Findet die Ziffern für das Schloss am Block-Portal!",
introDu:"Du kletterst hinab in eine Höhle aus dunklen Steinblöcken. An den Wänden leuchten Kristalle in Blau und Rosa. Finde die Ziffern für das Schloss am Block-Portal!",
tuerX:300,tuerArt:"portal",
hintergrund:()=>`${defs('#7ff0ff',muster(48,['#3a3458','#2e2a48','#463e66']))}${R(0,0,1600,470,'url(#wm)')}${zapfen(150,4,'#2a2440')}${zapfen(640,3,'#2a2440')}${zapfen(1100,5,'#2a2440')}${zapfen(1480,3,'#2a2440')}<circle cx="600" cy="380" r="180" fill="url(#licht)"/><circle cx="1450" cy="360" r="160" fill="url(#licht)"/>${glitzer(560,410,'#59e0f0','#c8faff')}${glitzer(1420,410,'#e870d0','#ffc8f0')}${glitzer(40,410,'#7ae070','#d8ffd0')}${boden(['#3a3450','#2e2a42','#443c5c'])}`,
objekte:[
{name:"Kristallgruppe",x:700,boden:580,fuss:0,by:-110,zeichne:kristalle,fund:"Zwischen den Kristallen liegt:"},
{name:"Lore mit Steinen",x:1050,boden:700,fuss:0,by:-90,zeichne:lore,fund:"In der Lore liegt:"},
{name:"Leuchtpilze",x:1400,boden:600,fuss:0,by:-105,zeichne:pilze,fund:"Unter einem Leuchtpilz liegt:"},
{name:"Steinsäule",x:480,boden:720,fuss:0,by:-135,zeichne:saeulenstein,fund:"An der Steinsäule klebt:"},
{name:"Glitzerader",x:900,y:220,wand:true,by:-65,zeichne:ader,fund:"In der Glitzerader steckt:"}
],
infoObjekte:[{name:"Höhlenbild",x:1250,y:240,wand:true,by:-65,zeichne:malerei,fund:"Neben dem Höhlenbild steckt:"},{name:"Grubenlampe",x:160,boden:740,fuss:0,by:-105,zeichne:grubenlampe,fund:"Unter der Grubenlampe liegt:"},{name:"Edelsteinkiste",x:1250,boden:520,fuss:0,by:-105,zeichne:edelsteinkiste,fund:"In der Edelsteinkiste liegt:"}]},
{titel:"Die Bauwerkstatt",
intro:"In der hellen Bauwerkstatt entstehen neue Häuser, Brücken und Türme. Ein kleiner Kran hebt bunte Blöcke, auf der Werkbank liegen Baupläne. Hier haben Baumeisterinnen und Baumeister ein Rätsel versteckt.",
tuerX:800,tuerArt:"kran",
hintergrund:()=>`${defs('#fff3d0',muster(40,['#f2e2b8','#e8d4a0','#f8ecc8']))}${R(0,0,1600,470,'url(#wm)')}${reihe(0,40,'#3aa8a0')}${reihe(390,40,'#3aa8a0')}${reihe(430,40,'#2e8a84')}${fenster(1440,190,'#bfe8ff',wolke(1390,170,8))}<circle cx="1440" cy="300" r="260" fill="url(#licht)"/>${P('rybgr|g...b|byrgy|y...r|rgbyg',36,'r#e0566b y#ffd34a b#4a8ae8 g#3aa860',60,170,1)}${boden(['#b8bcc8','#a8acb8','#c8ccd8'])}${lampe(560,100,'#4a8ae8')}${lampe(1020,100,'#4a8ae8')}`,
objekte:[
{name:"Werkbank",x:350,boden:600,fuss:0,by:-105,zeichne:werkbank,fund:"Auf der Werkbank liegt:"},
{name:"Klötzchenkran",x:1300,boden:560,fuss:0,by:-170,zeichne:kran,fund:"Am Haken des Krans hängt:"},
{name:"Farbeimer",x:1050,boden:720,fuss:0,by:-75,zeichne:farbeimer,fund:"Unter einem Farbeimer liegt:"},
{name:"Schubkarre",x:560,boden:730,fuss:0,by:-95,zeichne:schubkarre,fund:"In der Schubkarre liegt:"},
{name:"Bauplan",x:400,y:230,wand:true,by:-70,zeichne:bauplan,fund:"Hinter dem Bauplan steckt:"}
],
infoObjekte:[{name:"Werkzeugwand",x:1150,y:240,wand:true,by:-65,zeichne:werkzeugwand,fund:"Hinter dem Lineal hängt:"},{name:"Blockstapel",x:130,boden:720,fuss:0,by:-90,zeichne:blockstapel,fund:"Zwischen den Blöcken steckt:"},{name:"Klötzchenkiste",x:1500,boden:690,fuss:0,by:-85,zeichne:klotzkiste,fund:"In der Klötzchenkiste liegt:"}]},
{titel:"Die Blumenwiese",
intro:"Endlich draußen! Auf der Blumenwiese summen Bienen von Blüte zu Blüte. Hinter der Hecke ist eine tiefe Schlucht. Die Brücke aus Blöcken fehlt noch – das Schloss baut sie. Öffnet es!",
introDu:"Endlich draußen! Auf der Blumenwiese summen Bienen von Blüte zu Blüte. Hinter der Hecke ist eine tiefe Schlucht. Die Brücke aus Blöcken fehlt noch – das Schloss baut sie. Öffne es!",
tuerX:1350,tuerArt:"bruecke",
hintergrund:()=>`${defs('#fff8c0',muster(30,['#3a9a50','#2e8a44','#46a85c']),'#4aa8f0','#d8f4ff')}${R(0,0,1600,470,'url(#himmel)')}${P('.yy.|yyyy|yyyy|.yy.',22,'y#ffe066',140,40,1)}<circle cx="184" cy="84" r="120" fill="url(#licht)"/>${wolke(480,70)}${wolke(980,110)}${wolke(1380,50,12)}${P('......hh..........hhh.......|...hhhhhhh.....hhhhhhhh.....|hhhhhhhhhhhhhhhhhhhhhhhhhhhh',58,'h#8ac8a0',0,74)}${R(0,250,1600,220,'url(#wm)')}${[90,420,560,1000,1120,1560].map((x,k)=>P('.r.|rwr|.r.',8,'r'+['#e0566b','#ffd34a','#a07cf0'][k%3]+' w#ffffff',x,300+(k%2)*80)).join('')}${boden(['#7ac860','#6ab850','#8ad070'],[180,520,880,1180,1460].map((x,k)=>P('.y.|ywy|.g.',6,'y'+['#ffd34a','#e0566b','#ffffff'][k%3]+' w#ff9a3a g#3a8a40',x,600+(k%3)*50)).join(''))}`,
objekte:[
{name:"Bienenstock",x:300,boden:580,fuss:0,by:-135,zeichne:bienenstock,fund:"Neben dem Bienenstock liegt:"},
{name:"Bienenkorb",x:1000,boden:560,fuss:0,by:-105,zeichne:bienenkorb,fund:"Unter dem Bienenkorb liegt:"},
{name:"Gießkanne",x:650,boden:720,fuss:0,by:-105,zeichne:giesskanne,fund:"In der Gießkanne liegt:"},
{name:"Blockbaum",x:1530,boden:620,fuss:0,by:-190,zeichne:blockbaum,fund:"In der Baumkrone hängt:"},
{name:"Vogelhaus",x:700,y:290,wand:true,by:-80,zeichne:vogelhaus,fund:"Im Vogelhaus liegt:"}
],
infoObjekte:[{name:"Blumenschild",x:250,y:290,wand:true,by:-65,zeichne:blumenschild,fund:"Hinter dem Blumenschild klebt:"},{name:"Honigtöpfe",x:820,boden:640,fuss:0,by:-95,zeichne:honig,fund:"Unter einem Honigtopf liegt:"},{name:"Blumenbeet",x:130,boden:740,fuss:0,by:-100,zeichne:blumenbeet,fund:"Zwischen den Blumen steckt:"}]},
{titel:"Der Turm über den Wolken",
intro:"Eine lange Treppe aus Blöcken führt hinauf in den Turm über den Wolken. Durch die großen Öffnungen seht ihr weit über das Wolkenmeer. Hier wartet der Ballon. Das letzte Schloss hält ihn fest – öffnet es!",
introDu:"Eine lange Treppe aus Blöcken führt hinauf in den Turm über den Wolken. Durch die großen Öffnungen siehst du weit über das Wolkenmeer. Hier wartet der Ballon. Das letzte Schloss hält ihn fest – öffne es!",
tuerX:550,tuerArt:"ballon",
hintergrund:()=>`${defs('#fff6d0',muster(44,['#d8d0e8','#c8bedc','#e4dcf0']),'#3a8ae8','#ffe8f0')}${R(0,0,1600,470,'url(#wm)')}${bogen(850)}${bogen(1400)}${reihe(0,44,'#8a7ab8')}${reihe(426,44,'#a898cc')}<circle cx="1100" cy="300" r="320" fill="url(#licht)"/>${boden(['#e8e0f0','#d8d0e8','#f4eef8'])}`,
objekte:[
{name:"Fernrohr",x:1000,boden:580,fuss:0,by:-130,zeichne:fernrohr,fund:"Im Fernrohr steckt:"},
{name:"Windrad",x:1350,boden:620,fuss:0,by:-145,zeichne:windrad,fund:"Am Windrad hängt:"},
{name:"Schatztruhe",x:250,boden:700,fuss:0,by:-85,zeichne:schatztruhe,fund:"In der Schatztruhe liegt:"},
{name:"Ballonkorb",x:800,boden:730,fuss:0,by:-170,zeichne:ballon,fund:"Im Ballonkorb liegt:"},
{name:"Himmelskarte",x:1100,y:230,wand:true,by:-65,zeichne:himmelskarte,fund:"Hinter der Himmelskarte steckt:"}
],
infoObjekte:[{name:"Turmfahne",x:250,y:240,wand:true,by:-65,zeichne:turmfahne,fund:"An der Turmfahne hängt:"},{name:"Sonnenuhr",x:1500,boden:740,fuss:0,by:-115,zeichne:sonnenuhr,fund:"Unter der Sonnenuhr liegt:"},{name:"Vogelnest",x:120,boden:560,fuss:0,by:-105,zeichne:vogelnest,fund:"Im Vogelnest liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmelX" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4aa8f0"/><stop offset=".75" stop-color="#ffe8c8"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmelX)"/>${P('.yy.|yyyy|yyyy|.yy.',20,'y#ffe066',630,190,1)}${wolke(120,110,12)}${wolke(520,60,10)}
   ${P('...rrrr...|..rryyrr..|.rryyyyrr.|.rrrrrrrr.|.rryyyyrr.|..rryyrr..|...rrrr...|...k..k...|...k..k...|...k..k...|...bbbb...|...bbbb...',6,'r#4a8ae8 y#ffffff k#555566 b#c08a44',690,300)}
   ${P('...rrrr...|..rryyrr..|.rryyyyrr.|.rrrrrrrr.|.rryyyyrr.|..rryyrr..|...rrrr...|...k..k...|...k..k...|...k..k...|...bbbb...|...bbbb...',22,'r#e0566b y#ffd34a k#555566 b#c08a44',330,120)}
   ${R(0,470,1000,130,'#f4f8ff')}${wolke(-20,430,22)}${wolke(260,450,18)}${wolke(560,420,24)}${wolke(840,448,16)}${wolke(120,520,20)}${wolke(520,530,22)}
   <path d="M0 0H1000V600H0Z M180 600V240H220V180H280V130H360V100H640V130H720V180H780V240H820V600Z" fill="#2a2440" fill-rule="evenodd"/>`
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
   KLÖTZCHENWELT in 3D: gemeinsame Bausteine für alle fünf Räume und das Schlussbild.
   Eigene Block-Welt (eigene Gestaltung, keine Anlehnung an bestehende Spiele).
   Je Raum eine Datei kloetzchenwelt-raum<n>.js, die sich in RAEUME3D.kloetzchenwelt[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, teil, verschmelze, bild, schein, leuchtBild, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   Sparsame Darstellung: Alle Klötze eines Baukastens (KLOTZ.bau()) werden zu EINEM Körper mit Eckpunktfarben und
   Block-Textur (= 1 Zeichenaufruf). Tiere blicken nach +x, alle anderen Dinge nach +z, Füße bei y=0.
   =================================================================== */
RAEUME3D.kloetzchenwelt = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen.
   [Name, Fundtext, leichter Name, leichter Fundtext] */
const NEU=[
  [['Schaukelstuhl','Auf dem Sitz vom Schaukelstuhl liegt:','Stuhl zum Schaukeln','Auf dem Stuhl liegt:'],['Waschzuber','Am Rand vom Waschzuber klebt:','Wanne zum Waschen','An der Wanne klebt:']],
  [['Höhlensee mit Boot','Im Boot auf dem Höhlensee liegt:','See mit Boot','Im Boot liegt:'],['Förderkorb mit Seilwinde','Im Förderkorb liegt:','Korb am Seil','Im Korb liegt:']],
  [['Bauroboter','Der Bauroboter hält etwas fest:','Roboter','Beim Roboter liegt:'],['Zementmischer','Am Zementmischer klemmt:','Maschine zum Mischen','An der Maschine klebt:']],
  [['Brunnen','Am Eimer vom Brunnen hängt:','Brunnen','Am Brunnen hängt:'],['Picknickdecke','Neben dem Korb auf der Picknickdecke liegt:','Decke mit Essen','Auf der Decke liegt:']],
  [['Turmglocke','Am Seil der Turmglocke hängt:','Glocke','An der Glocke hängt:'],['Drachen an der Leine','An der Leine vom Drachen flattert:','Drachen','Beim Drachen hängt:']]
];
const SZK=SZENARIEN.kloetzchenwelt;
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZK.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZK.einfach) SZK.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
/* Nur in 3D: Die leichten Einleitungen nennen den Ausgang */
if(SZK.einfach){
  const R=SZK.einfach.raeume;
  R[0].intro='Ein warmes Haus aus Holz-Blöcken. Im Ofen brennt ein Feuer. Im Boden ist eine Klappe mit einem Zahlenschloss. Findet die Zahlen!';
  R[0].introDu='Ein warmes Haus aus Holz-Blöcken. Im Ofen brennt ein Feuer. Im Boden ist eine Klappe mit einem Zahlenschloss. Finde die Zahlen!';
  R[2].intro='Hier bauen Menschen mit Blöcken. Ein Kran steht an einer Wand aus Blöcken. Öffnet das Zahlenschloss. Dann hebt der Kran die Wand weg!';
  R[2].introDu='Hier bauen Menschen mit Blöcken. Ein Kran steht an einer Wand aus Blöcken. Öffne das Zahlenschloss. Dann hebt der Kran die Wand weg!';
  R[3].intro='Ihr seid draußen auf einer Wiese. Bienen summen um die Blumen. Das Zahlenschloss baut die Brücke. Findet die Zahlen!';
  R[3].introDu='Du bist draußen auf einer Wiese. Bienen summen um die Blumen. Das Zahlenschloss baut die Brücke. Finde die Zahlen!';
}
})();

const KLOTZ = (function(){
const F={ ROT:0xe0525a, ROT2:0x9a2e3a, ORANGE:0xf08a3a, GELB:0xffd34a, GOLD:0xe8b830, GRUEN:0x4cb458, GRUEN2:0x2e8a44, HELLGRUEN:0x8ad870, TUERKIS:0x3ab8ae,
  BLAU:0x4a8ae8, BLAU2:0x2a4a9a, HELLBLAU:0x9fd8ff, LILA:0x9a70e0, ROSA:0xf08ac0, WEISS:0xf6f4ee, CREME:0xf8ecc8, GRAU:0x9a98a6, GRAU2:0x6a6878, DUNKEL:0x2e2a3a, SCHWARZ:0x1a1620,
  HOLZ:0xb8773a, HOLZ2:0x8a5228, HOLZ3:0x5a3418, HELLHOLZ:0xd89a56, ERDE:0x8a5a30, SAND:0xe8cc88, WASSER:0x4ab0f0,
  STEIN:0x5a5478, STEIN2:0x463e66, STEIN3:0x343050, KRIST:0x59e0f0, PINK:0xe870d0, LIME:0x7ae070 };
/* fertige Farbmischungen für Wände und Böden */
const MIX={ holz:[0xc98a4c,0xb8773a,0xd49556,0xc08244], dielen:[0x9a6232,0x8a5228,0xa86c38,0x94592c], stein:[0x4e4672,0x463e66,0x3a3458,0x544c7a], hoehlenboden:[0x453e60,0x3a3450,0x4e4668],
  werkstatt:[0xf2e2b8,0xe8d4a0,0xf8ecc8], werkboden:[0xb8bcc8,0xa8acb8,0xc8ccd8], gras:[0x74c45a,0x66b84e,0x82d064,0x6cbc54], laub:[0x3a9a50,0x2e8a44,0x46a85c,0x52b460],
  turm:[0xd8d0e8,0xc8bedc,0xe4dcf0], turmboden:[0xe8e0f0,0xd8d0e8,0xf4eef8], pflaster:[0xb0a8b4,0xc0b8c2,0xa49ca8], fels:[0x8a7a68,0x7a6a5a,0x968674] };
const wahl=l=>l[Math.floor(zufall()*l.length)%l.length];

/* ---------- Block-Textur: 4 x 4 Klötze mit Pixelkörnung, heller Ober- und dunkler Unterkante (wird mit der Farbe malgenommen) ---------- */
let TEX=null;
function blockTextur(){
  if(TEX) return TEX;
  TEX=bild(256,256,(g)=>{ let s=11; const r=()=>{ s=(s*16807)%2147483647; return s/2147483647; };
    const grau=v=>{ const n=Math.max(0,Math.min(255,Math.round(v))); return 'rgb('+n+','+n+','+n+')'; };
    for(let i=0;i<4;i++) for(let j=0;j<4;j++){ const x=i*64, y=j*64, grund=236+(r()-.5)*14;
      for(let a=0;a<8;a++) for(let b=0;b<8;b++){ g.fillStyle=grau(grund+(r()-.5)*22); g.fillRect(x+a*8,y+b*8,8,8); }
      g.fillStyle='rgba(255,255,255,.75)'; g.fillRect(x,y,64,4); g.fillRect(x,y,3,64);
      g.fillStyle='rgba(0,0,0,.2)'; g.fillRect(x,y+60,64,4); g.fillRect(x+61,y,3,64); } });
  TEX.wrapS=TEX.wrapT=THREE.RepeatWrapping; TEX.magFilter=THREE.NearestFilter;
  return TEX;
}
/* Seiten eines Würfels: [Normale, vier Ecken gegen den Uhrzeigersinn, Achse für u, Achse für v, Helligkeit für leuchtende Klötze] */
const SEITEN=[
  [[1,0,0],[[1,-1,1],[1,-1,-1],[1,1,-1],[1,1,1]],2,1,.84],
  [[-1,0,0],[[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1]],2,1,.84],
  [[0,1,0],[[-1,1,1],[1,1,1],[1,1,-1],[-1,1,-1]],0,2,1],
  [[0,-1,0],[[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1]],0,2,.7],
  [[0,0,1],[[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],0,1,.93],
  [[0,0,-1],[[1,-1,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1]],0,1,.93]
];
/* Drehung wie in THREE (Reihenfolge XYZ) */
function drehe(p,rx,ry,rz){
  let x=p[0], y=p[1], z=p[2], c, s, a, b;
  if(rz){ c=Math.cos(rz); s=Math.sin(rz); a=x*c-y*s; b=x*s+y*c; x=a; y=b; }
  if(ry){ c=Math.cos(ry); s=Math.sin(ry); a=x*c+z*s; b=-x*s+z*c; x=a; z=b; }
  if(rx){ c=Math.cos(rx); s=Math.sin(rx); a=y*c-z*s; b=y*s+z*c; y=a; z=b; }
  return [x,y,z];
}

/* ---------- Baukasten ----------
   const b=KLOTZ.bau();
   b.klotz(breite,hoehe,tiefe,farbe,x,y,z,opt)      Klotz, (x,y,z) = Mitte (wie box ohne Eltern).
       opt: rx, ry, rz (Drehung um die eigene Mitte), glatt (ohne Klotzkante, für Gesichter und Kleinteile),
            raster (Größe eines sichtbaren Klotzes auf großen Flächen, Standard 1), jitter (Helligkeitsstreuung, Standard .05)
   b.quader(x1,y1,z1,x2,y2,z2,farbe,opt)           derselbe Klotz, von Ecke zu Ecke
   b.platte(x1,z1,x2,z2,y,farbe,opt)               nur die Oberseite (Boden, Wege, Flecken): 2 Dreiecke
   b.pixel(muster,s,farben,x,y,z,tiefe,opt)        Pixelbild aus Klötzen: muster wie im 2D-Szenario ('.rr.|rwwr|.rr.'),
       farben {r:0xff0000,...}, x = Mitte, y = Unterkante, z = Mitte der Tiefe, Blick nach +z
   b.fertig(eltern,opt)                            erzeugt den Körper und gibt ihn zurück (oder null, wenn leer).
       opt: leuchtet (ohne Licht, Seiten leicht abgestuft), deckung (Zahl unter 1: durchsichtig), schatten (false: wirft keinen)
   Jeder Baukasten wird nur einmal fertig gebaut. Nicht an skalierte box-Teile hängen. */
function bau(){
  const P=[], N=[], C=[], U=[], H=[];
  function flaeche(ecken,n,uv,r,g,bl,h){ [0,1,2,0,2,3].forEach(i=>{ const e=ecken[i]; P.push(e[0],e[1],e[2]); N.push(n[0],n[1],n[2]); C.push(r,g,bl); U.push(uv[i][0],uv[i][1]); H.push(h); }); }
  const api={
    klotz(w,h,d,farbe,x,y,z,opt){
      const o=opt||{}, rx=o.rx||0, ry=o.ry||0, rz=o.rz||0, M=[w,h,d], ras=o.raster||1, jit=o.jitter===undefined?.05:o.jitter;
      const f=1+(zufall()-.5)*2*jit, r=((farbe>>16)&255)/255*f, g=((farbe>>8)&255)/255*f, bl=(farbe&255)/255*f;
      const ohneUnten=!rx && !rz && Math.abs(y-h/2)<.011;
      SEITEN.forEach((S,si)=>{ if(si===3 && ohneUnten) return;
        const ecken=S[1].map(e=>{ const q=drehe([e[0]*w/2,e[1]*h/2,e[2]*d/2],rx,ry,rz); return [q[0]+x,q[1]+y,q[2]+z]; });
        const i=Math.floor(zufall()*4), j=Math.floor(zufall()*4); let u0=i/4, v0=j/4, u1, v1;
        if(o.glatt){ u0+=.04; v0+=.04; u1=u0+.17; v1=v0+.17; }
        else { u1=u0+Math.max(1,Math.round(M[S[2]]/ras))/4; v1=v0+Math.max(1,Math.round(M[S[3]]/ras))/4; }
        flaeche(ecken,drehe(S[0],rx,ry,rz),[[u0,v0],[u1,v0],[u1,v1],[u0,v1]],r,g,bl,S[4]); });
      return api;
    },
    quader(x1,y1,z1,x2,y2,z2,farbe,opt){ return api.klotz(Math.abs(x2-x1),Math.abs(y2-y1),Math.abs(z2-z1),farbe,(x1+x2)/2,(y1+y2)/2,(z1+z2)/2,opt); },
    platte(x1,z1,x2,z2,y,farbe,opt){
      const o=opt||{}, ras=o.raster||1, jit=o.jitter===undefined?.04:o.jitter, f=1+(zufall()-.5)*2*jit;
      const i=Math.floor(zufall()*4), j=Math.floor(zufall()*4); let u0=i/4, v0=j/4, u1, v1;
      if(o.glatt){ u0+=.04; v0+=.04; u1=u0+.17; v1=v0+.17; } else { u1=u0+Math.max(1,Math.round((x2-x1)/ras))/4; v1=v0+Math.max(1,Math.round((z2-z1)/ras))/4; }
      flaeche([[x1,y,z2],[x2,y,z2],[x2,y,z1],[x1,y,z1]],[0,1,0],[[u0,v0],[u1,v0],[u1,v1],[u0,v1]],((farbe>>16)&255)/255*f,((farbe>>8)&255)/255*f,(farbe&255)/255*f,1);
      return api;
    },
    pixel(muster,s,farben,x,y,z,tiefe,opt){
      const Z=muster.split('|'), n=Z.length, br=Math.max.apply(null,Z.map(t=>t.length));
      Z.forEach((t,j)=>{ for(let i=0;i<t.length;i++){ const c=farben[t[i]]; if(c!==undefined) api.klotz(s,s,tiefe||s,c,x+(i-br/2+.5)*s,y+(n-j-.5)*s,z,opt); } });
      return api;
    },
    fertig(par,opt){
      const o=opt||{}; if(!P.length) return null;
      const farben=o.leuchtet ? C.map((c,i)=>Math.min(1,c*H[Math.floor(i/3)])) : C;
      const geo=new THREE.BufferGeometry();
      geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); geo.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));
      geo.setAttribute('color',new THREE.Float32BufferAttribute(farben,3)); geo.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));
      const w={ map:blockTextur(), vertexColors:true };
      if(o.deckung!==undefined){ w.transparent=true; w.opacity=o.deckung; w.depthWrite=false; }
      const m=new THREE.Mesh(geo,o.leuchtet?new THREE.MeshBasicMaterial(w):new THREE.MeshLambertMaterial(w));
      m.castShadow=!o.leuchtet && o.deckung===undefined && o.schatten!==false; m.receiveShadow=!o.leuchtet; par.add(m); return m;
    }
  };
  return api;
}
/* kurz: Baukasten füllen und sofort fertig bauen */
function koerper(par,fuelle,opt){ const b=bau(); fuelle(b); return b.fertig(par,opt); }
/* Gruppe, die sich bewegen darf (verschmelze lässt sie in Ruhe) */
function beweglich(par,x,y,z){ const g=gruppe(par,x,y,z); g.userData.lebendig=true; return g; }

/* ---------- Boden ----------
   Kachelboden aus Block-Platten (nur Oberseiten, Oberfläche bei y=0), läuft vorn und seitlich über den Raum hinaus.
   opt: B, T, farben (Liste), raster (1.5), loecher [[x1,z1,x2,z2], ...] (ausgesparte Rechtecke, z. B. Kellerluke),
        weit {links,rechts,vorn,hinten} (Überstand, Standard 18,18,26,0), aussen (Farbe der dunklen Fläche darunter; false: keine),
        tief (Höhe dieser Fläche, Standard -4), erde (Farbe: senkrechte Kante rundum, für schwebende Böden und Schluchten) */
function boden(k,opt){
  const o=opt||{}, B=o.B||36, T=o.T||27, ras=o.raster||1.5, farben=o.farben||MIX.dielen, L=o.loecher||[];
  const w=Object.assign({ links:18, rechts:18, vorn:26, hinten:0 },o.weit||{});
  const g=gruppe(k.scene,0,0,0), b=bau();
  const stueck=(x1,z1,x2,z2,farbe,r,ab)=>{
    for(let i=ab;i<L.length;i++){ const [a,c,d,e]=L[i]; if(x2<=a+.001||x1>=d-.001||z2<=c+.001||z1>=e-.001) continue;
      if(x1<a) stueck(x1,z1,a,z2,farbe,r,i+1); if(x2>d) stueck(d,z1,x2,z2,farbe,r,i+1);
      const l=Math.max(x1,a), h=Math.min(x2,d); if(z1<c) stueck(l,z1,h,c,farbe,r,i+1); if(z2>e) stueck(l,e,h,z2,farbe,r,i+1); return; }
    b.platte(x1,z1,x2,z2,0,farbe,{ raster:r });
  };
  const feld=(x1,z1,x2,z2,r)=>{ if(x2-x1<.01||z2-z1<.01) return; const nx=Math.max(1,Math.round((x2-x1)/r)), nz=Math.max(1,Math.round((z2-z1)/r)), dx=(x2-x1)/nx, dz=(z2-z1)/nz;
    for(let i=0;i<nx;i++) for(let j=0;j<nz;j++) stueck(x1+i*dx,z1+j*dz,x1+(i+1)*dx,z1+(j+1)*dz,wahl(farben),r,0); };
  feld(-B/2,-T/2,B/2,T/2,ras);
  feld(-B/2-w.links,-T/2-w.hinten,-B/2,T/2+w.vorn,ras*2); feld(B/2,-T/2-w.hinten,B/2+w.rechts,T/2+w.vorn,ras*2);
  feld(-B/2,T/2,B/2,T/2+w.vorn,ras*2); feld(-B/2,-T/2-w.hinten,B/2,-T/2,ras*2);
  b.fertig(g,{ schatten:false });
  if(o.erde!==undefined){ const e=bau(), x1=-B/2-w.links, x2=B/2+w.rechts, z1=-T/2-w.hinten, z2=T/2+w.vorn;
    e.quader(x1,-3,z1-.01,x2,-.01,z1+.4,o.erde); e.quader(x1,-3,z2-.4,x2,-.01,z2,o.erde); e.quader(x1,-3,z1,x1+.4,-.01,z2,o.erde); e.quader(x2-.4,-3,z1,x2,-.01,z2,o.erde); e.fertig(g,{ schatten:false }); }
  if(o.aussen!==false){ const u=new THREE.Mesh(new THREE.PlaneGeometry(170,170),basis(o.aussen===undefined?0x1a1018:o.aussen)); u.rotation.x=-Math.PI/2; u.position.y=o.tief===undefined?-4:o.tief; g.add(u); }
  return g;
}
/* ---------- Mauer aus einzelnen Klötzen, von a bis e, Höhe y1 bis y2 ----------
   opt: achse 'x' (Standard: läuft entlang x, Mitte bei z=quer) oder 'z' (läuft entlang z, Mitte bei x=quer),
        d (Dicke .5), farben, raster (1), relief (so weit stehen einzelne Klötze vor, 0), innen (+1 oder -1: Richtung des Vorstehens), unten (Farbe der untersten Reihe), oben (Farben der obersten Reihe) */
function mauer(b,a,e,y1,y2,quer,opt){
  const o=opt||{}, farben=o.farben||MIX.holz, ras=o.raster||1, d=o.d||.5, rel=o.relief||0, innen=o.innen||1;
  if(e-a<.05||y2-y1<.05) return;
  const n=Math.max(1,Math.round((e-a)/ras)), m=Math.max(1,Math.round((y2-y1)/ras)), w=(e-a)/n, h=(y2-y1)/m;
  for(let i=0;i<n;i++) for(let j=0;j<m;j++){
    const f=(j===0&&o.unten!==undefined)?o.unten:(j===m-1&&o.oben)?wahl(o.oben):wahl(farben), v=zufall()<.22?rel:0;
    const p=a+(i+.5)*w, q=quer+innen*v/2;
    if(o.achse==='z') b.klotz(d+v,h,w,f,q,y1+(j+.5)*h,p,{ raster:9 }); else b.klotz(w,h,d+v,f,p,y1+(j+.5)*h,q,{ raster:9 }); }
}
/* ---------- Raumhülle: Licht, Boden, Wände (in den Wandgruppen, blenden beim Drehen aus) ----------
   opt: B,T,H (36,27,6), hintergrund, himmelLicht, grund, staerke, sonne, sonneStaerke, sonnenStand [x,y,z],
        wand (Farbliste), raster (Klotzgröße der Wand, 1), relief (.08), sockel (Farbe der untersten Reihe), krone (Farbliste der obersten Reihe),
        zinnen (Farbe: jeder zweite Klotz oben drauf), waende (false: keine), oeffnung {x,b,h} (Lücke in der Rückwand),
        boden (Optionen für KLOTZ.boden oder false) */
function huelle(k,opt){
  const o=opt||{}, sc=k.scene, B=o.B||36, T=o.T||27, H=o.H||6;
  sc.background=new THREE.Color(o.hintergrund===undefined?0x140e14:o.hintergrund);
  sc.add(new THREE.HemisphereLight(o.himmelLicht===undefined?0xfff4e0:o.himmelLicht,o.grund===undefined?0x5a4440:o.grund,o.staerke||.76));
  const sonne=new THREE.DirectionalLight(o.sonne===undefined?0xffecd0:o.sonne,o.sonneStaerke===undefined?.46:o.sonneStaerke); const S=o.sonnenStand||[-8,26,11]; sonne.position.set(S[0],S[1],S[2]); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  if(o.boden!==false) boden(k,Object.assign({ B,T },o.boden||{}));
  const hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), R={ sc,B,T,H,hinten,links,rechts };
  if(o.waende===false) return R;
  const W={ farben:o.wand||MIX.holz, raster:o.raster||1, relief:o.relief===undefined?.08:o.relief, unten:o.sockel, oben:o.krone };
  const zinne=(b,a,e,quer,achse)=>{ if(o.zinnen===undefined) return; const n=Math.round(e-a); for(let i=0;i<n;i+=2){ const p=a+(i+.5)*(e-a)/n; if(achse==='z') b.klotz(.5,.5,(e-a)/n,o.zinnen,quer,H+.25,p); else b.klotz((e-a)/n,.5,.5,o.zinnen,p,H+.25,quer); } };
  const bh=bau(), z=-T/2-.25, of=o.oeffnung;
  if(of){ mauer(bh,-B/2-.5,of.x-of.b/2,0,H,z,W); mauer(bh,of.x+of.b/2,B/2+.5,0,H,z,W);
    if(H-of.h>.05) mauer(bh,of.x-of.b/2,of.x+of.b/2,of.h,H,z,{ farben:W.farben, raster:W.raster, oben:W.oben });
    zinne(bh,-B/2-.5,of.x-of.b/2,z); zinne(bh,of.x+of.b/2,B/2+.5,z); }
  else { mauer(bh,-B/2-.5,B/2+.5,0,H,z,W); zinne(bh,-B/2-.5,B/2+.5,z); }
  bh.fertig(hinten,{ schatten:false });
  [[links,-1],[rechts,1]].forEach(([w,s])=>{ const b=bau(), x=s*(B/2+.25), q=Object.assign({ achse:'z', innen:-s },W); mauer(b,-T/2,T/2,0,H,x,q); zinne(b,-T/2,T/2,x,'z'); b.fertig(w,{ schatten:false }); });
  return R;
}

/* ---------- Pflanzen (kommen in einen Baukasten; das Hindernis setzt der Raum) ---------- */
/* Block-Baum, Fuß bei (x,0,z). opt: hoch (Stammhöhe 2.2), gr (Kronengröße 1), laub (Farbliste), stamm, aepfel (true), y (Fußhöhe)
   Rückgabe: Radius für k.kreis(x,z,r) (nur der Stamm) */
function baum(b,x,z,opt){
  const o=opt||{}, h=o.hoch||2.2, gr=o.gr||1, y=o.y||0, laub=o.laub||MIX.laub, st=o.stamm===undefined?F.HOLZ2:o.stamm, s=.55*gr;
  const n=Math.max(2,Math.round(h/.55)); for(let i=0;i<n;i++) b.klotz(.55*gr,h/n,.55*gr,i%2?st:F.HOLZ3,x,y+(i+.5)*h/n,z);
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,c])=>b.klotz(.3*gr,.22,.3*gr,F.HOLZ3,x+a*.38*gr,y+.11,z+c*.38*gr));
  const cy=y+h+s*1.5;
  for(let i=-2;i<=2;i++) for(let j=-2;j<=2;j++) for(let l=-2;l<=2;l++){ const d=i*i+j*j*1.5+l*l; if(d>6.6||d<2) continue;
    b.klotz(s,s,s,wahl(laub),x+i*s,cy+j*s,z+l*s); if(o.aepfel && (l===2||Math.abs(i)===2) && (i*7+j*5+l*3+30)%5===0) b.klotz(.2*gr,.2*gr,.2*gr,F.ROT,x+i*s*1.18,cy+j*s-.1,z+l*s*1.18,{ glatt:true }); }
  b.klotz(s*2.6,s*2.6,s*2.6,laub[0],x,cy,z,{ raster:s });
  return .5*gr;
}
function busch(b,x,z,s,farben){
  const g=s||1, L=farben||MIX.laub;
  [[0,.3,0,.7],[-.42,.22,.12,.46],[.4,.24,-.1,.5],[.1,.2,.38,.42],[-.05,.68,-.02,.42],[-.2,.18,-.34,.36]].forEach(([a,y,c,w])=>b.klotz(w*g,Math.min(w,y*2)*g,w*g,wahl(L),x+a*g,y*g,z+c*g,{ ry:zufall()*.5 }));
}
/* Blume: Stiel, vier Blütenklötzchen, gelbe Mitte */
function blume(b,x,z,farbe,s){
  const g=s||1, h=(.34+zufall()*.22)*g;
  b.klotz(.06*g,h,.06*g,F.GRUEN2,x,h/2,z,{ glatt:true }); b.klotz(.2*g,.04,.09*g,F.GRUEN,x+.09*g,h*.35,z,{ glatt:true });
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,c])=>b.klotz(.12*g,.08*g,.12*g,farbe,x+a*.11*g,h,z+c*.11*g,{ glatt:true })); b.klotz(.11*g,.12*g,.11*g,farbe===F.GELB?F.ORANGE:F.GELB,x,h+.01,z,{ glatt:true });
}
/* Grasbüschel: n kleine Klötzchen im Umkreis r */
function gras(b,x,z,r,n){ for(let i=0;i<(n||8);i++){ const a=zufall()*6.28, d=Math.sqrt(zufall())*(r||.5), h=.12+zufall()*.18; b.klotz(.09,h,.09,wahl([0x52a844,0x66b84e,0x8ad870]),x+Math.cos(a)*d,h/2,z+Math.sin(a)*d,{ glatt:true }); } }
/* Block-Pilz */
function pilz(b,x,z,s,farbe,y){
  const g=s||1, c=farbe===undefined?F.ROT:farbe, u=y||0;
  b.klotz(.24*g,.5*g,.24*g,F.CREME,x,u+.25*g,z,{ glatt:true }); b.klotz(.8*g,.2*g,.8*g,c,x,u+.57*g,z); b.klotz(.52*g,.18*g,.52*g,c,x,u+.75*g,z);
  [[-.22,.68,.41],[.24,.52,.41],[.15,.85,0],[-.12,.85,.14]].forEach(([a,h,d])=>b.klotz(.13*g,.08*g,.1*g,F.WEISS,x+a*g,u+h*g,z+d*g,{ glatt:true }));
}
/* Kristall aus gestuften Klötzen (am schönsten in einem eigenen Baukasten mit fertig(par,{leuchtet:true})), neig = Schräge */
function kristall(b,x,y,z,s,farbe,neig){
  const g=s||1, c=farbe===undefined?F.KRIST:farbe, w=neig||0;
  [[.5,.8,.4],[.38,.5,1.05],[.24,.34,1.45],[.1,.22,1.72]].forEach(([br,h,hy])=>b.klotz(br*g,h*g,br*g,c,x-Math.sin(w)*hy*g,y+Math.cos(w)*hy*g,z,{ rz:w, ry:.6, glatt:true }));
}
/* ---------- Himmel ---------- */
/* eine Block-Wolke in einen Baukasten */
function wolke(b,x,y,z,s){
  const g=s||1;
  b.klotz(3.2*g,.55*g,1.6*g,0xffffff,x,y,z,{ glatt:true, jitter:.01 }); b.klotz(1.8*g,.55*g,1.3*g,0xffffff,x-.35*g,y+.5*g,z,{ glatt:true, jitter:.01 }); b.klotz(1.1*g,.4*g,1.0*g,0xffffff,x+.95*g,y+.42*g,z+.05*g,{ glatt:true, jitter:.01 }); b.klotz(2.2*g,.3*g,1.2*g,0xdcecfc,x+.15*g,y-.38*g,z,{ glatt:true, jitter:.01 });
}
/* viele Wolken als EIN Körper, ziehen sanft hin und her. liste [[x,y,z,groesse], ...], opt: drift (1.5), phase */
function wolken(k,par,liste,opt){
  const o=opt||{}, g=beweglich(par,0,0,0), b=bau(); liste.forEach(w=>wolke(b,w[0],w[1],w[2],w[3])); b.fertig(g,{ leuchtet:true });
  const d=o.drift===undefined?1.5:o.drift, ph=o.phase||0; k.anim.push(t=>{ g.position.x=Math.sin(t*.12+ph)*d; });
  return g;
}
/* Fenster mit Himmel und Wölkchen, Mitte bei (x,y,z), Blick nach +z (für Seitenwände eine gedrehte Gruppe benutzen) */
function fenster(par,x,y,z,br,ho,opt){
  const o=opt||{}, W=br||2.4, H=ho||2.2, rc=o.rahmen===undefined?F.HOLZ3:o.rahmen, g=gruppe(par,x,y,z);
  const h=bau(); h.klotz(W,H,.06,o.himmel===undefined?0x9fd8ff:o.himmel,0,0,.02,{ glatt:true, jitter:0 });
  if(o.wolke!==false){ h.klotz(W*.42,H*.14,.04,0xffffff,-W*.12,-H*.14,.06,{ glatt:true }); h.klotz(W*.22,H*.13,.04,0xffffff,-W*.14,-H*.02,.06,{ glatt:true }); }
  h.fertig(g,{ leuchtet:true });
  const b=bau(); [-1,1].forEach(s=>{ b.klotz(W+.44,.22,.26,rc,0,s*(H/2+.11),.1,{ raster:.4 }); b.klotz(.22,H,.26,rc,s*(W/2+.11),0,.1,{ raster:.4 }); });
  b.klotz(.09,H,.1,rc,0,0,.1); b.klotz(W,.09,.1,rc,0,0,.1); b.klotz(W+.7,.14,.42,F.HOLZ,0,-H/2-.28,.18); b.fertig(g,{ schatten:false });
  return g;
}
/* ---------- Lampen (das echte Licht dazu sparsam mit flacker) ---------- */
/* Hängelampe: Mitte der Lampe bei (x,y,z), Kette nach oben. opt: farbe (Dach), licht (Leuchtfarbe), kette (Länge 2), schein (false: ohne Lichthof) */
function haengelampe(par,x,y,z,opt){
  const o=opt||{}, g=gruppe(par,x,y,z), c=o.farbe===undefined?F.ROT:o.farbe, l=o.kette===undefined?2:o.kette;
  const b=bau(); for(let i=0;i<l/.16;i++) b.klotz(i%2?.05:.1,.13,i%2?.1:.05,F.DUNKEL,0,.58+i*.16,0,{ glatt:true }); b.klotz(.34,.14,.34,c,0,.48,0); b.klotz(.78,.18,.78,c,0,.33,0);
  [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.07,.5,.07,F.DUNKEL,s*.24,0,t*.24,{ glatt:true }))); b.klotz(.58,.09,.58,F.DUNKEL,0,-.28,0); b.fertig(g,{ schatten:false });
  koerper(g,e=>e.klotz(.42,.46,.42,o.licht===undefined?0xfff0a0:o.licht,0,0,0),{ leuchtet:true });
  if(o.schein!==false) schein(g,'rgba(255,225,130,.5)',0,0,0,2.0);
  return g;
}
/* Laterne auf einem Pfosten, Fuß bei y=0. Hindernis: k.kreis(x,z,.35). opt: hoch (2.2), farbe, licht */
function laterne(par,x,z,opt){
  const o=opt||{}, h=o.hoch||2.2, g=gruppe(par,x,0,z), c=o.farbe===undefined?F.HOLZ3:o.farbe;
  const b=bau(); b.klotz(.6,.22,.6,F.GRAU2,0,.11,0); b.klotz(.22,h,.22,c,0,h/2+.2,0,{ raster:.45 }); b.klotz(.62,.1,.62,c,0,h+.24,0); [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.07,.5,.07,c,s*.23,h+.54,t*.23,{ glatt:true }))); b.klotz(.7,.14,.7,c,0,h+.86,0); b.klotz(.36,.14,.36,c,0,h+1.0,0); b.fertig(g);
  koerper(g,e=>e.klotz(.38,.46,.38,o.licht===undefined?0xfff0a0:o.licht,0,h+.54,0),{ leuchtet:true }); schein(g,'rgba(255,225,130,.5)',0,h+.54,0,1.8);
  return g;
}
/* goldenes Block-Zahlenschloss (etwa 1 breit, 1.1 hoch), Mitte bei (x,y,z), Blick nach +z; gr = Größe */
function schloss(par,x,y,z,gr){
  const g=gruppe(par,x,y,z); g.scale.setScalar(gr||1);
  koerper(g,b=>{ [-.28,.28].forEach(v=>b.klotz(.16,.5,.16,0xb8c0cc,v,.5,0)); b.klotz(.72,.16,.16,0xb8c0cc,0,.82,0);
    b.klotz(1.0,.7,.26,F.GOLD,0,0,0,{ raster:.35 }); b.klotz(1.08,.1,.3,0xffe480,0,.34,0); b.klotz(1.08,.1,.3,0xb88820,0,-.34,0);
    [-.29,0,.29].forEach(v=>{ b.klotz(.23,.34,.04,0xfff6d8,v,-.01,.15,{ glatt:true }); b.klotz(.07,.17,.03,0x2a1a08,v,-.01,.18,{ glatt:true }); }); },{ schatten:false });
  return g;
}

/* ---------- Tiere (eigene Gestaltung, nicht fest). Blick nach +x; laufen mit laeufer(k,tier.g,[[x,z],...],tempo,start,huepf) ---------- */
function augen(b,x,y,z,s){ [-1,1].forEach(v=>{ b.klotz(.04,.13*s,.12*s,0xffffff,x,y,v*z,{ glatt:true, jitter:0 }); b.klotz(.03,.08*s,.07*s,0x181018,x+.02,y-.012*s,v*z,{ glatt:true, jitter:0 }); b.klotz(.02,.026*s,.026*s,0xffffff,x+.036,y+.016*s,v*z+.014*s,{ glatt:true, jitter:0 }); }); }
/* rundlicher Klotz: drei ineinander gesteckte Klötze mit abgesetzten Kanten */
function rund(b,w,h,d,c,x,y,z){ const o={ glatt:true, jitter:.015 }; b.klotz(w,h*.68,d*.68,c,x,y,z,o); b.klotz(w*.68,h,d*.68,c,x,y,z,o); b.klotz(w*.68,h*.68,d,c,x,y,z,o); }
/* Schaf: runde Lockenwolke, runder pflaumenfarbener Kopf mit Schlappohren, buntes Halsband mit Glöckchen. opt: farbe (Fell), grast (senkt den Kopf), laeuft (hebt die Beine), phase
   Rückgabe { g, kopf, beine } (Breite etwa 1.7, Hindernis falls stehend: k.kreis(x,z,.8*gr)) */
function schaf(k,par,x,z,dreh,gr,opt){
  const o=opt||{}, g=beweglich(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(gr||1);
  const W=o.farbe===undefined?0xfff6ea:o.farbe, W2=o.farbe===undefined?0xf4e4d4:o.farbe, H=0x6e4a6a;
  const rumpf=beweglich(g,0,0,0);
  koerper(rumpf,b=>{ rund(b,1.18,.82,.88,W,-.1,.8,0);
    [[-.5,1.13,-.18],[-.14,1.22,.12],[.22,1.14,-.14],[-.42,.98,.37],[.06,1.0,.42],[.24,.72,.37],[-.2,.62,.43],[-.56,.7,.3],[-.42,.98,-.37],[.06,1.0,-.42],[.24,.72,-.37],[-.2,.62,-.43],[-.56,.7,-.3],[-.68,.98,0]].forEach(([a,y,c],i)=>rund(b,.34,.32,.32,i%2?W2:W,a,y,c));
    rund(b,.26,.26,.26,W2,-.8,.86,0); });
  const beine=[[[.26,.23],[-.44,-.23]],[[.26,-.23],[-.44,.23]]].map(paar=>{ const q=beweglich(g,0,0,0); koerper(q,b=>paar.forEach(([a,c])=>{ b.klotz(.13,.4,.13,H,a,.3,c,{ glatt:true }); rund(b,.22,.14,.22,0xf0b040,a+.02,.07,c); })); return q; });
  const kopf=beweglich(g,.5,.98,0);
  koerper(kopf,b=>{ b.klotz(.16,.14,.5,F.TUERKIS,.13,-.17,0,{ glatt:true }); rund(b,.18,.18,.16,F.GOLD,.3,-.27,0);
    rund(b,.5,.52,.54,H,.27,.12,0); rund(b,.16,.17,.28,0xf4c8c0,.5,-.01,0); b.klotz(.03,.05,.1,0x5a2a3a,.585,.03,0,{ glatt:true }); b.klotz(.03,.03,.13,0x5a2a3a,.585,-.05,0,{ glatt:true });
    augen(b,.52,.19,.12,.95); [-1,1].forEach(v=>{ b.klotz(.04,.06,.08,0xff90a8,.49,.06,v*.2,{ glatt:true }); b.klotz(.18,.36,.12,H,.14,.05,v*.34,{ rx:-v*.45, glatt:true }); b.klotz(.1,.22,.04,0xf0a8b4,.16,.02,v*.405,{ rx:-v*.45, glatt:true }); });
    rund(b,.36,.24,.4,W,.2,.42,0); rund(b,.22,.2,.22,W2,.37,.45,.1); rund(b,.2,.18,.2,W,.34,.43,-.14); });
  const ph=o.phase||0;
  k.anim.push(t=>{ const u=t+ph;
    if(o.grast){ const a=Math.max(0,Math.min(1,Math.sin(u*.6)*2)); kopf.rotation.z=-.75*a+Math.sin(u*7)*.04*a; kopf.position.y=.98-.26*a; } else { kopf.rotation.y=Math.sin(u*.9)*.3; kopf.rotation.z=Math.sin(u*1.7)*.05; }
    if(o.laeuft) beine.forEach((q,i)=>q.position.y=Math.max(0,Math.sin(u*7+i*3.14))*.1); });
  return { g, kopf, beine };
}
/* Huhn: kugelig, goldbraun, mit buntem Federfächer und rundem Kopf. opt: farbe, pickt, laeuft, phase. Rückgabe { g, kopf, beine } (etwa 0.9 breit) */
function huhn(k,par,x,z,dreh,gr,opt){
  const o=opt||{}, g=beweglich(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(gr||1);
  const W=o.farbe===undefined?0xe09a50:o.farbe, B=0xffe4b8;
  const beine=beweglich(g,0,0,0); koerper(beine,b=>[-1,1].forEach(v=>{ b.klotz(.06,.24,.06,0xd8a030,0,.14,v*.13,{ glatt:true }); b.klotz(.18,.05,.15,0xd8a030,.05,.03,v*.13,{ glatt:true }); }));
  const rumpf=beweglich(g,0,0,0);
  koerper(rumpf,b=>{ rund(b,.64,.52,.56,W,-.04,.47,0); rund(b,.3,.34,.38,B,.2,.43,0);
    [-1,1].forEach(v=>{ rund(b,.36,.26,.1,0xb8602c,-.08,.51,v*.29); b.klotz(.18,.08,.07,F.TUERKIS,-.22,.44,v*.33,{ rz:.35, glatt:true }); });
    [[-.38,.76,0,.5,F.TUERKIS],[-.44,.7,.13,.8,0xb8602c],[-.44,.7,-.13,.8,0xb8602c],[-.5,.57,0,1.15,F.BLAU]].forEach(([a,y,c,w,f])=>{ b.klotz(.13,.36,.1,f,a,y,c,{ rz:w, glatt:true }); }); });
  const kopf=beweglich(g,.24,.68,0);
  koerper(kopf,b=>{ rund(b,.24,.26,.26,B,.07,.06,0); rund(b,.36,.36,.36,W,.14,.24,0); b.klotz(.1,.1,.12,F.GELB,.35,.21,0,{ glatt:true }); b.klotz(.07,.05,.07,F.ORANGE,.42,.19,0,{ glatt:true }); b.klotz(.05,.09,.07,F.ROT,.33,.12,0,{ glatt:true });
    augen(b,.325,.3,.09,.75); [-1,1].forEach(v=>b.klotz(.03,.05,.06,0xff8878,.322,.2,v*.12,{ glatt:true })); rund(b,.13,.13,.09,F.ROT,.17,.45,0); rund(b,.1,.1,.08,F.ROT,.07,.44,0); });
  const ph=o.phase||0;
  k.anim.push(t=>{ const u=t+ph;
    if(o.pickt){ const a=Math.sin(u*1.2)>.2 ? Math.abs(Math.sin(u*8)) : 0; kopf.rotation.z=-1.1*a; } else kopf.rotation.y=Math.sin(u*2.3)*.35;
    if(o.laeuft) beine.rotation.z=Math.sin(u*10)*.12; });
  return { g, kopf, beine };
}
/* Pixelbiene (eigene Gestalt): kugeliger Ringelbauch in Orange und Violett, flauschiger weißer Kragen, eigener runder Kopf mit hellem Gesicht,
   runde hohe Flügel, vier Stummelbeine. (x,y,z) = Flugmitte. opt: runde (Radius, 0 = schwebt auf der Stelle), tempo, phase
   Rückgabe { g, fluegel } (etwa 0.9 lang bei gr=1) */
function biene(k,par,x,y,z,gr,opt){
  const o=opt||{}, g=beweglich(par,x,y,z); g.scale.setScalar(gr||1);
  const O=0xff9a1e, D=0x5a2e78;
  koerper(g,b=>{ [[-.4,.2,O],[-.31,.34,D],[-.22,.45,O],[-.13,.48,D],[-.04,.42,O]].forEach(([a,s,c])=>rund(b,.1,s,s,c,a,-.04+(a+.04)*.2,0));
    rund(b,.16,.34,.38,0xfffaf0,.07,.02,0);
    rund(b,.38,.4,.42,0xffd84a,.27,.14,0); rund(b,.06,.28,.32,0xffefd0,.455,.11,0);
    [-1,1].forEach(v=>{ rund(b,.05,.13,.1,0x24142e,.485,.15,v*.085); b.klotz(.02,.035,.035,0xffffff,.515,.18,v*.07,{ glatt:true, jitter:0 }); b.klotz(.02,.04,.06,0xff7aa0,.49,.05,v*.14,{ glatt:true });
      b.klotz(.035,.17,.035,D,.28,.39,v*.11,{ rx:v*.45, glatt:true }); b.klotz(.035,.11,.035,D,.32,.49,v*.15,{ rz:-.9, glatt:true }); rund(b,.11,.11,.11,0xff6aa8,.38,.52,v*.15);
      [-.2,.02].forEach(a=>{ b.klotz(.05,.12,.05,D,a,-.31,v*.12,{ glatt:true }); rund(b,.11,.08,.1,D,a+.02,-.38,v*.12); }); });
    b.klotz(.02,.03,.09,0x7a2a3a,.49,.04,0,{ glatt:true }); },{ schatten:false });
  const fluegel=[-1,1].map(v=>{ const q=beweglich(g,-.07,.2,v*.12); koerper(q,b=>{ b.klotz(.2,.52,.03,0xc8f0ff,0,.28,0,{ glatt:true }); b.klotz(.34,.34,.026,0xc8f0ff,0,.3,0,{ glatt:true }); b.klotz(.1,.2,.05,0xffffff,.04,.34,0,{ glatt:true }); },{ leuchtet:true, deckung:.72 }); q.rotation.x=v*.6; return q; });
  const r=o.runde===undefined?1.2:o.runde, tm=o.tempo||.8, ph=o.phase||0;
  k.anim.push(t=>{ const u=t+ph; fluegel.forEach((q,i)=>q.rotation.x=(i?1:-1)*(.6+Math.sin(u*28)*.4));
    if(r){ const a=u*tm; g.position.set(x+Math.cos(a)*r,y+Math.sin(u*2.6)*.18,z+Math.sin(a)*r*.7); g.rotation.y=Math.atan2(-Math.cos(a)*.7,-Math.sin(a)); } else g.position.y=y+Math.sin(u*2.6)*.12; });
  return { g, fluegel };
}

/* ---------- Heißluftballon aus Klötzen (Ausgang in Raum 5 und Schlussbild) ----------
   Ursprung = Standfläche der Figur im Korb. Korb 2.1 x 2.1 (Wände bis y=.85) mit Türchen nach +z, Hülle etwa y 3 bis 7.4, Radius 2.2.
   Rückgabe { g (ganzer Ballon, zum Heben: g.position.y), tor (Türchen: tor.rotation.y von 0 nach 1.9), huelle, flamme } */
function ballon(par,x,y,z,opt){
  const o=opt||{}, farben=o.farben||[F.ROT,F.GELB], g=beweglich(par,x,y,z);
  const korb=gruppe(g,0,0,0);
  koerper(korb,b=>{ b.klotz(2.1,.16,2.1,F.HOLZ3,0,-.06,0,{ raster:.5 });
    const wand=(w,d,a,c)=>{ b.klotz(w,.72,d,F.HELLHOLZ,a,.38,c,{ raster:.36 }); b.klotz(w+.06,.14,d+.06,F.HOLZ2,a,.8,c); };
    wand(2.1,.18,0,-.96); [-1,1].forEach(s=>{ wand(.18,1.74,s*.96,0); wand(.5,.18,s*.8,.96); });
    [-1,1].forEach(s=>[-1,1].forEach(t=>{ b.klotz(.12,2.4,.12,F.HOLZ3,s*.98,1.9,t*.98,{ rz:s*.1, rx:-t*.1, glatt:true }); })); b.klotz(.6,.16,.6,F.GRAU2,0,2.75,0);
    [-1,1].forEach(s=>{ b.klotz(1.8,.08,.08,F.HOLZ3,0,2.98,s*.8,{ glatt:true }); b.klotz(.08,.08,1.8,F.HOLZ3,s*.8,2.98,0,{ glatt:true }); b.klotz(.34,.36,.2,F.CREME,s*1.14,.38,-.2); }); });
  const tor=beweglich(g,-.55,0,.96);
  koerper(tor,b=>{ b.klotz(1.1,.72,.14,F.HOLZ,.55,.38,0,{ raster:.36 }); b.klotz(1.1,.14,.2,F.GOLD,.55,.8,0); b.klotz(.18,.18,.08,F.GOLD,.86,.45,.1,{ glatt:true }); });
  const huellG=gruppe(g,0,0,0), b=bau(), s=.55;
  [.75,1.2,1.65,2.0,2.2,2.2,2.05,1.7,1.15].forEach((r,j)=>{ const y0=3.2+j*.5, n=Math.ceil(r/s);
    for(let i=-n;i<=n;i++) for(let l=-n;l<=n;l++){ const a=i*s, c=l*s, d=Math.hypot(a,c); if(d>r+.1 || (d<r-.62 && j>0 && j<8)) continue; const w=Math.floor((Math.atan2(c,a)+Math.PI)/(Math.PI*2)*8+.5)%2; b.klotz(s,.5,s,farben[w],a,y0,c); } });
  b.klotz(.8,.3,.8,farben[1],0,7.6,0); b.fertig(huellG,{ schatten:false });
  const flamme=beweglich(g,0,3.0,0); koerper(flamme,e=>{ e.klotz(.3,.3,.3,F.ORANGE,0,0,0); e.klotz(.18,.22,.18,F.GELB,0,.22,0); },{ leuchtet:true });
  return { g, tor, huelle:huellG, flamme };
}

/* ---------- die zehn neuen Gegenstände (9 und 10 je Raum) ----------
   Fertige Teile der Gegenstand-Beschreibung (r oder kasten, treffer, baue); der Raum ergänzt x, z, steh (und bei Bedarf dreh):
   Object.assign({ x:3, z:4, steh:[3,6] }, KLOTZ.NEU.schaukelstuhl). Vorderseite zeigt nach +z.
   kasten dreht sich nicht mit: bei gedrehtem Gegenstand einen eigenen, größeren kasten angeben. */
const NEU={
  schaukelstuhl:{ kasten:[2.0,2.2], treffer:[1.9,3.0,2.0], baue(g,k){ /* Raum 1, Nr. 9: Schaukelstuhl mit rotem Kissen, schaukelt sanft */
    koerper(g,b=>{ b.klotz(2.2,.05,2.2,0x3a7a8a,0,.025,0,{ raster:.55 }); b.klotz(1.8,.06,1.8,F.CREME,0,.035,0,{ raster:.45 }); },{ schatten:false });
    const s=beweglich(g,0,.08,0);
    koerper(s,b=>{ [-.62,.62].forEach(x=>{ [[-.95,.34],[-.68,.17],[-.34,.08],[0,.06],[.34,.08],[.68,.17],[.95,.34]].forEach(([z,y])=>b.klotz(.16,.14,.38,F.HOLZ3,x,y,z,{ rx:-z*.38 }));
        b.klotz(.16,.8,.16,F.HOLZ2,x,.55,.52); b.klotz(.16,2.35,.16,F.HOLZ2,x,1.3,-.55,{ rx:-.14 }); b.klotz(.22,.14,1.25,F.HOLZ,x,1.3,-.03); b.klotz(.16,.4,.16,F.HOLZ2,x,1.08,.52); });
      b.klotz(1.25,.16,1.15,F.HOLZ,0,.8,0,{ raster:.4 }); b.klotz(1.08,.22,.98,F.ROT,0,.97,.04,{ raster:.36 });
      [-.32,0,.32].forEach(x=>b.klotz(.2,1.25,.1,F.HELLHOLZ,x,1.62,-.62,{ rx:-.14 })); b.klotz(1.4,.32,.18,F.HOLZ,0,2.36,-.73,{ rx:-.14 }); b.klotz(.72,.5,.18,F.ROT,0,1.75,-.52,{ rx:-.14, raster:.25 }); [-.2,.2].forEach(x=>b.klotz(.16,.16,.04,F.GELB,x,1.75,-.41,{ rx:-.14, glatt:true })); });
    k.anim.push(t=>{ s.rotation.x=Math.sin(t*1.5)*.07; }); } },
  waschzuber:{ r:1.15, treffer:[2.3,2.1,2.2], baue(g,k){ /* Raum 1, Nr. 10: runder Holzzuber mit Wasser, Schaum, Waschbrett, Handtuch und Quietsche-Ente */
    koerper(g,b=>{ for(let i=0;i<14;i++){ const a=i*Math.PI/7, x=Math.sin(a)*.92, z=Math.cos(a)*.92; b.klotz(.44,.9,.18,i%2?F.HOLZ:F.HELLHOLZ,x,.55,z,{ ry:a }); [.28,.82].forEach(y=>b.klotz(.46,.1,.23,0xa8b0bc,x,y,z,{ ry:a, glatt:true })); }
      [[-.7,-.7],[.7,-.7],[-.7,.7],[.7,.7]].forEach(([x,z])=>b.klotz(.26,.16,.26,F.HOLZ3,x,.08,z)); b.klotz(1.3,.1,1.3,F.HOLZ3,0,.2,0);
      /* Handtuch über dem Rand */
      b.klotz(.55,.12,.4,F.ROSA,-.78,1.05,.5,{ ry:-.99 }); b.klotz(.55,.55,.1,F.ROSA,-.9,.76,.58,{ ry:-.99 }); b.klotz(.57,.1,.12,F.WEISS,-.91,.62,.585,{ ry:-.99, glatt:true });
      /* Waschbrett lehnt innen hinten */
      b.klotz(.12,1.15,.12,F.HOLZ2,-.34,1.35,-.62,{ rx:-.22 }); b.klotz(.12,1.15,.12,F.HOLZ2,.34,1.35,-.62,{ rx:-.22 }); b.klotz(.7,.24,.12,F.HOLZ,0,1.84,-.73,{ rx:-.22 });
      for(let i=0;i<5;i++) b.klotz(.56,.09,.12,i%2?0x8a96a8:0xc8d4e4,0,.96+i*.16,-.54-i*.036,{ rx:-.22, glatt:true }); });
    koerper(g,b=>{ b.klotz(1.62,.08,1.2,0x7acdf4,0,.9,0,{ raster:.4 }); b.klotz(1.2,.08,1.64,0x7acdf4,0,.895,0,{ raster:.4 }); });
    koerper(g,b=>{ [[-.45,.3,.3],[-.2,.5,.2],[-.55,0,.2],[.4,-.35,.26],[.18,-.45,.18],[-.28,.18,.17],[.62,-.1,.16]].forEach(([x,z,s],i)=>b.klotz(s,s*.8,s,0xffffff,x,.96+s*.25+(i%2)*.04,z,{ ry:i, glatt:true })); },{ leuchtet:true });
    const e=beweglich(g,.3,.98,.32);
    koerper(e,b=>{ b.klotz(.44,.24,.3,F.GELB,0,.1,0,{ glatt:true }); b.klotz(.26,.26,.26,F.GELB,.14,.33,0,{ glatt:true }); b.klotz(.16,.08,.16,F.ORANGE,.33,.3,0,{ glatt:true }); b.klotz(.12,.12,.2,F.GELB,-.25,.2,0,{ glatt:true }); [-1,1].forEach(v=>b.klotz(.05,.06,.03,F.SCHWARZ,.2,.38,v*.14,{ glatt:true })); });
    e.rotation.y=-.5; k.anim.push(t=>{ e.position.y=.98+Math.sin(t*2)*.035; e.rotation.z=Math.sin(t*1.6)*.07; }); } },
  hoehlensee:{ kasten:[4.4,3.2], treffer:[4.2,1.8,3.0], baue(g,k){ /* Raum 2, Nr. 9: kleiner leuchtender See mit Steinrand und Holzboot mit Laterne */
    koerper(g,b=>{ for(let i=0;i<10;i++){ const x=-1.98+i*.44; [-1,1].forEach(v=>{ const h=.22+((i*3+(v>0?1:0))%4)*.07; b.klotz(.46,h,.42,wahl(MIX.stein),x,h/2,v*1.38,{ ry:(i%3-1)*.14 }); }); }
      for(let i=0;i<5;i++){ const z=-.92+i*.46; [-1,1].forEach(v=>{ const h=.24+((i*5+(v>0?2:0))%4)*.07; b.klotz(.44,h,.48,wahl(MIX.stein),v*2.0,h/2,z,{ ry:(i%3-1)*.12 }); }); } });
    koerper(g,b=>{ for(let i=0;i<8;i++) for(let j=0;j<5;j++) b.platte(-1.84+i*.46,-1.17+j*.468,-1.38+i*.46,-.702+j*.468,.14,wahl([0x2a8ac8,0x34a0d8,0x2e94d0,0x46b8e4]),{ raster:.5 }); },{ leuchtet:true });
    const glitz=beweglich(g,0,.155,0); koerper(glitz,b=>[[-1.4,-.7],[1.35,.75],[1.5,-.6],[-1.2,.8],[.2,-.9]].forEach(([x,z])=>b.platte(x-.18,z-.04,x+.18,z+.04,0,0xd8fcff,{ glatt:true })),{ leuchtet:true });
    const boot=beweglich(g,0,.16,.05);
    koerper(boot,b=>{ b.klotz(1.8,.16,.76,F.HOLZ3,0,.06,0,{ raster:.4 }); [-1,1].forEach(v=>{ b.klotz(1.9,.38,.14,F.HOLZ,0,.3,v*.46,{ raster:.38 }); b.klotz(1.94,.1,.18,F.ROT,0,.52,v*.46); });
      [-1,1].forEach(s=>{ b.klotz(.3,.38,.78,F.HOLZ,s*1.03,.32,0); b.klotz(.22,.42,.44,F.HOLZ2,s*1.27,.38,0); b.klotz(.34,.1,.82,F.ROT,s*1.03,.54,0); b.klotz(.26,.1,.48,F.ROT,s*1.27,.62,0); });
      b.klotz(.3,.1,.8,F.HELLHOLZ,-.42,.4,0); b.klotz(.5,.3,.4,F.CREME,.2,.29,0,{ ry:.35 }); b.klotz(.52,.07,.12,F.ROT,.2,.45,0,{ ry:.35, glatt:true }); b.klotz(.1,.62,.1,F.DUNKEL,1.27,.9,0,{ glatt:true }); b.klotz(.34,.08,.34,F.DUNKEL,1.27,1.22,0,{ glatt:true }); b.klotz(.34,.08,.34,F.DUNKEL,1.27,1.58,0,{ glatt:true }); });
    koerper(boot,b=>b.klotz(.24,.3,.24,0xfff0a0,1.27,1.4,0),{ leuchtet:true }); schein(boot,'rgba(255,225,130,.55)',1.27,1.4,0,1.5);
    koerper(g,b=>{ kristall(b,-1.95,.2,-1.3,.6,F.KRIST,.35); kristall(b,-1.65,.1,-1.4,.4,F.KRIST,-.2); kristall(b,2.0,.2,-1.25,.55,F.PINK,-.35); },{ leuchtet:true });
    k.anim.push(t=>{ boot.position.y=.16+Math.sin(t*1.4)*.04; boot.rotation.z=Math.sin(t*1.1)*.03; boot.rotation.x=Math.sin(t*.9)*.03; glitz.position.x=Math.sin(t*.8)*.12; }); } },
  foerderkorb:{ kasten:[3.4,1.8], treffer:[3.3,3.9,1.6], baue(g,k){ /* Raum 2, Nr. 10: Holzgerüst mit Rolle, Seil, hängendem Korb voller bunter Steine und Seilwinde mit Kurbel */
    koerper(g,b=>{ [-1.15,.65].forEach(x=>{ b.klotz(.26,3.4,.26,F.HOLZ2,x,1.7,-.35,{ raster:.5 }); b.klotz(.4,.2,1.3,F.HOLZ3,x,.1,-.15); b.klotz(.14,1.1,.14,F.HOLZ3,x,.55,.15,{ rx:-.55 }); });
      b.klotz(2.4,.28,.34,F.HOLZ,-.25,3.45,-.35,{ raster:.4 }); [-1,1].forEach(s=>b.klotz(.16,.9,.14,F.HOLZ3,-.25+s*.62,3.0,-.35,{ rz:s*.75 }));
      b.klotz(.12,.12,.55,F.GRAU2,-.25,3.45,-.05,{ glatt:true }); b.klotz(.5,.5,.14,F.GRAU,-.25,3.45,.14); b.klotz(.5,.5,.14,F.GRAU,-.25,3.45,.13,{ rz:Math.PI/4 }); b.klotz(.16,.16,.2,F.GOLD,-.25,3.45,.15,{ glatt:true });
      /* Seil zur Winde */
      b.klotz(1.95,.07,.07,F.SAND,.57,2.45,.15,{ rz:-.99, glatt:true });
      /* Winde auf zwei Böcken */
      [.88,1.62].forEach(x=>{ b.klotz(.14,1.65,.5,F.HOLZ3,x,.82,.15); b.klotz(.22,.14,.9,F.HOLZ3,x,.07,.15); }); });
    const w=beweglich(g,1.25,1.65,.15);
    koerper(w,b=>{ b.klotz(.62,.4,.4,F.SAND,0,0,0,{ raster:.15 }); b.klotz(.62,.4,.4,0xd0b070,0,0,0,{ rx:Math.PI/4, raster:.15 }); b.klotz(.9,.12,.12,F.GRAU2,.06,0,0,{ glatt:true }); b.klotz(.1,.52,.1,F.GRAU2,.54,.2,0,{ glatt:true }); b.klotz(.3,.14,.14,F.ROT,.68,.44,0,{ glatt:true }); });
    const korb=beweglich(g,-.25,0,.15);
    koerper(korb,b=>{ b.klotz(.07,1.4,.07,F.SAND,0,2.75,0,{ glatt:true }); [-1,1].forEach(s=>[-1,1].forEach(t=>{ b.klotz(.06,.95,.06,F.GRAU2,s*.32,1.7,t*.26,{ rz:s*.72, rx:-t*.55, glatt:true }); b.klotz(.12,.62,.12,F.HOLZ3,s*.62,1.07,t*.5); }));
      b.klotz(1.36,.14,1.12,F.HOLZ3,0,.75,0,{ raster:.35 }); [.93,1.3].forEach(y=>{ [-1,1].forEach(s=>{ b.klotz(1.36,.16,.1,F.HELLHOLZ,0,y,s*.52); b.klotz(.1,.16,1.04,F.HELLHOLZ,s*.63,y,0); }); }); });
    koerper(korb,b=>[[-.34,1.2,.2,F.KRIST],[.1,1.34,.05,F.PINK],[.38,1.18,.22,F.LIME],[-.05,1.12,-.22,F.GELB],[.32,1.25,-.2,F.KRIST],[-.38,1.28,-.16,F.PINK]].forEach(([x,y,z,c],i)=>b.klotz(.32,.34,.3,c,x,y,z,{ ry:i*.7, rz:(i%3-1)*.35, glatt:true })),{ leuchtet:true });
    k.anim.push(t=>{ const s=Math.sin(t*.8); korb.position.y=s*.06; w.rotation.x=s*.5; }); } },
  bauroboter:{ r:1.1, treffer:[2.2,3.2,1.8], baue(g,k){ /* Raum 3, Nr. 9: freundlicher Bauroboter auf Ketten mit Bildschirm-Gesicht, Bauhelm und Greifhänden, trägt einen blauen Klotz */
    const O=0xf29a2a, O2=0xc87418;
    koerper(g,b=>{ [-.52,.52].forEach(x=>{ b.klotz(.46,.42,1.4,F.DUNKEL,x,.23,0,{ raster:.22 }); [-.5,0,.5].forEach(z=>b.klotz(.52,.22,.22,F.GRAU,x,.23,z,{ glatt:true })); });
      b.klotz(.7,.24,.9,F.GRAU2,0,.52,0); b.klotz(1.2,1.0,.86,O,0,1.14,0,{ raster:.4 }); b.klotz(1.28,.12,.94,O2,0,1.66,0); b.klotz(.82,.52,.06,F.CREME,0,1.2,.45,{ glatt:true });
      [[-.24,F.ROT],[0,F.GELB],[.24,F.GRUEN]].forEach(([x,c])=>b.klotz(.16,.16,.07,c,x,1.31,.48,{ glatt:true })); [0,1,2].forEach(i=>b.klotz(.56,.04,.03,F.GRAU2,0,1.1-i*.08,.49,{ glatt:true })); b.klotz(.34,.14,.34,F.GRAU,0,1.78,0); });
    const kopf=beweglich(g,0,1.84,0);
    koerper(kopf,b=>{ b.klotz(1.0,.7,.74,F.GRAU,0,.36,0,{ raster:.36 }); b.klotz(.84,.52,.06,F.SCHWARZ,0,.36,.39,{ glatt:true }); [-1,1].forEach(s=>b.klotz(.14,.28,.28,O2,s*.56,.36,0));
      b.klotz(1.1,.12,.9,F.GELB,0,.76,.02); b.klotz(.82,.18,.66,F.GELB,0,.9,0); b.klotz(.18,.12,.7,0xffe480,0,1.0,0); b.klotz(.07,.3,.07,F.DUNKEL,-.3,1.1,-.1,{ glatt:true }); b.klotz(.17,.17,.17,F.ROT,-.3,1.3,-.1,{ glatt:true }); });
    koerper(kopf,b=>b.pixel('.cc...cc.|.cc...cc.|.........|.c.....c.|..ccccc..',.08,{ c:0x6af4ff },0,.15,.43,.03,{ glatt:true, jitter:0 }),{ leuchtet:true });
    const arme=beweglich(g,0,1.45,0);
    koerper(arme,b=>{ [-1,1].forEach(s=>{ b.klotz(.26,.34,.34,F.GRAU2,s*.74,0,0); b.klotz(.2,.2,.62,O,s*.76,-.14,.32,{ rx:.35 }); b.klotz(.22,.22,.3,F.GRAU,s*.7,-.27,.68); [-.14,.14].forEach(v=>b.klotz(.24,.08,.24,F.DUNKEL,s*.58,-.27+v,.82,{ glatt:true })); });
      b.klotz(.96,.5,.5,F.BLAU,0,-.27,.84,{ raster:.5 }); [-.24,.24].forEach(x=>b.klotz(.24,.1,.24,0x78aef4,x,.03,.84,{ glatt:true })); });
    k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.8)*.28; arme.position.y=1.45+Math.sin(t*1.8)*.05; }); } },
  zementmischer:{ kasten:[3.2,2.2], treffer:[3.1,2.8,2.0], baue(g,k){ /* Raum 3, Nr. 10: gelbe Mischmaschine mit schräger, drehender Trommel, Rädern, Motor und Sandhaufen */
    koerper(g,b=>{ [-1,1].forEach(s=>{ const z=s*.7; b.klotz(.7,.7,.24,F.DUNKEL,-.85,.37,z); b.klotz(.7,.7,.22,F.DUNKEL,-.85,.37,z,{ rz:Math.PI/4 }); b.klotz(.28,.28,.3,F.ROT,-.85,.37,z,{ glatt:true });
        b.klotz(1.7,.18,.18,F.GRAU2,-.1,.5,s*.5); b.klotz(.2,1.2,.2,F.ORANGE,-.15,1.05,s*.82,{ rx:-s*.08 }); b.klotz(.2,.5,.2,F.GRAU2,.7,.25,s*.5); });
      b.klotz(.18,.18,1.2,F.GRAU2,-.85,.37,0); b.klotz(.18,.18,1.2,F.GRAU2,.7,.5,0); b.klotz(.55,.55,.7,F.ROT,.62,.86,0,{ raster:.28 }); [0,1,2].forEach(i=>b.klotz(.05,.08,.5,F.DUNKEL,.91,.74+i*.14,0,{ glatt:true }));
      /* Sandhaufen mit zwei Klötzen */
      [[.8,.28,.75],[.52,.24,.5],[.26,.18,.28]].reduce((y,[w,h,d])=>{ b.klotz(w,h,d,F.SAND,1.15,y+h/2,.55,{ raster:.2 }); return y+h; },0); b.klotz(.32,.3,.32,0xb0a8b4,1.3,.15,-.65,{ ry:.4 }); });
    const schraeg=beweglich(g,-.15,1.55,0); schraeg.rotation.z=.62;
    const t=beweglich(schraeg,0,0,0);
    koerper(t,b=>{ const scheibe=(w,h,y,c)=>{ b.klotz(w,h,w*.64,c,0,y,0,{ raster:.4 }); b.klotz(w*.64,h,w,c,0,y,0,{ raster:.4 }); b.klotz(w*.82,h*.98,w*.82,c,0,y,0,{ raster:.4 }); };
      scheibe(.9,.24,-.62,0xd8a020); scheibe(1.35,.34,-.34,F.GELB); scheibe(1.5,.34,0,F.GELB); scheibe(1.56,.12,.2,F.ROT); scheibe(1.25,.28,.4,F.GELB); scheibe(.95,.22,.64,0xd8a020);
      b.klotz(.68,.06,.68,0x4a4450,0,.76,0,{ glatt:true }); [-1,1].forEach(s=>{ b.klotz(.86,.14,.13,F.GRAU,0,.78,s*.4); b.klotz(.13,.14,.68,F.GRAU,s*.4,.78,0); }); b.klotz(.36,.14,.26,0xa8a4ac,.06,.8,.02,{ ry:.5 }); });
    k.anim.push(z=>{ t.rotation.y=z*1.3; }); } },
  brunnen:{ r:1.35, treffer:[2.6,3.5,2.6], baue(g,k){ /* Raum 4, Nr. 9: runder Steinbrunnen mit Wasser, Stufendach, Seilwalze und Eimer */
    koerper(g,b=>{ for(let j=0;j<3;j++) for(let i=0;i<12;i++){ const a=i*Math.PI/6+(j%2)*.26; b.klotz(.58,.32,.34,wahl(MIX.pflaster),Math.sin(a)*1.02,.16+j*.32,Math.cos(a)*1.02,{ ry:a }); }
      for(let i=0;i<12;i++){ const a=i*Math.PI/6; b.klotz(.62,.12,.46,0xd0c8d4,Math.sin(a)*1.03,1.02,Math.cos(a)*1.03,{ ry:a }); }
      [-1,1].forEach(s=>b.klotz(.22,1.75,.22,F.HOLZ2,s*1.03,1.95,0,{ raster:.45 }));
      b.klotz(2.15,.16,.16,F.HOLZ3,0,2.25,0); b.klotz(.55,.28,.28,F.SAND,0,2.25,0,{ raster:.1 }); b.klotz(.1,.4,.1,F.GRAU2,1.24,2.1,0,{ glatt:true }); b.klotz(.26,.1,.1,F.GRAU2,1.32,1.9,0,{ glatt:true });
      [[2.9,1.9,F.ROT],[3.12,1.35,0xc83a48],[3.34,.8,F.ROT],[3.54,.3,0xc83a48]].forEach(([y,d,c])=>b.klotz(2.7,.22,d,c,0,y,0,{ raster:.38 })); });
    koerper(g,b=>{ b.klotz(1.7,.06,1.15,0x3aa0e0,0,.74,0,{ raster:.4 }); b.klotz(1.15,.06,1.7,0x3aa0e0,0,.735,0,{ raster:.4 }); },{ leuchtet:true });
    const e=beweglich(g,0,2.25,.18);
    koerper(e,b=>{ b.klotz(.06,.62,.06,F.SAND,0,-.31,0,{ glatt:true }); b.klotz(.44,.05,.05,F.GRAU2,0,-.63,0,{ glatt:true }); [-1,1].forEach(s=>b.klotz(.05,.24,.05,F.GRAU2,s*.21,-.74,0,{ glatt:true })); b.klotz(.5,.4,.46,F.HELLHOLZ,0,-1.02,0,{ raster:.17 }); [-.9,-1.16].forEach(y=>b.klotz(.54,.07,.5,F.GRAU,0,y,0,{ glatt:true })); b.klotz(.4,.05,.36,0x5ac0f0,0,-.81,0,{ glatt:true }); });
    k.anim.push(t=>{ e.rotation.z=Math.sin(t*1.3)*.08; e.rotation.x=Math.sin(t*.9)*.05; }); } },
  picknickdecke:{ kasten:[3.0,2.5], treffer:[2.9,1.4,2.4], baue(g){ /* Raum 4, Nr. 10: rot-weiß karierte Decke mit Picknickkorb, Kuchen, Obst, Saft und Tellern */
    koerper(g,b=>{ for(let i=0;i<7;i++) for(let j=0;j<6;j++) b.klotz(.42,.06,.42,(i%2&&j%2)?F.ROT2:(i%2||j%2)?F.ROT:F.WEISS,-1.26+i*.42,.035,-1.05+j*.42,{ raster:.42, jitter:.02 });
      /* Korb mit Henkel und Tuch */
      b.klotz(.95,.5,.65,0xc08a44,-.72,.32,-.48,{ raster:.17 }); b.klotz(1.03,.12,.73,0x8a5a28,-.72,.6,-.48); [-1,1].forEach(s=>b.klotz(.09,.46,.09,0x8a5a28,-.72+s*.4,.86,-.48,{ glatt:true })); b.klotz(.9,.09,.11,0x8a5a28,-.72,1.1,-.48,{ glatt:true });
      b.klotz(.5,.16,.5,F.HELLBLAU,-.5,.7,-.42,{ raster:.17 }); b.klotz(.26,.24,.26,F.ROT,-1.0,.74,-.46,{ glatt:true });
      /* Kuchen auf Teller */
      b.klotz(.9,.05,.9,F.HELLBLAU,.55,.09,-.2,{ glatt:true }); b.klotz(.64,.24,.64,0xf0b860,.55,.23,-.2); b.klotz(.68,.09,.68,F.CREME,.55,.39,-.2); [[-.18,-.18],[.18,.16],[-.14,.18],[.18,-.16],[0,0]].forEach(([x,z])=>b.klotz(.12,.12,.12,F.ROT,.55+x,.49,-.2+z,{ glatt:true }));
      /* Saftflasche, Becher, Äpfel, Birne, Brot */
      b.klotz(.26,.5,.26,F.ORANGE,1.12,.31,.48,{ glatt:true }); b.klotz(.13,.18,.13,F.ORANGE,1.12,.65,.48,{ glatt:true }); b.klotz(.15,.08,.15,F.GRUEN,1.12,.78,.48,{ glatt:true }); b.klotz(.18,.24,.18,F.BLAU,.72,.19,.7,{ glatt:true });
      [[-.55,.55,F.ROT],[-.25,.68,F.HELLGRUEN],[-.8,.75,F.GELB]].forEach(([x,z,c])=>{ b.klotz(.25,.24,.25,c,x,.19,z,{ glatt:true }); b.klotz(.05,.12,.05,F.HOLZ3,x,.36,z,{ glatt:true }); });
      b.klotz(.55,.2,.3,0xd89a50,.1,.17,.5,{ ry:.4 }); [-.14,.04,.2].forEach(x=>b.klotz(.06,.03,.26,0xf8d898,.1+x,.28,.5-x*.4,{ ry:.4, glatt:true })); }); } },
  turmglocke:{ kasten:[2.8,1.6], treffer:[2.7,3.7,1.5], baue(g,k){ /* Raum 5, Nr. 9: große goldene Stufenglocke im Holzgestell, schwingt, mit Zugseil */
    koerper(g,b=>{ [-1.15,1.15].forEach(x=>{ b.klotz(.45,.24,1.35,F.GRAU2,x,.12,0); b.klotz(.28,3.1,.28,F.HOLZ2,x,1.7,0,{ raster:.5 }); [-1,1].forEach(s=>b.klotz(.16,1.0,.16,F.HOLZ3,x,.6,s*.36,{ rx:-s*.55 })); });
      b.klotz(2.85,.32,.4,F.HOLZ,0,3.35,0,{ raster:.4 }); [[3.63,.9,F.ROT],[3.85,.5,0xc83a48]].forEach(([y,d,c])=>b.klotz(3.0-(y>3.7?.8:0),.22,d,c,0,y,0,{ raster:.4 })); });
    const gl=beweglich(g,0,3.2,0);
    koerper(gl,b=>{ const s=(w,h,y,c)=>{ b.klotz(w,h,w*.7,c,0,y,0,{ raster:.3 }); b.klotz(w*.7,h,w,c,0,y,0,{ raster:.3 }); };
      b.klotz(.22,.24,.22,F.GRAU2,0,-.1,0,{ glatt:true }); s(.55,.24,-.32,F.GOLD); s(.8,.3,-.58,F.GELB); s(.94,.46,-.95,F.GOLD); s(1.2,.2,-1.27,F.GELB); s(1.48,.18,-1.45,F.GOLD);
      b.klotz(.12,.36,.12,F.GRAU2,0,-1.66,0,{ glatt:true }); b.klotz(.34,.32,.34,F.DUNKEL,0,-1.93,0); b.klotz(.2,.2,.04,0xfff6d0,0,-.98,.49,{ rz:Math.PI/4, glatt:true }); });
    const seil=beweglich(g,.85,3.2,.3);
    koerper(seil,b=>{ for(let i=0;i<10;i++) b.klotz(.09,.23,.09,i%2?F.SAND:0xc8a860,0,-.12-i*.23,0,{ glatt:true }); b.klotz(.22,.5,.22,F.ROT,0,-2.45,0,{ raster:.17 }); b.klotz(.28,.09,.28,F.GELB,0,-2.2,0,{ glatt:true }); b.klotz(.3,.13,.3,F.GELB,0,-2.76,0,{ glatt:true }); });
    k.anim.push(t=>{ const a=Math.sin(t*2.1)*(.05+.08*Math.max(0,Math.sin(t*.5))); gl.rotation.z=a; seil.rotation.z=-a*.4; }); } },
  drachen:{ r:.75, treffer:[2.6,4.6,1.4], baue(g,k){ /* Raum 5, Nr. 10: bunter Pixel-Drachen, steigt an einer Leine, die an einem Pfosten mit Spule festgemacht ist */
    koerper(g,b=>{ b.klotz(1.0,.22,1.0,F.GRAU2,0,.11,.15); b.klotz(.26,.9,.26,F.HOLZ2,0,.66,.15,{ raster:.3 }); b.klotz(.7,.5,.18,F.HELLHOLZ,0,.82,.38); b.klotz(.46,.36,.1,F.ROT,0,.82,.48,{ raster:.12 }); [-1,1].forEach(s=>b.klotz(.12,.62,.26,F.HOLZ3,s*.38,.82,.4)); });
    const d=beweglich(g,.45,3.35,-.35);
    koerper(d,b=>{ b.pixel('....r....|...rry...|..rrryy..|.rrrryyy.|rrrrryyyy|.ggggbbb.|..gggbb..|...ggb...|....g....',.23,{ r:F.ROT, y:F.GELB, g:F.GRUEN, b:F.BLAU },0,-.85,0,.12,{ glatt:true });
      [-1,1].forEach(s=>{ b.klotz(.16,.2,.05,0xffffff,s*.3,.36,.08,{ glatt:true }); b.klotz(.09,.11,.04,F.SCHWARZ,s*.3,.34,.11,{ glatt:true }); }); b.klotz(.34,.07,.04,F.SCHWARZ,0,.02,.09,{ glatt:true }); [-1,1].forEach(s=>b.klotz(.07,.07,.04,F.SCHWARZ,s*.2,.08,.09,{ glatt:true })); });
    const schwanz=[0,1,2,3].map(i=>{ const q=beweglich(d,0,-1.05-i*.3,0); koerper(q,b=>{ b.klotz(.04,.26,.04,F.WEISS,0,0,0,{ glatt:true }); const c=[F.ROSA,F.GELB,F.TUERKIS,F.LILA][i]; [-1,1].forEach(s=>b.klotz(.18,.15,.07,c,s*.13,-.08,0,{ rz:s*.35, glatt:true })); b.klotz(.09,.09,.1,F.WEISS,0,-.08,0,{ glatt:true }); },{ schatten:false }); return q; });
    /* Leine von der Spule zum Drachen: wird jedes Bild neu ausgerichtet */
    const leine=beweglich(g,0,1.05,.4); koerper(leine,b=>b.klotz(.035,1,.035,0xffffff,0,.5,0,{ glatt:true }),{ leuchtet:true });
    const richte=()=>{ const dx=d.position.x, dy=d.position.y-.2-1.05, dz=d.position.z-.4, l=Math.hypot(dx,dy,dz)||1; leine.scale.y=l; leine.quaternion.setFromUnitVectors(V(0,1,0),V(dx/l,dy/l,dz/l)); };
    richte();
    k.anim.push(t=>{ d.position.set(.45+Math.sin(t*1.1)*.28,3.35+Math.sin(t*1.7)*.18,-.35); d.rotation.z=-.15+Math.sin(t*1.1+.6)*.14; schwanz.forEach((q,i)=>{ q.position.x=Math.sin(t*3-i*.8)*.09*(i+1); q.rotation.z=Math.sin(t*3-i*.8)*.25; }); richte(); }); } }
};
return { F, MIX, wahl, bau, koerper, beweglich, boden, mauer, huelle, baum, busch, blume, gras, pilz, kristall, wolke, wolken, fenster, haengelampe, laterne, schloss, schaf, huhn, biene, ballon, NEU };
})();

/* Raum 1: Das Blockhaus. Warmes Haus aus Holzblöcken: Ofen mit knisterndem Feuer, Fenster mit Himmel,
   rote Hängelampen, Teppiche, Balken, Regale, Kaminholz, eine schlafende Katze, Hühner und ein Schmetterling.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Schaukelstuhl) und 10 (Waschzuber) kommen aus KLOTZ.NEU.
   Ausgang: die Kellerluke im Boden klappt auf, die Figur klettert an der Leiter hinunter. */
RAEUME3D.kloetzchenwelt[0] = (function(){
const K=KLOTZ, F=K.F, MIX=K.MIX, G={ glatt:true };
const B=36, T=27, H=6, HINTEN=-13.5;
const ERD=[0x8a5c40,0x75492f,0x9a6c4a]; /* warme Wände im Kellerschacht */

/* kleiner Helfer: Klotz-Kugel (drei verschränkte Quader), für Wollknäuel und Laubkugeln */
function knaeuel(b,x,y,z,s,c){ b.klotz(s,s*.72,s*.72,c,x,y,z,G); b.klotz(s*.72,s,s*.72,c,x,y,z,G); b.klotz(s*.72,s*.72,s,c,x,y,z,G); }

/* Wollknäuel: rund gestuft aus achteckigen Scheiben, mit Wickelringen in zwei Richtungen */
function rundknaeuel(b,x,y,z,s,c,d,r){
  const R=s*.5;
  [-.4,-.27,-.13,.01,.15,.29,.41].forEach(v=>{ const h=v*s, w=Math.sqrt(R*R-h*h*.92)*1.58, ho=s*(Math.abs(v)>.35?.1:.145); b.klotz(w,ho,w,c,x,y+h,z,G); b.klotz(w*.98,ho*.96,w*.98,c,x,y+h,z,{ ry:Math.PI/4, glatt:true }); });
  /* Ringe: Kreise um das Knäuel, aufgespannt von den Richtungen u und v */
  const ring=(u,v)=>{ for(let i=0;i<30;i++){ const a=i*Math.PI/15, co=Math.cos(a)*R*1.08, si=Math.sin(a)*R*1.04; b.klotz(s*.085,s*.085,s*.085,d,x+u[0]*co+v[0]*si,y+u[1]*co+v[1]*si,z+u[2]*co+v[2]*si,{ glatt:true, jitter:0 }); } };
  ring([.8,.6*r,0],[0,0,1]); ring([.9,-.15*r,.41],[-.2,.85,.48]); ring([.55,.35*r,-.76],[.35*r,.8,.49]);
}

/* ---------- Ausgang: die Kellerluke ---------- */
function baueAusgang(k,sc){
  /* Schacht: nur die Innenwände, unten ein warmer Schimmer */
  K.koerper(sc,b=>{
    K.mauer(b,-1.6,1.6,-3.5,-.02,-9.72,{ farben:ERD, raster:.64, d:.24 });
    K.mauer(b,-1.6,1.6,-3.5,-.02,-6.28,{ farben:ERD, raster:.64, d:.24 });
    [-1.72,1.72].forEach(x=>K.mauer(b,-9.6,-6.4,-3.5,-.02,x,{ achse:'z', farben:ERD, raster:.64, d:.24 }));
  },{ schatten:false });
  K.koerper(sc,b=>{ b.platte(-1.6,-9.6,1.6,-6.4,-3.45,0x4a2a18,{ raster:.8 }); },{ schatten:false });
  K.koerper(sc,b=>{ b.platte(-.9,-9.0,.9,-7.2,-3.43,0xc8782a,G); b.platte(-.5,-8.6,.5,-7.6,-3.42,0xffc860,G); },{ leuchtet:true });
  /* Holzleiter an der hinteren Schachtwand */
  K.koerper(sc,b=>{ [-.62,.62].forEach(x=>b.klotz(.18,3.75,.16,F.HELLHOLZ,x,-1.6,-9.44,{ raster:.5 }));
    for(let i=0;i<8;i++) b.klotz(1.1,.12,.2,i%2?F.SAND:F.HELLHOLZ,0,-3.1+i*.45,-9.38,G); },{ schatten:false });
  /* flacher Rahmen um die Luke */
  K.koerper(sc,b=>{ [-1.82,1.82].forEach(x=>b.quader(x-.2,0,-9.86,x+.2,.1,-6.14,F.HOLZ3,{ raster:.6 }));
    b.quader(-1.62,0,-6.4,1.62,.1,-6.14,F.HOLZ3,{ raster:.6 }); b.quader(-1.62,0,-9.86,1.62,.1,-9.6,F.HOLZ3,{ raster:.6 });
    [-1.82,1.82].forEach(x=>[-9.72,-6.28].forEach(z=>b.klotz(.24,.08,.24,F.GOLD,x,.13,z,G))); },{ schatten:false });
  /* Deckel, hinten angeschlagen */
  const deckel=K.beweglich(sc,0,.12,-9.6);
  K.koerper(deckel,b=>{ for(let i=0;i<5;i++) b.quader(-1.58+i*.634,-.1,.02,-1.58+(i+1)*.634-.03,.08,3.18,i%2?F.HOLZ:0xcc8c48,{ raster:.8 });
    [.45,2.2].forEach(z=>{ b.klotz(3.16,.07,.24,F.DUNKEL,0,.11,z,G); [-1.35,-.7,.7,1.35].forEach(x=>b.klotz(.12,.06,.12,0xb8c0cc,x,.17,z,G)); });
    [-1.1,1.1].forEach(x=>b.klotz(.3,.16,.24,F.GRAU2,x,.04,.06,G));
    /* Querleisten und Strebe auf der Unterseite (sichtbar, wenn die Luke offen steht) */
    [.5,2.7].forEach(z=>b.klotz(2.9,.08,.22,F.HOLZ3,0,-.13,z,G)); b.klotz(3.4,.07,.2,F.HOLZ2,0,-.13,1.6,{ ry:.72, glatt:true }); });
  /* großer Ringgriff vorn auf dem Deckel */
  K.koerper(deckel,b=>{ for(let i=0;i<20;i++){ const a=i*Math.PI/10; b.klotz(.17,.13,.17,F.DUNKEL,Math.sin(a)*.45,.16,2.65+Math.cos(a)*.4,{ ry:a, glatt:true }); } b.klotz(.4,.2,.26,0xb8c0cc,0,.19,2.22,G); },{ schatten:false });
  /* Zahlenschloss steht schräg aufgerichtet, zur Kamera gewandt */
  const schl=gruppe(deckel,0,.6,1.35); schl.rotation.x=-.5; K.schloss(schl,0,0,0,1.15);
  const schimmer=schein(deckel,'rgba(255,215,100,.4)',0,.75,1.45,2.1);
  const licht=new THREE.PointLight(0xffc060,0,9,1.5); licht.position.set(0,-1.2,-7.8); sc.add(licht);
  k.kasten(0,-8,3.4,3.4);
  return ausgang(k,{ name:'Kellerluke', einfach:'Klappe im Boden', steh:[1.4,-5.4], durch:[0,-8.7], tief:true,
    treffer:{x:0,y:.5,z:-8,b:3.2,h:1,t:3.2}, schildOben:[0,1.95,-8.3], glanz:[0,.8,-7.4],
    bewege:(auf,t)=>{ deckel.rotation.x=-auf*1.8; licht.intensity=1.6*auf; schimmer.visible=auf<.3; const g=1.9+Math.sin(t*2.2)*.25; schimmer.scale.set(g,g,1); } });
}

/* ---------- Gegenstände ---------- */
/* 1 Blockofen mit Feuer, Topf und Ofenrohr */
function ofen(g,k){
  K.koerper(g,b=>{
    b.quader(-1.6,0,-1.15,1.6,.3,1.15,F.GRAU2,{ raster:.55 });
    K.mauer(b,-1.45,1.45,.3,2.3,-.7,{ farben:[0xa9a4c0,0x9a95b2,0xb4b0cc], raster:.5, d:.7 });
    [-1.1,1.1].forEach(x=>K.mauer(b,x-.35,x+.35,.3,1.75,.35,{ farben:[0xa9a4c0,0x9a95b2,0xb4b0cc,0x8c87a4], raster:.36, d:1.4 }));
    K.mauer(b,-1.45,1.45,1.75,2.3,.35,{ farben:[0xb4b0cc,0xa9a4c0], raster:.5, d:1.4 });
    [[-.62,1.64],[.62,1.64]].forEach(([x,y])=>b.klotz(.3,.24,.2,0x8c87a4,x,y,.96));
    b.quader(-1.65,2.3,-1.12,1.65,2.55,1.15,0x6e6a80,{ raster:.55 });
    b.quader(-.76,.3,-.36,.76,1.75,-.3,0x2a1c24,G);
    b.quader(-.76,.3,-.3,.76,.36,1.0,0x3a2a30,G);
    /* Ofenrohr */
    b.quader(-1.2,2.55,-1.0,-.35,3.0,-.2,0x5a5668,G);
    b.quader(-1.05,3.0,-.9,-.5,4.7,-.35,0x6e6a80,{ raster:.45 });
    [3.55,4.65].forEach(y=>b.klotz(.68,.14,.68,F.GRAU2,-.775,y,-.625,G));
    /* Topf */
    b.klotz(.85,.5,.75,F.ROT,.6,2.8,.05,{ raster:.4 }); b.klotz(.95,.1,.85,F.ROT2,.6,3.09,.05,G); b.klotz(.2,.16,.2,F.GOLD,.6,3.22,.05,G);
    [-1,1].forEach(s=>b.klotz(.18,.1,.3,F.DUNKEL,.6+s*.52,2.92,.05,G));
    /* Messinggriffe */
    [-1.1,1.1].forEach(x=>b.klotz(.2,.2,.08,F.GOLD,x,2.02,1.09,G));
  });
  K.koerper(g,b=>{ [-.5,-.17,.17,.5].forEach(x=>b.klotz(.09,.36,.09,0x2e2a3a,x,.52,1.0,G)); b.klotz(1.5,.09,.11,0x2e2a3a,0,.72,1.0,G); },{ schatten:false });
  K.koerper(g,b=>{ b.klotz(1.0,.2,.24,F.HOLZ2,0,.48,.36,{ ry:.3 }); b.klotz(1.0,.2,.24,F.HOLZ3,0,.52,.5,{ ry:-.35 }); [-.35,0,.3].forEach(x=>b.klotz(.18,.09,.18,F.ORANGE,x,.66,.55,G)); },{ schatten:false });
  const flammen=[[-.4,.5,.7,F.ORANGE],[0,.35,1.0,0xff6a2a],[.4,.5,.75,F.ORANGE],[-.16,.65,.62,F.GELB],[.2,.66,.55,F.GELB],[0,.76,.38,0xfff6b0]].map(([x,z,h,c])=>{
    const q=K.beweglich(g,x,.6,z-.1); K.koerper(q,b=>{ b.klotz(.3,h*.5,.18,c,0,h*.25,0,G); b.klotz(.18,h*.3,.14,c,.03,h*.63,0,G); b.klotz(.09,h*.2,.09,c,-.02,h*.86,0,G); },{ leuchtet:true }); return q; });
  schein(g,'rgba(255,150,50,.6)',0,.95,1.15,2.3);
  const dampf=[0,1,2,3].map(i=>{ const q=K.beweglich(g,.6,3.3,.05); K.koerper(q,b=>b.klotz(.24,.24,.24,0xffffff,0,0,0,G),{ leuchtet:true, deckung:.55 }); return q; });
  k.anim.push(t=>{ flammen.forEach((q,i)=>{ q.scale.y=.85+Math.sin(t*9+i*2.1)*.18+Math.sin(t*14+i)*.08; q.position.x=[-.4,0,.4,-.16,.2,0][i]+Math.sin(t*6+i*1.7)*.035; });
    dampf.forEach((q,i)=>{ const u=(t*.4+i*.25)%1; q.position.set(.6+Math.sin(u*6+i)*.18,3.3+u*1.15,.05); const s=.5+Math.sin(u*Math.PI)*.8; q.scale.set(s,s,s); q.rotation.y=u*3; }); });
}
/* 2 Holztruhe mit gestuftem Deckel, dunklen Bändern und Goldschloss */
function truhe(g){
  K.koerper(g,b=>{
    [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.3,.18,.3,F.HOLZ3,s*1.0,.09,t*.55,G)));
    b.quader(-1.2,.16,-.7,1.2,1.1,.7,0xc77d3a,{ raster:.46 });
    b.quader(-1.27,1.08,-.77,1.27,1.22,.77,0x7a4420,{ raster:.5 });
    b.quader(-1.2,1.22,-.7,1.2,1.5,.7,0xd48a44,{ raster:.4 });
    b.quader(-1.14,1.5,-.54,1.14,1.7,.54,0xc77d3a,{ raster:.4 });
    b.quader(-1.08,1.7,-.32,1.08,1.84,.32,0xd48a44,{ raster:.4 });
    [-.82,.82].forEach(x=>{ b.quader(x-.12,.16,.7,x+.12,1.5,.75,0x7a4420,G); b.quader(x-.12,1.5,-.58,x+.12,1.74,.58,0x7a4420,G); b.quader(x-.12,1.74,-.36,x+.12,1.88,.36,0x7a4420,G);
      [.35,.9,1.36].forEach(y=>b.klotz(.12,.12,.05,F.GOLD,x,y,.77,G)); });
    b.quader(-1.22,.16,-.72,1.22,.32,.72,0x7a4420,{ raster:.5 });
    b.klotz(.46,.56,.1,F.GOLD,0,1.02,.78,G); b.klotz(.34,.1,.06,0xffe480,0,1.22,.84,G); b.klotz(.1,.2,.05,F.SCHWARZ,0,.94,.85,G);
    [-1.23,1.23].forEach(x=>b.klotz(.08,.2,.5,F.GRAU2,x,.82,0,G));
  });
}
/* 3 Karobett: Kopfteil rechts, rot-rosa karierte Decke, weißes Kissen */
function bett(g){
  K.koerper(g,b=>{
    [-2.1,2.1].forEach(x=>[-1.2,1.2].forEach(z=>{ const h=x>0?2.35:1.35; b.klotz(.34,h,.34,0x8a5228,x,h/2,z,{ raster:.45 }); b.klotz(.44,.2,.44,F.GOLD,x,h+.1,z,G); }));
    b.quader(-2.1,.4,-1.2,2.1,.72,1.2,0x8a5228,{ raster:.6 });
    b.quader(2.0,.7,-1.05,2.2,1.9,1.05,0xa86c38,{ raster:.4 }); b.quader(1.98,1.9,-.65,2.22,2.15,.65,0x8a5228,G);
    b.quader(-2.2,.7,-1.05,-2.02,1.1,1.05,0xa86c38,{ raster:.4 });
    b.pixel('.r.r.|rrrrr|.rrr.|..r..',.1,{ r:F.ROT },1.97,1.35,0,.02,G);
    b.quader(-1.98,.72,-1.12,1.98,.98,1.12,0xf4f0e8,{ raster:.6 });
    /* Kissen */
    b.klotz(.85,.28,1.75,0xffffff,1.45,1.14,0,{ raster:.6 }); b.klotz(.62,.14,1.45,0xf4f0e8,1.45,1.34,0,G);
  });
  K.koerper(g,b=>{
    for(let i=0;i<7;i++) for(let j=0;j<6;j++) b.klotz(.42,.14,.4,(i+j)%2?0xf5b8c4:0xe0566b,-1.74+i*.42,1.06,-1.0+j*.4,{ raster:.42, jitter:.02 });
    for(let i=0;i<7;i++) [-1,1].forEach(s=>b.klotz(.42,.38,.12,(i+(s>0?1:0))%2?0xf5b8c4:0xe0566b,-1.74+i*.42,.84,s*1.24,{ raster:.42, jitter:.02 }));
    b.klotz(.2,.18,2.5,F.WEISS,1.1,1.09,0,G);
  });
}
/* 4 Tisch mit großem Kuchen, dazu zwei Hocker */
function kuchentisch(g,k){
  K.koerper(g,b=>{
    [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.24,1.15,.24,0x7a4420,s*1.05,.58,t*.7,{ raster:.45 })));
    b.quader(-1.35,1.15,-.95,1.35,1.34,.95,0xa0602c,{ raster:.45 });
    b.quader(-.62,1.34,-.97,.62,1.37,.97,F.WEISS,{ raster:.4 }); [-1,1].forEach(s=>b.klotz(1.24,.36,.04,F.WEISS,0,1.18,s*.98,{ raster:.4 }));
    [-.4,0,.4].forEach(x=>b.klotz(.16,.16,.03,F.ROT,x,1.14,1.01,G));
    /* Kuchenteller und Kuchen */
    b.klotz(1.5,.08,1.3,0x9fd8ff,0,1.41,0,{ raster:.4 });
    b.klotz(1.2,.3,1.0,0xf0b860,0,1.6,0,{ raster:.3 }); b.klotz(1.24,.1,1.04,0xfff4e0,0,1.8,0,G); b.klotz(1.12,.26,.92,0xf0b860,0,1.98,0,{ raster:.3 });
    b.klotz(1.18,.14,.98,0xffa8c4,0,2.18,0,G);
    [[-.45,.15],[-.15,.24],[.2,.12],[.45,.2]].forEach(([x,h])=>b.klotz(.14,h,.05,0xffa8c4,x,2.12-h/2,.5,G));
    [[-.38,-.28],[.38,-.28],[-.38,.28],[.38,.28],[0,0]].forEach(([x,z],i)=>{ const u=i===4?.1:0; b.klotz(.2,.2+u,.2,0xe0364a,x,2.35+u/2,z,G); b.klotz(.04,.12,.04,F.GRUEN2,x+.04,2.51+u,z,G); });
    /* Tassen */
    [[-1.0,.45,F.ROT],[1.0,-.4,F.BLAU]].forEach(([x,z,c])=>{ b.klotz(.28,.3,.28,c,x,1.49,z,G); b.klotz(.1,.16,.08,c,x+.18,1.5,z,G); b.klotz(.2,.03,.2,0x6a3a1a,x,1.65,z,G); });
    /* Hocker an den Seiten */
    [-1.7,1.7].forEach(x=>{ b.klotz(.55,.16,.65,F.HELLHOLZ,x,.7,.25,{ raster:.3 }); [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.12,.62,.12,F.HOLZ3,x+s*.18,.31,.25+t*.22,G))); });
  });
}
/* 5 Pixeluhr mit Pendel an der Rückwand */
function uhr(g,k){
  K.koerper(g,b=>{
    b.pixel('..wwwww..|.wcccccw.|wcccccccw|wcccccccw|wcccccccw|wcccccccw|.wcccccw.|..wwwww..',.3,{ w:0x8a5228, c:0xfff4e0 },0,1.95,.2,.22,G);
    [[0,.9],[0,-.9],[.9,0],[-.9,0]].forEach(([x,y])=>b.klotz(.14,.14,.05,F.ROT,x,3.15+y,.34,G));
    [[.63,.63],[-.63,.63],[.63,-.63],[-.63,-.63]].forEach(([x,y])=>b.klotz(.09,.09,.04,0x8a5228,x,3.15+y,.33,G));
    b.klotz(.7,.2,.3,F.HOLZ3,0,4.45,.22,G); b.klotz(.3,.18,.3,F.GOLD,0,4.62,.22,G);
    /* Pendelkasten */
    [-1,1].forEach(s=>b.klotz(.14,1.15,.22,0x7a4420,s*.55,1.37,.2,G)); b.klotz(1.24,.14,.26,0x7a4420,0,.75,.2,G); b.klotz(.96,1.15,.06,0x4a2a18,0,1.37,.12,G);
  });
  const gross=K.beweglich(g,0,3.15,.38), klein=K.beweglich(g,0,3.15,.41);
  K.koerper(gross,b=>b.klotz(.1,.84,.04,0x2a2238,0,.34,0,G),{ schatten:false });
  K.koerper(klein,b=>{ b.klotz(.55,.14,.04,0x2a2238,.22,0,0,G); b.klotz(.18,.18,.06,F.GOLD,0,0,.02,G); },{ schatten:false });
  const p=K.beweglich(g,0,1.95,.3);
  K.koerper(p,b=>{ b.klotz(.09,.8,.05,F.GOLD,0,-.4,0,G); b.klotz(.42,.26,.1,F.GELB,0,-.86,0,G); b.klotz(.26,.42,.1,F.GELB,0,-.86,0,G); b.klotz(.12,.12,.12,0xfff0a0,0,-.82,.02,G); },{ schatten:false });
  k.anim.push(t=>{ p.rotation.z=Math.sin(t*2.8)*.34; gross.rotation.z=-t*.35; });
}
/* 6 Bild vom Blockberg */
function bergbild(g){
  K.koerper(g,b=>{
    b.pixel('sssssssyys|sssssssyys|sssswwssss|ssswwwwsss|sswmwwmwss|smmmmmmmms|gggggggggg',.28,{ s:0x7ac4fa, y:0xffe066, m:0x6a6290, w:0xffffff, g:0x58b058 },0,1.8,.16,.1,{ glatt:true, jitter:.01 });
    /* Wolke getrennt oben links */
    b.klotz(.78,.17,.05,0xffffff,-.8,3.45,.24,{ glatt:true, jitter:0 }); b.klotz(.38,.16,.05,0xffffff,-.88,3.61,.24,{ glatt:true, jitter:0 });
    [1.66,3.9].forEach(y=>b.klotz(3.24,.24,.3,0x7a4420,0,y,.2,{ raster:.4 }));
    [-1.52,1.52].forEach(x=>{ b.klotz(.24,2.0,.3,0x7a4420,x,2.78,.2,{ raster:.4 }); [1.66,3.9].forEach(y=>b.klotz(.36,.36,.1,F.GOLD,x,y,.4,G)); });
    b.klotz(.05,.5,.05,F.DUNKEL,-.28,4.22,.14,{ rz:-1.0, glatt:true }); b.klotz(.05,.5,.05,F.DUNKEL,.28,4.22,.14,{ rz:1.0, glatt:true }); b.klotz(.18,.18,.18,F.GOLD,0,4.37,.16,G);
  });
}
/* 7 Bücherstapel, oben mit rotem Lesezeichen */
function buecher(g){
  K.koerper(g,b=>{
    let y=0;
    [[1.7,.34,1.2,0x4a8ae8,.08,0],[1.55,.3,1.1,0x3aa860,-.18,.05],[1.65,.32,1.15,0xe0566b,.2,-.06],[1.35,.3,1.0,0xffd34a,-.1,.08],[1.45,.28,1.05,0xa07cf0,.28,-.03],[1.15,.3,.85,0x3ab8ae,-.22,0]].forEach(([w,h,d,c,ry,x])=>{
      const co=Math.cos(ry), si=Math.sin(ry), q=(a,cz,br,ho,ti,f,yy)=>b.klotz(br,ho,ti,f,x+a*co+cz*si,yy,-a*si+cz*co,{ ry:ry, glatt:true });
      q(0,0,w,.07,d,c,y+.035); q(0,0,w,.07,d,c,y+h-.035); q(-w/2+.08,0,.16,h,d,c,y+h/2);
      q(.05,0,w-.18,h-.14,d-.1,0xfff4dc,y+h/2);
      q(-w/2+.0,0,.03,h*.25,d+.01,F.GOLD,y+h/2); q(.04,d/2-.04,w-.22,.025,.02,0xd8c8a0,y+h/2);
      y+=h; });
    b.klotz(.18,.05,.7,F.ROT,.25,y+.02,.2,{ ry:-.22, glatt:true }); b.klotz(.18,.5,.05,F.ROT,.12,y-.22,.57,{ ry:-.22, glatt:true });
    b.klotz(.24,.11,.24,F.GOLD,-.2,y+.03,-.1,{ ry:Math.PI/4, glatt:true });
  });
}
/* 8 Wollkorb mit großen Knäueln und losem Faden */
function wollkorb(g){
  K.koerper(g,b=>{
    for(let j=0;j<3;j++) for(let i=0;i<14;i++){ const a=i*Math.PI/7+(j%2)*.22, r=.76+j*.07; b.klotz(.36,.25,.2,(i+j)%2?0xc08a44:0x8a5a28,Math.sin(a)*r,.14+j*.24,Math.cos(a)*r,{ ry:a, glatt:true }); }
    for(let i=0;i<14;i++){ const a=i*Math.PI/7; b.klotz(.46,.14,.28,0xd89a50,Math.sin(a)*.95,.82,Math.cos(a)*.95,{ ry:a, glatt:true }); }
    b.klotz(1.35,.14,1.35,0x8a5a28,0,.07,0);
  });
  K.koerper(g,b=>{
    [[-.4,1.0,.2,.76,0xe0566b,0xa82c48],[.42,1.0,.24,.68,0x6ab8e8,0x2e78b8],[.05,.98,-.38,.72,0xffd34a,0xd08c18],[-.04,1.46,0,.62,0x7ad080,0x38904a],[.52,.92,-.3,.46,0xa07cf0,0x6444b0],[-.56,.92,-.32,.44,0xf08a3a,0xb85818]].forEach(([x,y,z,s,c,d],i)=>rundknaeuel(b,x,y,z,s,c,d,i%2?1:-1));
    /* ein Knäuel liegt davor, der lose Faden hängt über den Korbrand bis zu ihm */
    [[.5,1.0,.7],[.56,.88,.84],[.6,.7,.9],[.62,.5,.93],[.62,.3,.95],[.6,.12,1.0]].forEach(([x,y,z])=>b.klotz(.08,.2,.08,0x6ab8e8,x,y,z,G));
    rundknaeuel(b,.95,.24,.85,.46,0x6ab8e8,0x2e78b8,1);
    [[.68,.04,.98,.4,.5],[.38,.04,1.05,.34,-.1],[.1,.04,1.0,.34,-.55]].forEach(([x,y,z,l,r])=>b.klotz(l,.05,.06,0x6ab8e8,x,y,z,{ ry:r, glatt:true }));
  });
}
const gegenstaende=[
  { x:-4.9, z:-12.1, steh:[-4.7,-9.4], kasten:[3.4,2.5], treffer:[3.4,3.9,2.4], baue:ofen },
  { x:-7.4, z:-3.4, steh:[-7.2,-1.4], kasten:[2.7,1.7], treffer:[2.6,2.0,1.6], baue:truhe },
  { x:13.3, z:-4.8, steh:[12.4,-2.2], kasten:[4.8,2.9], treffer:[4.6,2.6,2.8], baue:bett },
  { x:6.2, z:.6, steh:[6.0,2.9], kasten:[4.0,2.2], treffer:[4.0,2.7,2.1], baue:kuchentisch },
  { x:5.8, z:HINTEN, y:-.22, wand:'hinten', steh:[5.8,-11.4], kasten:[1.6,.9], treffer:[2.7,3.5,.9], trefferY:.65, baue:uhr },
  { x:10.8, z:HINTEN, wand:'hinten', steh:[10.8,-11.4], kasten:[3.2,.9], treffer:[3.3,2.3,.9], trefferY:1.5, baue:bergbild },
  { x:-12.6, z:2.6, steh:[-12.4,4.5], r:1.0, treffer:[2.0,2.3,1.7], baue:buecher },
  { x:-5.0, z:5.4, steh:[-4.8,7.4], r:1.35, treffer:[2.3,2.0,2.3], baue:wollkorb },
  Object.assign({ x:-12.2, z:-6.6, steh:[-11.2,-4.3] },K.NEU.schaukelstuhl,{ dreh:.6, kasten:[2.5,2.6] }),
  Object.assign({ x:11.2, z:5.8, steh:[10.8,7.7] },K.NEU.waschzuber)
];

/* ---------- Deko an den Wänden ---------- */
/* Fenster mit ziehender Wolke, roten Vorhängen und Blumenkasten; Blick nach +z */
function stubenfenster(k,par,x,y,z,br,ph){
  K.fenster(par,x,y,z,br,1.9,{ wolke:false });
  const w=K.beweglich(par,x,y+.25,z+.065);
  K.koerper(w,b=>{ b.klotz(br*.3,.22,.02,0xffffff,0,0,0,G); b.klotz(br*.16,.2,.02,0xffffff,-.05,.18,0,G); },{ leuchtet:true });
  k.anim.push(t=>{ w.position.x=x+Math.sin(t*.22+ph)*br*.3; });
  K.koerper(par,b=>{
    b.klotz(br+1.7,.14,.16,F.HOLZ3,x,y+1.35,z+.28,G); [-1,1].forEach(s=>b.klotz(.22,.22,.22,F.GOLD,x+s*(br/2+.88),y+1.35,z+.28,G));
    [-1,1].forEach(s=>{ const a=x+s*(br/2+.42); for(let i=0;i<3;i++) b.klotz(.18,1.55,i%2?.16:.24,i%2?0xc83a48:F.ROT,a+(i-1)*.18,y+.5,z+.24,{ raster:.5 });
      b.klotz(.62,.16,.34,F.GELB,a,y-.18,z+.25,G); [-1,1].forEach(v=>b.klotz(.22,.5,.2,F.ROT,a+v*.13+s*.06,y-.5,z+.24,G)); });
    for(let i=0;i<Math.round(br/.4);i++) b.klotz(.38,.24,.18,i%2?F.WEISS:F.ROT,x-br/2+.2+i*.4,y+1.16,z+.24,G);
    b.klotz(br*.9,.28,.32,F.HOLZ2,x,y-1.42,z+.34);
    for(let i=0;i<7;i++){ const a=x-br*.38+i*br*.127; b.klotz(.24,.18,.24,F.GRUEN,a,y-1.22,z+.34); b.klotz(.15,.14,.15,[F.ROSA,F.GELB,F.WEISS,F.LILA][i%4],a,y-1.07+(i%2)*.07,z+.4,G); }
  },{ schatten:false });
}
/* Wandbrett mit bunten Krügen und Einmachgläsern (eckig, mit Stoffdeckel), Mitte bei (x,y), Blick +z */
function brett(b,x,y,z,br,wahlN){
  b.klotz(br,.14,.5,F.HOLZ,x,y,z+.25,{ raster:.5 });
  [-1,1].forEach(s=>{ b.klotz(.12,.42,.12,F.HOLZ3,x+s*(br/2-.25),y-.26,z+.08,G); b.klotz(.12,.12,.36,F.HOLZ3,x+s*(br/2-.25),y-.13,z+.2,G); });
  const n=Math.floor(br/.55);
  for(let i=0;i<n;i++){ const a=x-br/2+.35+i*(br-.7)/Math.max(1,n-1), art=(i+wahlN)%3, c=[F.ROT,F.TUERKIS,F.GELB,F.BLAU,F.ORANGE,F.GRUEN][(i+wahlN*2)%6];
    if(art===0){ b.klotz(.32,.42,.28,c,a,y+.28,z+.25,G); b.klotz(.38,.08,.34,F.CREME,a,y+.53,z+.25,G); b.klotz(.2,.14,.03,F.CREME,a,y+.27,z+.4,G); }
    else if(art===1){ b.klotz(.34,.34,.3,c,a,y+.24,z+.25,G); b.klotz(.18,.18,.18,c,a,y+.48,z+.25,G); b.klotz(.08,.2,.08,c,a+.22,y+.32,z+.25,G); }
    else { b.klotz(.28,.2,.28,0xc87040,a,y+.17,z+.25,G); knaeuel(b,a,y+.43,z+.25,.34,F.GRUEN); b.klotz(.1,.1,.1,F.ROSA,a+.05,y+.62,z+.35,G); } }
}
/* Kräutersträuße und Zwiebelzopf an einer Leiste */
function kraeuter(b,x,y,z){
  b.klotz(2.2,.12,.16,F.HOLZ3,x,y,z+.12,G);
  [-.8,-.28,.28,.8].forEach((a,i)=>{ b.klotz(.05,.28,.05,F.SAND,x+a,y-.18,z+.14,G);
    if(i%2){ for(let j=0;j<3;j++) knaeuel(b,x+a+(j%2?.06:-.04),y-.42-j*.26,z+.2,.26,j%2?0xe8a040:0xd88830); }
    else { b.klotz(.18,.22,.16,0x5a9a40,x+a,y-.38,z+.16,G); b.klotz(.36,.3,.2,0x66b050,x+a,y-.62,z+.18); b.klotz(.46,.18,.2,i?0x9a70e0:0x7ac058,x+a,y-.84,z+.18,G); } });
}
/* dunkle Balken: Pfosten, Querbalken und Streben; läuft entlang x, Blick +z */
function fachbalken(b,pfosten,a,e,z){
  b.klotz(e-a,.3,.28,F.HOLZ3,(a+e)/2,5.45,z+.1,{ raster:.9 });
  pfosten.forEach(x=>{ b.klotz(.38,5.3,.3,F.HOLZ3,x,2.65,z+.12,{ raster:.9 }); [-1,1].forEach(s=>{ if(x+s*.5>a&&x+s*.5<e) b.klotz(.18,.95,.14,0x6a3a1a,x+s*.42,4.98,z+.08,{ rz:-s*.75, glatt:true }); }); b.klotz(.5,.24,.4,F.HOLZ2,x,.12,z+.14,G); });
}
/* Topfpflanze in einem Tontopf (großes Grün) */
function pflanze(k,b,x,z,gr,bluete){
  const s=gr||1;
  b.klotz(.7*s,.2*s,.7*s,0xa85430,x,.1*s,z); b.klotz(.86*s,.45*s,.86*s,0xc8683c,x,.42*s,z); b.klotz(.98*s,.14*s,.98*s,0xd87a48,x,.7*s,z,G);
  knaeuel(b,x,1.15*s,z,.9*s,0x3f9a48); knaeuel(b,x-.28*s,1.55*s,z+.08,.55*s,0x58b050); knaeuel(b,x+.28*s,1.45*s,z-.1,.5*s,0x2e8a44); knaeuel(b,x+.04,1.9*s,z,.4*s,0x6cc458);
  [[-.45,1.35,.35],[.36,1.15,.45],[.1,1.75,.34],[-.2,2.0,.2]].forEach(([a,y,c])=>b.klotz(.15*s,.15*s,.12*s,bluete||F.ROSA,x+a*s,y*s,z+c*s,G));
  k.kreis(x,z,.55*s);
}
/* Kaminholz: gestapelte Scheite mit hellen Enden nach +z */
function holzstapel(b,x,z,n){
  for(let j=0;j<3;j++) for(let i=0;i<n-j;i++){ const a=x+(i-(n-j-1)/2)*.46, y=.22+j*.4;
    const c=i%2?F.HOLZ2:F.HOLZ3; b.klotz(.36,.36,1.0,c,a,y,z,G); b.klotz(.31,.31,.98,c,a,y,z,{ rz:Math.PI/4, glatt:true });
    [0,Math.PI/4].forEach((r,n)=>b.klotz(.26,.26,.03,0xe8b870,a,y,z+.51+n*.004,{ rz:r, glatt:true })); b.klotz(.13,.13,.03,0xc08a48,a,y,z+.535,{ rz:.4, glatt:true }); b.klotz(.04,.04,.03,F.HOLZ3,a,y,z+.55,G); }
}
function sack(b,x,z,s,band){ b.klotz(.9*s,.7*s,.75*s,0xd8c090,x,.35*s,z,{ raster:.3 }); b.klotz(.72*s,.3*s,.6*s,0xe0cc9c,x,.84*s,z,G); b.klotz(.36*s,.12*s,.32*s,band,x,1.04*s,z,G); b.klotz(.5*s,.2*s,.42*s,0xd8c090,x,1.19*s,z,G); }
function stiefel(b,x,z,c){ [-.2,.2].forEach(a=>{ b.klotz(.28,.55,.3,c,x+a,.34,z,G); b.klotz(.3,.2,.48,c,x+a,.1,z+.12,G); b.klotz(.34,.1,.36,F.CREME,x+a,.64,z,G); }); }

/* ---------- Teppiche ---------- */
function teppich(b,x1,z1,x2,z2,y,farben,fransen){
  farben.forEach((c,i)=>{ const r=i*.42; b.platte(x1+r,z1+r,x2-r,z2-r,y+i*.004,c,{ raster:.6 }); });
  if(fransen) for(let z=z1+.15;z<z2;z+=.34){ b.platte(x1-.28,z,x1,z+.16,y,F.CREME,G); b.platte(x2,z,x2+.28,z+.16,y,F.CREME,G); }
}

/* ---------- schlafende Katze auf einem Kissen ---------- */
function schlafkatze(k,sc,x,z){
  K.koerper(sc,b=>{ b.klotz(1.5,.22,1.15,F.BLAU,x,.11,z,{ raster:.4 }); b.klotz(1.2,.08,.9,0x78aef4,x,.25,z,G); [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.16,.16,.16,F.GELB,x+s*.74,.12,z+t*.56,G))); });
  const rumpf=K.beweglich(sc,x-.15,.28,z-.08);
  K.koerper(rumpf,b=>{ const c=0xf09838, d=0xc87420; b.klotz(.86,.3,.66,c,0,.16,0,G); b.klotz(.74,.18,.54,c,-.02,.38,0,G); b.klotz(.54,.12,.4,c,-.06,.52,0,G);
    [-.22,.06].forEach(a=>{ b.klotz(.08,.03,.3,d,a,.59,-.03,G); }); b.klotz(.34,.34,.08,0xf8ac54,-.2,.22,.32,G); });
  const kopf=K.beweglich(sc,x+.34,.3,z+.28);
  K.koerper(kopf,b=>{ const c=0xf8a848; b.klotz(.64,.46,.46,c,0,.26,0,G); [-1,1].forEach(s=>{ b.klotz(.2,.14,.12,c,s*.21,.54,0,G); b.klotz(.1,.12,.1,c,s*.24,.66,0,G); b.klotz(.09,.1,.02,F.ROSA,s*.21,.54,.066,G);
      b.klotz(.15,.04,.02,0x3a2010,s*.15,.33,.236,G); [.2,.12].forEach(y=>b.klotz(.24,.016,.016,0xffffff,s*.36,y,.25,{ rz:s*(y-.16)*3, glatt:true })); });
    b.klotz(.28,.17,.05,0xfff0dc,0,.15,.245,G); b.klotz(.09,.06,.02,0xd8607a,0,.21,.28,G); b.klotz(.08,.1,.02,0xc87420,0,.45,.236,G);
    [-.16,.16].forEach(a=>b.klotz(.2,.1,.22,0xfff0dc,a,.01,.2,G)); });
  const schwanz=K.beweglich(sc,x-.55,.36,z+.16);
  K.koerper(schwanz,b=>{ b.klotz(.18,.16,.34,0xe88c2c,0,0,.14,G); b.klotz(.5,.15,.16,0xf09838,.23,0,.36,G); b.klotz(.18,.16,.17,0xfff0dc,.56,0,.36,G); });
  const zett=[0,1].map(i=>{ const q=K.beweglich(sc,x,1,z); K.koerper(q,b=>b.pixel('www|.w.|www',.07,{ w:0xffffff },0,0,0,.03,G),{ leuchtet:true, deckung:.8 }); return q; });
  k.anim.push(t=>{ rumpf.scale.y=1+Math.sin(t*1.9)*.07; kopf.position.y=.3+Math.sin(t*1.9)*.015; kopf.rotation.z=-.08+Math.sin(t*.5)*.03; schwanz.rotation.y=Math.sin(t*.9)*.18;
    zett.forEach((q,i)=>{ const u=(t*.28+i*.5)%1; q.position.set(x+.55+u*.5+Math.sin(u*7)*.1,.95+u*1.1,z+.15); const s=Math.sin(u*Math.PI); q.scale.set(s,s,s); }); });
  k.kreis(x,z,.8);
}
/* Schmetterling, der durch die Stube flattert */
function falter(k,sc,mx,my,mz,ax,az,farbe,ph){
  const g=K.beweglich(sc,mx,my,mz); g.scale.setScalar(.65);
  K.koerper(g,b=>{ b.klotz(.1,.12,.5,F.SCHWARZ,0,0,0,G); b.klotz(.16,.16,.15,F.SCHWARZ,0,.03,.3,G); [-1,1].forEach(s=>{ b.klotz(.025,.025,.26,F.SCHWARZ,s*.09,.15,.45,{ rx:-.6, ry:s*.4, glatt:true }); b.klotz(.07,.07,.07,F.SCHWARZ,s*.14,.23,.55,G); }); },{ schatten:false });
  const fl=[-1,1].map(s=>{ const q=K.beweglich(g,0,0,0); K.koerper(q,b=>{ b.klotz(.34,.03,.3,farbe,s*.22,0,.1,G); b.klotz(.18,.03,.2,farbe,s*.44,0,.17,G); b.klotz(.26,.03,.22,F.GELB,s*.18,0,-.17,G); b.klotz(.12,.04,.12,F.WEISS,s*.32,0,.12,G); b.klotz(.08,.04,.08,F.SCHWARZ,s*.19,0,-.18,G); },{ leuchtet:true }); return q; });
  k.anim.push(t=>{ const u=t*.35+ph; g.position.set(mx+Math.sin(u)*ax,my+Math.sin(t*1.7+ph)*.25,mz+Math.sin(u*2)*az); g.rotation.y=Math.atan2(Math.cos(u)*ax,Math.cos(u*2)*2*az); fl.forEach((q,i)=>q.rotation.z=(i?1:-1)*(.75+Math.sin(t*12+ph)*.4)); });
}
/* Funken aus dem Ofen (ein Körper) */
function funken(k,sc,x,y,z){
  const N=22, m=new THREE.InstancedMesh(GEO.box,basis(0xffb030),N), d=new THREE.Object3D(); m.frustumCulled=false; sc.add(m);
  const setze=t=>{ for(let i=0;i<N;i++){ const u=(t*(.28+(i%5)*.05)+i*.137)%1, s=.075*(1-u);
      d.position.set(x+Math.sin(i*2.7+t)*(.15+u*.7),y+u*1.8,z+u*.9+Math.cos(i*1.9)*.25); d.scale.set(s,s,s); d.rotation.y=i+t*2; d.updateMatrix(); m.setMatrixAt(i,d.matrix); }
    m.instanceMatrix.needsUpdate=true; };
  setze(0); k.anim.push(setze);
}
/* rote Hängelampe, die sanft pendelt (Drehpunkt oben an der Kette) */
function pendellampe(k,par,x,y,z,ph){
  const q=K.beweglich(par,x,y+2.2,z); K.haengelampe(q,0,-2.2,0,{ farbe:F.ROT });
  k.anim.push(t=>{ q.rotation.z=Math.sin(t*1.1+ph)*.035; });
}

function baue(k){
  const sc=k.scene;
  const h=K.huelle(k,{ B,T,H, hintergrund:0x1c0f0c, himmelLicht:0xfff0d8, grund:0x6a4230, staerke:.74, sonne:0xffe2b0, sonneStaerke:.46,
    wand:MIX.holz, raster:1, sockel:0x7a4420, krone:[0x8a5228,0x7a4420],
    boden:{ farben:MIX.dielen, raster:1.5, loecher:[[-1.6,-9.6,1.6,-6.4]] } });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueAusgang(k,sc);

  /* ---------- Rückwand ---------- */
  K.koerper(hinten,b=>{
    fachbalken(b,[-17.7,-9.0,-3.5,3.5,8.45,13.3,17.7],-18,18,HINTEN);
    brett(b,-15.6,2.3,HINTEN+.06,3.4,0); brett(b,-15.6,3.75,HINTEN+.06,3.4,1);
    kraeuter(b,-6.2,4.4,HINTEN+.1);
    brett(b,15.5,2.4,HINTEN+.06,3.2,2); kraeuter(b,15.5,4.6,HINTEN+.06);
  },{ schatten:false });
  stubenfenster(k,hinten,0,2.85,-13.38,3.2,0);
  stubenfenster(k,hinten,-11.5,2.85,-13.38,2.4,2.2);
  pendellampe(k,hinten,-3.0,3.7,-12.5,0);
  pendellampe(k,hinten,3.1,3.7,-12.5,1.8);

  /* ---------- Seitenwände (eigene Richtung: Blick nach +z, Länge entlang x) ---------- */
  [[links,-1],[rechts,1]].forEach(([w,s])=>{
    const q=gruppe(w,s*18,0,0); q.rotation.y=-s*Math.PI/2;
    /* örtliches x entspricht z im Raum: links x = -z, rechts x = z */
    const ax=z=>s*z;
    K.koerper(q,b=>{
      fachbalken(b,[-13.1,-6.6,-.8,5.2,10.2,13.3].map(x=>x),-13.5,13.5,0);
      brett(b,ax(2.2),2.2,.06,4.0,s+2); brett(b,ax(2.2),3.7,.06,3.2,s+3);
      kraeuter(b,ax(-9.8),4.6,.06); brett(b,ax(-9.8),2.2,.06,3.6,s+4);
      /* Hutleiste mit Schal und Mützen */
      const hx=ax(11.7); b.klotz(2.4,.2,.16,F.HOLZ3,hx,3.2,.14,G);
      [[-.8,F.ROT],[0,F.GRUEN],[.8,F.BLAU]].forEach(([a,c],i)=>{ b.klotz(.14,.14,.3,F.GOLD,hx+a,3.2,.3,G);
        if(i===1){ b.klotz(.32,1.2,.12,c,hx+a,2.55,.4,G); [2.25,2.65,3.0].forEach(y=>b.klotz(.34,.14,.13,F.GELB,hx+a,y,.41,G)); }
        else { b.klotz(.62,.3,.36,c,hx+a,2.98,.42,G); b.klotz(.66,.12,.4,F.CREME,hx+a,2.8,.42,G); b.klotz(.18,.18,.18,F.CREME,hx+a,3.2,.5,G); } });
    },{ schatten:false });
    stubenfenster(k,q,ax(-3.7),2.85,.12,2.6,s+3);
    stubenfenster(k,q,ax(7.7),2.85,.12,2.4,s+5);
    pendellampe(k,q,ax(-.8),3.8,1.0,s+2);
  });

  /* ---------- Sonnenflecken unter den Seitenfenstern ---------- */
  const sonne=K.koerper(sc,b=>{ [[-15.4,-2.6],[-15.2,8.6],[15.4,8.4]].forEach(([x,z],i)=>[[-.62,-.62],[.62,-.62],[-.62,.62],[.62,.62]].forEach(([a,c])=>b.platte(x+a-.55+c*.35*(i<2?1:-1),z+c-.55,x+a+.55+c*.35*(i<2?1:-1),z+c+.55,.045,0xffe8a0,G))); },{ leuchtet:true, deckung:.2 });
  if(sonne) sonne.renderOrder=-1;

  /* ---------- Teppiche ---------- */
  K.koerper(sc,b=>{
    teppich(b,-3.4,-3.8,3.4,2.4,.012,[0x9a2e3a,0xf8d878,0xd8505a,0xf8ecc8,0x3ab8ae],true);
    /* Pixelmuster auf dem großen Teppich: Raute in der Mitte, kleine Rauten in den Ecken */
    const raute=(x,z,n,s,c1,c2,y)=>{ for(let i=-n;i<=n;i++) for(let j=-n;j<=n;j++){ const d=Math.abs(i)+Math.abs(j); if(d<=n) b.platte(x+(i-.5)*s,z+(j-.5)*s,x+(i+.5)*s,z+(j+.5)*s,y,d%2?c1:c2,G); } };
    raute(0,-.7,3,.3,F.ROT,F.GELB,.036); [[-1.15,-1.6],[1.15,-1.6],[-1.15,.2],[1.15,.2]].forEach(([x,z])=>raute(x,z,1,.17,F.CREME,F.BLAU,.037));
    teppich(b,-1.1,-6.0,1.1,-3.8,.016,[0x9a2e3a,0xe08a50],false);
    teppich(b,-7.1,-10.6,-2.6,-8.4,.014,[0x2a4a9a,0x78aef4,0x3a6ac0],false);
    teppich(b,3.4,-1.5,9.0,2.8,.018,[0x2e6a44,0x8ad870,0x3a8a54],false);
    teppich(b,9.2,-3.0,14.6,-.6,.014,[0x6a3a8a,0xf08ac0,0x9a70e0],true);
    teppich(b,-7.4,3.2,-2.6,7.8,.014,[0xc87028,0xffd34a,0xe08a38],false);
    teppich(b,3.0,7.0,7.6,10.4,.014,[0x9a2e3a,0xf8ecc8,0xd8505a],true);
    for(let i=0;i<6;i++){ const x=3.95+i*.54; b.platte(x,8.0,x+.28,8.28,.036,i%2?F.BLAU:F.GELB,G); b.platte(x,9.12,x+.28,9.4,.036,i%2?F.GELB:F.BLAU,G); b.platte(x,8.56,x+.28,8.84,.036,F.CREME,G); }
  },{ schatten:false });

  /* ---------- Ausstattung am Boden ---------- */
  K.koerper(sc,b=>{
    /* Kaminholz neben dem Ofen */
    holzstapel(b,-7.9,-12.7,4); k.kasten(-7.9,-12.7,2.0,1.3);
    pflanze(k,b,-16.8,-12.2,1.1,F.GELB); pflanze(k,b,3.5,-12.5,.85,F.ROSA); pflanze(k,b,8.4,-12.5,.8,F.WEISS); pflanze(k,b,16.6,-12.2,1.15,F.ROT);
    /* niedrige Kommode mit Blumenvase unter dem linken Regal */
    b.quader(-15.1,.15,-13.3,-12.9,1.15,-12.2,0xa86c38,{ raster:.4 }); b.quader(-15.2,1.15,-13.35,-12.8,1.32,-12.1,F.HOLZ3,{ raster:.5 });
    [-14.55,-13.45].forEach(x=>{ b.klotz(.9,.34,.05,0xc8884c,x,.82,-12.18,G); b.klotz(.9,.34,.05,0xc8884c,x,.42,-12.18,G); [.82,.42].forEach(y=>b.klotz(.18,.09,.08,F.GOLD,x,y,-12.13,G)); });
    b.klotz(.34,.45,.34,F.BLAU,-14.0,1.55,-12.7,G); [[-.22,2.05,F.ROT],[0,2.25,F.GELB],[.24,2.0,F.ROSA]].forEach(([a,y,c])=>{ b.klotz(.05,.5,.05,F.GRUEN2,-14+a*.6,y-.22,-12.7,G); knaeuel(b,-14+a,y,-12.7,.24,c); });
    k.kasten(-14.0,-12.7,2.4,1.3);
    /* Küchenbank links: Arbeitsplatte mit Spülschüssel, Brot und Kanne */
    b.quader(-17.95,.1,-2.6,-16.5,1.2,2.2,0xb8773a,{ raster:.6 }); b.quader(-17.98,1.2,-2.75,-16.35,1.38,2.35,0xe8d8b0,{ raster:.6 });
    [-1.8,-.2,1.4].forEach(z=>{ b.klotz(.05,.75,1.3,0xd49556,-16.47,.65,z,{ raster:.5 }); b.klotz(.09,.1,.34,F.GOLD,-16.43,.82,z,G); });
    b.klotz(.9,.3,1.1,F.HELLBLAU,-17.15,1.53,-1.5,{ raster:.4 }); b.klotz(.66,.04,.86,0x4ab0f0,-17.15,1.69,-1.5,G);
    b.klotz(.55,.34,.9,0xd89a50,-17.1,1.55,.15,{ ry:.2, raster:.3 }); [-.24,0,.24].forEach(z=>b.klotz(.46,.04,.08,0xf8d898,-17.1,1.74,.15+z,{ ry:.2, glatt:true }));
    b.klotz(.55,.6,.55,F.TUERKIS,-17.15,1.68,1.5,G); b.klotz(.34,.14,.34,F.TUERKIS,-17.15,2.05,1.5,G); b.klotz(.4,.14,.14,F.TUERKIS,-16.75,1.82,1.5,{ rz:.6, glatt:true }); b.klotz(.14,.14,.14,F.GOLD,-17.15,2.18,1.5,G);
    k.kasten(-17.2,-.2,1.7,5.2);
    holzstapel(b,-16.6,-9.0,3); k.kasten(-16.6,-9.0,1.6,1.2);
    pflanze(k,b,-16.9,6.4,1.0,F.WEISS); sack(b,-16.8,8.6,1.0,F.ROT); k.kreis(-16.8,8.6,.65); sack(b,-16.0,9.8,.75,F.BLAU); k.kreis(-16.0,9.8,.5);
    stiefel(b,-16.9,11.4,F.ROT); k.kreis(-16.9,11.5,.5);
    /* rechte Seite: Sitzbank mit Polster, Pflanzen, Stiefel, Nachttisch am Bett */
    b.quader(16.5,.55,.2,17.9,.75,4.6,0xa86c38,{ raster:.5 }); b.quader(17.65,.75,.2,17.9,1.75,4.6,0x8a5228,{ raster:.5 });
    [.45,2.4,4.35].forEach(z=>[16.7,17.7].forEach(x=>b.klotz(.22,.55,.22,F.HOLZ3,x,.28,z,G)));
    /* flache, durchgehende Polsterauflage mit Streifen */
    b.quader(16.56,.75,.3,17.62,.85,4.5,F.ROT,{ raster:.5 }); [.9,1.9,2.9,3.9].forEach(z=>b.klotz(1.08,.02,.22,F.CREME,17.09,.855,z,G));
    k.kasten(17.2,2.4,1.6,4.6);
    b.quader(16.4,.1,-8.0,17.8,1.2,-6.8,0x8a5228,{ raster:.4 }); b.quader(16.3,1.2,-8.1,17.9,1.35,-6.7,F.HOLZ,{ raster:.5 }); b.klotz(.06,.36,.8,0xa86c38,16.36,.72,-7.4,G); b.klotz(.1,.12,.12,F.GOLD,16.3,.75,-7.4,G);
    b.klotz(.46,.14,.46,F.GOLD,17.05,1.42,-7.4,G); b.klotz(.18,.4,.18,F.CREME,17.05,1.68,-7.4,G);
    k.kasten(17.1,-7.4,1.6,1.4);
    pflanze(k,b,16.8,-10.2,.95,F.LILA); pflanze(k,b,16.9,8.4,1.1,F.ORANGE); stiefel(b,16.7,10.9,F.GRUEN); k.kreis(16.7,11.0,.55);
    /* vorn: nur Niedriges */
    pflanze(k,b,-9.6,11.9,.65,F.ROT); pflanze(k,b,-7.9,12.3,.5,F.GELB); pflanze(k,b,9.0,12.2,.6,F.ROSA); pflanze(k,b,15.0,12.0,.7,F.WEISS);
    holzstapel(b,-13.4,11.7,3); k.kasten(-13.4,11.7,1.6,1.2);
    sack(b,13.2,11.9,.8,F.GRUEN); k.kreis(13.2,11.9,.55);
    /* kleine Bank mit Teekanne vorn in der Mitte */
    b.quader(-5.2,.45,11.6,-2.8,.62,12.5,F.HELLHOLZ,{ raster:.5 }); [-4.9,-3.1].forEach(x=>b.klotz(.24,.45,.75,F.HOLZ2,x,.22,12.05,G));
    b.klotz(.5,.4,.45,F.ROT,-4.3,.82,12.05,G); b.klotz(.3,.1,.28,F.ROT2,-4.3,1.07,12.05,G); b.klotz(.14,.1,.14,F.GOLD,-4.3,1.17,12.05,G); b.klotz(.34,.12,.12,F.ROT,-3.93,.9,12.05,{ rz:.55, glatt:true });
    [-3.55,-3.15].forEach((x,i)=>{ b.klotz(.24,.24,.24,i?F.TUERKIS:F.GELB,x,.74,12.1,G); });
    k.kasten(-4.0,12.05,2.5,1.0);
    /* Blumenhocker, Holzeisenbahn */
    const hocker=(x,z,c)=>{ b.klotz(.7,.14,.7,F.HELLHOLZ,x,.52,z,{ raster:.35 }); [-1,1].forEach(a=>[-1,1].forEach(e=>b.klotz(.12,.46,.12,F.HOLZ3,x+a*.24,.23,z+e*.24,G))); b.klotz(.34,.28,.34,0xc8683c,x,.73,z,G); knaeuel(b,x,1.03,z,.42,0x4aa850); [[-.14,1.2],[.12,1.27],[0,1.14]].forEach(([a,y],i)=>b.klotz(.13,.13,.1,c,x+a,y,z+.2-i*.04,G)); k.kreis(x,z,.45); };
    hocker(-10.0,-1.0,F.GELB); hocker(9.4,-8.0,F.ROSA);
    [[-1.0,-.0,F.ROT],[0,.0,F.BLAU],[.95,.1,F.GRUEN]].forEach(([a,e,c],i)=>{ const x=-8.6+a, z=9.2+e; b.klotz(.75,.3,.45,c,x,.32,z,G); if(!i){ b.klotz(.32,.34,.45,F.GELB,x-.2,.64,z,G); b.klotz(.14,.26,.14,F.DUNKEL,x+.2,.6,z,G); } else b.klotz(.36,.24,.3,i>1?F.GELB:F.ORANGE,x,.59,z,G); [-.24,.24].forEach(u=>b.klotz(.22,.22,.54,F.HOLZ3,x+u,.13,z,G)); if(i) b.klotz(.22,.06,.06,F.DUNKEL,x-.48,.28,z,G); }); k.kasten(-8.6,9.25,3.0,.7);
    /* Nähkissen und Holzklötzchen als Spielzeug am Boden (klein) */
    [[1.9,.14,12.0,F.BLAU,.3],[2.35,.14,11.7,F.GELB,-.4],[2.15,.42,11.85,F.ROT,.1]].forEach(([x,y,z,c,r])=>b.klotz(.28,.28,.28,c,x,y,z,{ ry:r, glatt:true })); k.kreis(2.1,11.85,.45);
  });
  /* Kerze auf dem Nachttisch */
  const kerze=K.beweglich(sc,17.05,1.9,-7.4); K.koerper(kerze,b=>{ b.klotz(.12,.18,.12,F.ORANGE,0,.08,0,G); b.klotz(.07,.12,.07,F.GELB,0,.2,0,G); },{ leuchtet:true }); schein(sc,'rgba(255,200,90,.5)',17.05,2.05,-7.4,1.1);
  k.anim.push(t=>{ kerze.scale.y=1+Math.sin(t*12)*.14; });

  /* ---------- Laternen vorn an den Seiten ---------- */
  [[-17.0,12.3],[17.0,12.3]].forEach(([x,z])=>{ K.laterne(sc,x,z,{ hoch:1.8 }); k.kreis(x,z,.4); });

  /* ---------- Leben ---------- */
  schlafkatze(k,sc,-2.15,-12.2);
  const h1=K.huhn(k,sc,0,0,0,1.0,{ laeuft:true }); laeufer(k,h1.g,[[-1.8,5.4],[2.2,5.0],[3.4,8.8],[.4,10.0],[-2.2,8.6]],1.0,0,10);
  K.huhn(k,sc,8.2,9.9,2.5,.85,{ farbe:0xd89a56, pickt:true, phase:1.3 }); k.kreis(8.2,9.9,.55);
  K.koerper(sc,b=>{ for(let i=0;i<14;i++){ const a=i*2.4, d=.2+(i%5)*.12; b.klotz(.07,.05,.07,F.GELB,7.5+Math.cos(a)*d,.045,10.4+Math.sin(a)*d*.7,G); } },{ schatten:false });
  /* flattern vor einem Rückwand- und einem Seitenfenster */
  falter(k,sc,-11.5,3.0,-12.5,1.1,.3,F.ROSA,0);
  falter(k,sc,-17.0,3.0,7.7,.35,1.0,F.TUERKIS,2.7);
  funken(k,sc,-4.9,.9,-11.2);

  /* ---------- Licht (zusammen mit dem Ausgang 5 Punktlichter) ---------- */
  flacker(k,-4.8,1.3,-10.2,0xff8a30,.85,11);
  flacker(k,-2.0,3.6,-11.2,0xffd080,.38,12);
  flacker(k,8.5,4.0,-9.0,0xffd890,.4,14);
  flacker(k,-3.0,4.8,4.0,0xffe0b0,.28,18);

  return { tuer, start:[0,-2.2] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.4,-9.8],[-9.4,-9.4],[-3.2,-7.4],[3.4,-9.2],[8.4,-9.6],[14.6,-9.8],[-8.2,-1.2],[-3.8,-5.0],[4.4,-4.6],[9.0,-6.4],[-14.8,-3.0],[14.8,.2],[-9.4,6.6],[-14.6,6.2],[1.4,3.6],[9.0,3.2],[14.4,3.8],[-6.6,10.0],[5.4,11.0],[14.0,8.8]];

return { titel:'Das Blockhaus', breite:36, tiefe:27, oben:['22,12,8','58,32,18','100,60,32'], baue, gegenstaende, verstecke };
})();

/* Raum 2: Die Kristallhöhle. Höhle aus violetten Steinblöcken mit Tropfzapfen an den Wänden, kleinen leuchtenden Kristallen,
   Wasserfall, Gleisen, Fledermäusen, Leuchtschnecken, einem Maulwurf mit Helm, einem Frosch, Glühwürmchen und der Pixelbiene.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Höhlensee mit Boot) und 10 (Förderkorb) kommen aus kloetzchenwelt-gemeinsam.js.
   Ausgang: das Block-Portal in der Rückwand. Die Steinplatte versinkt im Boden, dahinter leuchtet ein kurzer Tunnel mit drehenden Klötzchen. */
RAEUME3D.kloetzchenwelt[1] = (function(){
const K=KLOTZ, F=K.F;
const B=36, T=27, H=6, HINTEN=-13.5;
const AX=-10; /* Mitte des Ausgangs */
const WAND=[0x5e548a,0x544a7c,0x6a6096,0x4e4674], BODEN=[0x746a94,0x6a628a,0x7e749e,0x665c86], FELS=[0x8a7eae,0x786c9c,0x968ab8,0x6c6290], FELS2=[0x9c90bc,0x8a80aa,0xaca2c8];
const KF=[F.KRIST,F.PINK,0x6aa8ff,0xb490ff,F.LIME];
const ohne={ schatten:false }, licht={ leuchtet:true };

/* ---------- Felsen und Zapfen (kommen in Baukästen) ---------- */
/* Felshaufen aus gedrehten Klötzen, Breite etwa 1.6*s */
function fels(b,x,z,s,farben){
  const L=farben||FELS;
  [[0,.34,0,1.0,.68],[-.55,.22,.15,.7,.44],[.55,.18,-.05,.62,.36],[.1,.16,.5,.55,.32],[-.1,.82,-.1,.6,.32],[.28,.12,-.48,.46,.24]].forEach(([a,y,c,w,h])=>b.klotz(w*s,h*s,w*.9*s,K.wahl(L),x+a*s,y*s,z+c*s,{ ry:zufall()*1.2, raster:.45 }));
}
/* hängender Tropfzapfen mit stumpfem Ende, Oberkante bei y */
function zapfen(b,x,y,z,s,n){
  let u=y; for(let i=0;i<(n||4);i++){ const w=(.95-i*.19)*s, h=(.42-i*.03)*s; b.klotz(w,h,w*.8,K.wahl(FELS),x,u-h/2,z,{ raster:.5 }); u-=h; }
}
/* niedriger, runder Tropfstein am Boden (stumpf) */
function huegel(b,x,z,s){
  [[1.0,.28],[.7,.26],[.46,.22],[.3,.14]].reduce((u,[w,h],i)=>{ b.klotz(w*s,h*s,w*s,K.wahl(i>1?FELS2:FELS),x,u+h*s/2,z,{ ry:i*.35, raster:.4 }); return u+h*s; },0);
}
/* kleine Kristallgruppe für den Rand (Leuchtbaukasten) */
function splitter(g,x,y,z,s,i){
  K.kristall(g,x,y-.1,z,s,KF[i%5],.1); K.kristall(g,x-.35*s,y-.18,z+.12,s*.65,KF[(i+2)%5],.5); K.kristall(g,x+.36*s,y-.16,z+.06,s*.55,KF[(i+1)%5],-.55);
}

/* ---------- Ausgang: das Block-Portal ---------- */
function baueAusgang(k,sc,hinten){
  /* Tunnel dahinter: geschlossen, hell, mit bunten Ringen an der Rückseite */
  const tunnel=gruppe(hinten,AX,0,0);
  K.koerper(tunnel,b=>{ [-1,1].forEach(s=>K.mauer(b,-18.1,-13.75,0,4.5,s*2.35,{ achse:'z', farben:[0x7a6ab8,0x6a5aa8,0x8a7ac8], d:.5, raster:.75 }));
    K.mauer(b,-2.6,2.6,4.5,5.0,-15.9,{ farben:[0x5a4a90,0x6a5aa0], d:4.4, raster:.75 });
    for(let i=0;i<6;i++) b.platte(-1.5+(i%2)*.2,-14.4-i*.6,1.5-(i%2)*.2,-13.95-i*.6,.015,[0x9af0f0,0xffb8e8,0xb8f89a][i%3],{ raster:.5 }); },ohne);
  K.koerper(tunnel,b=>{ [[4.2,4.5,0x4ab8e8],[3.4,3.6,0x6ae0d0],[2.6,2.75,0xb8f4a0],[1.8,1.9,0xfff0a0],[1.0,1.05,0xffffff]].forEach(([w,h,c],i)=>b.klotz(w,h,.08,c,0,2.25,-18.05+i*.05,{ raster:.45 }));
    [-1,1].forEach(s=>[[-14.5,.8],[-15.6,3.4],[-16.7,1.7],[-17.4,3.0]].forEach(([z,y],i)=>b.klotz(.08,.3,.3,KF[(i+(s>0?2:0))%5],s*2.07,y,z,{ glatt:true }))); },licht);
  const wirbel=K.beweglich(tunnel,0,2.2,-16.7);
  K.koerper(wirbel,b=>{ for(let i=0;i<14;i++){ const a=i*Math.PI/7, r=i%2?1.55:1.1, w=.2+(i%3)*.07; b.klotz(w,w,w,[F.KRIST,F.PINK,F.LIME,F.GELB,0xffffff][i%5],Math.cos(a)*r,Math.sin(a)*r,(i%3-1)*.35,{ rz:a, ry:i*.5, glatt:true }); } },licht);
  tunnel.visible=false;

  /* bunter Klotzrahmen */
  const r=gruppe(hinten,AX,0,-13.28), c=[F.TUERKIS,0x8a80b0,F.ROSA,0xb0a8c8,F.HELLGRUEN,0x6c6290];
  K.koerper(r,b=>{ [-1,1].forEach(s=>{ for(let i=0;i<7;i++) b.klotz(.7,.63,.62,c[(i+(s>0?2:0))%6],s*2.35,.315+i*.63,0,{ raster:.7 }); b.klotz(1.0,.34,.86,0x9c90bc,s*2.45,.17,.1); });
    for(let i=0;i<8;i++) b.klotz(.68,.66,.68,c[(i*5+1)%6],-2.38+i*.68,4.74,.02,{ raster:.7 });
    for(let i=0;i<4;i++) b.klotz(.66,.4,.58,c[(i*5+4)%6],-.99+i*.66,5.27,0); },ohne);
  K.koerper(r,b=>{ [-1,1].forEach(s=>[.95,2.2,3.45].forEach((y,i)=>b.klotz(.24,.24,.08,[F.KRIST,F.PINK,F.LIME][(i+(s>0?1:0))%3],s*2.35,y,.34,{ rz:Math.PI/4, glatt:true })));
    b.klotz(.46,.46,.06,F.KRIST,0,4.4,.4,{ rz:Math.PI/4, glatt:true }); b.klotz(.2,.2,.06,0xffffff,0,4.4,.44,{ rz:Math.PI/4, glatt:true }); },licht);

  /* Steinplatte mit Zahlenschloss, versinkt beim Öffnen */
  const platte=K.beweglich(hinten,AX,0,-13.38);
  K.koerper(platte,b=>{ for(let i=0;i<4;i++) for(let j=0;j<5;j++) b.klotz(1.0,.88,.34,[0xc4bcd8,0xb4acca,0xd0cae2][(i*2+j)%3],-1.5+i,.44+j*.88,0,{ raster:.5 });
    [[-1.4,3.7,F.TUERKIS],[1.4,3.7,F.ROSA],[-1.4,.65,F.ROSA],[1.4,.65,F.TUERKIS]].forEach(([x,y,f])=>{ b.klotz(.55,.55,.08,f,x,y,.19,{ raster:.28 }); b.klotz(.22,.22,.06,0xffffff,x,y,.24,{ rz:Math.PI/4, glatt:true }); });
    for(let i=0;i<12;i++){ const a=i*Math.PI/6; b.klotz(.24,.24,.08,i%2?0x7a6aa8:0x9a8ac8,Math.cos(a)*1.25,2.25+Math.sin(a)*1.25,.2,{ rz:a, glatt:true }); } },ohne);
  const schl=K.schloss(platte,0,2.05,.36,1.35);
  const schimmer=schein(platte,'rgba(255,225,120,.45)',0,2.2,.7,2.0);

  const lampe=new THREE.PointLight(0xa8f0ff,0,11,1.5); lampe.position.set(AX,2.8,-15.0); sc.add(lampe);
  k.kasten(AX,-13.2,5.9,.9);
  return ausgang(k,{ name:'Block-Portal', einfach:'Tor aus Blöcken', steh:[AX+1.5,-11.3], durch:[AX,-15.4], losNach:1.3,
    treffer:{x:AX,y:2.3,z:-12.95,b:4.4,h:4.6,t:.8}, schildOben:[AX,4.5,-12.3], glanz:[AX,2.2,-12.3],
    bewege:(auf,t)=>{ platte.position.y=-auf*4.6; platte.visible=auf<.97; schl.visible=auf<.75; schimmer.visible=auf<.2;
      tunnel.visible=auf>.02; wirbel.rotation.z=t*.9; lampe.intensity=1.9*auf; const g=1.9+Math.sin(t*2.2)*.2; schimmer.scale.set(g,g,1); } });
}

/* ---------- Wände: Zapfen, Vorsprünge, Moos, kleine Kristalle ---------- */
function wandschmuck(k,h){
  /* Rückwand (alles in der Wandgruppe) */
  const b=K.bau(), g=K.bau();
  [[-17.0,1.3,5],[-15.4,.9,4],[-14.0,.7,3],[-6.4,.9,4],[-5.0,1.1,4],[-3.5,.7,3],[-2.2,.55,3],[3.4,.75,3],[4.9,1.15,5],[6.4,.8,3],[12.6,.85,4],[14.2,1.2,5],[15.9,.8,3],[17.2,1.0,4]].forEach(([x,s,n])=>zapfen(b,x,H+.35,-13.1,s,n));
  for(let i=0;i<24;i++){ const x=-17.6+i*1.53; if(Math.abs(x-AX)<3.1) continue; b.klotz(1.4,.45+(i%3)*.18,.55,K.wahl(FELS),x,H+.1,-13.3,{ raster:.7 }); }
  [[-15.2,2.4,2.6],[-4.6,1.7,2.2],[4.9,2.7,2.0],[14.8,2.2,3.0]].forEach(([x,y,w],i)=>{ b.klotz(w,.34,.55,0x8a7eae,x,y,-13.28); b.klotz(w*.65,.3,.4,0x6c6290,x-.2,y-.3,-13.32); b.klotz(w*.7,.08,.45,0x5ab890,x+.15,y+.2,-13.24,{ raster:.3 });
    splitter(g,x-.1,y+.2,-13.2,.38,i); b.klotz(.2,.5,.08,0x4aa880,x+w*.35,y-.32,-12.98,{ glatt:true }); });
  /* Sockelfelsen und Randkristalle hinten, jeweils mit Hindernis */
  [[-16.7,1.25],[-14.2,.8],[-5.6,.85],[-4.0,.65],[4.9,.8],[13.5,.85],[16.6,1.3]].forEach(([x,s],i)=>{ fels(b,x,-12.9,s); splitter(g,x+(i%2?.5:-.4),.62*s,-12.55,.42,i+1); k.kasten(x,-12.9,1.9*s,1.5*s); });
  /* Leuchtmoos in kleinen Tupfen */
  [[-16,3.9],[-13.4,3.2],[-6.2,3.4],[-5.5,4.2],[-3.0,3.0],[3.7,1.4],[5.8,3.8],[6.3,1.6],[12.8,4.2],[13.4,1.3],[16.4,3.7],[-7.0,1.2]].forEach(([x,y],i)=>{ [[0,0],[.16,.1],[.28,-.08],[.08,-.2]].forEach(([a,c],j)=>g.klotz(.09,.09,.05,[0x8af0a0,0x6ae8d8][(i+j)%2],x+a,y+c,-13.2,{ glatt:true })); });
  b.fertig(h.hinten,ohne); g.fertig(h.hinten,licht);

  /* Seitenwände */
  [[h.links,-1],[h.rechts,1]].forEach(([w,s])=>{
    const q=K.bau(), l=K.bau();
    [-12.2,-9.8,-8.4,-5.4,-3.1,-.6,3.2,4.8,7.4,9.9,12.4].forEach((z,i)=>zapfen(q,s*17.6,H+.35,z+s*.4,.7+((i*7)%5)*.14,3+(i%3)));
    for(let i=0;i<18;i++) q.klotz(.55,.4+((i+(s>0?1:0))%3)*.2,1.4,K.wahl(FELS),s*17.8,H+.1,-12.8+i*1.5,{ raster:.7 });
    (s<0 ? [[-9.0,2.4,3.0],[-2.0,3.2,2.4],[4.0,1.8,2.6],[10.0,3.0,3.0]] : [[-9.4,2.8,2.6],[-4.6,1.6,2.2],[5.6,3.1,2.4],[10.4,1.9,3.0]]).forEach(([z,y,t],i)=>{
      q.klotz(.55,.34,t,0x8a7eae,s*17.75,y,z); q.klotz(.4,.3,t*.65,0x6c6290,s*17.8,y-.3,z+.2); q.klotz(.45,.08,t*.7,0x5ab890,s*17.72,y+.2,z-.15,{ raster:.3 }); splitter(l,s*17.65,y+.2,z+.15,.36,i+(s>0?3:0)); });
    (s<0 ? [[-11.2,1.1],[-8.6,.7],[-5.8,.9],[2.2,.8],[9.2,1.1],[11.9,.8]] : [[-11.0,1.0],[-8.4,.75],[-1.2,.7],[3.4,.75],[9.4,.9],[12.0,1.15]]).forEach(([z,sz],i)=>{
      fels(q,s*17.35,z,sz); splitter(l,s*16.9,.4*sz,z+(i%2?.45:-.4),.4,i+(s>0?1:2)); k.kasten(s*17.35,z,1.7*sz,1.7*sz); });
    for(let i=0;i<14;i++){ const z=-11.5+i*1.75, y=.9+((i*5+(s>0?3:0))%7)*.55; [[0,0],[.12,.17],[-.1,.28]].forEach(([c,a],j)=>l.klotz(.05,.09,.09,[0x8af0a0,0x6ae8d8,0xc8a8ff][(i+j)%3],s*17.8,y+a,z+c,{ glatt:true })); }
    q.fertig(w,ohne); l.fertig(w,licht);
  });
}

/* Wasserfall an der rechten Wand mit kleinem Becken */
function wasserfall(k,w){
  const z=.9, g=gruppe(w,0,0,0);
  K.koerper(g,b=>{ b.klotz(.9,.4,2.1,0x8a7eae,17.65,4.35,z); [-1,1].forEach(s=>{ b.klotz(.55,.5,.4,0x9c90bc,17.45,4.7,z+s*.85); [0,1,2,3,4].forEach(i=>b.klotz(.4+(i%2)*.14,.85,.45,K.wahl(FELS),17.8,.45+i*.85,z+s*(.95+(i%2)*.08))); });
    [[16.5,-1.0],[16.35,-.35],[16.35,.35],[16.5,1.0],[17.05,-1.25],[17.05,1.25]].forEach(([x,d],i)=>b.klotz(.55,.34+(i%3)*.08,.62,K.wahl(FELS2),x,.2,z+d,{ ry:i*.4 })); },ohne);
  K.koerper(g,b=>{ b.klotz(.12,4.2,1.35,0x4ab0f0,17.82,2.1,z,{ raster:.45 }); b.platte(16.55,z-1.05,17.95,z+1.05,.16,0x5ac0f4,{ raster:.4 }); },licht);
  const tropfen=[0,1].map(n=>{ const q=K.beweglich(g,17.72,0,z); K.koerper(q,b=>{ for(let i=0;i<9;i++) b.klotz(.05,.3+(i%3)*.12,.1,i%2?0xe0f8ff:0xa8e4ff,-n*.03,.2+((i*3+n*2)%9)*.46,-.55+((i*5+n*3)%9)*.138,{ glatt:true }); },licht); return q; });
  const gischt=K.beweglich(g,17.4,.2,z); K.koerper(gischt,b=>[[-.1,-.5,.22],[.1,-.1,.3],[-.2,.3,.2],[.05,.6,.24]].forEach(([x,d,s])=>b.klotz(s,s,s,0xffffff,x,s*.3,d,{ ry:d, glatt:true })),licht);
  k.anim.push(t=>{ tropfen.forEach((q,n)=>q.position.y=-((t*1.7+n*.45)%.9)*.7); gischt.scale.y=1+Math.sin(t*9)*.25; });
  k.kasten(17.0,z,2.0,3.1);
}

/* ---------- Boden: Trittsteine, Gleise, Pfützen, Geröll ---------- */
function bodenschmuck(k,sc){
  const g=gruppe(sc,0,0,0), flach=K.bau();
  /* Trittsteine vom Platz in der Mitte zum Portal: dunkel und unregelmäßig */
  [[-1.2,-1.4],[-2.4,-2.0],[-3.9,-2.3],[-5.3,-2.9],[-6.4,-3.9],[-7.2,-5.1],[-7.8,-6.4],[-8.3,-7.7],[-8.8,-9.0],[-9.4,-10.2],[-9.8,-11.5]].forEach(([x,z],i)=>{ const c=i%2?0x8a7ea6:0x7e749e, a=i*.9;
    flach.klotz(.7+(i%3)*.08,.07,.5,c,x,.035,z,{ ry:a, raster:.9 }); flach.klotz(.46,.062,.62+(i%2)*.1,c,x+Math.cos(a)*.14,.031,z+Math.sin(a)*.12,{ ry:a+.75, raster:.9 }); flach.klotz(.4,.054,.34,c,x-Math.sin(a)*.24,.027,z+Math.cos(a)*.2,{ ry:a+1.9, raster:.9 }); });
  /* großer aufgelegter Kristallstern aus Bodenplatten */
  for(let i=-5;i<=5;i++) for(let j=-5;j<=5;j++){ const d=Math.abs(i)+Math.abs(j); if(d>5||d<2||(d===3&&(i+j+20)%2)) continue; flach.platte(.9+i*.56-.25,1.0+j*.56-.25,.9+i*.56+.25,1.0+j*.56+.25,.011+(d%2)*.001,d===5?0x5aa8c0:d===2?0xc080c0:0x8a80c0); }
  /* Gleise unter dem Wagen */
  for(let i=0;i<17;i++) flach.klotz(.3,.07,1.7,i%2?F.HOLZ2:F.HOLZ3,1.7+i*.54,.036,2.6,{ raster:.4 });
  [-.6,.6].forEach(d=>flach.klotz(9.4,.09,.12,0xb8c0d0,6.0,.1,2.6+d,{ raster:1 }));
  [1.35,10.65].forEach(x=>[-.6,.6].forEach(d=>flach.klotz(.26,.28,.26,F.ROT,x,.15,2.6+d)));
  /* Geröll, überall flach */
  for(let i=0;i<150;i++){ const x=-17+zufall()*34, z=-12+zufall()*25, s=.08+zufall()*.13; flach.klotz(s,s*.5,s*.85,K.wahl(FELS2),x,s*.25,z,{ ry:zufall()*3, glatt:true }); }
  /* niedrige Büschel aus Höhlenmoos */
  [[-15.0,9.2],[-12.2,1.0],[-9.4,-7.0],[-5.0,5.4],[-3.8,12.0],[-2.0,-10.8],[1.4,-9.4],[2.4,8.0],[6.0,-10.6],[8.8,-.8],[10.6,2.0],[13.0,11.2],[15.4,-10.2],[-16.0,-2.6],[5.6,8.4],[-9.0,1.2],[2.2,-2.6],[15.6,3.8]].forEach(([x,z],i)=>{ for(let j=0;j<9;j++){ const a=j*2.4+i, d=.1+(j%4)*.13, y=.08+(j%3)*.06; flach.klotz(.09,y,.09,[0x5ac8a0,0x78e0b8,0x4aa890][(i+j)%3],x+Math.cos(a)*d,y/2,z+Math.sin(a)*d,{ glatt:true }); } });
  flach.fertig(g,ohne);
  /* dunkle, unregelmäßige Pfützen */
  K.koerper(g,b=>{ [[-4.6,-10.0],[3.2,-8.2],[14.6,1.6],[-10.2,11.2],[7.6,9.8],[-14.4,-8.2]].forEach(([x,z],i)=>{ [[0,0,1.0,.6],[.4,.22,.66,.5],[-.38,-.18,.55,.62],[.12,-.34,.42,.34],[-.5,.28,.3,.26]].forEach(([a,c,w,d],j)=>{ const v=i%2?-1:1; b.klotz(w,.006,d,j%2?0x34689a:0x2c5c8c,x+a*v,.008+j*.0015,z+c*v,{ ry:i*.8+j*.65, glatt:true }); }); }); },licht);
  /* Felsbrocken, Tropfsteine und winzige Kristalle im Raum und vorn */
  const st=K.bau(), gl=K.bau();
  [[-16.4,13.0,1.1],[-11.4,12.8,.7],[-5.6,12.9,.55],[1.0,13.0,.7],[11.0,12.8,.6],[16.6,12.9,1.15]].forEach(([x,z,s],i)=>{ fels(st,x,z,s); splitter(gl,x+(x<0?.7:-.7),.15,z+.35,.34,i); k.kasten(x,z,1.9*s,1.5*s); });
  [[-8.4,13.0,.9],[-2.4,12.8,.75],[6.4,12.9,.95],[14.0,12.2,.7],[-15.4,-6.0,1.1],[15.6,-6.8,.9],[-4.4,8.6,.7]].forEach(([x,z,s])=>{ huegel(st,x,z,s); huegel(st,x+.75*s,z+.2,s*.6); k.kreis(x+.2*s,z,.75*s); });
  /* weiter vorn läuft die Höhle weiter */
  for(let i=0;i<38;i++){ const x=-30+zufall()*60, z=15+zufall()*14; if(i%3) fels(st,x,z,.5+zufall()*.8); else huegel(st,x,z,.7+zufall()*.8); if(i%4===0) splitter(gl,x+.6,.2,z+.7,.45,i); }
  st.fertig(g); gl.fertig(g,licht);
}

/* ---------- Tiere und Bewegung ---------- */
function fledermaus(k,sc,x,y,z,rx,rz,tempo,ph){
  const g=K.beweglich(sc,x,y,z), C=0x9a78d8, C2=0x7a58b8;
  K.koerper(g,b=>{ b.klotz(.42,.44,.36,C,0,0,0,{ glatt:true }); b.klotz(.26,.24,.06,0xd8c0f8,0,-.08,.19,{ glatt:true }); [-1,1].forEach(s=>{ b.klotz(.13,.2,.08,C,s*.15,.3,0,{ glatt:true }); b.klotz(.06,.1,.03,F.ROSA,s*.15,.3,.05,{ glatt:true }); b.klotz(.13,.14,.04,0xffffff,s*.1,.09,.19,{ glatt:true }); b.klotz(.07,.08,.03,F.SCHWARZ,s*.1,.08,.22,{ glatt:true }); }); b.klotz(.14,.035,.03,F.SCHWARZ,0,-.04,.23,{ glatt:true }); },ohne);
  const fl=[-1,1].map(s=>{ const q=K.beweglich(g,s*.18,.04,0); K.koerper(q,b=>{ b.klotz(.34,.3,.06,C2,s*.17,0,0,{ glatt:true }); b.klotz(.26,.22,.05,C2,s*.45,.05,0,{ glatt:true }); b.klotz(.14,.12,.04,C2,s*.64,.1,0,{ glatt:true }); },ohne); return q; });
  k.anim.push(t=>{ const a=t*tempo+ph; g.position.set(x+Math.sin(a)*rx,y+Math.sin(a*2.3)*.25,z+Math.sin(a*2)*rz); g.rotation.y=Math.cos(a)*.6; fl.forEach((q,i)=>q.rotation.z=(i?1:-1)*Math.sin(t*9+ph)*.55); });
}
function schnecke(k,sc,weg,start,haus,haus2){
  const g=K.beweglich(sc,weg[0][0],0,weg[0][1]);
  K.koerper(g,b=>{ const C=0xb8e870; b.klotz(1.1,.18,.4,C,0,.1,0,{ raster:.25 }); b.klotz(.3,.42,.34,C,.48,.36,0,{ glatt:true }); [-1,1].forEach(s=>{ b.klotz(.07,.28,.07,C,.52,.7,s*.12,{ glatt:true }); b.klotz(.14,.14,.14,0xffffff,.54,.88,s*.13,{ glatt:true }); b.klotz(.04,.07,.07,F.SCHWARZ,.62,.88,s*.13,{ glatt:true }); b.klotz(.03,.06,.07,F.ROSA,.64,.34,s*.11,{ glatt:true }); }); b.klotz(.03,.035,.14,F.SCHWARZ,.64,.25,0,{ glatt:true }); });
  /* rundes Haus mit Spirale auf beiden Seiten */
  K.koerper(g,b=>{ [[.4,.82],[.58,.74],[.74,.58],[.82,.4]].forEach(([w,h],i)=>b.klotz(w,h,.36-i*.004,haus,-.2,.6,0,{ glatt:true, jitter:0 }));
    [-1,1].forEach(v=>b.pixel('.sssss.|s.....s|s.sss.s|s.s.s.s|s.s...s|s..sss.|.s.....',.09,{ s:haus2 },-.2,.285,v*.19,.04,{ glatt:true })); b.klotz(.3,.05,.14,haus2,-.2,1.02,0,{ glatt:true }); },licht);
  laeufer(k,g,weg,.32,start,3);
}
function maulwurf(k,sc,x,z){
  const g=gruppe(sc,x,0,z);
  K.koerper(g,b=>{ for(let i=0;i<9;i++){ const a=i*Math.PI*2/9; b.klotz(.46,.24+(i%3)*.06,.36,i%2?F.ERDE:0x6a4424,Math.sin(a)*.62,.13,Math.cos(a)*.62,{ ry:a }); } b.klotz(.9,.06,.9,0x3a2414,0,.04,0); });
  const m=K.beweglich(g,0,0,0);
  K.koerper(m,b=>{ const C=0x6a5a68; b.klotz(.64,.7,.54,C,0,.35,0,{ raster:.3 }); b.klotz(.42,.3,.05,0xa89aa8,0,.28,.28,{ glatt:true }); b.klotz(.26,.18,.2,0xf8a0b0,0,.52,.34,{ glatt:true });
    [-1,1].forEach(s=>{ b.klotz(.13,.14,.04,0xffffff,s*.18,.68,.28,{ glatt:true }); b.klotz(.07,.08,.03,F.SCHWARZ,s*.18,.67,.31,{ glatt:true }); b.klotz(.24,.12,.26,0xf8a0b0,s*.38,.32,.28,{ rz:s*.3, glatt:true }); });
    b.klotz(.62,.07,.56,F.GELB,0,.8,0); b.klotz(.46,.14,.44,F.GELB,0,.9,-.02); b.klotz(.28,.1,.28,0xffe480,0,1.01,-.04); b.klotz(.15,.13,.08,F.GRAU,0,.9,.23,{ glatt:true }); });
  K.koerper(m,b=>b.klotz(.09,.08,.04,0xfff8c0,0,.9,.29,{ glatt:true }),licht);
  k.anim.push(t=>{ const a=Math.max(0,Math.min(1,Math.sin(t*.7)*2+1)); m.position.y=-.12+a*.2; m.rotation.y=Math.sin(t*1.4)*.4; });
  k.kreis(x,z,.85);
}
function frosch(k,sc,x,z){
  const g=gruppe(sc,x,0,z);
  K.koerper(g,b=>{ b.klotz(1.3,.26,1.1,0x9c90bc,0,.13,0,{ raster:.4 }); b.klotz(.9,.16,1.35,0x8a80aa,-.1,.1,0,{ ry:.4 }); });
  const f=K.beweglich(g,0,.26,0); f.rotation.y=.7;
  K.koerper(f,b=>{ const C=0x5ac84a; b.klotz(.62,.38,.54,C,0,.22,0,{ raster:.22 }); b.klotz(.42,.2,.05,0xe8f8a0,0,.14,.28,{ glatt:true }); b.klotz(.3,.045,.03,F.SCHWARZ,0,.3,.31,{ glatt:true });
    [-1,1].forEach(s=>{ b.klotz(.24,.24,.2,C,s*.18,.5,.13,{ glatt:true }); b.klotz(.17,.17,.04,0xffffff,s*.18,.52,.24,{ glatt:true }); b.klotz(.08,.09,.03,F.SCHWARZ,s*.18,.51,.27,{ glatt:true }); b.klotz(.16,.14,.5,0x3aa83a,s*.37,.09,-.05); b.klotz(.18,.07,.2,0x3aa83a,s*.22,.03,.33,{ glatt:true }); }); });
  k.anim.push(t=>{ const u=(t*.55)%3; f.position.y=.26+(u<.45?Math.sin(u/.45*Math.PI)*.55:0); });
  k.kreis(x,z,.8);
}
/* fallende Wassertropfen als eine Instanz-Gruppe */
function tropfen(k,sc){
  const L=[[-15.4,-11.8],[-4.6,-10.0],[3.2,-8.2],[14.6,1.6],[-14.4,-8.2],[6.4,-12.2],[-17.0,.6],[16.9,-8.0]];
  const m=new THREE.InstancedMesh(GEO.box,basis(0xa8e8ff),L.length), o=new THREE.Object3D(); m.frustumCulled=false; sc.add(m);
  k.anim.push(t=>{ L.forEach((p,i)=>{ const u=((t*.45+i*.37)%1), f=Math.min(1,u/.75); o.position.set(p[0],5.0*(1-f*f)+.08,p[1]); if(u<.75) o.scale.set(.07,.17,.07); else { const r=(u-.75)*1.6; o.scale.set(r,.03,r*.7); o.position.y=.03; if(u>.92) o.scale.set(.001,.001,.001); } o.updateMatrix(); m.setMatrixAt(i,o.matrix); }); m.instanceMatrix.needsUpdate=true; });
}
function gluehwuermchen(k,sc,x,y,z,farbe,ph){
  const g=K.beweglich(sc,x,y,z);
  K.koerper(g,b=>{ for(let i=0;i<9;i++) b.klotz(.07,.07,.07,i%3?farbe:0xffffff,Math.sin(i*2.4)*1.3,Math.sin(i*1.7)*.7,Math.cos(i*3.1)*.8,{ glatt:true }); },licht);
  k.anim.push(t=>{ g.position.set(x+Math.sin(t*.3+ph)*.9,y+Math.sin(t*.8+ph)*.3,z+Math.cos(t*.23+ph)*.6); g.rotation.y=Math.sin(t*.4+ph)*.8; });
}
/* funkelnde kleine Rauten (Gruppe pulsiert um ihre Mitte) */
function funkel(k,par,x,y,z,s,ph){
  const q=K.beweglich(par,x,y,z);
  K.koerper(q,b=>{ b.klotz(.17*s,.17*s,.03,0xfff8d0,0,0,0,{ rz:Math.PI/4, glatt:true, jitter:0 }); b.klotz(.08*s,.08*s,.04,0xffffff,0,0,.01,{ rz:Math.PI/4, glatt:true, jitter:0 }); },licht);
  k.anim.push(t=>{ const a=Math.max(.05,Math.sin(t*2.2+ph)); q.scale.setScalar(a); });
}

/* ---------- Gegenstände (Reihenfolge = ort 1 bis 10) ---------- */
const gegenstaende=[
  { x:-3.0, z:-5.6, steh:[-3.0,-3.2], r:1.7, treffer:[2.9,3.3,2.5], baue(g,k){ /* 1 große Kristallgruppe */
      K.koerper(g,b=>{ [[0,.28,0,2.0,.56,1.7],[-1.0,.2,.35,.8,.4,.8],[.95,.18,.3,.85,.36,.75],[.3,.17,.9,.9,.34,.5],[-.5,.15,-.85,.8,.3,.5]].forEach(([x,y,z,w,h,d],i)=>b.klotz(w,h,d,i%2?0x9c90bc:0x6c6290,x,y,z,{ ry:(i-2)*.22, raster:.4 })); });
      K.koerper(g,b=>{ K.kristall(b,0,.35,-.15,1.65,F.KRIST,.04); K.kristall(b,-.7,.25,.05,1.25,F.PINK,.38); K.kristall(b,.75,.25,.0,1.3,0x6aa8ff,-.36); K.kristall(b,-.25,.3,.5,.85,0x9af4ff,.16); K.kristall(b,.45,.25,.55,.75,F.PINK,-.24); K.kristall(b,-1.1,.1,.45,.55,F.KRIST,.65); K.kristall(b,1.15,.1,.45,.5,0xb490ff,-.65); K.kristall(b,.35,.35,-.65,1.05,0xb490ff,-.14); },licht);
      schein(g,'rgba(120,230,255,.4)',0,1.6,.5,3.4);
      funkel(k,g,-.05,3.05,.2,1,0); funkel(k,g,-1.25,1.8,.5,.8,2.1); funkel(k,g,1.2,2.0,.45,.8,4.2); } },
  { x:5.5, z:2.6, steh:[5.5,4.8], kasten:[3.1,1.8], treffer:[3.0,2.3,1.7], baue(g,k){ /* 2 Lore mit Steinen */
      K.koerper(g,b=>{ [-.8,.8].forEach(x=>{ b.klotz(.16,.16,1.3,F.GRAU2,x,.46,0); [-1,1].forEach(s=>{ const z=s*.66; b.klotz(.62,.62,.18,F.DUNKEL,x,.46,z,{ raster:.31 }); b.klotz(.6,.6,.17,F.DUNKEL,x,.46,z,{ rz:Math.PI/4 }); b.klotz(.24,.24,.24,F.GOLD,x,.46,z,{ rz:Math.PI/4, glatt:true }); }); });
        b.klotz(2.0,.16,.9,F.GRAU2,0,.68,0);
        [[1.9,.95,.9],[2.2,1.1,1.2],[2.5,1.25,1.5]].forEach(([w,d,y],i)=>b.klotz(w,.3,d,i%2?0xd8602e:0xc04e24,0,y,0,{ raster:.4 }));
        [-1,1].forEach(s=>{ b.klotz(2.72,.2,.18,F.GELB,0,1.72,s*.68); b.klotz(.18,.2,1.22,F.GELB,s*1.27,1.72,0); [-.85,0,.85].forEach(x=>b.klotz(.13,.13,.05,0xffe8a0,x,1.5,s*.77,{ glatt:true })); });
        b.klotz(.34,.14,.14,F.GRAU,1.46,1.3,0); b.klotz(.14,.14,.5,F.GRAU,1.62,1.3,0);
        [[-.85,1.82,.2,.6],[-.35,2.0,-.15,.7],[.3,1.86,.25,.62],[.8,1.9,-.2,.58],[.05,2.28,.05,.46],[-.8,1.78,-.35,.45],[.95,1.76,.3,.4]].forEach(([x,y,z,w],i)=>b.klotz(w,w*.72,w*.85,[0xb8b4c4,0x908c9e,0xd0ccd8][i%3],x,y,z,{ ry:i*.8, rz:(i%3-1)*.3, raster:.3 })); });
      K.koerper(g,b=>[[-.55,2.18,.28,F.KRIST],[.55,2.2,.1,F.PINK],[-.1,2.0,.5,F.LIME],[.25,2.5,.0,F.GELB]].forEach(([x,y,z,c],i)=>b.klotz(.24,.28,.22,c,x,y,z,{ ry:i, rz:.4, glatt:true })),licht);
      funkel(k,g,.55,2.45,.35,.6,1.0); } },
  { x:13.2, z:-4.4, steh:[12.5,-2.2], r:1.4, treffer:[2.7,3.1,2.4], baue(g,k){ /* 3 Leuchtpilze */
      const L=[[-.1,-.25,2.1,1.7,0x4ae8b8],[-.9,.4,1.15,1.15,0xc088ff],[.85,.25,1.4,1.2,0xffa04a],[.15,.8,.6,.75,0x4ae8b8],[-.55,-.75,.8,.8,0xff88c8]];
      K.koerper(g,b=>{ [[-.4,-.2,1.3,1.1,.4],[.5,.35,1.2,1.0,-.35],[.1,.65,.9,.7,.9],[-.55,-.7,.9,.6,.2]].forEach(([x,z,w,d,a],i)=>b.klotz(w,.1+i*.012,d,i%2?0x4a9a70:0x3e8460,x,.05,z,{ ry:a, raster:.3 })); L.forEach(([x,z,h,w])=>{ b.klotz(w*.28,h,w*.28,0xf8f0dc,x,h/2+.1,z,{ raster:.4 }); b.klotz(w*.42,.2,w*.42,0xe8dcc0,x,.2,z); b.klotz(w*.44,.09,w*.44,0xe8dcc0,x,h*.7,z); }); });
      const hut=K.beweglich(g,0,0,0);
      K.koerper(hut,b=>L.forEach(([x,z,h,w,c])=>{ const y=h+.1; b.klotz(w*.9,.07,w*.9,0xfff4d8,x,y+.02,z,{ glatt:true }); b.klotz(w,.26,w,c,x,y+.18,z,{ raster:.3 }); b.klotz(w*.74,.22,w*.74,c,x,y+.42,z,{ raster:.3 }); b.klotz(w*.42,.16,w*.42,c,x,y+.6,z);
        [[-.28,.2,.51],[.27,.28,.5],[.1,.49,.38],[-.2,.62,.22],[.12,.7,-.02]].forEach(([a,u,d])=>b.klotz(w*.15,w*.1,w*.09,0xffffff,x+a*w,y+u,z+d*w,{ glatt:true })); }),licht);
      schein(g,'rgba(120,255,200,.35)',0,2.2,.5,3.0);
      k.anim.push(t=>{ hut.position.y=Math.sin(t*1.6)*.035; }); } },
  { x:-7.2, z:2.8, steh:[-7.2,4.9], r:1.0, treffer:[1.9,4.1,1.7], baue(g,k){ /* 4 Steinsäule mit aufgeklebtem Zettel */
      const s=gruppe(g,0,0,0);
      K.koerper(s,b=>{ b.klotz(1.8,.3,1.8,0x9890ac,0,.15,0,{ raster:.45 }); b.klotz(1.45,.26,1.45,0xc8c0d8,0,.43,0,{ raster:.36 });
        for(let i=0;i<6;i++) b.klotz(.9,.47,.9,i%2?0xd8d2e4:0xc2bad2,0,.8+i*.47,0,{ raster:.45 });
        [.8,3.15].forEach(y=>b.klotz(1.02,.12,1.02,0x8a82a2,0,y,0,{ glatt:true }));
        b.klotz(1.25,.22,1.25,0xc8c0d8,0,3.5,0,{ raster:.4 }); b.klotz(1.65,.28,1.65,0x9890ac,0,3.75,0,{ raster:.4 }); [-1,1].forEach(a=>b.klotz(.3,.3,1.4,0xb0a8c4,a*.68,3.52,0));
        b.klotz(.5,.6,.04,0xfff6d8,.04,1.9,.49,{ rz:-.12, glatt:true }); b.klotz(.26,.1,.05,0xe8c890,.07,2.2,.51,{ rz:-.12, glatt:true }); [0,1,2].forEach(i=>b.klotz(.32-(i%2)*.08,.035,.02,0x5a6a9a,.02+i*.015,2.04-i*.14,.52,{ rz:-.12, glatt:true })); });
      K.koerper(s,b=>{ [[1.15,F.KRIST],[2.55,F.PINK],[2.9,F.KRIST]].forEach(([y,c],i)=>b.klotz(.18,.18,.05,c,i===0?-.2:(i===1?-.24:.2),y,.47,{ rz:Math.PI/4, glatt:true })); },licht);
      k.verdecker(s,-7.2,2.8,.8); } },
  { x:.5, z:HINTEN, wand:'hinten', steh:[.5,-11.3], kasten:[4.2,.9], treffer:[4.2,2.9,.9], trefferY:1.1, baue(g,k){ /* 5 Glitzerader in der Wand */
      K.koerper(g,b=>b.pixel('..rrr....rrr.|.rrrrrrrrrrr.|rrrrrrrrrrrrr|rrrrrrrrrrrrr|rrrrrrrrrrrrr|rrrrrrrrrrrrr|rrrrrrrrrrrrr|.rrrrrrrrrrr.|...rrrr..rr..',.31,{ r:0x342c58 },0,1.35,.2,.18,{ raster:.31 }),ohne);
      /* waagrechte Ader aus einzelnen rundlichen Nuggets, dazwischen kleine Rauten */
      K.koerper(g,b=>{ [[-1.38,2.62,1.0,0xffd84a],[-.58,2.32,1.15,F.PINK],[.34,2.78,1.2,0xffd84a],[1.22,2.42,1.05,F.KRIST],[-.62,3.18,.7,F.KRIST],[1.08,3.28,.65,F.PINK],[-1.34,1.88,.65,0xb490ff],[.42,1.9,.75,0xffd84a]].forEach(([x,y,g,c],n)=>{ const z=.35+(n%2)*.012, w=n%2?.28:-.3;
          b.klotz(.56*g,.4*g,.14,c,x,y,z,{ rz:w, glatt:true }); b.klotz(.38*g,.36*g,.18,c,x+.2*g,y+.1*g,z,{ rz:w+.8, glatt:true }); b.klotz(.34*g,.3*g,.16,c,x-.2*g,y-.09*g,z+.004,{ rz:w-.7, glatt:true });
          b.klotz(.12*g,.08*g,.04,0xfff8e8,x-.13*g,y+.09*g,z+.1,{ rz:.6, glatt:true }); });
        [[.12,3.72,F.KRIST],[-1.05,3.45,F.PINK],[-.4,1.65,F.KRIST],[1.2,1.75,0xb490ff],[1.72,3.0,0xffd84a]].forEach(([x,y,c])=>b.klotz(.2,.2,.18,c,x,y,.4,{ rz:Math.PI/4, glatt:true })); },licht);
      schein(g,'rgba(255,220,120,.35)',.1,2.7,.6,3.0);
      [[-1.55,3.05,.9],[.6,3.55,.8],[1.45,3.75,.9],[-.85,1.65,.7]].forEach(([x,y,s],i)=>funkel(k,g,x,y,.62,s,i*1.6)); } },
  { x:9.5, z:HINTEN, wand:'hinten', steh:[9.5,-11.3], kasten:[4.2,.9], treffer:[4.0,2.9,.9], trefferY:1.1, baue(g){ /* 6 Höhlenbild auf heller Steinplatte */
      K.koerper(g,b=>{ b.pixel('..sssssssssss..|.sssssssssssss.|sssssssssssssss|sssssssssssssss|sssssssssssssss|sssssssssssssss|sssssssssssssss|sssssssssssssss|sssssssssssssss|.sssssssssssss.|...sssssssss...',.27,{ s:0xe8cea0 },0,1.25,.22,.2,{ raster:.27 });
        /* Sonne, Steinbock mit gebogenen Hörnern, Handabdruck und Berglinie */
        b.pixel('..y.y.y........|...yyy....hhh..|..yyyyy..h..oo.|...yyy......ooo|..y.y.y.oooooo.|.......oooooo..|.r.r.r.o....o..|.r.r.r.o....o..|.rrrrr.........|..rrr..........|...............',.27,{ y:0xf08a20, o:0x9a3a1c, h:0x4a2410, r:0xd83a30 },0,1.25,.35,.06,{ glatt:true });
        for(let i=0;i<7;i++) b.klotz(.34,.09,.05,0x4a4a9a,-.05+i*.24,1.68+(i%2)*.17,.36,{ rz:i%2?-.62:.62, glatt:true });
        b.klotz(.09,.09,.04,0xfff0d0,1.62,3.28,.39,{ glatt:true }); },ohne);
      K.koerper(g,b=>{ [-1,1].forEach(s=>{ b.klotz(.3,.34,.32,0x8a7eae,s*2.05,4.0-(s>0?.2:0),.26,{ ry:s*.3 }); b.klotz(.34,.28,.3,0x6c6290,s*2.0,1.35,.26,{ ry:-s*.3 }); }); },ohne); } },
  { x:-13.4, z:5.8, steh:[-13.0,7.9], r:1.0, treffer:[1.9,3.2,1.7], baue(g,k){ /* 7 große Grubenlampe auf einem flachen Stein */
      K.koerper(g,b=>{ b.klotz(1.7,.3,1.5,0x9c90bc,0,.15,0,{ raster:.4 }); b.klotz(1.3,.16,1.65,0x8a80aa,.05,.12,0,{ ry:.5 });
        const M=0xc89030, D=0x3a3448;
        b.klotz(1.15,.18,1.15,D,0,.39,0); b.klotz(.98,.34,.98,M,0,.65,0,{ raster:.33 }); b.klotz(1.1,.1,1.1,0xf0c050,0,.87,0,{ glatt:true });
        [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.1,1.05,.1,D,s*.43,1.44,t*.43,{ glatt:true }))); [-1,1].forEach(s=>{ b.klotz(.96,.07,.07,D,0,1.45,s*.45,{ glatt:true }); b.klotz(.07,.07,.96,D,s*.45,1.45,0,{ glatt:true }); });
        b.klotz(1.15,.16,1.15,M,0,2.03,0,{ raster:.4 }); b.klotz(.82,.24,.82,D,0,2.22,0); b.klotz(.56,.2,.56,M,0,2.44,0); b.klotz(.28,.12,.28,D,0,2.6,0);
        [-1,1].forEach(s=>{ b.klotz(.09,.75,.09,0xd8dce8,s*.62,2.35,0,{ rz:s*.1, glatt:true }); b.klotz(.18,.14,.18,D,s*.58,2.0,0,{ glatt:true }); b.klotz(.4,.09,.09,0xd8dce8,s*.42,2.82,0,{ rz:-s*.5, glatt:true }); }); b.klotz(.55,.12,.16,F.ROT,0,2.94,0,{ glatt:true });
        b.klotz(.26,.14,.12,F.GOLD,0,.65,.54,{ glatt:true }); });
      K.koerper(g,b=>{ b.klotz(.74,1.05,.56,0xffd84a,0,1.45,0,{ raster:.4 }); b.klotz(.56,1.05,.74,0xffd84a,0,1.45,0,{ raster:.4 }); },licht);
      const fl=K.beweglich(g,0,1.12,.41); K.koerper(fl,b=>b.pixel('..o..|..oo.|.oyo.|oyyyo|oywyo|.ooo.',.1,{ o:0xff7a20, y:0xffb020, w:0xffffff },0,0,0,.04,{ glatt:true }),licht);
      schein(g,'rgba(255,210,100,.55)',0,1.45,.3,3.2);
      k.anim.push(t=>{ fl.scale.y=1+Math.sin(t*9)*.09+Math.sin(t*5.3)*.06; }); } },
  { x:6.2, z:-6.4, steh:[6.2,-4.3], kasten:[2.6,1.8], treffer:[2.5,2.5,1.7], baue(g,k){ /* 8 offene Edelsteinkiste */
      const C=0x3a62c0, C2=0x2c4a9a;
      K.koerper(g,b=>{ [-.9,.9].forEach(x=>[-.45,.45].forEach(z=>b.klotz(.34,.16,.34,F.GOLD,x,.08,z)));
        [0,1,2].forEach(i=>b.klotz(2.2,.28,1.25,i%2?C2:C,0,.3+i*.28,0,{ raster:.45 }));
        [-.82,.82].forEach(x=>b.klotz(.2,.9,1.33,F.GOLD,x,.58,0,{ raster:.3 })); b.klotz(2.28,.12,1.33,F.GOLD,0,1.04,0);
        b.klotz(.42,.46,.08,0xffe070,0,.72,.66); b.klotz(.12,.18,.04,F.DUNKEL,0,.7,.72,{ glatt:true });
        /* offener Deckel */
        b.klotz(2.2,1.0,.2,C,0,1.55,-.85,{ rx:-.3, raster:.45 }); b.klotz(2.25,.24,.34,C2,0,2.07,-1.01,{ rx:-.3 }); [-.82,.82].forEach(x=>b.klotz(.2,1.05,.26,F.GOLD,x,1.56,-.84,{ rx:-.3 })); });
      K.koerper(g,b=>{ const F2=[F.KRIST,F.PINK,F.LIME,F.GELB,0xb490ff,0xff6a6a,0x6aa8ff];
        [[-.75,1.2,.3],[-.3,1.24,.32],[.2,1.2,.35],[.7,1.22,.28],[-.55,1.28,-.15],[.0,1.35,-.05],[.48,1.3,-.12],[-.8,1.18,-.3],[.82,1.16,-.3],[-.2,1.6,.05],[.28,1.55,.1],[.05,1.82,-.1],[-.5,1.46,.1],[.62,1.45,.05]].forEach(([x,y,z],i)=>b.klotz(.34,.34,.3,F2[i%7],x,y,z,{ ry:i*.7, rz:.35+(i%4)*.25, glatt:true })); },licht);
      funkel(k,g,-.4,1.9,.35,.8,.5); funkel(k,g,.65,1.75,.4,.6,3.0); } },
  Object.assign({ x:-11.6, z:-3.4, steh:[-11.4,-.8] },K.NEU.hoehlensee),
  Object.assign({ x:12.6, z:5.4, steh:[12.2,7.6] },K.NEU.foerderkorb)
];

function baue(k){
  const sc=k.scene;
  const h=K.huelle(k,{ B,T,H, hintergrund:0x1a1436, himmelLicht:0xe4e0ff, grund:0x7a6a9a, staerke:.92, sonne:0xfff0e4, sonneStaerke:.42,
    wand:WAND, raster:1, relief:.16, sockel:0x40386a, krone:[0x443c6e,0x3c3462], oeffnung:{x:AX,b:4,h:4.4},
    boden:{ farben:BODEN, raster:1.5, weit:{hinten:6}, aussen:0x161030 } });
  const tuer=baueAusgang(k,sc,h.hinten);
  wandschmuck(k,h);
  wasserfall(k,h.rechts);
  bodenschmuck(k,sc);

  /* ---------- Leben ---------- */
  fledermaus(k,sc,-5.2,4.9,-10.6,1.6,.6,.55,0);
  fledermaus(k,sc,5.0,5.0,-9.8,1.8,.8,.45,2.2);
  fledermaus(k,sc,14.0,4.7,-8.4,1.5,.9,.62,4.1);
  schnecke(k,sc,[[-10.6,9.4],[-7.0,10.2],[-8.2,11.6],[-11.2,11.0]],0,0xff8ac8,0xb04a9a);
  schnecke(k,sc,[[9.0,10.4],[4.0,9.4],[3.2,10.6],[7.8,11.6]],4,0x5ae0e8,0x2a8ab0);
  schnecke(k,sc,[[10.2,-8.4],[14.6,-7.8],[13.8,-9.2],[11.0,-9.8]],2,0xffd34a,0xe08a30);
  maulwurf(k,sc,-1.0,8.8);
  frosch(k,sc,-15.6,-.7);
  K.biene(k,sc,-5.0,4.2,-8.4,.9,{ runde:.9, tempo:.7 });
  tropfen(k,sc);
  gluehwuermchen(k,sc,-14.0,3.0,-7.4,0xd8ff7a,0);
  gluehwuermchen(k,sc,3.6,4.0,-10.4,0x9affff,2.0);
  gluehwuermchen(k,sc,14.6,2.8,8.6,0xffe87a,4.0);
  gluehwuermchen(k,sc,-4.0,2.8,10.0,0x9affff,1.2);

  /* ---------- Licht (zusammen mit dem Ausgang 6 Punktlichter) ---------- */
  flacker(k,-3.0,3.2,-4.4,0x6adcff,.55,12);
  flacker(k,12.4,3.2,-3.4,0x7affc0,.45,11);
  flacker(k,-12.8,2.8,6.4,0xffc868,.65,12);
  flacker(k,4.0,5.0,-9.6,0xff9ae0,.45,13);
  flacker(k,5.0,5.4,4.6,0xffe4c8,.38,17);

  return { tuer, start:[0,-1.4] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-15.6,-10.4],[-13.2,-9.6],[-6.4,-10.4],[-3.4,-8.6],[4.0,-10.4],[13.2,-10.8],[15.4,-1.8],[9.4,-2.4],[1.6,-5.0],[-5.6,-1.0],[-15.6,3.0],[-10.2,5.0],[-3.6,2.4],[2.4,5.8],[8.6,6.4],[14.8,9.6],[-14.6,10.6],[-5.6,6.8],[4.4,11.6],[.6,10.6]];

return { titel:'Die Kristallhöhle', breite:36, tiefe:27, oben:['20,16,44','52,42,92','84,70,134'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Die Bauwerkstatt. Helle Halle mit cremefarbenen Klotzwänden, türkisen Leisten, grauem Werkboden,
   blauen Wandlampen, großen Fenstern, Förderband, drehenden Zahnrädern, Modellen am Rand, zwei Hühnern und einer Katze.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Bauroboter) und 10 (Zementmischer) kommen aus den gemeinsamen Bausteinen.
   Ausgang: eine bunte Blockwand, die der große gelbe Teleskopkran weghebt; dahinter liegt eine sonnige Wiese. */
RAEUME3D.kloetzchenwelt[2] = (function(){
const K=KLOTZ, F=K.F, MIX=K.MIX;
const B=36, T=27, H=6, HINTEN=-13.5;
const BUNT=[F.ROT,F.GELB,F.BLAU,F.GRUEN,F.LILA,F.ORANGE];
const TUERKIS2=0x2e8a84, PLAN=0x2f6ac8, PLAN2=0x1f4a98, KRANGELB=0xffc414, KRANGELB2=0xe09a00;
const G={ glatt:true };

/* rundes Teil aus zwei gekreuzten Klötzen (Achse nach +z), z. B. Räder und Scheiben */
function scheibe(b,d,t,farbe,x,y,z,dreh){ const w=dreh||0; b.klotz(d*.86,d*.86,t,farbe,x,y,z,{ rz:w, glatt:true }); b.klotz(d*.86,d*.86,t*.96,farbe,x,y,z,{ rz:w+Math.PI/4, glatt:true }); }
/* achteckiger Topf (Achse senkrecht), Mitte bei y */
function topf(b,d,h,farbe,x,y,z){ b.klotz(d,h,d*.6,farbe,x,y,z,G); b.klotz(d*.6,h*.995,d,farbe,x,y,z,G); b.klotz(d*.84,h*.99,d*.84,farbe,x,y,z,G); }

/* ---------- Ausgang: Blockwand, großer gelber Kran und Ausblick ---------- */
function ausblick(hinten){
  const g=gruppe(hinten,0,0,0);
  K.koerper(g,b=>{
    for(let i=0;i<12;i++) for(let j=0;j<6;j++){ const x=-6+i, z=-19.7+j; b.platte(x,z,x+1,z+1,.015,K.wahl(MIX.gras),G); }
    for(let j=0;j<7;j++){ const z=-19.3+j*.85; b.platte(-1.0+Math.sin(j*.9)*.35,z,1.0+Math.sin(j*.9)*.35,z+.85,.03,j%2?F.SAND:0xf4dca0,G); }
    /* Himmel hinten und an den Seiten */
    b.quader(-7,0,-20.1,7,4.5,-19.8,0x9fd8ff,{ raster:2, jitter:.012 });
    [-1,1].forEach(s=>b.quader(s*6,0,-19.8,s*6.3,4.2,-14.1,0x9fd8ff,{ raster:2, jitter:.012 }));
    /* Hügel */
    [[-4.3,3.4,.9],[-3.7,2.0,1.5],[3.9,4.0,.8],[4.5,2.4,1.35],[1.6,2.2,.55]].forEach(([x,w,h],i)=>b.quader(x-w/2,0,-19.8+i*.03,x+w/2,h,-19.5+i*.03,i%2?0x5cb45c:0x74c85c,{ raster:.5 }));
    /* Sonne und Wolken */
    b.pixel('.yy.|yyyy|yyyy|.yy.',.28,{ y:0xffe266 },-2.7,2.6,-19.72,.08,G);
    b.pixel('..www....|.wwwwww..|wwwwwwwww',.24,{ w:0xffffff },1.8,2.7,-19.72,.08,G);
    b.pixel('.www.|wwwww',.2,{ w:0xffffff },-.6,3.6,-19.72,.08,G);
    /* kleines neues Haus, Baum, Blumen */
    b.quader(2.2,0,-18.9,3.8,1.2,-17.9,F.CREME,{ raster:.4 }); [[1.9,1.35],[1.4,1.65],[.8,1.95]].forEach(([w,y],i)=>b.klotz(w+.1,.3,1.2,i%2?F.ROT2:F.ROT,3.0,y,-18.4,G));
    b.klotz(.42,.7,.08,F.HOLZ2,2.75,.35,-17.86,G); b.klotz(.38,.38,.08,F.BLAU,3.4,.7,-17.86,G);
    K.baum(b,-3.6,-18.2,{ hoch:1.1, gr:.7 });
    [[-2.2,-15.2],[-2.9,-16.8],[2.4,-15.6],[3.4,-16.4],[-1.9,-17.8],[1.7,-17.2],[4.6,-15.0],[-4.7,-15.6]].forEach(([x,z],i)=>K.blume(b,x,z,[F.ROT,F.GELB,F.WEISS,F.LILA][i%4]));
  },{ leuchtet:true });
  return g;
}
function baueAusgang(k,sc,hinten){
  const draussen=ausblick(hinten); draussen.visible=false;
  /* fester Teil: Fuß und äußerer Mast des großen Krans, Warnstreifen am Boden */
  const MXK=3.55, MZK=-12.55;
  K.koerper(hinten,b=>{
    b.klotz(1.7,.3,1.35,F.DUNKEL,MXK,.15,MZK,{ raster:.45 });
    [-1,1].forEach(s=>[-.55,0,.55].forEach((x,i)=>b.klotz(.28,.31,.06,i%2?F.DUNKEL:KRANGELB,MXK+x,.155,MZK+s*.69,G)));
    /* offener Gittermast: vier Stützen mit Streben */
    [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.2,3.7,.2,KRANGELB,MXK+s*.45,2.15,MZK+t*.4,{ raster:.5 })));
    [.7,1.75,2.8,3.88].forEach(y=>{ [-1,1].forEach(t=>b.klotz(1.14,.14,.14,KRANGELB2,MXK,y,MZK+t*.43,G)); [-1,1].forEach(s=>b.klotz(.14,.14,.9,KRANGELB2,MXK+s*.48,y,MZK,G)); });
    [[1.22,1],[2.27,-1],[3.32,1]].forEach(([y,s])=>b.klotz(1.3,.09,.09,KRANGELB2,MXK,y,MZK+.5,{ rz:s*.86, glatt:true }));
    /* Türrahmen aus grauen Stahlklötzen */
    [-1,1].forEach(s=>{ b.klotz(.34,4.2,.34,F.GRAU2,s*2.4,2.1,-13.3,{ raster:.42 }); [.5,1.6,2.7,3.8].forEach(y=>b.klotz(.2,.2,.08,KRANGELB,s*2.4,y,-13.1,G)); b.klotz(.55,.24,.55,F.DUNKEL,s*2.4,.12,-13.25); });
    for(let i=0;i<12;i++) b.platte(-2.4+i*.4,-12.75,-2.0+i*.4,-12.25,.012,i%2?F.DUNKEL:KRANGELB,G);
  });
  /* bewegter Teil: innerer Mast, Ausleger, Haken, Seile und die Blockwand heben sich zusammen */
  const hub=K.beweglich(hinten,0,0,0);
  K.koerper(hub,b=>{
    /* Blockwand aus großen bunten Klötzen */
    const farben=[F.ROT,F.BLAU,F.GELB,F.GRUEN,F.LILA,F.ORANGE,F.TUERKIS,F.ROSA];
    for(let j=0;j<5;j++){ const versetzt=j%2, teile=versetzt?[.55,1.1,1.1,1.1,.55]:[1.1,1.1,1.1,1.1]; let x=-2.2;
      teile.forEach((w,i)=>{ b.klotz(w-.03,.77,.4,farben[(i+j*3)%8],x+w/2,.4+j*.8,-13.2,{ raster:.8 }); x+=w; }); }
    b.klotz(4.46,.12,.46,F.DUNKEL,0,4.03,-13.2); [-1.65,1.65].forEach(x=>{ b.klotz(.34,.1,.2,F.GRAU,x,4.14,-13.15,G); [-1,1].forEach(s=>b.klotz(.08,.22,.14,F.GRAU,x+s*.11,4.22,-13.12,G)); });
    /* dunkle Platte hinter dem Schloss */
    b.klotz(1.7,1.75,.1,F.DUNKEL,0,2.15,-12.98,G); [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.14,.14,.06,KRANGELB,s*.7,2.15+t*.72,-12.91,G)));
    /* innerer Mast (steckt im äußeren und reicht unter den Boden) */
    b.klotz(.46,9.3,.42,KRANGELB2,MXK,.85,MZK,{ raster:.5 });
    for(let y=.4;y<5.3;y+=.55) b.klotz(.48,.12,.44,F.DUNKEL,MXK,y,MZK,G);
    /* Ausleger mit Gegengewicht */
    b.klotz(5.5,.14,.4,KRANGELB,2.1,5.46,-12.62,{ raster:.5 }); b.klotz(5.5,.14,.4,KRANGELB,2.1,5.02,-12.62,{ raster:.5 });
    for(let i=0;i<9;i++) b.klotz(.09,.58,.12,KRANGELB2,-.45+i*.6,5.24,-12.55,{ rz:i%2?.75:-.75, glatt:true });
    [-.65,4.85].forEach(x=>b.klotz(.14,.6,.42,KRANGELB2,x,5.24,-12.62,G));
    b.klotz(.85,.8,.6,F.GRAU2,5.15,5.1,-12.62,{ raster:.4 }); b.klotz(.89,.14,.64,F.DUNKEL,5.15,5.1,-12.62,G);
    /* Führerhäuschen am Mast */
    b.klotz(.9,.75,.66,KRANGELB,MXK,4.55,-12.3,{ raster:.4 }); b.klotz(.66,.42,.05,0x9fe0ff,MXK,4.6,-11.95,G); b.klotz(.98,.12,.74,F.ROT,MXK,4.98,-12.3,G);
    /* Laufkatze, Seil, Haken und die zwei Tragseile */
    b.klotz(.6,.26,.5,F.DUNKEL,0,4.9,-12.7,G); b.klotz(.09,.38,.09,F.SCHWARZ,0,4.68,-12.9,G);
    b.klotz(.36,.28,.24,F.ROT,0,4.46,-13.0,G); b.klotz(.12,.14,.12,F.GRAU,0,4.28,-13.04,G); b.klotz(.28,.09,.12,F.GRAU,.07,4.2,-13.04,G);
    [-1,1].forEach(s=>{ const dx=s*1.58, dy=-.2; b.klotz(Math.hypot(dx,dy),.07,.07,F.SCHWARZ,s*.84,4.34,-13.05,{ rz:Math.atan(dy/dx), glatt:true }); });
  });
  const lampe=K.beweglich(hub,MXK,5.74,-12.62);
  K.koerper(lampe,b=>b.klotz(.26,.26,.26,0xffa030,0,0,0,G),{ leuchtet:true });
  K.schloss(hub,0,2.0,-12.8,1.25);
  const schimmer=schein(hub,'rgba(255,225,120,.4)',0,2.2,-12.55,1.8);
  k.kasten(0,-13.15,5.4,.7); k.kasten(MXK,MZK,1.7,1.45);
  return ausgang(k,{ name:'Blockwand', einfach:'Wand aus Blöcken', steh:[-1.4,-11.4], durch:[-.15,-15.6], losNach:1.5, blick:{ pitch:.3, zoom:1.6 },
    treffer:{x:1,y:2.1,z:-12.8,b:6.4,h:4.1,t:1.2}, schildOben:[0,4.4,-11.9], glanz:[0,2.1,-12.2],
    bewege:(auf,t)=>{ hub.position.y=auf*3.8; draussen.visible=auf>.02; schimmer.visible=auf<.3;
      const s=1.7+Math.sin(t*2.2)*.2; schimmer.scale.set(s,s,1); lampe.scale.setScalar(.8+Math.abs(Math.sin(t*3))*.4); } });
}

/* Lampe an einem Wandarm: Lampe bei (x,y,z), Wandplatte bei (wx,wz) */
function wandlampe(wand,x,y,z,wx,wz){
  K.haengelampe(wand,x,y,z,{ farbe:F.BLAU, licht:0xd8f0ff, kette:0 });
  const quer=Math.abs(wx-x)>Math.abs(wz-z);
  K.koerper(wand,b=>{ const h=y+.84;
    b.quader(Math.min(x,wx)-.07,h-.07,Math.min(z,wz)-.07,Math.max(x,wx)+.07,h+.07,Math.max(z,wz)+.07,F.DUNKEL,G);
    b.klotz(.12,.3,.12,F.DUNKEL,x,y+.66,z,G);
    b.klotz(quer?.14:.5,.9,quer?.5:.14,F.BLAU2,wx,y+.55,wz,G); },{ schatten:false });
}

/* ---------- Wandschmuck ---------- */
function rueckwand(k,hinten){
  /* türkise Leisten, links und rechts der Öffnung */
  K.koerper(hinten,b=>{
    [[-17.9,-2.6],[2.6,17.9]].forEach(([a,e])=>{ b.quader(a,.55,-13.46,e,.75,-13.34,F.TUERKIS,{ raster:.5 }); b.quader(a,5.05,-13.46,e,5.3,-13.32,F.TUERKIS,{ raster:.5 }); });
    b.quader(-2.6,5.72,-13.46,2.6,5.96,-13.34,TUERKIS2,{ raster:.5 });
    /* Pfeiler */
    [-17.6,-11.2,-5.2,5.8,11.7,17.6].forEach(x=>{ b.quader(x-.22,0,-13.48,x+.22,5.7,-13.28,TUERKIS2,{ raster:.45 }); b.klotz(.7,.24,.3,F.TUERKIS,x,5.8,-13.34); });
    /* buntes Fliesenband */
    for(let i=0;i<44;i++){ const x=-17.2+i*.8; if(Math.abs(x)<2.9) continue; b.klotz(.32,.32,.08,BUNT[i%6],x,.28,-13.38,G); }
  },{ schatten:false });
  [-14.4,14.6].forEach(x=>K.fenster(hinten,x,3.0,-13.42,3.2,2.3,{ rahmen:TUERKIS2 }));
  K.fenster(hinten,-3.9,3.15,-13.42,1.4,1.7,{ rahmen:TUERKIS2 });
}
/* Zahnrad: zwei bis drei gekreuzte Klötze mit Zähnen, dreht sich */
function zahnrad(k,par,x,y,z,r,farbe,tempo){
  const g=K.beweglich(par,x,y,z);
  K.koerper(g,b=>{ scheibe(b,r*1.8,.14,farbe,0,0,0,.2); for(let i=0;i<8;i++){ const a=i*Math.PI/4; b.klotz(r*.42,r*.36,.12,farbe,Math.cos(a)*r*.92,Math.sin(a)*r*.92,0,{ rz:a, glatt:true }); }
    scheibe(b,r*.75,.2,F.CREME,0,0,.02); scheibe(b,r*.3,.26,F.DUNKEL,0,0,.04); [0,1,2,3].forEach(i=>b.klotz(r*.16,r*.16,.18,F.DUNKEL,Math.cos(i*1.571)*r*.62,Math.sin(i*1.571)*r*.62,.02,G)); },{ schatten:false });
  k.anim.push(t=>{ g.rotation.z=t*tempo; });
}
/* Modelle auf einem Brett: Haus, Brücke, Baum, Boot (Füße bei x, y) */
function modell(b,art,x,y,z){
  if(art===0){ b.klotz(.62,.4,.4,F.CREME,x,y+.2,z,G); b.klotz(.76,.14,.5,F.ROT,x,y+.47,z,G); b.klotz(.5,.14,.4,F.ROT,x,y+.61,z,G); b.klotz(.22,.14,.28,F.ROT,x,y+.74,z,G); b.klotz(.15,.24,.04,F.HOLZ2,x-.12,y+.12,z+.21,G); b.klotz(.15,.14,.04,F.BLAU,x+.15,y+.23,z+.21,G); }
  else if(art===1){ [-.42,.42].forEach(a=>b.klotz(.17,.34,.34,F.GRAU,x+a,y+.17,z,G)); b.klotz(1.2,.11,.4,F.ORANGE,x,y+.39,z,G); [-.46,-.23,0,.23,.46].forEach(a=>b.klotz(.06,.17,.06,F.HOLZ2,x+a,y+.52,z+.15,G)); b.klotz(1.06,.06,.08,F.HOLZ2,x,y+.62,z+.15,G); }
  else if(art===2){ b.klotz(.16,.3,.16,F.HOLZ2,x,y+.15,z,G); b.klotz(.55,.34,.45,F.GRUEN,x,y+.45,z,G); b.klotz(.34,.24,.32,F.HELLGRUEN,x,y+.72,z,G); }
  else { b.klotz(.78,.18,.34,F.BLAU,x,y+.1,z,G); b.klotz(.98,.09,.38,F.WEISS,x,y+.23,z,G); b.klotz(.32,.24,.26,F.ROT,x-.1,y+.39,z,G); b.klotz(.12,.2,.12,F.DUNKEL,x+.22,y+.37,z,G); }
}
function seitenwand(k,w,s){
  /* örtlich: x läuft an der Wand entlang, z zeigt in den Raum; Welt-z = s * x */
  const q=gruppe(w,s*17.9,0,0); q.rotation.y=-s*Math.PI/2;
  const u=z=>s*z;
  const fz=s<0?[-11.3,3.2]:[-10.6,6.8];
  fz.forEach(z=>K.fenster(q,u(z),3.0,.04,2.8,2.2,{ rahmen:TUERKIS2 }));
  const reg=s<0?[9.0]:[-6.6,10.1];
  K.koerper(q,b=>{
    b.quader(-13.4,.55,0,13.4,.75,.12,F.TUERKIS,{ raster:.5 }); b.quader(-13.4,5.05,0,13.4,5.3,.14,F.TUERKIS,{ raster:.5 });
    [-13.2,-8.6,.6,12.9].forEach(x=>b.quader(x-.2,0,0,x+.2,5.7,.2,TUERKIS2,{ raster:.45 }));
    reg.forEach((z,n)=>{ const x=u(z); [1.5,2.9].forEach((y,j)=>{ b.klotz(3.6,.14,.75,F.HOLZ,x,y,.4,{ raster:.45 }); [-1.5,1.5].forEach(a=>b.klotz(.14,.45,.5,F.HOLZ3,x+a,y-.28,.26,G));
        [0,1,2].forEach(i=>modell(b,(i+j*2+n+(s<0?1:0))%4,x-1.15+i*1.15,y+.07,.42)); }); });
  },{ schatten:false });
  const zz=s<0?[[-6.9,3.2,1.0,F.ORANGE,.5],[-5.25,2.55,.72,F.BLAU,-.7],[-4.1,3.55,.62,F.GELB,.82]]:[[2.0,3.3,.95,F.BLAU,-.5],[3.45,2.55,.7,F.ROT,.68]];
  zz.forEach(([z,y,r,c,v])=>zahnrad(k,q,u(z),y,.2,r,c,v));
}
/* Förderband an der linken Wand: bunte Klötze fahren aus einem Tunnel in den anderen */
function foerderband(k,sc){
  const x=-16.7, z1=-9.2, z2=-1.4;
  K.koerper(sc,b=>{
    b.quader(x-.55,.62,z1,x+.55,.82,z2,F.DUNKEL,{ raster:.4 }); [-1,1].forEach(s=>b.quader(x+s*.6-.07,.66,z1,x+s*.6+.07,.98,z2,F.GRAU,{ raster:.6 }));
    for(let z=z1+.9;z<z2;z+=1.9) [-.45,.45].forEach(a=>b.klotz(.16,.64,.16,F.GRAU2,x+a,.32,z));
    [z1,z2].forEach((z,i)=>{ b.klotz(1.55,.7,1.1,F.GRAU2,x,.35,z,{ raster:.4 }); [-1,1].forEach(s=>b.klotz(.2,1.0,1.1,i?F.TUERKIS:F.BLAU,x+s*.68,1.2,z,{ raster:.4 })); b.klotz(1.65,.28,1.2,i?F.TUERKIS:F.BLAU,x,1.82,z,{ raster:.4 }); b.klotz(.2,.2,.2,i?F.GRUEN:F.ROT,x+.45,2.06,z,G); });
  });
  /* jeder Klotz läuft für sich: er verschwindet hinten im Tunnel und kommt vorn mit derselben Farbe wieder heraus */
  const N=6, A=(z2-z1)/N;
  for(let i=0;i<N;i++){ const q=K.beweglich(sc,x,0,z1+i*A); K.koerper(q,b=>b.klotz(.4,.36,.4,BUNT[i],0,1.0,0,{ ry:(i%3-1)*.25, glatt:true }));
    k.anim.push(t=>{ q.position.z=z1+(t*.55+i*A)%(z2-z1); }); }
  k.kasten(x,(z1+z2)/2,1.7,z2-z1+1.2);
}
/* Tisch mit großem Modell (Deko an der rechten und linken Wand) */
function modelltisch(k,b,x,z,art){
  b.klotz(1.5,.16,2.4,F.HELLHOLZ,x,.95,z,{ raster:.4 }); [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.17,.88,.17,F.HOLZ2,x+s*.58,.44,z+t*1.0)));
  b.platte(x-.65,z-1.05,x+.65,z+1.05,1.04,0x74c45a,G);
  modell(b,art,x-.05,1.05,z-.45); modell(b,(art+2)%4,x,1.05,z+.55);
  k.kasten(x,z,1.6,2.5);
}
/* Stapel flacher Bretter */
function bretter(k,b,x,z,quer){
  for(let j=0;j<3;j++) for(let i=0;i<3-(j>1?1:0);i++){ const a=-.45+i*.45+(j>1?.2:0), c=(i+j)%2?F.HELLHOLZ:F.HOLZ; if(quer) b.klotz(.4,.16,2.8-j*.2,c,x+a,.12+j*.19,z,{ raster:.4 }); else b.klotz(2.8-j*.2,.16,.4,c,x,.12+j*.19,z+a,{ raster:.4 }); }
  k.kasten(x,z,quer?1.6:2.9,quer?2.9:1.6);
}
function pflanze(k,b,x,z,s){
  topf(b,.95*s,.6*s,0xd06a38,x,.3*s,z); topf(b,1.08*s,.14*s,0xa84e28,x,.62*s,z);
  [[0,.95,0,.7],[-.28,.82,.12,.4],[.3,.86,-.08,.42],[0,1.35,0,.42],[.05,.8,.3,.36]].forEach(([a,y,c,w])=>b.klotz(w*s,w*s,w*s,K.wahl(MIX.laub),x+a*s,y*s,z+c*s,{ ry:zufall() }));
  [[-.25,1.15,.3,F.ROSA],[.28,1.25,.18,F.GELB],[.02,1.6,.1,F.ROSA]].forEach(([a,y,c,f])=>b.klotz(.17*s,.17*s,.17*s,f,x+a*s,y*s,z+c*s,G));
  k.kreis(x,z,.6*s);
}
/* Holztrommel mit aufgewickeltem Seil, liegt flach */
function trommel(k,b,x,z){
  topf(b,1.4,.14,F.HOLZ,x,.07,z); topf(b,.85,.6,F.SAND,x,.43,z); [.28,.45,.62].forEach(y=>topf(b,.9,.06,0xc8a860,x,y,z)); topf(b,1.4,.14,F.HOLZ,x,.8,z); topf(b,.34,.08,F.HOLZ3,x,.9,z);
  k.kreis(x,z,.78);
}

/* ---------- Gegenstände (Reihenfolge = ort 1 bis 10) ---------- */
const gegenstaende=[
  { x:-6.0, z:-5.2, steh:[-5.8,-3.2], kasten:[3.9,1.9], treffer:[3.8,2.3,1.8], baue(g){ /* 1 Werkbank mit Bauplänen, Schraubstock und Hausmodell */
      K.koerper(g,b=>{
        [-1.55,1.55].forEach(x=>[-.55,.55].forEach(z=>b.klotz(.26,1.05,.26,F.HOLZ3,x,.525,z,{ raster:.35 })));
        b.klotz(3.3,.12,1.2,F.HOLZ2,0,.35,0,{ raster:.4 }); [[-1.0,F.ROT],[-.45,F.BLAU],[.15,F.GELB],[.8,F.GRUEN]].forEach(([x,c],i)=>b.klotz(.45,.4,.5,c,x,.62,.1,{ ry:(i%3-1)*.2 }));
        b.klotz(3.7,.28,1.6,0xd09048,0,1.18,0,{ raster:.4 }); b.klotz(3.74,.08,1.64,F.HOLZ2,0,1.04,0);
        /* zwei blaue Baupläne mit weißen Linien, einer eingerollt */
        const plan=(x,z,w,d,ry,y)=>{ b.klotz(w,.03,d,PLAN,x,y,z,{ ry:ry, glatt:true }); const c=Math.cos(ry), s=Math.sin(ry); const strichM=(a,e,br,ti)=>b.klotz(br,.012,ti,0xeaf6ff,x+a*c+e*s,y+.022,z-a*s+e*c,{ ry:ry, glatt:true });
          strichM(0,-d*.3,w*.7,.04); strichM(0,d*.28,w*.7,.04); strichM(-w*.35,0,.04,d*.6); strichM(w*.35,0,.04,d*.6); strichM(-w*.1,0,.04,d*.58); strichM(w*.13,d*.06,w*.4,.04); };
        plan(-.25,.12,1.5,1.05,.14,1.34); plan(.55,-.2,.85,.7,-.35,1.37);
        b.klotz(1.2,.2,.2,PLAN,-.35,1.42,-.55,{ ry:-.08, glatt:true }); [-1,1].forEach(s=>b.klotz(.06,.22,.22,0xeaf6ff,-.35+s*.62,1.42,-.55+s*.05,{ ry:-.08, glatt:true }));
        /* Schraubstock vorn links */
        b.klotz(.5,.12,.4,F.BLAU2,-1.5,1.38,.5,G); [-.17,.17].forEach(a=>b.klotz(.16,.42,.46,F.BLAU,-1.5+a,1.62,.5,G)); b.klotz(.16,.2,.4,F.HELLHOLZ,-1.5,1.62,.5,G); b.klotz(.34,.09,.09,F.GRAU,-1.14,1.58,.6,G); b.klotz(.07,.34,.07,F.GRAU,-.98,1.56,.6,G);
        /* Hausmodell und Maßband */
        modell(b,0,1.3,1.32,-.25);
        scheibe(b,.5,.18,F.GELB,1.45,1.57,.45); scheibe(b,.18,.22,F.DUNKEL,1.45,1.57,.45); b.klotz(.45,.04,.14,0xfff0a0,1.1,1.35,.5,G); b.klotz(.05,.08,.16,F.ROT,.87,1.36,.5,G);
      }); } },
  { x:6.4, z:-5.4, steh:[6.1,-3.3], kasten:[3.0,2.0], treffer:[2.9,3.6,1.9], baue(g,k){ /* 2 kleiner roter Spielkran auf einer Holzplatte */
      K.koerper(g,b=>{
        b.klotz(2.8,.24,1.8,F.HELLHOLZ,0,.12,0,{ raster:.4 }); b.klotz(2.86,.08,1.86,F.HOLZ2,0,.04,0);
        b.klotz(.9,.34,.9,F.BLAU,-.75,.4,0,{ raster:.3 });
        [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.12,2.35,.12,F.ROT,-.75+s*.2,1.72,t*.2,{ raster:.3 })));
        for(let i=0;i<5;i++){ const y=.75+i*.46; b.klotz(.52,.09,.52,i%2?F.WEISS:F.ROT,-.75,y,0,G); }
        /* Kurbelrad unten */
        scheibe(b,.5,.12,F.GELB,-.75,.82,.34); scheibe(b,.14,.18,F.DUNKEL,-.75,.82,.35); b.klotz(.09,.09,.22,F.DUNKEL,-.6,.95,.45,G);
        /* Klötze zum Heben */
        b.klotz(.42,.4,.42,F.GELB,.35,.44,.45,{ ry:.4 }); b.klotz(.36,.34,.36,F.GRUEN,1.0,.41,.3,{ ry:-.3 }); b.klotz(.34,.32,.34,F.LILA,.75,.4,-.45,{ ry:.2 });
      });
      const arm=K.beweglich(g,-.75,3.0,0);
      K.koerper(arm,b=>{
        b.klotz(.58,.46,.58,F.WEISS,0,0,0,{ raster:.3 }); b.klotz(.36,.22,.05,F.HELLBLAU,0,.02,.31,G); b.klotz(.66,.1,.66,F.ROT,0,.29,0,G);
        b.klotz(2.5,.18,.22,F.ROT,.85,.06,0,{ raster:.3 }); [.5,.95,1.4].forEach(x=>b.klotz(.2,.19,.24,F.WEISS,x,.06,0,G));
        b.klotz(.55,.4,.4,F.GRAU2,-.7,-.02,0,G); b.klotz(.24,.22,.26,F.DUNKEL,1.8,-.08,0,G);
      });
      const seil=K.beweglich(arm,1.8,-.15,0);
      K.koerper(seil,b=>{ b.klotz(.05,.8,.05,F.SCHWARZ,0,-.4,0,G); b.klotz(.18,.16,.14,F.GELB,0,-.86,0,G); b.klotz(.07,.14,.07,F.GRAU2,0,-.99,0,G);
        [-1,1].forEach(s=>b.klotz(.04,.4,.04,F.SCHWARZ,s*.12,-1.2,0,{ rz:s*.65, glatt:true }));
        b.klotz(.62,.48,.55,F.BLAU,0,-1.58,0,{ raster:.62 }); [-.15,.15].forEach(x=>b.klotz(.18,.08,.18,0x78aef4,x,-1.31,.08,G)); });
      k.anim.push(t=>{ arm.rotation.y=Math.sin(t*.5)*.28; seil.rotation.z=Math.sin(t*1.4)*.07; }); } },
  { x:6.2, z:3.8, steh:[6.0,5.9], kasten:[3.3,1.9], treffer:[3.2,1.7,1.8], baue(g){ /* 3 drei Farbeimer: rot, gelb, blau */
      K.koerper(g,b=>{
        [[-1.05,0,F.ROT,1],[0,-.22,F.GELB,1.1],[1.08,.05,F.BLAU,1]].forEach(([x,z,c,s],i)=>{
          const h=.95*s, d=.9;
          topf(b,d,h,0xc4ccd8,x,h/2,z); [.1,h-.06].forEach(y=>topf(b,d+.07,.09,0x98a0b0,x,y,z));
          topf(b,d+.02,h*.38,c,x,h*.48,z);
          topf(b,d-.14,.06,c,x,h+.015,z);
          /* Farbnasen am Rand */
          [[-.2,.3],[.05,.18],[.22,.42]].forEach(([a,l])=>b.klotz(.12,l,.06,c,x+a,h+.01-l/2,z+d/2+.025,G)); b.klotz(.5,.09,.14,c,x,h,z+d/2-.04,G);
          /* Henkel */
          [-1,1].forEach(v=>{ b.klotz(.14,.14,.14,0x6a7080,x+v*(d/2+.02),h-.14,z,G); b.klotz(.06,.46,.06,0x6a7080,x+v*.39,h+.12,z-.06,{ rz:v*.45, glatt:true }); });
          b.klotz(.6,.06,.06,0x6a7080,x,h+.33,z-.06,G); b.klotz(.28,.11,.11,F.HOLZ,x,h+.33,z-.06,G);
        });
        /* flacher Pinsel liegt über dem gelben Eimer */
        b.klotz(.5,.09,.14,F.HELLHOLZ,-.2,1.5,.02,{ ry:.5, glatt:true }); b.klotz(.16,.11,.3,0xb8c0cc,.12,1.5,-.15,{ ry:.5, glatt:true }); b.klotz(.24,.1,.28,F.GRUEN,.3,1.5,-.25,{ ry:.5, glatt:true });
        b.klotz(.7,.02,.26,F.ROT,-1.05,.012,.68,G); b.klotz(.34,.02,.24,F.ROT,-.85,.014,.84,G); b.klotz(.5,.02,.24,F.BLAU,1.2,.012,.68,G); b.klotz(.16,.02,.16,F.BLAU,.72,.012,.82,G);
      }); } },
  { x:-5.2, z:4.2, steh:[-5.2,6.3], kasten:[3.9,1.8], treffer:[3.4,2.0,1.6], baue(g){ /* 4 Schubkarre, von der Seite: Rad links, Griffe rechts */
      K.koerper(g,b=>{
        /* Rad mit Gabel */
        scheibe(b,.88,.28,F.DUNKEL,-1.15,.43,0); scheibe(b,.42,.34,F.GRAU,-1.15,.43,0); scheibe(b,.16,.4,F.ROT,-1.15,.43,0);
        [-.28,.28].forEach(z=>b.klotz(.85,.1,.09,F.GRAU2,-.84,.62,z,{ rz:.42, glatt:true }));
        /* Wanne: nach oben breiter, vorn schräg */
        b.klotz(1.1,.22,.74,TUERKIS2,.05,.76,0,{ raster:.3 }); b.klotz(1.5,.24,.94,F.TUERKIS,-.03,.99,0,{ raster:.3 }); b.klotz(1.9,.26,1.14,F.TUERKIS,-.1,1.24,0,{ raster:.3 });
        [-1,1].forEach(s=>b.klotz(2.16,.12,.14,F.ROT,-.1,1.42,s*.6,G)); [-1.17,.97].forEach(x=>b.klotz(.14,.12,1.34,F.ROT,x,1.42,0,G));
        b.klotz(1.9,.1,1.06,F.SAND,-.1,1.39,0,{ raster:.2 }); b.klotz(1.2,.16,.7,0xf0d498,-.2,1.5,0,{ raster:.2 });
        b.klotz(.46,.4,.42,F.ROT,-.55,1.7,.05,{ ry:.4, rz:.18 }); b.klotz(.4,.38,.4,F.GELB,.05,1.74,-.15,{ ry:-.5 }); b.klotz(.42,.36,.4,F.LILA,.55,1.64,.12,{ ry:.2, rz:-.2 });
        /* Holme mit Griffen und zwei Stützen */
        [-.46,.46].forEach(z=>{ b.klotz(2.3,.13,.13,F.GRAU2,.5,.78,z,{ rz:.16, glatt:true }); b.klotz(.45,.17,.17,F.ROT,1.72,.98,z,{ rz:.16, glatt:true });
          b.klotz(.14,.78,.14,F.GRAU2,.65,.39,z); b.klotz(.34,.1,.18,F.DUNKEL,.65,.05,z,G); });
        b.klotz(.12,.1,.9,F.GRAU2,.65,.24,0,G);
      }); } },
  { x:-8.2, z:HINTEN, wand:'hinten', steh:[-8.2,-11.4], kasten:[3.8,.9], treffer:[3.7,2.8,.8], trefferY:1.4, baue(g){ /* 5 großer blauer Bauplan an der Wand */
      K.koerper(g,b=>{
        b.klotz(3.6,2.6,.14,F.HOLZ2,0,2.85,.12,{ raster:.4 }); b.klotz(3.28,2.28,.08,PLAN,0,2.85,.21,{ raster:.55, jitter:.02 });
        for(let i=-3;i<=3;i++) b.klotz(.02,2.24,.02,0x5a8ee0,i*.46,2.85,.255,G); for(let j=-2;j<=2;j++) b.klotz(3.24,.02,.02,0x5a8ee0,0,2.85+j*.46,.256,G);
        const W=0xf4fbff;
        /* Haus */
        b.pixel('.....w.....|....w.w....|...w...w...|..w.....w..|.w.......w.|wwwwwwwwwww|.w.......w.|.w.www...w.|.w.w.w.w.w.|.w.www...w.|.w.......w.|.w...ww..w.|.w...ww..w.|.wwwwwwwww.',.13,{ w:W },-.55,1.9,.27,.03,{ glatt:true, jitter:0 });
        /* Turm und Maßlinien */
        b.pixel('www|w.w|www|w.w|www|w.w|www|w.w|www',.13,{ w:W },1.05,2.25,.27,.03,{ glatt:true, jitter:0 });
        b.klotz(1.5,.04,.03,F.GELB,-.55,1.8,.27,G); [-1.28,.18].forEach(x=>b.klotz(.04,.18,.03,F.GELB,x,1.8,.27,G)); b.klotz(.04,1.17,.03,F.GELB,1.45,2.83,.27,G); [2.25,3.41].forEach(y=>b.klotz(.18,.04,.03,F.GELB,1.45,y,.27,G));
        /* vier Pinnnadeln und eingerollter unterer Rand */
        [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.2,.2,.14,s*t>0?F.ROT:F.GELB,s*1.52,2.85+t*1.02,.3,G)));
        b.klotz(3.4,.22,.24,0x5a90e4,0,1.62,.32,G); [-1,1].forEach(s=>b.klotz(.1,.28,.3,W,s*1.72,1.62,.32,G));
      },{ schatten:false }); } },
  { x:8.8, z:HINTEN, wand:'hinten', steh:[8.8,-11.4], kasten:[4.1,.9], treffer:[4.0,2.9,.8], trefferY:1.35, baue(g){ /* 6 Werkzeugwand: Lochbrett mit Lineal, Maßband, Wasserwaage, Schlüsseln, Helm */
      K.koerper(g,b=>{
        b.klotz(4.0,2.7,.14,0xb87c40,0,2.85,.12,{ raster:.45 }); [-1,1].forEach(s=>{ b.klotz(4.2,.14,.24,F.HOLZ3,0,2.85+s*1.4,.16,G); b.klotz(.14,2.9,.24,F.HOLZ3,s*2.05,2.85,.16,G); });
        for(let i=0;i<11;i++) for(let j=0;j<7;j++) b.klotz(.07,.07,.03,0x6a4220,-1.75+i*.35,1.8+j*.35,.2,G);
        /* großes gelbes Lineal */
        b.klotz(3.1,.34,.1,F.GELB,0,1.85,.28,G); for(let i=0;i<=15;i++) b.klotz(.035,i%5?.12:.2,.03,F.SCHWARZ,-1.45+i*.193,i%5?1.96:1.92,.34,G);
        /* Wasserwaage */
        b.klotz(1.9,.3,.14,F.ROT,-.85,3.85,.3,G); [-1.8,.1].forEach(x=>b.klotz(.08,.34,.16,F.DUNKEL,x,3.85,.3,G)); b.klotz(.46,.17,.05,0xc8f870,-.85,3.85,.39,G); b.klotz(.1,.13,.03,0xffffff,-.85,3.85,.42,G);
        /* zwei Schraubenschlüssel */
        [[-1.55,.95],[-1.0,.72]].forEach(([x,l])=>{ const y=3.3; b.klotz(.34,.28,.1,0xdce4ee,x,y,.28,G); b.klotz(.12,.16,.12,0x6a4220,x,y+.09,.29,G); b.klotz(.15,l,.09,0xdce4ee,x,y-.1-l/2,.28,G); b.klotz(.28,.24,.1,0xdce4ee,x,y-.18-l,.28,G); b.klotz(.1,.1,.12,0x6a4220,x,y-.18-l,.29,G); });
        /* Winkellineal */
        b.klotz(.2,1.1,.09,F.BLAU,-.35,2.85,.28,G); b.klotz(.8,.2,.09,F.BLAU,-.05,2.4,.28,G); for(let i=0;i<4;i++) b.klotz(.09,.03,.03,0xffffff,-.3,2.65+i*.22,.34,G);
        /* Maßband */
        scheibe(b,.68,.22,F.ORANGE,.65,2.9,.33); scheibe(b,.3,.26,F.DUNKEL,.65,2.9,.34); b.klotz(.14,.42,.05,0xfff0a0,.9,2.42,.3,G); b.klotz(.18,.07,.08,F.GRAU2,.9,2.2,.3,G);
        /* Farbrolle */
        b.klotz(.62,.3,.24,F.GRUEN,.62,3.9,.34,G); [-1,1].forEach(s=>b.klotz(.07,.34,.26,F.WEISS,.62+s*.34,3.9,.34,G)); b.klotz(.06,.35,.06,F.GRAU,1.03,3.73,.3,G); b.klotz(.42,.06,.06,F.GRAU,.84,3.55,.3,G); b.klotz(.12,.34,.1,F.ROT,.66,3.4,.3,G);
        /* gelber Bauhelm am Haken */
        b.klotz(.1,.18,.2,F.GRAU2,1.52,3.85,.28,G); b.klotz(.72,.2,.46,KRANGELB,1.52,3.62,.4,G); b.klotz(.54,.18,.4,KRANGELB,1.52,3.8,.4,G); b.klotz(.96,.1,.56,KRANGELB2,1.52,3.5,.42,G); b.klotz(.12,.12,.44,0xffe480,1.52,3.92,.4,G);
        /* Arbeitshandschuh */
        b.klotz(.46,.5,.12,F.BLAU2,1.55,2.55,.28,G); [-.16,0,.16].forEach(a=>b.klotz(.12,.3,.1,F.BLAU2,1.55+a,2.18,.28,G)); b.klotz(.13,.28,.1,F.BLAU2,1.24,2.5,.28,{ rz:-.7, glatt:true }); b.klotz(.5,.16,.14,F.ROT,1.55,2.85,.28,G);
      },{ schatten:false }); } },
  { x:-13.0, z:2.4, steh:[-12.8,4.6], r:1.25, treffer:[2.4,3.5,2.0], baue(g){ /* 7 Turm aus großen bunten Blöcken */
      K.koerper(g,b=>{
        const stein=(x,y,z,s,c,ry)=>{ b.klotz(s,s*.86,s,c,x,y+s*.43,z,{ ry:ry, raster:s }); b.klotz(s*.34,s*.34,.05,0xfff6e0,x+Math.sin(ry)*(s/2+.02),y+s*.43,z+Math.cos(ry)*(s/2+.02),{ ry:ry, glatt:true }); };
        stein(-.72,0,.05,.74,F.BLAU,.08); stein(.06,0,-.05,.76,F.GRUEN,-.05); stein(.85,0,.08,.7,F.ROT,.16);
        stein(-.36,.64,0,.72,F.GELB,-.1); stein(.45,.65,.02,.68,F.LILA,.12);
        stein(.02,1.26,0,.7,F.ORANGE,.06); stein(-.04,1.86,.02,.62,F.TUERKIS,-.18); stein(.04,2.4,0,.56,F.ROSA,.14); stein(0,2.88,0,.46,F.GELB,-.08);
        b.klotz(.4,.36,.4,F.ROT,-.85,.18,.75,{ ry:.6 }); b.klotz(.34,.3,.34,F.GELB,.8,.15,.78,{ ry:-.35 });
      }); } },
  { x:13.2, z:1.0, steh:[13.0,3.2], kasten:[2.8,2.0], treffer:[2.7,2.2,1.9], baue(g){ /* 8 grüne Kiste voller Klötzchen, Deckel offen */
      K.koerper(g,b=>{
        b.klotz(2.3,.14,1.45,0x2e6a28,0,.1,0,{ raster:.35 });
        [-1,1].forEach(s=>{ b.klotz(2.3,.95,.16,0x5ab048,0,.62,s*.66,{ raster:.32 }); b.klotz(.16,.95,1.2,0x4a9a3c,s*1.07,.62,0,{ raster:.32 }); b.klotz(2.46,.16,.24,0x2e6a28,0,1.12,s*.67,G); b.klotz(.24,.16,1.2,0x2e6a28,s*1.09,1.12,0,G);
          [-1,1].forEach(t=>b.klotz(.24,1.1,.24,0x2e6a28,s*1.08,.58,t*.66,G)); b.klotz(.12,.14,.5,F.DUNKEL,s*1.2,.78,0,G); });
        /* Bild auf der Vorderseite: drei Klötzchen auf weißem Feld */
        b.klotz(.95,.62,.05,F.WEISS,0,.6,.76,G); [[-.2,.48,F.ROT],[.2,.48,F.BLAU],[0,.76,F.GELB]].forEach(([x,y,c])=>b.klotz(.28,.26,.05,c,x,y,.79,G));
        /* aufgeklappter Deckel hinten */
        b.klotz(2.4,1.0,.14,0x5ab048,0,1.55,-.94,{ rx:-.36, raster:.32 }); [-.7,.7].forEach(x=>b.klotz(.18,1.04,.18,0x2e6a28,x,1.55,-.93,{ rx:-.36, glatt:true }));
        b.klotz(1.95,.55,1.15,0x2e6a28,0,.5,0,{ raster:.35 });
        [[-.72,.98,.3],[-.25,1.02,.32],[.25,.98,.28],[.72,1.0,.3],[-.7,1.0,-.28],[-.2,1.04,-.3],[.3,1.0,-.26],[.74,1.02,-.3],[-.48,1.32,0],[.05,1.36,.05],[.55,1.3,-.02],[-.15,1.65,-.05],[.35,1.58,.15]].forEach(([x,y,z],i)=>b.klotz(.4,.38,.4,BUNT[(i*5)%6],x,y,z,{ ry:(i%5-2)*.3, rz:(i%3-1)*.18, glatt:true }));
        b.klotz(.34,.32,.34,F.ROT,-1.0,.16,1.02,{ ry:.5 }); b.klotz(.3,.28,.3,F.GELB,1.1,.14,1.0,{ ry:-.4 });
      }); } },
  Object.assign({ x:-11.6, z:-6.0, steh:[-11.2,-4.0] },KLOTZ.NEU.bauroboter),
  Object.assign({ x:12.0, z:-6.6, steh:[11.6,-4.4] },KLOTZ.NEU.zementmischer)
];

function baue(k){
  const sc=k.scene;
  const h=K.huelle(k,{ B,T,H, hintergrund:0xbfe4f8, himmelLicht:0xffffff, grund:0x9a8a78, staerke:.74, sonne:0xfff2d8, sonneStaerke:.38, sonnenStand:[7,26,12],
    wand:MIX.werkstatt, relief:.05, sockel:TUERKIS2, krone:[0xfff6dc,0xf2e2b8], oeffnung:{x:0,b:4.2,h:4},
    boden:{ farben:MIX.werkboden, weit:{ hinten:6.6 }, aussen:0x8a94a8 } });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueAusgang(k,sc,hinten);
  rueckwand(k,hinten);
  seitenwand(k,links,-1); seitenwand(k,rechts,1);
  foerderband(k,sc);

  /* ---------- Bodenschmuck: flache Einlagen, Späne und kleine Klötzchen ---------- */
  K.koerper(sc,b=>{
    /* gelb-türkiser Rahmen um den Bauplatz in der Mitte */
    [[-3.4,-.6,3.4,-.36],[-3.4,2.76,3.4,3.0],[-3.4,-.36,-3.16,2.76],[3.16,-.36,3.4,2.76]].forEach(([a,c,d,e])=>b.platte(a,c,d,e,.012,F.TUERKIS,{ raster:.6 }));
    for(let i=0;i<10;i++) for(let j=0;j<5;j++) if((i+j)%2===0) b.platte(-3.0+i*.6,-.2+j*.56,-2.4+i*.6,.36+j*.56,.01,0xd8dce6,G);
    /* Fahrspur zum Ausgang */
    for(let z=-11.6;z<-1.2;z+=1.3) [-2.0,2.0].forEach(x=>b.platte(x-.09,z,x+.09,z+.75,.012,KRANGELB,G));
    /* Sägespäne und winzige Klötzchen */
    for(let i=0;i<150;i++){ const x=-17+zufall()*34, z=-12.5+zufall()*25.5, s=.07+zufall()*.08; b.platte(x,z,x+s*1.5,z+s,.016+(i%3)*.001,i%2?0xe8c890:0xc89c64,G); }
    [[-15.2,-11.6],[-10,-10.2],[-2.9,-9.6],[4.9,-10.6],[15.6,-9.6],[-15.8,1.0],[-10.6,6.6],[-2.2,6.4],[3.2,5.2],[9.2,6.2],[15.8,3.8],[-7.6,10.6],[1.2,11.8],[7.4,10.8]].forEach(([x,z],i)=>{ [[0,0],[.34,.18],[.1,.4]].forEach(([a,c],j)=>b.klotz(.17,.14,.17,BUNT[(i+j*2)%6],x+a,.07,z+c,{ ry:i+j, glatt:true })); });
  });

  /* ---------- Ausstattung am Rand ---------- */
  K.koerper(sc,b=>{
    modelltisch(k,b,16.8,-3.4,1); modelltisch(k,b,16.8,5.2,0); modelltisch(k,b,-16.8,4.6,3);
    bretter(k,b,-15.6,11.6,false); bretter(k,b,5.6,12.2,false); bretter(k,b,16.8,10.0,true); bretter(k,b,-15.4,-11.9,false);
    pflanze(k,b,-4.0,-12.4,.95); pflanze(k,b,5.6,-12.4,.9); pflanze(k,b,16.6,-12.0,1.15); pflanze(k,b,-11.6,-12.4,.85); pflanze(k,b,-16.8,6.5,.9); pflanze(k,b,-3.4,12.3,.85); pflanze(k,b,12.0,12.2,.95); pflanze(k,b,16.8,12.4,1.0);
    trommel(k,b,-11.4,11.6); trommel(k,b,14.4,9.0); trommel(k,b,15.4,-11.6);
    /* zwei Holzböcke mit einem Brett (neue Brücke in Arbeit) */
    [-1.3,1.3].forEach(a=>{ const x=1.0+a, z=11.4; b.klotz(.2,.18,1.1,F.HOLZ,x,.72,z); [-1,1].forEach(s=>b.klotz(.14,.78,.14,F.HOLZ2,x,.36,z+s*.5,{ rx:-s*.25 })); });
    b.klotz(3.6,.14,.6,F.HELLHOLZ,1.0,.88,11.4,{ raster:.4 }); [-.5,.5].forEach(a=>b.klotz(.22,.2,.22,F.ORANGE,1.0+a,1.05,11.4,G)); k.kasten(1.0,11.4,3.7,1.3);
  });

  /* Wandregale sind fest */
  k.kasten(-17.5,9,1.0,3.8); k.kasten(17.5,-6.6,1.0,3.8); k.kasten(17.5,10.1,1.0,3.8);

  /* ---------- blaue Lampen an Wandarmen (blenden mit ihrer Wand aus) ---------- */
  [-12.0,-5.4,6.3,12.8].forEach(x=>wandlampe(hinten,x,4.2,-12.4,x,-13.4));
  wandlampe(links,-16.8,4.2,-1.0,-17.9,-1.0); wandlampe(rechts,16.8,4.2,.3,17.9,.3);

  /* ---------- Leben: Hühner, Katze, tanzender Holzstaub, Wolken ---------- */
  const h1=K.huhn(k,sc,0,0,0,.85,{ laeuft:true }); laeufer(k,h1.g,[[-9.4,7.6],[-6.6,8.8],[-3.2,8.0],[-5.4,10.0],[-8.6,9.6]],.9,0,11);
  const h2=K.huhn(k,sc,0,0,0,.7,{ farbe:0xd89a56, laeuft:true, phase:2.2 }); laeufer(k,h2.g,[[8.6,-9.6],[11.0,-9.4],[13.6,-9.0],[10.4,-8.8]],.8,2,12);
  katze(k,[[1.6,7.0],[7.4,7.6],[10.4,10.2],[4.4,9.6]],1.2);
  const staub=[K.beweglich(sc,0,0,0),K.beweglich(sc,0,0,0)];
  staub.forEach((g,n)=>{ K.koerper(g,b=>{ for(let i=0;i<14;i++){ const x=(i%2?1:-1)*(9+zufall()*8), z=-12+zufall()*18; b.klotz(.05,.05,.05,0xfff2b0,x,1.4+zufall()*3,z,G); } },{ leuchtet:true });
    k.anim.push(t=>{ g.position.y=Math.sin(t*.6+n*3)*.25; g.position.x=Math.sin(t*.25+n*2)*.35; }); });
  K.wolken(k,sc,[[-15,7.2,-20,1.1],[-6,8.0,-22,.9],[9,7.4,-21,1.2],[18,8.2,-19,.8],[-23,6.5,-5,1.0],[23,6.8,2,1.1]],{ drift:1.6 });

  /* ---------- Licht ---------- */
  flacker(k,-11.0,4.6,-8.6,0xd8ecff,.26,14);
  flacker(k,11.0,4.6,-8.6,0xd8ecff,.26,14);
  flacker(k,0,5.0,-8.0,0xfff0c8,.22,12);
  flacker(k,0,5.6,5.0,0xfff4e0,.2,18);

  return { tuer, start:[0,-2] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-13.6,-9.6],[-9.6,-8.8],[-4.6,-8.8],[5.0,-9.0],[9.4,-7.2],[14.8,-8.6],[-14.2,-1.8],[-8.8,-2.2],[-2.8,-6.4],[3.0,-6.8],[9.4,-1.6],[14.6,-1.0],[-9.4,3.4],[-1.4,4.8],[10.0,3.0],[-14.2,7.4],[-8.0,12.0],[-1.0,9.0],[9.4,8.2],[8.8,12.0]];

return { titel:'Die Bauwerkstatt', breite:36, tiefe:27, himmel:0xbfe4f8, baue, gegenstaende, verstecke };
})();

/* Raum 4: Die Blumenwiese, draußen und sonnig. Hinten eine niedrige Hecke mit Lücke, dahinter eine tiefe Schlucht mit Wasser.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Brunnen) und 10 (Picknickdecke) aus KLOTZ.NEU.
   Ausgang: die Block-Brücke baut sich nach dem Schloss Stück für Stück auf, die Figur geht hinüber. */
RAEUME3D.kloetzchenwelt[3] = (function(){
const K=KLOTZ, F=K.F, MIX=K.MIX;
const B=36, T=27;
const EX=7;                              /* Mitte der Brücke */
const HZ=-13.75;                         /* Hecke hinten */
const SV=-14, SH=-20.2;                  /* vordere und hintere Kante der Schlucht */
const WY=-2.2;                           /* Wasserhöhe */
const HIMMEL=0x94d4ff;
const BLUETEN=[F.ROT,F.GELB,F.LILA,F.WEISS,F.ROSA,F.ORANGE,0x6a9af8];
const HECKE=[0x3a9a50,0x2e8a44,0x46a85c,0x379248];
const FERNLAUB=[0x2f8a58,0x3a9a64,0x277a4c];
const zw=(a,c)=>a+zufall()*(c-a);

/* ---------- Wiese, Weg, Erdkanten ---------- */
function wiese(k){
  const sc=k.scene;
  K.huelle(k,{ B, T, hintergrund:HIMMEL, himmelLicht:0xf4faff, grund:0x8a9a5a, staerke:.8, sonne:0xfff0c8, sonneStaerke:.5, sonnenStand:[-10,26,9], waende:false,
    boden:{ farben:MIX.gras, weit:{ links:40, rechts:40, vorn:40, hinten:46 }, loecher:[[-62,SH,62,SV]], erde:F.ERDE, aussen:0x2a78bc, tief:-5 } });
  /* Sandweg vom Platz zur Brücke und auf der anderen Seite weiter */
  K.koerper(sc,b=>{
    const weg=(P,br)=>{ for(let i=0;i<P.length-1;i++){ const a=P[i], c=P[i+1], l=Math.hypot(c[0]-a[0],c[1]-a[1]), n=Math.max(1,Math.round(l/.8));
        for(let j=0;j<n;j++){ const u=(j+.5)/n, x=a[0]+(c[0]-a[0])*u, z=a[1]+(c[1]-a[1])*u;
          for(let q=0;q<3;q++){ const v=(q-1)*br/3+zw(-.08,.08), px=x+v, y=.012+((i+j+q)%4)*.002; b.platte(px-br/6-.02,z-.44,px+br/6+.02,z+.44,y,K.wahl([0xe0c488,0xd4b678,0xe8d098]),{ raster:.45 }); } } } };
    weg([[.8,4],[1.2,.5],[2.4,-3],[5.4,-6.6],[EX,-9.5],[EX,SV+.55]],2.3);
    weg([[EX,SH-.5],[EX,-23.5],[EX+2.5,-28],[EX+1.5,-34],[EX-3,-41],[EX-5,-50]],2.3);
  },{ schatten:false });
}

/* ---------- die Schlucht: Klotzwände, Wasser, Wasserfall ---------- */
function schlucht(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  K.koerper(g,b=>{
    [[SH-.27,1],[SV+.27,-1]].forEach(([z,innen])=>{
      [[-58,-24,2],[-24,24,1.1],[24,58,2]].forEach(([a,e,r])=>{
        K.mauer(b,a,e,-4.6,-.75,z,{ farben:MIX.fels, raster:r, relief:.5, innen });
        K.mauer(b,a,e,-.75,-.02,z,{ farben:[F.ERDE,0x9a6a3a,0x7a4a28], raster:r*.75, relief:.3, innen }); }); });
    /* Grasbüschel hängen über die hintere Kante */
    for(let x=-40;x<40;x+=zw(.7,1.8)){ if(Math.abs(x-EX)<2.8||Math.abs(x+12)<1.6) continue; const h=zw(.14,.5); b.klotz(zw(.35,.8),h,.2,K.wahl(MIX.gras),x,-h/2-.005,SH+.08,{ glatt:true }); }
    /* Felsstufen am Fuß */
    for(let x=-34;x<34;x+=zw(1.6,3.4)){ const w=zw(.6,1.4), h=zw(.4,1.1); b.klotz(w,h,zw(.6,1.1),K.wahl(MIX.fels),x,WY-.2+h/2,SH+zw(.45,.9),{ ry:zw(0,.8) }); }
  },{ schatten:false });
  /* Steinkante am hinteren Rand; an der Brückenstelle bricht der Weg an beiden Seiten ab */
  K.koerper(g,b=>{
    for(let x=-30;x<30;x+=.9){ if(Math.abs(x+.45-EX)<2.1||Math.abs(x+.45+12)<1.4||Math.abs(x+.45-22)<1.1) continue; b.klotz(.84,.09,.34,K.wahl([0xb8b0c0,0xa49cac,0xcac2d0]),x+.45,.025,SH-.15,{ glatt:true }); }
    [SH-.42,SV+.46].forEach(z=>{ for(let i=0;i<6;i++) b.klotz(.46,.14,.3,i%2?0x6a6272:0x827a8a,EX-1.25+i*.5,.07,z+((i*3)%4-1.5)*.05,{ ry:((i%3)-1)*.18, glatt:true }); });
    /* abgebrochene Wegstücke hängen an der hinteren Wand */
    [[-1.05,.55,.5],[-.5,.95,.5],[.08,.45,.55],[.62,.75,.45],[1.1,.4,.4]].forEach(([x,h,w],i)=>{ b.klotz(w,h,.22,i%2?0xe0c488:0xc8a86c,EX+x,-h/2+.02,SH+.12,{ rz:((i%3)-1)*.12, glatt:true }); });
    [[-.7,-1.35],[.4,-1.1],[.95,-1.6]].forEach(([x,y],i)=>b.klotz(.26,.24,.2,0xc8a86c,EX+x,y,SH+.24,{ rz:.5+i*.6, glatt:true }));
  },{ schatten:false });
  /* Wasser */
  K.koerper(g,b=>{ for(let x=-58;x<58;x+=1.45) for(let j=0;j<4;j++) b.platte(x,SH+j*(SV-SH)/4,x+1.45,SH+(j+1)*(SV-SH)/4,WY,K.wahl([0x2a8ad8,0x349ae4,0x2e92dc,0x44aaea]),{ raster:.7 }); },{ leuchtet:true });
  const glitz=K.beweglich(g,0,WY+.03,0);
  K.koerper(glitz,b=>{ for(let x=-30;x<30;x+=1.7){ const z=zw(SH+.7,SV-.8); b.platte(x,z,x+zw(.4,.9),z+.12,0,0xd8f6ff,{ glatt:true }); } },{ leuchtet:true });
  /* Bach auf der anderen Seite mit Wasserfall (zweiter kleiner weit rechts) */
  K.koerper(g,b=>{ [[-12,2.0],[22,1.4]].forEach(([x,br])=>{ for(let i=0;i<22;i++){ const z=SH-i*1.1, v=Math.sin(i*.55)*(i*.07); b.platte(x+v-br/2,z-1.12,x+v+br/2,z,.016+(i%2)*.002,K.wahl([0x4ab0f0,0x5abcf4,0x3aa4e8]),{ raster:.55 }); }
      for(let i=0;i<4;i++) b.klotz(br/4-.02,-WY,.16,i%2?0x8ad4fc:0x6ac4f8,x-br/2+(i+.5)*br/4,WY/2,SH+.1+(i%2)*.05,{ raster:.5 });
      [-1,1].forEach(s=>b.klotz(.35,.28,.5,F.WEISS,x+s*br*.3,WY+.1,SH+.35,{ ry:s*.4, glatt:true })); b.klotz(br*.7,.2,.55,0xdcf4ff,x,WY+.08,SH+.5,{ glatt:true }); }); },{ leuchtet:true });
  const fall=[0,1,2].map(i=>{ const q=K.beweglich(g,0,0,0); K.koerper(q,b=>{ [[-12,2.0],[22,1.4]].forEach(([x,br])=>{ [-.3,.12,.34].forEach((v,j)=>b.klotz(.12,.34,.04,F.WEISS,x+v*br,-.25*j,SH+.24,{ glatt:true })); }); },{ leuchtet:true }); return q; });
  k.anim.push(t=>{ glitz.position.x=Math.sin(t*.7)*.5; fall.forEach((q,i)=>{ const u=(t*.9+i/3)%1; q.position.y=-.1-u*(-WY-.5); }); });
}

/* ---------- Hecken: hinten mit Lücke, an den Seiten ---------- */
function hecken(k){
  const hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts');
  const tupfen=(b,x,y,z)=>b.klotz(.17,.13,.17,K.wahl([F.ROSA,F.WEISS,F.GELB]),x,y,z,{ glatt:true });
  const hb=K.bau();
  /* vor der Schlucht (x 1 bis 13) nur ganz niedrig, damit man hineinsehen kann */
  [[-18.6,1,.84],[1,EX-2.55,.28],[EX+2.55,13,.28],[13,18.6,.84]].forEach(([a,e,H])=>{ const hoch=H>.5;
    K.mauer(hb,a,e,0,H,HZ,{ farben:HECKE, raster:hoch?.55:.3, relief:hoch?.14:.08, innen:1, d:hoch?.5:.4 });
    for(let x=a+.3;x<e-.2;x+=zw(.35,.75)){ const h=hoch?zw(.1,.24):zw(.04,.09); hb.klotz(zw(.3,.5),h,hoch?.4:.3,K.wahl(HECKE),x,H+h/2,HZ+zw(-.05,.05),{ glatt:true }); if(zufall()<.4) tupfen(hb,x,zw(.3,.9)*H,HZ+(hoch?.34:.24)); }
    k.kasten((a+e)/2,HZ,e-a,.6); });
  hb.fertig(hinten);
  [[links,-1],[rechts,1]].forEach(([w,s])=>{ const b=K.bau(), x=s*(B/2+.3);
    [[-13.5,-4.6],[-3.4,5.4],[6.6,13]].forEach(([a,e])=>{ K.mauer(b,a,e,0,.8,x,{ achse:'z', farben:HECKE, raster:.65, relief:.15, innen:-s });
      for(let z=a+.3;z<e-.2;z+=zw(.5,1.1)){ const h=zw(.1,.26); b.klotz(.4,h,zw(.3,.55),K.wahl(HECKE),x,.8+h/2,z,{ glatt:true }); if(zufall()<.4) tupfen(b,x-s*.36,zw(.3,.7),z); } });
    b.fertig(w,{ schatten:false }); });
}

/* ---------- Ausgang: Block-Brücke ---------- */
function bruecke(k){
  const sc=k.scene;
  /* zwei Steinpfosten markieren die Stelle, rechts hängt das große Zahlenschloss; kleine Sockel drüben */
  const fest=gruppe(sc,0,0,0);
  K.koerper(fest,b=>{
    [-1,1].forEach(s=>{ const x=EX+s*2.15;
      b.klotz(1.0,.3,1.0,F.GRAU2,x,.15,HZ+.15); for(let j=0;j<4;j++) b.klotz(.74,.46,.74,j%2?0xb0a8b4:0xc8c0d0,x,.53+j*.46,HZ+.15); b.klotz(1.0,.2,1.0,F.GRAU2,x,2.23,HZ+.15); b.klotz(.55,.34,.55,F.TUERKIS,x,2.5,HZ+.15); b.klotz(.26,.2,.26,F.GOLD,x,2.77,HZ+.15,{ glatt:true });
      b.klotz(.74,.5,.74,0xb0a8b4,x,.25,SH-.5); b.klotz(.9,.16,.9,F.GRAU2,x,.58,SH-.5); b.klotz(.34,.26,.34,F.TUERKIS,x,.79,SH-.5);
      /* Widerlager an beiden Kanten */
      [SV-.12,SH+.12].forEach(z=>b.klotz(.6,1.5,.34,0x9a8a9a,EX+s*1.5,-1.1,z,{ raster:.4 })); });
    /* Halter für das Schloss */
    b.klotz(1.5,1.55,.14,F.HOLZ2,EX+2.45,1.35,-13.14,{ raster:.35 }); b.klotz(1.66,.14,.2,F.HOLZ3,EX+2.45,2.18,-13.14);
  });
  K.schloss(fest,EX+2.45,1.22,-12.9,1.15);
  k.kreis(EX+2.45,-13.2,.55); k.kreis(EX-2.15,-13.5,.5);
  /* Schranke aus bunten Klötzen, versinkt beim Öffnen */
  const schranke=K.beweglich(sc,EX,0,HZ+.1);
  K.koerper(schranke,b=>{ [-1.4,1.4].forEach(x=>b.klotz(.24,.56,.24,F.HOLZ2,x,.28,0)); for(let i=0;i<8;i++) b.klotz(.38,.15,.16,i%2?F.WEISS:F.ROT,-1.33+i*.38,.45,.06,{ glatt:true }); });
  k.kasten(EX,HZ+.1,5.4,.7);
  /* Umriss der fehlenden Brücke */
  const N=8, L=(SV-SH+.3)/N, zi=i=>SV+.15-(i+.5)*L;
  const geist=K.beweglich(sc,EX,0,0);
  K.koerper(geist,b=>{ for(let i=0;i<N;i++) b.klotz(2.9,.08,L-.24,i%2?0xfff09a:0xffffff,0,-.08,zi(i),{ glatt:true, jitter:0 }); },{ leuchtet:true, deckung:.6 });
  /* kräftiger Rand um jedes fehlende Stück */
  K.koerper(geist,b=>{ for(let i=0;i<N;i++){ const z=zi(i); [-1,1].forEach(s=>{ b.klotz(3.2,.1,.09,0xffb000,0,-.04,z+s*(L-.2)/2,{ glatt:true, jitter:0 }); b.klotz(.17,.14,L-.12,0xffb000,s*1.54,-.03,z,{ glatt:true, jitter:0 }); }); } },{ leuchtet:true });
  const farben=[F.ROT,F.ORANGE,F.GELB,F.GRUEN,F.TUERKIS,F.BLAU,F.LILA,F.ROSA];
  const stuecke=farben.map((c,i)=>{ const g=K.beweglich(sc,EX,0,0), z=zi(i);
    const q=gruppe(g,0,0,0);
    K.koerper(q,b=>{ for(let j=0;j<4;j++) b.klotz(.78,.26,L-.01,j%2?F.HELLHOLZ:F.HOLZ,-1.17+j*.78,-.12,z,{ raster:.4 });
      b.klotz(3.2,.3,L-.01,c,0,-.4,z,{ raster:.4 });
      [-1,1].forEach(s=>{ b.klotz(.3,.34,L-.01,c,s*1.68,-.1,z); b.klotz(.18,.5,.18,F.HOLZ2,s*1.68,.3,z,{ glatt:true }); b.klotz(.24,.14,L+.01,c,s*1.68,.6,z); }); });
    g.visible=false; return g; });
  let los=null;
  return ausgang(k,{ name:'Block-Brücke', einfach:'Brücke aus Blöcken', steh:[EX,-11.4], durch:[EX,-20.6], losNach:2.4, warte:.3, blick:{pitch:.75,zoom:1},
    treffer:{x:EX,y:1.1,z:-13.5,b:5.8,h:2.6,t:1.2}, schildOben:[EX,3.1,-13.2], glanz:[EX+2.45,1.35,-12.6],
    bewege:(auf,t)=>{
      schranke.position.y=-Math.min(1,auf*1.15)*.75; schranke.visible=auf<.9; geist.visible=auf<.02;
      if(auf<.02){ los=null; stuecke.forEach(s=>s.visible=false); return; }
      if(los===null) los=t;
      stuecke.forEach((s,i)=>{ const u=Math.max(0,Math.min(1,(t-los-i*.22)/.35)); s.visible=u>0; s.position.y=(1-u)*2.5; });
    } });
}

/* ---------- Gegenstände 1 bis 8 ---------- */
/* kleiner Bienenschwarm als ein Körper, kreist */
function schwarm(g,k,x,y,z,r,n,ph){
  const q=K.beweglich(g,x,y,z);
  K.koerper(q,b=>{ for(let i=0;i<n;i++){ const a=i*6.283/n, px=Math.cos(a)*r, pz=Math.sin(a)*r*.8, py=Math.sin(i*2.4)*.28;
      b.klotz(.16,.14,.14,0xffd028,px,py,pz,{ ry:-a, glatt:true }); b.klotz(.17,.15,.05,0x3a2a30,px,py,pz,{ ry:-a, glatt:true }); b.klotz(.1,.03,.2,0xeaf8ff,px,py+.1,pz,{ ry:-a, glatt:true }); } },{ schatten:false });
  k.anim.push(t=>{ q.rotation.y=t*.9+ph; q.position.y=y+Math.sin(t*2.2+ph)*.1; });
}
/* 1 Bienenstock: gestapelte Holzkästen mit Dach, Flugloch und Landebrett */
function bienenstock(g,k){
  K.koerper(g,b=>{
    [-.75,.75].forEach(x=>[-.55,.55].forEach(z=>b.klotz(.22,.55,.22,F.HOLZ3,x,.27,z))); b.klotz(2.1,.18,1.65,F.HOLZ2,0,.62,0);
    [[1.0,F.WEISS],[1.62,F.GELB],[2.24,F.WEISS]].forEach(([y,c])=>{ b.klotz(1.8,.56,1.35,c,0,y,0,{ raster:.45 }); b.klotz(1.88,.08,1.43,F.HOLZ,0,y+.31,0); b.klotz(.5,.1,.06,F.HOLZ2,0,y+.1,.7,{ glatt:true }); });
    b.klotz(.9,.13,.05,F.SCHWARZ,0,.86,.69,{ glatt:true }); b.klotz(1.2,.09,.5,F.HELLHOLZ,0,.75,.9);
    [[2.72,2.3,1.85],[2.94,1.7,1.7],[3.16,1.05,1.55],[3.36,.4,1.4]].forEach(([y,w,t],i)=>b.klotz(w,.22,t,i%2?0xc83a48:F.ROT,0,y,0,{ raster:.4 }));
    /* Waben-Zeichen */
    b.pixel('.o.o.|ooooo|.o.o.',.11,{ o:0xf0a020 },-.52,2.0,.69,.05,{ glatt:true });
    b.pixel('.k.k.|ykyky|.ykyk',.09,{ k:0x3a2a30, y:0xe89018 },.5,2.05,.7,.05,{ glatt:true });
  });
  schwarm(g,k,0,2.0,.1,1.45,6,0);
}
/* 2 Bienenkorb: runde Kuppel aus Strohringen auf einer Holzbank */
function bienenkorb(g,k){
  K.koerper(g,b=>{
    [-.7,.7].forEach(x=>{ b.klotz(.24,.6,1.2,F.HOLZ3,x,.3,0); }); b.klotz(2.1,.2,1.6,F.HOLZ2,0,.7,0,{ raster:.4 });
    const ring2=(w,h,y,c)=>{ b.klotz(w,h,w*.66,c,0,y,0,{ raster:.22 }); b.klotz(w*.66,h*.99,w,c,0,y,0,{ raster:.22 }); b.klotz(w*.86,h*.98,w*.86,c,0,y,0,{ raster:.22 }); };
    let y=.8; [1.55,1.72,1.7,1.56,1.34,1.06,.72,.38].forEach((w,i)=>{ ring2(w,.2,y+.1,i%2?0xc8862c:0xecae48); b.klotz(w*.5,.045,w*.5,0x8a5a20,0,y+.2,0,{ glatt:true }); y+=.23; });
    b.klotz(.18,.22,.18,0x8a5a28,0,y+.08,0,{ glatt:true });
    b.klotz(.48,.38,.06,F.SCHWARZ,0,1.07,.87,{ glatt:true }); b.klotz(.3,.12,.07,F.SCHWARZ,0,1.3,.87,{ glatt:true }); b.klotz(.66,.08,.34,0x8a5a28,0,.84,.92,{ glatt:true });
  });
  schwarm(g,k,0,2.35,0,1.15,5,2);
}
/* 3 Gießkanne: große blaue Kanne mit Bügel, Griff, Rohr und runder Brause */
function giesskanne(g,k){
  const C=0x2f7ae0, D=0x1f56b0, H=0x6ab0f8;
  K.koerper(g,b=>{
    const x=-.35, rumpf=(w,h,y,c)=>{ b.klotz(w,h,w*.62,c,x,y,0,{ raster:.4 }); b.klotz(w*.78,h*.99,w*.82,c,x,y,0,{ raster:.4 }); };
    rumpf(1.45,.14,.1,D); rumpf(1.35,1.2,.74,C); rumpf(1.43,.14,1.4,H); rumpf(1.43,.1,.5,H);
    b.klotz(.7,.07,.55,0x16386a,x+.12,1.5,0,{ glatt:true });
    /* Bügel oben */
    [-.52,.2].forEach(a=>b.klotz(.16,.55,.2,D,x+a,1.7,0,{ glatt:true })); b.klotz(.9,.18,.22,D,x-.16,2.02,0,{ glatt:true });
    /* Griff hinten */
    b.klotz(.45,.16,.2,D,x-.85,1.28,0,{ glatt:true }); b.klotz(.16,.85,.2,D,x-1.05,.9,0,{ glatt:true }); b.klotz(.45,.16,.2,D,x-.85,.48,0,{ glatt:true });
    /* Ausgießrohr schräg nach oben mit Brause */
    b.klotz(1.35,.28,.28,C,x+1.18,1.04,0,{ rz:.6, raster:.4 });
    b.klotz(.24,.52,.52,H,x+1.8,1.47,0,{ rz:.6, glatt:true }); b.klotz(.14,.72,.72,F.GOLD,x+1.9,1.54,0,{ rz:.6, glatt:true });
    [[-.2,-.2],[-.2,.2],[.2,-.2],[.2,.2],[0,0]].forEach(([a,c])=>b.klotz(.04,.09,.09,0x5a4010,x+1.97-Math.sin(.6)*a,1.59+Math.cos(.6)*a,c,{ rz:.6, glatt:true }));
    b.pixel('www|wyw|www',.13,{ w:F.WEISS, y:F.GELB },x,.72,.57,.04,{ glatt:true });
  });
  const tr=[0,1,2,3].map(i=>{ const q=K.beweglich(g,0,0,0); K.koerper(q,b=>{ b.klotz(.09,.13,.09,0x9ae0ff,0,0,(i%3-1)*.2,{ glatt:true }); b.klotz(.07,.1,.07,0xc8f0ff,.14,.12,((i+1)%3-1)*.2,{ glatt:true }); },{ leuchtet:true }); return q; });
  k.anim.push(t=>tr.forEach((q,i)=>{ const u=(t*.75+i*.25)%1; q.position.set(1.65+u*.45,1.4-u*u*1.3,0); }));
}
/* 4 Blockbaum mit roten Äpfeln */
function blockbaum(g,k){
  K.koerper(g,b=>{
    K.baum(b,0,0,{ hoch:1.9, gr:1.2, aepfel:true });
    /* große Äpfel vorn auf der Krone (Klotzraster der Krone: .66) */
    const s=.66, cy=1.9+s*1.5;
    [[-1,1,2],[1,0,2],[0,-1,2],[-2,0,1],[2,-1,1],[0,2,0],[-1,-1,2],[2,1,1]].forEach(([i,j,l])=>{ const x=i*s+.05, y=cy+j*s, z=(l+.5)*s+.1; b.klotz(.32,.32,.3,F.ROT,x,y,z,{ glatt:true }); b.klotz(.07,.12,.07,F.HOLZ3,x,y+.21,z,{ glatt:true }); b.klotz(.09,.09,.03,0xffa0a0,x-.07,y+.06,z+.16,{ glatt:true }); });
    [[.9,.5],[-.8,.85],[.35,1.15]].forEach(([x,z])=>{ b.klotz(.26,.24,.26,F.ROT,x,.12,z,{ ry:x, glatt:true }); b.klotz(.06,.1,.06,F.HOLZ3,x,.29,z,{ glatt:true }); });
  });
  k.verdecker(g,12.6,-2.6,.8);
}
/* 5 Vogelhaus auf einem Pfahl mit Vogel */
function vogelhaus(g,k){
  K.koerper(g,b=>{
    b.klotz(.7,.16,.7,F.GRAU2,0,.08,0); b.klotz(.26,1.55,.26,F.HOLZ2,0,.9,0,{ raster:.4 }); [-1,1].forEach(s=>b.klotz(.12,.6,.12,F.HOLZ3,s*.28,1.45,0,{ rz:-s*.7 }));
    b.klotz(1.75,.16,1.35,F.HOLZ,0,1.75,.08);
    b.klotz(1.35,1.15,.95,F.CREME,0,2.4,0,{ raster:.4 });
    /* rundes Loch und Sitzstange */
    b.klotz(.54,.38,.05,F.SCHWARZ,0,2.52,.49,{ glatt:true }); b.klotz(.38,.54,.05,F.SCHWARZ,0,2.52,.485,{ glatt:true }); b.klotz(.12,.12,.4,F.HOLZ3,0,2.07,.65,{ glatt:true });
    [[3.08,1.85],[3.28,1.4],[3.48,.95],[3.68,.5]].forEach(([y,w],i)=>b.klotz(w,.22,1.35,i%2?0x2a8a84:F.TUERKIS,0,y,0,{ raster:.4 }));
  });
  const v=K.beweglich(g,.56,1.83,.52);
  const vogel=(p,c,c2)=>K.koerper(p,b=>{ b.klotz(.4,.3,.3,c,0,.26,0,{ glatt:true }); b.klotz(.26,.26,.26,c,.17,.5,0,{ glatt:true }); b.klotz(.14,.09,.1,F.ORANGE,.35,.48,0,{ glatt:true }); b.klotz(.28,.16,.34,c2,-.04,.28,0,{ glatt:true }); b.klotz(.24,.08,.16,c2,-.3,.34,0,{ rz:-.4, glatt:true });
      [-1,1].forEach(s=>{ b.klotz(.06,.07,.03,F.SCHWARZ,.22,.55,s*.14,{ glatt:true }); b.klotz(.04,.12,.04,F.ORANGE,.02,.06,s*.08,{ glatt:true }); }); },{ schatten:false });
  vogel(v,0x4aa8f0,0x2a6ac8); v.rotation.y=-2.4;
  const w=K.beweglich(g,-.1,3.72,0); vogel(w,F.ROT,F.ROT2); w.rotation.y=-.7;
  k.anim.push(t=>{ v.position.y=1.83+Math.max(0,Math.sin(t*3.1))*.07*(Math.sin(t*.7)>0?1:0); w.rotation.y=-.7+Math.sin(t*.9)*.8; });
}
/* 6 Blumenschild: Holztafel mit gemalten Blumen, ohne Schrift */
function blumenschild(g){
  K.koerper(g,b=>{
    [-1.15,1.15].forEach(x=>{ b.klotz(.24,1.5,.24,F.HOLZ2,x,.75,-.05,{ raster:.4 }); b.klotz(.42,.14,.42,F.HOLZ3,x,.07,-.05); });
    b.klotz(3.0,2.0,.16,F.CREME,0,2.1,0,{ raster:.5 });
    [1.02,3.18].forEach(y=>b.klotz(3.28,.2,.3,F.HOLZ,0,y,0,{ raster:.4 })); [-1.54,1.54].forEach(x=>b.klotz(.2,1.96,.3,F.HOLZ,x,2.1,0,{ raster:.4 }));
    b.klotz(3.5,.16,.44,F.HOLZ3,0,3.38,0);
    const blume=(x,y,c,m)=>{ b.pixel('.cc.cc.|ccccccc|.ccmcc.|ccmmmcc|.ccmcc.|ccccccc|.cc.cc.',.115,{ c, m },x,y,.11,.06,{ glatt:true }); b.klotz(.11,y-1.12,.05,F.GRUEN2,x,(y+1.12)/2,.11,{ glatt:true }); b.klotz(.28,.12,.05,F.GRUEN,x+.17,1.38,.11,{ rz:.45, glatt:true }); };
    blume(-.95,1.75,F.ROT,F.GELB); blume(0,2.2,F.GELB,F.ORANGE); blume(.95,1.65,0x4a7af0,F.WEISS);
    b.klotz(2.8,.14,.05,F.HELLGRUEN,0,1.19,.12,{ glatt:true });
  });
}
/* 7 Honigtöpfe auf einem niedrigen Holztisch */
function honigtoepfe(g){
  K.koerper(g,b=>{
    [-1.0,1.0].forEach(x=>[-.45,.45].forEach(z=>b.klotz(.2,.7,.2,F.HOLZ3,x,.35,z))); b.klotz(2.5,.18,1.4,F.HOLZ,0,.77,0,{ raster:.4 });
    const topf=(x,z,s,tuch)=>{ const y=.86, G=0xf0a418, G2=0xd08408;
      b.klotz(.62*s,.14*s,.62*s,G2,x,y+.07*s,z,{ glatt:true }); b.klotz(.78*s,.5*s,.52*s,G,x,y+.39*s,z,{ raster:.3 }); b.klotz(.52*s,.49*s,.78*s,G,x,y+.39*s,z,{ raster:.3 }); b.klotz(.62*s,.14*s,.62*s,G2,x,y+.71*s,z,{ glatt:true });
      b.klotz(.74*s,.16*s,.74*s,tuch,x,y+.86*s,z,{ glatt:true }); b.klotz(.66*s,.08*s,.66*s,F.CREME,x,y+.77*s,z,{ glatt:true }); b.klotz(.42*s,.12*s,.42*s,tuch,x,y+.99*s,z,{ glatt:true });
      b.klotz(.44*s,.34*s,.05,F.CREME,x,y+.4*s,z+.4*s,{ glatt:true }); b.pixel('.y.|yyy|yyy',.08*s,{ y:0xe07808 },x,y+.28*s,z+.42*s,.03,{ glatt:true });
      b.klotz(.13*s,.28*s,.05,0xffc830,x+.24*s,y+.62*s,z+.4*s,{ glatt:true }); };
    topf(-.78,.05,.95,F.ROT); topf(.06,-.12,1.25,F.ROT); topf(.86,.14,.82,F.ROT);
    /* Honigwabe */
    b.klotz(.5,.14,.36,0xffc830,-.1,.93,.52,{ ry:.2, glatt:true }); [[-.16,-.06],[.04,.07],[.17,-.05]].forEach(([x,z])=>b.klotz(.11,.02,.1,0xc87808,-.1+x,1.01,.52+z,{ ry:.2, glatt:true }));
  });
}
/* 8 Blumenbeet in einem Holzrahmen */
function blumenbeet(g){
  K.koerper(g,b=>{
    b.klotz(3.5,.22,2.1,0x5a3418,0,.16,0,{ raster:.35 });
    [-1.15,1.15].forEach(z=>b.klotz(3.9,.5,.24,F.HELLHOLZ,0,.25,z,{ raster:.45 })); [-1.84,1.84].forEach(x=>b.klotz(.24,.5,2.1,F.HOLZ,x,.25,0,{ raster:.45 }));
    [-1.84,1.84].forEach(x=>[-1.15,1.15].forEach(z=>b.klotz(.34,.66,.34,F.HOLZ2,x,.33,z)));
    const reihen=[[-.65,[F.LILA,F.WEISS,F.LILA,F.WEISS,F.LILA],.95],[.0,[F.GELB,F.ORANGE,F.GELB,F.ORANGE,F.GELB],.72],[.65,[F.ROT,F.ROSA,F.ROT,F.ROSA,F.ROT],.5]];
    reihen.forEach(([z,c,h])=>c.forEach((f,i)=>{ const x=-1.34+i*.67; b.klotz(.09,h,.09,F.GRUEN2,x,.25+h/2,z,{ glatt:true }); [-1,1].forEach(s=>b.klotz(.22,.07,.13,F.GRUEN,x+s*.14,.38,z+.06,{ rz:s*.4, glatt:true }));
      b.pixel('c.c.c|ccccc|ccccc|.ccc.',.09,{ c:f },x,.2+h,z,.28,{ glatt:true }); b.klotz(.12,.1,.05,f===F.GELB?F.ROT:F.GELB,x,.36+h,z+.16,{ glatt:true }); }));
  });
}

/* ---------- Wiesenschmuck ---------- */
/* achteckige Scheibe: vier gedrehte Klötze; liegend (Achse z, um d gedreht) oder stehend */
function scheibe(b,x,y,z,dm,len,c,d,stehend){ for(let i=0;i<4;i++){ const a=i*Math.PI/4, l=len-i*.003; if(stehend) b.klotz(dm,l,dm*.414,c,x,y-i*.0015,z,{ ry:a, glatt:true, jitter:.03 }); else b.klotz(dm,dm*.414,l,c,x,y,z,{ rz:a, ry:d, glatt:true, jitter:.03 }); } }
/* runder Baumstumpf mit Rinde, Wurzeln und Jahresringen */
function stumpf(b,x,z){
  scheibe(b,x,.29,z,1.0,.58,F.HOLZ3,0,true);
  [[.98,0xe8c088],[.76,0xa8743c],[.62,0xe8c088],[.42,0xa8743c],[.28,0xe8c088],[.12,0x8a5a28]].forEach(([w,c],i)=>scheibe(b,x,.585+i*.012,z,w*.9,.03,c,0,true));
  for(let i=0;i<5;i++){ const a=i*1.26+.3; b.klotz(.55,.16,.2,F.HOLZ3,x+Math.cos(a)*.6,.08,z-Math.sin(a)*.6,{ ry:a, glatt:true }); }
  for(let i=0;i<7;i++){ const a=i*.9; b.klotz(.07,.46,.07,F.HOLZ2,x+Math.cos(a)*.5,.28,z+Math.sin(a)*.5,{ glatt:true }); }
}
/* runder Strohballen (liegende Rolle) mit gewickeltem Ende und abstehenden Halmen */
function ballen(b,x,z,d){
  const c=Math.cos(d), s=Math.sin(d), P=(u,w)=>[x+u*c+w*s,z-u*s+w*c], y=.6;
  scheibe(b,x,y,z,1.2,.95,0xe8c050,d);
  [-.22,.22].forEach(w=>{ const q=P(0,w); scheibe(b,q[0],y,q[1],1.23,.07,0xc89830,d); });
  [-1,1].forEach(v=>[[.96,0xc89830],[.76,0xf4d870],[.54,0xc89830],[.34,0xf4d870],[.14,0xa87820]].forEach(([w,f],i)=>{ const q=P(0,v*(.485+i*.012)); scheibe(b,q[0],y,q[1],w,.024,f,d); }));
  for(let i=0;i<46;i++){ const a=zufall()*6.283, w=zw(-.52,.52), q=P(Math.cos(a)*.62,w); b.klotz(zw(.24,.42),.035,.035,K.wahl([0xf8e080,0xd8ac38,0xfff0a8]),q[0],Math.max(.04,y+Math.sin(a)*.62),q[1],{ rz:a+zw(.9,2.2), ry:d+zw(-.5,.5), glatt:true }); }
  for(let i=0;i<14;i++){ const q=P(zw(-.95,.95),zw(-.75,.75)); b.klotz(zw(.25,.45),.025,.04,0xf0d060,q[0],.03+i*.001,q[1],{ ry:zw(0,3.1), glatt:true }); }
}
function schmuck(k){
  const sc=k.scene;
  /* freie Flächen: rund um Gegenstände, Weg und Ausgang nichts Höheres */
  const nahDran=(x,z,r)=>gegenstaende.some(d=>Math.hypot(x-d.x,z-d.z)<r+1.9 || Math.hypot(x-d.steh[0],z-d.steh[1])<r) || (Math.abs(x-EX)<2.6 && z<-6) || Math.hypot(x-1.2,z+.5)<1.6;
  /* Blumen und Gras im Spielfeld (flach, man läuft darüber), in vier Körpern */
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>K.koerper(sc,b=>{
    for(let i=0;i<20;i++){ const x=sx*zw(.5,17.4), z=sz*zw(.4,12.9); if(nahDran(x,z,.8)) continue; const f=K.wahl(BLUETEN);
      for(let j=0;j<4;j++){ const px=x+zw(-.65,.65), pz=z+zw(-.65,.65); K.blume(b,px,pz,f,zw(.6,.85)); } }
    for(let i=0;i<46;i++){ const x=sx*zw(.3,17.5), z=sz*zw(.3,13); if(nahDran(x,z,.4)) continue; K.gras(b,x,z,.35,6); }
  },{ schatten:false }));
  /* Büsche am Rand */
  const rand=[[-16.7,-11.6,1.2],[-17,-5.6,.85],[-16.9,1.8,1.0],[-16.6,11.4,1.25],[17,-11.4,1.15],[16.9,-5.4,.9],[16.8,4.6,1.05],[16.6,11.6,1.2],[-8,-12.4,.8],[-.6,-12.4,.9],[12.8,-12.3,.8]];
  K.koerper(sc,b=>{ rand.forEach(([x,z,s])=>{ K.busch(b,x,z,s); [[-.2,.55,.45],[.35,.35,.3],[0,.85,.15]].forEach(([a,y,c])=>b.klotz(.14,.14,.14,K.wahl(BLUETEN),x+a*s,y*s,z+c*s,{ glatt:true })); k.kreis(x,z,.7*s); }); });
  /* Sonnenblumen in den Ecken, Pilze, Baumstumpf, Steine, Strohballen */
  K.koerper(sc,b=>{
    [[-15.6,-12],[-14.7,-12.4],[-16.5,-12.5],[15.4,-12.2],[16.5,-12.5],[-17.3,7.4],[-17.4,8.5],[17.3,-.6],[17.4,.6]].forEach(([x,z],i)=>{ const h=1.25+(i%3)*.22; b.klotz(.12,h,.12,F.GRUEN2,x,h/2,z,{ glatt:true }); [-1,1].forEach(s=>b.klotz(.36,.1,.2,F.GRUEN,x+s*.22,h*.45+s*.1,z,{ rz:s*.35, glatt:true }));
      b.pixel('.y.y.|yyyyy|.yyy.|yyyyy|.y.y.',.15,{ y:F.GELB },x,h-.2,z+.05,.1,{ glatt:true }); b.klotz(.28,.28,.08,0x7a4a18,x,h+.17,z+.13,{ glatt:true }); k.kreis(x,z,.4); });
    [[-15.2,10.6],[14.4,12],[-6.6,-12.5]].forEach(([x,z])=>{ K.pilz(b,x,z,.8,F.ROT); K.pilz(b,x+.6,z+.25,.5,F.ORANGE); k.kreis(x+.2,z,.6); });
    stumpf(b,-16,4.8); k.kreis(-16,4.8,.65);
    [[16,8,1],[16.6,7.1,.6],[3.6,-12.6,.6],[11.2,-12.6,.5]].forEach(([x,z,s])=>{ b.klotz(.9*s,.55*s,.75*s,F.GRAU,x,.27*s,z,{ ry:x }); b.klotz(.5*s,.3*s,.5*s,0xb8b4c4,x+.1,.62*s,z,{ ry:z }); k.kreis(x,z,.55*s); });
    [[15.6,-8.8,-.35],[15.8,-10.7,.3]].forEach(([x,z,d])=>{ ballen(b,x,z,d); k.kasten(x,z,1.5,1.4); });
  });
  /* Trittsteine und Kleeflecken */
  K.koerper(sc,b=>{ for(let i=0;i<46;i++){ const x=zw(-16.5,16.5), z=zw(-12,12.5); if(nahDran(x,z,.6)) continue; [[0,0],[.16,.1],[-.1,.17]].forEach(([a,c])=>b.klotz(.14,.04,.14,0x4aa844,x+a,.03,z+c,{ glatt:true })); b.klotz(.08,.08,.08,F.WEISS,x+.28,.09,z-.1,{ glatt:true }); } },{ schatten:false });
}

/* ---------- Wiese außerhalb (vorn und seitlich), ohne Hindernisse ---------- */
function umland(k){
  const sc=k.scene;
  [-1,1].forEach(s=>K.koerper(sc,b=>{
    for(let i=0;i<46;i++){ const x=s*zw(19.4,36), z=zw(-12.8,30), f=K.wahl(BLUETEN); for(let j=0;j<3;j++) K.blume(b,x+zw(-.8,.8),z+zw(-.8,.8),f,.9); }
    for(let i=0;i<50;i++) K.gras(b,s*zw(19,40),zw(-13,32),.5,5);
    for(let i=0;i<30;i++){ const x=zw(0,19)*s, z=zw(14.3,30), f=K.wahl(BLUETEN); for(let j=0;j<3;j++) K.blume(b,x+zw(-.8,.8),z+zw(-.8,.8),f,.75); K.gras(b,x+1,z,.5,5); }
  },{ schatten:false }));
  [-1,1].forEach(s=>K.koerper(sc,b=>{
    [[23,-10,1.1],[28,-2,1.4],[23.5,6,1.0],[31,12,1.3],[24.5,19,1.1],[38,-8,1.6],[40,5,1.5],[34,24,1.4],[47,-2,1.7],[44,18,1.5],[27,31,1.2]].forEach(([x,z,g],i)=>K.baum(b,s*(x+(s>0?.8:0)),z+(s>0?1.2:0),{ hoch:1.7+(i%3)*.4, gr:g, laub:FERNLAUB }));
    [[20.2,-5,1.2],[21,2.4,.9],[20.4,11,1.3],[22,-12.6,1],[20.8,17,1.1],[14,17.5,.8],[7,22,1],[19,25,.9]].forEach(([x,z,g])=>K.busch(b,s*x,z,g));
  },{ schatten:false }));
}

/* ---------- Land hinter der Schlucht, Berge, Turm, Himmel ---------- */
function ferne(k){
  const sc=k.scene;
  K.koerper(sc,b=>{
    for(let i=0;i<110;i++){ const x=zw(-30,30), z=zw(-44,SH-.8); if(Math.abs(x-EX)<2.8||Math.abs(x+12)<2.4||Math.abs(x-22)<1.8) continue; const f=K.wahl(BLUETEN); for(let j=0;j<3;j++) K.blume(b,x+zw(-.7,.7),z+zw(-.5,.5),f,.9); }
    for(let i=0;i<70;i++) K.gras(b,zw(-36,36),zw(-44,SH-.8),.5,5);
  },{ schatten:false });
  K.koerper(sc,b=>{
    [[-27,-24,1.3],[-19,-29,1.1],[-33,-34,1.6],[-6,-32,1.0],[17,-26,1.2],[29,-23,1.4],[34,-33,1.6],[24,-38,1.3],[-17,-40,1.4],[14,-45,1.5],[-42,-25,1.5],[43,-26,1.6],[-2,-43,1.2],[-48,-40,1.7],[48,-42,1.7]].forEach(([x,z,s],i)=>K.baum(b,x,z,{ hoch:1.6+(i%3)*.4, gr:s, laub:FERNLAUB }));
    [[-22,-22,1.1],[-3,-28.4,.8],[13.5,-22,1],[18.5,-33,.9],[-29,-29,1],[33,-22,1.2],[1,-35,1]].forEach(([x,z,s])=>K.busch(b,x,z,s));
  },{ schatten:false });
  /* gestufte Hügel und Berge rundum */
  const berg=(b,x,z,w,h,c,schnee)=>{ const n=4; for(let i=0;i<n;i++){ const br=w*(1-i*.22); b.klotz(br,h/n,br*.7,i%2?c[0]:c[1],x,h/n*(i+.5),z,{ raster:2.4 }); } if(schnee) b.klotz(w*.22,h*.12,w*.16,F.WEISS,x,h*1.05,z,{ raster:1 }); };
  K.koerper(sc,b=>{
    for(let i=0;i<13;i++){ const x=-60+i*10+zw(-2,2); berg(b,x,-52+(i%2)*3,zw(11,15),zw(2.4,4.6),[0x6cbc7c,0x5aac70],false); }
    [[-44,-61,22,11],[-17,-63,17,8],[19,-62,20,10],[46,-60,18,9]].forEach(([x,z,w,h])=>berg(b,x,z,w,h,[0x8a9ac8,0x7a88bc],true));
    [-1,1].forEach(s=>{ for(let z=-42;z<=52;z+=10) berg(b,s*(54+zw(-1,2)),z,zw(10,13),zw(2.6,5),[0x6cbc7c,0x5aac70],false); });
    for(let x=-44;x<=44;x+=11) berg(b,x,52,zw(10,13),zw(1.6,3),[0x6cbc7c,0x5aac70],false);
  },{ schatten:false });
  /* der ferne Turm (da geht die Reise hin) */
  K.koerper(sc,b=>{ const x=-24, z=-47; for(let i=0;i<9;i++) b.klotz(3.2-(i%2)*.2,1.1,3.2-(i%2)*.2,i%2?0xc8bedc:0xe4dcf0,x,.55+i*1.1,z,{ raster:.8 }); b.klotz(4.2,.5,4.2,0x8a7ab8,x,10.15,z); b.klotz(3,.9,3,F.ROT,x,10.85,z,{ raster:.8 }); b.klotz(1.8,.9,1.8,0xc83a48,x,11.75,z); b.klotz(.7,.8,.7,F.ROT,x,12.6,z); [3.6,5.8,8].forEach(y=>b.klotz(.6,.8,.1,0x3a5aa0,x,y,z+1.62,{ glatt:true })); },{ schatten:false });
  /* Sonne und Wolken */
  const sonne=gruppe(sc,-12,15,-66);
  K.koerper(sonne,b=>{ b.klotz(4,4,.4,0xffe450,0,0,0,{ glatt:true, jitter:0 }); b.klotz(2.8,5.2,.38,0xffec70,0,0,0,{ glatt:true, jitter:0 }); b.klotz(5.2,2.8,.36,0xffec70,0,0,0,{ glatt:true, jitter:0 }); },{ leuchtet:true });
  schein(sonne,'rgba(255,240,150,.55)',0,0,.5,13);
  K.wolken(k,sc,[[-40,10,-48,2],[-8,8.5,-52,1.6],[12,13,-56,2.2],[34,9,-46,1.8],[54,12,-30,1.8]],{ drift:3 });
  K.wolken(k,sc,[[-55,11,-8,1.8],[-26,14,-34,1.3],[24,15,-38,1.2],[56,10,8,1.6]],{ drift:2.4, phase:2.5 });
}

/* ---------- Tiere und Schmetterlinge ---------- */
function leben(k){
  const sc=k.scene;
  /* grasendes Schaf am rechten Rand */
  K.schaf(k,sc,14.6,6.4,-2.6,1,{ grast:true }); k.kreis(14.6,6.4,.95);
  /* spazierendes Schaf hinter der Schlucht */
  const s=K.schaf(k,sc,-6,-22.5,0,1.15,{ laeuft:true, phase:2 }); laeufer(k,s.g,[[-7,-22.4],[1.5,-22.8],[2,-25.5],[-6.5,-25]],.9,0,7);
  /* zwei Hühner: eines läuft vorn, eines pickt am linken Rand */
  const h=K.huhn(k,sc,0,9,0,1.05,{ laeuft:true }); laeufer(k,h.g,[[-6.5,10.6],[.5,9.2],[5,10.4],[10.5,9.6],[6,12.2],[-2,12]],1.1,0,11);
  K.huhn(k,sc,-14.8,-.8,.5,1,{ pickt:true, farbe:0xd89048, phase:1 }); k.kreis(-14.8,-.8,.55);
  /* Bienen */
  K.biene(k,sc,-6.4,2.3,1.2,.8,{ runde:1.8, tempo:.8 });
  K.biene(k,sc,10.2,2.2,-7.4,.75,{ runde:1.3, tempo:1, phase:3 });
  /* Schmetterlinge: Flügel klappen */
  [[-13,1.3,2.5,F.ROSA],[-6,1.6,-6.5,F.GELB],[5.5,1.4,4,0x6a9af8],[14,1.7,2,F.ORANGE],[-1,1.5,8.5,F.LILA],[11,2.1,-22,F.WEISS]].forEach(([x,y,z,c],i)=>{
    const g=K.beweglich(sc,x,y,z), fl=K.beweglich(g,0,0,0);
    K.koerper(fl,b=>[-1,1].forEach(v=>{ b.klotz(.24,.03,.22,c,v*.15,0,-.07,{ glatt:true }); b.klotz(.16,.03,.14,c,v*.11,0,.12,{ glatt:true }); b.klotz(.07,.035,.07,F.WEISS,v*.18,.005,-.07,{ glatt:true }); }),{ leuchtet:true });
    K.koerper(g,b=>b.klotz(.07,.07,.36,F.DUNKEL,0,0,0,{ glatt:true }),{ schatten:false });
    k.anim.push(t=>{ const u=t*.55+i*1.9; fl.scale.x=.35+Math.abs(Math.sin(t*9+i))*.65; g.position.set(x+Math.sin(u)*1.5,y+Math.sin(t*2.4+i)*.25,z+Math.sin(u*1.6)*.9); g.rotation.y=Math.atan2(-Math.cos(u)*1.5,-Math.cos(u*1.6)*1.44); }); });
}

const verstecke=[[-15.4,-7.2],[-14,-10.8],[-8.4,-10.6],[-7,-6.4],[-1.4,-10.4],[.8,-6.6],[10.6,-10.6],[14.4,-6],[16,2],[11.4,3.6],[12.4,10.4],[4.2,7.6],[1.4,11.2],[-4.6,11.4],[-8.4,8.8],[-13.8,9.8],[-14.6,2.6],[-6.4,.6],[-12.8,-5.6],[8.6,-3.4]];
const gegenstaende=[
  { x:-9.8, z:-2.6, steh:[-9.8,-.3], kasten:[2.3,1.9], treffer:[2.4,3.5,1.9], baue:bienenstock },
  { x:2.6, z:-8.8, steh:[2.6,-6.8], kasten:[2.2,1.8], treffer:[2.2,2.9,1.8], baue:bienenkorb },
  { x:-3.8, z:4.6, dreh:.15, steh:[-3.8,6.5], kasten:[3.2,1.4], treffer:[3.3,2.2,1.4], baue:giesskanne },
  { x:12.6, z:-2.6, steh:[12.2,-.4], r:.8, treffer:[3.6,4.7,2.8], baue:blockbaum },
  { x:-4.4, z:-9.2, steh:[-4.4,-7.2], kasten:[1.8,1.4], treffer:[1.9,4.3,1.5], baue:vogelhaus },
  { x:-11.6, z:-9, dreh:.12, steh:[-11.4,-7], kasten:[3.5,.9], treffer:[3.5,3.5,.8], baue:blumenschild },
  { x:4, z:-.8, dreh:-.12, steh:[4,1.2], kasten:[2.8,1.7], treffer:[2.8,2.3,1.6], baue:honigtoepfe },
  { x:-11.2, z:5.4, dreh:.1, steh:[-11,7.7], kasten:[4.2,2.8], treffer:[4.1,1.7,2.6], baue:blumenbeet },
  Object.assign({ x:8.4, z:3.8, steh:[8.2,6] }, K.NEU.brunnen),
  Object.assign({ x:-2.8, z:-3.4, steh:[-2.8,-1.2] }, K.NEU.picknickdecke)
];

function baue(k){
  wiese(k);
  schlucht(k);
  hecken(k);
  const tuer=bruecke(k);
  schmuck(k);
  umland(k);
  ferne(k);
  leben(k);
  return { tuer, start:[.8,-1] };
}
return { titel:'Die Blumenwiese', himmel:HIMMEL, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 5: Der Turm über den Wolken. Offene Plattform ganz oben im Turm: helle fliederfarbene Pfeiler mit Bögen und Brüstung,
   rundum das Wolkenmeer, Tauben, die Pixelbiene. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Turmglocke) und 10 (Drachen) sind neu.
   Ausgang: hinten durch die Lücke auf den Steg. Dort wartet der große Ballon, er ist mit zwei Leinen festgemacht und
   am Türchen verschlossen. Beim Öffnen fallen die Leinen, die Figur steigt in den Korb und hebt mit dem Ballon ab. */
RAEUME3D.kloetzchenwelt[4] = (function(){
const K=KLOTZ, F=K.F, MIX=K.MIX;
const B=36, T=27, H=6;
const HIMMEL=0x86c8fa;
/* Mitte des Ausgangs und des Ballons */
const AX=2, BZ=-15.9;
const L=[0xd8d0e8,0xc8bedc,0xe4dcf0], L2=0xa898cc, L3=0x8a7ab8, HELL=0xf4eef8;
const weich=a=>{ a=Math.max(0,Math.min(1,a)); return a*a*(3-2*a); };

/* ---------- Wände mit Bögen ---------- */
/* Pfeiler mit Sockel, Kapitell und goldenem Knopfklotz */
function pfeiler(b,x,z){
  K.mauer(b,x-.45,x+.45,0,H,z,{ farben:L, d:.7, raster:.9, unten:L3 });
  b.klotz(1.2,.3,.95,L3,x,.15,z); b.klotz(1.18,.26,.92,L2,x,H-.45,z); b.klotz(1.1,.34,.85,L2,x,H+.17,z); b.klotz(.55,.4,.55,HELL,x,H+.54,z); b.klotz(.26,.26,.26,F.GOLD,x,H+.87,z,{ glatt:true });
}
/* offenes Feld von a bis e: Brüstung mit kleinen Säulen, oben ein gestufter Bogen. achse 'x' (Rückwand) oder 'z' (Seite) */
function bogen(b,a,e,quer,achse){
  const q=(p,y,l,h,d,c,opt)=>{ if(achse==='z') b.klotz(d,h,l,c,quer,y,p,opt); else b.klotz(l,h,d,c,p,y,quer,opt); };
  const l=e-a, m=(a+e)/2, n=Math.max(2,Math.round(l/.8));
  q(m,.12,l,.24,.55,L2,{ raster:.8 });
  for(let i=0;i<n;i++){ const p=a+(i+.5)*l/n; q(p,.56,.26,.64,.26,i%2?HELL:L[0],{ glatt:true }); q(p,.56,.38,.2,.38,i%2?HELL:L[0],{ glatt:true }); }
  q(m,1.0,l,.24,.62,L3,{ raster:.8 });
  /* Sturz und Stufen in den Ecken */
  const k=Math.max(1,Math.round(l)); for(let i=0;i<k;i++) q(a+(i+.5)*l/k,5.62,l/k,.76,.5,K.wahl(L),{ raster:.8 });
  q(m,5.14,l,.2,.58,L2,{ raster:.8 });
  const s=Math.min(.55,l/7);
  [[0,1.3],[1,.8],[2,.4]].forEach(([i,h])=>{ q(a+(i+.5)*s,5.04-h/2,s,h,.46,L[i%3]); q(e-(i+.5)*s,5.04-h/2,s,h,.46,L[i%3]); });
  q(m,5.62,.4,.4,.62,F.GOLD,{ glatt:true });
}
function waende(k,R){
  const hz=-T/2-.25;
  /* hinten: zwei geschlossene Felder für Fahne und Karte, sonst Bögen; in der Mitte die Lücke zum Ballon */
  const h=K.bau();
  [-17.75,-14,-8,AX-3,AX+3,9,14.2,17.75].forEach(x=>pfeiler(h,x,hz));
  [[-17.3,-14.45],[-7.55,AX-3.45],[AX+3.45,8.55],[14.65,17.3]].forEach(([a,e])=>bogen(h,a,e,hz,'x'));
  [[-13.55,-8.45],[9.45,13.75]].forEach(([a,e])=>{ K.mauer(h,a,e,0,H,hz,{ farben:L, raster:.85, relief:.05, unten:L3, oben:[L2] }); const n=Math.round(e-a); for(let i=0;i<n;i+=2) h.klotz((e-a)/n,.45,.5,L2,a+(i+.5)*(e-a)/n,H+.22,hz); });
  /* Pixelsterne auf den geschlossenen Feldern */
  [[-11,5.15],[11.6,5.15]].forEach(([x,y])=>h.klotz(.34,.34,.08,F.GELB,x,y,-T/2+.18,{ rz:Math.PI/4, glatt:true }));
  h.fertig(R.hinten,{ schatten:false });
  [-4.5,AX+5.0,15.95,-15.9].forEach((x,i)=>K.haengelampe(R.hinten,x,4.15,-T/2+.3,{ farbe:[F.LILA,F.TUERKIS,F.ROSA,F.GELB][i], kette:.5, schein:i<2 }));
  /* Seiten */
  [[R.links,-1],[R.rechts,1]].forEach(([w,s])=>{ const b=K.bau(), x=s*(B/2+.25), Z=[-13.4,-6.8,-.2,6.4,13.1];
    Z.forEach((z,i)=>{ if(i===4){ K.mauer(b,z-.4,z+.4,0,1.4,x,{ achse:'z', farben:L, d:.7 }); b.klotz(.9,.24,1.0,L2,x,1.5,z); b.klotz(.26,.26,.26,F.GOLD,x,1.75,z,{ glatt:true }); } else if(i) pfeiler(b,x,z); });
    for(let i=0;i<3;i++) bogen(b,Z[i]+.45,Z[i+1]-.45,x,'z');
    bogen2(b,Z[3]+.45,Z[4]-.4,x);
    b.fertig(w,{ schatten:false }); });
  /* niedrige Brüstung vorn */
  const v=K.bau(), vz=T/2+.25, n=20;
  for(let i=0;i<=n;i++){ const x=-B/2+i*B/n; v.klotz(.5,.62,.5,i%4?L[i%3]:L3,x,.31,vz); if(i%4===0) v.klotz(.28,.22,.28,F.GOLD,x,.74,vz,{ glatt:true }); }
  for(let i=0;i<n;i++) v.klotz(B/n-.5,.18,.3,L2,-B/2+(i+.5)*B/n,.48,vz,{ raster:.5 });
  v.fertig(R.sc,{ schatten:false });
  /* Hindernisse am Rand */
  k.kasten((-B/2+AX-2.5)/2,-T/2,AX-2.5+B/2,.4); k.kasten((AX+2.5+B/2)/2,-T/2,B/2-AX-2.5,.4); k.kasten(0,T/2,B,.4); k.kasten(-B/2,0,.4,T); k.kasten(B/2,0,.4,T);
}
/* vorderes Seitenfeld: nur Brüstung (damit der Blick von vorn frei bleibt) */
function bogen2(b,a,e,x){
  const l=e-a, n=Math.round(l/.8);
  b.klotz(.55,.24,l,L2,x,.12,(a+e)/2,{ raster:.8 }); for(let i=0;i<n;i++) b.klotz(.26,.64,.26,i%2?HELL:L[0],x,.56,a+(i+.5)*l/n,{ glatt:true }); b.klotz(.62,.24,l,L3,x,1.0,(a+e)/2,{ raster:.8 });
}

/* ---------- Turm unter der Plattform, Wolkenmeer und Fernblick ---------- */
function ferne(k,sc){
  const t=K.bau();
  [[34,25,-3,-5],[30,22,-5,-6.4],[22,17,-6.4,-16]].forEach(([w,d,o,u],i)=>t.quader(-w/2,u,-d/2,w/2,o,d/2,[L2,L3,0xc8bedc][i],{ raster:1.6 }));
  [-7,0,7].forEach(x=>[-8.2,-11.4].forEach(y=>t.klotz(1.4,1.8,.2,0x4a3a78,x,y,8.55,{ glatt:true })));
  [-1,1].forEach(s=>[-4.5,3.5].forEach(z=>t.klotz(.2,1.8,1.4,0x4a3a78,s*11.05,-9,z,{ glatt:true })));
  /* Außentreppe, die zum Turm heraufführt */
  for(let i=0;i<14;i++) t.klotz(1.5,.5,2.6,i%2?L[0]:L2,-18.6-.1*i,-.8-i*.75,10-i*1.5,{ raster:.8 });
  t.fertig(sc,{ schatten:false });
  /* Wolkenmeer in vier ziehenden Gruppen */
  const lagen=[[],[],[],[]];
  for(let i=0;i<13;i++) for(let j=0;j<10;j++){ const x=-54+i*9+(zufall()-.5)*5, z=-56+j*9+(zufall()-.5)*5; if(Math.abs(x)<17 && Math.abs(z)<13) continue;
    lagen[(i+j*3)%4].push([x,-8.6+(zufall()-.5)*3.2,z,1.6+zufall()*1.5]); }
  [[-23,-3.2,-9,1.7],[23.5,-3.6,-2,1.9],[-24,-4,8,1.5],[24,-2.8,11,1.4]].forEach((w,i)=>lagen[i].push(w));
  [[-12,-2.8,-22,1.5],[15,-3.4,-23,1.8],[-28,-4.5,-28,2.2],[6,-5,-34,2.4]].forEach((w,i)=>lagen[i].push(w));
  lagen.forEach((l,i)=>K.wolken(k,sc,l,{ drift:1.2+i*.4, phase:i*1.7 }));
  K.wolken(k,sc,[[-30,1.2,-38,1.6],[-8,2.2,-46,1.3],[22,.8,-40,1.8],[40,2.6,-24,1.4],[-40,1.8,-14,1.5]],{ drift:3, phase:.6 });
  /* Pixelsonne und schwebende Inseln in der Ferne */
  K.koerper(sc,b=>b.pixel('..yyyy..|.yooooy.|yooooooy|yooooooy|yooooooy|yooooooy|.yooooy.|..yyyy..',.85,{ y:0xffd860, o:0xfff2a0 },-27,-1.2,-42,.5,{ glatt:true }),{ leuchtet:true });
  const inseln=K.beweglich(sc,0,0,0), b=K.bau();
  [[-19,-3.6,-33,1.0],[25,-4.2,-31,1.2],[10,-6,-46,.9],[-38,-3,-4,.9],[38,-4,6,1]].forEach(([x,y,z,s])=>{
    b.klotz(6*s,.6*s,4.4*s,0x74c45a,x,y,z,{ raster:1 }); b.klotz(4.8*s,1.1*s,3.4*s,F.ERDE,x,y-.85*s,z); b.klotz(2.8*s,1.1*s,2*s,0x7a6a5a,x,y-1.9*s,z); b.klotz(1.2*s,.9*s,1*s,0x8a7a68,x,y-2.85*s,z);
    K.baum(b,x-1.4*s,z,{ hoch:1.2*s, gr:.8*s, y:y+.3*s }); b.klotz(1.6*s,1.2*s,1.4*s,F.CREME,x+1.2*s,y+.9*s,z); b.klotz(2*s,.5*s,1.8*s,F.ROT,x+1.2*s,y+1.75*s,z); b.klotz(1.1*s,.45*s,1*s,F.ROT2,x+1.2*s,y+2.2*s,z); b.klotz(.4*s,.6*s,.1,F.HOLZ3,x+1.2*s,y+.62*s,z+.72*s,{ glatt:true }); });
  b.fertig(inseln,{ schatten:false });
  k.anim.push(z=>{ inseln.position.y=Math.sin(z*.4)*.3; });
}

/* ---------- Tauben ---------- */
function taube(k,sc,x,z,gr,phase){
  const g=K.beweglich(sc,x,0,z); g.scale.setScalar(gr);
  K.koerper(g,b=>{ b.klotz(.56,.34,.4,0xf4f4fa,0,.38,0,{ raster:.3 }); b.klotz(.34,.14,.3,0xd0d4e4,-.38,.44,0); [-1,1].forEach(v=>{ b.klotz(.34,.18,.08,0xc4c8dc,-.05,.42,v*.23,{ glatt:true }); b.klotz(.07,.2,.07,F.ORANGE,.02,.11,v*.1,{ glatt:true }); b.klotz(.18,.05,.12,F.ORANGE,.07,.03,v*.1,{ glatt:true }); }); });
  const kopf=K.beweglich(g,.24,.52,0);
  K.koerper(kopf,b=>{ b.klotz(.27,.3,.28,0xf8f8fc,.09,.14,0,{ glatt:true }); b.klotz(.16,.08,.12,F.ORANGE,.29,.11,0,{ glatt:true }); [-1,1].forEach(v=>b.klotz(.05,.07,.04,F.SCHWARZ,.17,.19,v*.14,{ glatt:true })); });
  k.anim.push(t=>{ kopf.rotation.z=-Math.max(0,Math.sin(t*1.3+phase))*Math.abs(Math.sin(t*7+phase))*.8; });
  return g;
}
function flieger(k,sc,mx,y,mz,rx,rz,tempo,ph,farbe){
  const g=K.beweglich(sc,mx,y,mz);
  K.koerper(g,b=>{ b.klotz(.8,.3,.32,farbe,0,0,0,{ glatt:true }); b.klotz(.28,.28,.28,farbe,.48,.12,0,{ glatt:true }); b.klotz(.16,.08,.12,F.ORANGE,.68,.1,0,{ glatt:true }); b.klotz(.3,.08,.44,0xc8d0e8,-.5,.04,0,{ glatt:true }); [-1,1].forEach(v=>b.klotz(.05,.06,.04,F.SCHWARZ,.54,.18,v*.14,{ glatt:true })); },{ schatten:false });
  const fl=[-1,1].map(v=>{ const q=K.beweglich(g,0,.08,v*.14); K.koerper(q,b=>{ b.klotz(.42,.06,.46,0xe0e4f4,-.02,0,v*.23,{ glatt:true }); b.klotz(.26,.06,.3,farbe,-.1,0,v*.6,{ glatt:true }); },{ schatten:false }); return q; });
  k.anim.push(t=>{ const w=t*tempo+ph; g.position.set(mx+Math.cos(w)*rx,y+Math.sin(w*2.3)*.4,mz+Math.sin(w)*rz); g.rotation.y=Math.atan2(-Math.cos(w)*rz,-Math.sin(w)*rx); fl.forEach((q,i)=>q.rotation.x=(i?-1:1)*Math.sin(t*7+ph)*.65); });
}

/* ---------- Ausstattung ---------- */
function blumenkasten(k,b,x,z,laengs){
  const w=laengs?.75:2.6, d=laengs?2.6:.75;
  b.klotz(w,.5,d,F.HOLZ,x,.28,z,{ raster:.4 }); b.klotz(w+.08,.12,d+.08,F.HOLZ3,x,.56,z); b.klotz(w-.14,.06,d-.14,F.ERDE,x,.63,z);
  for(let i=0;i<5;i++){ const v=-1.0+i*.5, px=x+(laengs?0:v), pz=z+(laengs?v:0), c=[F.ROT,F.GELB,F.ROSA,F.WEISS,F.LILA][i];
    b.klotz(.06,.35,.06,F.GRUEN2,px,.82,pz,{ glatt:true }); b.klotz(.26,.14,.26,F.GRUEN,px+.1,.72,pz+.06,{ glatt:true }); b.klotz(.28,.14,.28,c,px,1.04,pz); b.klotz(.11,.08,.11,c===F.GELB?F.ORANGE:F.GELB,px,1.13,pz,{ glatt:true }); }
  k.kasten(x,z,w+.1,d+.1);
}
function bank(k,b,x,z){
  [-1.2,1.2].forEach(v=>{ b.klotz(.2,.55,.7,F.HOLZ3,x+v,.28,z); b.klotz(.18,.9,.14,F.HOLZ3,x+v,.9,z+.34); });
  b.klotz(2.9,.16,.8,F.HELLHOLZ,x,.62,z,{ raster:.5 }); b.klotz(2.9,.3,.12,F.HOLZ,x,1.22,z+.36,{ raster:.5 });
  [[-.65,F.TUERKIS],[.65,F.ROSA]].forEach(([v,c])=>b.klotz(1.05,.18,.6,c,x+v,.78,z-.04,{ raster:.3 }));
  k.kasten(x,z,3.0,.95);
}
function topf(k,b,x,z,farbe){
  b.klotz(.9,.55,.9,farbe,x,.28,z,{ raster:.4 }); b.klotz(1.05,.16,1.05,F.CREME,x,.62,z); [[0,1.0,0,.85],[-.3,.85,.15,.5],[.32,.88,-.1,.5],[0,1.5,0,.5]].forEach(([a,y,c,w])=>b.klotz(w,w*.8,w,K.wahl(MIX.laub),x+a,y,z+c,{ ry:zufall()*.4 }));
  [[-.25,1.3,.4],[.3,1.15,.42],[.05,1.82,.2]].forEach(([a,y,c])=>b.klotz(.16,.16,.16,F.ROSA,x+a,y,z+c,{ glatt:true }));
  k.kreis(x,z,.65);
}
function ausstattung(k,sc){
  const d=K.bau();
  /* Sternmosaik im Boden */
  const mx=0, mz=.5;
  for(let i=-8;i<=8;i++) for(let j=-8;j<=8;j++){ const a=Math.abs(i), c=Math.abs(j), r=Math.hypot(i,j);
    let f; if(r>6.6 && r<=7.6) f=(i+j+40)%2?L3:L2; else if(a+c<=2) f=0xf8d878; else if(a*c<=4 && a+c<=6) f=0xc8b0f0; else if(a===c && a<=3) f=0x9fd8ff; else continue;
    d.platte(mx+i*.5-.25,mz+j*.5-.25,mx+i*.5+.25,mz+j*.5+.25,.008+((i+j+40)%2)*.001,f,{ raster:.5 }); }
  /* Randstreifen */
  [-1,1].forEach(s=>{ d.platte(-17.4,s*12.75-.15,17.4,s*12.75+.15,.012,L2,{ raster:.6 }); d.platte(s*17.2-.15,-12.6,s*17.2+.15,12.6,.014,L2,{ raster:.6 }); });
  blumenkasten(k,d,-16.9,-10.1,true); blumenkasten(k,d,-16.9,3.2,true); blumenkasten(k,d,16.9,.4,true); blumenkasten(k,d,16.9,9.6,true);
  blumenkasten(k,d,-5,-12.7,false); blumenkasten(k,d,7,-12.7,false); blumenkasten(k,d,-8.6,12.7,false); blumenkasten(k,d,11,12.7,false);
  topf(k,d,-16.4,-12.2,F.TUERKIS); topf(k,d,16.5,-12.2,F.ROSA); topf(k,d,16.4,12.2,F.TUERKIS); topf(k,d,16.5,-6.8,F.ORANGE);
  bank(k,d,-2.2,12.2); bank(k,d,5.4,12.2);
  /* Wasserfass */
  d.klotz(.95,1.1,.95,F.HOLZ,-16.6,.55,-6.8,{ raster:.3 }); [.2,.9].forEach(y=>d.klotz(1.03,.1,1.03,F.GRAU,-16.6,y,-6.8,{ glatt:true })); d.klotz(.75,.06,.75,F.WASSER,-16.6,1.12,-6.8,{ glatt:true }); k.kreis(-16.6,-6.8,.7);
  /* Wolkenfetzen, die über die Brüstung quellen */
  d.fertig(sc);
  const w=K.beweglich(sc,0,0,0); K.koerper(w,b=>{ K.wolke(b,-12,-.6,15.6,1.1); K.wolke(b,9,-1,16.4,1.3); K.wolke(b,-21,.2,-2,.8); K.wolke(b,21.4,-.2,6,.9); },{ leuchtet:true });
  k.anim.push(t=>{ w.position.x=Math.sin(t*.17)*.9; w.position.y=Math.sin(t*.5)*.15; });
  K.laterne(sc,AX-3.7,-11.9,{ hoch:2.0, farbe:L3 }); k.kreis(AX-3.7,-11.9,.35); K.laterne(sc,AX+3.9,-11.9,{ hoch:2.0, farbe:L3 }); k.kreis(AX+3.9,-11.9,.35);
}

/* ---------- Ausgang: Steg und großer Ballon ---------- */
function baueAusgang(k,sc){
  const s=K.bau();
  for(let i=0;i<5;i++){ const z=-13.5-i*.74; s.quader(AX-2.3,-.34,z-.72,AX+2.3,0,z,i%2?F.HOLZ:F.HELLHOLZ,{ raster:.75 }); }
  [-1,1].forEach(v=>{ s.klotz(.34,.34,3.8,F.HOLZ3,AX+v*2.05,-.5,-15.35,{ raster:.6 }); s.klotz(.3,.3,4.4,F.HOLZ3,AX+v*2.05,-2.1,-14.7,{ rx:.85, raster:.6 });
    /* Poller zum Festmachen, mit Ring und zwei Sandsäcken */
    s.klotz(.34,1.0,.34,F.HOLZ2,AX+v*2.05,.5,-14.3,{ raster:.3 }); s.klotz(.46,.16,.46,F.GOLD,AX+v*2.05,1.05,-14.3,{ glatt:true });
    [[-16.2,0],[-16.7,.04]].forEach(([z,y])=>{ s.klotz(.42,.4,.4,F.SAND,AX+v*1.9,.2+y,z,{ ry:.3*v, raster:.2 }); s.klotz(.2,.14,.2,0xc8a860,AX+v*1.9,.47+y,z,{ glatt:true }); }); });
  /* goldene Trittkante an der Lücke */
  s.platte(AX-2.3,-13.62,AX+2.3,-13.35,.016,F.GOLD,{ raster:.5 });
  s.fertig(sc);
  const bal=K.ballon(sc,AX,0,BZ);
  K.schloss(bal.tor,.55,.45,.2,.55);
  /* Huelle etwas kleiner (Unterkante bleibt), damit sie besser ins Bild passt */
  bal.huelle.scale.setScalar(.85); bal.huelle.position.y=3.2*.15;
  /* zwei Leinen vom Poller zum Korbrand, fallen beim Öffnen herunter */
  const leinen=[-1,1].map(v=>{ const p=V(AX+v*2.05,.98,-14.3), q=K.beweglich(sc,p.x,p.y,p.z); K.koerper(q,b=>{ for(let i=0;i<8;i++) b.klotz(.11,.125,.11,i%2?F.SAND:F.ROT,0,.0625+i*.125,0,{ glatt:true }); });
    return { q, v }; });
  const richte=u=>leinen.forEach(({q,v})=>{ const ex=v*-1.0*(1-u)+v*.12*u, ey=-.1*(1-u)-.92*u, ez=-.9*(1-u)+.75*u, l=Math.hypot(ex,ey,ez)||1; q.scale.y=l; q.quaternion.setFromUnitVectors(V(0,1,0),V(ex/l,ey/l,ez/l)); });
  richte(0);
  k.kasten(AX,BZ,2.4,2.4);
  let tuer=null, vorher=null;
  tuer=ausgang(k,{ name:'Großer Ballon', einfach:'Großer Ballon', steh:[AX+1.5,-11.4], durch:[AX,BZ-.3], hoch:3.2, warte:1.2, blick:{pitch:.4,zoom:1.55,hoehe:1.2}, treffer:{x:AX,y:2,z:-13.6,b:4,h:4,t:1}, schildOben:[AX,4.2,-12.8], glanz:[AX,1.6,-12.8],
    bewege:(auf,t)=>{
      const f=k.figur(), h=f&&f.position.y>0?f.position.y:0, dt=vorher===null?0:Math.min(.1,Math.max(0,t-vorher)); vorher=t;
      /* Türchen auf, die Figur geht hinein, beim Abheben schließt es wieder */
      bal.tor.rotation.y=Math.min(1,auf*1.6)*1.9*(1-weich(h/.9));
      bal.g.position.y=h; bal.g.position.x=AX; bal.flamme.scale.y=.8+auf*.7+Math.sin(t*12)*.15;
      richte(weich(auf/.7));
      /* Im Korb dreht sich die Figur nach vorn und winkt */
      if(h>.05){ const dreh=Math.atan2(Math.sin(f.rotation.y),Math.cos(f.rotation.y)); f.rotation.y=dreh*(1-Math.min(1,dt*7)); f.userData.armR.rotation.z=.18+weich(h/.8)*(2.27+Math.sin(t*9)*.3); }
    } });
  return tuer;
}

function baue(k){
  const sc=k.scene;
  const R=K.huelle(k,{ B,T,H, waende:false, hintergrund:HIMMEL, himmelLicht:0xf4f8ff, grund:0x8a7aa8, staerke:.74, sonne:0xfff0d0, sonneStaerke:.42, sonnenStand:[-10,24,12],
    boden:{ B,T, farben:MIX.turmboden, raster:1.5, weit:{ links:0, rechts:0, vorn:.5, hinten:0 }, aussen:0xcfe6ff, tief:-17, erde:L2 } });
  waende(k,R);
  ferne(k,sc);
  const tuer=baueAusgang(k,sc);
  ausstattung(k,sc);
  /* Tauben auf der Plattform und am Himmel, dazu die Pixelbiene */
  const t1=taube(k,sc,-3,0,1,0); laeufer(k,t1,[[-5,-1.5],[-1.5,-2.2],[-1,1.8],[-5.5,1.5]],.55,0,9);
  const t2=taube(k,sc,6,0,.85,2.4); laeufer(k,t2,[[5,-2],[8.6,-1],[7.4,2.2],[4,1]],.45,3,8);
  flieger(k,sc,-13,3.4,-19,6,2.6,.5,0,0xf8f8ff);
  flieger(k,sc,14,4.2,-20,6.5,3,.38,2.2,0xf8f8ff);
  flieger(k,sc,23,2.8,-3,2.4,8,.34,4.1,0xffe890);
  flieger(k,sc,-23,3.2,3,2.2,7,.42,1.1,0xa8e0ff);
  K.biene(k,sc,-5,1.8,-12.4,.9,{ runde:.7, tempo:.7 });
  flacker(k,AX-3.7,2.6,-11.7,0xffd890,.4,10); flacker(k,AX+3.9,2.6,-11.7,0xffd890,.4,10);
  return { tuer, start:[-.6,-5] };
}

/* ---------- Gegenstände: Reihenfolge = ort 1 bis 10 ---------- */
const gegenstaende=[
  { x:8.2, z:-8.4, steh:[7.8,-6.2], kasten:[3.0,2.0], treffer:[3.0,3.4,1.8], baue(g,k){ /* 1 Fernrohr auf dreibeinigem Holzstativ */
      K.koerper(g,b=>{ b.klotz(.16,1.95,.16,F.HOLZ2,-.45,.92,.22,{ rz:-.46, rx:-.12, raster:.4 }); b.klotz(.16,1.95,.16,F.HOLZ2,.45,.92,.22,{ rz:.46, rx:-.12, raster:.4 }); b.klotz(.16,1.95,.16,F.HOLZ3,0,.92,-.42,{ rx:.42, raster:.4 });
        [[-.88,.34],[.88,.34],[0,-.82]].forEach(([x,z])=>b.klotz(.3,.12,.3,F.GOLD,x,.06,z,{ glatt:true })); b.klotz(.44,.3,.44,F.GOLD,0,1.9,0); b.klotz(.18,.3,.18,F.DUNKEL,0,2.12,0,{ glatt:true }); });
      const r=K.beweglich(g,0,2.4,0);
      K.koerper(r,b=>{ const A=-.42, c=Math.cos(A), s=Math.sin(A), teil=(u,l,d,f)=>{ b.klotz(l,d,d*.72,f,u*c,u*s,0,{ rz:A, raster:.35 }); b.klotz(l*.98,d*.72,d,f,u*c,u*s,0,{ rz:A, raster:.35 }); };
        teil(-1.1,.8,.82,0x4a5ac8); teil(-1.52,.16,.96,F.GOLD); teil(-.68,.14,.9,F.GOLD); teil(-.05,1.15,.62,0x5a70e0); teil(.58,.14,.7,F.GOLD); teil(.95,.6,.42,0x4a5ac8); teil(1.34,.2,.54,F.DUNKEL);
        b.klotz(.06,.62,.62,0xbff0ff,-1.63*c,-1.63*s,0,{ rz:A, glatt:true }); b.klotz(.04,.18,.18,0xffffff,-1.67*c,-1.67*s+.12,.16,{ rz:A, glatt:true });
        b.klotz(.5,.2,.2,F.GOLD,.1*c,.1*s+.46,0,{ rz:A, glatt:true }); });
      k.anim.push(t=>{ r.rotation.y=Math.sin(t*.45)*.16; });
    } },
  { x:14.0, z:-3.6, dreh:-.3, steh:[11.9,-3.0], r:1.0, treffer:[2.9,4.0,1.4], baue(g,k){ /* 2 Windrad: vier bunte Flügel, die sich drehen */
      K.koerper(g,b=>{ b.klotz(1.1,.3,1.1,F.GRAU2,0,.15,0,{ raster:.4 }); b.klotz(.7,.25,.7,F.GRAU,0,.42,0); b.klotz(.2,2.3,.2,F.HOLZ2,0,1.65,-.08,{ raster:.4 }); });
      const w=K.beweglich(g,0,2.65,.14);
      K.koerper(w,b=>{ [F.ROT,F.BLAU,F.GELB,F.GRUEN].forEach((c,i)=>{ const a=i*Math.PI/2, co=Math.cos(a), si=Math.sin(a);
          [[.3,.2,.44,.4],[.72,.34,.44,.68],[1.14,.44,.44,.88]].forEach(([u,v,l,h],j)=>b.klotz(l,h,.1,c,u*co-v*si,u*si+v*co,j*.005,{ rz:a, raster:.3 }));
          b.klotz(1.3,.09,.12,F.CREME,.68*co,.68*si,.07,{ rz:a, glatt:true }); });
        b.klotz(.4,.4,.2,F.GOLD,0,0,.14,{ glatt:true }); b.klotz(.18,.18,.14,F.WEISS,0,0,.27,{ glatt:true }); });
      k.anim.push(t=>{ w.rotation.z=-t*1.6; });
    } },
  { x:-12.2, z:5.2, dreh:.25, steh:[-11.6,7.3], kasten:[2.8,1.9], treffer:[2.6,2.3,1.7], baue(g,k){ /* 3 Schatztruhe: lila Truhe mit Goldbändern, Deckel leicht offen */
      K.koerper(g,b=>{ [-.9,.9].forEach(x=>[-.45,.45].forEach(z=>b.klotz(.34,.18,.34,F.GOLD,x,.09,z))); b.klotz(2.3,.95,1.3,0xa888e8,0,.65,0,{ raster:.38 });
        [-.86,.86].forEach(x=>b.klotz(.2,1.0,1.38,F.GOLD,x,.66,0,{ raster:.25 })); b.klotz(2.38,.14,1.38,F.GOLD,0,1.14,0); b.klotz(2.36,.12,1.36,0x7a5ab8,0,.24,0);
        b.klotz(.62,.58,.1,F.GOLD,0,.82,.68,{ glatt:true }); b.klotz(.16,.16,.04,F.SCHWARZ,0,.9,.74,{ glatt:true }); b.klotz(.08,.2,.04,F.SCHWARZ,0,.74,.74,{ glatt:true }); });
      K.koerper(g,b=>{ for(let i=0;i<22;i++) b.klotz(.24,.09,.24,i%3?F.GELB:0xfff0a0,-.9+(i%8)*.26,1.24+(i%3)*.05,-.35+Math.floor(i/8)*.34,{ ry:i*.8, glatt:true }); },{ leuchtet:true });
      const d=K.beweglich(g,0,1.22,-.66);
      K.koerper(d,b=>{ b.klotz(2.34,.26,1.34,0xb8a0f0,0,.14,.66,{ raster:.38 }); b.klotz(2.2,.22,1.04,0xa888e8,0,.37,.66,{ raster:.38 }); b.klotz(2.05,.16,.66,0xb8a0f0,0,.54,.66,{ raster:.38 });
        [-.86,.86].forEach(x=>{ b.klotz(.22,.3,1.4,F.GOLD,x,.15,.66); b.klotz(.22,.24,1.1,F.GOLD,x,.38,.66); b.klotz(.22,.18,.72,F.GOLD,x,.56,.66); }); b.klotz(.34,.3,.1,F.GOLD,0,.1,1.35,{ glatt:true }); });
      schein(g,'rgba(255,225,120,.45)',0,1.4,.4,1.6);
      k.anim.push(t=>{ d.rotation.x=-.42-Math.sin(t*1.2)*.07; });
    } },
  { x:4.4, z:6.4, dreh:-.18, steh:[4.0,8.6], kasten:[2.6,2.0], treffer:[2.4,1.7,1.7], baue(g){ /* 4 Ballonkorb: kleiner Ersatzkorb am Boden, ohne Hülle, mit gefaltetem Stoff */
      K.koerper(g,b=>{ b.klotz(1.7,.14,1.3,F.HOLZ3,0,.07,0,{ raster:.4 });
        for(let j=0;j<4;j++) for(let i=0;i<6;i++){ const c=(i+j)%2?0xc08a44:0xe0ac60, x=-.7+i*.28; [-1,1].forEach(v=>b.klotz(.28,.2,.16,c,x,.24+j*.2,v*.6,{ glatt:true })); }
        for(let j=0;j<4;j++) for(let i=0;i<4;i++){ const c=(i+j)%2?0xe0ac60:0xc08a44; [-1,1].forEach(v=>b.klotz(.16,.2,.27,c,v*.78,.24+j*.2,-.4+i*.27,{ glatt:true })); }
        [-1,1].forEach(v=>{ b.klotz(1.86,.15,.24,F.HOLZ2,0,.99,v*.61); b.klotz(.24,.15,1.0,F.HOLZ2,v*.8,.99,0); });
        [-1,1].forEach(s=>[-1,1].forEach(v=>b.klotz(.12,.4,.12,F.HOLZ3,s*.8,1.2,v*.61,{ glatt:true })));
        /* zerknitterte Ballonhülle: unregelmäßiger Haufen aus schiefen Stofffetzen in Rot und Gelb */
        [[-.52,1.08,-.24,.5,.2,.4,.3,.2,.45],[-.1,1.22,-.3,.42,.3,.34,-.4,.9,-.3],[.34,1.1,-.22,.56,.18,.38,.2,-.6,.35],[.58,1.02,.14,.3,.24,.42,-.3,.4,-.55],[-.34,1.32,.06,.36,.34,.3,.5,.5,.6],
          [.1,1.46,-.04,.46,.22,.36,-.25,-.3,-.45],[.38,1.28,.2,.28,.3,.3,.6,1.1,.5],[-.62,1.12,.24,.34,.16,.3,-.5,.7,-.25],[-.04,1.18,.3,.52,.22,.26,.35,-.9,.2],[.14,1.62,-.14,.2,.18,.22,.7,.6,.8],[-.18,1.5,-.18,.28,.12,.2,-.6,1.4,.3]]
          .forEach(([x,y,z,w,h,d,rx,ry,rz],i)=>b.klotz(w,h,d,[F.ROT,F.GELB,F.ROT,F.ROT2][i%4],x,y,z,{ rx, ry, rz, glatt:true, jitter:.09 }));
        /* ein langer Zipfel rutscht vorn über den Rand bis auf den Boden */
        [[-.18,1.16,.5,.5,.12,.34,.45,.3,.2,F.ROT],[-.4,1.04,.75,.36,.16,.22,.9,-.4,.35,F.GELB],[-.46,.78,.8,.27,.34,.1,.15,.2,-.4,F.ROT],[-.64,.52,.83,.4,.3,.09,-.2,-.3,.7,F.ROT],[-.7,.27,.88,.24,.32,.11,-.45,.5,.15,F.GELB],[-.94,.09,1.0,.5,.12,.3,.2,.7,-.2,F.ROT],[-1.22,.07,.9,.26,.09,.22,-.3,-.5,.25,F.GELB]]
          .forEach(([x,y,z,w,h,d,rx,ry,rz,c])=>b.klotz(w,h,d,c,x,y,z,{ rx, ry, rz, glatt:true, jitter:.07 }));
        /* aufgerolltes Seil neben dem Korb */
        [0,1].forEach(j=>{ for(let i=0;i<10;i++){ const a=i*Math.PI/5+j*.3; b.klotz(.24,.1,.12,j?0xc8a860:F.SAND,1.2+Math.sin(a)*.3,.06+j*.1,.35+Math.cos(a)*.3,{ ry:a, glatt:true }); } }); });
    } },
  { x:11.6, z:-13.5, wand:'hinten', steh:[11.4,-11.2], kasten:[3.8,1.0], treffer:[3.7,2.9,.8], trefferY:1.1, baue(g,k){ /* 5 Himmelskarte: dunkelblaue Karte mit Sternbildern und Mond im Goldrahmen */
      K.koerper(g,b=>{ b.klotz(3.5,2.6,.14,F.GOLD,0,2.55,.14,{ raster:.4 }); [-1,1].forEach(s=>[-1,1].forEach(t=>b.klotz(.34,.34,.12,0xffe480,s*1.66,2.55+t*1.2,.24,{ glatt:true }))); },{ schatten:false });
      K.koerper(g,b=>{ b.klotz(3.08,2.18,.06,0x1d2a5a,0,2.55,.22,{ glatt:true, jitter:.01 });
        const sterne=[[-1.25,3.2],[-.8,2.9],[-.35,3.15],[.05,2.65],[-1.0,1.9],[-.45,1.75],[-.2,2.2],[.55,1.85],[1.15,2.05],[.9,1.65]];
        [[0,1],[1,2],[2,3],[4,5],[5,6],[6,4],[7,8],[7,9]].forEach(([a,c])=>{ const p=sterne[a], q=sterne[c], dx=q[0]-p[0], dy=q[1]-p[1]; b.klotz(Math.hypot(dx,dy),.035,.02,0x8ab0ff,(p[0]+q[0])/2,(p[1]+q[1])/2,.26,{ rz:Math.atan2(dy,dx), glatt:true }); });
        sterne.forEach(([x,y],i)=>{ b.klotz(.17,.17,.04,i%3?0xffe066:0xffffff,x,y,.27,{ glatt:true }); b.klotz(.11,.11,.03,i%3?0xffe066:0xffffff,x,y,.28,{ rz:Math.PI/4, glatt:true }); });
        b.pixel('..mmm|.mm..|mm...|mm...|.mm..|..mmm',.13,{ m:0xfff4c0 },.95,2.5,.27,.04,{ glatt:true });
        [[-1.3,2.4],[.45,3.35],[1.35,1.7],[-.75,2.45],[.35,2.2],[-1.35,1.65]].forEach(([x,y])=>b.klotz(.06,.06,.03,0xffffff,x,y,.26,{ glatt:true })); },{ leuchtet:true });
      const f=K.beweglich(g,.4,2.95,.3); K.koerper(f,b=>b.klotz(.2,.2,.03,0xffffff,0,-.05,0,{ rz:Math.PI/4, glatt:true }),{ leuchtet:true });
      k.anim.push(t=>{ const s=.75+Math.sin(t*3)*.3; f.scale.set(s,s,1); });
    } },
  { x:-11.0, z:-13.5, wand:'hinten', steh:[-10.8,-11.2], kasten:[3.8,1.0], treffer:[3.6,3.5,.8], trefferY:.8, baue(g,k){ /* 6 Turmfahne: großes türkises Tuch an einer Querstange mit runden Goldknöpfen */
      K.koerper(g,b=>{ b.klotz(3.3,.2,.2,F.HOLZ2,0,4.0,.3,{ raster:.4 }); [-1,1].forEach(s=>{ b.klotz(.38,.38,.3,F.GOLD,s*1.7,4.0,.3,{ glatt:true }); b.klotz(.3,.3,.4,F.GOLD,s*1.7,4.0,.3,{ glatt:true }); b.klotz(.2,.2,.3,F.GRAU2,s*1.15,4.0,.1,{ glatt:true }); }); },{ schatten:false });
      const muster=['gggggggggg','gggggggggg','ggggwwgggg','gggwwwwggg','ggwwwwwwgg','gggwwwwggg','ggggwwgggg','yyyyyyyyyy','gggg..gggg','ggg....ggg','gg......gg'], s=.26;
      const bahnen=[0,1,2,3].map(n=>{ const q=K.beweglich(g,0,3.9-n*.72,.3); return q; });
      muster.forEach((z,j)=>{ const n=Math.min(3,Math.floor(j*s/.72)), q=bahnen[n]; (q.zeilen||(q.zeilen=[])).push([z,j]); });
      bahnen.forEach((q,n)=>{ const b=K.bau(); (q.zeilen||[]).forEach(([z,j])=>{ for(let i=0;i<z.length;i++){ if(z[i]==='.') continue; const rand=i===0||i===z.length-1; b.klotz(s,s,.08,z[i]==='w'?F.WEISS:(z[i]==='y'||rand)?F.GELB:F.TUERKIS,(i-4.5)*s,-(j+.5)*s+n*.72,0,{ glatt:true }); } }); b.fertig(q,{ schatten:false }); });
      k.anim.push(t=>{ bahnen.forEach((q,n)=>{ q.position.z=.3+Math.sin(t*2-n*.9)*.025*n; q.position.x=Math.sin(t*1.3-n*.8)*.02*n; }); });
    } },
  { x:12.4, z:4.2, dreh:-.2, steh:[10.4,5.4], r:1.2, treffer:[2.3,2.5,2.3], baue(g,k){ /* 7 Sonnenuhr: runde Steinscheibe mit Stundenklötzen, goldenem Zeiger und Schatten, hinten eine Sonne */
      K.koerper(g,b=>{ const acht=(w,h,y,c)=>{ b.klotz(w,h,w*.55,c,0,y,0,{ raster:.4 }); b.klotz(w*.55,h*.99,w,c,0,y,0,{ raster:.4 }); b.klotz(w*.8,h*.98,w*.8,c,0,y,0,{ raster:.4 }); };
        acht(1.5,.22,.11,0xb8b0c8); b.klotz(.75,.9,.75,0xd0c8dc,0,.66,0,{ raster:.3 }); acht(1.15,.16,1.18,0xb8b0c8); acht(2.2,.22,1.36,0xf0e8d8);
        for(let i=0;i<12;i++){ const a=i*Math.PI/6; b.klotz(i%3?.09:.14,.05,i%3?.2:.3,F.HOLZ3,Math.sin(a)*.86,1.49,Math.cos(a)*.86,{ ry:a, glatt:true }); }
        /* Zeiger als gestufte goldene Scheibe */
        [[.55,.16,-.18],[.4,.32,-.26],[.27,.48,-.32],[.15,.64,-.38]].forEach(([t,y,z])=>b.klotz(.12,.17,t,F.GOLD,0,1.39+y,z,{ glatt:true })); b.klotz(.2,.2,.2,0xffe480,0,2.14,-.4,{ glatt:true });
        /* große Sonne mit Gesicht und Strahlen, steht hinten auf der Scheibe */
        b.pixel('....o....|.o..o..o.|..oyyyo..|..ydydy..|ooyyyyyoo|..ydddy..|..oyyyo..|.o..o..o.|....o....',.12,{ y:F.GELB, o:F.ORANGE, d:F.HOLZ3 },0,1.47,-.98,.14,{ glatt:true }); });
      const s=K.beweglich(g,0,1.485,0); K.koerper(s,b=>b.platte(-.07,0,.07,.7,0,0x6a6078,{ glatt:true }),{ schatten:false });
      k.anim.push(t=>{ s.rotation.y=Math.sin(t*.2)*1.2; });
    } },
  { x:-14.4, z:-2.8, dreh:.3, steh:[-12.3,-2.4], r:1.15, treffer:[2.2,2.5,2.0], baue(g,k){ /* 8 Vogelnest aus Zweigen auf einem Baumstumpf, mit drei blauen Eiern und Vogel */
      K.koerper(g,b=>{ b.klotz(1.0,1.0,1.0,F.HOLZ2,0,.5,0,{ raster:.3 }); [[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,c])=>b.klotz(.45,.24,.45,F.HOLZ3,a*.6,.12,c*.6));
        b.klotz(1.5,.14,1.5,0x8a6030,0,1.07,0,{ raster:.25 });
        for(let j=0;j<3;j++) for(let i=0;i<12;i++){ const a=i*Math.PI/6+j*.27, r=.78+j*.06; b.klotz(.58,.14,.18,[0xa07040,0x8a5a2c,0xc09050][(i+j)%3],Math.sin(a)*r,1.16+j*.13,Math.cos(a)*r,{ ry:a+(i%2?.28:-.28), glatt:true }); }
        });
      /* drei Eier: unten breit, nach oben schmaler, leicht schief ins Nest gelegt, mit Sprenkeln */
      [[-.32,.14,.32,0x8accf4],[.22,.28,-.38,0xfaf0dc],[.02,-.27,-.12,0x8accf4]].forEach(([x,z,nei,c],i)=>{ const ei=gruppe(g,x,1.36,z); ei.rotation.z=nei; ei.rotation.x=(i-1)*.22;
        ball(ei,.2,c,0,.1,0,1,1.15,1); ball(ei,.15,c,0,.24,0,1,1.35,1);
        [[-.07,.16,.18],[.09,.06,.17],[.04,.3,.13]].forEach(([a,y,d])=>ball(ei,.026,0xa07850,a,y,d)); });
      const v=K.beweglich(g,.7,1.56,-.1);
      K.koerper(v,b=>{ b.klotz(.46,.36,.38,F.ORANGE,0,.2,0,{ glatt:true }); b.klotz(.34,.32,.32,F.ORANGE,-.12,.5,.04,{ glatt:true }); b.klotz(.26,.18,.3,F.CREME,-.12,.16,.08,{ glatt:true }); b.klotz(.18,.09,.12,F.GELB,-.36,.47,.04,{ glatt:true }); [-1,1].forEach(s=>b.klotz(.06,.08,.04,F.SCHWARZ,-.2,.56,.04+s*.17,{ glatt:true })); b.klotz(.26,.14,.22,0xc86a28,.34,.28,0,{ glatt:true }); [-1,1].forEach(s=>b.klotz(.28,.2,.07,0xc86a28,.04,.24,s*.22,{ glatt:true })); });
      k.anim.push(t=>{ v.position.y=1.56+Math.max(0,Math.sin(t*2.3))*Math.abs(Math.sin(t*9))*.12; v.rotation.y=Math.sin(t*.8)*.35; });
    } },
  Object.assign({ x:-5.4, z:-8.6, steh:[-5.0,-6.4] }, KLOTZ.NEU.turmglocke),
  Object.assign({ x:-15.2, z:9.0, steh:[-13.2,9.8] }, KLOTZ.NEU.drachen)
];

/* Verstecke für den Edelstein */
const verstecke=[[-14,-7.8],[-8.4,-5],[-2.4,-8.6],[-3.6,-11.2],[5.2,-9.6],[11,-7.4],[15.4,-9],[15.4,-1.2],[9,-3.8],[15,2.4],
  [13.8,10],[8.2,9.4],[1,9.6],[-4.6,8.8],[-9.4,10.6],[-15.4,6.2],[-9.6,1.4],[-15.4,.4],[2.6,3.4],[-7.6,4.8]];

return { titel:'Der Turm über den Wolken', breite:B, tiefe:T, himmel:HIMMEL, baue, gegenstaende, verstecke };
})();

/* Schlussbild Klötzchenwelt: Der bunte Ballon startet mit der Spielfigur am Turm, fliegt in einem Bogen über die Block-Landschaft
   (Höhleneingang, Blockhaus, Brücke über die Schlucht, Werkstatt mit Kran) und schwebt dann vorn über der Brücke.
   Block-Tiere hüpfen und winken, dazu Klötzchen-Konfetti und Wolken. Ohne Schrift. */
FINALE3D.kloetzchenwelt = function(k,kamera,figur){
  const sc=k.scene, K=KLOTZ, F=K.F, MIX=K.MIX;
  if(!k.anim) k.anim=[];
  const HIMMEL=0xa8dcff;
  sc.background=new THREE.Color(HIMMEL);
  sc.fog=new THREE.Fog(HIMMEL,48,105);
  sc.add(new THREE.HemisphereLight(0xfff6e4,0x6a7a58,.74));
  const sonne=new THREE.DirectionalLight(0xffecc8,.5); sonne.position.set(-10,26,15); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const sk=sonne.shadow.camera; sk.left=-26; sk.right=26; sk.top=22; sk.bottom=-20; sk.near=1; sk.far=70; sonne.shadow.bias=-.001; sc.add(sonne);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D(), FARBE=new THREE.Color();
  const BUNT=[F.ROT,F.GELB,F.BLAU,F.HELLGRUEN,F.LILA,F.ORANGE,F.TUERKIS,F.ROSA];

  /* Schlucht: von z=SA bis z=SE, über die ganze Breite */
  const SA=1, SE=5;

  /* ---------- Wiese, Wege und Schlucht ---------- */
  K.boden(k,{ B:40, T:30, farben:MIX.gras, raster:1.6, weit:{ links:70, rechts:70, vorn:22, hinten:48 }, loecher:[[-100,SA,100,SE]], aussen:false });
  K.koerper(sc,b=>{
    const weg=(x1,z1,x2,z2)=>{ const n=Math.ceil(Math.hypot(x2-x1,z2-z1)/.9); for(let i=0;i<=n;i++){ const u=i/n, x=misch(x1,x2,u), z=misch(z1,z2,u); b.platte(x-.62,z-.46,x+.62,z+.46,.012+(i%3)*.002,K.wahl(MIX.pflaster),{ raster:.5 }); } };
    weg(0,.5,0,-4); weg(0,-4,-5,-6); weg(-5,-6,-9.3,-10.2); weg(-5,-6,-8.8,.2); weg(-8.8,.4,-13,.5); weg(0,-4,5,-6); weg(5,-6,9.5,-10.4); weg(5,-6,11.5,-.8); weg(0,5.5,0,14);
  },{ schatten:false });
  K.koerper(sc,b=>{
    for(let x=-90;x<90;x+=2){ b.quader(x,-3.2,SA-.5,x+2,-1.6,SA+.05,K.wahl(MIX.fels)); b.quader(x,-1.6,SA-.4,x+2,-.55,SA,F.ERDE); b.quader(x,-.55,SA-.4,x+2,-.01,SA+.02,K.wahl([0x8a5a30,0x7a4c28]));
      b.quader(x,-3.2,SE,x+2,-.01,SE+.4,K.wahl(MIX.fels));
      if((x/2)%3===0) b.klotz(.7,.5,.5,K.wahl(MIX.fels),x+zufall(),-1.9,SA+.2); }
  },{ schatten:false });
  const wasser=K.beweglich(sc,0,0,0);
  K.koerper(wasser,b=>{ for(let x=-90;x<90;x+=2) for(let j=0;j<2;j++) b.platte(x,SA+j*2,x+2,SA+j*2+2,-2.3,K.wahl([0x3aa0e8,0x4ab0f0,0x5cc0f4]),{ raster:.7 });
    for(let i=0;i<40;i++){ const x=-40+i*2.05, z=SA+.6+zufall()*2.8; b.platte(x,z,x+.7,z+.12,-2.28,0xe0f8ff,{ glatt:true }); } },{ leuchtet:true });
  k.anim.push(t=>{ wasser.position.x=Math.sin(t*.7)*.5; });

  /* ---------- Brücke aus bunten Klötzen ---------- */
  K.koerper(sc,b=>{
    for(let i=0;i<8;i++){ const z=SA-.35+i*.67; b.quader(-1.7,-.45,z,1.7,.08,z+.65,BUNT[i%BUNT.length],{ raster:.55 }); }
    [-1,1].forEach(s=>{ for(let i=0;i<5;i++){ const z=SA-.1+i*1.05; b.klotz(.3,.8,.3,F.HOLZ2,s*1.75,.45,z); b.klotz(.38,.16,.38,F.GELB,s*1.75,.93,z); } b.quader(s*1.75-.08,.55,SA-.1,s*1.75+.08,.7,SE+.1,F.HELLHOLZ); });
    [[-.9,SA+.8],[.9,SE-.8]].forEach(([x,z])=>b.quader(x-.25,-2.6,z-.25,x+.25,-.45,z+.25,F.HOLZ3,{ raster:.5 }));
  });

  /* ---------- Blockhaus links ---------- */
  K.koerper(sc,b=>{
    const X=-13, Z=-2.4, W=5.6, T=3.8, H=3;
    b.quader(X-W/2-.2,0,Z-T/2-.2,X+W/2+.2,.3,Z+T/2+.2,F.STEIN);
    for(let j=0;j<6;j++) b.quader(X-W/2,.3+j*.45,Z-T/2,X+W/2,.75+j*.45,Z+T/2,j%2?0xc98a4c:0xa86c38,{ raster:.7 });
    [-1,1].forEach(s=>[-1,1].forEach(t=>b.quader(X+s*W/2-.22,0,Z+t*T/2-.22,X+s*W/2+.22,H+.1,Z+t*T/2+.22,F.HOLZ3,{ raster:.45 })));
    /* Stufendach */
    for(let i=0;i<5;i++) b.quader(X-W/2-.5+i*.12,H+i*.5,Z-T/2-.5+i*.5,X+W/2+.5-i*.12,H+(i+1)*.5,Z+T/2+.5-i*.5,i%2?F.ROT:0xc83a48,{ raster:.6 });
    b.quader(X+1.4,H+.8,Z-1,X+2.2,H+2.9,Z-.3,F.STEIN,{ raster:.4 }); b.quader(X+1.3,H+2.9,Z-1.1,X+2.3,H+3.15,Z-.2,F.GRAU2);
    /* Tür */
    b.quader(X-.65,.3,Z+T/2,X+.65,2.35,Z+T/2+.14,F.HOLZ3); b.quader(X-.5,.3,Z+T/2+.1,X+.5,2.2,Z+T/2+.2,F.HOLZ,{ raster:.35 }); b.klotz(.16,.16,.12,F.GOLD,X+.28,1.2,Z+T/2+.24,{ glatt:true });
    b.quader(X-.9,0,Z+T/2+.2,X+.9,.18,Z+T/2+.8,F.GRAU);
    /* Fensterrahmen und Blumenkästen */
    [-1.75,1.75].forEach(d=>{ b.quader(X+d-.7,1.05,Z+T/2,X+d+.7,2.4,Z+T/2+.1,F.WEISS); b.quader(X+d-.75,.8,Z+T/2,X+d+.75,1.05,Z+T/2+.35,F.HOLZ2);
      for(let i=0;i<4;i++) b.klotz(.22,.22,.2,BUNT[(i*3+1)%BUNT.length],X+d-.5+i*.33,1.14,Z+T/2+.25,{ glatt:true }); });
  });
  K.koerper(sc,b=>{ [-1.75,1.75].forEach(d=>{ [-.3,.3].forEach(e=>[1.43,2.02].forEach(y=>b.klotz(.52,.5,.04,0xffe890,-13+d+e,y,-2.4+1.9+.12,{ glatt:true }))); }); },{ leuchtet:true });
  const NR=7, rauch=new THREE.InstancedMesh(GEO.box,basis(0xffffff,{ transparent:true, opacity:.8, depthWrite:false }),NR); rauch.frustumCulled=false; sc.add(rauch);

  /* ---------- Höhleneingang hinten links ---------- */
  const HX=-9.4, HZ=-13.6;
  K.koerper(sc,b=>{
    const fels=()=>K.wahl(MIX.stein);
    /* Felsberg aus Stufen, vorn die Öffnung */
    for(let j=0;j<6;j++){ const br=4.2-j*.52, y=j*.9; const n=Math.max(2,Math.round(br*2/1.05)), w=br*2/n;
      for(let i=0;i<n;i++){ const x=-br+(i+.5)*w; if(j<3 && Math.abs(x)<1.7) continue; const vor=(i*3+j*5)%4*.16;
        b.quader(HX+x-w/2,y,HZ-3+j*.3,HX+x+w/2,y+.9+((i+j)%3)*.08,HZ+1.2-j*.28+vor,fels(),{ raster:.9 }); } }
    b.quader(HX-2.15,0,HZ-3,HX+2.15,2.7,HZ-1.6,0x1c1830,{ raster:1 });
    b.quader(HX-1.9,2.45,HZ-1.7,HX-1.1,2.75,HZ+.9,fels()); b.quader(HX+1.1,2.45,HZ-1.7,HX+1.9,2.75,HZ+.9,fels());
    [[-3.9,1.6,.9],[3.8,1.5,1.2],[-2.4,.7,1.9],[2.7,.6,2.1]].forEach(([x,s,z])=>b.klotz(s,s*.7,s,fels(),HX+x,s*.35,HZ+z,{ ry:x }));
  });
  K.koerper(sc,b=>{ K.kristall(b,HX-1.9,.1,HZ+1.5,1.0,F.KRIST,.3); K.kristall(b,HX-2.5,.1,HZ+1.8,.65,F.PINK,.5); K.kristall(b,HX+1.9,.1,HZ+1.5,.95,F.PINK,-.3); K.kristall(b,HX+2.5,.1,HZ+1.9,.6,F.KRIST,-.5);
    K.kristall(b,HX-.6,0,HZ-1.2,.7,F.KRIST,.15); K.kristall(b,HX+.5,0,HZ-1.3,.55,F.LIME,-.2); K.kristall(b,HX+.3,4.5,HZ-.1,.6,F.KRIST,-.3); },{ leuchtet:true });

  /* ---------- Werkstatt rechts mit gelbem Kran ---------- */
  K.koerper(sc,b=>{
    const X=12.3, Z=-2.6;
    b.quader(X-2.9,0,Z-2,X+2.9,.15,Z+1.7,F.GRAU);
    b.quader(X-2.7,.15,Z-1.8,X+2.7,3,Z-1.45,0xf2e2b8,{ raster:.8 });
    [-1,1].forEach(s=>{ b.quader(X+s*2.7-.18,0,Z+1.1,X+s*2.7+.18,3,Z+1.46,F.HOLZ2,{ raster:.5 }); b.quader(X+s*2.7-.18,0,Z-1.8,X+s*2.7+.18,3,Z-1.44,F.HOLZ2); });
    for(let i=0;i<4;i++) b.quader(X-3.2,3+i*.28,Z-2.2+i*.35,X+3.2,3.3+i*.28,Z+1.8-i*.55,i%2?F.TUERKIS:0x2a9a92,{ raster:.6 });
    /* Werkbank, Bauplan, Werkzeugleiste, Klötze */
    b.quader(X-1.9,.9,Z-.3,X+.7,1.15,Z+.7,F.HOLZ,{ raster:.4 }); [-1.7,.5].forEach(d=>b.quader(X+d-.12,.15,Z-.15,X+d+.12,.9,Z+.55,F.HOLZ3));
    b.quader(X-1.5,1.15,Z-.1,X-.5,1.2,Z+.55,F.HELLBLAU,{ glatt:true }); [[0,F.ROT],[.45,F.GELB]].forEach(([d,c])=>b.klotz(.34,.34,.34,c,X-.1+d,1.32,Z+.2));
    b.quader(X-1.8,1.5,Z-1.46,X+.2,2.5,Z-1.35,F.BLAU); [[-1.4,1.8],[-.8,2.1],[-.2,1.8]].forEach(([d,y])=>b.klotz(.34,.5,.05,F.WEISS,X+d,y,Z-1.32,{ glatt:true }));
    [[1.5,.5,0,F.ROT],[2.2,.5,0,F.BLAU],[1.85,1.2,0,F.GELB],[1.9,.5,.9,F.HELLGRUEN]].forEach(([d,y,z,c])=>b.klotz(.68,.68,.68,c,X+d,y,Z+z,{ raster:.34 }));
  });
  const KX=16.6, KZ=-4;
  K.koerper(sc,b=>{
    b.quader(KX-.9,0,KZ-.9,KX+.9,.5,KZ+.9,F.GRAU2,{ raster:.45 });
    for(let i=0;i<10;i++) b.klotz(.55,.7,.55,i%2?F.GELB:F.GOLD,KX,.85+i*.7,KZ);
    b.quader(KX-5.6,7.5,KZ-.25,KX+1.7,7.95,KZ+.25,F.GELB,{ raster:.5 }); b.quader(KX+1,6.8,KZ-.5,KX+2,7.5,KZ+.5,F.GRAU2,{ raster:.35 });
    b.quader(KX-.55,6.5,KZ+.1,KX+.55,7.5,KZ+.75,F.ROT); b.quader(KX-.4,6.7,KZ+.72,KX+.4,7.25,KZ+.8,F.HELLBLAU,{ glatt:true });
    b.klotz(.4,.7,.4,F.GOLD,KX,8.25,KZ); b.klotz(.3,.3,.3,F.ROT,KX,8.75,KZ);
  });
  const haken=K.beweglich(sc,KX-4.9,7.5,KZ);
  K.koerper(haken,b=>{ b.quader(-.05,-2.1,-.05,.05,0,.05,F.DUNKEL,{ glatt:true }); b.klotz(.34,.24,.34,F.GRAU2,0,-2.15,0); b.klotz(1.1,.9,.9,F.BLAU,0,-2.75,0,{ raster:.35 }); [-.28,.28].forEach(x=>b.klotz(.3,.14,.3,0x78aef4,x,-2.23,0)); });
  k.anim.push(t=>{ haken.rotation.z=Math.sin(t*1.4)*.1; haken.position.x=KX-4.5+Math.sin(t*.45)*.8; });

  /* ---------- Turm hinten rechts ---------- */
  const TX=9.6, TZ=-13.6;
  K.koerper(sc,b=>{
    b.quader(TX-2.1,0,TZ-2.1,TX+2.1,.5,TZ+2.1,F.STEIN,{ raster:.7 });
    for(let j=0;j<10;j++) b.quader(TX-1.6,.5+j*.65,TZ-1.6,TX+1.6,1.15+j*.65,TZ+1.6,K.wahl(MIX.turm),{ raster:.8 });
    b.quader(TX-2.1,7,TZ-2.1,TX+2.1,7.45,TZ+2.1,F.LILA,{ raster:.6 });
    for(let i=-2;i<=2;i+=2) for(let l=-2;l<=2;l+=2) if(i||l) b.klotz(.75,.7,.75,0xe4dcf0,TX+i*.85,7.8,TZ+l*.85);
    b.quader(TX-.7,.5,TZ+1.6,TX+.7,2.3,TZ+1.72,F.HOLZ3); b.quader(TX-.55,.5,TZ+1.68,TX+.55,2.15,TZ+1.78,F.HOLZ,{ raster:.35 });
    [3.7,5.7].forEach(y=>{ b.klotz(1.0,1.15,.14,F.LILA,TX,y,TZ+1.62); b.klotz(.68,.85,.1,0x3a3458,TX,y,TZ+1.7,{ glatt:true }); });
    b.quader(TX+1.52,7.45,TZ-.08,TX+1.68,9.5,TZ+.08,F.HOLZ3); b.klotz(.32,.32,.32,F.GOLD,TX+1.6,9.65,TZ);
  });
  const fahne=[0,1,2,3].map(i=>{ const q=K.beweglich(sc,TX+1.9+i*.42,8.95,TZ); K.koerper(q,b=>{ b.klotz(.43,.42,.1,F.ROT,0,.2,0); b.klotz(.43,.42,.1,F.GELB,0,-.21,0); },{ schatten:false }); return q; });
  k.anim.push(t=>fahne.forEach((q,i)=>{ q.position.z=TZ+Math.sin(t*4-i*.9)*.1*(i+1)*.6; q.position.y=8.95+Math.sin(t*3-i)*.04*i; }));

  /* ---------- Bäume, Büsche, Blumen, Zäune ---------- */
  K.koerper(sc,b=>{
    [[-19.5,-8,1.15],[-4.6,-19,1],[4,-20,1.15],[-16.5,-18,1.2],[16,-17,1.2],[-21,-1.8,1],[22,-1,1.1],[21,-10,1.25],[-25,-14,1.3],[-1,-25,1.2]].forEach(([x,z,g],i)=>K.baum(b,x,z,{ gr:g, hoch:1.8+(i%3)*.35, aepfel:i%3===0 }));
    for(let i=0;i<34;i++){ const s=i%2?1:-1, x=s*(23+zufall()*30), z=zufall()<.78?-3-zufall()*30:7+zufall()*8; if(z>0) K.busch(b,x,z,.9+zufall()*.6); else K.baum(b,x,z,{ gr:.9+zufall()*.5, hoch:1.6+zufall()*1.2, aepfel:false }); }
    [[-8,-7],[-3.4,-11],[3.6,-11.5],[7.4,-7],[-17,.1],[18.6,.1],[-4,-.1],[3.8,-.2],[6,-16],[-15,-9],[14,-9]].forEach(([x,z])=>K.busch(b,x,z,.9));
    [[-12,6.3],[13,6.2],[-17,8],[18,8.4],[-3.6,12.4],[4.4,12],[-9,11.5],[10,11]].forEach(([x,z])=>K.busch(b,x,z,.62));
  });
  K.koerper(sc,b=>{
    const FARBEN=[F.ROT,F.GELB,F.WEISS,F.ROSA,F.LILA,F.ORANGE,F.BLAU];
    for(let i=0;i<190;i++){ const x=(zufall()*2-1)*24, z=i%2?5.8+zufall()*11:-19+zufall()*19.3; if(Math.abs(x)<2.2) continue;
      if((Math.abs(x+13)<3.8 && z>-5 && z<.2) || (Math.abs(x-12.5)<4 && z>-5.5 && z<.2)) continue; K.blume(b,x,z,FARBEN[i%FARBEN.length],1.15); }
    for(let i=0;i<90;i++){ const x=(zufall()*2-1)*32, z=i%2?5.8+zufall()*14:-23+zufall()*23.4; if(Math.abs(x)<1.8) continue; K.gras(b,x,z,.5,6); }
    [[-7.6,.2],[2.6,.2],[-7.6,5.8],[2.8,5.8]].forEach(([x,z])=>{ for(let i=0;i<6;i++) b.klotz(.18,.6,.18,F.HELLHOLZ,x+i*.9,.3,z); b.quader(x,.38,z-.05,x+4.5,.5,z+.05,F.HOLZ); });
  },{ schatten:false });
  /* ---------- ferne Block-Hügel, Sonne, Wolken ---------- */
  K.koerper(sc,b=>{
    [[-46,-34,9,5],[-29,-40,10,7],[-12,-37,8,4],[5,-43,11,6],[22,-36,9,5],[40,-40,11,8],[58,-32,9,5],[-60,-26,9,6]].forEach(([x,z,r,h],i)=>{
      for(let j=0;j<h;j++){ const w=r*(1-j/(h+1)); b.quader(x-w,j,z-w*.5,x+w,j+1,z+w*.5,j>h-3?(i%2?0x8ad870:0x74c45a):(i%2?0x52a460:0x46985a),{ raster:2 }); } });
  },{ schatten:false });
  const sonnenBlock=K.koerper(sc,b=>{ b.klotz(3.2,3.2,.5,F.GELB,0,0,0,{ glatt:true, jitter:0 }); b.klotz(2.2,2.2,.6,0xfff09a,0,0,.1,{ glatt:true, jitter:0 }); [[0,2.5],[0,-2.5],[2.5,0],[-2.5,0]].forEach(([x,y])=>b.klotz(.7,.7,.3,F.GOLD,x,y,0,{ glatt:true })); },{ leuchtet:true });
  sonnenBlock.position.set(-17,13,-34); sonnenBlock.material.fog=false;
  K.wolken(k,sc,[[-30,13,-30,1.5],[-9,15,-32,1.2],[15,13.5,-30,1.4],[34,12,-26,1.3],[2,10.5,-38,1.1]],{ drift:2.4 });
  K.wolken(k,sc,[[-22,10,-19,.8],[21,10.5,-18,.9],[-44,14,-16,1.1],[45,15,-18,1.2]],{ drift:1.8, phase:2.4 });

  /* ---------- Block-Tiere: hüpfen und winken ---------- */
  const huepfer=[];
  [[-8,7.6,1.25,undefined],[8.4,7.8,1.25,0xe8d8f8],[-6,-2.2,1.2,undefined],[6.2,-2.6,1.2,0xfce8d0]].forEach(([x,z,g,farbe],i)=>{
    const s=K.schaf(k,sc,x,z,-Math.PI/2+(x<0?.3:-.3),g,{ farbe, phase:i*1.7 });
    const seite=i%2?-1:1, arm=K.beweglich(s.g,.34,.8,seite*.46);
    K.koerper(arm,b=>{ b.klotz(.19,.66,.19,0x7a5a48,0,.31,0); b.klotz(.25,.18,.24,0x3a2a22,0,.7,0,{ glatt:true }); });
    huepfer.push({ g:s.g, p:i*1.9, h:.3 });
    k.anim.push(t=>{ arm.rotation.x=seite*(.65+Math.sin(t*8+i)*.4); });
  });
  [[-4.4,6.6,1.5,undefined],[4.8,6.5,1.5,0xf0c078],[-11,8.6,1.4,0xf0c078],[11.6,6.6,1.4,undefined],[-9,-.4,1.3,undefined]].forEach(([x,z,g,farbe],i)=>{
    const h=K.huhn(k,sc,x,z,-Math.PI/2+(x<0?.45:-.45),g,{ farbe, phase:i*1.3 });
    const fl=[-1,1].map(v=>{ const q=K.beweglich(h.g,-.02,.58,v*.26); K.koerper(q,b=>{ b.klotz(.34,.09,.36,0xe8d0a8,-.04,0,v*.18); b.klotz(.2,.08,.16,0xd0b080,-.1,0,v*.4); }); return { q, v }; });
    huepfer.push({ g:h.g, p:i*2.3+.7, h:.45 });
    k.anim.push(t=>fl.forEach(f=>f.q.rotation.x=-f.v*(.35+Math.sin(t*11+i)*.55)));
  });
  K.biene(k,sc,-13,3.2,7,1.4,{ runde:1.4, tempo:1.1 });
  K.biene(k,sc,12.5,3.6,6.4,1.4,{ runde:1.6, tempo:.9, phase:2 });

  /* ---------- Ballon mit Spielfigur ---------- */
  const BG=1.15, FG=1.25;
  const bal=K.ballon(sc,TX,8.8,TZ,{ farben:[F.ROT,F.GELB] });
  bal.g.scale.setScalar(BG);
  const u=figur.userData;
  figur.position.set(0,.03,.2); figur.scale.setScalar(FG); figur.rotation.set(0,0,0); bal.g.add(figur);
  /* zwei Bienen begleiten den Ballon seitlich */
  const begleiter=K.beweglich(sc,TX,8.8,TZ);
  [-1,1].forEach((v,i)=>{ const b=K.biene(k,begleiter,v*4.4,2.2+i*1.1,0,1.25,{ runde:0, phase:i*2.1 }); b.g.rotation.y=-Math.PI/2+v*-.5; });
  const fleck=new THREE.Mesh(new THREE.CircleGeometry(1.7,24),basis(0x000000,{ transparent:true, opacity:.2, depthWrite:false })); fleck.rotation.x=-Math.PI/2; sc.add(fleck);
  /* Flugbahn: vom Turm über Höhle und Blockhaus nach vorn über die Brücke */
  const ENDPUNKT=V(0,4.7,6.8);
  const bahn=new THREE.CatmullRomCurve3([V(TX,8.8,TZ),V(2,8.8,-11),V(-7,7.8,-5.5),V(-5.2,6,2),ENDPUNKT]);

  /* ---------- Klötzchen-Konfetti ---------- */
  const NK=220, konfetti=new THREE.InstancedMesh(GEO.box,basis(0xffffff),NK), kd=[]; konfetti.frustumCulled=false; konfetti.visible=false; sc.add(konfetti);
  for(let i=0;i<NK;i++){
    /* die meisten hinter dem Ballon, wenige vorn nur weit außen: Ballon und Figur bleiben frei */
    const aussen=i%6===0, x=aussen?(i%12?1:-1)*(7.5+zufall()*8):(zufall()*2-1)*19, z=aussen?3+zufall()*6:-10+zufall()*11;
    kd.push({ x, z, y:zufall()*15, v:.8+zufall()*.8, p:zufall()*6.28, g:.8+zufall()*.6 });
    konfetti.setColorAt(i,FARBE.set(BUNT[i%BUNT.length])); }
  const setze=(t,i,x,y,z,s,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(s,s,s); o.rotation.set(rx,ry,rz); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };

  /* ---------- Kamera: so weit weg, dass Landschaft und ganze Flugbahn ins Bild passen ---------- */
  const NEIG=.3, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=5.6;
  const WICHTIG=[[-16.4,0,-.4],[-16.2,5.4,-2.4],[16.8,0,-.6],[18,7.9,KZ],[HX-3.8,0,HZ+1],[HX,5.4,HZ],[TX+3.4,9.4,TZ],[-9.5,0,8.4],[9.8,0,8.4],[0,0,SE+1],
    [ENDPUNKT.x,ENDPUNKT.y+7.9*BG+.3,ENDPUNKT.z],[ENDPUNKT.x,ENDPUNKT.y-.6,ENDPUNKT.z+1.2]];
  for(let i=0;i<=8;i++){ const p=bahn.getPoint(i/8); WICHTIG.push([p.x,p.y+7.9*BG,p.z],[p.x-2.6,p.y,p.z],[p.x+2.6,p.y,p.z]); }
  const abstand=(a,tn)=>WICHTIG.reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hoch=Math.abs(Y*CN-p[2]*SN);
    return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hoch/(.95*tn)+naeher); },18);

  /* Zeitplan in Sekunden: nach 6 Sekunden ist der Ballon vorn, ab 4.5 Konfetti */
  const START=.2, DA=5.9, KONF=4.4;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180), d=abstand(a,tn)*(1+.05*(1-weich(t/6)));
    const wippen=Math.sin(t*.2)*.35*weich((t-6)/2);
    kamera.position.set(wippen,ZIELY+d*SN,d*CN); kamera.lookAt(0,ZIELY,0);

    /* Ballonflug, danach sanftes Weiterschweben */
    const r=Math.min(1,Math.max(0,(t-START)/(DA-START))), e=.3*r+.7*weich(r), p=bahn.getPoint(e), danach=weich((t-DA+.4)/1.5);
    const bx=p.x+Math.sin(t*.55)*.35*danach, by=p.y+Math.sin(t*1.5)*.16, bz=p.z;
    bal.g.position.set(bx,by,bz); bal.g.rotation.y=Math.sin(t*.7)*.1; bal.g.rotation.z=Math.sin(t*1.1)*.018;
    bal.flamme.scale.y=1+Math.sin(t*13)*.18+(1-danach)*.35;
    begleiter.position.set(bx,by,bz);
    const naheSchlucht=weich((Math.abs(bz-(SA+SE)/2)-3.2)/.8);
    fleck.position.set(bx,.04,bz); fleck.visible=naheSchlucht>.01; fleck.material.opacity=.2*naheSchlucht;

    /* Spielfigur winkt, am Ende jubelt sie mit beiden Armen */
    const jubel=weich((t-DA+.5)/.6);
    figur.rotation.y=Math.sin(t*1.2)*.22;
    u.armR.rotation.z=2.45+Math.sin(t*8)*.3;
    u.armL.rotation.z=misch(-.18,-2.45+Math.sin(t*8+1.5)*.3,jubel);
    u.beinL.rotation.x=u.beinR.rotation.x=0;
    u.koerper.position.y=Math.abs(Math.sin(t*4.4))*.09*jubel;

    huepfer.forEach(h=>{ h.g.position.y=Math.max(0,Math.sin(t*4.2+h.p))*h.h*weich((t-.5)/1); });

    /* Rauch aus dem Schornstein */
    for(let i=0;i<NR;i++){ const v=((t*.28+i/NR)%1); setze(rauch,i,-11.2+v*1.3+Math.sin(v*7+i)*.2,6.25+v*3.2,-3.05,(.25+v*.55)*weich((1-v)*3),0,v*2+i,0); }
    rauch.instanceMatrix.needsUpdate=true;

    /* Klötzchen-Konfetti */
    konfetti.visible=t>KONF;
    if(konfetti.visible){
      kd.forEach((f,i)=>{ const rest=14+f.y*.25-(t-KONF)*f.v*3.2;
        /* erst von oben herein, danach gleichmäßig verteilt weiterfallen */
        const hy=rest>.2 ? rest : .2+((((rest-.2)%15)+15)%15);
        const gr=.19*f.g*weich(hy/.6)*(rest>.2?1:weich((15.2-hy)/.8));
        setze(konfetti,i,f.x+Math.sin(t*1.4+f.p)*.35,hy,f.z,gr,t*2.2+f.p,t*1.6+f.p*2,Math.sin(t*2+f.p)); });
      konfetti.instanceMatrix.needsUpdate=true; }
  };
};

