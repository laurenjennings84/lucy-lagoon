/* Lucy's 11+ Lagoon — Times Table Tide: instant-recall times tables games.
   Tracks every fact (2×2 … 12×12): how often it's right and how fast, and serves the weakest ones more often. */
"use strict";
const TT_BADGES = {2:["🐚","Shell Seeker"],3:["🦐","Shrimp Sprinter"],4:["🐠","Fish Flash"],5:["⭐","Starfish Star"],6:["🐢","Turtle Turbo"],7:["🐙","Octo Ace"],8:["🦑","Squid Speedster"],9:["🐬","Dolphin Dash"],10:["🦭","Seal Supreme"],11:["🐳","Whale Wizard"],12:["👑","Lagoon Royal"]};
const FAST = 3000; // a fact counts as "instant" if answered right in under 3 seconds
function ttData(p){ p.tt = p.tt || {}; p.tt.facts = p.tt.facts || {}; p.tt.best = p.tt.best || {}; p.tt.badges = p.tt.badges || []; p.tt.tables = p.tt.tables || [2,3,4,5,6,7,8,9,10,11,12]; if(p.tt.div == null) p.tt.div = false; return p.tt; }
const fkey = (a,b) => a <= b ? `${a}x${b}` : `${b}x${a}`;
function fstate(f){
  if(!f || !f.n) return "new";
  const last = (f.h||[]).slice(-3);
  if(last.length >= 3 && last.every(x => x.ok && x.ms < FAST)) return "star";
  if(last.length && !last[last.length-1].ok) return "miss";
  if(last.length && last[last.length-1].ms >= FAST) return "slow";
  return "learn";
}
const ST_COL = {new:"#e2e8f0", miss:"#fda4af", slow:"#fcd34d", learn:"#a5b4fc", star:"#2dd4bf"};
const ST_LABEL = {new:"Not tried", miss:"Needs practice", slow:"Getting there (slow)", learn:"Learning", star:"Instant! ⭐"};
function tableMastery(tt, t){ let s = 0; for(let b=2;b<=12;b++) if(fstate(tt.facts[fkey(t,b)]) === "star") s++; return s; } // out of 11

function pickFact(tt, recent){
  const W = {new:3, miss:7, slow:5, learn:2.5, star:0.6};
  const pool = [];
  tt.tables.forEach(a => { for(let b=2;b<=12;b++){ const k = fkey(a,b); if(recent.includes(k) && Math.random() < .85) continue; pool.push({a, b, w: W[fstate(tt.facts[k])]}); } });
  if(!pool.length) return {a:7, b:8};
  let r = Math.random() * pool.reduce((s,x) => s + x.w, 0);
  for(const x of pool){ r -= x.w; if(r <= 0) return Math.random() < .5 ? x : {a:x.b, b:x.a}; }
  return pool[0];
}
function makeQ(tt, recent){
  const {a, b} = pickFact(tt, recent); const div = tt.div && Math.random() < .35;
  return div ? {a, b, text:`${a*b} ÷ ${a}`, ans:b, key:fkey(a,b)} : {a, b, text:`${a} × ${b}`, ans:a*b, key:fkey(a,b)};
}
function logFact(tt, key, ok, ms){
  if(MODE === "preview") return;
  const f = tt.facts[key] = tt.facts[key] || {n:0, ok:0, h:[]};
  f.n++; if(ok) f.ok++; f.h.push({ok, ms:Math.round(ms)}); if(f.h.length > 6) f.h = f.h.slice(-6);
}
function checkBadges(tt){
  const got = [];
  for(let t=2;t<=12;t++) if(!tt.badges.includes(t) && tableMastery(tt,t) >= 11){ tt.badges.push(t); got.push(t); }
  return got;
}

