/* Lucy's 11+ Lagoon — app engine. Works on its own (saved on this device) or with Firebase via cloud.js. */
"use strict";
const app = document.getElementById("app");
const $ = s => app.querySelector(s);
const $$ = s => [...app.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const strip = s => String(s ?? "").replace(/<[^>]+>/g, "");
const rnd = (a,b) => a + Math.floor(Math.random()*(b-a+1));
const pick = a => a[Math.floor(Math.random()*a.length)];
const shuffle = a => { a = [...a]; for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };
const today = () => new Date().toISOString().slice(0,10);
const top0 = () => window.scrollTo({top:0, behavior:"instant"});

/* ---------------- worlds ---------------- */
const SUBJECTS = [
  {id:"english",  name:"Word Lagoon",    em:"📚", bg:"linear-gradient(135deg,#14b8a6,#0e7490)", tint:"#ccfbf1", blurb:"Reading, vocab, grammar, spelling"},
  {id:"maths",    name:"Number Reef",    em:"🔢", bg:"linear-gradient(135deg,#3b82f6,#1e3a8a)", tint:"#dbeafe", blurb:"Arithmetic to algebra"},
  {id:"science",  name:"Science Lab",    em:"🔬", bg:"linear-gradient(135deg,#8b5cf6,#4c1d95)", tint:"#ede9fe", blurb:"Bugs, bodies, forces, space"},
  {id:"history",  name:"Time Travel",    em:"🏛️", bg:"linear-gradient(135deg,#06b6d4,#4f46e5)", tint:"#cffafe", blurb:"Stone Age to Cottonopolis"},
  {id:"geography",name:"Explorer's Map", em:"🗺️", bg:"linear-gradient(135deg,#0d9488,#2563eb)", tint:"#ccfbf1", blurb:"Maps, rivers, biomes"},
  {id:"arts",     name:"Stage Door",     em:"🎭", bg:"linear-gradient(135deg,#a855f7,#be185d)", tint:"#fae8ff", blurb:"Music, art, sewing, code, Spanish"},
  {id:"writing",  name:"Story Studio",   em:"✍️", bg:"linear-gradient(135deg,#7c3aed,#0f766e)", tint:"#ede9fe", blurb:"Creative writing practice"}
];
const subjOf = id => SUBJECTS.find(s => s.id === id);
const TYPE_ICON = {quiz:"❓", reading:"📖", blanks:"🧩", sort:"🗂️", match:"🔗", order:"🪜", label:"🏷️", gen:"✨"};
const LVNAME = {5:"Y5", 6:"Y6", 7:"Y7 stretch"};

/* ---------------- Lottie the axolotl ---------------- */
const RANKS = [
  {xp:0,    name:"Tiny Tadpole",     body:"#fbcfe8", gill:"#f472b6"},
  {xp:150,  name:"Pond Paddler",     body:"#fde2e4", gill:"#fb7185"},
  {xp:400,  name:"Gill Wiggler",     body:"#99f6e4", gill:"#14b8a6"},
  {xp:800,  name:"Canal Cruiser",    body:"#a5f3fc", gill:"#0891b2"},
  {xp:1400, name:"Lagoon Explorer",  body:"#bfdbfe", gill:"#3b82f6"},
  {xp:2200, name:"Reef Ranger",      body:"#c7d2fe", gill:"#6366f1"},
  {xp:3200, name:"Chorus Star",      body:"#ddd6fe", gill:"#8b5cf6"},
  {xp:4500, name:"Understudy",       body:"#e9d5ff", gill:"#a855f7"},
  {xp:6000, name:"Leading Lady",     body:"#f5d0fe", gill:"#c026d3"},
  {xp:8000, name:"Showstopper",      body:"#fde68a", gill:"#8b5cf6"},
  {xp:11000,name:"Lagoon Legend",    body:"#5eead4", gill:"#7c3aed"}
];
function rank(xp){ let i = 0; RANKS.forEach((r,j) => { if(xp >= r.xp) i = j; }); const nx = RANKS[i+1]; return {i, ...RANKS[i], next: nx ? nx.xp : null, prev: RANKS[i].xp}; }
function lottie(r, extra=""){
  const b = r.body, g = r.gill, crown = r.i >= 9 ? `<path d="M74 22 l8 -14 l8 12 l8 -12 l8 14 z" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>` : "";
  const gills = side => [0,1,2].map(k => { const y = 44 + k*15, dx = side*(34+k*2); return `<path d="M${90+side*34} ${y+8} q${dx*.55} ${-16+k*7} ${dx} ${-8+k*9}" stroke="${g}" stroke-width="9" stroke-linecap="round" fill="none"/><circle cx="${90+side*34+dx}" cy="${y}" r="5" fill="${g}" transform="translate(0 ${k*9-8})"/>`; }).join("");
  return `<svg viewBox="0 0 180 160" class="lot ${extra}" role="img" aria-label="Lottie the axolotl">
    <path d="M140 108 q34 -14 34 10 q-16 8 -34 4 z" fill="${b}" stroke="${g}" stroke-width="3"/>
    <ellipse cx="96" cy="114" rx="56" ry="28" fill="${b}" stroke="#00000018" stroke-width="2"/>
    <ellipse cx="60" cy="138" rx="10" ry="7" fill="${b}" stroke="#00000018"/><ellipse cx="128" cy="140" rx="10" ry="7" fill="${b}" stroke="#00000018"/>
    ${gills(-1)}${gills(1)}
    <ellipse cx="90" cy="68" rx="44" ry="36" fill="${b}" stroke="#00000018" stroke-width="2"/>
    ${crown}
    <circle cx="72" cy="64" r="6" fill="#1e1b4b"/><circle cx="108" cy="64" r="6" fill="#1e1b4b"/>
    <circle cx="74" cy="62" r="2" fill="#fff"/><circle cx="110" cy="62" r="2" fill="#fff"/>
    <path d="M74 80 q16 12 32 0" stroke="#1e1b4b" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="63" cy="78" r="5.5" fill="#f9a8d4" opacity=".75"/><circle cx="117" cy="78" r="5.5" fill="#f9a8d4" opacity=".75"/>
    <circle cx="96" cy="112" r="4" fill="${g}" opacity=".35"/><circle cx="112" cy="120" r="3" fill="${g}" opacity=".35"/><circle cx="80" cy="122" r="3" fill="${g}" opacity=".35"/>
  </svg>`;
}

/* ---------------- stickers ---------------- */
const STICKERS = [
  ["🐞","Ladybird"],["🐝","Honeybee"],["🦋","Butterfly"],["🐛","Caterpillar"],["🐜","Ant"],["🦗","Cricket"],["🪲","Beetle"],["🐌","Snail"],["🕷️","Spider"],["🪱","Worm"],["🦂","Scorpion"],["🪰","Fly"],
  ["🦎","Axolotl pal"],["🐠","Tropical fish"],["🐙","Octopus"],["🐢","Turtle"],["🐬","Dolphin"],["🦭","Seal"],["🐳","Whale"],["🦈","Shark"],["🪼","Jellyfish"],["🦀","Crab"],["🐸","Frog"],["🦜","Parrot"],
  ["🦊","Fox"],["🦉","Owl"],["🦔","Hedgehog"],["🐼","Panda"],["🦦","Otter"],["🐨","Koala"],
  ["🧵","Thread"],["🪡","Needle"],["🧶","Yarn"],["✂️","Scissors"],["📏","Ruler"],["🪢","Knot"],["👗","Dress"],["🎀","Ribbon"],
  ["🎤","Microphone"],["🎭","Theatre masks"],["🎶","Music"],["🎹","Keyboard"],["🎻","Violin"],["🌟","Spotlight star"],["🎟️","Ticket"],["💃","Dancer"],
  ["🔬","Microscope"],["🧪","Test tube"],["🧲","Magnet"],["🌋","Volcano"],["🪐","Planet"],["🔭","Telescope"],["🦕","Dinosaur"],["🏺","Ancient pot"],["🏰","Castle"],["🗺️","Treasure map"],["🧭","Compass"],["💎","Gem"]
];
const STARS_PER_STICKER = 4;

/* ---------------- player state ---------------- */
let CLOUD = null, USER = null, MODE = "local"; // local | child | preview
let P = null, saveTimer = null;
const LKEY = "lucy11_v1";
function fresh(){ return {name:"Lucy", xp:0, stars:{}, attempts:[], misses:{}, stickers:[], streak:{last:"", n:0}, writing:[], typing:[], target:5, settings:{sound:true, clock:false}, created:Date.now(), updated:0}; }
function normalise(p){ const f = fresh(); p = Object.assign(f, p||{}); p.settings = Object.assign(fresh().settings, p.settings||{}); return p; }
function saveLocal(){ if(MODE === "preview") return; try{ localStorage.setItem(LKEY + (USER ? ":"+USER.uid : ""), JSON.stringify(P)); }catch(e){} }
function save(now){
  if(MODE === "preview") return;
  P.updated = Date.now(); saveLocal();
  if(MODE !== "child" || !CLOUD) return;
  clearTimeout(saveTimer);
  const go = () => CLOUD.savePlayer(USER.uid, P).catch(e => toast("Couldn't sync yet: it will try again"));
  if(now) go(); else saveTimer = setTimeout(go, 1500);
}
function loadLocal(uid){ try{ const s = localStorage.getItem(LKEY + (uid ? ":"+uid : "")); return s ? JSON.parse(s) : null; }catch(e){ return null; } }

/* ---------------- sound & fx ---------------- */
let AC = null;
function tone(freqs, dur=.12, type="sine", gap=.09){
  if(!P || !P.settings.sound) return;
  try{ AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const t0 = AC.currentTime;
    freqs.forEach((f,i) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(.0001, t0+i*gap); g.gain.exponentialRampToValueAtTime(.18, t0+i*gap+.02); g.gain.exponentialRampToValueAtTime(.0001, t0+i*gap+dur);
      o.connect(g).connect(AC.destination); o.start(t0+i*gap); o.stop(t0+i*gap+dur+.05); });
  }catch(e){}
}
const sfx = { right:() => tone([660,880]), wrong:() => tone([220,180], .18, "triangle"), done:() => tone([523,659,784,1046], .2), tap:() => tone([520], .05) };
function confetti(n=70){ const fx = document.getElementById("fx"); const cols = ["#14b8a6","#3b82f6","#8b5cf6","#f0abfc","#5eead4","#a5b4fc","#fbbf24"];
  for(let i=0;i<n;i++){ const c = document.createElement("i"); c.style.left = Math.random()*100+"vw"; c.style.background = pick(cols);
    c.style.animationDuration = (1.8+Math.random()*1.8)+"s"; c.style.animationDelay = (Math.random()*.5)+"s"; c.style.transform = `rotate(${rnd(0,90)}deg)`; fx.appendChild(c); setTimeout(() => c.remove(), 4200); } }
