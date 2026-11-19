(function(){
const C=CONFIG;
const SZ=SZENARIEN[C.szenario]||SZENARIEN[Object.keys(SZENARIEN)[0]];
const du=C.anrede==='du';
const einfach=(typeof C.einfacheSprache==='boolean')?C.einfacheSprache:parseInt(C.klasse,10)<=6;
const E=einfach?(SZ.einfach||{}):{};
const T=Object.assign({},SZ.texte,du?(SZ.texteDu||{}):{},E.texte||{},du?(E.texteDu||{}):{});
const SZNAME=E.name||SZ.name,SYMNAMEN=E.symbolNamen||SZ.symbolNamen;
const wortspeicher=(typeof C.wortspeicher==='boolean')?C.wortspeicher:parseInt(C.klasse,10)<=6;
const symbolModus=(typeof C.symbolModus==='boolean')?C.symbolModus:parseInt(C.klasse,10)>=5;
const mitTimer=C.timerMinuten>0;
const W=du?{
auftrag:'Untersuche die Gegenstände im Raum – tippe sie an!',
bereit:'Du hast alle Ziffern gefunden! Tippe auf die Tür und öffne das Zahlenschloss.',
alleTeile:'Bitte beantworte zuerst alle Teile der Aufgabe.',
merken:'Merke sie dir gut!',
lesen:'Lies die Aufgabe noch einmal ganz genau – Wort für Wort.',
nameFrage:'Wie heißt du?',namePlatz:'Dein Name',figurFrage:'Wähle deine Figur:',keinRaetsel:'Das ist kein Rätsel. Hier kannst du etwas lernen.',erstPruefen:'Tipp: Prüfe zuerst deine Antworten. Dann bekommst du Hinweise zu den falschen Antworten.',nichts:'Hier ist nichts versteckt. Suche weiter!',erstRaetsel:'Die Tür ist verschlossen. Löse zuerst die Rätsel in diesem Raum.',genug:'Du hast genug Ziffern gefunden! Tippe auf die Tür und öffne das Zahlenschloss.',radFrei:'Ein Rätsel ist noch offen. Das Rad mit dem ? brauchst du nicht.',
gefunden:'Du hast etwas gefunden:',
anl:['Tippe auf den Boden, dann läuft deine Figur dorthin. Tippe auf Gegenstände und löse die Aufgaben. Nicht überall ist ein Rätsel versteckt.','Für jede gelöste Aufgabe bekommst du eine Ziffer','Hast du alle Ziffern, tippe auf die Tür und stelle das Zahlenschloss ein.','Kommst du nicht weiter? Nutze den Hinweis-Knopf','Die gefundenen Ziffern siehst du oben in der Leiste.']
}:{
auftrag:'Untersucht die Gegenstände im Raum – tippt sie an!',
bereit:'Ihr habt alle Ziffern gefunden! Tippt auf die Tür und öffnet das Zahlenschloss.',
alleTeile:'Bitte beantwortet zuerst alle Teile der Aufgabe.',
merken:'Merkt sie euch gut!',
lesen:'Lest die Aufgabe noch einmal ganz genau – Wort für Wort.',
nameFrage:'Wie heißt ihr?',namePlatz:'Name oder Teamname',figurFrage:'Wählt eure Figur:',keinRaetsel:'Das ist kein Rätsel. Hier könnt ihr etwas lernen.',erstPruefen:'Tipp: Prüft zuerst eure Antworten. Dann bekommt ihr Hinweise zu den falschen Antworten.',nichts:'Hier ist nichts versteckt. Sucht weiter!',erstRaetsel:'Die Tür ist verschlossen. Löst zuerst die Rätsel in diesem Raum.',genug:'Ihr habt genug Ziffern gefunden! Tippt auf die Tür und öffnet das Zahlenschloss.',radFrei:'Ein Rätsel ist noch offen. Das Rad mit dem ? braucht ihr nicht.',
gefunden:'Ihr habt etwas gefunden:',
anl:['Tippt auf den Boden, dann läuft eure Figur dorthin. Tippt auf Gegenstände und löst die Aufgaben. Nicht überall ist ein Rätsel versteckt.','Für jede gelöste Aufgabe bekommt ihr eine Ziffer','Habt ihr alle Ziffern, tippt auf die Tür und stellt das Zahlenschloss ein.','Kommt ihr nicht weiter? Nutzt den Hinweis-Knopf','Die gefundenen Ziffern seht ihr oben in der Leiste.']
};
const app=document.getElementById('app');
const st={raum:0,name:'',figur:0,pos:{x:500,y:588,r:1},laeuft:false,geloest:new Set(),neu:-1,hinweise:0,hinweisSet:new Set(),fehler:{},start:0,rest:(C.timerMinuten||0)*60,tid:null,zeitUm:false};
let beimSchliessen=null;
st.karten=[];st.kartenSet=new Set();
const PUNKT='·';
const ohnePunkte=s=>String(s).split(PUNKT).join('');
const esc=s=>String(s).split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
const fuell=s=>String(s).split('{titel}').join(C.titel).split('{klasse}').join(C.klasse);
const sym=id=>`<svg viewBox="0 0 40 40" aria-hidden="true"><use href="#sym-${id}" width="40" height="40"/></svg>`;
const norm=s=>{let t=ohnePunkte(s).toLowerCase().split('ß').join('ss').trim().split(' ').filter(Boolean).join(' ');
for(const c of'/:,.=+-%')t=t.split(' '+c).join(c).split(c+' ').join(c);
t=t.split(',').join('.');while(t&&'.!?'.includes(t.slice(-1)))t=t.slice(0,-1);return t;};
const gleich=(a,b)=>{const k=x=>{const t=norm(x);return/[0-9]/.test(t)?t:t.split(' ').join('').split('-').join('');};return k(a)===k(b);};
const teile=text=>{const out=[];let rest=String(text);
while(true){const a=rest.indexOf('['),b=rest.indexOf(']',a);if(a<0||b<0){out.push(rest);return out;}out.push(rest.slice(0,a),rest.slice(a+1,b));rest=rest.slice(b+1);}};
const mischen=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const mischenAnders=a=>{if(a.length<2)return[...a];let b;do{b=mischen(a);}while(b.every((x,i)=>x===a[i]));return b;};
const fmt=s=>{s=Math.abs(Math.round(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');};
const VOK='aeiouäöüy',DIPH=['ei','ai','au','eu','äu','ie','ey','ay'];
const ONSET=['schl','schr','schw','str','spr','spl','sch','ch','ck','ph','qu','bl','br','dr','fl','fr','gl','gr','kl','kr','pl','pr','tr','zw','th'];
function silbenWort(w){
if(w.includes(PUNKT))return w.split(PUNKT).filter(Boolean);
const l=w.toLowerCase(),kerne=[];
let i=0;
while(i<l.length){
if(VOK.includes(l[i])&&!(l[i]==='u'&&l[i-1]==='q')){
let j=i+1;
if(DIPH.includes(l.slice(i,i+2))||(l[i+1]===l[i]&&'aeo'.includes(l[i])))j=i+2;
kerne.push([i,j]);i=j;
}else i++;
}
if(kerne.length<2)return[w];
const out=[];let start=0;
for(let k=0;k<kerne.length-1;k++){
const a=kerne[k][1],b=kerne[k+1][0],kons=l.slice(a,b);
let on=kons.slice(-1);
for(const o of ONSET)if(kons.endsWith(o)&&o.length>on.length)on=o;
const cut=b-on.length;
if(cut>start){out.push(w.slice(start,cut));start=cut;}
}
out.push(w.slice(start));return out;
}
const istBuchstabe=c=>c===PUNKT||c==='ß'||c.toLowerCase()!==c.toUpperCase();
function silbenHtml(text){
let out='',wort='';
const fertig=()=>{if(!wort)return;silbenWort(wort).forEach((s,k)=>{out+=`<span class="${k%2?'sr':'sb'}">${s}</span>`;});wort='';};
for(const c of text){if(istBuchstabe(c))wort+=c;else{fertig();out+=c==='<'?'&lt;':(c==='&'?'&amp;':c);}}
fertig();return out;
}
function aufbereiten(wurzel){
if(!wurzel||wurzel.nodeType!==1)return;
const gang=document.createTreeWalker(wurzel,NodeFilter.SHOW_TEXT),knoten=[];
while(gang.nextNode())knoten.push(gang.currentNode);
knoten.forEach(n=>{
const p=n.parentElement;if(!p||p.closest('svg,select,script,style,.sw,.sb,.sr'))return;
const farbig=C.silbenschrift&&p.closest('.story,.modal')&&!p.closest('.btn,.wf,.zahl,.x,.vor');
if(farbig&&n.nodeValue.trim()){const sp=document.createElement('span');sp.className='sw';sp.innerHTML=silbenHtml(n.nodeValue);p.replaceChild(sp,n);}
else if(n.nodeValue.includes(PUNKT))n.nodeValue=ohnePunkte(n.nodeValue);
});
}
new MutationObserver(liste=>liste.forEach(m=>{
if(m.type==='characterData')aufbereiten(m.target.parentElement);
else m.addedNodes.forEach(n=>aufbereiten(n.nodeType===3?n.parentElement:n));
})).observe(document.body,{childList:true,subtree:true,characterData:true});
const BRUCH={2:'Halbe',3:'Drittel',4:'Viertel',5:'Fünftel',6:'Sechstel',7:'Siebtel',8:'Achtel',9:'Neuntel',10:'Zehntel',12:'Zwölftel',100:'Hundertstel'};
function sprechbar(t){
return ohnePunkte(t).split(' ').map(w=>{
let ende='';while(w&&'.,!?;:)'.includes(w.slice(-1))){ende=w.slice(-1)+ende;w=w.slice(0,-1);}
const i=w.indexOf('/');
if(i>0){const a=w.slice(0,i),b=w.slice(i+1),nb=parseInt(b,10);
if(String(parseInt(a,10))===a&&String(nb)===b&&BRUCH[nb])w=(a==='1'&&nb===2)?'ein halb':a+' '+BRUCH[nb];}
return w+ende;
}).join(' ').split('_').join(' ');
}
function sprich(text){
if(!('speechSynthesis'in window))return;
speechSynthesis.cancel();
const u=new SpeechSynthesisUtterance(sprechbar(text));u.lang='de-DE';u.rate=0.9;
const v=speechSynthesis.getVoices().find(x=>x.lang&&x.lang.toLowerCase().startsWith('de'));if(v)u.voice=v;
speechSynthesis.speak(u);
}
const vorKnopf=()=>C.vorlesen?'<button class="vor" title="Vorlesen" aria-label="Vorlesen">🔊</button>':'';
const nurText=html=>{const d=document.createElement('div');d.innerHTML=html;return d.textContent;};
function modal(inhalt,opt={}){
schliesse();
const bg=document.createElement('div');bg.className='modal-bg';
bg.innerHTML=`<div class="modal" role="dialog" aria-modal="true">${inhalt}</div>`;
document.body.appendChild(bg);
beimSchliessen=opt.danach||null;
if(opt.schliessbar!==false)bg.addEventListener('click',e=>{if(e.target===bg)schliesse();});
bg.querySelectorAll('.x').forEach(b=>b.onclick=schliesse);
const v=bg.querySelector('.vor');if(v&&opt.vorlesen)v.onclick=()=>sprich(opt.vorlesen());
return bg.querySelector('.modal');
}
function schliesse(){
if('speechSynthesis'in window)speechSynthesis.cancel();
const offen=document.querySelectorAll('.modal-bg');if(!offen.length)return;
offen.forEach(m=>m.remove());
const f=beimSchliessen;beimSchliessen=null;if(f)f();
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')schliesse();});
function meldung(titel,text,knopf,danach){
const m=modal(`<div class="mkopf"><h2>${titel}</h2>${vorKnopf()}</div><p>${text}</p><div class="aktionen mitte"><button class="btn ok">${knopf||'Weiter'}</button></div>`,{danach,vorlesen:()=>nurText(titel+'. '+text)});
const b=m.querySelector('.ok');b.onclick=schliesse;b.focus();
}
function wackeln(el){el.classList.remove('wackeln');void el.offsetWidth;el.classList.add('wackeln');}
const TON={an:true,ctx:null,
init(){try{if(!this.ctx){const A=window.AudioContext||window.webkitAudioContext;if(A)this.ctx=new A();}if(this.ctx&&this.ctx.state==='suspended')this.ctx.resume();}catch(e){}},
note(f,d,typ,v,verz,f2){if(!this.an||!this.ctx)return;try{const c=this.ctx,t=c.currentTime+(verz||0),o=c.createOscillator(),g=c.createGain();
o.type=typ||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v||0.12,t+0.012);g.gain.exponentialRampToValueAtTime(0.0001,t+d);
o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+0.03);}catch(e){}},
spiele(n){const N=(...a)=>this.note(...a);
if(n==='klick')N(620,.07,'triangle',.1,0,420);
else if(n==='tick')N(1500,.035,'square',.04);
else if(n==='richtig')[523,659,784,1047].forEach((f,k)=>N(f,.28,'triangle',.13,k*.09));
else if(n==='falsch'){N(200,.18,'sawtooth',.08,0,140);N(150,.22,'sawtooth',.08,.16,100);}
else if(n==='karte'){N(500,.25,'sine',.1,0,1100);N(1320,.2,'triangle',.07,.2);}
else if(n==='auf'){N(180,.1,'square',.1);N(330,.12,'square',.09,.12);[523,659,784,1047,1319].forEach((f,k)=>N(f,.3,'triangle',.12,.3+k*.08));}
else if(n==='tuer')N(90,1,'sawtooth',.09,0,200);
else if(n==='flug')N(400,.5,'sine',.07,0,1200);}
};
document.addEventListener('pointerdown',()=>TON.init(),{once:true});
let letzteFeier=-1;
function konfetti(cx,cy){
if(ruhig)return;
let n;do{n=Math.floor(Math.random()*5);}while(n===letzteFeier);letzteFeier=n;
const F=['#e8413a','#f4c430','#3aa0e8','#5ac85a','#e86ab8','#ffffff'],R=(a,b)=>a+Math.random()*(b-a);
const box=(x,y)=>{const k=document.createElement('div');k.className='konf';k.style.left=x+'px';k.style.top=y+'px';document.body.appendChild(k);setTimeout(()=>k.remove(),2600);return k;};
const teil=(k,klasse,vars,farbe,text)=>{const i=document.createElement(klasse==='fall'?'b':'i');if(klasse!=='fall'&&klasse!=='funke')i.style.animationDelay=R(0,.15).toFixed(2)+'s';
if(klasse==='funke')i.className='funke';if(farbe)i.style.background=farbe;if(text)i.textContent=text;
for(const key in vars)i.style.setProperty('--'+key,vars[key]);k.appendChild(i);return i;};
if(n===0){
const k=box(cx,cy);
for(let j=0;j<46;j++){const a=R(0,6.283),v=R(120,380);teil(k,'k',{dx:(Math.cos(a)*v).toFixed(0)+'px',up:R(-240,-60).toFixed(0)+'px',dy:(Math.sin(a)*v*.5+220).toFixed(0)+'px',r:R(-450,450).toFixed(0)+'deg'},F[j%6]);}
}else if(n===1){
for(let b=0;b<3;b++){const k=box(innerWidth*R(.2,.8),innerHeight*R(.2,.55)),c=F[Math.floor(R(0,5))];k.style.animationDelay=(b*.3)+'s';
for(let j=0;j<20;j++){const a=j/20*6.283,v=R(70,130);const i=teil(k,'funke',{dx:(Math.cos(a)*v).toFixed(0)+'px',dy:(Math.sin(a)*v).toFixed(0)+'px'},c);i.style.animationDelay=(b*.3)+'s';}}
}else if(n===2){
const k=box(0,0);
for(let j=0;j<26;j++){const i=teil(k,'fall',{dx:R(-40,40).toFixed(0)+'px',r:R(-180,180).toFixed(0)+'deg'},null,['⭐','✨','🌟'][j%3]);i.style.left=R(2,96)+'vw';i.style.animationDelay=R(0,.9).toFixed(2)+'s';i.style.animationDuration=R(1.4,2.2).toFixed(2)+'s';}
}else if(n===3){
const k=box(0,0);
for(let j=0;j<12;j++){const i=teil(k,'fall',{dx:R(-60,60).toFixed(0)+'px',r:R(-25,25).toFixed(0)+'deg'},null,'🎈');i.className='steig';i.style.left=R(4,92)+'vw';i.style.animationDelay=R(0,.8).toFixed(2)+'s';i.style.animationDuration=R(1.8,2.4).toFixed(2)+'s';}
}else{
[[0,1],[innerWidth,-1]].forEach(([x,r])=>{const k=box(x,innerHeight);
for(let j=0;j<34;j++)teil(k,'k',{dx:(r*R(80,520)).toFixed(0)+'px',up:R(-620,-260).toFixed(0)+'px',dy:R(60,160).toFixed(0)+'px',r:R(-600,600).toFixed(0)+'deg'},F[j%6]);});
}
}
function fliege(html,klasse,von,zielEl,danach){
if(ruhig||!zielEl){danach&&danach();return;}
const z=zielEl.getBoundingClientRect(),d=document.createElement('div');d.className=klasse;d.innerHTML=html;document.body.appendChild(d);
const b=d.getBoundingClientRect();d.style.left=(von.x-b.width/2)+'px';d.style.top=(von.y-b.height/2)+'px';d.getBoundingClientRect();
d.style.transform='translate('+(z.left+z.width/2-von.x)+'px,'+(z.top+z.height/2-von.y)+'px) scale(.15)';d.style.opacity='.2';
setTimeout(()=>{d.remove();danach&&danach();},880);
}
function antippen(sel,f){
const el=app.querySelector(sel+' .innen');TON.spiele('klick');
if(el&&!ruhig){el.classList.add('pop');setTimeout(f,300);}else f();
}
const TYPEN={
auswahl:{
html:r=>{r._o=mischen(r.optionen.map((_,k)=>k));return`<div class="optionen">${r._o.map(k=>`<button class="opt" data-k="${k}">${r.optionen[k]}</button>`).join('')}</div>`;},
ohneKnopf:true,
binden:(m,r,pruefen)=>m.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{m.dataset.wahl=b.dataset.k;pruefen();}),
pruefe:(m,r)=>{const k=+m.dataset.wahl,ok=k===(r.richtig??0);return ok;},
lesen:r=>r._o.map((k,n)=>`Antwort ${n+1}: ${r.optionen[k]}.`).join(' '),
loesung:r=>r.optionen[r.richtig??0]
},
eingabe:{
html:()=>`<input class="ein" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Antwort …" style="width:100%">`,
binden:(m,r,pruefen)=>{const i=m.querySelector('.ein');i.addEventListener('keydown',e=>{if(e.key==='Enter')pruefen();});i.addEventListener('input',()=>i.classList.remove('falsch'));},
pruefe:(m,r)=>{const i=m.querySelector('.ein');if(!i.value.trim())return null;const ok=[].concat(r.antworten||r.antwort).some(a=>gleich(a,i.value));return ok;},
lesen:()=>'',
loesung:r=>[].concat(r.antworten||r.antwort)[0]
},
wahrfalsch:{
html:r=>r.aussagen.map((a,k)=>`<div class="zeile" data-k="${k}"><span>${a.text}</span><span class="wf"><button data-w="1">Wahr</button><button data-w="0">Falsch</button></span></div>`).join(''),
binden:m=>m.querySelectorAll('.zeile').forEach(z=>z.querySelectorAll('button').forEach(b=>b.onclick=()=>{z.querySelectorAll('button').forEach(x=>x.classList.toggle('an',x===b));z.dataset.w=b.dataset.w;z.classList.remove('falsch');})),
pruefe:(m,r)=>{const z=[...m.querySelectorAll('.zeile')];if(z.some(x=>x.dataset.w===undefined))return null;let ok=true;z.forEach((x,k)=>{if((x.dataset.w==='1')!==!!r.aussagen[k].wahr){ok=false;m._falsch.push(k);}});return ok;},
teil:r=>r.aussagen.map(a=>a.hinweis),teilName:'Satz',
lesen:r=>r.aussagen.map((a,k)=>`Satz ${k+1}: ${a.text}`).join(' '),
loesung:r=>r.aussagen.map(a=>`${a.text} → ${a.wahr?'wahr':'falsch'}`).join(' | ')
},
luecke:{
woerter:r=>mischen(teile(r.text).filter((_,k)=>k%2).map(x=>ohnePunkte(x).split('|')[0]).concat((r.extraWoerter||[]).map(ohnePunkte))),
html:r=>{r._w=wortspeicher?TYPEN.luecke.woerter(r):[];
return`<div class="luecke">${teile(r.text).map((t,k)=>{if(k%2===0)return t;const l=Math.max(...ohnePunkte(t).split('|').map(x=>x.length));return`<input class="ein" data-a="${esc(ohnePunkte(t))}" size="${Math.max(5,l+1)}" autocomplete="off" autocapitalize="off" spellcheck="false"${wortspeicher?' readonly':''}>`;}).join('')}</div>`
+(wortspeicher?`<div class="wortspeicher">${r._w.map(w=>`<button class="wort" type="button">${esc(w)}</button>`).join('')}</div>`:'');},
binden:(m,r,pruefen)=>{
const f=[...m.querySelectorAll('.ein')];f.forEach(i=>i.addEventListener('input',()=>i.classList.remove('falsch')));
if(!wortspeicher){f.forEach((i,k)=>i.addEventListener('keydown',e=>{if(e.key==='Enter'){if(f[k+1])f[k+1].focus();else pruefen();}}));return;}
let ziel=null;
const markiere=i=>{f.forEach(x=>x.classList.toggle('ziel',x===i));ziel=i;};
const leere=i=>{if(i._chip){i._chip.disabled=false;i._chip=null;}i.value='';i.classList.remove('falsch');};
f.forEach(i=>i.addEventListener('click',()=>{if(i.value)leere(i);markiere(i);}));
m.querySelectorAll('.wort').forEach(b=>b.onclick=()=>{
const i=(ziel&&!ziel.value)?ziel:f.find(x=>!x.value);if(!i)return;
i.value=b.textContent;i._chip=b;b.disabled=true;i.classList.remove('falsch');
markiere(f.find(x=>!x.value)||null);
});
markiere(f[0]);
},
pruefe:m=>{const f=[...m.querySelectorAll('.ein')];if(f.some(i=>!i.value.trim()))return null;let ok=true;f.forEach((i,k)=>{if(!i.dataset.a.split('|').some(a=>gleich(a,i.value))){ok=false;m._falsch.push(k);}});return ok;},
lesen:r=>teile(r.text).map((t,k)=>k%2?' Lücke ':t).join('')+(r._w&&r._w.length?' Zur Auswahl stehen diese Wörter: '+r._w.join(', ')+'.':''),
teil:r=>r.hinweise,teilName:'Lücke',
loesung:r=>teile(r.text).filter((_,k)=>k%2).map(x=>ohnePunkte(x).split('|')[0]).join(', ')
},
zuordnen:{
html:r=>{r._r=mischen(r.paare.map((_,k)=>k));return r.paare.map((p,k)=>`<div class="zeile"><span><b>${p[0]}</b></span><select data-k="${k}"><option value="">– bitte wählen –</option>${r._r.map(j=>`<option value="${j}">${esc(ohnePunkte(r.paare[j][1]))}</option>`).join('')}</select></div>`).join('');},
binden:m=>m.querySelectorAll('select').forEach(s=>s.onchange=()=>s.classList.remove('falsch')),
pruefe:m=>{const s=[...m.querySelectorAll('select')];if(s.some(x=>x.value===''))return null;let ok=true;s.forEach((x,k)=>{if(x.value!==x.dataset.k){ok=false;m._falsch.push(k);}});return ok;},
lesen:r=>'Zuordnen: '+r.paare.map(p=>p[0]).join(', ')+'. Zur Auswahl: '+r._r.map(j=>r.paare[j][1]).join(', ')+'.',
teil:r=>r.hinweise||r.paare.map(p=>p[2]),teilName:'Zeile',
loesung:r=>r.paare.map(p=>`${p[0]} → ${p[1]}`).join(' | ')
},
reihenfolge:{
html:r=>{r._ord=mischenAnders(r.elemente.map((_,k)=>k));return`<ul class="reihe"></ul>`;},
binden:(m,r)=>{
const ul=m.querySelector('.reihe');
const zeichne=()=>{ul.innerHTML=r._ord.map((k,p)=>`<li><b>${p+1}.</b><span>${r.elemente[k]}</span><button data-p="${p}" data-d="-1" ${p===0?'disabled':''} aria-label="nach oben">▲</button><button data-p="${p}" data-d="1" ${p===r._ord.length-1?'disabled':''} aria-label="nach unten">▼</button></li>`).join('');
ul.querySelectorAll('button').forEach(b=>b.onclick=()=>{const p=+b.dataset.p,q=p+(+b.dataset.d);[r._ord[p],r._ord[q]]=[r._ord[q],r._ord[p]];zeichne();});};
zeichne();
},
pruefe:(m,r)=>r._ord.every((k,p)=>k===p),
lesen:r=>r._ord.map((k,p)=>`${p+1}. ${r.elemente[k]}`).join('. '),
loesung:r=>r.elemente.join(' → ')
},
buchstaben:{
html:r=>{const w=[...ohnePunkte(r.wort).split(' ').join('')];let b,n=0;do{b=mischen(w);}while(b.join('')===w.join('')&&++n<30);
r._b=b.map(c=>c==='ß'?c:c.toUpperCase());
const woerter=ohnePunkte(r.wort).split(' ').filter(x=>x);r._n=woerter.length;
return`<div class="felder">${woerter.map(x=>`<span class="wgr">${[...x].map(()=>'<button class="feld" type="button"></button>').join('')}</span>`).join('')}</div><div class="wortspeicher salat">${r._b.map(c=>`<button class="wort" type="button" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div>`;},
binden:m=>{const f=[...m.querySelectorAll('.feld')];
m.querySelectorAll('.salat .wort').forEach(x=>x.onclick=()=>{const z=f.find(y=>!y._b);if(!z)return;z.textContent=x.dataset.c;z._b=x;x.disabled=true;});
f.forEach(z=>z.onclick=()=>{if(!z._b)return;z._b.disabled=false;z._b=null;z.textContent='';});},
pruefe:(m,r)=>{const f=[...m.querySelectorAll('.feld')];if(f.some(z=>!z._b))return null;return norm(f.map(z=>z._b.dataset.c).join(''))===norm(ohnePunkte(r.wort).split(' ').join(''));},
lesen:r=>(r._n>1?'Gesucht sind '+r._n+' Wörter. ':'')+'Buchstaben: '+r._b.join(', ')+'.',
loesung:r=>r.wort
},
gruppen:{
html:r=>{r._e=mischen([].concat(...r.gruppen.map((g,k)=>g.begriffe.map(t=>[t,k]))));
return`<div class="wortspeicher pool">${r._e.map((e,j)=>`<button class="wort" type="button" data-j="${j}">${e[0]}</button>`).join('')}</div><div class="koerbe">${r.gruppen.map((g,k)=>`<div class="korb" data-k="${k}"><b>${g.name}</b><div class="inhalt"></div></div>`).join('')}</div>`;},
binden:m=>{const pool=m.querySelector('.pool');let sel=null;
const waehle=b=>{if(sel)sel.classList.remove('ziel');sel=b||null;if(sel)sel.classList.add('ziel');};
m.querySelectorAll('.pool .wort').forEach(b=>b.onclick=e=>{e.stopPropagation();if(b.parentNode===pool)waehle(sel===b?null:b);else{pool.appendChild(b);waehle(b);}});
m.querySelectorAll('.korb').forEach(k=>k.onclick=()=>{if(!sel)return;k.querySelector('.inhalt').appendChild(sel);waehle(pool.querySelector('.wort'));});
waehle(pool.querySelector('.wort'));},
pruefe:(m,r)=>{if(m.querySelector('.pool .wort'))return null;let ok=true;m.querySelectorAll('.korb').forEach((x,k)=>{if([...x.querySelectorAll('.wort')].some(b=>r._e[b.dataset.j][1]!==k)){ok=false;m._falsch.push(k);}});return ok;},
teil:r=>r.gruppen.map(g=>g.hinweis),teilTitel:(r,k)=>r.gruppen[k].name,
lesen:r=>'Sortiere in diese Gruppen: '+r.gruppen.map(g=>g.name).join(', ')+'. Begriffe: '+r._e.map(e=>e[0]).join(', ')+'.',
loesung:r=>r.gruppen.map(g=>g.name+': '+g.begriffe.join(', ')).join(' | ')
}
};
const FIGUREN=[
{name:'Forscherin mit Zopf',haut:'#f1c7a0',haar:'#6b3a1a',hemd:'#2f7d6b',art:'zopf'},
{name:'Forscher mit Hut',haut:'#c98e62',haar:'#2a1a10',hemd:'#c0562b',art:'hut'},
{name:'Kind mit Locken',haut:'#8d5a3b',haar:'#1d1410',hemd:'#3a6fb0',art:'locken'},
{name:'Kind mit Kopftuch',haut:'#e8b48a',haar:'#a33b6b',hemd:'#7a4ab0',art:'tuch'}
];
function figurSvg(n){
const f=FIGUREN[n]||FIGUREN[0];
const bein=(x,k)=>`<g class="bein ${k}"><rect x="${x}" y="-50" width="9" height="47" rx="4" fill="#3b4a6b"/><ellipse cx="${x+6}" cy="-3" rx="9" ry="5" fill="#2a1a10"/></g>`;
let kopf='';
if(f.art==='tuch')kopf=`<path d="M-19 -112Q-21 -140 0 -140Q21 -140 19 -112Q19 -95 8 -93L-14 -93Q-21 -99 -19 -112Z" fill="${f.haar}"/><ellipse cx="4" cy="-115" rx="11" ry="13" fill="${f.haut}"/>`;
else{
kopf=`<circle cx="0" cy="-115" r="17" fill="${f.haut}"/>`;
if(f.art==='zopf')kopf+=`<path d="M-15 -122Q-30 -116 -27 -98" stroke="${f.haar}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M-17 -116Q-17 -136 0 -134Q16 -134 17 -119Q8 -127 -5 -125Q-12 -122 -17 -116Z" fill="${f.haar}"/>`;
if(f.art==='hut')kopf+=`<path d="M-17 -112Q-18 -126 -6 -128L-2 -127Q-12 -122 -12 -110Z" fill="${f.haar}"/><ellipse cx="0" cy="-128" rx="27" ry="5" fill="#c9a26a"/><path d="M-15 -128Q-14 -147 0 -147Q14 -147 15 -128Z" fill="#c9a26a"/><rect x="-15" y="-134" width="30" height="5" fill="#7a5a32"/>`;
if(f.art==='locken')kopf+=[[-14,-122],[-8,-131],[1,-134],[10,-131],[-17,-112],[15,-124]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="${f.haar}"/>`).join('');
}
return`<ellipse cx="0" cy="-1" rx="27" ry="7" fill="rgba(0,0,0,.3)"/><g class="koerper">${bein(-11,'b1')}${bein(2,'b2')}<rect x="-30" y="-95" width="15" height="36" rx="5" fill="#8a5a2a"/><g class="arm arm2"><rect x="-1" y="-93" width="9" height="40" rx="4" fill="${f.hemd}"/><rect x="-1" y="-93" width="9" height="40" rx="4" fill="#000" opacity=".28"/><circle cx="3.5" cy="-52" r="5" fill="${f.haut}"/><circle cx="3.5" cy="-52" r="5" fill="#000" opacity=".18"/></g><path d="M-18 -50L-16 -96Q0 -103 16 -96L18 -50Z" fill="${f.hemd}"/><g class="arm"><rect x="-4" y="-93" width="9" height="38" rx="4" fill="${f.hemd}"/><circle cx="0.5" cy="-54" r="5" fill="${f.haut}"/></g><rect x="-5" y="-103" width="10" height="8" fill="${f.haut}"/>${kopf}<circle class="auge" cx="8" cy="-117" r="2.2" fill="#222"/><path d="M5 -108Q9 -106 12 -109" stroke="#222" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`;
}
const BODEN_Y=470,FIG_S=1.15,TEMPO=300;
const ruhig=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const welt=()=>SZ.welt||{w:1000,h:600};
const tiefe=y=>{const H=welt().h;return 0.78+Math.max(0,y-BODEN_Y)/Math.max(1,H-BODEN_Y)*0.42;};
const begrenze=(x,y)=>{const w=welt();return[Math.max(40,Math.min(w.w-40,x)),Math.max(BODEN_Y+22,Math.min(w.h-14,y))];};
const kamera=(x,y)=>{const w=welt();return{x:Math.max(0,Math.min(w.w-1000,x-500)),y:Math.max(0,Math.min(w.h-600,y-520))};};
const figTrans=p=>`translate(${p.x}px,${p.y}px) scale(${(tiefe(p.y)*FIG_S).toFixed(3)})`;
const kamTrans=c=>`translate(${-c.x}px,${-c.y}px)`;
const vornTrans=c=>`translate(${(-c.x*1.3).toFixed(1)}px,0px)`;
const lichtTrans=()=>`translate(${st.pos.x-st.cam.x}px,${st.pos.y-st.cam.y-90}px)`;
function figurHtml(){
const p=st.pos;
return`<g class="figurpos" data-z="${p.y}" style="transform:${figTrans(p)}"><g class="richtung" style="transform:scaleX(${p.r||1})">${figurSvg(st.figur)}</g>${st.name?`<text x="0" y="-160" text-anchor="middle" font-size="18" font-weight="700" fill="#fff3cf" stroke="#2a1a08" stroke-width="4" paint-order="stroke" font-family="Andika,Arial,sans-serif">${esc(st.name)}</text>`:''}</g>`;
}
function sortiere(){
const t=app.querySelector('.tiefe');if(!t)return;
[...t.children].sort((a,b)=>(+a.dataset.z)-(+b.dataset.z)).forEach(n=>t.appendChild(n));
}
function laufe(x,y,danach){
if(st.laeuft)return;
const g=app.querySelector('.figurpos'),w=app.querySelector('.welt');if(!g){danach&&danach();return;}
[x,y]=begrenze(x,y);
const dx=x-st.pos.x,dy=y-st.pos.y,weg=Math.sqrt(dx*dx+dy*dy);
if(Math.abs(dx)>4)st.pos.r=dx<0?-1:1;
g.querySelector('.richtung').style.transform=`scaleX(${st.pos.r||1})`;
const dauer=ruhig?0:Math.min(2.6,weg/TEMPO);
const nachVorn=y>st.pos.y;
st.pos.x=x;st.pos.y=y;st.cam=kamera(x,y);
if(nachVorn){g.dataset.z=y;sortiere();g.getBoundingClientRect();}
const v=app.querySelector('.vorn'),li=app.querySelector('.licht');
const trans=s=>{g.style.transition=s;[w,v,li].forEach(e=>{if(e)e.style.transition=s;});};
const setz=()=>{g.style.transform=figTrans(st.pos);if(w)w.style.transform=kamTrans(st.cam);if(v)v.style.transform=vornTrans(st.cam);if(li)li.style.transform=lichtTrans();};
const fertig=()=>{g.classList.remove('laeuft');trans('');g.dataset.z=y;sortiere();st.laeuft=false;danach&&danach();};
if(dauer<0.05){setz();fertig();return;}
st.laeuft=true;g.classList.add('laeuft');
trans(`transform ${dauer}s linear`);setz();
setTimeout(fertig,dauer*1000+60);
}
const objUrsprung=o=>{const s=(o.wand||o.boden===undefined)?1:tiefe(o.boden);return{s,y:(o.wand||o.boden===undefined)?o.y:o.boden-(o.fuss||0)*s};};
function standplatz(o){
if(o.wand||o.boden===undefined)return[o.x,BODEN_Y+45];
const s=tiefe(o.boden),seite=st.pos.x<o.x?-1:1;
return[o.x+seite*(o.fx??70)*s,o.boden+18];
}
function belegung(r=st.raum){
const def=raumDef(r),alle=[...(def.objekte||[]),...(def.infoObjekte||[])],nR=(def.objekte||[]).length;
const rolle=alle.map(()=>null),rae=liste(r),inf=C.raeume[r].infos||[];
const setze=(liste,typ,bevorzugt)=>{
liste.forEach((x,k)=>{const o=(x.ort|0)-1;if(o>=0&&o<alle.length&&!rolle[o])rolle[o]={typ,k};});
liste.forEach((x,k)=>{if(rolle.some(y=>y&&y.typ===typ&&y.k===k))return;
const reihe=bevorzugt();const f=reihe.find(j=>!rolle[j]);if(f!==undefined)rolle[f]={typ,k};});
};
const idx=alle.map((_,j)=>j);
setze(rae,'r',()=>idx);
setze(inf,'i',()=>idx.slice(nR).concat(idx.slice(0,nR)));
return{alle,rolle,slotR:k=>rolle.findIndex(y=>y&&y.typ==='r'&&y.k===k),slotI:k=>rolle.findIndex(y=>y&&y.typ==='i'&&y.k===k)};
}
function objR(i){const b=belegung();return b.alle[b.slotR(i)];}
function objI(k){const b=belegung();return b.alle[b.slotI(k)];}
function zumGegenstand(i){const[x,y]=standplatz(objR(i));laufe(x,y,()=>oeffneRaetsel(i));}
function zurInfo(k){const[x,y]=standplatz(objI(k));laufe(x,y,()=>zeigeInfo(k));}
function zurLeere(j){const[x,y]=standplatz(belegung().alle[j]);laufe(x,y,()=>meldeKurz(W.nichts));}
function meldeKurz(text){
const sz=app.querySelector('.szene');if(!sz)return;
let t=sz.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';sz.appendChild(t);}
t.textContent=text;t.classList.add('an');clearTimeout(t._z);t._z=setTimeout(()=>t.classList.remove('an'),2200);
if(C.vorlesen)sprich(text);
}
function zurTuer(){
const offen=noetig()-st.geloest.size;
laufe(raumDef().tuerX||500,BODEN_Y+30,()=>{if(offen>0)meldeKurz(W.erstRaetsel+' '+(offen===1?'Noch 1 Rätsel ist offen.':'Noch '+offen+' Rätsel sind offen.'));else oeffneSchloss();});
}
document.addEventListener('keydown',e=>{
const richt={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];
if(!richt||!app.querySelector('.welt')||document.querySelector('.modal-bg'))return;
e.preventDefault();laufe(st.pos.x+richt[0]*70,st.pos.y+richt[1]*45);
});
function zeigeInfo(k){antippen(`.obj[data-info="${k}"]`,()=>infoFenster(k));}
const kartenZahl=()=>`🃏 ${st.karten.length}/${C.raeume.reduce((s,r)=>s+(r.infos||[]).length,0)}`;
function zeigeMappe(){
TON.spiele('klick');
const teil=st.karten.length?C.raeume.map((R,r)=>{const ks=st.karten.filter(x=>x.raum===r);if(!ks.length)return'';
return`<h3 class="mr">${R.name||raumDef(r).titel}</h3><div class="mappe-raster">${ks.map(x=>`<div class="sk"><h3>${x.titel}</h3><p>${x.text}</p></div>`).join('')}</div>`;}).join('')
:`<p class="center">${du?'Du hast noch keine Karten. Tippe Gegenstände an, an denen kein Rätsel liegt: Dort findest du Wissenskarten.':'Ihr habt noch keine Karten. Tippt Gegenstände an, an denen kein Rätsel liegt: Dort findet ihr Wissenskarten.'}</p>`;
const m=modal(`<div class="mkopf"><h2>🃏 ${du?'Deine':'Eure'} Wissensmappe</h2><button class="x" aria-label="Schließen">×</button></div>${teil}<div class="aktionen mitte"><button class="btn ok">Zurück zum Spiel</button></div>`);
m.querySelector('.ok').onclick=schliesse;
}
function infoFenster(k){
const o=objI(k),inf=(C.raeume[st.raum].infos||[])[k]||{},kk=st.raum+'-'+k,neuKarte=!st.kartenSet.has(kk);
if(neuKarte){st.kartenSet.add(kk);st.karten.push({raum:st.raum,titel:inf.titel||o.name,text:inf.text||''});}
const bild=inf.bild?`<figure class="lernbild"><img src="${esc(ohnePunkte(inf.bild))}" alt="${esc(ohnePunkte(inf.titel||o.name))}" referrerpolicy="no-referrer" onerror="this.parentNode.remove()">${inf.quelle?`<figcaption>${inf.quelle}</figcaption>`:''}</figure>`:'';
const m=modal(`<div class="mkopf"><h2>${o.name}</h2>${vorKnopf()}<button class="x" aria-label="Schließen">×</button></div>
    <div class="keinraetsel">💡 ${W.keinRaetsel}</div>${neuKarte?`<div class="neukarte">🃏 ${du?'Neue Wissenskarte! Sie liegt jetzt in deiner Mappe.':'Neue Wissenskarte! Sie liegt jetzt in eurer Mappe.'}</div>`:''}${inf.titel?`<h3>${inf.titel}</h3>`:''}${bild}<p>${inf.text||''}</p>
    <div class="aktionen mitte"><button class="btn ok">Weiter erkunden</button></div>`,{vorlesen:()=>nurText((inf.titel?inf.titel+'. ':'')+(inf.text||'')),
danach:neuKarte?()=>{TON.spiele('karte');const mp=app.querySelector('.mappe');
fliege(`<div>🃏<br>${inf.titel||o.name}</div>`,'karte',{x:innerWidth/2,y:innerHeight/2},mp,()=>{if(mp){mp.textContent=kartenZahl();mp.classList.remove('bump');void mp.offsetWidth;mp.classList.add('bump');}});}:null});
const b=m.querySelector('.ok');b.onclick=schliesse;b.focus();
}
function raumDef(r=st.raum){
const n=r%SZ.raeume.length,d=SZ.raeume[n],e=(E.raeume||[])[n];
if(!e)return d;
const misch=(a,b)=>(a||[]).map((o,k)=>Object.assign({},o,(b||[])[k]||{}));
return Object.assign({},d,{titel:e.titel||d.titel,intro:e.intro||d.intro,introDu:e.introDu||(e.intro?null:d.introDu),
objekte:misch(d.objekte,e.objekte),infoObjekte:misch(d.infoObjekte,e.infoObjekte)});
}
const LOS={};
function los(r,n){
if(!LOS[r]||LOS[r].z.length!==n)LOS[r]={z:mischen([0,1,2,3,4,5,6,7,8,9]).slice(0,n),s:mischenAnders([...Array(n)].map((_,k)=>k+1))};
return LOS[r];
}
function liste(r=st.raum){
const max=raumDef(r).objekte.length,rae=(C.raeume[r].raetsel||[]).slice(0,max),l=los(r,rae.length);
return rae.map((x,i)=>({...x,i,
symbol:SZ.symbole[i%SZ.symbole.length],symbolName:SYMNAMEN[i%SZ.symbole.length],
stelle:l.s[i],ziffer:l.z[i]}));
}
function noetig(){const n=liste().length;return C.alleRaetsel===false?Math.max(1,n-1):n;}
function start(){
document.title=C.spielname?ohnePunkte(C.spielname):'Escape Room – '+ohnePunkte(C.titel);
const anzahl=C.raeume.reduce((s,r,i)=>s+liste(i).length,0);
const story=fuell(C.einleitung||T.einleitung);
app.innerHTML=`<div class="start">${SZ.emblem}
    <div class="szname">${SZNAME}</div>
    <h1>${C.spielname||C.titel}</h1>${C.untertitel?`<div class="unter">${C.untertitel}</div>`:''}
    <div class="chips">${C.fach?`<span class="chip">${C.fach}</span>`:''}<span class="chip">Klasse ${C.klasse}</span><span class="chip">${C.raeume.length} ${C.raeume.length===1?'Raum':'Räume'}</span><span class="chip">${anzahl} Rätsel</span><span class="chip">${mitTimer?C.timerMinuten+' Minuten':'ohne Zeitlimit'}</span></div>
    <div class="story">${vorKnopf()}${story}</div>
    <div class="namelabel">${W.figurFrage}</div>
    <div class="figwahl">${FIGUREN.map((f,k)=>`<button class="fig${k===st.figur?' an':''}" data-k="${k}" aria-label="${f.name}" title="${f.name}"><svg viewBox="-45 -152 90 160" aria-hidden="true">${figurSvg(k)}</svg></button>`).join('')}</div>
    <label class="namelabel" for="name">${W.nameFrage}</label>
    <input class="namefeld" id="name" type="text" maxlength="40" autocomplete="off" placeholder="${W.namePlatz}"><br>
    <button class="btn gross" id="los">${T.startKnopf}</button></div>`;
const v=app.querySelector('.story .vor');if(v)v.onclick=()=>sprich(nurText(story));
app.querySelectorAll('.fig').forEach(b=>b.onclick=()=>{st.figur=+b.dataset.k;app.querySelectorAll('.fig').forEach(x=>x.classList.toggle('an',x===b));});
document.getElementById('los').onclick=()=>{
TON.init();TON.spiele('klick');st.name=document.getElementById('name').value.trim();
st.start=Date.now();if(mitTimer)st.tid=setInterval(tick,1000);zeigeRaum(true);
};
}
function zeigeRaum(neu){
const def=raumDef(),rl=liste(),R=C.raeume[st.raum],infos=R.infos||[];
if(neu){const[x,y]=begrenze(def.tuerX||500,BODEN_Y+60);st.pos={x,y,r:1};}
st.cam=kamera(st.pos.x,st.pos.y);
const alle=st.geloest.size>=noetig();
let wand='',tief=[],marken='';
const lege=(o,html)=>{const u=objUrsprung(o),tr=`translate(${o.x} ${u.y})${u.s!==1?` scale(${u.s.toFixed(3)})`:''}`;
if(o.wand||o.boden===undefined)wand+=html(tr);else tief.push({z:o.boden,html:html(tr)});};
const bel=belegung();
bel.alle.forEach((o,j)=>{const ro=bel.rolle[j];
if(ro&&ro.typ==='r'){const i=ro.k,r=rl[i],g=st.geloest.has(i);
const glitz=g?'':`<g class="glitz" style="animation-delay:${(Math.random()*2.6).toFixed(2)}s"><path transform="translate(${o.bx||0} ${(o.by??-60)-16})" d="M0 -14L4 -4L14 0L4 4L0 14L-4 4L-14 0L-4 -4Z" fill="#fff6b0" stroke="#e8b830" stroke-width="1.5"/></g>`;
lege(o,tr=>`<g class="obj${g?' geloest':''}" data-i="${i}" data-z="${o.boden||0}" tabindex="0" role="button" aria-label="${esc(o.name)}" transform="${tr}"><g class="innen">${o.zeichne()}</g>${glitz}</g>`);
if(g){const u=objUrsprung(o);marken+=`<g transform="translate(${o.x+(o.bx||0)*u.s} ${u.y+(o.by??-60)*u.s})"><g class="badge${st.neu===i?' neu':''}">${badge(r)}</g></g>`;}}
else lege(o,tr=>`<g class="obj ${ro?'info':'leer'}" ${ro?`data-info="${ro.k}"`:`data-leer="${j}"`} data-z="${o.boden||0}" tabindex="0" role="button" aria-label="${esc(o.name)}" transform="${tr}"><g class="innen">${o.zeichne()}</g></g>`);});
tief.push({z:st.pos.y,html:figurHtml()});
tief.sort((a,b)=>a.z-b.z);
const frischI=st.neu;st.neu=-1;
const nr=st.raum%SZ.raeume.length;
const fund=rl.filter(r=>st.geloest.has(r.i)).map(r=>`<span class="f" data-i="${r.i}" title="${symbolModus?r.symbolName:'Stelle '+r.stelle}">${symbolModus?sym(r.symbol):`<small>${r.stelle}.</small>`}${r.ziffer}</span>`).join('')||'<span class="leer">Noch keine Ziffern gefunden</span>';
const raumName=R.name||def.titel;
app.innerHTML=`<div class="hud"><div class="raum">Raum ${st.raum+1} von ${C.raeume.length}: ${raumName}<span class="punkte">${C.raeume.map((_,k)=>k<st.raum?'●':k===st.raum?'◉':'○').join('')}</span></div>
     <div class="fund">${fund}</div>
     <div class="hudrechts">${st.name?`<span class="namechip">${esc(st.name)}</span>`:''}${mitTimer?'<div class="timer"></div>':''}<button class="btn zweit mappe" title="Wissensmappe">${kartenZahl()}</button><button class="btn zweit hilfe ton" title="Ton an oder aus">${TON.an?'🔊':'🔇'}</button><button class="btn zweit hilfe hb" title="Spielanleitung">?</button></div></div>
    <div class="auftrag">${alle?(st.geloest.size<rl.length?W.genug:W.bereit):`${W.auftrag} &nbsp;<b>Gelöst: ${st.geloest.size} von ${rl.length}</b>`}</div>
    <div class="szene"><svg viewBox="0 0 1000 600" role="img" aria-label="${esc(ohnePunkte(raumName))}"><g class="welt" style="transform:${kamTrans(st.cam)}">${def.hintergrund()}<g class="amb">${SZ.ambiente?SZ.ambiente(nr):''}</g>${SZ.tuer(rl.length,alle,def)}${wand}<g class="tiefe">${tief.map(t=>t.html).join('')}</g>${marken}</g>${lichtHtml(def)}<g class="vorn amb" style="transform:${vornTrans(st.cam)}">${SZ.vordergrund?SZ.vordergrund(nr):''}</g>${SZ.vignette||''}</svg></div>`;
zeichneTimer();
const svg=app.querySelector('.szene svg');
svg.addEventListener('click',e=>{
if(e.target.closest('.obj,.tuer'))return;
const r=svg.getBoundingClientRect(),bx=svg.clientLeft||0,by=svg.clientTop||0,bw=svg.clientWidth||r.width,bh=svg.clientHeight||r.height;
laufe((e.clientX-r.left-bx)/bw*1000+st.cam.x,(e.clientY-r.top-by)/bh*600+st.cam.y);
});
app.querySelectorAll('.obj').forEach(g=>{
const f=g.dataset.info!==undefined?()=>zurInfo(+g.dataset.info):(g.dataset.leer!==undefined?()=>zurLeere(+g.dataset.leer):()=>zumGegenstand(+g.dataset.i));
g.addEventListener('click',f);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f();}});});
const t=app.querySelector('.tuer');t.addEventListener('click',zurTuer);t.addEventListener('keydown',e=>{if(e.key==='Enter')zurTuer();});
app.querySelector('.hb').onclick=anleitung;app.querySelector('.mappe').onclick=zeigeMappe;
app.querySelector('.ton').onclick=e=>{TON.an=!TON.an;e.currentTarget.textContent=TON.an?'🔊':'🔇';TON.spiele('klick');};
if(frischI>=0){
const rr=app.querySelector('.richtung');if(rr&&!ruhig){rr.classList.add('jubel');setTimeout(()=>rr.classList.remove('jubel'),2200);}
const ch=app.querySelector(`.fund .f[data-i="${frischI}"]`),sz=app.querySelector('.szene').getBoundingClientRect();
if(ch){ch.style.visibility='hidden';TON.spiele('flug');fliege(`<div>${rl[frischI].ziffer}</div>`,'zflug',{x:sz.left+sz.width/2,y:sz.top+sz.height/2},ch,()=>{ch.style.visibility='';ch.classList.add('pulst');});}
}
if(neu)meldung(raumName,fuell(R.text||(du&&def.introDu)||def.intro),'Los geht&rsquo;s');
}
function lichtHtml(def){
const L=def.licht;if(!L)return'';
const f=L.farbe||'#000',d=L.dunkel||.5,x=st.pos.x-st.cam.x,y=st.pos.y-st.cam.y-90;
return(L.ton?`<rect class="tont" width="1000" height="600" fill="${L.ton}" opacity="${L.a||.15}"/>`:'')
+(L.spot?`<defs><radialGradient id="lichtG" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="${L.r||330}"><stop offset="0" stop-color="${f}" stop-opacity="0"/><stop offset=".55" stop-color="${f}" stop-opacity="${(d*.3).toFixed(2)}"/><stop offset="1" stop-color="${f}" stop-opacity="${d}"/></radialGradient></defs><g class="licht" style="transform:translate(${x}px,${y}px)"><rect x="-1700" y="-1700" width="3400" height="3400" fill="url(#lichtG)"/></g>`:'');
}
function badge(r){
const z=`font-family="Andika,Arial,sans-serif" font-weight="700" fill="#2a1a08" text-anchor="middle"`;
return`<rect x="-40" y="-23" width="80" height="46" rx="9" fill="#f4e2b0" stroke="#8a6420" stroke-width="3"/>`+(symbolModus
?`<use href="#sym-${r.symbol}" x="-37" y="-18" width="36" height="36" color="#1f3f55"/><text x="18" y="12" font-size="32" ${z}>${r.ziffer}</text>`
:`<text x="0" y="7" font-size="28" ${z}>${r.ziffer}</text><text x="0" y="19" font-size="10" ${z}>Stelle ${r.stelle}</text>`);
}
function anleitung(){
const a=W.anl;
meldung('So funktioniert es',`<b>1.</b> ${a[0]}<br><b>2.</b> ${a[1]}${symbolModus?' mit einem Zeichen':' und die passende Stelle'}.<br><b>3.</b> ${a[2]}<br><b>4.</b> ${a[3]}${mitTimer&&C.hinweisStrafeSekunden>0?` (kostet ${C.hinweisStrafeSekunden} Sekunden)`:''}.<br><br>${a[4]}`,'Verstanden');
}
function oeffneRaetsel(i){
if(st.geloest.has(i))return raetselFenster(i);
antippen(`.obj[data-i="${i}"]`,()=>raetselFenster(i));
}
function raetselFenster(i){
const r=liste()[i],o=objR(i);
if(st.geloest.has(i))return zeigeFund(r,o,false);
const typ=TYPEN[r.typ];if(!typ){meldung('Fehler',`Unbekannter Rätseltyp: ${esc(r.typ)}`);return;}
const key=st.raum+'-'+i;
const koerper=typ.html(r);
const m=modal(`<div class="mkopf"><h2>${o.name}</h2>${vorKnopf()}<button class="x" aria-label="Schließen">×</button></div>
    <div class="frage">${r.frage||''}</div><div class="koerper">${koerper}</div>
    <div class="feedback" aria-live="polite"></div>
    <div class="aktionen">${typ.ohneKnopf?'':'<button class="btn pruefen">Prüfen</button>'}<button class="btn zweit hinweis">Hinweis</button></div>
    <div class="hinweistext" hidden></div>`,{vorlesen:()=>nurText((r.frage||'')+' '+typ.lesen(r))});
const fb=m.querySelector('.feedback'),hb=m.querySelector('.hinweis');
const pruefen=()=>{
m._falsch=[];const erg=typ.pruefe(m,r);m._geprueft=true;
if(erg===null){fb.className='feedback bad';fb.textContent=W.alleTeile;return;}
if(erg){st.geloest.add(i);st.neu=i;zeigeFund(r,o,true);return;}
st.fehler[key]=(st.fehler[key]||0)+1;
fb.className='feedback bad';fb.textContent=T.falsch[(st.fehler[key]-1)%T.falsch.length];wackeln(m);TON.spiele('falsch');
if(st.fehler[key]>=2)hb.classList.add('puls');
};
typ.binden&&typ.binden(m,r,pruefen);
const pb=m.querySelector('.pruefen');if(pb)pb.onclick=pruefen;
hb.onclick=()=>{
const ht=m.querySelector('.hinweistext');hb.classList.remove('puls');
let extra='';
if(!st.hinweisSet.has(key)){st.hinweisSet.add(key);st.hinweise++;if(mitTimer&&C.hinweisStrafeSekunden>0){st.rest-=C.hinweisStrafeSekunden;zeichneTimer();extra=` <small>(−${C.hinweisStrafeSekunden} Sek.)</small>`;}}
let h=r.hinweis||W.lesen;
const th=typ.teil?typ.teil(r):null;
if(th&&m._falsch&&m._falsch.length){const t=m._falsch.filter(k=>th[k]).map(k=>`<br><b>${typ.teilTitel?typ.teilTitel(r,k):typ.teilName+' '+(k+1)}:</b> ${th[k]}`);if(t.length)h=t.join('');}
else if(th&&th.some(Boolean)&&!m._geprueft)h=(r.hinweis?r.hinweis+'<br>':'')+W.erstPruefen;
ht.innerHTML=`<b>${T.hinweisGeber}</b> ${h}${extra}`;ht.hidden=false;
if(C.vorlesen)sprich(nurText(h));
};
}
function zeigeFund(r,o,frisch){
const satz=symbolModus?`Das Zeichen <b>${r.symbolName}</b> steht für die Ziffer <b>${r.ziffer}</b>. ${W.merken}`:`Die Ziffer <b>${r.ziffer}</b> gehört an die <b>${r.stelle}. Stelle</b> des Schlosses. ${W.merken}`;
const m=modal(`<div class="mkopf"><h2>${frisch?T.richtig:o.name}</h2>${vorKnopf()}${frisch?'':'<button class="x" aria-label="Schließen">×</button>'}</div>
    ${frisch&&r.erklaerung?`<div class="erklaerung">${r.erklaerung}</div>`:''}
    <p class="center">${o.fund||W.gefunden}</p>
    <div class="tafel">${symbolModus?sym(r.symbol):''}<div><span class="z">${r.ziffer}</span>${symbolModus?'':`<small>Stelle ${r.stelle}</small>`}</div></div>
    <p class="center">${satz}</p>
    <div class="aktionen mitte"><button class="btn ok">Weiter</button></div>`,{danach:frisch?()=>zeigeRaum():null,vorlesen:()=>nurText((frisch&&r.erklaerung?r.erklaerung+' ':'')+satz)});
const b=m.querySelector('.ok');b.onclick=schliesse;b.focus();
if(frisch){const q=m.querySelector('.tafel').getBoundingClientRect();konfetti(q.left+q.width/2,q.top+q.height/2);TON.spiele('richtig');}
}
function oeffneSchloss(){
const sortiert=[...liste()].sort((a,b)=>a.stelle-b.stelle),werte=sortiert.map(()=>0);
const text=symbolModus?T.schlossSymbol:T.schlossStelle;
const frei=sortiert.some(r=>!st.geloest.has(r.i));
const m=modal(`<div class="mkopf"><h2>${T.schlossTitel}</h2>${vorKnopf()}<button class="x" aria-label="Schließen">×</button></div>
    <p>${text}${frei?' '+W.radFrei:''}</p>
    <div class="buegel"><svg viewBox="0 0 70 62" aria-hidden="true"><path class="bg" d="M16 30V20A19 19 0 0 1 54 20V30" fill="none" stroke="#9aa3ad" stroke-width="7" stroke-linecap="round"/><rect class="kasten" x="8" y="30" width="54" height="30" rx="6" fill="#d8a73a" stroke="#6b4a1c" stroke-width="3"/><circle cx="35" cy="42" r="4" fill="#3a2610"/><rect x="33" y="44" width="4" height="9" fill="#3a2610"/></svg></div>
    <div class="schloss">${sortiert.map((r,k)=>{const f=!st.geloest.has(r.i);return`<div class="rad${f?' frei':''}" data-k="${k}"><div class="sy" title="${symbolModus?r.symbolName:''}">${symbolModus?sym(r.symbol):(k+1)+'.'}</div><button class="hoch" aria-label="Ziffer erhöhen"${f?' disabled':''}>▲</button><div class="zahl">${f?'?':0}</div><button class="runter" aria-label="Ziffer verringern"${f?' disabled':''}>▼</button></div>`;}).join('')}</div>
    <div class="feedback" aria-live="polite"></div>
    <div class="aktionen mitte"><button class="btn oeffnen">Schloss öffnen</button></div>`,{vorlesen:()=>text+(frei?' '+W.radFrei:'')});
m.querySelectorAll('.rad:not(.frei)').forEach(rad=>{const k=+rad.dataset.k,z=rad.querySelector('.zahl');
const setze=d=>{werte[k]=(werte[k]+d+10)%10;z.textContent=werte[k];z.classList.remove('roll','ab');void z.offsetWidth;z.classList.add('roll');if(d<0)z.classList.add('ab');TON.spiele('tick');};
rad.querySelector('.hoch').onclick=()=>setze(1);rad.querySelector('.runter').onclick=()=>setze(-1);
rad.addEventListener('wheel',e=>{e.preventDefault();setze(e.deltaY<0?1:-1);},{passive:false});});
m.querySelector('.oeffnen').onclick=()=>{
const bg=m.querySelector('.buegel');
if(sortiert.every((r,k)=>!st.geloest.has(r.i)||werte[k]===+r.ziffer)){bg.classList.add('offen');TON.spiele('auf');m.querySelector('.oeffnen').disabled=true;setTimeout(()=>{schliesse();tuerAuf();},ruhig?0:1400);}
else{const fb=m.querySelector('.feedback');fb.className='feedback bad';fb.textContent=T.schlossFalsch;wackeln(m);TON.spiele('falsch');bg.classList.remove('nein');void bg.offsetWidth;bg.classList.add('nein');}
};
}
function tuerAuf(){
const t=app.querySelector('.tuer');t.classList.remove('bereit');t.classList.add('offen');TON.spiele('tuer');
const sv=app.querySelector('.szene svg'),von=st.raum;
if(sv&&!ruhig)setTimeout(()=>{sv.style.transformOrigin=(((raumDef().tuerX||500)-st.cam.x)/10)+'% 55%';sv.style.transition='transform 1.3s ease-in';sv.style.transform='scale(1.8)';},900);
const g=app.querySelector('.figurpos');
if(g&&!ruhig)setTimeout(()=>{g.classList.add('laeuft');const tx=raumDef().tuerX||500;g.style.transition='transform 1s linear, opacity 1s ease-in';g.style.transform=`translate(${tx}px,${BODEN_Y}px) scale(${(tiefe(BODEN_Y)*FIG_S*.75).toFixed(3)})`;g.style.opacity='0';},900);
setTimeout(()=>blende(()=>{st.raum++;st.geloest=new Set();if(st.raum>=C.raeume.length)ende();else zeigeRaum(true);},von),1900);
}
function reiseHtml(von,nach){
let r='';for(let k=0;k<C.raeume.length;k++){if(k>0)r+=`<div class="lin${k<=von?' da':''}">${k===nach?'<i></i>':''}</div>`;r+=`<div class="pkt${k<=von?' da':''}${k===nach?' neu':''}">${k+1}</div>`;}
return`<div class="reise"><div class="fg laeuft"><svg viewBox="-45 -152 90 160" aria-hidden="true">${figurSvg(st.figur)}</svg></div><div class="route">${r}</div><h2>Raum ${nach+1}: ${C.raeume[nach].name||raumDef(nach).titel}</h2></div>`;
}
function blende(mitte,von){
let b=document.querySelector('.blende');if(!b){b=document.createElement('div');b.className='blende';document.body.appendChild(b);}
const reise=von!==undefined&&von+1<C.raeume.length&&!ruhig;
b.innerHTML=reise?reiseHtml(von,von+1):'';
b.classList.add('an');setTimeout(()=>{mitte();window.scrollTo(0,0);b.classList.remove('an');setTimeout(()=>{b.innerHTML='';},800);},reise?2300:750);
}
function tick(){st.rest--;zeichneTimer();if(st.rest<=0&&!st.zeitUm){st.zeitUm=true;meldung(T.zeitUmTitel,T.zeitUm,'Weiterspielen');}}
function zeichneTimer(){const el=app.querySelector('.timer');if(!el)return;
if(st.rest>0){el.textContent='⏳ '+fmt(st.rest);el.className='timer'+(st.rest<=300?' knapp':'');}
else{el.textContent='+'+fmt(-st.rest);el.className='timer um';}}
function ende(){
clearInterval(st.tid);const dauer=(Date.now()-st.start)/1000;
const text=fuell(C.abschluss||T.abschluss);
app.innerHTML=`<div class="szene"><svg viewBox="0 0 1000 600" role="img" aria-label="Ausgang">${SZ.ausgang()}<g transform="translate(500 575) scale(1.5)"><g class="jubel">${figurSvg(st.figur)}</g></g></svg></div>
   <div class="start"><h1>${st.name?'Geschafft, '+esc(st.name)+'!':T.geschafft}</h1><div class="story">${vorKnopf()}${text}</div>
   <div class="chips"><span class="chip">Benötigte Zeit: ${fmt(dauer)} min</span><span class="chip">Hinweise genutzt: ${st.hinweise}</span>${mitTimer?`<span class="chip">${st.rest>=0?'In der Zeit geschafft!':'Zeit überschritten um '+fmt(-st.rest)+' min'}</span>`:''}</div>
   <button class="btn" onclick="location.reload()">Noch einmal spielen</button></div>`;
const v=app.querySelector('.story .vor');if(v)v.onclick=()=>sprich(nurText(text));
}
start();
})();