/* ---------- menu ---------- */
function ttHome(){
  RUN = null; clearInterval(tick); banner();
  const tt = ttData(P);
  const stars = Object.values(tt.facts).filter(f => fstate(f) === "star").length;
  app.innerHTML = `<button class="back" id="bk">← Home</button>
    <div class="hero" style="background:linear-gradient(135deg,#0891b2,#4f46e5 60%,#9333ea)"><span style="font-size:3.2rem">🌊</span><div><h1>Times Table <em>Tide</em></h1>
      <p>Get them instant! <b>${stars}</b> of 66 facts are ⭐ instant.</p><div class="xpbar"><b style="width:${Math.round(stars/66*100)}%"></b></div></div></div>
    <div class="ttmodes">
      <button class="ttmode" id="sprint" style="background:linear-gradient(135deg,#14b8a6,#0e7490)"><span class="em">⚡</span><b>Lagoon Sprint</b><small>60 seconds · beat your best${tt.best.sprint ? ` (${tt.best.sprint})` : ""}</small></button>
      <button class="ttmode" id="bubbles" style="background:linear-gradient(135deg,#3b82f6,#6d28d9)"><span class="em">🫧</span><b>Bubble Pop</b><small>Pop the right answer${tt.best.bubbles ? ` · best ${tt.best.bubbles}` : ""}</small></button>
      <button class="ttmode" id="mtc" style="background:linear-gradient(135deg,#8b5cf6,#be185d)"><span class="em">⏱️</span><b>6-Second Challenge</b><small>25 questions, 6 s each, like the MTC${tt.best.mtc != null ? ` · best ${tt.best.mtc}/25` : ""}</small></button>
      <button class="ttmode" id="calm" style="background:linear-gradient(135deg,#0d9488,#2563eb)"><span class="em">🐢</span><b>Calm Practice</b><small>No timer · 20 of your trickiest</small></button>
    </div>
    <div class="card"><h3>Which tables?</h3><div class="levels">${[2,3,4,5,6,7,8,9,10,11,12].map(t => `<button class="chip ${tt.tables.includes(t)?"on":""}" data-t="${t}">${t}×</button>`).join("")}</div>
      <div class="row"><button class="chip" id="all">All</button><button class="chip" id="tricky">Tricky ones (6, 7, 8, 9, 12)</button><label class="chip"><input type="checkbox" id="div" ${tt.div?"checked":""}> Include division (56 ÷ 8)</label></div></div>
    <div class="card"><h3>My times table treasure map</h3><p class="note">Every fact lights up teal ⭐ when you get it right in under 3 seconds three times in a row.</p>${ttGrid(tt)}
      <div class="legend">${Object.keys(ST_COL).map(k => `<span><i style="background:${ST_COL[k]}"></i>${ST_LABEL[k]}</span>`).join("")}</div></div>
    <div class="card"><h3>Table badges</h3><div class="stickers">${[2,3,4,5,6,7,8,9,10,11,12].map(t => { const has = tt.badges.includes(t), m = tableMastery(tt,t);
      return `<div class="stk ${has?"":"locked"}"><span class="e">${TT_BADGES[t][0]}</span><small><b>${t}×</b> ${has ? TT_BADGES[t][1] : m+"/11"}</small></div>`; }).join("")}</div></div>`;
  $("#bk").onclick = home;
  const saveTables = () => { save(); ttHome(); };
  $$("[data-t]").forEach(b => b.onclick = () => { const t = +b.dataset.t; tt.tables = tt.tables.includes(t) ? tt.tables.filter(x => x !== t) : [...tt.tables, t].sort((a,b)=>a-b); if(!tt.tables.length) tt.tables = [t]; saveTables(); });
  $("#all").onclick = () => { tt.tables = [2,3,4,5,6,7,8,9,10,11,12]; saveTables(); };
  $("#tricky").onclick = () => { tt.tables = [6,7,8,9,12]; saveTables(); };
  $("#div").onchange = e => { tt.div = e.target.checked; save(); };
  $("#sprint").onclick = () => ttPlay("sprint"); $("#mtc").onclick = () => ttPlay("mtc"); $("#calm").onclick = () => ttPlay("calm"); $("#bubbles").onclick = ttBubbles;
  top0();
}
function ttGrid(tt, small){
  let h = `<div class="ttgrid ${small?"small":""}"><span></span>${[2,3,4,5,6,7,8,9,10,11,12].map(n => `<b>${n}</b>`).join("")}`;
  for(let a=2;a<=12;a++){ h += `<b>${a}</b>`; for(let b=2;b<=12;b++){ const st = fstate(tt.facts[fkey(a,b)]); h += `<i style="background:${ST_COL[st]}" title="${a} × ${b} = ${a*b}">${small ? "" : a*b}</i>`; } }
  return h + `</div>`;
}

