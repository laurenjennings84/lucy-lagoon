/* Lucy's 11+ Lagoon — Science Lab */
window.SETS = window.SETS || [];
SETS.push(
/* Living things */
{ id:"sc-lifecycle-order", subject:"science", topic:"Living things & life cycles", title:"Butterfly Life Cycle", level:5, type:"order",
  prompt:"Put a butterfly's life cycle in order, starting with the egg.",
  steps:["Egg laid on a leaf","Caterpillar (larva) hatches and eats","Chrysalis (pupa) forms","Adult butterfly emerges"]},
{ id:"sc-lifecycles", subject:"science", topic:"Living things & life cycles", title:"Life Cycle Lagoon", level:5, type:"quiz",
  items:[
    {q:"What is it called when an animal completely changes its body shape as it grows, like a caterpillar becoming a butterfly?", opts:["metamorphosis","photosynthesis","evaporation","hibernation"], a:"metamorphosis"},
    {q:"Which animal goes through <b>incomplete</b> metamorphosis (egg → nymph → adult, no pupa)?", opts:["grasshopper","butterfly","ladybird","bee"], a:"grasshopper"},
    {q:"Axolotls are amphibians that <b>don't</b> complete metamorphosis. What do they keep for life?", opts:["their feathery gills","their shells","their feathers","their wings"], a:"their feathery gills"},
    {q:"Which group of animals feeds its babies on milk?", opts:["mammals","birds","reptiles","amphibians"], a:"mammals"},
    {q:"Which of these reproduces <b>asexually</b>, e.g. from a cutting or a bulb?", opts:["a spider plant","a cat","a frog","a robin"], a:"a spider plant"},
    {q:"Who was the British naturalist famous for studying chimpanzees in the wild?", opts:["Jane Goodall","Marie Curie","Florence Nightingale","Ada Lovelace"], a:"Jane Goodall"},
    {q:"What is the correct order of a frog's life cycle?", opts:["spawn → tadpole → froglet → frog","tadpole → spawn → frog → froglet","frog → froglet → spawn → tadpole","spawn → froglet → tadpole → frog"], a:"spawn → tadpole → froglet → frog"},
    {q:"In flowering plants, what does the bee carry from flower to flower?", opts:["pollen","nectar only","seeds","water"], a:"pollen"}
  ]},
{ id:"sc-vertebrate-sort", subject:"science", topic:"Classification", title:"Backbone or Not?", level:5, type:"sort",
  prompt:"Sort these animals: do they have a backbone?",
  bins:["Vertebrate","Invertebrate"],
  items:[{t:"axolotl",b:0},{t:"shark",b:0},{t:"owl",b:0},{t:"tortoise",b:0},{t:"bat",b:0},{t:"jellyfish",b:1},{t:"snail",b:1},{t:"octopus",b:1},{t:"earthworm",b:1},{t:"stag beetle",b:1}]},
{ id:"sc-groups-sort", subject:"science", topic:"Classification", title:"Animal Families", level:6, type:"sort",
  prompt:"Which vertebrate group does each animal belong to?",
  bins:["Mammal","Bird","Reptile","Amphibian","Fish"],
  items:[{t:"dolphin",b:0},{t:"bat",b:0},{t:"penguin",b:1},{t:"ostrich",b:1},{t:"crocodile",b:2},{t:"gecko",b:2},{t:"axolotl",b:3},{t:"newt",b:3},{t:"seahorse",b:4},{t:"shark",b:4}]},
{ id:"sc-bugs-sort", subject:"science", topic:"Classification", title:"Creepy Crawly Classifier", level:6, type:"sort",
  prompt:"Insect (6 legs, 3 body parts) or arachnid (8 legs, 2 body parts)?",
  bins:["Insect","Arachnid"],
  items:[{t:"ladybird",b:0},{t:"ant",b:0},{t:"dragonfly",b:0},{t:"bee",b:0},{t:"spider",b:1},{t:"scorpion",b:1},{t:"tick",b:1},{t:"harvestman",b:1}]},
{ id:"sc-insect-label", subject:"science", topic:"Classification", title:"Label a Beetle", level:5, type:"label", diagram:"insect",
  labels:["Head","Thorax","Abdomen","Antenna","Leg","Wing case (elytron)"]},
{ id:"sc-keys", subject:"science", topic:"Classification", title:"Classification Keys", level:6, type:"quiz",
  items:[
    {q:"A key asks: 'Does it have 8 legs?' YES → ? Which animal fits?", opts:["spider","ant","snail","worm"], a:"spider"},
    {q:"Who created the system of naming living things with two Latin names (like <i>Homo sapiens</i>)?", opts:["Carl Linnaeus","Charles Darwin","Isaac Newton","Mary Anning"], a:"Carl Linnaeus"},
    {q:"Which question best separates a fish from a whale?", opts:["Does it breathe air with lungs?","Does it live in water?","Does it swim?","Does it have a tail?"], a:"Does it breathe air with lungs?"},
    {q:"Mushrooms belong to which kingdom?", opts:["fungi","plants","animals","bacteria"], a:"fungi"},
    {q:"Microorganisms that make bread rise are…", opts:["yeast","mould","viruses","algae"], a:"yeast"},
    {q:"Which of these is a <b>micro-organism</b>?", opts:["bacteria","beetle","moss","minnow"], a:"bacteria"}
  ]},

/* Humans */
{ id:"sc-body", subject:"science", topic:"Animals including humans", title:"Body Basics", level:5, type:"quiz",
  items:[
    {q:"What does the <b>heart</b> do?", opts:["pumps blood around the body","digests food","helps us breathe","cleans the blood"], a:"pumps blood around the body"},
    {q:"Which bone protects the brain?", opts:["skull","ribs","spine","pelvis"], a:"skull"},
    {q:"What do the <b>lungs</b> take in from the air?", opts:["oxygen","carbon dioxide","nitrogen","water"], a:"oxygen"},
    {q:"Which nutrient helps us grow and repair muscles?", opts:["protein","carbohydrate","fat","fibre"], a:"protein"},
    {q:"Which teeth are best for tearing food?", opts:["canines","incisors","molars","premolars"], a:"canines"},
    {q:"Blood carrying oxygen <b>away</b> from the heart travels in…", opts:["arteries","veins","nerves","tendons"], a:"arteries"},
    {q:"Muscles work in pairs. When your biceps contracts, your arm…", opts:["bends","straightens","twists","stays still"], a:"bends"},
    {q:"What carries blood <b>back</b> to the heart?", opts:["veins","arteries","lungs","bones"], a:"veins"}
  ]},
{ id:"sc-digest-order", subject:"science", topic:"Animals including humans", title:"Journey of a Sandwich", level:5, type:"order",
  prompt:"Order the journey of food through the digestive system.",
  steps:["Mouth","Oesophagus","Stomach","Small intestine","Large intestine"]},
{ id:"sc-foodchain-order", subject:"science", topic:"Animals including humans", title:"Pond Food Chain", level:5, type:"order",
  prompt:"Build the food chain, from producer to top predator.",
  steps:["Pondweed","Water snail","Axolotl","Heron"]},
{ id:"sc-cell-label", subject:"science", topic:"Cells (KS3)", title:"Inside an Animal Cell", level:7, type:"label", diagram:"cell",
  labels:["Nucleus","Cell membrane","Cytoplasm","Mitochondrion"]},
{ id:"sc-cells-7", subject:"science", topic:"Cells (KS3)", title:"Cell Secrets", level:7, type:"quiz",
  items:[
    {q:"Which part of the cell controls what it does and holds the genetic information?", opts:["nucleus","cytoplasm","cell wall","vacuole"], a:"nucleus"},
    {q:"Which of these is found in <b>plant</b> cells but not animal cells?", opts:["cell wall","nucleus","cell membrane","cytoplasm"], a:"cell wall"},
    {q:"Chloroplasts are where…", opts:["photosynthesis happens","respiration happens","DNA is stored","water is stored"], a:"photosynthesis happens"},
    {q:"Mitochondria release energy through…", opts:["respiration","photosynthesis","digestion","evaporation"], a:"respiration"},
    {q:"A group of similar cells working together is called a…", opts:["tissue","organ","system","organism"], a:"tissue"},
    {q:"Which instrument would you use to see cells?", opts:["microscope","telescope","thermometer","stethoscope"], a:"microscope"},
    {q:"What is the word equation for photosynthesis?", opts:["carbon dioxide + water → glucose + oxygen","oxygen + glucose → water + salt","water → hydrogen + oxygen","glucose → carbon dioxide + light"], a:"carbon dioxide + water → glucose + oxygen"}
  ]},

/* Plants */
{ id:"sc-flower-label", subject:"science", topic:"Plants", title:"Label a Flower", level:5, type:"label", diagram:"flower",
  labels:["Petal","Stigma","Anther","Stem","Leaf","Roots"]},
{ id:"sc-plants", subject:"science", topic:"Plants", title:"Petal Power", level:5, type:"quiz",
  items:[
    {q:"What do plants need to make their own food?", opts:["light, water and carbon dioxide","soil, sugar and oxygen","darkness and water","only soil"], a:"light, water and carbon dioxide"},
    {q:"What is the job of the <b>roots</b>?", opts:["take in water and anchor the plant","make seeds","attract insects","make food"], a:"take in water and anchor the plant"},
    {q:"The male part of a flower that makes pollen is the…", opts:["stamen (anther)","stigma","ovary","sepal"], a:"stamen (anther)"},
    {q:"Moving pollen from anther to stigma is called…", opts:["pollination","germination","fertiliser","evaporation"], a:"pollination"},
    {q:"Which is a way seeds are dispersed?", opts:["all of these","by wind (dandelion)","by animals (burrs)","by bursting pods (peas)"], a:"all of these"},
    {q:"When a seed starts to grow it is called…", opts:["germination","pollination","flowering","decay"], a:"germination"},
    {q:"Audrey II in Little Shop of Horrors eats meat. Real meat-eating plants include…", opts:["the Venus flytrap","the sunflower","the oak tree","the cactus"], a:"the Venus flytrap"}
  ]},

/* Materials */
{ id:"sc-materials-sort", subject:"science", topic:"Materials", title:"Conductor or Insulator?", level:5, type:"sort",
  prompt:"Does it let electricity pass through?",
  bins:["Electrical conductor","Electrical insulator"],
  items:[{t:"copper wire",b:0},{t:"steel paperclip",b:0},{t:"aluminium foil",b:0},{t:"graphite (pencil lead)",b:0},{t:"plastic ruler",b:1},{t:"rubber band",b:1},{t:"wooden spoon",b:1},{t:"cotton thread",b:1},{t:"glass marble",b:1}]},
{ id:"sc-changes-sort", subject:"science", topic:"Materials", title:"Reversible or Not?", level:5, type:"sort",
  prompt:"Can the change be undone?",
  bins:["Reversible","Irreversible"],
  items:[{t:"melting chocolate",b:0},{t:"dissolving salt in water",b:0},{t:"freezing water",b:0},{t:"baking a cake",b:1},{t:"burning wood",b:1},{t:"rusting a nail",b:1},{t:"frying an egg",b:1},{t:"evaporating puddle",b:0}]},
{ id:"sc-materials", subject:"science", topic:"Materials", title:"Material Matters", level:5, type:"quiz",
  items:[
    {q:"Which method separates <b>sand</b> from water?", opts:["filtering","evaporating","magnet","sieve with big holes"], a:"filtering"},
    {q:"How could you get <b>salt</b> back from salty water?", opts:["evaporate the water","filter it","use a magnet","freeze it"], a:"evaporate the water"},
    {q:"Which material is <b>magnetic</b>?", opts:["iron","aluminium","copper","gold"], a:"iron"},
    {q:"A material that you can see clearly through is…", opts:["transparent","opaque","translucent","reflective"], a:"transparent"},
    {q:"Why are saucepan handles often made of plastic or wood?", opts:["they are thermal insulators","they are magnetic","they are shiny","they are heavy"], a:"they are thermal insulators"},
    {q:"Which fabric is made from a natural animal fibre?", opts:["wool","polyester","nylon","acrylic"], a:"wool"},
    {q:"Bicarbonate of soda + vinegar fizzing is a sign of…", opts:["a new material being made (irreversible)","melting","dissolving","freezing"], a:"a new material being made (irreversible)"},
    {q:"Which will dissolve in water?", opts:["sugar","sand","chalk","rice"], a:"sugar"}
  ]},
{ id:"sc-states", subject:"science", topic:"States of matter", title:"Solid, Liquid, Gas", level:5, type:"sort",
  prompt:"What state is each at room temperature?",
  bins:["Solid","Liquid","Gas"],
  items:[{t:"ice cube",b:0},{t:"wooden block",b:0},{t:"honey",b:1},{t:"milk",b:1},{t:"oxygen",b:2},{t:"steam",b:2},{t:"sand",b:0},{t:"orange juice",b:1},{t:"helium",b:2}]},
{ id:"sc-watercycle", subject:"science", topic:"States of matter", title:"Label the Water Cycle", level:5, type:"label", diagram:"water",
  labels:["Evaporation","Condensation","Precipitation","Collection"]},
{ id:"sc-particles-7", subject:"science", topic:"Particles (KS3)", title:"Particle Party", level:7, type:"quiz",
  items:[
    {q:"In a <b>solid</b>, particles are…", opts:["close together in a regular pattern, vibrating","far apart and moving fast","close but moving around each other","not moving at all and far apart"], a:"close together in a regular pattern, vibrating"},
    {q:"Why can you <b>squash</b> a gas?", opts:["its particles are far apart","its particles are very small","it is light","it is invisible"], a:"its particles are far apart"},
    {q:"Water boils at…", opts:["100°C","0°C","50°C","37°C"], a:"100°C"},
    {q:"When a gas turns into a liquid it is called…", opts:["condensing","evaporating","melting","sublimating"], a:"condensing"},
    {q:"Diffusion is when particles…", opts:["spread from high concentration to low","stick together","stop moving","turn into a solid"], a:"spread from high concentration to low"},
    {q:"Which is an <b>element</b>?", opts:["oxygen","water","salt","air"], a:"oxygen"},
    {q:"What is the chemical symbol for <b>iron</b>?", opts:["Fe","Ir","I","In"], a:"Fe"},
    {q:"Lemon juice and vinegar are…", opts:["acids","alkalis","neutral","metals"], a:"acids"}
  ]},

/* Forces */
{ id:"sc-forces", subject:"science", topic:"Forces", title:"May the Forces Be With You", level:5, type:"quiz",
  items:[
    {q:"Which force pulls objects towards Earth?", opts:["gravity","friction","air resistance","upthrust"], a:"gravity"},
    {q:"Which force slows a parachute?", opts:["air resistance","gravity","magnetism","upthrust"], a:"air resistance"},
    {q:"Friction is greatest on which surface?", opts:["sandpaper","ice","glass","polished wood"], a:"sandpaper"},
    {q:"Which force pushes a boat up and helps it float?", opts:["upthrust","gravity","friction","thrust"], a:"upthrust"},
    {q:"Who is famous for describing gravity after (so the story goes) watching an apple fall?", opts:["Isaac Newton","Albert Einstein","Galileo Galilei","Charles Darwin"], a:"Isaac Newton"},
    {q:"Forces are measured in…", opts:["newtons (N)","kilograms (kg)","metres (m)","degrees (°)"], a:"newtons (N)"},
    {q:"Levers, pulleys and gears let a small force…", opts:["have a bigger effect","disappear","make gravity stronger","create electricity"], a:"have a bigger effect"},
    {q:"Why are fish and axolotls streamlined?", opts:["to reduce water resistance","to increase friction","to be heavier","to sink faster"], a:"to reduce water resistance"}
  ]},
{ id:"sc-forces-7", subject:"science", topic:"Forces", title:"Forces Expert", level:7, type:"quiz",
  items:[
    {q:"Mass is measured in kg. <b>Weight</b> is…", opts:["the force of gravity on a mass, in newtons","the same as mass","measured in metres","only on the Moon"], a:"the force of gravity on a mass, in newtons"},
    {q:"On the Moon, your <b>mass</b> would…", opts:["stay the same","be one sixth","double","be zero"], a:"stay the same"},
    {q:"If forces on an object are <b>balanced</b>, a still object will…", opts:["stay still","speed up","slow down","spin"], a:"stay still"},
    {q:"Speed = distance ÷ …", opts:["time","mass","force","weight"], a:"time"},
    {q:"Pressure is greater when force is spread over a…", opts:["smaller area","bigger area","longer time","heavier mass"], a:"smaller area"},
    {q:"A stretched spring stores which type of energy?", opts:["elastic potential","chemical","nuclear","sound"], a:"elastic potential"}
  ]},

/* Space */
{ id:"sc-planets-order", subject:"science", topic:"Earth & space", title:"Planet Parade", level:5, type:"order",
  prompt:"Order the planets from closest to the Sun.",
  steps:["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"]},
{ id:"sc-space", subject:"science", topic:"Earth & space", title:"Space Spectacular", level:5, type:"quiz",
  items:[
    {q:"Why do we have day and night?", opts:["the Earth spins on its axis","the Sun moves around the Earth","the Moon blocks the Sun","clouds cover the Sun"], a:"the Earth spins on its axis"},
    {q:"How long does the Earth take to orbit the Sun?", opts:["about 365¼ days","24 hours","28 days","7 days"], a:"about 365¼ days"},
    {q:"How long does the Moon take to orbit the Earth?", opts:["about 28 days","365 days","24 hours","7 days"], a:"about 28 days"},
    {q:"The Sun is a…", opts:["star","planet","moon","comet"], a:"star"},
    {q:"Which is the largest planet?", opts:["Jupiter","Saturn","Earth","Neptune"], a:"Jupiter"},
    {q:"Why does the Moon seem to shine?", opts:["it reflects light from the Sun","it makes its own light","it is on fire","it has lamps"], a:"it reflects light from the Sun"},
    {q:"Which shape best describes the Sun, Earth and Moon?", opts:["roughly spherical","flat discs","cubes","cones"], a:"roughly spherical"},
    {q:"Who was the first person to walk on the Moon (1969)?", opts:["Neil Armstrong","Yuri Gagarin","Tim Peake","Helen Sharman"], a:"Neil Armstrong"}
  ]},

/* Light, sound, electricity */
{ id:"sc-light-sound", subject:"science", topic:"Light & sound", title:"Lights, Sound, Action!", level:6, type:"quiz",
  items:[
    {q:"Light travels in…", opts:["straight lines","curves","circles","zig-zags"], a:"straight lines"},
    {q:"We see objects because light…", opts:["reflects off them into our eyes","comes out of our eyes","is absorbed by them only","bends around them"], a:"reflects off them into our eyes"},
    {q:"A shadow forms when…", opts:["an opaque object blocks light","light reflects","light passes through glass","it is night"], a:"an opaque object blocks light"},
    {q:"Sounds are made by…", opts:["vibrations","light","magnets","heat"], a:"vibrations"},
    {q:"A shorter guitar string makes a…", opts:["higher pitch","lower pitch","louder sound always","no sound"], a:"higher pitch"},
    {q:"Singing louder means your vocal folds vibrate…", opts:["with bigger vibrations","more slowly","less","not at all"], a:"with bigger vibrations", why:"Bigger vibrations = louder (greater amplitude)."},
    {q:"Can sound travel through space (a vacuum)?", opts:["No, there are no particles to vibrate","Yes, very fast","Only music can","Only at night"], a:"No, there are no particles to vibrate"},
    {q:"Splitting white light into colours with a prism shows a…", opts:["spectrum (rainbow)","shadow","reflection","echo"], a:"spectrum (rainbow)"}
  ]},
{ id:"sc-circuits", subject:"science", topic:"Electricity", title:"Circuit Sparks", level:6, type:"quiz",
  items:[
    {q:"What happens to a bulb if you add <b>more cells</b> (batteries)?", opts:["it gets brighter","it gets dimmer","it goes out","nothing"], a:"it gets brighter"},
    {q:"What happens to bulbs if you add <b>more bulbs</b> in series with the same cells?", opts:["they get dimmer","they get brighter","they explode","nothing"], a:"they get dimmer"},
    {q:"A circuit must be ___ for current to flow.", opts:["complete (closed)","broken (open)","wet","plastic"], a:"complete (closed)"},
    {q:"What does a <b>switch</b> do?", opts:["opens or closes the circuit","makes electricity","stores light","measures voltage"], a:"opens or closes the circuit"},
    {q:"The circuit symbol for a cell is…", opts:["a long line and a short line","a circle with a cross","a zig-zag","a box"], a:"a long line and a short line"},
    {q:"A circle with a cross inside is the symbol for a…", opts:["bulb (lamp)","buzzer","motor","switch"], a:"bulb (lamp)"}
  ]},
{ id:"sc-rocks-evolution", subject:"science", topic:"Rocks, fossils & evolution", title:"Fossil Hunters", level:6, type:"quiz",
  items:[
    {q:"Which type of rock forms from cooled lava or magma?", opts:["igneous","sedimentary","metamorphic","fossil"], a:"igneous"},
    {q:"Fossils are most often found in which rock?", opts:["sedimentary","igneous","metamorphic","granite"], a:"sedimentary"},
    {q:"Mary Anning, who found ichthyosaur fossils at Lyme Regis, was a…", opts:["fossil collector and palaeontologist","queen","painter","explorer of Antarctica"], a:"fossil collector and palaeontologist"},
    {q:"Who developed the theory of evolution by natural selection?", opts:["Charles Darwin","Isaac Newton","Louis Pasteur","Jane Goodall"], a:"Charles Darwin"},
    {q:"Offspring are similar but not identical to their parents. This is called…", opts:["variation","adaptation","evolution","metamorphosis"], a:"variation"},
    {q:"A polar bear's thick fur and white colour are examples of…", opts:["adaptations","fossils","habitats","food chains"], a:"adaptations"},
    {q:"Soil is made from rock pieces mixed with…", opts:["decayed plant and animal matter","plastic","sugar","salt only"], a:"decayed plant and animal matter"}
  ]},
{ id:"sc-energy-7", subject:"science", topic:"Energy (KS3)", title:"Energy Explorers", level:7, type:"match",
  prompt:"Match each energy store to an example.",
  pairs:[["chemical","food and batteries"],["kinetic","a running cheetah"],["gravitational potential","a book on a high shelf"],["thermal","a hot cup of tea"],["elastic potential","a stretched bungee cord"],["nuclear","the centre of the Sun"]]},
{ id:"sc-renewables", subject:"science", topic:"Energy (KS3)", title:"Renewable or Not?", level:6, type:"sort",
  prompt:"Is the energy resource renewable?",
  bins:["Renewable","Non-renewable"],
  items:[{t:"wind",b:0},{t:"solar",b:0},{t:"tidal",b:0},{t:"hydroelectric",b:0},{t:"coal",b:1},{t:"oil",b:1},{t:"natural gas",b:1},{t:"geothermal",b:0}]},
{ id:"sc-habitats-sort", subject:"science", topic:"Living things & life cycles", title:"Habitat Match", level:5, type:"match",
  prompt:"Match each animal to its natural habitat.",
  pairs:[["axolotl","lake canals in Mexico"],["polar bear","Arctic sea ice"],["camel","desert"],["orangutan","rainforest"],["puffin","sea cliffs"],["hedgehog","hedgerows and gardens"]]}
);