function toast(msg){ const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }
function shake(el){ if(!el) return; el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); }
function banner(){ document.getElementById("banner").innerHTML = MODE === "preview" ? "👀 Preview mode: try anything, nothing is saved to Lucy's scores" : ""; }

/* ---------------- answer checking ---------------- */
function norm(s){ return String(s ?? "").toLowerCase().replace(/[−–]/g,"-").replace(/[£°%]|cm³|cm²|cm|km|kg|ml|\s/g,"").replace(/,(?=\d{3})/g,""); }
function num(s){ s = norm(s); if(/^-?\d+(\.\d+)?\/-?\d+(\.\d+)?$/.test(s)){ const [a,b] = s.split("/").map(Number); return b ? a/b : NaN; } return /^-?\d*\.?\d+$/.test(s) ? Number(s) : NaN; }
function isRight(user, it){
  const u = norm(user), a = norm(it.a);
  if(!u) return false;
  if(u === a) return true;
  if(it.exact){ if(a.includes(":") && /^\d{1,2}[.:]?\d{2}$/.test(u)){ const t = u.replace(/[.:]/,""); return t.padStart(4,"0") === a.replace(":","").padStart(4,"0"); }
    return u.replace(/\+-/g,"-") === a; }
  const x = num(u), y = num(a); return !isNaN(x) && !isNaN(y) && Math.abs(x-y) < 1e-6;
}

/* ---------------- building items ---------------- */
function mcqOpts(opts){ const all = opts.find(o => /^all of these$/i.test(o)); const rest = shuffle(opts.filter(o => o !== all)); return all ? [...rest, all] : rest; }
function genItem(gen, L, meta){ const g = GENS[gen]; let it = null;
  for(let tries=0; tries<6 && (!it || it.a == null || it.a === "NaN"); tries++) it = g.make(L);
  const base = {...meta, gen, q:it.q, a:it.a, disp:it.disp, svg:it.svg, hint:it.hint, exact:it.exact};
  if(it.opts) return {...base, kind:"mcq", opts:shuffle(it.opts)};
  if(g.ui === "numline") return {...base, kind:"numline", min:it.min, max:it.max, tol:it.tol, ticks:it.ticks};
  if(g.ui === "grid") return {...base, kind:"grid", grid:it.grid, mode:it.mode};
  return {...base, kind:"keypad"};
}
function itemsFor(set, max=10){
  const meta = i => ({sid:set.id, sub:set.subject, lv:set.level, topic:set.topic, key:`${set.id}#${i}`});
  if(set.type === "quiz") return shuffle(set.items.map((x,i) => ({...meta(i), kind:"mcq", q:x.q, opts:mcqOpts(x.opts), a:x.a, why:x.why}))).slice(0,max);
  if(set.type === "reading") return set.items.map((x,i) => x.find ? ({...meta(i), kind:"find", q:x.q, a:x.a, passage:set.passage, source:set.source})
                                                              : ({...meta(i), kind:"mcq", q:x.q, opts:mcqOpts(x.opts), a:x.a, why:x.why, passage:set.passage, source:set.source}));
  if(set.type === "blanks") return shuffle(set.items.map((x,i) => ({...meta(i), kind:"blanks", text:x.text, ans:x.a, extra:x.extra||[]}))).slice(0,max);
  if(set.type === "gen") return Array.from({length:set.count||8}, (_,i) => genItem(set.gen, set.level, {...meta("g"), key:null}));
  return [{...meta(0), kind:set.type, set}];
}