/* ---------- keypad games: sprint, 6-second challenge, calm ---------- */
let TT = null;
function ttPlay(mode){
  const tt = ttData(P); clearInterval(tick);
  TT = {mode, tt, score:0, wrong:0, combo:0, bestCombo:0, n:0, recent:[], log:[], start:Date.now(), limit: mode === "sprint" ? 60 : 0, total: mode === "mtc" ? 25 : mode === "calm" ? 20 : 0, per: mode === "mtc" ? 6 : 0};
  app.innerHTML = `<div class="playhead"><button class="back" id="quit">✕</button><div class="prog"><b id="pg" style="width:0%"></b></div><span class="timer" id="tmr"></span></div>
    <div class="ttarena">
      <div class="ttstats"><span>✅ <b id="sc">0</b></span><span id="cb" class="combo"></span></div>
      <div class="ttq" id="q"></div>
      <div class="answer" id="ans">&nbsp;</div>
      <div class="ttfb" id="fb"></div>
      <div class="keypad tt">${["7","8","9","4","5","6","1","2","3","⌫","0","✓"].map(k => `<button class="${k==="⌫"?"del":k==="✓"?"okk":""}" data-k="${k}">${k}</button>`).join("")}</div>
    </div>`;
  $("#quit").onclick = () => { clearInterval(tick); document.removeEventListener("keydown", ttKey); TT = null; ttHome(); };
  $$("[data-k]").forEach(b => b.onpointerdown = e => { e.preventDefault(); ttPress(b.dataset.k); });
  document.addEventListener("keydown", ttKey);
  tick = setInterval(ttTick, 100);
  ttNext(); top0();
}
function ttKey(e){ if(!TT || !document.getElementById("q")){ document.removeEventListener("keydown", ttKey); return; }
  if(/^[0-9]$/.test(e.key)) ttPress(e.key); else if(e.key === "Backspace") ttPress("⌫"); else if(e.key === "Enter") ttPress("✓"); }
