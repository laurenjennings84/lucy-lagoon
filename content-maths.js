/* Lucy's 11+ Lagoon — Maths (Number Reef). Generators make fresh questions every round.
   Each make(level) returns {q, a, exact?, hint?, svg?, ui?}. level: 5, 6 or 7. */
window.SETS = window.SETS || [];
(function(){
const R = (a,b) => a + Math.floor(Math.random()*(b-a+1));
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
const fmt = n => n.toLocaleString("en-GB");
const gcd = (a,b) => b ? gcd(b, a % b) : Math.abs(a);
const lcm = (a,b) => a*b/gcd(a,b);
const frac = (n,d) => { const g = gcd(n,d); return d/g === 1 ? String(n/g) : `${n/g}/${d/g}`; };
const F = (n,d) => `<span class="fr"><sup>${n}</sup><sub>${d}</sub></span>`;
const round = (x,dp=2) => Math.round(x*10**dp)/10**dp;
const name = () => pick(["Lucy","Ivy","Nell","Ruby","Maya","Zara","Ollie","Sam","Priya","Leo"]);

window.GENS = {
place: { name:"Place value & rounding", make(L){
  if(L===5){
    const t = pick([0,1,2]);
    if(t===0){ const n = R(100000,999999), s = String(n), i = R(0,5), d = s[i]; if(d==="0") return this.make(L);
      return {q:`What is the value of the digit <b>${d}</b> in <b>${fmt(n)}</b>?`, a:String(+d*10**(5-i)), hint:"Count the places from the right: ones, tens, hundreds…"}; }
    if(t===1){ const n = R(10000,999999), p = pick([10,100,1000,10000]);
      return {q:`Round <b>${fmt(n)}</b> to the nearest <b>${fmt(p)}</b>.`, a:String(Math.round(n/p)*p), hint:"Look at the digit to the right of the one you're rounding to. 5 or more rounds up."}; }
    const n = R(1000,9999), m = pick([10,100,1000]), mul = Math.random()<.5;
    return mul ? {q:`${fmt(n)} × ${fmt(m)} = ?`, a:String(n*m)} : {q:`${fmt(n*m)} ÷ ${fmt(m)} = ?`, a:String(n)};
  }
  if(L===6){
    const t = pick([0,1,2]);
    if(t===0){ const n = R(1000000,9999999), p = pick([10000,100000,1000000]);
      return {q:`Round <b>${fmt(n)}</b> to the nearest <b>${fmt(p)}</b>.`, a:String(Math.round(n/p)*p)}; }
    if(t===1){ const x = R(1000,99999)/1000; return {q:`Round <b>${x}</b> to <b>1 decimal place</b>.`, a:String(round(x,1)), hint:"Look at the hundredths digit."}; }
    const x = R(11,999)/100, m = pick([10,100,1000]);
    return {q:`${x} × ${fmt(m)} = ?`, a:String(round(x*m,4))};
  }
  const t = pick([0,1,2]);
  if(t===0){ const x = R(10000,999999)/10000; return {q:`Round <b>${x}</b> to <b>2 decimal places</b>.`, a:String(round(x,2))}; }
  if(t===1){ const x = R(1,999)/100, m = pick([0.1,0.01]); return {q:`${x} ÷ ${m} = ?`, a:String(round(x/m,4)), hint:"Dividing by 0.1 is the same as multiplying by 10."}; }
  const n = R(1100,98000); const sf = Number(n.toPrecision(1));
  return {q:`Round <b>${fmt(n)}</b> to <b>1 significant figure</b>.`, a:String(sf), hint:"Keep only the first non-zero digit, then fill with zeros."};
}},

negatives: { name:"Negative numbers", make(L){
  if(L===5){ const s = R(-9,4), up = R(3,12);
    return pick([
      {q:`The temperature is <b>${s}°C</b>. It rises by <b>${up}°C</b>. What is the new temperature?`, a:String(s+up)},
      {q:`The temperature is <b>${s+up}°C</b>. It falls by <b>${up}°C</b>. What is the new temperature?`, a:String(s)},
      {q:`Count back ${up} from ${s+up}. Where do you land?`, a:String(s)}]); }
  if(L===6){ const a = R(-15,-1), b = R(1,15);
    return pick([{q:`What is the difference between <b>${a}°C</b> and <b>${b}°C</b>?`, a:String(b-a)},
                 {q:`${a} + ${b} = ?`, a:String(a+b)}, {q:`${b} − ${b-a+R(1,5)} = ?`, a:String(b-(b-a+0))}].slice(0,2)); }
  const a = R(-12,12)||3, b = R(-9,9)||-4, t = pick(["+","−","×","÷"]);
  if(t==="×") return {q:`(${a}) × (${b}) = ?`, a:String(a*b), hint:"Same signs make a positive; different signs make a negative."};
  if(t==="÷"){ const p = a*b; return {q:`(${p}) ÷ (${b}) = ?`, a:String(a)}; }
  if(t==="−") return {q:`(${a}) − (${b}) = ?`, a:String(a-b), hint:"Subtracting a negative is the same as adding."};
  return {q:`(${a}) + (${b}) = ?`, a:String(a+b)};
}},

mental: { name:"Mental maths", make(L){
  if(L===5){ const a = R(3,12), b = R(3,12), t = pick([0,1,2,3]);
    if(t===0) return {q:`${a} × ${b} = ?`, a:String(a*b)};
    if(t===1) return {q:`${a*b} ÷ ${a} = ?`, a:String(b)};
    if(t===2){ const x = R(1200,8999), y = R(150,2999); return {q:`${fmt(x)} + ${fmt(y)} = ?`, a:String(x+y)}; }
    const x = R(3000,9999), y = R(150,2999); return {q:`${fmt(x)} − ${fmt(y)} = ?`, a:String(x-y)}; }
  if(L===6){ const t = pick([0,1,2]);
    if(t===0){ const a = R(13,79), b = R(12,48); return {q:`${a} × ${b} = ?`, a:String(a*b), hint:"Try the grid method or long multiplication."}; }
    if(t===1){ const d = R(3,9), q = R(120,999); return {q:`${fmt(d*q)} ÷ ${d} = ?`, a:String(q)}; }
    const d = R(12,25), q = R(11,45); return {q:`${fmt(d*q)} ÷ ${d} = ?`, a:String(q), hint:"Long division, or try multiples of the divisor."}; }
  const t = pick([0,1,2]);
  if(t===0){ const a = R(11,99)/10, b = R(2,9); return {q:`${a} × ${b} = ?`, a:String(round(a*b,3))}; }
  if(t===1){ const a = R(2,9)/10, b = R(2,9)/10; return {q:`${a} × ${b} = ?`, a:String(round(a*b,3)), hint:"Do 3 × 4, then count the decimal places."}; }
  const b = pick([0.2,0.5,0.4,0.25]), q = R(3,30); return {q:`${round(b*q,3)} ÷ ${b} = ?`, a:String(q)};
}},

factors: { name:"Factors, primes, squares", make(L){
  if(L===5){ const t = pick([0,1,2,3]);
    if(t===0){ const n = R(2,12); return {q:`What is ${n} squared (${n}²)?`, a:String(n*n)}; }
    if(t===1){ const n = R(2,5); return {q:`What is ${n} cubed (${n}³)?`, a:String(n**3)}; }
    if(t===2){ const ps=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]; const i = R(0,ps.length-2);
      return {q:`What is the next prime number after <b>${ps[i]}</b>?`, a:String(ps[i+1]), hint:"A prime has exactly two factors: 1 and itself."}; }
    const n = pick([12,18,20,24,30,36,40,48]); const f = []; for(let i=1;i<=n;i++) if(n%i===0) f.push(i);
    return {q:`How many factors does <b>${n}</b> have?`, a:String(f.length), hint:"List them in pairs: 1 × " + n + ", 2 × " + (n/2) + "…"}; }
  if(L===6){ const t = pick([0,1]); const a = pick([6,8,9,12,15,16,18,20,24]), b = pick([4,6,10,12,14,21,27,30,36]);
    return t===0 ? {q:`What is the <b>highest common factor</b> of ${a} and ${b}?`, a:String(gcd(a,b))}
                 : {q:`What is the <b>lowest common multiple</b> of ${pick([3,4,6])} and ${b%5?b:8}?`, ...(()=>{const x=[3,4,6][0];return{};})(), a:null}; }
  const t = pick([0,1,2]);
  if(t===0){ const n = R(4,15); return {q:`√${n*n} = ?`, a:String(n)}; }
  if(t===1){ const b = pick([2,3,10]), e = b===2?R(4,8):b===3?R(2,4):R(3,6); return {q:`${b}<sup>${e}</sup> = ?`, a:String(b**e)}; }
  const n = pick([12,18,20,28,45,50,63,72]); let m = n, s = 0; for(let p=2;p<=m;p++) while(m%p===0){ m/=p; s=Math.max(s,p); }
  return {q:`What is the <b>largest prime factor</b> of ${n}?`, a:String(s)};
}},

fractions: { name:"Fractions", make(L){
  if(L===5){ const t = pick([0,1,2,3]);
    if(t===0){ const d = pick([3,4,5,6,8,10]), n = R(1,d-1), k = R(2,9); return {q:`What is ${F(n,d)} of <b>${d*k}</b>?`, a:String(n*k), hint:"Divide by the bottom, multiply by the top."}; }
    if(t===1){ const d = pick([3,4,5,6]), n = R(1,d-1), k = R(2,6); return {q:`${F(n,d)} = ${F("?",d*k)}`, a:String(n*k)}; }
    if(t===2){ const d = pick([5,7,8,9,11]), a = R(1,d-2), b = R(1,d-1-a); return {q:`${F(a,d)} + ${F(b,d)} = ? <small>(write like 3/7)</small>`, a:`${a+b}/${d}`, exact:true}; }
    const d = pick([3,4,5,8]), w = R(1,4), n = R(1,d-1); return {q:`Write ${w}${F(n,d)} as an improper fraction. <small>(like 7/4)</small>`, a:`${w*d+n}/${d}`, exact:true}; }
  if(L===6){ const t = pick([0,1,2,3]);
    if(t===0){ const a = pick([2,3,4,5]), b = pick([3,4,6,8]); if(a===b) return this.make(L); return {q:`${F(1,a)} + ${F(1,b)} = ? <small>(simplest form)</small>`, a:frac(a+b,a*b), exact:true, hint:"Find a common denominator first."}; }
    if(t===1){ const n1 = R(1,4), d1 = R(n1+1,6), n2 = R(1,4), d2 = R(n2+1,7); return {q:`${F(n1,d1)} × ${F(n2,d2)} = ? <small>(simplest form)</small>`, a:frac(n1*n2,d1*d2), exact:true}; }
    if(t===2){ const g = R(2,6), n = R(1,5), d = n+R(1,5); if(gcd(n,d)!==1) return this.make(L); return {q:`Simplify ${F(n*g,d*g)}`, a:`${n}/${d}`, exact:true}; }
    const n = R(1,3), d = pick([4,5,6]), w = R(2,5); return {q:`${F(n,d)} ÷ ${w} = ? <small>(simplest form)</small>`, a:frac(n,d*w), exact:true}; }
  const t = pick([0,1,2]);
  if(t===0){ const a = R(1,3), b = pick([4,5]), c = R(1,3), d = pick([3,6]); return {q:`${F(a,b)} ÷ ${F(c,d)} = ? <small>(simplest, improper is fine)</small>`, a:frac(a*d,b*c), exact:true, hint:"Keep, change, flip: multiply by the reciprocal."}; }
  if(t===1){ const w1 = R(1,3), w2 = R(1,2), d = pick([4,6,8]); const n1 = R(1,d-1), n2 = R(1,d-1);
    return {q:`${w1}${F(n1,d)} + ${w2}${F(n2,d)} = ? <small>(improper fraction, simplest form)</small>`, a:frac(w1*d+n1+w2*d+n2,d), exact:true}; }
  const d = pick([5,8,20,25]), n = R(1,d-1); return {q:`Write ${F(n,d)} as a decimal.`, a:String(round(n/d,4))};
}},

fdp: { name:"Decimals & percentages", make(L){
  if(L===5){ const t = pick([0,1,2,3]);
    if(t===0){ const p = pick([10,20,25,50,75]), n = pick([40,60,80,120,200,360]); return {q:`What is <b>${p}%</b> of <b>${n}</b>?`, a:String(n*p/100)}; }
    if(t===1){ const x = R(1,99)/100; return {q:`Write <b>${x}</b> as a percentage. <small>(just the number)</small>`, a:String(Math.round(x*100))}; }
    if(t===2){ const [n,d,v] = pick([[1,2,0.5],[1,4,0.25],[3,4,0.75],[1,5,0.2],[2,5,0.4],[1,10,0.1],[7,10,0.7]]); return {q:`Write ${F(n,d)} as a decimal.`, a:String(v)}; }
    const a = R(11,99)/10, b = R(11,99)/10; return {q:`${a} + ${b} = ?`, a:String(round(a+b,2))}; }
  if(L===6){ const t = pick([0,1,2]);
    if(t===0){ const p = pick([5,15,35,45,12.5]), n = pick([40,80,120,160,240]); return {q:`What is <b>${p}%</b> of <b>${n}</b>?`, a:String(round(n*p/100,2)), hint:"Find 10% and 5% first, then build up."}; }
    if(t===1){ const [n,d] = pick([[3,8],[1,8],[5,8],[3,20],[7,25],[9,50]]); return {q:`Write ${F(n,d)} as a percentage.`, a:String(round(n/d*100,2))}; }
    const p = pick([10,20,25,30]), c = pick([20,40,60,80,120]); return {q:`A dress costs <b>£${c}</b>. It is reduced by <b>${p}%</b>. What is the sale price in £?`, a:String(c-c*p/100)}; }
  const t = pick([0,1,2]);
  if(t===0){ const n = pick([60,80,120,250,400]), p = pick([15,20,35,40]); return {q:`Increase <b>${n}</b> by <b>${p}%</b>.`, a:String(round(n*(1+p/100),2))}; }
  if(t===1){ const b = pick([20,25,40,50,80]), k = pick([0.15,0.2,0.35,0.6,0.75]); return {q:`What percentage is <b>${round(b*k,2)}</b> of <b>${b}</b>?`, a:String(Math.round(k*100))}; }
  const o = pick([40,50,80,200]), n = o*pick([1.1,1.25,1.5,0.8,0.75]); return {q:`A ticket price changed from £${o} to £${round(n,2)}. What is the percentage change? <small>(use − for a decrease)</small>`, a:String(Math.round((n-o)/o*100))};
}},

bodmas: { name:"Order of operations", make(L){
  const a = R(2,9), b = R(2,9), c = R(2,6);
  if(L<=6) return pick([{q:`${a} + ${b} × ${c} = ?`, a:String(a+b*c), hint:"Multiply before you add."},{q:`(${a} + ${b}) × ${c} = ?`, a:String((a+b)*c)},{q:`${a*c} ÷ ${c} + ${b} × 2 = ?`, a:String(a+b*2)},{q:`${b*c+a} − ${b} × ${c} = ?`, a:String(a)}]);
  return pick([{q:`${a} + ${c}² × 2 = ?`, a:String(a+c*c*2), hint:"Indices (powers) come before multiplying."},{q:`(${a} + ${b})² − ${c} = ?`, a:String((a+b)**2-c)},{q:`${a*4} ÷ (${b} − ${b-4}) + ${c}³ = ?`, a:String(a+c**3)}]);
}},

algebra: { name:"Algebra", make(L){
  if(L===5){ const a = R(3,12), b = R(3,12); return pick([{q:`□ × ${a} = ${a*b}. What is □?`, a:String(b)},{q:`${a*b} ÷ □ = ${a}. What is □?`, a:String(b)},{q:`□ + ${fmt(a*137)} = ${fmt(a*137+b*45)}. What is □?`, a:String(b*45)}]); }
  if(L===6){ const n = R(2,12), a = R(2,9), b = R(1,15); return pick([
    {q:`If <i>n</i> = ${n}, what is <b>${a}n + ${b}</b>?`, a:String(a*n+b)},
    {q:`A shop sells ribbons for £${a} each plus £${b} postage. Cost = ${a}<i>r</i> + ${b}. How much for <i>r</i> = ${n}?`, a:String(a*n+b)},
    {q:`<i>y</i> = ${a}<i>x</i> − ${Math.min(b,a)}. If <i>x</i> = ${n}, what is <i>y</i>?`, a:String(a*n-Math.min(b,a))}]); }
  const x = R(2,12), a = R(2,9), b = R(1,20), t = pick([0,1,2,3]);
  if(t===0) return {q:`Solve: <b>${a}x + ${b} = ${a*x+b}</b>. <i>x</i> = ?`, a:String(x), hint:"Undo the + first, then the ×."};
  if(t===1) return {q:`Solve: <b>${a}x − ${b} = ${a*x-b}</b>. <i>x</i> = ?`, a:String(x)};
  if(t===2){ const p = R(2,7), q = R(1,6), r = R(1,p+q-1); return {q:`Simplify: <b>${p}a + ${q}a − ${r}a</b>`, a:`${p+q-r}a`, exact:true}; }
  const s = R(2,7), c = R(-3,6); const seq = [1,2,3,4].map(n => s*n+c).join(", ");
  return {q:`Find the <b>nth term</b> of: ${seq}, … <small>(like 3n+2)</small>`, a:`${s}n${c===0?"":c>0?"+"+c:c}`, exact:true, hint:"The difference between terms is the number in front of n."};
}},

ratio: { name:"Ratio & proportion", make(L){
  if(L===5){ const k = R(2,6), per = pick([2,3,4,5]); return pick([{q:`For every <b>1</b> red bead there are <b>${per}</b> blue beads. If there are <b>${k}</b> red beads, how many blue?`, a:String(k*per)},{q:`3 reels of thread cost £${3*k}. How much do <b>5</b> reels cost in £?`, a:String(5*k)}]); }
  if(L===6){ const a = R(1,4), b = R(2,5), k = R(3,9);
    return pick([{q:`Share <b>${(a+b)*k}</b> sweets in the ratio <b>${a}:${b}</b>. How many are in the <b>larger</b> share?`, a:String(Math.max(a,b)*k)},
      {q:`A cake recipe for 4 people uses <b>${k*50}g</b> flour. How much flour for <b>6</b> people (g)?`, a:String(k*75)}]); }
  const a = R(2,7), b = R(2,9), g = R(2,6); if(gcd(a,b)!==1) return this.make(L);
  return pick([{q:`Simplify the ratio <b>${a*g}:${b*g}</b>. <small>(like 3:4)</small>`, a:`${a}:${b}`, exact:true},
               {q:`On a map, 1 cm represents ${g} km. Two towns are ${a*2} cm apart. How far is that in km?`, a:String(a*2*g)}]);
}},

measures: { name:"Measures & time", make(L){
  if(L===5){ const t = pick([0,1,2,3,4]);
    if(t===0){ const x = R(11,99)/10; return {q:`How many metres is <b>${x} km</b>?`, a:String(round(x*1000,1))}; }
    if(t===1){ const x = R(105,950); return {q:`How many metres is <b>${x} cm</b>?`, a:String(x/100)}; }
    if(t===2){ const x = R(5,95)/10; return {q:`How many grams is <b>${x} kg</b>?`, a:String(round(x*1000,1))}; }
    if(t===3){ const h = R(1,4), m = pick([15,30,45]); return {q:`How many minutes are in <b>${h} hours ${m} minutes</b>?`, a:String(h*60+m)}; }
    const sh = R(9,19), sm = pick([5,15,25,35,45,50]), dh = R(0,2), dm = pick([20,35,40,50,55]); const tot = sh*60+sm+dh*60+dm;
    const p = n => String(n).padStart(2,"0");
    return {q:`A musical starts at <b>${p(sh)}:${p(sm)}</b> and lasts <b>${dh} h ${dm} min</b>. What time does it finish? <small>(24-hour, like 15:35)</small>`, a:`${p(Math.floor(tot/60)%24)}:${p(tot%60)}`, exact:true}; }
  if(L===6){ const t = pick([0,1,2]);
    if(t===0){ const m = pick([5,10,15,20,25,40,50]); return {q:`5 miles ≈ 8 km. About how many km is <b>${m} miles</b>?`, a:String(m/5*8)}; }
    if(t===1){ const x = R(125,4750); return {q:`How many litres is <b>${fmt(x)} ml</b>?`, a:String(x/1000)}; }
    const l = R(2,9), w = R(2,8), h = R(2,6); return {q:`What is the volume of a box <b>${l} cm × ${w} cm × ${h} cm</b> (cm³)?`, a:String(l*w*h)}; }
  const t = pick([0,1,2]);
  if(t===0){ const d = pick([60,90,120,150,180]), s = pick([30,40,45,60]); return {q:`A coach travels <b>${d} km</b> at <b>${s} km/h</b>. How many <b>minutes</b> does it take?`, a:String(d/s*60), hint:"Time = distance ÷ speed."}; }
  if(t===1){ const x = R(2,9); return {q:`How many cm² are in <b>${x} m²</b>?`, a:String(x*10000), hint:"1 m² = 100 cm × 100 cm."}; }
  const m = pick([200,250,500]), g = pick([40,60,90]); return {q:`A density puzzle: a ${m} ml jug of syrup weighs ${round(m*1.3,1)} g. What does 1 ml weigh (g)?`, a:"1.3"};
}},

area: { name:"Area, perimeter & volume", make(L){
  const l = R(3,15), w = R(2,12);
  if(L===5) return pick([{q:`A rectangle is <b>${l} cm</b> by <b>${w} cm</b>. What is its <b>area</b> (cm²)?`, a:String(l*w), svg:rectSVG(l,w)},
    {q:`A rectangle is <b>${l} cm</b> by <b>${w} cm</b>. What is its <b>perimeter</b> (cm)?`, a:String(2*(l+w)), svg:rectSVG(l,w)},
    {q:`A square quilt patch has a perimeter of <b>${4*w} cm</b>. How long is one side (cm)?`, a:String(w)}]);
  if(L===6){ const b = R(2,12)*2, h = R(3,12); return pick([{q:`A triangle has base <b>${b} cm</b> and height <b>${h} cm</b>. What is its area (cm²)?`, a:String(b*h/2), hint:"Area = ½ × base × height.", svg:triSVG(b,h)},
    {q:`A parallelogram has base <b>${b} cm</b> and perpendicular height <b>${h} cm</b>. Area (cm²)?`, a:String(b*h)},
    {q:`A cube has edges of <b>${w} cm</b>. What is its volume (cm³)?`, a:String(w**3)}]); }
  const a = R(3,9), b = a+R(2,6), h = R(2,8)*2;
  return pick([{q:`A trapezium has parallel sides <b>${a} cm</b> and <b>${b} cm</b> and height <b>${h} cm</b>. Area (cm²)?`, a:String((a+b)*h/2), hint:"Area = ½ × (a + b) × h"},
    {q:`An L-shape is a <b>${l}×${w}</b> rectangle with a <b>${Math.max(1,Math.floor(l/3))}×${Math.max(1,Math.floor(w/3))}</b> corner cut out. What is its area?`, a:String(l*w-Math.max(1,Math.floor(l/3))*Math.max(1,Math.floor(w/3)))},
    {q:`A cuboid has volume <b>${l*w*a} cm³</b>. Its base is ${l} cm by ${w} cm. How tall is it (cm)?`, a:String(a)}]);
}},

angles: { name:"Angles & shapes", make(L){
  if(L===5){ const x = R(25,155); return pick([{q:`Two angles sit on a straight line. One is <b>${x}°</b>. What is the other?`, a:String(180-x), svg:lineSVG(x)},
    {q:`Angles around a point: <b>${x}°</b>, <b>${R(20,200-x>20?200-x:30)}°</b> and one missing… work out 360 − both. One is ${x}°, the other is 90°. Missing angle?`, a:String(270-x)},
    {q:`How many degrees in <b>${pick([1,2,3])} right angle(s)</b>?`, ...(()=>{return {};})(), a:null}]).a===null ? {q:"How many degrees in 3 right angles?", a:"270"} : pick([{q:`Two angles sit on a straight line. One is <b>${x}°</b>. What is the other?`, a:String(180-x), svg:lineSVG(x)},{q:`Around a point there are angles of <b>${x}°</b> and <b>90°</b> and one more. What is the missing angle?`, a:String(270-x)}]); }
  if(L===6){ const a = R(30,80), b = R(30,80); return pick([{q:`A triangle has angles of <b>${a}°</b> and <b>${b}°</b>. What is the third angle?`, a:String(180-a-b)},
    {q:`An isosceles triangle has a top angle of <b>${2*a-40}°</b>. What is each of the two equal angles?`, a:String((180-(2*a-40))/2)},
    {q:`In a quadrilateral, three angles are 90°, ${a}° and ${b+60}°. What is the fourth?`, a:String(360-90-a-b-60)}]); }
  const n = pick([5,6,8,9,10,12]); return pick([{q:`What do the interior angles of a <b>${n}-sided</b> polygon add up to?`, a:String((n-2)*180), hint:"(n − 2) × 180"},
    {q:`What is each interior angle of a <b>regular ${n}-sided</b> polygon?`, a:String((n-2)*180/n)},
    {q:`What is each exterior angle of a <b>regular ${n}-sided</b> polygon?`, a:String(360/n)}]);
}},

sequences: { name:"Sequences", make(L){
  const s = R(2,15), d = L===5?pick([3,4,6,7,25]):L===6?pick([-3,-4,6,8,0.5]):pick([-6,9,1.5,-0.25]);
  const t = [0,1,2,3,4].map(i => round(s+d*i,2));
  if(L===7 && Math.random()<.4){ const r = pick([2,3]); const g = [1,2,3,4].map(i => s*r**(i-1)); return {q:`What comes next? ${g.join(", ")}, …`, a:String(s*r**4), hint:"Each term is multiplied by the same number."}; }
  if(L===6 && Math.random()<.4) return {q:`Fill the gap: ${t[0]}, ${t[1]}, ?, ${t[3]}, ${t[4]}`, a:String(t[2])};
  return {q:`What comes next? ${t.slice(0,4).join(", ")}, …`, a:String(t[4])};
}},

stats: { name:"Charts & averages", make(L){
  const lab = pick([["Ants","Bees","Moths","Snails"],["Mon","Tue","Wed","Thu"],["Red","Teal","Blue","Purple"]]);
  const v = lab.map(() => R(2,12)*(L===5?1:2));
  if(L===5){ const i = R(0,3), j = (i+R(1,3))%4;
    return pick([{q:`How many more <b>${lab[i]}</b> than <b>${lab[j]}</b>? <small>(could be negative: then use −)</small>`, a:String(v[i]-v[j]), svg:barSVG(lab,v)},
      {q:`What is the total of all four bars?`, a:String(v.reduce((a,b)=>a+b,0)), svg:barSVG(lab,v)}]); }
  const data = [R(2,20),R(2,20),R(2,20),R(2,20),R(2,20)]; const sum = data.reduce((a,b)=>a+b,0);
  if(L===6){ const m = R(4,12); const d = [m-2,m+3,m,m-1,m]; return {q:`Find the <b>mean</b> of: ${d.join(", ")}`, a:String(d.reduce((a,b)=>a+b,0)/5), hint:"Add them up, divide by how many."}; }
  const sorted = [...data].sort((a,b)=>a-b);
  return pick([{q:`Find the <b>median</b> of: ${data.join(", ")}`, a:String(sorted[2]), hint:"Put them in order and find the middle."},
    {q:`Find the <b>range</b> of: ${data.join(", ")}`, a:String(sorted[4]-sorted[0])},
    {q:`The mean of 5 numbers is ${round(sum/5,1)}. What is their total?`, a:String(round(sum,1))}]);
}},

problems: { name:"Word problems", make(L){
  const n = name();
  if(L===5){ const c = R(3,9), k = R(4,12);
    return pick([{q:`${n} buys <b>${k}</b> metres of teal fabric at <b>£${c}</b> per metre. She pays with £100. How much change (£)?`, a:String(100-c*k)},
      {q:`A theatre has <b>${k+20}</b> rows of <b>${c+15}</b> seats. How many seats altogether?`, a:String((k+20)*(c+15))},
      {q:`A ladybird has 6 legs and a spider has 8. In a bug jar there are <b>${c}</b> ladybirds and <b>${k}</b> spiders. How many legs?`, a:String(6*c+8*k)},
      {q:`${n} bakes <b>${k*c}</b> cupcakes and puts them in boxes of <b>${c}</b>. How many boxes?`, a:String(k)}]); }
  if(L===6){ const p = pick([1.25,2.4,3.75,0.85]), q = R(3,8);
    return pick([{q:`Musical tickets cost <b>£${p.toFixed(2)}</b> for children. ${n} buys <b>${q}</b>. What is the total (£)?`, a:String(round(p*q,2))},
      {q:`An axolotl grows from <b>${q*2} cm</b> to <b>${q*3} cm</b>. By what percentage did it grow?`, a:"50"},
      {q:`${n} sews <b>${q}</b> stitches per cm. How many stitches along a <b>${q+12}.5 cm</b> seam?`, a:String(round(q*(q+12.5),2))},
      {q:`A bee visits <b>${q*15}</b> flowers in <b>${q}</b> minutes. At this rate, how many in a quarter of an hour?`, a:String(15*15)}]); }
  const x = R(3,9);
  return pick([{q:`${n} is ${x} years older than her brother. Together their ages add to ${2*x+8+x}. How old is ${n}?`, a:String((2*x+8+x+x)/2), hint:"Let the brother be b. Then b + (b + "+x+") = total."},
    {q:`After a 20% discount, a sewing machine costs <b>£${x*40}</b>. What was the original price (£)?`, a:String(x*50), hint:"£"+(x*40)+" is 80% of the original."},
    {q:`Three friends share a bill in the ratio 2:3:5. The largest share is £${x*10}. What was the total bill (£)?`, a:String(x*20)}]);
}},

numline: { name:"Number line", ui:"numline", make(L){
  if(L===5){ const v = R(1,19)/20*10; return {q:`Drag the axolotl to <b>${round(v,1)}</b>`, a:String(round(v,1)), disp:String(round(v,1)), min:0, max:10, tol:0.25, ticks:10}; }
  if(L===6){ const d = pick([4,5,8,10]), n = R(1,d-1); return {q:`Drag the axolotl to ${F(n,d)}`, a:String(n/d), disp:`${n}/${d}`, min:0, max:1, tol:0.03, ticks:d}; }
  const v = R(-40,40)/4; return {q:`Drag the axolotl to <b>${v}</b>`, a:String(v), disp:String(v), min:-10, max:10, tol:0.3, ticks:20};
}}
};

/* fix two generators that need a cleaner branch */
GENS.factors.make = (function(orig){ return function(L){
  if(L===6){ const t = pick([0,1]);
    if(t===0){ const a = pick([6,8,9,12,15,16,18,20,24]), b = pick([4,10,12,14,21,27,30,36]); return {q:`What is the <b>highest common factor</b> of ${a} and ${b}?`, a:String(gcd(a,b))}; }
    const a = pick([3,4,6,8]), b = pick([5,6,9,10,12]); return {q:`What is the <b>lowest common multiple</b> of ${a} and ${b}?`, a:String(lcm(a,b))}; }
  return orig.call(this,L); }; })(GENS.factors.make);
GENS.angles.make = (function(orig){ return function(L){
  if(L===5){ const x = R(25,155); return pick([{q:`Two angles sit on a straight line. One is <b>${x}°</b>. What is the other?`, a:String(180-x), svg:lineSVG(x)},
    {q:`Around a point there are angles of <b>${x}°</b>, <b>90°</b> and one more. What is the missing angle?`, a:String(270-x), hint:"Angles around a point add up to 360°."},
    {q:`How many degrees are in <b>${pick([2,3,4])}</b> right angles?`, a:null}].map(o => o.a===null ? {q:o.q, a:String(90*+o.q.match(/<b>(\d)/)[1])} : o)); }
  return orig.call(this,L); }; })(GENS.angles.make);
GENS.negatives.make = (function(orig){ return function(L){
  if(L===6){ const a = R(-15,-1), b = R(1,15); return pick([{q:`What is the difference between <b>${a}°C</b> and <b>${b}°C</b>?`, a:String(b-a)},{q:`${a} + ${b} = ?`, a:String(a+b)},{q:`${b} − ${b-a} = ?`, a:String(a)}]); }
  return orig.call(this,L); }; })(GENS.negatives.make);

/* tiny SVG helpers for maths pictures */
function rectSVG(l,w){ const W = Math.min(220, l*16), H = Math.min(140, w*12); return `<svg viewBox="0 0 260 180" class="mpic"><rect x="${130-W/2}" y="${90-H/2}" width="${W}" height="${H}" rx="3" class="shape"/><text x="130" y="${90-H/2-8}" text-anchor="middle">${l} cm</text><text x="${130+W/2+8}" y="94">${w} cm</text></svg>`; }
function triSVG(b,h){ return `<svg viewBox="0 0 260 170" class="mpic"><polygon points="40,140 220,140 150,30" class="shape"/><line x1="150" y1="30" x2="150" y2="140" class="dash"/><text x="130" y="162" text-anchor="middle">${b} cm</text><text x="156" y="92">${h} cm</text></svg>`; }
function lineSVG(x){ const r = x*Math.PI/180; const ex = 130+90*Math.cos(Math.PI-r), ey = 130-90*Math.sin(Math.PI-r);
  return `<svg viewBox="0 0 260 150" class="mpic"><line x1="20" y1="130" x2="240" y2="130" class="ln"/><line x1="130" y1="130" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" class="ln"/><text x="${130-34}" y="122" text-anchor="end">${x}°</text><text x="170" y="122">?</text></svg>`; }
function barSVG(lab,v){ const mx = Math.max(...v), bw = 44; const cols = ["#14b8a6","#3b82f6","#8b5cf6","#06b6d4"];
  const bars = v.map((y,i) => { const h = y/mx*110, x = 40+i*55; return `<rect x="${x}" y="${130-h}" width="${bw}" height="${h}" rx="4" fill="${cols[i]}"/><text x="${x+bw/2}" y="146" text-anchor="middle">${lab[i]}</text>`; }).join("");
  const step = mx > 12 ? 4 : 2, grid = []; for(let g=0; g<=mx; g+=step){ const y = 130-g/mx*110; grid.push(`<line x1="30" x2="255" y1="${y}" y2="${y}" class="grid"/><text x="26" y="${y+4}" text-anchor="end" class="small">${g}</text>`); }
  return `<svg viewBox="0 0 260 155" class="mpic">${grid.join("")}${bars}</svg>`; }
})();