/* ---------------- round runner ---------------- */
let RUN = null, tick = null;
function startRound({title, items, sid=null, mode="set", limit=0, back}){
  RUN = {title, items, i:0, done:[], sid, mode, limit, back, start:Date.now(), perQ: mode==="set" && P.settings.clock ? 40 : 0, qStart:Date.now()};
  clearInterval(tick); tick = setInterval(updTimer, 500);
  showItem();
}
function updTimer(){
  const el = document.getElementById("tmr"); if(!el || !RUN) return;
  const now = Date.now();
  if(RUN.limit){ const left = Math.max(0, RUN.limit - (now-RUN.start)/1000); el.textContent = "⏳ " + mmss(left); el.classList.toggle("low", left < 60); if(left <= 0) finishRound(); return; }
  if(RUN.perQ && !RUN.answered){ const left = Math.max(0, RUN.perQ - (now-RUN.qStart)/1000); el.textContent = "⏱ " + Math.ceil(left); el.classList.toggle("low", left < 10); if(left <= 0) timeUp(); return; }
  el.textContent = "⏱ " + mmss((now-RUN.start)/1000); el.classList.remove("low");
}
const mmss = s => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
function head(){
  const n = RUN.items.length, pct = Math.round(RUN.i/n*100);
  return `<div class="playhead"><button class="back" id="quit">✕</button><div class="prog"><b style="width:${pct}%"></b></div><span class="timer" id="tmr"></span></div>
    <p class="muted" style="margin:6px 0 0"><b>${esc(RUN.title)}</b> · ${RUN.i+1} of ${n}</p>`;
}
function showItem(){
  if(!RUN) return;
  if(RUN.i >= RUN.items.length) return finishRound();
  const it = RUN.items[RUN.i]; RUN.answered = false; RUN.qStart = Date.now();
  app.innerHTML = head() + `<div class="card stitch" id="stage"></div>`;
  $("#quit").onclick = () => { if(confirm("Leave this round? Your answers so far won't count.")){ clearInterval(tick); RUN = null; (RUN_BACK || home)(); } };
  RUN_BACK = RUN.back;
  top0(); updTimer();
  const st = $("#stage");
  ({mcq:renderMCQ, find:renderFind, blanks:renderBlanks, keypad:renderKeypad, numline:renderNumline, grid:renderGrid, sort:renderSort, match:renderMatch, order:renderOrder, label:renderLabel})[it.kind](st, it);
}
let RUN_BACK = null;
function record(it, ok, worth=1, okCount=ok?1:0){ RUN.done.push({it, ok, worth, okCount}); }
function nextBtn(st, ok, it, extra=""){
  RUN.answered = true;
  const why = it.why ? `<div>${it.why}</div>` : it.hint && !ok ? `<div>💡 ${it.hint}</div>` : "";
  st.insertAdjacentHTML("beforeend", `<div class="fb ${ok?"good":"bad"}">${ok ? pick(["Brilliant! 🌟","Spot on! 💙","Yes! 🦎✨","Fin-tastic! 🐠","Nailed it! 🎶"]) : `Not quite. The answer is <b>${extra || it.a}</b>.`}${why}</div>
    <div class="row"><span class="spacer"></span><button class="btn" id="nx">${RUN.i+1 >= RUN.items.length ? "Finish ✨" : "Next →"}</button></div>`);
  ok ? sfx.right() : sfx.wrong();
  const nx = st.querySelector("#nx"); nx.focus({preventScroll:true}); nx.onclick = () => { RUN.i++; showItem(); };
  nx.scrollIntoView({block:"nearest", behavior:"smooth"});
}
function timeUp(){
  if(!RUN || RUN.answered) return; const it = RUN.items[RUN.i]; const st = $("#stage"); if(!st) return;
  if(["sort","match","order","label"].includes(it.kind)) return; // whole-screen tasks aren't timed per question
  st.querySelectorAll("button").forEach(b => b.disabled = true);
  record(it, false); nextBtn(st, false, it);
  st.querySelector(".fb").insertAdjacentHTML("afterbegin", "⏰ Time's up! ");
}
function passageBlock(it, tappable){
  if(!it.passage) return "";
  const body = tappable ? it.passage.replace(/([A-Za-zÀ-ÿ'’-]+)/g, `<span class="w">$1</span>`) : esc(it.passage);
  const inner = `<div class="passage ${tappable?"tap":""}">${body}</div>${it.source?`<div class="src">${esc(it.source)}</div>`:""}`;
  return tappable ? inner : `<details class="ptoggle" ${RUN.i===0 || RUN.mode!=="set" ? "open":""}><summary>📖 Read the passage</summary>${inner}</details>`;
}
function renderMCQ(st, it){
  const keys = "ABCDEF";
  st.innerHTML = passageBlock(it,false) + (it.svg||"") + `<div class="q">${it.q}</div><div class="opts ${it.opts.every(o => strip(o).length < 22) ? "two":""}">` +
    it.opts.map((o,i) => `<button class="opt" data-o="${esc(o)}"><span class="k">${keys[i]}</span><span>${o}</span></button>`).join("") + `</div>`;
  st.querySelectorAll(".opt").forEach(b => b.onclick = () => {
    if(RUN.answered) return; const ok = b.dataset.o === it.a;
    st.querySelectorAll(".opt").forEach(x => { x.disabled = true; if(x.dataset.o === it.a) x.classList.add("right"); });
    if(!ok){ b.classList.add("wrong"); shake(b); }
    record(it, ok); nextBtn(st, ok, it);
  });
}
function renderFind(st, it){
  st.innerHTML = `<div class="q">${it.q}</div>` + passageBlock(it,true) + (it.source?"":"");
  st.querySelectorAll(".w").forEach(w => w.onclick = () => {
    if(RUN.answered) return; const ok = w.textContent.toLowerCase().replace(/[’']/g,"'") === it.a.toLowerCase();
    if(ok) w.classList.add("hit"); else { w.classList.add("miss"); st.querySelectorAll(".w").forEach(x => { if(x.textContent.toLowerCase() === it.a.toLowerCase()) x.classList.add("hit"); }); }
    record(it, ok); nextBtn(st, ok, it);
  });
}
function renderBlanks(st, it){
  const parts = it.text.split("___"), n = parts.length - 1;
  const bank = shuffle([...it.ans, ...it.extra]); const fill = Array(n).fill(null);
  const draw = () => {
    st.innerHTML = `<div class="q">Tap the words to fill the gap${n>1?"s":""}.</div><div class="blanktext">` +
      parts.map((p,i) => esc(p) + (i < n ? `<span class="slot ${fill[i]!=null?"filled":""}" data-s="${i}">${fill[i]!=null ? esc(bank[fill[i]]) : "&nbsp;"}</span>` : "")).join("") +
      `</div><div class="bank">${bank.map((w,i) => `<button class="tok ${fill.includes(i)?"used":""}" data-t="${i}" ${fill.includes(i)?"disabled":""}>${esc(w)}</button>`).join("")}</div>
      <div class="row"><span class="spacer"></span><button class="btn" id="chk" ${fill.includes(null)?"disabled":""}>Check</button></div>`;
    st.querySelectorAll(".tok").forEach(b => b.onclick = () => { const k = fill.indexOf(null); if(k<0) return; fill[k] = +b.dataset.t; sfx.tap(); draw(); });
    st.querySelectorAll(".slot").forEach(s => s.onclick = () => { if(RUN.answered) return; fill[+s.dataset.s] = null; draw(); });
    const c = st.querySelector("#chk"); if(c) c.onclick = () => {
      const ok = fill.every((f,i) => bank[f] === it.ans[i]);
      st.querySelectorAll(".slot").forEach((s,i) => s.classList.add(bank[fill[i]] === it.ans[i] ? "right" : "wrong"));
      st.querySelectorAll(".tok").forEach(b => b.disabled = true); c.remove();
      record(it, ok); nextBtn(st, ok, it, it.ans.join(" … "));
    };
  };
  draw();
}
function renderKeypad(st, it){
  let val = "";
  const needsLetters = /[a-z]/i.test(String(it.a)), needsSlash = String(it.a).includes("/"), needsColon = String(it.a).includes(":");
  const extra = [needsSlash||/fraction|simplest/i.test(it.q) ? "/" : null, needsColon||/ratio|24-hour/i.test(it.q) ? ":" : null, ...(needsLetters ? ["a","n","+"] : [])].filter(Boolean);
  st.innerHTML = (it.svg||"") + `<div class="q">${it.q}</div><div class="answer" id="ans">&nbsp;</div>
    <div class="keypad">${["7","8","9","⌫","4","5","6","−","1","2","3",".","0",...extra].map(k => `<button class="${k==="⌫"?"del":/[0-9]/.test(k)?"":"sym"}" data-k="${k}">${k}</button>`).join("")}<button class="ok" id="ok">Check ✓</button></div>`;
  const show = () => st.querySelector("#ans").innerHTML = val ? esc(val) : "&nbsp;";
  const press = k => { if(RUN.answered) return; if(k === "⌫") val = val.slice(0,-1); else if(val.length < 14) val += (k === "−" ? "-" : k); show(); };
  st.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { sfx.tap(); press(b.dataset.k); });
  const submit = () => { if(RUN.answered || !val) return; const ok = isRight(val, it); const a = st.querySelector("#ans"); a.classList.add(ok?"right":"wrong"); if(!ok) shake(a);
    st.querySelectorAll(".keypad button").forEach(b => b.disabled = true); document.removeEventListener("keydown", kd); record(it, ok); nextBtn(st, ok, it); };
  st.querySelector("#ok").onclick = submit;
  const kd = e => { if(!document.body.contains(st)) return document.removeEventListener("keydown", kd);
    if(e.key === "Enter"){ e.preventDefault(); submit(); } else if(e.key === "Backspace") press("⌫"); else if(/^[0-9.\-/:anx+]$/i.test(e.key)) press(e.key); };
  document.addEventListener("keydown", kd);
}
function renderNumline(st, it){
  const step = (it.max-it.min)/400;
  const tickVals = Array.from({length:it.ticks+1}, (_,i) => it.min + i*(it.max-it.min)/it.ticks);
  const lab = v => { if(it.max === 1 && it.min === 0){ return i => i; } return null; };
  const label = (v,i) => (it.max===1 && it.min===0) ? (i===0?"0":i===it.ticks?"1":"|") : (Math.round(v*100)/100);
  const showLabels = tickVals.map((v,i) => (it.ticks > 10 && i%2) ? "<span></span>" : `<span>${label(v,i)}</span>`).join("");
  st.innerHTML = `<div class="q">${it.q}</div><div class="nl"><div class="nlmark" id="mk"></div><input type="range" id="r" min="${it.min}" max="${it.max}" step="${step}" value="${(it.min+it.max)/2}"><div class="ticks">${showLabels}</div></div>
    <div class="row"><span class="spacer"></span><button class="btn" id="ok">Drop it here ✓</button></div>`;
  st.querySelector("#ok").onclick = () => {
    if(RUN.answered) return; const v = +st.querySelector("#r").value, a = Number(it.a); const ok = Math.abs(v-a) <= it.tol;
    st.querySelector("#r").disabled = true; st.querySelector("#ok").remove();
    st.querySelector("#mk").innerHTML = `<i style="left:${(a-it.min)/(it.max-it.min)*100}%">▼</i>`;
    record(it, ok); nextBtn(st, ok, it, it.disp || it.a);
  };
}
function renderGrid(st, it){
  const letters = it.mode === "letters";
  let html = "";
  for(let row=4; row>=0; row--){
    html += `<div class="ax">${letters ? row+1 : "0"+(row+1)}</div>`;
    for(let col=0; col<5; col++){ const c = row*5+col; const ref = letters ? "ABCDE"[col]+(row+1) : `0${col+1}0${row+1}`; html += `<button class="cell" data-r="${ref}">${it.grid[c]||""}</button>`; }
  }
  html += `<div></div>` + [0,1,2,3,4].map(c => `<div class="ax ${letters?"":"n"}">${letters ? "ABCDE"[c] : "0"+(c+1)}</div>`).join("");
  st.innerHTML = `<div class="q">${it.q}</div><div class="gridmap">${html}</div>${letters?"":`<p class="note">Read the number along the bottom first, then up the side.</p>`}`;
  st.querySelectorAll(".cell").forEach(b => b.onclick = () => {
    if(RUN.answered) return; const ok = b.dataset.r === it.a;
    st.querySelectorAll(".cell").forEach(x => { x.disabled = true; if(x.dataset.r === it.a) x.classList.add("right"); }); if(!ok) b.classList.add("wrong");
    record(it, ok); nextBtn(st, ok, it);
  });
}
/* whole-screen tasks: score = parts right first time */
function finishTask(st, it, okCount, total, label){
  RUN.answered = true; RUN.done.push({it, ok: okCount === total, worth: total, okCount, task:true});
  const ok = okCount === total;
  st.insertAdjacentHTML("beforeend", `<div class="fb ${okCount/total >= .7 ? "good":"bad"}">${ok ? "Perfect! Every one right first time 🌟" : `You got <b>${okCount} of ${total}</b> right first time. ${label||""}`}</div>
    <div class="row"><span class="spacer"></span><button class="btn" id="nx">${RUN.i+1 >= RUN.items.length ? "Finish ✨" : "Next →"}</button></div>`);
  ok ? sfx.done() : sfx.right();
  st.querySelector("#nx").onclick = () => { RUN.i++; showItem(); };
  st.querySelector("#nx").scrollIntoView({block:"nearest", behavior:"smooth"});
}
function renderSort(st, it){
  const s = it.set, items = shuffle(s.items.map((x,i) => ({...x, i}))); const placed = {}; let sel = null;
  const draw = () => {
    const left = items.filter(x => placed[x.i] == null);
    st.innerHTML = `<div class="q">${esc(s.prompt || "Sort these into the right groups.")}</div><p class="note">Tap a card, then tap the box it belongs in.</p>
      <div class="bank">${left.map(x => `<button class="tok ${sel===x.i?"sel":""}" data-i="${x.i}">${esc(x.t)}</button>`).join("") || "<span class='note'>All sorted! Check your answers.</span>"}</div>
      <div class="bins">${s.bins.map((b,bi) => `<button class="bin ${sel!=null?"ready":""}" data-b="${bi}"><h3>${esc(b)}</h3>${items.filter(x => placed[x.i]===bi).map(x => `<span class="tok" data-p="${x.i}">${esc(x.t)}</span>`).join("")}</button>`).join("")}</div>
      <div class="row"><span class="spacer"></span><button class="btn" id="chk" ${left.length?"disabled":""}>Check</button></div>`;
    st.querySelectorAll(".bank .tok").forEach(b => b.onclick = () => { sel = +b.dataset.i; sfx.tap(); draw(); });
    st.querySelectorAll(".bin").forEach(b => b.onclick = e => {
      const p = e.target.closest("[data-p]"); if(p && sel == null){ delete placed[+p.dataset.p]; draw(); return; }
      if(sel == null) return; placed[sel] = +b.dataset.b; sel = null; sfx.tap(); draw(); });
    const c = st.querySelector("#chk"); if(c) c.onclick = () => {
      let okc = 0; const wrong = [];
      st.querySelectorAll("[data-p]").forEach(t => { const x = s.items[+t.dataset.p]; const bin = typeof x.b === "number" ? x.b : s.bins.indexOf(x.b);
        if(placed[+t.dataset.p] === bin){ t.classList.add("right"); okc++; } else { t.classList.add("wrong"); t.title = "Belongs in: " + s.bins[bin]; wrong.push({x, bin}); } });
      st.querySelectorAll("button").forEach(b => b.disabled = true); c.remove();
      it.wrongSort = wrong;
      finishTask(st, it, okc, s.items.length, wrong.length ? "Red ones belong in: " + wrong.map(w => `<b>${esc(w.x.t)}</b> → ${esc(s.bins[w.bin])}`).join(", ") : "");
    };
  };
  draw();
}
function renderMatch(st, it){
  const s = it.set, L = shuffle(s.pairs.map((p,i) => ({t:p[0], i}))), Rr = shuffle(s.pairs.map((p,i) => ({t:p[1], i})));
  const done = new Set(), missed = new Set(); let sel = null;
  const draw = () => {
    st.innerHTML = `<div class="q">${esc(s.prompt || "Match the pairs.")}</div><p class="note">Tap one on the left, then its partner on the right.</p>
      <div class="match"><div class="col">${L.map(x => `<button class="tok ${done.has(x.i)?"done":""} ${sel===x.i?"sel":""}" data-l="${x.i}" ${done.has(x.i)?"disabled":""}>${esc(x.t)}</button>`).join("")}</div>
      <div class="col">${Rr.map(x => `<button class="tok ${done.has(x.i)?"done":""}" data-r="${x.i}" ${done.has(x.i)?"disabled":""}>${esc(x.t)}</button>`).join("")}</div></div>`;
    st.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { sel = +b.dataset.l; sfx.tap(); draw(); });
    st.querySelectorAll("[data-r]").forEach(b => b.onclick = () => {
      if(sel == null){ shake(b); return; }
      const r = +b.dataset.r;
      if(r === sel){ done.add(r); sel = null; sfx.right(); draw(); if(done.size === s.pairs.length){ it.missedPairs = [...missed]; finishTask(st, it, s.pairs.length - missed.size, s.pairs.length); } }
      else { missed.add(sel); sfx.wrong(); shake(b); }
    });
  };
  draw();
}
function renderOrder(st, it){
  const s = it.set, cards = shuffle(s.steps.map((t,i) => ({t, i}))); const placed = []; const missed = new Set();
  const draw = () => {
    st.innerHTML = `<div class="q">${esc(s.prompt || "Put these in order.")}</div><p class="note">Tap them in the right order, first one first.</p>
      <div class="placed">${placed.map((i,k) => `<div><span class="num">${k+1}</span>${esc(s.steps[i])}</div>`).join("")}</div>
      <div class="seq">${cards.filter(c => !placed.includes(c.i)).map(c => `<button class="tok" data-i="${c.i}"><span class="num" style="background:var(--purple-l);color:var(--purple-d)">?</span>${esc(c.t)}</button>`).join("")}</div>`;
    st.querySelectorAll("[data-i]").forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      if(i === placed.length){ placed.push(i); sfx.right(); draw(); if(placed.length === s.steps.length) finishTask(st, it, s.steps.length - missed.size, s.steps.length); }
      else { missed.add(placed.length); sfx.wrong(); shake(b); }
    });
  };
  draw();
}
function renderLabel(st, it){
  const s = it.set, D = DIAGRAMS[s.diagram]; const done = new Set(), missed = new Set(); let sel = null;
  const order = shuffle(s.labels.map((t,i) => i));
  const draw = () => {
    st.innerHTML = `<div class="q">${esc(s.title)}</div><p class="note">Tap a label, then tap the number where it belongs.</p>
      <div class="labelwrap">${D.svg}${D.pins.map((p,i) => `<button class="pin ${done.has(i)?"done":""} ${sel!=null && !done.has(i)?"target":""}" style="left:${p[0]}%;top:${p[1]}%" data-p="${i}">${done.has(i) ? esc(s.labels[i]) : i+1}</button>`).join("")}</div>
      <div class="bank">${order.filter(i => !done.has(i)).map(i => `<button class="tok ${sel===i?"sel":""}" data-l="${i}">${esc(s.labels[i])}</button>`).join("")}</div>`;
    st.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { sel = +b.dataset.l; sfx.tap(); draw(); });
    st.querySelectorAll("[data-p]").forEach(b => b.onclick = () => {
      if(sel == null || done.has(+b.dataset.p)) return;
      if(+b.dataset.p === sel){ done.add(sel); sel = null; sfx.right(); draw(); if(done.size === s.labels.length) finishTask(st, it, s.labels.length - missed.size, s.labels.length); }
      else { missed.add(sel); sfx.wrong(); shake(b); }
    });
  };
  draw();
}
const DIAGRAMS = {
  insect:{ pins:[[50,14],[50,36],[50,78],[30,5],[16,45],[60,52]], svg:`<svg viewBox="0 0 300 300"><g stroke="#4c1d95" stroke-width="4" stroke-linecap="round" fill="none">
    <path d="M140 52 q-30 -30 -55 -42"/><path d="M160 52 q30 -30 55 -42"/>
    <path d="M128 100 l-55 -20 l-20 -25"/><path d="M128 112 l-62 10 l-25 25"/><path d="M130 124 l-50 40 l-10 30"/>
    <path d="M172 100 l55 -20 l20 -25"/><path d="M172 112 l62 10 l25 25"/><path d="M170 124 l50 40 l10 30"/></g>
    <ellipse cx="150" cy="58" rx="22" ry="18" fill="#7c3aed"/><ellipse cx="150" cy="108" rx="28" ry="24" fill="#2563eb"/>
    <path d="M150 128 C 100 140 100 270 150 285 C 200 270 200 140 150 128 Z" fill="#0d9488"/><line x1="150" y1="130" x2="150" y2="282" stroke="#134e4a" stroke-width="3"/>
    <circle cx="125" cy="180" r="9" fill="#134e4a"/><circle cx="178" cy="215" r="8" fill="#134e4a"/><circle cx="128" cy="240" r="7" fill="#134e4a"/></svg>`},
  flower:{ pins:[[30,16],[50,9],[64,22],[58,58],[30,62],[50,92]], svg:`<svg viewBox="0 0 300 300">
    <path d="M150 140 L150 255" stroke="#15803d" stroke-width="8"/><path d="M150 200 q-60 -30 -80 -10 q30 30 80 10z" fill="#22c55e"/>
    <g fill="#c084fc">${[0,60,120,180,240,300].map(a => `<ellipse cx="150" cy="70" rx="24" ry="40" transform="rotate(${a} 150 105)"/>`).join("")}</g>
    <circle cx="150" cy="105" r="22" fill="#fbbf24"/><path d="M150 105 L150 32" stroke="#0f766e" stroke-width="5"/><circle cx="150" cy="30" r="7" fill="#0f766e"/>
    <path d="M160 100 L190 66" stroke="#7c2d12" stroke-width="3"/><ellipse cx="192" cy="63" rx="9" ry="6" fill="#ea580c"/>
    <path d="M150 255 q-30 20 -50 40 M150 255 q0 25 5 40 M150 255 q30 15 55 35" stroke="#92400e" stroke-width="5" fill="none"/>
    <rect x="40" y="255" width="220" height="4" fill="#a16207" opacity=".4"/></svg>`},
  water:{ pins:[[30,62],[50,12],[78,38],[56,88]], svg:`<svg viewBox="0 0 300 240">
    <rect x="0" y="170" width="300" height="70" fill="#3b82f6" opacity=".55"/><path d="M200 170 L245 80 L290 170 Z" fill="#a8a29e"/><path d="M230 110 L245 80 L260 110 Z" fill="#fff"/>
    <circle cx="40" cy="38" r="22" fill="#fbbf24"/><g fill="#e0e7ff" stroke="#a5b4fc" stroke-width="2"><ellipse cx="140" cy="40" rx="45" ry="20"/><ellipse cx="180" cy="34" rx="35" ry="18"/><ellipse cx="225" cy="55" rx="35" ry="18"/></g>
    <g stroke="#14b8a6" stroke-width="3" fill="none" stroke-dasharray="6 5"><path d="M70 165 q0 -50 10 -90"/><path d="M95 165 q5 -60 15 -95"/></g>
    <g stroke="#2563eb" stroke-width="3"><line x1="220" y1="78" x2="214" y2="98"/><line x1="234" y1="78" x2="228" y2="98"/><line x1="208" y1="80" x2="202" y2="100"/></g>
    <path d="M250 150 q-40 30 -90 30" stroke="#1d4ed8" stroke-width="5" fill="none"/></svg>`},
  cell:{ pins:[[50,50],[86,30],[28,74],[70,70]], svg:`<svg viewBox="0 0 300 260">
    <path d="M40 130 C 30 40, 140 20, 210 40 C 290 60, 290 200, 200 225 C 120 250, 50 220, 40 130 Z" fill="#ccfbf1" stroke="#0f766e" stroke-width="6"/>
    <circle cx="150" cy="128" r="36" fill="#a78bfa" stroke="#6d28d9" stroke-width="4"/><circle cx="158" cy="120" r="10" fill="#6d28d9"/>
    <g fill="#fdba74" stroke="#c2410c" stroke-width="3"><ellipse cx="212" cy="178" rx="20" ry="10" transform="rotate(-20 212 178)"/><ellipse cx="96" cy="78" rx="16" ry="8" transform="rotate(25 96 78)"/></g>
    <g fill="#99f6e4"><circle cx="90" cy="180" r="4"/><circle cx="110" cy="200" r="3"/><circle cx="220" cy="100" r="4"/></g></svg>`}
};