function ttNext(){
  if(!TT) return;
  if(TT.total && TT.n >= TT.total) return ttEnd();
  TT.q = makeQ(TT.tt, TT.recent); TT.recent = [...TT.recent, TT.q.key].slice(-5); TT.val = ""; TT.qStart = Date.now(); TT.lock = false;
  const q = document.getElementById("q"); q.textContent = TT.q.text + " ="; q.classList.remove("pop"); void q.offsetWidth; q.classList.add("pop");
  document.getElementById("ans").innerHTML = "&nbsp;"; document.getElementById("ans").className = "answer";
  document.getElementById("fb").textContent = "";
  if(TT.total) document.getElementById("pg").style.width = Math.round(TT.n/TT.total*100) + "%";
}
function ttPress(k){
  if(!TT || TT.lock) return;
  if(k === "⌫") TT.val = TT.val.slice(0,-1);
  else if(k === "✓"){ if(TT.val) ttAnswer(+TT.val === TT.q.ans); return; }
  else if(TT.val.length < 3) TT.val += k;
  document.getElementById("ans").textContent = TT.val || " ";
  // instant mode: as soon as enough digits are typed, check automatically
  if(TT.val.length >= String(TT.q.ans).length) ttAnswer(+TT.val === TT.q.ans);
}
function ttAnswer(ok, timedOut){
  const ms = Date.now() - TT.qStart; TT.lock = true; TT.n++;
  logFact(TT.tt, TT.q.key, ok, ms); TT.log.push({k:TT.q.key, t:TT.q.text, ans:TT.q.ans, ok, ms});
  const a = document.getElementById("ans"), fb = document.getElementById("fb");
  if(ok){ TT.score++; TT.combo++; TT.bestCombo = Math.max(TT.bestCombo, TT.combo); a.classList.add("right"); sfx.right();
    fb.textContent = ms < 1500 ? pick(["⚡ Lightning!","🚀 Instant!","✨ Whoosh!"]) : ms < FAST ? pick(["Nice! 💙","Yes! 🦎","Great! 🐠"]) : "Right! Try to be quicker next time 🐢";
    if(TT.combo && TT.combo % 10 === 0){ confetti(30); fb.textContent = `🔥 ${TT.combo} in a row!`; } }
  else { TT.wrong++; TT.combo = 0; a.classList.add("wrong"); shake(a); sfx.wrong(); a.textContent = TT.q.ans; fb.textContent = timedOut ? `⏰ ${TT.q.text} = ${TT.q.ans}` : `${TT.q.text} = ${TT.q.ans}. You'll see it again soon!`; }
  document.getElementById("sc").textContent = TT.score;
  document.getElementById("cb").textContent = TT.combo >= 3 ? `🔥 ×${TT.combo}` : "";
  setTimeout(ttNext, ok ? 350 : 1500);
}
function ttTick(){
  if(!TT) return; const el = document.getElementById("tmr"); if(!el) return;
  if(TT.limit){ const left = TT.limit - (Date.now()-TT.start)/1000; el.textContent = "⏳ " + Math.max(0, Math.ceil(left)); el.classList.toggle("low", left < 10);
    document.getElementById("pg").style.width = Math.min(100, (Date.now()-TT.start)/10/TT.limit) + "%"; if(left <= 0) ttEnd(); return; }
  if(TT.per && !TT.lock){ const left = TT.per - (Date.now()-TT.qStart)/1000; el.textContent = "⏱ " + Math.max(0, Math.ceil(left)); el.classList.toggle("low", left < 2); if(left <= 0) ttAnswer(false, true); return; }
  el.textContent = TT.per ? "" : "🐢";
}
function ttEnd(){
  if(!TT) return; clearInterval(tick); document.removeEventListener("keydown", ttKey);
  const R = TT; TT = null; ttFinish(R, R.mode === "sprint" ? "Lagoon Sprint" : R.mode === "mtc" ? "6-Second Challenge" : "Calm Practice");
}
function ttFinish(R, title){
  const tt = R.tt, before = starTotal(), answered = R.log.length;
  const fast = R.log.filter(x => x.ok && x.ms < FAST).length;
  let stars = 0, best = false, key = R.mode;
  if(R.mode === "sprint" || R.mode === "bubbles"){ stars = R.score >= 35 ? 3 : R.score >= 22 ? 2 : R.score >= 10 ? 1 : 0; if(R.score > (tt.best[key]||0)){ best = !!tt.best[key]; if(MODE !== "preview") tt.best[key] = R.score; } }
  else if(R.mode === "mtc"){ stars = R.score >= 25 ? 3 : R.score >= 20 ? 2 : R.score >= 12 ? 1 : 0; if(tt.best.mtc == null || R.score > tt.best.mtc){ best = tt.best.mtc != null; if(MODE !== "preview") tt.best.mtc = R.score; } }
  else stars = answered && R.score/answered >= .95 ? 3 : answered && R.score/answered >= .8 ? 2 : 1;
  let badges = [];
  if(MODE !== "preview"){
    P.xp += R.score * 4 + fast * 2 + (best ? 25 : 0);
    P.stars["_tt"] = (P.stars["_tt"]||0) + stars;
    P.attempts.push({s:"tt-"+R.mode, m:"tt", t:"Times tables: " + title, c:R.score, n:Math.max(answered,1), by:{"maths|5|Times tables":[R.score, Math.max(answered,1)]}, ts:Date.now(), sec:Math.round((Date.now()-R.start)/1000)});
    if(P.attempts.length > 400) P.attempts = P.attempts.slice(-400);
    bumpStreak(); badges = checkBadges(tt);
  }
  const got = MODE !== "preview" ? awardStickers(before) : [];
  save(true); sfx.done(); if(best || stars === 3 || badges.length) confetti();
  const slow = R.log.filter(x => !x.ok || x.ms >= FAST).sort((a,b) => (a.ok-b.ok) || (b.ms-a.ms)).slice(0,6);
  app.innerHTML = `<div class="card results stitch">${lottie(rank(P.xp))}
    <h1>${best ? "New personal best! 🏆" : ["Keep practising!","Good effort!","Brilliant!","Superstar!"][stars]}</h1>
    <div class="bigstars">${[1,2,3].map(i => `<span class="${i <= stars ? "" : "dim"}">⭐</span>`).join("")}</div>
    <p style="font-size:1.2rem"><b>${R.score}</b> right${R.mode === "mtc" ? " out of 25" : ""} · ⚡ <b>${fast}</b> instant${R.bestCombo >= 3 ? ` · 🔥 best streak ${R.bestCombo}` : ""}</p>
    ${badges.map(t => `<div class="card" style="background:var(--purple-l)"><div class="sticker-new">${TT_BADGES[t][0]}</div><b>${t}× table badge: ${TT_BADGES[t][1]}! Every ${t}× fact is instant!</b></div>`).join("")}
    ${got.length ? `<div class="card" style="background:var(--purple-l)"><div class="sticker-new">${got.map(s => STICKERS[s][0]).join(" ")}</div><b>New sticker!</b></div>` : ""}
    ${MODE === "preview" ? `<p class="fb info">Preview mode: not saved.</p>` : ""}
    <div class="row" style="justify-content:center"><button class="btn" id="again">Play again 🔁</button><button class="btn ghost" id="bk">Back</button></div></div>
    ${slow.length ? `<div class="card"><h3>Facts to practise</h3><div class="ttchips">${slow.map(x => `<span class="${x.ok?"slow":"miss"}">${x.t} = <b>${x.ans}</b>${x.ok ? ` · ${(x.ms/1000).toFixed(1)}s` : ""}</span>`).join("")}</div>
      <p class="note">Say them out loud three times. They'll come up more often until they're instant.</p></div>` : ""}`;
  $("#again").onclick = () => R.mode === "bubbles" ? ttBubbles() : ttPlay(R.mode); $("#bk").onclick = ttHome; top0();
}