/* Maths sets: each generator × level */
(function(){
  const order = ["mental","place","negatives","factors","fractions","fdp","numline","bodmas","algebra","ratio","measures","area","angles","sequences","stats","problems"];
  const titles = {5:"Reef", 6:"Deep Dive", 7:"Abyss Challenge"};
  order.forEach(g => [5,6,7].forEach(L => {
    if(L===5 && g==="bodmas") return;
    SETS.push({ id:`ma-${g}-${L}`, subject:"maths", topic:GENS[g].name, title:`${GENS[g].name}: ${titles[L]}`, level:L, type:"gen", gen:g, count:8 });
  }));
})();

SETS.push(
{ id:"ma-prime-sort", subject:"maths", topic:"Factors, primes, squares", title:"Prime or Not?", level:5, type:"sort",
  prompt:"Is each number prime?", bins:["Prime","Not prime"],
  items:[{t:"2",b:0},{t:"13",b:0},{t:"29",b:0},{t:"41",b:0},{t:"1",b:1},{t:"21",b:1},{t:"27",b:1},{t:"51",b:1},{t:"37",b:0},{t:"91",b:1}]},
{ id:"ma-fdp-match", subject:"maths", topic:"Decimals & percentages", title:"Fraction Twins", level:6, type:"match",
  prompt:"Match each fraction to its equal decimal or percentage.",
  pairs:[["1/4","0.25"],["3/5","60%"],["1/8","0.125"],["7/10","70%"],["3/20","0.15"],["2/3","66.7% (approx)"]]},
{ id:"ma-shapes-quiz", subject:"maths", topic:"Angles & shapes", title:"Shape Shifters", level:5, type:"quiz",
  items:[
    {q:"How many faces does a <b>triangular prism</b> have?", opts:["5","6","4","9"], a:"5"},
    {q:"An angle of <b>130°</b> is…", opts:["obtuse","acute","reflex","a right angle"], a:"obtuse"},
    {q:"An angle of <b>250°</b> is…", opts:["reflex","obtuse","acute","straight"], a:"reflex"},
    {q:"Which shape has exactly <b>one pair</b> of parallel sides?", opts:["trapezium","rhombus","rectangle","square"], a:"trapezium"},
    {q:"How many edges does a <b>cube</b> have?", opts:["12","6","8","10"], a:"12"},
    {q:"A <b>regular</b> polygon has…", opts:["all sides and angles equal","four sides","curved sides","one right angle"], a:"all sides and angles equal"},
    {q:"Which 3D shape has <b>1 face, 0 vertices</b> and is perfectly round?", opts:["sphere","cone","cylinder","cube"], a:"sphere"},
    {q:"How many lines of symmetry does a <b>regular hexagon</b> have?", opts:["6","3","2","12"], a:"6"}
  ]},
{ id:"ma-shapes-7", subject:"maths", topic:"Angles & shapes", title:"Geometry Gems", level:7, type:"quiz",
  items:[
    {q:"<b>Alternate</b> angles on parallel lines are…", opts:["equal","add to 180°","add to 90°","double each other"], a:"equal", why:"Look for the Z shape."},
    {q:"<b>Co-interior</b> angles on parallel lines…", opts:["add to 180°","are equal","add to 360°","add to 90°"], a:"add to 180°", why:"Look for the C or U shape."},
    {q:"The radius of a circle is 7 cm. The diameter is…", opts:["14 cm","3.5 cm","21 cm","49 cm"], a:"14 cm"},
    {q:"Using π ≈ 3.14, the circumference of a circle with diameter 10 cm is about…", opts:["31.4 cm","314 cm","3.14 cm","62.8 cm"], a:"31.4 cm"},
    {q:"Point (3, 2) is reflected in the y-axis. Where does it go?", opts:["(−3, 2)","(3, −2)","(2, 3)","(−3, −2)"], a:"(−3, 2)"},
    {q:"Point (1, 4) is translated 3 right and 2 down. Where does it go?", opts:["(4, 2)","(−2, 6)","(4, 6)","(3, 2)"], a:"(4, 2)"},
    {q:"How many faces, edges and vertices does a square-based pyramid have?", opts:["5 faces, 8 edges, 5 vertices","4 faces, 6 edges, 4 vertices","5 faces, 5 edges, 8 vertices","6 faces, 12 edges, 8 vertices"], a:"5 faces, 8 edges, 5 vertices"},
    {q:"Vertically opposite angles are…", opts:["equal","add to 90°","always 180°","always acute"], a:"equal"}
  ]},
{ id:"ma-roman", subject:"maths", topic:"Place value & rounding", title:"Roman Numerals", level:5, type:"match",
  prompt:"Match the Roman numerals to the numbers.",
  pairs:[["XIV","14"],["XL","40"],["XC","90"],["CD","400"],["MMXXVI","2026"],["LXXIX","79"]]}
);
