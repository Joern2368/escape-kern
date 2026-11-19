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
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500;
let d='',f='',p='';const x0=500-(n-1)*12;
for(let k=0;k<n;k++)d+=`<rect x="${x0+k*24-8}" y="322" width="16" height="16" fill="#1d2440" stroke="#ffd34a" stroke-width="2"/>`;
for(let y=158;y<470;y+=39)f+=K(384,y,36,39,'#8f88b0')+K(580,y,36,39,'#a098c0');
for(let y=190,r=0;y<470;y+=40,r++)p+=K(420,y,80,40,r%2?'#d08840':'#c27a36')+K(500,y,80,40,r%2?'#c27a36':'#d08840');
return`<defs><clipPath id="tuerclip"><rect x="420" y="190" width="160" height="280"/></clipPath></defs>
  <g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="Tür mit Zahlenschloss">
   ${f}${K(420,158,160,32,'#8f88b0')}${R(420,190,160,280,'#140f20')}
   <g clip-path="url(#tuerclip)"><g id="platte">${p}<use href="#sym-kristall" x="472" y="232" width="56" height="56" color="#7ff0ff"/>${R(500-n*12-12,312,n*24+24,36,'#2a2238')}${d}</g></g>
   ${K(484,124,32,32,'#ffd34a')}
  </g></g>`;
}
SZENARIEN.kloetzchenwelt={
name:"Die Klötzchenwelt",
symbole:["kristall","apfel","blume","schluessel","stern"],
symbolNamen:["Kristall","Apfel","Blume","Schlüssel","Stern"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M60 8L100 26L60 44L20 26Z" fill="#ffd34a" stroke="#6a4a1a" stroke-width="3"/><path d="M20 26L60 44V84L20 66Z" fill="#ff8a5c" stroke="#6a4a1a" stroke-width="3"/><path d="M100 26L60 44V84L100 66Z" fill="#d9576b" stroke="#6a4a1a" stroke-width="3"/><path d="M28 34L60 48L92 34" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/><use href="#sym-kristall" x="88" y="0" width="28" height="28" color="#59e0f0"/></svg>`,
texte:{
einleitung:"Ihr seid in der Klötzchenwelt gelandet! Hier ist alles aus bunten Blöcken gebaut: Häuser, Bäume, Höhlen und sogar die Wolken. Die Baumeisterin dieser Welt hat jede Tür mit einem Zahlenschloss gesichert. Untersucht die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe steckt eine Ziffer. Findet ihr den Weg hinaus?",
startKnopf:"Die Klötzchenwelt betreten",
hinweisGeber:"Die kleine Pixelbiene summt:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Pixelbiene summt leise … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss aus Blöcken",
schlossSymbol:"Über jedem Rad leuchtet ein Pixelzeichen. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Die Blöcke wackeln – aber die Tür bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Sonne geht unter!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Ihr seid frei!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus der Klötzchenwelt gefunden. Die Baumeisterin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du bist in der Klötzchenwelt gelandet! Hier ist alles aus bunten Blöcken gebaut: Häuser, Bäume, Höhlen und sogar die Wolken. Die Baumeisterin dieser Welt hat jede Tür mit einem Zahlenschloss gesichert. Untersuche die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe steckt eine Ziffer. Findest du den Weg hinaus?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Pixelbiene summt leise … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad leuchtet ein Pixelzeichen. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Die Blöcke wackeln – aber die Tür bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Du bist frei!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus der Klötzchenwelt gefunden. Die Baumeisterin ist stolz auf dich!"
},
einfach:{
name:"Die Klötzchenwelt",
symbolNamen:["Kristall","Apfel","Blume","Schlüssel","Stern"],
texte:{
einleitung:"Ihr seid in der Klötzchenwelt. Hier ist alles aus bunten Blöcken gebaut. Plötzlich geht die Tür hinter euch zu! An jeder Tür hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
texteDu:{
einleitung:"Du bist in der Klötzchenwelt. Hier ist alles aus bunten Blöcken gebaut. Plötzlich geht die Tür hinter dir zu! An jeder Tür hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
raeume:[
{titel:"Das Blockhaus",intro:"Ein warmes Haus aus Holz-Blöcken. Im Ofen brennt ein Feuer. Hier sind die Zahlen für das erste Schloss versteckt.",
objekte:[{name:"Ofen",fund:"Neben dem Ofen liegt:"},{name:"Truhe aus Holz",fund:"In der Truhe liegt:"},{name:"Bett",fund:"Unter dem Kissen liegt:"},{name:"Tisch mit Kuchen",fund:"Unter dem Teller liegt:"},{name:"Uhr",fund:"Hinter der Uhr klebt:"}],
infoObjekte:[{name:"Bild mit Berg",fund:"Hinter dem Bild klebt:"},{name:"Stapel Bücher",fund:"Im Buch liegt:"},{name:"Korb mit Wolle",fund:"In der Wolle steckt:"}]},
{titel:"Die Höhle mit Kristallen",intro:"Ihr seid in einer dunklen Höhle. Bunte Kristalle leuchten an den Wänden. Findet die Zahlen für das nächste Schloss!",introDu:"Du bist in einer dunklen Höhle. Bunte Kristalle leuchten an den Wänden. Finde die Zahlen für das nächste Schloss!",
objekte:[{name:"Kristalle",fund:"Zwischen den Kristallen liegt:"},{name:"Wagen mit Steinen",fund:"Im Wagen liegt:"},{name:"Pilze",fund:"Unter einem Pilz liegt:"},{name:"Stein-Säule",fund:"An der Säule klebt:"},{name:"Glitzer an der Wand",fund:"In der Wand steckt:"}],
infoObjekte:[{name:"Bild an der Wand",fund:"Neben dem Bild steckt:"},{name:"Lampe",fund:"Unter der Lampe liegt:"},{name:"Kiste mit Steinen",fund:"In der Kiste liegt:"}]},
{titel:"Die Werkstatt",intro:"Hier bauen Menschen mit Blöcken. Überall liegen Werkzeuge und bunte Steine.",
objekte:[{name:"Tisch zum Bauen",fund:"Auf dem Tisch liegt:"},{name:"Kran",fund:"Am Kran hängt:"},{name:"Eimer mit Farbe",fund:"Unter einem Eimer liegt:"},{name:"Schubkarre",fund:"In der Schubkarre liegt:"},{name:"Plan an der Wand",fund:"Hinter dem Plan steckt:"}],
infoObjekte:[{name:"Wand mit Werkzeug",fund:"Hinter dem Werkzeug hängt:"},{name:"Turm aus Blöcken",fund:"Zwischen den Blöcken steckt:"},{name:"Kiste mit Blöcken",fund:"In der Kiste liegt:"}]},
{titel:"Die Wiese mit Bienen",intro:"Ihr seid draußen auf einer Wiese. Bienen summen um die Blumen. Öffnet das Tor in der Hecke!",introDu:"Du bist draußen auf einer Wiese. Bienen summen um die Blumen. Öffne das Tor in der Hecke!",
objekte:[{name:"Haus für Bienen",fund:"Neben dem Bienenhaus liegt:"},{name:"Korb für Bienen",fund:"Unter dem Korb liegt:"},{name:"Gießkanne",fund:"In der Gießkanne liegt:"},{name:"Baum",fund:"Im Baum hängt:"},{name:"Haus für Vögel",fund:"Im Vogelhaus liegt:"}],
infoObjekte:[{name:"Schild mit Blumen",fund:"Hinter dem Schild klebt:"},{name:"Töpfe mit Honig",fund:"Unter dem Honig liegt:"},{name:"Beet",fund:"Zwischen den Blumen steckt:"}]},
{titel:"Der Turm über den Wolken",intro:"Ihr seid ganz oben im Turm. Unter euch sind die Wolken. Öffnet das letzte Schloss!",introDu:"Du bist ganz oben im Turm. Unter dir sind die Wolken. Öffne das letzte Schloss!",
objekte:[{name:"Fernrohr",fund:"Im Fernrohr steckt:"},{name:"Windrad",fund:"Am Windrad hängt:"},{name:"Schatzkiste",fund:"In der Kiste liegt:"},{name:"Korb vom Ballon",fund:"Im Korb liegt:"},{name:"Karte mit Sternen",fund:"Hinter der Karte steckt:"}],
infoObjekte:[{name:"Fahne",fund:"An der Fahne hängt:"},{name:"Uhr mit Sonne",fund:"Unter der Uhr liegt:"},{name:"Nest",fund:"Im Nest liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Das Blockhaus",
intro:"Ein gemütliches Blockhaus, gebaut aus warmen Holzblöcken. Im Ofen knistert ein Feuer, durch die Fenster scheint die Sonne. Irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
tuerX:1250,
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
intro:"Ihr klettert hinab in eine Höhle aus dunklen Steinblöcken. An den Wänden leuchten Kristalle in Blau und Rosa. Findet die Ziffern für das nächste Schloss!",
introDu:"Du kletterst hinab in eine Höhle aus dunklen Steinblöcken. An den Wänden leuchten Kristalle in Blau und Rosa. Finde die Ziffern für das nächste Schloss!",
tuerX:300,
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
tuerX:800,
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
intro:"Endlich draußen! Auf der Blumenwiese summen Bienen von Blüte zu Blüte. Eine hohe Hecke aus Blätterblöcken versperrt den Weg – nur ein Tor führt hindurch. Öffnet es!",
introDu:"Endlich draußen! Auf der Blumenwiese summen Bienen von Blüte zu Blüte. Eine hohe Hecke aus Blätterblöcken versperrt den Weg – nur ein Tor führt hindurch. Öffne es!",
tuerX:1350,
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
intro:"Eine lange Treppe aus Blöcken führt hinauf in den Turm über den Wolken. Durch die großen Öffnungen seht ihr weit über das Wolkenmeer. Hier wartet das letzte Schloss – öffnet es!",
introDu:"Eine lange Treppe aus Blöcken führt hinauf in den Turm über den Wolken. Durch die großen Öffnungen siehst du weit über das Wolkenmeer. Hier wartet das letzte Schloss – öffne es!",
tuerX:550,
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
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ab4f0"/><stop offset=".8" stop-color="#e8f8ff"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/>${P('.yy.|yyyy|yyyy|.yy.',24,'y#ffe066',560,150,1)}${wolke(240,90)}${wolke(520,150,12)}
   ${P('..........gggg........|.....gggggggggggg.....|gggggggggggggggggggggg|hhhhhhhhhhhhhhhhhhhhhh|hhhhhhhhhhhhhhhhhhhhhh|hhhhhhhhhhhhhhhhhhhhhh',50,'g#7ac860 h#5aa848',-50,360)}
   ${P('...ss...|..ssss..|.ssssss.',40,'s#e8d8b0',340,480)}
   ${[[260,430],[760,420]].map(([x,y])=>`<g transform="translate(${x} ${y}) scale(.8)">${P('.gggg.|gglggg|gggggl|.gggg.|..tt..|..tt..',18,'g#3aa860 l#7ad870 t#8a5228')}</g>`).join('')}
   <path d="M0 0H1000V600H0Z M180 600V240H220V180H280V130H360V100H640V130H720V180H780V240H820V600Z" fill="#2a2440" fill-rule="evenodd"/>`
};
})();