/* ---------- Bubble Pop ---------- */
function ttBubbles(){
  const tt = ttData(P); clearInterval(tick);
  TT = {mode:"bubbles", tt, score:0, wrong:0, combo:0, bestCombo:0, n:0, recent:[], log:[], start:Date.now(), limit:60};
  app.innerHTML = `<div class="playhead"><button class="back" id="quit">✕</button><div class="prog"><b id="pg" style="width:0%"></b></div><span class="timer" id="tmr"></span></div>
    <div class="ttstats"><span>🫧 <b id="sc">0</b></span><span id="cb" class="combo"></span></div>
    <div class="ttq" id="q"></div><div class="pond" id="pond"></div>`;
  $("#quit").onclick = () => { clearInterval(tick); TT = null; ttHome(); };
  tick = setInterval(() => { if(!TT) return; const left = 60 - (Date.now()-TT.start)/1000; const el = document.getElementById("tmr"); if(!el) return;
    el.textContent = "⏳ " + Math.max(0, Math.ceil(left)); el.classList.toggle("low", left < 10); document.getElementById("pg").style.width = Math.min(100,(60-left)/60*100) + "%";
    if(left <= 0){ clearInterval(tick); const R = TT; TT = null; ttFinish(R, "Bubble Pop"); } }, 100);
  bubbleRound(); top0();
}
function distractors(a, b){
  const ans = a*b, set = new Set([ans]);
  [a*(b+1), a*(b-1), (a+1)*b, (a-1)*b, ans+10, ans-10, Number(String(ans).split("").reverse().join("")), ans+a, ans-b].forEach(x => { if(x > 0 && set.size < 4) set.add(x); });
  while(set.size < 4) set.add(ans + rnd(1,9));
  return shuffle([...set]);
}
function bubbleRound(){
  if(!TT) return;
  TT.q = makeQ(TT.tt, TT.recent); TT.recent = [...TT.recent, TT.q.key].slice(-5); TT.qStart = Date.now(); TT.lock = false;
  const q = document.getElementById("q"); if(!q) return; q.textContent = TT.q.text + " = ?"; q.classList.remove("pop"); void q.offsetWidth; q.classList.add("pop");
  const opts = TT.q.text.includes("÷") ? shuffle([TT.q.ans, ...shuffle([2,3,4,5,6,7,8,9,10,11,12].filter(x => x !== TT.q.ans)).slice(0,3)]) : distractors(TT.q.a, TT.q.b);
  const cols = ["#5eead4","#93c5fd","#c4b5fd","#f0abfc"];
  const pond = document.getElementById("pond");
  pond.innerHTML = opts.map((o,i) => `<button class="bubble" data-v="${o}" style="left:${6+i*23}%;background:radial-gradient(circle at 30% 28%,#fff 0 12%,${cols[i]} 45%,${cols[(i+1)%4]});animation-duration:${(5.2 - Math.min(2, TT.score*0.05)).toFixed(2)}s;animation-delay:${(i*0.12).toFixed(2)}s">${o}</button>`).join("");
  pond.querySelectorAll(".bubble").forEach(b => {
    b.onpointerdown = e => { e.preventDefault(); if(TT.lock) return; const ok = +b.dataset.v === TT.q.ans; popBubble(b, ok); };
    b.onanimationend = () => { if(TT && !TT.lock && +b.dataset.v === TT.q.ans) popBubble(null, false, true); };
  });
}
function popBubble(b, ok, escaped){
  const ms = Date.now() - TT.qStart; TT.lock = true; TT.n++;
  logFact(TT.tt, TT.q.key, ok, ms); TT.log.push({k:TT.q.key, t:TT.q.text, ans:TT.q.ans, ok, ms});
  const pond = document.getElementById("pond");
  if(ok){ TT.score++; TT.combo++; TT.bestCombo = Math.max(TT.bestCombo, TT.combo); b.classList.add("popped"); sfx.right(); if(TT.combo % 10 === 0) confetti(25); }
  else { TT.wrong++; TT.combo = 0; sfx.wrong(); if(b) b.classList.add("bad");
    pond.querySelectorAll(".bubble").forEach(x => { if(+x.dataset.v === TT.q.ans) x.classList.add("hint"); });
    document.getElementById("q").textContent = `${TT.q.text} = ${TT.q.ans}`; }
  document.getElementById("sc").textContent = TT.score; document.getElementById("cb").textContent = TT.combo >= 3 ? `🔥 ×${TT.combo}` : "";
  setTimeout(bubbleRound, ok ? 300 : 1300);
}