function finishRound(){
  if(!RUN) return; clearInterval(tick);
  const R = RUN; RUN = null;
  const total = R.done.reduce((a,d) => a + d.worth, 0) || 1;
  const correct = R.done.reduce((a,d) => a + d.okCount, 0);
  const asked = R.items.length, answered = R.done.length;
  const denom = Math.max(total, R.done.reduce((a,d)=>a+d.worth,0) + (asked-answered)); // unanswered (time ran out) count as wrong
  const pct = Math.round(correct/denom*100);
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0;
  const before = starTotal();
  // tallies by subject|level|topic
  const by = {};
  R.done.forEach(d => { const k = `${d.it.sub}|${d.it.lv}|${d.it.topic}`; by[k] = by[k] || [0,0]; by[k][0] += d.okCount; by[k][1] += d.worth; });
  R.items.slice(answered).forEach(it => { const k = `${it.sub}|${it.lv}|${it.topic}`; by[k] = by[k] || [0,0]; by[k][1] += (["sort","match","order","label"].includes(it.kind) ? 1 : 1); });
  // misses & fixes
  R.done.forEach(d => {
    const it = d.it;
    if(d.task){
      (it.wrongSort||[]).forEach(w => addMiss(`${it.sid}#s${it.set.items.indexOf(w.x)}`, {kind:"mcq", q:`Which group does <b>${esc(w.x.t)}</b> belong in?`, opts:it.set.bins, a:it.set.bins[w.bin], sub:it.sub, lv:it.lv, topic:it.topic}));
      (it.missedPairs||[]).forEach(i => { const p = it.set.pairs[i]; addMiss(`${it.sid}#m${i}`, {kind:"mcq", q:`What matches <b>${esc(p[0])}</b>?`, opts:shuffle([p[1], ...shuffle(it.set.pairs.filter((_,j)=>j!==i).map(x=>x[1])).slice(0,3)]), a:p[1], sub:it.sub, lv:it.lv, topic:it.topic}); });
      return;
    }
    const key = it.key || it.fixKey || ("g" + Date.now().toString(36) + Math.random().toString(36).slice(2,6));
    if(!d.ok) addMiss(key, snap(it));
    else if(P.misses[key]){ P.misses[key].ok = (P.misses[key].ok||0) + 1; if(P.misses[key].ok >= 2) delete P.misses[key]; }
  });
  const xp = correct*10 + (stars===3 ? 20 : 0);
  if(MODE !== "preview"){
    P.xp += xp;
    if(R.sid) P.stars[R.sid] = Math.max(P.stars[R.sid]||0, stars);
    if(R.mode !== "set" && stars) P.stars["_bonus"] = (P.stars["_bonus"]||0) + (stars >= 2 ? 1 : 0);
    P.attempts.push({s:R.sid, m:R.mode, t:R.title, c:correct, n:denom, by, ts:Date.now(), sec:Math.round((Date.now()-R.start)/1000)});
    if(P.attempts.length > 400) P.attempts = P.attempts.slice(-400);
    bumpStreak();
  }
  const newSticker = MODE !== "preview" ? awardStickers(before) : [];
  save(true);
  if(stars === 3) confetti(); sfx.done();
  const wrong = R.done.filter(d => !d.ok && !d.task);
  app.innerHTML = `<div class="card results stitch">
    ${lottie(rank(P.xp), "")}
    <h1>${["Keep swimming!","Good start!","Great work!","Superstar!"][stars]}</h1>
    <div class="bigstars">${[1,2,3].map(i => `<span class="${i <= stars ? "" : "dim"}">⭐</span>`).join("")}</div>
    <p style="font-size:1.2rem"><b>${correct} / ${denom}</b> correct · <b>+${xp} XP</b> · ${mmss((Date.now()-R.start)/1000)}</p>
    ${newSticker.length ? `<div class="card" style="background:var(--purple-l)"><div class="sticker-new">${newSticker.map(s => STICKERS[s][0]).join(" ")}</div><b>New sticker${newSticker.length>1?"s":""} for your book: ${newSticker.map(s => STICKERS[s][1]).join(", ")}!</b></div>` : `<p class="muted">${STARS_PER_STICKER - (starTotal() % STARS_PER_STICKER)} more ⭐ until your next sticker</p>`}
    ${MODE === "preview" ? `<p class="fb info">Preview mode: this round wasn't saved.</p>` : ""}
    <div class="row" style="justify-content:center">${R.sid ? `<button class="btn" id="again">Play again 🔁</button>` : ""}<button class="btn ghost" id="bk">Back</button></div>
  </div>
  ${wrong.length ? `<div class="card review"><h2>Let's learn from these</h2>${wrong.map(d => `<div class="ri">${d.it.q ? strip(d.it.q).slice(0,160) : esc(d.it.text||"")}<br><b>Answer: ${esc(strip(d.it.a ?? (d.it.ans||[]).join(" … ")))}</b></div>`).join("")}
    <p class="note">These go into your 🛟 Fix-it Pond. Get each one right twice to clear it.</p></div>` : ""}`;
  const ag = $("#again"); if(ag) ag.onclick = () => playSet(SETS.find(s => s.id === R.sid));
  $("#bk").onclick = R.back || home; top0();
}
function snap(it){ const o = {}; ["kind","q","opts","a","disp","why","text","ans","extra","svg","hint","exact","min","max","tol","ticks","grid","mode","passage","source","sub","lv","topic","sid"].forEach(k => { if(it[k] !== undefined) o[k] = it[k]; }); return o; }
function addMiss(key, item){ const m = P.misses[key]; P.misses[key] = {item, n:(m?m.n:0)+1, ok:0, ts:Date.now()};
  const ks = Object.keys(P.misses); if(ks.length > 80) ks.sort((a,b) => P.misses[a].ts - P.misses[b].ts).slice(0, ks.length-80).forEach(k => delete P.misses[k]); }
function starTotal(){ return Object.entries(P.stars).reduce((a,[k,v]) => a + v, 0); }
function awardStickers(before){
  const now = starTotal(), earned = Math.floor(now/STARS_PER_STICKER) - Math.floor(before/STARS_PER_STICKER), got = [];
  for(let i=0;i<earned;i++){ const left = STICKERS.map((_,j) => j).filter(j => !P.stickers.includes(j)); if(!left.length) break; const s = pick(left); P.stickers.push(s); got.push(s); }
  return got;
}
function bumpStreak(){ const t = today(); if(P.streak.last === t) return; const y = new Date(Date.now()-864e5).toISOString().slice(0,10); P.streak.n = P.streak.last === y ? P.streak.n+1 : 1; P.streak.last = t; }

/* ---------------- screens ---------------- */
function home(){
  RUN = null; clearInterval(tick); banner();
  const r = rank(P.xp), pct = r.next ? Math.round((P.xp-r.prev)/(r.next-r.prev)*100) : 100;
  const fix = Object.keys(P.misses).length;
  app.innerHTML = `
    <div class="top"><span class="stat">🔥 ${P.streak.last === today() || P.streak.last === new Date(Date.now()-864e5).toISOString().slice(0,10) ? P.streak.n : 0} day streak</span><span class="stat">⭐ ${starTotal()}</span><span class="stat">🎟️ ${P.stickers.length}/${STICKERS.length}</span><span class="spacer"></span>
      ${MODE !== "child" ? `<button class="btn ghost small" id="dash">Grown-ups' dashboard</button>` : ""}<button class="back" id="set">⚙️</button></div>
    <div class="hero" style="margin-top:12px">${lottie(r)}<div style="flex:1"><p style="font-weight:800;opacity:.85">Hi ${esc(P.name)}! Lottie is a…</p><h1><em>${r.name}</em></h1>
      <p>${P.xp} XP${r.next ? ` · ${r.next-P.xp} to the next level` : " · top level!"}</p><div class="xpbar"><b style="width:${pct}%"></b></div></div></div>
    <div class="row" style="margin-top:16px"><span class="muted" style="font-weight:800">My level:</span>${[5,6,7].map(l => `<button class="chip ${P.target===l?"on":""}" data-tl="${l}">${LVNAME[l]}</button>`).join("")}</div>
    <button class="feature" id="daily"><span class="em" style="background:linear-gradient(135deg,#99f6e4,#c4b5fd)">🌊</span><span><b>Today's Lagoon Dive</b><br><span class="muted">10 mixed questions picked just for you</span></span></button>
    <div class="row" style="gap:10px;align-items:stretch">
      <button class="feature" id="mock" style="flex:1;margin:0"><span class="em" style="background:#dbeafe">⏳</span><span><b>Mock paper</b><br><span class="muted">Timed, like the real test</span></span></button>
      <button class="feature" id="fix" style="flex:1;margin:0"><span class="em" style="background:#ffe4e6">🛟</span><span><b>Fix-it Pond</b><br><span class="muted">${fix ? fix + " to fix" : "Nothing to fix!"}</span></span></button></div>
    <h2 style="margin-top:20px">Choose a world</h2>
    <div class="worlds">${SUBJECTS.map(s => { const sets = SETS.filter(x => x.subject === s.id); const st = sets.reduce((a,x) => a + (P.stars[x.id]||0), 0);
      return `<button class="world" style="background:${s.bg}" data-w="${s.id}"><span class="em">${s.em}</span><span><b>${s.name}</b><br><small>${s.blurb}</small><br><small>⭐ ${st} / ${sets.length*3}</small></span></button>`; }).join("")}</div>
    <button class="feature" id="stk"><span class="em" style="background:#fae8ff">📒</span><span><b>Sticker book</b><br><span class="muted">Every ${STARS_PER_STICKER} stars earns a sticker</span></span></button>
    <button class="feature" id="type"><span class="em" style="background:#ccfbf1">⌨️</span><span><b>Speedy Fingers</b><br><span class="muted">Typing practice${P.typing.length ? ` · best ${Math.max(...P.typing.map(t => t.wpm))} wpm` : ""}</span></span></button>`;
  $$("[data-tl]").forEach(b => b.onclick = () => { P.target = +b.dataset.tl; save(); home(); });
  $$("[data-w]").forEach(b => b.onclick = () => b.dataset.w === "writing" ? studio() : world(b.dataset.w));
  $("#daily").onclick = daily; $("#mock").onclick = mockMenu; $("#fix").onclick = fixIt; $("#stk").onclick = stickers; $("#type").onclick = typing; $("#set").onclick = settings;
  const d = $("#dash"); if(d) d.onclick = dashboard;
  top0();
}
function world(id, lvFilter){
  const s = subjOf(id); lvFilter = lvFilter ?? 0;
  const sets = SETS.filter(x => x.subject === id && (!lvFilter || x.level === lvFilter));
  const topics = [...new Set(sets.map(x => x.topic))];
  app.innerHTML = `<button class="back" id="bk">← Home</button>
    <div class="hero" style="background:${s.bg}"><span style="font-size:3.4rem">${s.em}</span><div><h1>${s.name}</h1><p>${s.blurb}</p></div></div>
    <div class="levels">${[0,5,6,7].map(l => `<button class="chip ${lvFilter===l?"on":""}" data-l="${l}">${l ? LVNAME[l] : "All levels"}</button>`).join("")}</div>
    ${topics.map(t => `<div class="topic">${esc(t)}</div>` + sets.filter(x => x.topic === t).sort((a,b) => a.level-b.level).map(x => setBtn(x, s)).join("")).join("") || "<p class='muted'>No activities at this level yet.</p>"}`;
  $("#bk").onclick = home;
  $$("[data-l]").forEach(b => b.onclick = () => world(id, +b.dataset.l));
  $$("[data-s]").forEach(b => b.onclick = () => playSet(SETS.find(x => x.id === b.dataset.s), () => world(id, lvFilter)));
  top0();
}
function setBtn(x, s){ const st = P.stars[x.id]||0;
  return `<button class="setbtn" data-s="${esc(x.id)}"><span class="ic" style="background:${s.tint}">${TYPE_ICON[x.type]||"✨"}</span><span class="t"><b>${esc(x.title)}${x.custom?" 🆕":""}</b><span class="muted" style="font-size:.85rem">${({quiz:"Quiz",reading:"Reading",blanks:"Fill the gaps",sort:"Sort it",match:"Match up",order:"Put in order",label:"Label it",gen:"Endless practice"})[x.type]}</span></span>
    <span class="lv lv${x.level}">${LVNAME[x.level]}</span><span class="stars">${[1,2,3].map(i => i<=st?"★":`<span class="off">★</span>`).join("")}</span></button>`; }
function playSet(set, back){ back = back || (() => world(set.subject)); startRound({title:set.title, items:itemsFor(set), sid:set.id, mode:"set", back}); }

/* mixed rounds */
function poolItems(subs, lvs){
  const out = [];
  SETS.filter(s => subs.includes(s.subject) && lvs.includes(s.level) && ["quiz","blanks","gen"].includes(s.type)).forEach(s => {
    if(s.type === "gen"){ for(let k=0;k<2;k++) out.push(genItem(s.gen, s.level, {sid:s.id, sub:s.subject, lv:s.level, topic:s.topic, key:null})); }
    else itemsFor(s, 99).forEach(it => out.push(it));
  });
  return shuffle(out);
}
function lvRange(){ return P.target === 5 ? [5,6] : P.target === 6 ? [5,6,7] : [6,7]; }
function daily(){
  const fixes = shuffle(Object.entries(P.misses)).slice(0,3).map(([k,m]) => ({...m.item, fixKey:k, key:k}));
  const subs = ["english","maths","science","history","geography","arts","writing"];
  const mix = []; const pool = poolItems(subs, lvRange());
  const seen = new Set(); for(const it of pool){ if(mix.length >= 10 - fixes.length) break; if(seen.has(it.sub) && seen.size < 5) continue; seen.add(it.sub); mix.push(it); }
  for(const it of pool){ if(mix.length >= 10 - fixes.length) break; if(!mix.includes(it)) mix.push(it); }
  startRound({title:"Today's Lagoon Dive", items:shuffle([...fixes, ...mix]), mode:"daily", back:home});
}
function fixIt(){
  const list = Object.entries(P.misses); if(!list.length){ toast("Your Fix-it Pond is empty. Great job! 🦎"); return; }
  startRound({title:"Fix-it Pond", items:shuffle(list).slice(0,10).map(([k,m]) => ({...m.item, fixKey:k, key:k})), mode:"fix", back:home});
}
function mockMenu(){
  app.innerHTML = `<button class="back" id="bk">← Home</button><h1>Mock <em>papers</em></h1>
    <p class="muted">Practise working against the clock, like the real test. The real Trafford papers are new, so these copy the style we expect: quick multiple choice plus short answers.</p>
    <button class="feature" id="p1"><span class="em" style="background:#ccfbf1">📘</span><span><b>Paper 1: English & Maths</b><br><span class="muted">20 questions · 25 minutes · a reading passage, grammar and maths</span></span></button>
    <button class="feature" id="p2"><span class="em" style="background:#ede9fe">📗</span><span><b>Paper 2: Science & the wider world</b><br><span class="muted">20 questions · 18 minutes · science, history, geography, arts, computing</span></span></button>
    <button class="feature" id="p3"><span class="em" style="background:#fae8ff">✍️</span><span><b>Creative writing paper</b><br><span class="muted">A surprise prompt · 30 minutes · plan, then write</span></span></button>
    <p class="note">Tip: in a mock paper, skip-and-guess beats running out of time.</p>`;
  $("#bk").onclick = home;
  $("#p1").onclick = () => {
    const lv = lvRange(); const rd = shuffle(SETS.filter(s => s.type === "reading" && lv.includes(s.level)))[0] || SETS.find(s => s.type === "reading");
    const reading = itemsFor(rd).slice(0,6), eng = poolItems(["english"], lv).filter(i => !i.passage).slice(0,4), ma = poolItems(["maths"], lv).filter(i => i.kind !== "grid").slice(0,10);
    startRound({title:"Mock Paper 1", items:[...reading, ...eng, ...ma], mode:"mock", limit:25*60, back:mockMenu});
  };
  $("#p2").onclick = () => startRound({title:"Mock Paper 2", items:poolItems(["science","history","geography","arts"], lvRange()).slice(0,20), mode:"mock", limit:18*60, back:mockMenu});
  $("#p3").onclick = () => write(pick(PROMPTS), 30, mockMenu);
  top0();
}

/* stickers */
function stickers(){
  app.innerHTML = `<button class="back" id="bk">← Home</button><h1>Sticker <em>book</em></h1><p class="muted">${P.stickers.length} of ${STICKERS.length} collected. Earn one for every ${STARS_PER_STICKER} new stars.</p>
    <div class="stickers">${STICKERS.map((s,i) => `<div class="stk ${P.stickers.includes(i)?"":"locked"}"><span class="e">${s[0]}</span><small>${P.stickers.includes(i) ? s[1] : "?"}</small></div>`).join("")}</div>`;
  $("#bk").onclick = home; top0();
}

/* settings */
function settings(){
  app.innerHTML = `<button class="back" id="bk">← Home</button><h1>Settings</h1>
    <div class="card"><label><b>Your name</b><input type="text" id="nm" value="${esc(P.name)}" maxlength="20"></label>
      <div class="row"><label class="chip"><input type="checkbox" id="snd" ${P.settings.sound?"checked":""}> Sounds</label>
      <label class="chip"><input type="checkbox" id="clk" ${P.settings.clock?"checked":""}> Beat the clock (40 seconds a question)</label></div>
      <div class="row"><button class="btn" id="sv">Save</button></div></div>
    ${CLOUD ? `<div class="card"><p class="note">${MODE === "child" ? "Your progress saves to the cloud so Mum can see it." : "Signed in as a grown-up."}</p><button class="btn ghost small" id="out">Sign out</button></div>` : ""}`;
  $("#bk").onclick = home;
  $("#sv").onclick = () => { P.name = $("#nm").value.trim() || "Lucy"; P.settings.sound = $("#snd").checked; P.settings.clock = $("#clk").checked; save(); toast("Saved 💙"); home(); };
  const o = $("#out"); if(o) o.onclick = async () => { if(MODE === "child" && USER && USER.isAnonymous && !confirm("You're playing without Google, so signing out will lose your progress on this device. Sign out?")) return; save(true); await CLOUD.signOut(); };
  top0();
}

/* ---------------- Story Studio ---------------- */
function studio(kindF){
  const s = subjOf("writing"); const kinds = ["story","description","persuasive","letter","diary"];
  const prompts = PROMPTS.filter(p => !kindF || p.kind === kindF);
  const wsets = SETS.filter(x => x.subject === "writing");
  app.innerHTML = `<button class="back" id="bk">← Home</button>
    <div class="hero" style="background:${s.bg}"><span style="font-size:3.4rem">✍️</span><div><h1>Story Studio</h1><p>Plan it, write it, make it sparkle.</p></div></div>
    <h2 style="margin-top:16px">Warm-ups</h2>${wsets.map(x => setBtn(x, s)).join("")}
    <h2 style="margin-top:16px">Pick a prompt</h2>
    <div class="levels"><button class="chip ${!kindF?"on":""}" data-k="">All</button>${kinds.map(k => `<button class="chip ${kindF===k?"on":""}" data-k="${k}">${k}</button>`).join("")}<button class="chip" id="surprise">🎲 Surprise me</button></div>
    <div class="prompts">${prompts.map((p,i) => `<button class="prompt" data-p="${PROMPTS.indexOf(p)}"><span class="e">${p.pic}</span><b>${esc(p.t)}</b><span class="muted" style="font-size:.88rem">${esc(p.hint)}</span></button>`).join("")}</div>
    ${P.writing.length ? `<h2 style="margin-top:16px">My writing</h2>${P.writing.slice().reverse().slice(0,8).map(w => `<details class="wr"><summary>${esc(w.t)} · ${w.words} words · ${new Date(w.ts).toLocaleDateString("en-GB")}</summary><pre>${esc(w.text)}</pre></details>`).join("")}` : ""}`;
  $("#bk").onclick = home;
  $$("[data-k]").forEach(b => b.onclick = () => studio(b.dataset.k || undefined));
  $$("[data-s]").forEach(b => b.onclick = () => playSet(SETS.find(x => x.id === b.dataset.s), () => studio(kindF)));
  $$("[data-p]").forEach(b => b.onclick = () => write(PROMPTS[+b.dataset.p], 0, () => studio(kindF)));
  $("#surprise").onclick = () => write(pick(PROMPTS), 0, () => studio(kindF));
  top0();
}
function write(p, mins, back){
  const story = p.kind === "story";
  const stages = story ? ["Opening","Build-up","Problem","Resolution","Ending"] : p.kind === "persuasive" ? ["Hook","Point 1","Point 2","Point 3","Big finish"] : ["Introduction","Detail 1","Detail 2","Detail 3","Ending"];
  let limit = mins, started = null;
  app.innerHTML = `<button class="back" id="bk">← Back</button>
    <div class="card stitch"><span style="font-size:2.4rem">${p.pic}</span><h2>${esc(p.t)}</h2><p>${esc(p.hint)}</p>
      <div class="row">${[0,20,30,40].map(m => `<button class="chip ${limit===m?"on":""}" data-m="${m}">${m ? m+" min" : "No timer"}</button>`).join("")}<span class="spacer"></span><span class="timer" id="wt"></span></div></div>
    <div class="card"><h3>1 · Plan it (5 minutes is plenty)</h3><div class="plan">${stages.map((s,i) => `<div><label>${s}</label><textarea data-plan="${i}" placeholder="a few words…"></textarea></div>`).join("")}</div></div>
    <div class="card"><h3>2 · Write it</h3><textarea class="story" id="txt" placeholder="Start here… Tip: on a tablet you can tap the 🎤 on the keyboard to speak your sentences, then tidy them up."></textarea>
      <div class="row"><b id="wc">0 words</b><span class="spacer"></span><button class="btn" id="done">I've finished ✨</button></div>
      <h3>✨ Sparkle checklist</h3><div class="sparkle" id="sp"></div></div>`;
  const txt = $("#txt"), wc = $("#wc");
  const upd = () => { const t = txt.value, n = (t.match(/\b[\w’'-]+\b/g)||[]).length; wc.textContent = n + " words";
    $("#sp").innerHTML = SPARKLE.map(s => { const on = typeof s.test === "function" ? s.test(t) : s.test.test(t); return `<div class="${on?"on":""}">${on?"✅":"⬜"} ${s.label}</div>`; }).join(""); };
  txt.oninput = () => { if(!started) started = Date.now(); upd(); };
  upd();
  $$("[data-m]").forEach(b => b.onclick = () => { limit = +b.dataset.m; $$("[data-m]").forEach(x => x.classList.toggle("on", x === b)); });
  clearInterval(tick); tick = setInterval(() => { const el = document.getElementById("wt"); if(!el){ clearInterval(tick); return; }
    if(!started){ el.textContent = ""; return; } const sec = (Date.now()-started)/1000;
    if(limit){ const left = limit*60 - sec; el.textContent = "⏳ " + mmss(Math.max(0,left)); el.classList.toggle("low", left < 120); if(left <= 0 && !el.dataset.rang){ el.dataset.rang = 1; sfx.done(); toast("Time's up! Finish your sentence and write an ending."); } }
    else el.textContent = "⏱ " + mmss(sec); }, 500);
  $("#bk").onclick = () => { if(txt.value.trim().length > 40 && !confirm("Leave without saving your writing?")) return; clearInterval(tick); back(); };
  $("#done").onclick = () => {
    const t = txt.value.trim(), n = (t.match(/\b[\w’'-]+\b/g)||[]).length; if(n < 20){ toast("Write a little more first: at least 20 words"); return; }
    clearInterval(tick);
    const sparkles = SPARKLE.filter(s => typeof s.test === "function" ? s.test(t) : s.test.test(t)).length;
    const xp = Math.min(150, Math.round(n/4) + sparkles*10);
    const before = starTotal();
    if(MODE !== "preview"){
      P.writing.push({t:p.t, kind:p.kind, plan:$$("[data-plan]").map(x => x.value), text:t, words:n, mins:started ? Math.round((Date.now()-started)/60000) : 0, sparkles, ts:Date.now()});
      if(P.writing.length > 40) P.writing = P.writing.slice(-40);
      P.xp += xp; P.stars["_writing"] = (P.stars["_writing"]||0) + (n >= 150 ? 2 : 1); bumpStreak();
    }
    const got = MODE !== "preview" ? awardStickers(before) : [];
    save(true); confetti(); sfx.done();
    app.innerHTML = `<div class="card results stitch">${lottie(rank(P.xp))}<h1>Bravo! 🎭</h1><p style="font-size:1.2rem"><b>${n} words</b> · ${sparkles} of ${SPARKLE.length} sparkles · <b>+${xp} XP</b></p>
      ${got.length ? `<div class="card" style="background:var(--purple-l)"><div class="sticker-new">${got.map(s => STICKERS[s][0]).join(" ")}</div><b>New sticker!</b></div>` : ""}
      <p class="muted">${MODE === "preview" ? "Preview mode: not saved." : "Saved! Mum can read it and get feedback for you."}</p>
      <div class="row" style="justify-content:center"><button class="btn" id="bk">Back to Story Studio</button></div></div>`;
    $("#bk").onclick = back; top0();
  };
  top0();
}

/* ---------------- Speedy Fingers ---------------- */
const TYPE_LINES = [
  "Axolotls can regrow their legs, their tails and even parts of their hearts.",
  "A honeybee visits hundreds of flowers on a single trip from the hive.",
  "The curtain rose, the spotlight glowed and the whole theatre held its breath.",
  "Thread the needle, tie a knot and sew with small, neat backstitches.",
  "Jupiter is so big that more than a thousand Earths could fit inside it.",
  "The Romans built a fort called Mamucium where Manchester stands today.",
  "Ladybirds are beetles, and they can eat thousands of greenflies in a summer.",
  "Octopuses have three hearts, blue blood and eight clever arms.",
  "Monarch butterflies fly thousands of miles to spend the winter in Mexico.",
  "The River Mersey winds past Flixton and Urmston on its way to the sea."
];
function typing(){
  const line = pick(TYPE_LINES); let start = null;
  const best = P.typing.length ? Math.max(...P.typing.map(t => t.wpm)) : 0;
  app.innerHTML = `<button class="back" id="bk">← Home</button><h1>Speedy <em>Fingers</em> ⌨️</h1>
    <p class="muted">Type the sentence exactly, capital letters and full stops too. The timer starts on your first key. ${best ? `Your best: <b>${best} wpm</b>.` : ""}</p>
    <div class="typetarget" id="tg"></div><textarea id="in" style="margin-top:12px;min-height:90px" autocomplete="off" autocapitalize="sentences" spellcheck="false"></textarea>
    <div class="row"><b id="live">0 wpm</b><span class="spacer"></span><button class="btn ghost small" id="new">New sentence</button></div>
    ${P.typing.length ? `<div class="card"><h3>Recent</h3>${P.typing.slice(-6).reverse().map(t => `<div>${new Date(t.ts).toLocaleDateString("en-GB")}: <b>${t.wpm} wpm</b>, ${t.acc}% accurate</div>`).join("")}</div>` : ""}`;
  const tg = $("#tg"), inp = $("#in");
  const draw = () => { const v = inp.value; tg.innerHTML = [...line].map((ch,i) => `<span class="${i < v.length ? (v[i]===ch?"ok":"no") : i===v.length ? "cur":""}">${esc(ch)}</span>`).join(""); };
  draw(); inp.focus();
  inp.oninput = () => { if(!start) start = Date.now(); draw();
    const min = (Date.now()-start)/60000 || 1e-6; $("#live").textContent = Math.round(inp.value.length/5/min) + " wpm";
    if(inp.value.length >= line.length){ const correct = [...line].filter((c,i) => inp.value[i] === c).length; const acc = Math.round(correct/line.length*100);
      const wpm = Math.round(line.length/5/min);
      if(MODE !== "preview"){ P.typing.push({wpm, acc, ts:Date.now()}); if(P.typing.length > 60) P.typing = P.typing.slice(-60); P.xp += Math.round(acc/10); bumpStreak(); save(true); }
      inp.disabled = true; sfx.done(); if(wpm > best && best) confetti(40);
      tg.insertAdjacentHTML("afterend", `<div class="fb good">${wpm} words per minute, ${acc}% accurate! ${wpm > best && best ? "🏆 New best!" : ""}</div>`); }
  };
  $("#new").onclick = typing; $("#bk").onclick = home; top0();
}

/* ---------------- grown-ups' dashboard ---------------- */
function stats(p){
  const sub = {}, lv = {}, topic = {};
  (p.attempts||[]).forEach(a => Object.entries(a.by||{}).forEach(([k,[c,n]]) => { const [s,l,t] = k.split("|");
    for(const [m,key] of [[sub,s],[lv,l],[topic,s+"|"+t]]){ m[key] = m[key] || [0,0]; m[key][0] += c; m[key][1] += n; } }));
  const pc = ([c,n]) => n ? Math.round(c/n*100) : null;
  const weak = Object.entries(topic).filter(([,v]) => v[1] >= 4 && v[0]/v[1] < .85).map(([k,v]) => ({k, p:pc(v), n:v[1]})).sort((a,b) => a.p-b.p).slice(0,8);
  const missed = Object.values(p.misses||{}).sort((a,b) => b.n-a.n).slice(0,10);
  const week = (p.attempts||[]).filter(a => a.ts > Date.now()-7*864e5);
  return {sub, lv, weak, missed, pc, week, mins: Math.round(week.reduce((a,x) => a + (x.sec||0), 0)/60)};
}
function report(p){
  const s = stats(p);
  const lines = [`Lucy's 11+ Lagoon progress report (${new Date().toLocaleDateString("en-GB")})`,
    `Target level: ${LVNAME[p.target]} · XP ${p.xp} · rounds played ${p.attempts.length} · ${s.week.length} rounds / ${s.mins} minutes in the last 7 days`, "",
    "Accuracy by subject:", ...Object.entries(s.sub).map(([k,v]) => `- ${subjOf(k)?.name||k}: ${s.pc(v)}% (${v[1]} questions)`),
    "Accuracy by level:", ...Object.entries(s.lv).map(([k,v]) => `- ${LVNAME[k]||k}: ${s.pc(v)}%`), "",
    "Weakest topics:", ...(s.weak.length ? s.weak.map(w => `- ${w.k.replace("|"," › ")}: ${w.p}% (${w.n} questions)`) : ["- not enough data yet"]), "",
    "Most-missed questions:", ...(s.missed.length ? s.missed.map(m => `- [${m.item.sub}, ${LVNAME[m.item.lv]||""}] ${strip(m.item.q || m.item.text || "").slice(0,140)} (answer: ${strip(m.item.a ?? (m.item.ans||[]).join(", "))})`) : ["- none"]), "",
    `Writing pieces saved: ${p.writing.length}${p.writing.length ? `, last: "${p.writing[p.writing.length-1].t}" (${p.writing[p.writing.length-1].words} words)` : ""}`,
    p.typing.length ? `Typing: best ${Math.max(...p.typing.map(t => t.wpm))} wpm` : "", "",
    "Please write new question packs for Lucy's 11+ Lagoon app aimed at these weak spots. She is in Year 5, preparing for the Trafford FSCE 11+ (September 2027), aiming for Urmston Grammar. She loves axolotls, bugs, animals, sewing, singing and musicals, and the colours teal, blue and purple.",
    "", "Pack format (JSON, paste whole thing into the dashboard):",
    '{"sets":[ {"subject":"maths|english|science|history|geography|arts|writing", "topic":"…", "title":"…", "level":5|6|7, "type":"quiz", "items":[{"q":"…","opts":["…","…","…","…"],"a":"exact copy of the right option","why":"optional short explanation"}]},',
    ' {"type":"sort","prompt":"…","bins":["A","B"],"items":[{"t":"word","b":0}]}, {"type":"match","prompt":"…","pairs":[["left","right"]]},',
    ' {"type":"order","prompt":"…","steps":["first","second"]}, {"type":"blanks","items":[{"text":"The ___ sat.","a":["cat"],"extra":["dog"]}]},',
    ' {"type":"reading","passage":"…","items":[{"q":"…","opts":[…],"a":"…"}, {"find":true,"q":"Tap the word that…","a":"word"}]} ]}'];
  return lines.filter(l => l !== undefined).join("\n");
}
function writingFeedback(w){ return `Please give kind, specific feedback on this creative writing by Lucy (age 9, Year 5), as an 11+ examiner would for the Trafford FSCE test. Prompt: "${w.t}" (${w.kind}). She wrote ${w.words} words in ${w.mins||"?"} minutes.\n\nGive: 2 things that work well (quote her), 2 targets with an example of how to improve a sentence, and an estimated level (working towards / expected / greater depth for end of Year 6).\n\n---\n${w.text}`; }

