/* Lucy's 11+ Lagoon — Story Studio */
window.SETS = window.SETS || [];
window.PROMPTS = [
  {t:"The Axolotl Who Wouldn't Stop Smiling", kind:"story", pic:"🦎", hint:"A tiny axolotl in a Mexican canal discovers it can regrow more than just legs…"},
  {t:"Curtain Up!", kind:"story", pic:"🎭", hint:"Ten seconds before the show starts, the lead singer loses their voice. You know every word."},
  {t:"The Midnight Sewing Box", kind:"story", pic:"🧵", hint:"Every night at midnight, Gran's old sewing box opens by itself."},
  {t:"Into the Hidden Wood", kind:"story", pic:"🌲", hint:"A path appears in the park that wasn't there yesterday."},
  {t:"The Plant That Was Hungry", kind:"story", pic:"🌱", hint:"You buy a strange seedling from a market stall. It grows… and it's hungry."},
  {t:"Shrunk!", kind:"story", pic:"🐞", hint:"You wake up the size of a ladybird in the middle of the garden."},
  {t:"Time-Slip at the Cotton Mill", kind:"story", pic:"🏭", hint:"You touch an old bobbin in a museum and find yourself in an 1840s Manchester mill."},
  {t:"The Island Postcard", kind:"story", pic:"🏝️", hint:"A postcard arrives from a Greek island, addressed to you, signed by someone you've never met."},
  {t:"The Last Firefly", kind:"story", pic:"✨", hint:"Every firefly in the forest has gone dark, except one."},
  {t:"The Costume That Changed Me", kind:"story", pic:"👗", hint:"When you put on the costume, you become the character, for real."},
  {t:"Under the Ice", kind:"story", pic:"🧊", hint:"Something is tapping on the underside of the frozen pond."},
  {t:"The Museum After Dark", kind:"story", pic:"🦕", hint:"You're accidentally locked in the Natural History Museum overnight."},
  {t:"A Stormy Night at Sea", kind:"description", pic:"🌊", hint:"Describe a ship in a terrible storm. Use all five senses."},
  {t:"Backstage, Opening Night", kind:"description", pic:"🎤", hint:"Describe the chaos and excitement behind the curtain."},
  {t:"The Rainforest at Dawn", kind:"description", pic:"🦜", hint:"Describe the rainforest waking up, layer by layer."},
  {t:"An Abandoned Fairground", kind:"description", pic:"🎡", hint:"Describe a fairground that hasn't opened in fifty years."},
  {t:"A Market in Mexico City", kind:"description", pic:"🌮", hint:"Colours, smells, voices, music: bring it alive."},
  {t:"Why Every School Should Have a Musical", kind:"persuasive", pic:"🎶", hint:"Persuade your head teacher. Use rhetorical questions and facts."},
  {t:"Save the Axolotl!", kind:"persuasive", pic:"💙", hint:"Write a speech persuading people to protect axolotls in the wild."},
  {t:"Should Bugs Be Our Pets?", kind:"persuasive", pic:"🐛", hint:"Argue for (or against) keeping insects as class pets."},
  {t:"A Letter from Hadrian's Wall", kind:"letter", pic:"🏛️", hint:"You are a Roman soldier writing home. What is life like on the wall?"},
  {t:"Dear Future Me", kind:"letter", pic:"💌", hint:"Write to yourself in Year 7. What do you hope you'll have done?"},
  {t:"Diary of an Evacuee", kind:"diary", pic:"🧳", hint:"1939: you arrive in a strange village with a gas mask and a suitcase."},
  {t:"The Day the Colours Ran Away", kind:"story", pic:"🎨", hint:"One morning, teal, blue and purple have vanished from the world."}
];
window.SPARKLE = [
  {id:"simile", label:"Simile (like / as … as)", test:/\b(like a|like an|like the|as \w+ as)\b/i},
  {id:"fronted", label:"Fronted adverbial with a comma", test:/(^|[.!?]\s+)(Suddenly|Silently|Slowly|Without|After|Before|As|When|Moments|Later|Meanwhile|Out of|Under|Beneath|Above|Behind|Inside|Outside|In the|At the|With|Carefully|Nervously|Eventually|Finally|Earlier)[^.!?]{0,40},/},
  {id:"speech", label:"Speech marks used", test:/["“][^"”]+[,.!?]["”]/},
  {id:"question", label:"A question to hook the reader", test:/\?/},
  {id:"senses", label:"Senses (heard, smelt, tasted…)", test:/\b(heard|smell|smelt|smelled|scent|taste|tasted|whisper|echo|rough|smooth|sticky|icy|sour|sweet|crackl|rustl|thud)\w*/i},
  {id:"semicolon", label:"Ambitious punctuation (; : … –)", test:/[;:…–]|\.\.\./},
  {id:"paragraphs", label:"Paragraphs (3 or more)", test: t => t.split(/\n\s*\n/).filter(p => p.trim().length > 20).length >= 3},
  {id:"openers", label:"Varied sentence starts", test: t => { const s = t.split(/[.!?]+\s+/).map(x => x.trim().split(/\s+/)[0]?.toLowerCase()).filter(Boolean); return s.length >= 5 && new Set(s).size / s.length > 0.7; }}
];
SETS.push(
{ id:"wr-said", subject:"writing", topic:"Word power", title:"Say Goodbye to 'Said'", level:5, type:"quiz",
  items:[
    {q:"Choose the best word: \"Help!\" she ___, as the boat tipped.", opts:["screamed","said","mentioned","remarked"], a:"screamed"},
    {q:"Choose the best word: \"Don't wake the baby,\" he ___.", opts:["whispered","bellowed","announced","yelled"], a:"whispered"},
    {q:"Choose the best word: \"I didn't do it,\" Tom ___, staring at his shoes.", opts:["mumbled","declared","sang","cheered"], a:"mumbled"},
    {q:"Choose the best word: \"We won!\" the team ___.", opts:["cheered","sighed","muttered","grumbled"], a:"cheered"},
    {q:"Choose the best word: \"Not again,\" Gran ___, picking up the spilt pins.", opts:["sighed","giggled","shrieked","boasted"], a:"sighed"},
    {q:"Choose the best word: \"I'm the best singer in the school,\" Zara ___.", opts:["boasted","whimpered","apologised","whispered"], a:"boasted"}
  ]},
{ id:"wr-showtell", subject:"writing", topic:"Show, don't tell", title:"Show, Don't Tell", level:6, type:"sort",
  prompt:"Is the sentence SHOWING the feeling or just TELLING it?",
  bins:["Showing ✨","Telling"],
  items:[{t:"Her hands shook as she reached for the microphone.",b:0},{t:"She was nervous.",b:1},{t:"He slammed the door so hard the pictures rattled.",b:0},{t:"He was angry.",b:1},{t:"A grin spread across her face and she spun in a circle.",b:0},{t:"She felt happy.",b:1},{t:"His teeth chattered and he pulled his scarf tighter.",b:0},{t:"It was cold.",b:1}]},
{ id:"wr-openers", subject:"writing", topic:"Story openings", title:"Hook the Reader", level:6, type:"quiz",
  items:[
    {q:"Which story opening is the most gripping?", opts:["The jar was empty, and the axolotl was gone.","One day I went to school.","This is a story about an axolotl.","My name is Lily and I am nine."], a:"The jar was empty, and the axolotl was gone."},
    {q:"Which opening uses <b>dialogue</b> to hook the reader?", opts:["\"Don't open that box,\" Gran warned.","The box was on the table.","Gran had a box.","It was a nice day."], a:"\"Don't open that box,\" Gran warned."},
    {q:"Which opening starts with a <b>question</b>?", opts:["Have you ever heard a plant whisper?","Plants are green.","I like plants a lot.","The plant was in the shop."], a:"Have you ever heard a plant whisper?"},
    {q:"Which opening best sets an <b>eerie mood</b>?", opts:["Fog crept between the trees, swallowing the path behind me.","The woods were okay.","I walked in the woods with my dog.","There were trees."], a:"Fog crept between the trees, swallowing the path behind me."},
    {q:"Which ending is the most satisfying?", opts:["As the curtain fell, Nell finally let herself smile.","The end.","Then I woke up and it was all a dream.","And that's what happened."], a:"As the curtain fell, Nell finally let herself smile.", why:"'It was all a dream' endings usually lose marks."}
  ]},
{ id:"wr-upgrade", subject:"writing", topic:"Word power", title:"Sentence Upgrade", level:7, type:"blanks",
  items:[
    {text:"The ___ moon hung over the ___ lake.", a:["silver","silent"], extra:["nice","big","good"]},
    {text:"The bee ___ lazily from flower to flower.", a:["drifted"], extra:["went","moved"]},
    {text:"Thunder ___ across the valley like a giant's drum.", a:["rumbled"], extra:["was","went"]},
    {text:"Her costume ___ under the spotlights.", a:["shimmered"], extra:["was there","looked"]},
    {text:"The old door ___ open on rusty hinges.", a:["creaked"], extra:["opened","went"]}
  ]},
{ id:"wr-devices", subject:"writing", topic:"Word power", title:"Writer's Toolkit", level:6, type:"match",
  prompt:"Match each technique to an example.",
  pairs:[["simile","her voice was as clear as glass"],["metaphor","the stage was an ocean of light"],["personification","the curtain sighed as it fell"],["onomatopoeia","snip, snip went the scissors"],["alliteration","sparkling sequins sewn in silver"],["rule of three","cold, dark and silent"]]}
);