/* ---------- dashboard & report ---------- */
function ttCard(p){
  const tt = ttData(p), facts = Object.entries(tt.facts);
  if(!facts.length) return `<h3>Times tables</h3><p class="note">Not played yet.</p>`;
  const stars = facts.filter(([,f]) => fstate(f) === "star").length;
  const hard = facts.filter(([,f]) => ["miss","slow"].includes(fstate(f))).map(([k,f]) => { const [a,b] = k.split("x"); const h = f.h||[]; const avg = h.length ? h.reduce((s,x)=>s+x.ms,0)/h.length : 0; return {t:`${a}×${b}`, acc:Math.round(f.ok/f.n*100), avg}; }).sort((x,y) => x.acc-y.acc || y.avg-x.avg).slice(0,10);
  return `<h3>Times tables</h3><p class="note">⭐ Instant: <b>${stars}/66</b> facts · badges: ${tt.badges.length ? tt.badges.map(t => TT_BADGES[t][0]+t+"×").join(" ") : "none yet"} · Sprint best ${tt.best.sprint||"–"} · Bubble best ${tt.best.bubbles||"–"} · 6-second best ${tt.best.mtc!=null ? tt.best.mtc+"/25" : "–"}</p>
    ${ttGrid(tt, true)}<div class="legend">${Object.keys(ST_COL).map(k => `<span><i style="background:${ST_COL[k]}"></i>${ST_LABEL[k]}</span>`).join("")}</div>
    ${hard.length ? `<p class="note">Trickiest right now: ${hard.map(h => `<b>${h.t}</b> (${h.acc}%, ${(h.avg/1000).toFixed(1)}s)`).join(", ")}</p>` : ""}`;
}
function ttReport(p){
  const tt = ttData(p), facts = Object.entries(tt.facts); if(!facts.length) return "Times tables: not played yet";
  const stars = facts.filter(([,f]) => fstate(f) === "star").length;
  const hard = facts.filter(([,f]) => ["miss","slow"].includes(fstate(f))).map(([k]) => k.replace("x","×")).slice(0,12);
  return `Times tables: ${stars}/66 facts instant (right in under 3 s, 3 times running); badges ${tt.badges.join(", ")||"none"}; Sprint best ${tt.best.sprint||"–"}, 6-second challenge best ${tt.best.mtc ?? "–"}/25. Still tricky: ${hard.join(", ")||"none"}`;
}