async function dashboard(){
  app.innerHTML = `<button class="back" id="bk">← Back to the app</button><h1>Grown-ups' <em>dashboard</em></h1><p class="note" id="st">Loading progress…</p><div id="players"></div>
    <div class="card"><h2>Add a question pack</h2><p class="note">Copy Lucy's report below, ask Claude for a question pack, then paste the whole pack here. It appears in Lucy's app straight away.</p>
      <textarea id="pack" style="min-height:140px" placeholder='{"sets":[ … ]}'></textarea><div class="row"><button class="btn" id="add">Add pack</button></div><div id="addfb"></div></div>
    <div class="card"><h2>Packs added</h2><div id="packs" class="list"><p class="note">Loading…</p></div></div>`;
  $("#bk").onclick = home; $("#add").onclick = addPack; top0();
  let players = [];
  try{ players = CLOUD ? await CLOUD.listPlayers() : [MODE === "preview" ? normalise(loadLocal()) : P]; }
  catch(e){ $("#st").textContent = "Couldn't load progress: " + (e.code || e.message); return; }
  players = players.map(normalise).filter(p => p.attempts.length || p.writing.length || p.typing.length);
  $("#st").textContent = players.length ? `Updated whenever Lucy's device syncs.` : "No progress yet. It appears once Lucy finishes her first activity.";
  $("#players").innerHTML = players.map((p,i) => playerCard(p,i)).join("");
  $$("[data-copy]").forEach(b => b.onclick = () => copyText(report(players[+b.dataset.copy]), b, "Report copied: paste it to Claude"));
  $$("[data-wf]").forEach(b => { const [i,j] = b.dataset.wf.split(":").map(Number); b.onclick = () => copyText(writingFeedback(players[i].writing[j]), b, "Copied: paste it to Claude"); });
  listPacks();
}
function copyText(txt, btn, msg){ navigator.clipboard.writeText(txt).then(() => { btn.textContent = msg; }).catch(() => { const ta = document.createElement("textarea"); ta.value = txt; btn.after(ta); ta.select(); btn.textContent = "Select and copy the text below"; }); }
function playerCard(p, i){
  const s = stats(p), r = rank(p.xp), col = v => v == null ? "#cbd5e1" : v >= 80 ? "#10b981" : v >= 60 ? "#f59e0b" : "#f43f5e";
  const bar = (label, v) => `<div class="b"><span>${label}</span><span class="track"><b style="width:${v??0}%;background:${col(v)}"></b></span><span>${v==null?"–":v+"%"}</span></div>`;
  const last = p.updated ? new Date(p.updated).toLocaleString("en-GB", {weekday:"short", day:"numeric", month:"short", hour:"2-digit", minute:"2-digit"}) : "–";
  return `<div class="card stitch"><div class="top"><h2 style="margin:0">${esc(p.name)}</h2><span class="spacer"></span><span class="stat">${r.name}</span></div>
    <p class="note">Last active ${last} · ${p.xp} XP · ⭐ ${Object.values(p.stars).reduce((a,b)=>a+b,0)} · 🔥 ${p.streak.n} · this week: <b>${s.week.length} rounds, ${s.mins} min</b> · target ${LVNAME[p.target]}</p>
    <h3>By subject</h3><div class="bars">${SUBJECTS.map(x => bar(x.name, s.sub[x.id] ? s.pc(s.sub[x.id]) : null)).join("")}</div>
    <h3>By level</h3><div class="bars">${[5,6,7].map(l => bar(LVNAME[l], s.lv[l] ? s.pc(s.lv[l]) : null)).join("")}</div>
    <h3>Topics to work on</h3>${s.weak.length ? `<table>${s.weak.map(w => `<tr><td>${esc(w.k.replace("|"," › "))}</td><td class="${w.p>=80?"good":w.p>=60?"ok":"badc"}"><b>${w.p}%</b></td><td class="note">${w.n} Qs</td></tr>`).join("")}</table>` : `<p class="note">Needs a few more rounds.</p>`}
    <h3>Recent rounds</h3><table><tr><th>When</th><th>Activity</th><th>Score</th><th>Time</th></tr>${p.attempts.slice(-12).reverse().map(a => `<tr><td>${new Date(a.ts).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</td><td>${esc(a.t||a.s)}</td><td>${a.c}/${a.n}</td><td>${mmss(a.sec||0)}</td></tr>`).join("")}</table>
    <h3>Writing (${p.writing.length})</h3>${p.writing.slice().reverse().slice(0,10).map((w,k) => { const j = p.writing.length-1-k; return `<details class="wr"><summary>${esc(w.t)} · ${w.words} words · ${w.mins ? w.mins+" min" : "under 1 min"} · ${new Date(w.ts).toLocaleDateString("en-GB")}</summary><pre>${esc(w.text)}</pre><button class="btn ghost small" data-wf="${i}:${j}">Copy for Claude feedback</button></details>`; }).join("") || `<p class="note">None yet.</p>`}
    ${p.typing.length ? `<p class="note">⌨️ Typing best ${Math.max(...p.typing.map(t=>t.wpm))} wpm · latest ${p.typing[p.typing.length-1].wpm} wpm, ${p.typing[p.typing.length-1].acc}% accurate</p>` : ""}
    <div class="row"><button class="btn small" data-copy="${i}">Copy report for Claude</button></div></div>`;
}
const PACK_TYPES = ["quiz","reading","blanks","sort","match","order","gen","label"];
function checkSet(c){
  if(!c || typeof c !== "object") return "not an object";
  if(!subjOf(c.subject)) return `unknown subject "${c.subject}"`;
  if(!c.title || !c.topic) return "needs a title and a topic";
  if(![5,6,7].includes(+c.level)) return "level must be 5, 6 or 7";
  if(!PACK_TYPES.includes(c.type)) return `unknown type "${c.type}"`;
  const need = {quiz:"items", reading:"items", blanks:"items", sort:"bins", match:"pairs", order:"steps", gen:"gen", label:"labels"}[c.type];
  if(!c[need]) return `a ${c.type} set needs "${need}"`;
  if((c.type==="quiz") && c.items.some(i => !i.q || !i.a || !Array.isArray(i.opts) || !i.opts.includes(i.a))) return "each quiz item needs q, a and opts (including a)";
  if(c.type==="reading" && (!c.passage || c.items.some(i => !i.q || !i.a || (!i.find && (!Array.isArray(i.opts) || !i.opts.includes(i.a)))))) return "reading needs a passage and valid items";
  if(c.type==="blanks" && c.items.some(i => !i.text || !Array.isArray(i.a) || (i.text.split("___").length-1) !== i.a.length)) return "each blanks item needs text with ___ and an 'a' list with one answer per gap";
  if(c.type==="sort" && (!Array.isArray(c.items) || c.items.some(i => !i.t || (typeof i.b === "number" ? !c.bins[i.b] : !c.bins.includes(i.b))))) return "each sort item needs t and b (a bin number)";
  if(c.type==="gen" && !GENS[c.gen]) return "unknown generator";
  if(c.type==="label" && !DIAGRAMS[c.diagram]) return "unknown diagram";
  return "";
}
const slug = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,100) || "set";
function mergeContent(list){
  (list||[]).forEach(raw => { if(!raw || raw.deleted || checkSet(raw)) return;
    const c = JSON.parse(JSON.stringify(raw)); c.custom = true; c.level = +c.level; c.id = "pk-" + slug(c.title);
    const i = SETS.findIndex(x => x.id === c.id); i >= 0 ? SETS[i] = c : SETS.push(c); });
}
async function addPack(){
  const fb = $("#addfb"), raw = $("#pack").value.trim();
  let data; try{ data = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}")+1)); }catch(e){ fb.innerHTML = `<p class="fb bad">That isn't a complete pack. Copy everything from the first { to the last }.</p>`; return; }
  const sets = Array.isArray(data) ? data : data.sets || [data];
  const bad = sets.map((s,i) => [i, checkSet(s)]).filter(x => x[1]);
  if(bad.length){ fb.innerHTML = `<p class="fb bad">Set ${bad[0][0]+1}: ${esc(bad[0][1])}. Nothing was added.</p>`; return; }
  try{
    for(const s of sets){ if(CLOUD && MODE !== "local") await CLOUD.addContent(slug(s.title), {...s, added:Date.now()}); else { const loc = JSON.parse(localStorage.getItem(LKEY+":packs")||"[]"); loc.push({...s, added:Date.now()}); localStorage.setItem(LKEY+":packs", JSON.stringify(loc)); } }
    mergeContent(sets); fb.innerHTML = `<p class="fb good">Added ${sets.length} set${sets.length>1?"s":""} ✓ They're in Lucy's app now.</p>`; $("#pack").value = ""; listPacks();
  }catch(e){ fb.innerHTML = `<p class="fb bad">Couldn't save: ${esc(e.code||e.message)}. Check your email is in the Firestore rules.</p>`; }
}
async function listPacks(){
  const el = document.getElementById("packs"); if(!el) return;
  try{
    const list = CLOUD && MODE !== "local" ? await CLOUD.loadContent() : JSON.parse(localStorage.getItem(LKEY+":packs")||"[]");
    const live = list.filter(x => !x.deleted);
    el.innerHTML = live.length ? live.map(x => `<div class="pk"><span><b>${esc(x.title)}</b> · ${esc(subjOf(x.subject)?.name||x.subject)} · ${LVNAME[x.level]||""}</span><button class="back" data-rm="${esc(slug(x.title))}">Remove</button></div>`).join("") : `<p class="note">No packs added yet.</p>`;
    $$("[data-rm]").forEach(b => b.onclick = async () => { if(!confirm("Remove this pack from Lucy's app?")) return;
      if(CLOUD && MODE !== "local") await CLOUD.addContent(b.dataset.rm, {deleted:true, title:b.dataset.rm});
      else localStorage.setItem(LKEY+":packs", JSON.stringify(JSON.parse(localStorage.getItem(LKEY+":packs")||"[]").filter(x => slug(x.title) !== b.dataset.rm)));
      const i = SETS.findIndex(x => x.id === "pk-"+b.dataset.rm); if(i >= 0) SETS.splice(i,1); listPacks(); });
  }catch(e){ el.innerHTML = `<p class="note">Couldn't load packs: ${esc(e.code||e.message)}</p>`; }
}

