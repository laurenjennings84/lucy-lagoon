/* Lucy's 11+ Lagoon — History (Time Travel), Geography (Explorer), Stage Door (arts, music, computing, D&T, French) */
window.SETS = window.SETS || [];
(function(){
const R = (a,b) => a + Math.floor(Math.random()*(b-a+1));
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
const shuffle = a => { a = [...a]; for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };
const DIRS = ["N","NE","E","SE","S","SW","W","NW"];
const DNAME = {N:"north",NE:"north-east",E:"east",SE:"south-east",S:"south",SW:"south-west",W:"west",NW:"north-west"};

Object.assign(window.GENS, {
compass: { name:"Compass directions", make(L){
  const s = R(0,7), steps = L===5 ? pick([2,4,6]) : pick([1,2,3,5,6,7]), cw = Math.random()<.5;
  const end = DIRS[(s + (cw?steps:-steps) + 16) % 8], deg = steps*45;
  const opts = shuffle([DNAME[end], ...shuffle(DIRS.filter(d => d!==end)).slice(0,3).map(d => DNAME[d])]);
  const turn = L===5 ? (deg===90?"a quarter turn":deg===180?"a half turn":"three-quarter turn") : `${deg}°`;
  return {q:`You are facing <b>${DNAME[DIRS[s]]}</b>. You turn <b>${turn}</b> ${cw?"clockwise":"anticlockwise"}. Which way are you facing now?`, a:DNAME[end], opts, svg:compassSVG()};
}},
grid: { name:"Grid references", ui:"grid", make(L){
  const icons = shuffle(["🐝","🦋","🐞","🏰","⛪","🌳","🐸","🦉","⛺","🏠","🌉","🐌"]).slice(0,6);
  const cells = shuffle([...Array(25).keys()]).slice(0,6);
  const place = {}; cells.forEach((c,i) => place[c] = icons[i]);
  const k = R(0,5), c = cells[k], col = c%5, row = Math.floor(c/5); // row 0 = bottom
  if(L<=6){ const ref = "ABCDE"[col] + (row+1);
    return Math.random()<.5 ? {q:`Tap the square at <b>${ref}</b>.`, a:ref, grid:place, mode:"letters", tap:true}
                            : {q:`Which square is the ${icons[k]} in? Tap it.`, a:ref, grid:place, mode:"letters", tap:true}; }
  const ref = `0${col+1}0${row+1}`;
  return {q:`Tap the square with the 4-figure grid reference <b>${ref}</b>. <small>(along the corridor, then up the stairs)</small>`, a:ref, grid:place, mode:"numbers", tap:true};
}}
});
function compassSVG(){ const pts = DIRS.map((d,i) => { const a = i*45*Math.PI/180, r = d.length===1?62:58; return `<text x="${(80+r*Math.sin(a)).toFixed(1)}" y="${(84-r*Math.cos(a)).toFixed(1)}" text-anchor="middle" class="${d.length===1?"big":"small"}">${d}</text>`; }).join("");
  return `<svg viewBox="0 0 160 165" class="mpic"><circle cx="80" cy="80" r="44" class="shape"/><polygon points="80,40 88,80 80,120 72,80" class="needle"/>${pts}</svg>`; }

SETS.push(
/* ---------------- HISTORY ---------------- */
{ id:"hi-timeline-1", subject:"history", topic:"Timelines", title:"Time Machine: Big Eras", level:5, type:"order",
  prompt:"Put these periods of British history in order, oldest first.",
  steps:["Stone Age","Bronze Age","Iron Age","Roman Britain","Anglo-Saxons & Vikings","Normans (1066)","Tudors","Victorians","World War II"]},
{ id:"hi-timeline-2", subject:"history", topic:"Timelines", title:"Ancient World Timeline", level:6, type:"order",
  prompt:"Order these ancient events, oldest first.",
  steps:["Stonehenge's great stones raised (about 2500 BC)","Tutankhamun becomes pharaoh (about 1332 BC)","First Olympic Games in Greece (776 BC)","Romans invade Britain (AD 43)","Vikings raid Lindisfarne (AD 793)","Battle of Hastings (1066)"]},
{ id:"hi-stoneage", subject:"history", topic:"Stone Age to Iron Age", title:"Rocks to Hillforts", level:5, type:"quiz",
  items:[
    {q:"What was Skara Brae?", opts:["a Stone Age village in Orkney","a Roman fort","a Viking ship","a Tudor palace"], a:"a Stone Age village in Orkney"},
    {q:"Bronze is made by mixing copper with…", opts:["tin","iron","gold","clay"], a:"tin"},
    {q:"What were <b>hillforts</b>?", opts:["Iron Age settlements protected by banks and ditches","Roman bath houses","Norman castles made of stone","Stone Age caves"], a:"Iron Age settlements protected by banks and ditches"},
    {q:"In the New Stone Age (Neolithic), people began to…", opts:["farm and settle in one place","use iron swords","build castles","write books"], a:"farm and settle in one place"},
    {q:"Which British monument is a famous stone circle?", opts:["Stonehenge","Hadrian's Wall","the Tower of London","Offa's Dyke"], a:"Stonehenge"},
    {q:"Which queen of the Iceni led a rebellion against the Romans?", opts:["Boudicca","Victoria","Elizabeth I","Cleopatra"], a:"Boudicca"}
  ]},
{ id:"hi-romans", subject:"history", topic:"Romans", title:"Roman Road Trip", level:5, type:"quiz",
  items:[
    {q:"In which year did the Romans successfully invade Britain under Emperor Claudius?", opts:["AD 43","1066","55 BC","AD 410"], a:"AD 43"},
    {q:"Why was Hadrian's Wall built?", opts:["to mark and guard the northern frontier","to keep out the sea","to make a road","to protect London"], a:"to mark and guard the northern frontier"},
    {q:"What was the Roman name for Manchester's fort?", opts:["Mamucium","Londinium","Eboracum","Deva"], a:"Mamucium", why:"You can still see the reconstructed fort walls at Castlefield."},
    {q:"Which of these did the Romans bring to Britain?", opts:["straight roads and public baths","potatoes","printing presses","tea"], a:"straight roads and public baths"},
    {q:"The Roman army's soldiers were called…", opts:["legionaries","knights","samurai","huscarls"], a:"legionaries"},
    {q:"Roman numerals use letters. What is <b>C</b>?", opts:["100","50","500","1000"], a:"100"},
    {q:"In about AD 410, the Romans…", opts:["left Britain","arrived in Britain","built Stonehenge","met the Normans"], a:"left Britain"}
  ]},
{ id:"hi-egypt", subject:"history", topic:"Ancient civilisations", title:"Secrets of the Nile", level:5, type:"quiz",
  items:[
    {q:"Why was the River Nile so important to Ancient Egypt?", opts:["its floods left rich soil for farming","it was full of gold","it was frozen","it kept out the Romans"], a:"its floods left rich soil for farming"},
    {q:"Who discovered Tutankhamun's tomb in 1922?", opts:["Howard Carter","Charles Darwin","Henry VIII","Julius Caesar"], a:"Howard Carter"},
    {q:"What were <b>hieroglyphs</b>?", opts:["picture writing","pyramids","gods","boats"], a:"picture writing"},
    {q:"Which stone helped experts finally read hieroglyphs?", opts:["the Rosetta Stone","the Blarney Stone","Stonehenge","the Stone of Destiny"], a:"the Rosetta Stone"},
    {q:"Why did Egyptians mummify bodies?", opts:["to preserve them for the afterlife","to scare robbers","to make medicine","to keep warm"], a:"to preserve them for the afterlife"},
    {q:"The Great Pyramid is at…", opts:["Giza","Rome","Athens","Babylon"], a:"Giza"}
  ]},
{ id:"hi-greeks", subject:"history", topic:"Ancient civilisations", title:"Gods, Games & Theatre", level:6, type:"quiz",
  items:[
    {q:"Which city is known as the birthplace of <b>democracy</b>?", opts:["Athens","Sparta","Rome","Troy"], a:"Athens"},
    {q:"Ancient Greek theatres were usually…", opts:["open-air, shaped like a semicircle","underground","made of glass","on boats"], a:"open-air, shaped like a semicircle"},
    {q:"Greek actors wore ___ to show characters and emotions.", opts:["masks","crowns","wigs only","armour"], a:"masks"},
    {q:"The <b>chorus</b> in Greek theatre was…", opts:["a group who sang, danced and commented on the story","the main villain","the audience","the orchestra pit"], a:"a group who sang, danced and commented on the story", why:"Musicals still have choruses and ensembles today!"},
    {q:"Who was king of the Greek gods?", opts:["Zeus","Poseidon","Hades","Apollo"], a:"Zeus"},
    {q:"The legend of the wooden horse is from the war against which city?", opts:["Troy","Athens","Sparta","Rome"], a:"Troy"},
    {q:"Mamma Mia is set on a Greek island. Greece is in which sea area?", opts:["the Mediterranean","the Caribbean","the North Sea","the Baltic"], a:"the Mediterranean"}
  ]},
{ id:"hi-saxons-vikings", subject:"history", topic:"Anglo-Saxons & Vikings", title:"Longships & Kingdoms", level:6, type:"quiz",
  items:[
    {q:"Where did the Vikings come from?", opts:["Scandinavia (Norway, Denmark, Sweden)","Italy","Egypt","France"], a:"Scandinavia (Norway, Denmark, Sweden)"},
    {q:"Which Anglo-Saxon king fought the Vikings and is called 'the Great'?", opts:["Alfred","Harold","William","Arthur"], a:"Alfred"},
    {q:"The area of England under Viking law was called…", opts:["the Danelaw","Wessex","Mercia","Normandy"], a:"the Danelaw"},
    {q:"The Sutton Hoo treasure was found in…", opts:["an Anglo-Saxon ship burial","a Roman villa","an Egyptian tomb","a Viking longship in Norway"], a:"an Anglo-Saxon ship burial"},
    {q:"Viking York was called…", opts:["Jorvik","Londinium","Mamucium","Valhalla"], a:"Jorvik"},
    {q:"Which day of the week is named after the Norse god Thor?", opts:["Thursday","Tuesday","Wednesday","Friday"], a:"Thursday"},
    {q:"In 1066, who won the Battle of Hastings?", opts:["William of Normandy","Harold Godwinson","Alfred the Great","Harald Hardrada"], a:"William of Normandy"}
  ]},
{ id:"hi-maya", subject:"history", topic:"Ancient civilisations", title:"Mighty Maya", level:6, type:"quiz",
  items:[
    {q:"Where did the ancient Maya civilisation live?", opts:["Central America (Mexico, Guatemala, Belize)","Africa","India","Scandinavia"], a:"Central America (Mexico, Guatemala, Belize)"},
    {q:"Which food did the Maya treat as so precious that its beans were used like money?", opts:["cacao (chocolate)","potatoes","rice","wheat"], a:"cacao (chocolate)"},
    {q:"Maya cities had giant…", opts:["step pyramids","castles","windmills","lighthouses"], a:"step pyramids"},
    {q:"The Maya number system was based on…", opts:["20","10","12","60"], a:"20"},
    {q:"Axolotls also come from Mexico. Their name comes from Nahuatl, the language of the…", opts:["Aztecs","Vikings","Romans","Egyptians"], a:"Aztecs"}
  ]},
{ id:"hi-manchester", subject:"history", topic:"Local history", title:"Cottonopolis Manchester", level:6, type:"quiz",
  items:[
    {q:"Why was Manchester nicknamed <b>Cottonopolis</b>?", opts:["it had many cotton mills","it grew cotton in fields","it made cotton candy","it was soft"], a:"it had many cotton mills"},
    {q:"Manchester's damp climate helped because…", opts:["cotton thread snapped less in damp air","it kept workers cool","it watered the cotton","it powered the mills"], a:"cotton thread snapped less in damp air"},
    {q:"Which Manchester-born woman led the Suffragettes in their fight for women's votes?", opts:["Emmeline Pankhurst","Florence Nightingale","Queen Victoria","Grace Darling"], a:"Emmeline Pankhurst"},
    {q:"The Manchester Ship Canal (opened 1894) linked Manchester to…", opts:["the sea at the Mersey estuary","London","Leeds","Scotland"], a:"the sea at the Mersey estuary"},
    {q:"The Peterloo Massacre (1819) happened at a meeting about…", opts:["giving ordinary people the vote","building a railway","a football match","the price of cotton"], a:"giving ordinary people the vote"},
    {q:"Which artist painted Salford and Manchester streets full of thin 'matchstick' people?", opts:["L. S. Lowry","Vincent van Gogh","Claude Monet","Pablo Picasso"], a:"L. S. Lowry"},
    {q:"The world's first passenger railway between two cities (1830) ran from Manchester to…", opts:["Liverpool","London","Birmingham","York"], a:"Liverpool"}
  ]},
{ id:"hi-tudors-victorians", subject:"history", topic:"Tudors & Victorians", title:"Crowns & Corsets", level:6, type:"quiz",
  items:[
    {q:"How many wives did Henry VIII have?", opts:["6","4","8","2"], a:"6"},
    {q:"Which Tudor queen reigned when the Spanish Armada was defeated (1588)?", opts:["Elizabeth I","Mary I","Victoria","Anne"], a:"Elizabeth I"},
    {q:"Which playwright wrote for the Globe Theatre in Elizabethan times?", opts:["William Shakespeare","Charles Dickens","Roald Dahl","J. K. Rowling"], a:"William Shakespeare"},
    {q:"Queen Victoria reigned from 1837 to…", opts:["1901","1945","1800","1066"], a:"1901"},
    {q:"In Victorian times, many poor children worked in…", opts:["mills, mines and chimneys","offices with computers","airports","supermarkets"], a:"mills, mines and chimneys"},
    {q:"Which invention made sewing much faster in the 1800s?", opts:["the sewing machine","the zip-wire","the telephone","the bicycle"], a:"the sewing machine"}
  ]},
{ id:"hi-normans-7", subject:"history", topic:"Medieval Britain (KS3)", title:"Castles & Charters", level:7, type:"quiz",
  items:[
    {q:"What was the <b>Domesday Book</b> (1086)?", opts:["a survey of land and property in England","a book of spells","a Viking saga","a Tudor diary"], a:"a survey of land and property in England"},
    {q:"Which kind of castle did the Normans build first?", opts:["motte and bailey","concentric stone","Victorian folly","Iron Age hillfort"], a:"motte and bailey"},
    {q:"The <b>feudal system</b> was a…", opts:["system of land and loyalty from king to peasants","type of farming tool","Viking ship","church service"], a:"system of land and loyalty from king to peasants"},
    {q:"Magna Carta (1215) was important because it…", opts:["limited the king's power","started the Olympics","ended the Romans","invented money"], a:"limited the king's power"},
    {q:"The Black Death (1348) was spread mainly by…", opts:["fleas on rats","bad food","cold weather","Vikings"], a:"fleas on rats"},
    {q:"Which king signed Magna Carta?", opts:["King John","William I","Henry VIII","Alfred"], a:"King John"},
    {q:"A <b>primary source</b> is…", opts:["something made at the time being studied","a modern textbook","a film made today","a guess"], a:"something made at the time being studied"}
  ]},
{ id:"hi-ww2", subject:"history", topic:"World War II", title:"Home Front", level:6, type:"quiz",
  items:[
    {q:"Why were children <b>evacuated</b> from cities in WW2?", opts:["to keep them safe from bombing","to go on holiday","to work on farms only","to join the army"], a:"to keep them safe from bombing"},
    {q:"What was <b>rationing</b>?", opts:["limiting how much food and goods each person could buy","a type of bomb","a dance","a code"], a:"limiting how much food and goods each person could buy"},
    {q:"'Make do and mend' encouraged people to…", opts:["repair and reuse clothes","buy new things","throw things away","make weapons"], a:"repair and reuse clothes"},
    {q:"Who was Britain's Prime Minister for most of WW2?", opts:["Winston Churchill","Queen Victoria","Margaret Thatcher","Henry VIII"], a:"Winston Churchill"},
    {q:"Which Bletchley Park codebreaker helped crack the Enigma code?", opts:["Alan Turing","Isaac Newton","Charles Darwin","Tim Berners-Lee"], a:"Alan Turing", why:"Turing later worked at the University of Manchester on early computers."},
    {q:"WW2 ended in Europe in…", opts:["1945","1918","1939","1966"], a:"1945"}
  ]},

/* ---------------- GEOGRAPHY ---------------- */
{ id:"ge-continents", subject:"geography", topic:"World", title:"Continent Match", level:5, type:"match",
  prompt:"Match each country to its continent.",
  pairs:[["Mexico","North America"],["Brazil","South America"],["Kenya","Africa"],["Japan","Asia"],["Greece","Europe"],["Australia","Oceania"]]},
{ id:"ge-oceans", subject:"geography", topic:"World", title:"Oceans & Seas", level:5, type:"quiz",
  items:[
    {q:"Which is the largest ocean?", opts:["Pacific","Atlantic","Indian","Arctic"], a:"Pacific"},
    {q:"How many continents are there?", opts:["7","5","6","9"], a:"7"},
    {q:"Which imaginary line runs around the middle of the Earth?", opts:["the Equator","the Prime Meridian","the Tropic of Cancer","the Arctic Circle"], a:"the Equator"},
    {q:"The <b>Prime Meridian</b> (0° longitude) passes through…", opts:["Greenwich, London","Manchester","Paris","New York"], a:"Greenwich, London"},
    {q:"Which ocean lies between the UK and North America?", opts:["Atlantic","Pacific","Indian","Southern"], a:"Atlantic"},
    {q:"Which is the longest river in the world (by most measurements)?", opts:["the Nile","the Thames","the Mersey","the Danube"], a:"the Nile"},
    {q:"Which continent is the coldest and is mostly covered by ice?", opts:["Antarctica","Europe","Asia","North America"], a:"Antarctica"},
    {q:"Mount Everest is in which mountain range?", opts:["the Himalayas","the Alps","the Andes","the Pennines"], a:"the Himalayas"}
  ]},
{ id:"ge-uk", subject:"geography", topic:"United Kingdom", title:"Around the UK", level:5, type:"match",
  prompt:"Match each UK country to its capital city.",
  pairs:[["England","London"],["Scotland","Edinburgh"],["Wales","Cardiff"],["Northern Ireland","Belfast"]]},
{ id:"ge-uk-quiz", subject:"geography", topic:"United Kingdom", title:"UK Explorer", level:6, type:"quiz",
  items:[
    {q:"What is the highest mountain in the UK?", opts:["Ben Nevis","Snowdon (Yr Wyddfa)","Scafell Pike","Kinder Scout"], a:"Ben Nevis"},
    {q:"What is the longest river in the UK?", opts:["the River Severn","the River Thames","the River Mersey","the River Irwell"], a:"the River Severn"},
    {q:"Urmston is in which metropolitan county?", opts:["Greater Manchester","Merseyside","Lancashire","Cheshire"], a:"Greater Manchester"},
    {q:"Which river flows through Urmston and Flixton on its way to Liverpool?", opts:["the River Mersey","the River Thames","the River Tyne","the River Severn"], a:"the River Mersey"},
    {q:"The hills that run down the middle of northern England like a backbone are the…", opts:["Pennines","Cairngorms","Chilterns","Cotswolds"], a:"Pennines"},
    {q:"Which national park is closest to Manchester?", opts:["the Peak District","Dartmoor","the New Forest","Snowdonia (Eryri)"], a:"the Peak District"},
    {q:"Which sea is to the <b>west</b> of England, between Britain and Ireland?", opts:["the Irish Sea","the North Sea","the English Channel","the Baltic Sea"], a:"the Irish Sea"}
  ]},
{ id:"ge-rivers-label", subject:"geography", topic:"Rivers & mountains", title:"River Journey", level:5, type:"order",
  prompt:"Order the journey of a river from start to finish.",
  steps:["Source (in the hills)","Upper course: waterfalls and V-shaped valleys","Middle course: meanders","Lower course: wide floodplain","Mouth / estuary at the sea"]},
{ id:"ge-rivers-match", subject:"geography", topic:"Rivers & mountains", title:"River Words", level:6, type:"match",
  prompt:"Match each river word to its meaning.",
  pairs:[["source","where a river starts"],["mouth","where it meets the sea"],["tributary","a smaller river joining a bigger one"],["meander","a big bend"],["confluence","where two rivers join"],["erosion","wearing away rock and soil"]]},
{ id:"ge-biomes-sort", subject:"geography", topic:"Biomes & climate", title:"Where Do I Live?", level:5, type:"sort",
  prompt:"Sort each animal into the biome it is adapted to.",
  bins:["Rainforest","Desert","Polar","Ocean"],
  items:[{t:"jaguar",b:0},{t:"poison dart frog",b:0},{t:"camel",b:1},{t:"fennec fox",b:1},{t:"penguin",b:2},{t:"arctic fox",b:2},{t:"blue whale",b:3},{t:"sea turtle",b:3}]},
{ id:"ge-climate", subject:"geography", topic:"Biomes & climate", title:"Weather Wise", level:6, type:"quiz",
  items:[
    {q:"What is the difference between <b>weather</b> and <b>climate</b>?", opts:["weather is day to day; climate is the average over many years","they mean the same","climate is only rain","weather is only in summer"], a:"weather is day to day; climate is the average over many years"},
    {q:"Tropical rainforests are found near the…", opts:["Equator","North Pole","South Pole","Arctic Circle"], a:"Equator"},
    {q:"Rain that forms when air rises over hills is called…", opts:["relief rainfall","acid rain","drizzle","hail"], a:"relief rainfall", why:"It's one reason the North West of England gets lots of rain!"},
    {q:"The layers of a rainforest from top to bottom are…", opts:["emergent, canopy, understorey, forest floor","roots, trunk, leaves, sky","floor, canopy, emergent, understorey","sky, cloud, tree, grass"], a:"emergent, canopy, understorey, forest floor"},
    {q:"Which gas is the main cause of the greenhouse effect getting stronger?", opts:["carbon dioxide","oxygen","helium","nitrogen"], a:"carbon dioxide"},
    {q:"Deserts are defined by having very little…", opts:["rainfall","sand","heat","sunshine"], a:"rainfall"}
  ]},
{ id:"ge-volcano", subject:"geography", topic:"Physical geography (KS3)", title:"Shaky Ground", level:7, type:"quiz",
  items:[
    {q:"The Earth's outer layer is broken into giant pieces called…", opts:["tectonic plates","continents","mantles","crusts of bread"], a:"tectonic plates"},
    {q:"Most earthquakes happen…", opts:["along plate boundaries","in the middle of oceans only","near the North Pole","randomly anywhere equally"], a:"along plate boundaries"},
    {q:"Molten rock under the ground is called ___; when it comes out it is called ___.", opts:["magma; lava","lava; magma","mantle; crust","ash; dust"], a:"magma; lava"},
    {q:"The 'Ring of Fire' surrounds which ocean?", opts:["Pacific","Atlantic","Indian","Arctic"], a:"Pacific"},
    {q:"What scale measures the strength of earthquakes?", opts:["the Richter (or moment magnitude) scale","the Celsius scale","the Beaufort scale","the decibel scale"], a:"the Richter (or moment magnitude) scale"},
    {q:"Order the Earth's layers from the outside in.", opts:["crust, mantle, outer core, inner core","core, mantle, crust, sky","mantle, crust, core","inner core, crust, mantle"], a:"crust, mantle, outer core, inner core"},
    {q:"A <b>tsunami</b> is…", opts:["a huge sea wave often caused by an undersea earthquake","a tropical storm","a type of volcano","a river flood"], a:"a huge sea wave often caused by an undersea earthquake"}
  ]},
{ id:"ge-mapsymbols", subject:"geography", topic:"Map skills", title:"Map Symbol Match", level:6, type:"match",
  prompt:"Match the Ordnance Survey map feature to its symbol idea.",
  pairs:[["church with a tower","black square with a cross"],["campsite","small tent"],["viewpoint","blue fan of lines (a 'sunburst')"],["contour lines","brown lines showing height"],["public footpath","red dashed line"],["deciduous woodland","green with tree symbols"]]},
{ id:"ge-compass-5", subject:"geography", topic:"Map skills", title:"Compass Spin", level:5, type:"gen", gen:"compass", count:8},
{ id:"ge-compass-6", subject:"geography", topic:"Map skills", title:"Compass Spin: Degrees", level:6, type:"gen", gen:"compass", count:8},
{ id:"ge-grid-5", subject:"geography", topic:"Map skills", title:"Treasure Grid", level:5, type:"gen", gen:"grid", count:8},
{ id:"ge-grid-7", subject:"geography", topic:"Map skills", title:"4-Figure Grid References", level:7, type:"gen", gen:"grid", count:8},
{ id:"ge-mexico", subject:"geography", topic:"World", title:"Mexico Mission", level:6, type:"quiz",
  items:[
    {q:"What is the capital city of Mexico?", opts:["Mexico City","Cancún","Madrid","Lima"], a:"Mexico City"},
    {q:"What is the main language spoken in Mexico?", opts:["Spanish","Portuguese","English","French"], a:"Spanish"},
    {q:"Mexico City was built on the site of the Aztec city of…", opts:["Tenochtitlan","Rome","Machu Picchu","Cusco"], a:"Tenochtitlan"},
    {q:"Mexico shares a long border with which country to the north?", opts:["the USA","Canada","Brazil","Peru"], a:"the USA"},
    {q:"Which two oceans/seas does Mexico have coastlines on?", opts:["the Pacific and the Gulf of Mexico/Caribbean","the Atlantic and Arctic","the Indian and Pacific","the North Sea and Baltic"], a:"the Pacific and the Gulf of Mexico/Caribbean"},
    {q:"Mexico is famous for monarch butterflies that migrate there from…", opts:["Canada and the USA","Australia","Africa","Japan"], a:"Canada and the USA"}
  ]},

/* ---------------- STAGE DOOR: music, art, D&T, computing, French ---------------- */
{ id:"ar-notes-match", subject:"arts", topic:"Music", title:"Note Values", level:5, type:"match",
  prompt:"Match each note to how many beats it lasts (in 4/4 time).",
  pairs:[["semibreve","4 beats"],["minim","2 beats"],["crotchet","1 beat"],["quaver","½ beat"],["dotted minim","3 beats"]]},
{ id:"ar-music", subject:"arts", topic:"Music", title:"Showtime Music Theory", level:5, type:"quiz",
  items:[
    {q:"In music, <b>forte</b> (<i>f</i>) means…", opts:["loud","soft","fast","slow"], a:"loud"},
    {q:"<b>Piano</b> (<i>p</i>) as a musical instruction means…", opts:["soft/quiet","loud","play the piano","stop"], a:"soft/quiet"},
    {q:"A <b>crescendo</b> means…", opts:["gradually getting louder","gradually getting quieter","getting faster","a sudden stop"], a:"gradually getting louder"},
    {q:"<b>Tempo</b> means…", opts:["the speed of the music","how loud it is","how high it is","the words"], a:"the speed of the music"},
    {q:"<b>Allegro</b> means…", opts:["fast and lively","slow","very quiet","sad"], a:"fast and lively"},
    {q:"<b>Pitch</b> means…", opts:["how high or low a note is","how loud it is","how long it lasts","the speed"], a:"how high or low a note is"},
    {q:"Which is the highest female singing voice?", opts:["soprano","alto","tenor","bass"], a:"soprano"},
    {q:"Mamma Mia is a 'jukebox musical'. That means…", opts:["it uses existing pop songs (by ABBA)","it is set in a café","it has no songs","it is performed by robots"], a:"it uses existing pop songs (by ABBA)"},
    {q:"In Little Shop of Horrors, what kind of shop does Seymour work in?", opts:["a flower shop","a sweet shop","a bakery","a toy shop"], a:"a flower shop"},
    {q:"Into the Woods mixes characters from…", opts:["several fairy tales","Greek myths","Shakespeare plays","Roman history"], a:"several fairy tales"}
  ]},
{ id:"ar-instruments-sort", subject:"arts", topic:"Music", title:"Orchestra Seating Plan", level:5, type:"sort",
  prompt:"Which family does each instrument belong to?",
  bins:["Strings","Woodwind","Brass","Percussion"],
  items:[{t:"violin",b:0},{t:"cello",b:0},{t:"harp",b:0},{t:"flute",b:1},{t:"clarinet",b:1},{t:"oboe",b:1},{t:"trumpet",b:2},{t:"French horn",b:2},{t:"trombone",b:2},{t:"timpani",b:3},{t:"xylophone",b:3},{t:"triangle",b:3}]},
{ id:"ar-voices-order", subject:"arts", topic:"Music", title:"Voice Ladder", level:6, type:"order",
  prompt:"Order the singing voices from highest to lowest.",
  steps:["Soprano","Alto","Tenor","Bass"]},
{ id:"ar-music-7", subject:"arts", topic:"Music", title:"Music Theory Stretch", level:7, type:"quiz",
  items:[
    {q:"How many lines are on a musical stave?", opts:["5","4","6","8"], a:"5"},
    {q:"The treble clef is also called the…", opts:["G clef","F clef","C clef","bass clef"], a:"G clef"},
    {q:"A sharp sign (♯)…", opts:["raises a note by a semitone","lowers a note by a semitone","makes it louder","makes it longer"], a:"raises a note by a semitone"},
    {q:"An <b>octave</b> is…", opts:["8 notes from one note to the next of the same name","8 beats","8 instruments","a type of drum"], a:"8 notes from one note to the next of the same name"},
    {q:"<b>Staccato</b> means notes should be…", opts:["short and detached","smooth and joined","very loud","held for a long time"], a:"short and detached"},
    {q:"<b>Legato</b> means…", opts:["smooth and connected","short and spiky","fast","silent"], a:"smooth and connected"},
    {q:"A musical's songs and words for singing are together called the…", opts:["score (with lyrics)","script only","programme","ballet"], a:"score (with lyrics)"},
    {q:"4/4 time means…", opts:["4 crotchet beats in every bar","4 bars in the song","4 singers","play for 4 minutes"], a:"4 crotchet beats in every bar"}
  ]},
{ id:"ar-art", subject:"arts", topic:"Art", title:"Palette Power", level:5, type:"quiz",
  items:[
    {q:"What are the three <b>primary colours</b> in painting?", opts:["red, yellow, blue","red, green, blue","purple, orange, green","black, white, grey"], a:"red, yellow, blue"},
    {q:"Blue + yellow = ?", opts:["green","purple","orange","brown"], a:"green"},
    {q:"Red + blue = ?", opts:["purple","green","orange","pink"], a:"purple"},
    {q:"Which colours are <b>cool</b> colours?", opts:["blue, teal, purple","red, orange, yellow","black and white","gold and silver"], a:"blue, teal, purple"},
    {q:"Adding white to a colour makes a…", opts:["tint","shade","tone","primary"], a:"tint"},
    {q:"Adding black to a colour makes a…", opts:["shade","tint","complementary","warm colour"], a:"shade"},
    {q:"Who painted <i>The Starry Night</i> with swirling blue skies?", opts:["Vincent van Gogh","L. S. Lowry","Frida Kahlo","Andy Warhol"], a:"Vincent van Gogh"},
    {q:"Which artist painted many pictures of water lilies in his garden at Giverny?", opts:["Claude Monet","Pablo Picasso","Leonardo da Vinci","Banksy"], a:"Claude Monet"},
    {q:"Complementary colours sit ___ each other on the colour wheel.", opts:["opposite","next to","on top of","far from all"], a:"opposite"}
  ]},
{ id:"ar-sewing", subject:"arts", topic:"Design & technology", title:"Sewing Box Secrets", level:5, type:"match",
  prompt:"Match each sewing word to its meaning.",
  pairs:[["running stitch","simple in-and-out stitch"],["backstitch","strong stitch that overlaps backwards"],["blanket stitch","decorative stitch along an edge"],["hem","folded and sewn edge of fabric"],["seam allowance","gap between the stitches and the fabric edge"],["thimble","protects your finger when pushing a needle"]]},
{ id:"ar-dt", subject:"arts", topic:"Design & technology", title:"Design Studio", level:6, type:"quiz",
  items:[
    {q:"In a sewing machine, the small reel underneath that holds the lower thread is the…", opts:["bobbin","spool pin","presser foot","feed dog"], a:"bobbin"},
    {q:"A <b>design specification</b> is…", opts:["a list of what the product must do","a finished product","a type of fabric","a price label"], a:"a list of what the product must do"},
    {q:"A <b>prototype</b> is…", opts:["a test model of a design","the final sale item","a sewing pattern","a type of glue"], a:"a test model of a design"},
    {q:"Which fabric is <b>synthetic</b> (made from oil)?", opts:["polyester","cotton","silk","wool"], a:"polyester"},
    {q:"Why do we use a <b>paper pattern</b> when making clothes?", opts:["to cut fabric pieces to the right shape","to colour fabric","to make it waterproof","to iron it"], a:"to cut fabric pieces to the right shape"},
    {q:"In cooking, which food group gives us lots of energy?", opts:["carbohydrates (bread, pasta, rice)","vitamins","water","fibre only"], a:"carbohydrates (bread, pasta, rice)"},
    {q:"Before handling food you should…", opts:["wash your hands","put on perfume","sharpen a pencil","stroke the cat"], a:"wash your hands"},
    {q:"<b>Cams</b> and <b>levers</b> are used to create…", opts:["movement in mechanisms","colour","sound only","heat"], a:"movement in mechanisms"}
  ]},
{ id:"ar-computing", subject:"arts", topic:"Computing", title:"Code Crafters", level:5, type:"quiz",
  items:[
    {q:"An <b>algorithm</b> is…", opts:["a set of step-by-step instructions","a computer virus","a type of keyboard","a website"], a:"a set of step-by-step instructions"},
    {q:"Finding and fixing mistakes in code is called…", opts:["debugging","decoding","downloading","deleting"], a:"debugging"},
    {q:"A <b>loop</b> (repeat) in a program…", opts:["repeats instructions","stops the program","saves the file","prints a picture"], a:"repeats instructions"},
    {q:"'IF it is raining THEN take an umbrella' is an example of…", opts:["selection","repetition","a variable","an input"], a:"selection"},
    {q:"Which of these is an <b>input</b> device?", opts:["keyboard","speaker","printer","monitor"], a:"keyboard"},
    {q:"What should you do if someone online makes you feel uncomfortable?", opts:["tell a trusted adult","keep it secret","reply angrily","share your address"], a:"tell a trusted adult"},
    {q:"The <b>internet</b> is…", opts:["a huge network of connected computers","one big computer","a single website","an app"], a:"a huge network of connected computers"},
    {q:"Who is often called the first computer programmer?", opts:["Ada Lovelace","Alan Sugar","Bill Gates","Marie Curie"], a:"Ada Lovelace"}
  ]},
{ id:"ar-algorithm-order", subject:"arts", topic:"Computing", title:"Algorithm: Thread a Needle", level:5, type:"order",
  prompt:"Put this algorithm in the right order.",
  steps:["Cut a length of thread","Push the end of the thread through the needle's eye","Pull the thread through","Tie a knot in the end","Start stitching"]},
{ id:"ar-computing-7", subject:"arts", topic:"Computing", title:"Binary & Beyond", level:7, type:"quiz",
  items:[
    {q:"Binary uses only which digits?", opts:["0 and 1","1 and 2","0 to 9","A to F"], a:"0 and 1"},
    {q:"What is binary <b>101</b> in normal (decimal) numbers?", opts:["5","101","3","6"], a:"5"},
    {q:"What is binary <b>1000</b> in decimal?", opts:["8","1000","4","16"], a:"8"},
    {q:"What is decimal <b>6</b> in binary?", opts:["110","101","111","011"], a:"110"},
    {q:"A <b>variable</b> in a program…", opts:["stores a value that can change","is a type of loop","is always a number 1","is a bug"], a:"stores a value that can change"},
    {q:"8 bits make a…", opts:["byte","megabyte","pixel","loop"], a:"byte"},
    {q:"Which is the strongest password?", opts:["Axolotl!Teal#Sing42","password","12345","lucy"], a:"Axolotl!Teal#Sing42"},
    {q:"Who invented the World Wide Web?", opts:["Tim Berners-Lee","Alan Turing","Ada Lovelace","Steve Jobs"], a:"Tim Berners-Lee"}
  ]},
{ id:"ar-french", subject:"arts", topic:"Languages", title:"Bonjour Lagoon", level:5, type:"match",
  prompt:"Match the French word to English.",
  pairs:[["bleu","blue"],["violet","purple"],["le chat","the cat"],["le chien","the dog"],["chanter","to sing"],["un papillon","a butterfly"]]},
{ id:"ar-french-2", subject:"arts", topic:"Languages", title:"French Phrases", level:6, type:"quiz",
  items:[
    {q:"'Je m'appelle Lucy' means…", opts:["My name is Lucy","I like Lucy","Lucy is here","Hello Lucy"], a:"My name is Lucy"},
    {q:"How do you say 'Thank you' in French?", opts:["merci","s'il vous plaît","bonjour","au revoir"], a:"merci"},
    {q:"'J'ai neuf ans' means…", opts:["I am nine years old","I have nine cats","It is nine o'clock","I have new shoes"], a:"I am nine years old"},
    {q:"What is 'Wednesday' in French?", opts:["mercredi","lundi","vendredi","dimanche"], a:"mercredi"},
    {q:"'Quel temps fait-il ?' asks about…", opts:["the weather","the time","your name","your age"], a:"the weather"},
    {q:"What is 'quinze'?", opts:["15","50","5","14"], a:"15"},
    {q:"'J'adore les insectes' means…", opts:["I love insects","I hate insects","I draw insects","I am an insect"], a:"I love insects"}
  ]}
);
})();