/* ---------------- start-up ---------------- */
function welcome(msg){
  banner();
  app.innerHTML = `<div class="hero" style="flex-direction:column;text-align:center;margin-top:20px">${lottie(RANKS[2])}<div><h1>Lucy's <em>11+ Lagoon</em></h1><p>Dive in with Lottie the axolotl!</p></div></div>
    <div class="row" style="justify-content:center;margin-top:20px"><button class="btn" id="kid" style="font-size:1.25rem;padding:18px 30px">I'm Lucy: sign in with Google 🦎</button></div>
    <div class="row" style="justify-content:center"><button class="btn ghost small" id="grown">Grown-ups: sign in with Google</button></div>
    ${CLOUD ? `<div class="row" style="justify-content:center"><button class="back" id="anon" style="font-size:.85rem">Can't use Google? Play on this device only</button></div>` : ""}
    ${msg ? `<p class="fb bad">${esc(msg)}</p>` : ""}
    <p class="note" style="text-align:center">${CLOUD ? "Signing in with Google means Lucy's progress follows her to any device, and a grown-up can see it." : "Saved on this device. (Not connected to the cloud yet.)"}</p>`;
  const google = async who => { try{ await CLOUD.signInGoogle(); }catch(e){ welcome(`${who} sign-in didn't finish: ` + (e.code||e.message) + (who === "Lucy's" ? ". If Lucy's Google account is supervised with Family Link, a parent may need to allow this site." : "")); } };
  $("#kid").onclick = () => { if(!CLOUD){ MODE = "local"; USER = null; P = normalise(loadLocal()); home(); return; } google("Lucy's"); };
  $("#grown").onclick = () => { if(!CLOUD){ MODE = "preview"; P = fresh(); home(); return; } google("Grown-up"); };
  const an = $("#anon"); if(an) an.onclick = async () => { try{ await CLOUD.signInChild(); }catch(e){ welcome("Couldn't start: " + (e.code||e.message) + ". Anonymous sign-in may be switched off in Firebase."); } };
}
async function onUser(user){
  USER = user;
  if(!user){ MODE = "local"; welcome(); return; }
  app.innerHTML = `<p class="loading">Filling the lagoon…</p>`;
  try{ mergeContent(await CLOUD.loadContent()); }catch(e){}
  if(!user.isAnonymous && CLOUD.isParent(user.email)){ MODE = "preview"; P = fresh(); P.name = "Grown-up"; home(); return; }
  MODE = "child";
  let cloud = null; try{ cloud = await CLOUD.loadPlayer(user.uid); }catch(e){}
  const local = loadLocal(user.uid);
  P = normalise((cloud && (!local || (cloud.updated||0) >= (local.updated||0))) ? cloud : local);
  home();
}
window.bootApp = cloud => {
  CLOUD = cloud;
  try{ mergeContent(JSON.parse(localStorage.getItem(LKEY+":packs")||"[]")); }catch(e){}
  if(!cloud){ welcome(); return; }
  cloud.onUser(onUser);
};
window.addEventListener("pagehide", () => { if(P && MODE === "child") save(true); });
