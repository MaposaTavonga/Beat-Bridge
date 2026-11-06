// Beat Bridge: a beat-making school in the browser.
// Sounds are synthesised with the Web Audio API; no samples are used.
(() => {
/* ---------- instruments ---------- */
const ROWDEF = {
  kick:{name:'Kick',role:'kick'}, snare:{name:'Snare',role:'snare'}, clap:{name:'Clap',role:'snare'},
  rim:{name:'Rim',role:'perc'}, perc:{name:'Congas',role:'perc'},
  hat:{name:'Hi-hat',role:'hat',roll:true}, openHat:{name:'Open hat',role:'hat'}, shaker:{name:'Shaker',role:'hat'},
  logLow:{name:'Log low',role:'bass'}, logHigh:{name:'Log high',role:'bass'},
  bass:{name:'Bass',role:'bass'}, sub808:{name:'808',role:'bass'},
  keys:{name:'Keys',role:'chord'}, pad:{name:'Pad',role:'chord'}, pluck:{name:'Melody',role:'lead'},
};
const ROLE_COLOR = {kick:'--c-kick',snare:'--c-snare',hat:'--c-hat',perc:'--c-perc',bass:'--c-bass',chord:'--c-chord',lead:'--c-lead'};
const Q = [0,4,8,12], E8 = [0,2,4,6,8,10,12,14], OFF = [2,6,10,14], ODD = [1,3,5,7,9,11,13,15];

/* ---------- genres ---------- */
const GENRES = [
{ id:'house', group:'dance', name:'House', bpm:124, swing:0, key:'A minor', origin:'Chicago, 1980s',
  producers:'Frankie Knuckles, Larry Heard',
  blurb:'The root of most modern dance music: a kick on every beat, hats in the gaps, and warm chords on top. Kwaito, amapiano and afro house all grew from here.',
  rows:['kick','clap','hat','openHat','bass','keys'],
  chords:[{name:'Am7',notes:[57,60,64,67],root:33},{name:'Dm7',notes:[50,53,57,60],root:38},{name:'Fmaj7',notes:[53,57,60,64],root:41},{name:'G6',notes:[55,59,62,64],root:43}],
  related:[['kwaito','Kwaito is house slowed down in Soweto'],['afrohouse','House rhythms with African percussion'],['amapiano','House roots with a log drum twist']],
  lesson:[
    {title:'Four on the floor', targets:{kick:Q}, body:'House puts a kick on every one of the four beats. Chicago DJs like Frankie Knuckles built whole nights on that pulse.', task:'Add kicks on steps 1, 5, 9 and 13.'},
    {title:'Clap on 2 and 4', targets:{clap:[4,12]}, body:'A clap on the second and fourth beats gives the body something to lean on between kicks.', task:'Add claps on steps 5 and 13.'},
    {title:'The off-beat open hat', targets:{openHat:OFF}, body:'The open hat halfway between each kick is the classic house "tss". Kick, tss, kick, tss.', task:'Add open hats on steps 3, 7, 11 and 15.'},
    {title:'Closed hats for drive', targets:{hat:ODD}, body:'Closed hats on the in-between sixteenths make the groove feel like it is always moving forward.', task:'Add hi-hats on every even-numbered step: 2, 4, 6 and so on up to 16.'},
    {title:'Bass in the gaps', targets:{bass:OFF}, body:'House bass often plays on the off-beats, exactly where the kick is not. The two never fight, so both sound bigger.', task:'Add bass on steps 3, 7, 11 and 15.'},
    {title:'Deep chords', targets:{keys:[3,6,10]}, body:'Larry Heard\'s deep house used warm, jazzy seventh chords. Short stabs that land just off the beat give it a soulful bounce.', task:'Add key stabs on steps 4, 7 and 11.'},
  ],
  outro:'You built a classic house groove. Try taking the kick out for a few loops and bringing it back. That drop-out-and-return is how DJs build tension.' },

{ id:'kwaito', group:'dance', name:'Kwaito', bpm:106, swing:0.12, key:'G minor', origin:'Soweto, early 1990s',
  producers:'Oskido, Arthur Mafokate',
  blurb:'House music slowed down to a heavy, swaggering walk, with big basslines and chanted vocals. It became the sound of post-apartheid township youth.',
  rows:['kick','clap','openHat','hat','bass','keys'],
  chords:[{name:'Gm7',notes:[55,58,62,65],root:43},{name:'Cm7',notes:[51,55,58,60],root:36},{name:'E♭maj7',notes:[51,55,58,62],root:39},{name:'F7',notes:[53,57,60,63],root:41}],
  related:[['house','Kwaito started as house slowed down'],['amapiano','Amapiano grew out of kwaito'],['gqom','Durban\'s darker take on South African house']],
  lesson:[
    {title:'A slow, heavy kick', targets:{kick:Q}, body:'Kwaito keeps house\'s kick on every beat but drops the tempo to around 100 to 110 BPM. That slower pace gives it its laid-back swagger.', task:'Add kicks on steps 1, 5, 9 and 13.'},
    {title:'The house hat', targets:{openHat:OFF}, body:'The open hat between kicks came straight from the house records kwaito producers grew up on.', task:'Add open hats on steps 3, 7, 11 and 15.'},
    {title:'Clap on 2 and 4', targets:{clap:[4,12]}, body:'The clap locks everything in place so the bassline is free to move.', task:'Add claps on steps 5 and 13.'},
    {title:'The bassline is the star', targets:{bass:[0,3,6,10,13]}, body:'Kwaito lives on its basslines. This one bounces around the kick instead of copying it, which is what makes you want to move.', task:'Add bass on steps 1, 4, 7, 11 and 14.'},
    {title:'Synth stabs', targets:{keys:[2,10]}, body:'Short chord stabs on the off-beats leave space for chanted vocals, which were central to kwaito.', task:'Add keys on steps 3 and 11.'},
  ],
  outro:'That is the kwaito walk. Try moving one bass note and listen to how much the whole groove changes. In kwaito, the bassline is the song.' },

{ id:'amapiano', group:'dance', name:'Amapiano', bpm:112, swing:0, key:'F minor', origin:'Gauteng townships, 2010s',
  producers:'DJ Maphorisa, Kabza De Small',
  blurb:'Deep house chords and swung shakers wrapped around the log drum: a deep, bouncy, pitched drum that became the sound of South Africa.',
  rows:['kick','clap','shaker','openHat','logLow','logHigh','keys'],
  chords:[{name:'Fm9',notes:[53,56,60,63,67],root:41},{name:'D♭maj9',notes:[49,53,56,60,63],root:37},{name:'B♭m9',notes:[46,49,53,56,60],root:34},{name:'E♭6/9',notes:[51,55,58,60,65],root:39}],
  related:[['kwaito','Amapiano took kwaito\'s slow house groove and added the log drum'],['house','Built on the same steady kick and deep chords'],['afrohouse','Shares the jazzy chords and layered percussion']],
  extra:{shaker:[3,7,11,15],openHat:[10]},
  lesson:[
    {title:'Start with the kick', targets:{kick:Q}, body:'Amapiano usually sits around 110 to 115 BPM with a kick on every beat. That steady thump is what people dance to.', task:'Tap the four glowing squares on the Kick row, then press play.'},
    {title:'Clap on 2 and 4', targets:{clap:[4,12]}, body:'Kick, clap, kick, clap. This is the backbone of most dance music, from house to amapiano.', task:'Add claps on steps 5 and 13.'},
    {title:'Shakers between the kicks', targets:{shaker:OFF}, body:'Shakers fill the off-beats halfway between each kick and give the beat its forward motion. Producers often add more once the groove is set.', task:'Add shakers on steps 3, 7, 11 and 15.'},
    {title:'The log drum', targets:{logLow:[3,6,11],logHigh:[14]}, body:'This is the sound that makes amapiano amapiano. It lands between the kicks, never on them, and that push and pull is the whole groove. The low row plays each chord\'s root and the high row plays its fifth.', task:'Add Log low on steps 4, 7 and 12, and Log high on step 15.'},
    {title:'Jazzy keys', targets:{keys:[0,7,10]}, body:'Amapiano borrows warm chords from jazz and deep house. The chord changes every bar, and the log drum follows it automatically.', task:'Add key stabs on steps 1, 8 and 11.'},
    {title:'Add some swing', swing:0.25, swingSet:0.3, body:'Real players don\'t hit exactly on the grid. Swing pushes every second sixteenth a little late, and the shakers start to lilt.', task:'Drag Swing to about 30%.'},
  ],
  outro:'That is a complete amapiano groove, built the way producers build them: drums, then log drum, then chords. Now move a log drum hit, add open hats, or mute the kick for a breakdown.' },

{ id:'afrohouse', group:'dance', name:'Afro house', bpm:122, swing:0.08, key:'A minor', origin:'South Africa, 2000s',
  producers:'Black Coffee, Culoe De Song',
  blurb:'Hypnotic house built from layers of hand percussion, with long, deep chords floating over the top.',
  rows:['kick','hat','shaker','perc','bass','pad'],
  chords:[{name:'Am9',notes:[57,60,64,67,71],root:33},{name:'Dm9',notes:[50,53,57,60,64],root:38},{name:'Fmaj9',notes:[53,57,60,64,67],root:41},{name:'Em7',notes:[52,55,59,62],root:40}],
  related:[['house','House rhythms with African percussion'],['amapiano','Shares deep chords and layered percussion'],['afrobeats','Similar percussion language at a slower tempo']],
  lesson:[
    {title:'The steady pulse', targets:{kick:Q}, body:'Afro house keeps house\'s four-on-the-floor kick. Everything else is layered around it.', task:'Add kicks on steps 1, 5, 9 and 13.'},
    {title:'Off-beat hats', targets:{hat:OFF}, body:'A hat between each kick sets the basic house swing.', task:'Add hi-hats on steps 3, 7, 11 and 15.'},
    {title:'Congas talk back', targets:{perc:[3,7,10,13]}, body:'Hand drums are the heart of afro house. These conga hits answer the kick instead of doubling it, like a call and response.', task:'Add congas on steps 4, 8, 11 and 14.'},
    {title:'Shaker shimmer', targets:{shaker:ODD}, body:'A shaker on every in-between sixteenth adds a shimmer that keeps the percussion feeling alive.', task:'Add shakers on every even-numbered step.'},
    {title:'A rolling bass', targets:{bass:[3,10,14]}, body:'The bass stays sparse and off the beat, so it rolls under the percussion without crowding it.', task:'Add bass on steps 4, 11 and 15.'},
    {title:'Deep, long chords', targets:{pad:[0]}, body:'Black Coffee\'s sound pairs busy percussion with slow, emotional chords. One long chord per bar is enough.', task:'Add a pad on step 1.'},
  ],
  outro:'You layered a full afro house groove. Try muting everything except the percussion, then bring the pad back in. That contrast is what makes afro house hypnotic.' },

{ id:'gqom', group:'dance', name:'Gqom', bpm:126, swing:0, key:'A minor', origin:'Durban, 2010s',
  producers:'DJ Lag, Distruction Boyz',
  blurb:'Dark, raw and minimal. Gqom breaks up the steady house kick with lurching rhythms and rolling toms.',
  rows:['kick','clap','perc','hat','openHat','pad'], rowNames:{perc:'Toms'}, percPitch:0.6,
  chords:[{name:'Am',notes:[57,60,64],root:45},{name:'Am',notes:[57,60,64],root:45},{name:'F',notes:[53,57,60],root:41},{name:'E',notes:[52,56,59],root:40}],
  related:[['kwaito','Another South African twist on house, but darker and broken'],['afrohouse','Both lean on tribal percussion']],
  extra:{openHat:[14]},
  lesson:[
    {title:'A broken kick', targets:{kick:[0,6,10]}, body:'Unlike house, the gqom kick doesn\'t land on every beat. These three kicks pull against the beat and give gqom its dark, lurching feel.', task:'Add kicks on steps 1, 7 and 11.'},
    {title:'A clap to hold on to', targets:{clap:[4,12]}, body:'A clap on 2 and 4 keeps dancers anchored while the kick wanders.', task:'Add claps on steps 5 and 13.'},
    {title:'Rolling toms', targets:{perc:[3,7,11,14]}, body:'Toms and percussion are the heart of gqom. They fill the spaces the kick leaves open.', task:'Add toms on steps 4, 8, 12 and 15.'},
    {title:'Tight hats', targets:{hat:[2,5,10,13]}, body:'Short, uneven hats add tension instead of a smooth groove.', task:'Add hi-hats on steps 3, 6, 11 and 14.'},
    {title:'One dark chord', targets:{pad:[0]}, body:'Gqom is minimal. A single eerie chord per bar is all it needs.', task:'Add a pad on step 1.'},
  ],
  outro:'That is the raw gqom sound. Try adding one more kick somewhere unexpected. Gqom rewards breaking the pattern.' },

{ id:'boombap', group:'hiphop', name:'Boom bap', bpm:90, swing:0, key:'D minor', origin:'New York, late 1980s',
  producers:'DJ Premier, J Dilla',
  blurb:'Named after its two sounds: the boom of the kick and the bap of the snare. Hard drums under jazzy, sample-style chords.',
  rows:['kick','snare','hat','openHat','bass','keys'], rowNames:{keys:'Jazz keys'},
  chords:[{name:'Dm9',notes:[50,53,57,60,64],root:38},{name:'Gm9',notes:[55,58,62,65,69],root:43},{name:'B♭maj7',notes:[46,50,53,57],root:34},{name:'A7',notes:[55,57,61,64],root:33}],
  related:[['lofi','Lo-fi is boom bap slowed down and softened'],['trap','Same hip-hop roots, with heavier 808s']],
  lesson:[
    {title:'The boom', targets:{kick:[0,7,10]}, body:'The boom bap kick skips around instead of hitting every beat. That bounce is what makes heads nod.', task:'Add kicks on steps 1, 8 and 11.'},
    {title:'The bap', targets:{snare:[4,12]}, body:'A hard snare on 2 and 4. Boom, bap, boom, bap.', task:'Add snares on steps 5 and 13.'},
    {title:'Eighth-note hats', targets:{hat:E8}, body:'Straight eighth-note hats keep time under everything.', task:'Add hi-hats on every odd-numbered step: 1, 3, 5 and so on.'},
    {title:'Bass follows the kick', targets:{bass:[0,7,10]}, body:'In boom bap the bass usually doubles the kick, which makes each hit hit harder.', task:'Add bass on steps 1, 8 and 11.'},
    {title:'Jazzy chords', targets:{keys:[0,8]}, body:'Producers like DJ Premier built beats from chopped jazz and soul records. These chords stand in for a sample until the sample chopper arrives.', task:'Add jazz keys on steps 1 and 9.'},
    {title:'The Dilla feel', swing:0.3, swingSet:0.35, body:'J Dilla played his drums slightly off the grid, so his beats feel loose and human. Push the swing and hear it relax.', task:'Drag Swing to about 35%.'},
  ],
  outro:'That is a real boom bap beat. Try moving the second kick one step later and listen to how it changes the bounce.' },

{ id:'lofi', group:'hiphop', name:'Lo-fi hip-hop', bpm:80, swing:0, key:'F major', origin:'Online, 2010s',
  producers:'Nujabes, J Dilla', lofi:true, keysDecay:1.6,
  blurb:'Soft drums, dusty jazz chords and vinyl crackle. Boom bap slowed down until it feels like a rainy afternoon.',
  rows:['kick','snare','hat','bass','keys','pluck'],
  chords:[{name:'Fmaj7',notes:[53,57,60,64],root:41},{name:'Em7',notes:[52,55,59,62],root:40},{name:'Dm7',notes:[50,53,57,60],root:38},{name:'Cmaj7',notes:[48,52,55,59],root:36}],
  related:[['boombap','Lo-fi borrows boom bap\'s drums and Dilla\'s swing']],
  lesson:[
    {title:'A soft kick', targets:{kick:[0,7,10]}, body:'Lo-fi uses boom bap\'s kick pattern at a slower tempo. The crackle and warm filter you hear are part of the style.', task:'Add kicks on steps 1, 8 and 11.'},
    {title:'Lazy snare', targets:{snare:[4,12]}, body:'The snare still lands on 2 and 4, but everything is gentler.', task:'Add snares on steps 5 and 13.'},
    {title:'Hats', targets:{hat:E8}, body:'Steady eighth-note hats keep the slow groove from dragging.', task:'Add hi-hats on every odd-numbered step.'},
    {title:'Jazz chords', targets:{keys:[0,8]}, body:'The sound of Nujabes: seventh chords that ring out and drift down the scale.', task:'Add keys on steps 1 and 9.'},
    {title:'Round bass', targets:{bass:[0,10]}, body:'A simple bass on the root note gives the chords a floor.', task:'Add bass on steps 1 and 11.'},
    {title:'A little melody', targets:{pluck:[3,6,11,14]}, body:'The app picks notes from the current chord, so you only choose the rhythm. A few off-beat notes are enough.', task:'Add melody notes on steps 4, 7, 12 and 15.'},
    {title:'Lazy swing', swing:0.25, swingSet:0.3, body:'Lo-fi drums sit behind the beat. Swing makes them feel unhurried.', task:'Drag Swing to about 30%.'},
  ],
  outro:'Your lo-fi beat is ready to study to. Try dropping the tempo to 72 and see how the mood changes.' },

{ id:'trap', group:'hiphop', name:'Trap', bpm:140, swing:0, key:'C minor', origin:'Atlanta, 2000s',
  producers:'Metro Boomin, Southside',
  blurb:'Booming 808 bass, rattling hi-hat rolls and a half-time snare. Kanye\'s 808s & Heartbreak showed how emotional the 808 could sound.',
  rows:['kick','snare','hat','openHat','sub808','pluck'],
  chords:[{name:'Cm',notes:[60,63,67],root:36},{name:'A♭',notes:[56,60,63],root:32},{name:'Fm',notes:[53,56,60],root:41},{name:'G',notes:[55,59,62],root:43}],
  related:[['drill','Drill took trap\'s 808s and hats and made them darker'],['boombap','Same hip-hop roots']],
  extra:{openHat:[10]},
  lesson:[
    {title:'Half-time snare', targets:{snare:[8]}, body:'Trap runs fast, around 140 BPM, but puts the snare only on beat 3. That half-time feel makes it hit slow and heavy.', task:'Add a snare on step 9.'},
    {title:'The kick', targets:{kick:[0,7,11]}, body:'A few well-placed kicks set up the bounce for the 808.', task:'Add kicks on steps 1, 8 and 12.'},
    {title:'The 808', targets:{sub808:[0,7,11]}, body:'The 808 is trap\'s bassline: a deep, long note that hits with the kick. It follows the chords automatically.', task:'Add 808s on steps 1, 8 and 12.'},
    {title:'Eighth-note hats', targets:{hat:E8}, body:'Steady hats are the canvas for trap\'s signature rolls.', task:'Add hi-hats on every odd-numbered step.'},
    {title:'Hi-hat rolls', rolls:{hat:[6,14]}, body:'Tap a hi-hat square again to turn it into a roll (striped). Quick bursts of hats are the most recognisable sound in trap.', task:'Turn the hats on steps 7 and 15 into rolls.'},
    {title:'A dark melody', targets:{pluck:[0,3,6,10]}, body:'Producers like Metro Boomin often lay an eerie, simple melody over the 808. The app picks the notes from the chord, so you choose the rhythm.', task:'Add melody notes on steps 1, 4, 7 and 11.'},
  ],
  outro:'That is a full trap beat. Try adding a roll in a new spot, or muting the melody for the verse and bringing it back for the hook.' },

{ id:'drill', group:'hiphop', name:'Drill', bpm:142, swing:0, key:'F♯ minor', origin:'Chicago, then London and Brooklyn, 2010s',
  producers:'Axl Beats, M1OnTheBeat', subDecay:0.75,
  blurb:'Trap\'s darker cousin: off-beat snares, stuttering hats and an 808 that carries the melody.',
  rows:['kick','snare','hat','sub808','pluck'],
  chords:[{name:'F♯m',notes:[54,57,61],root:42},{name:'D',notes:[50,54,57],root:38},{name:'Bm',notes:[47,50,54],root:35},{name:'C♯',notes:[49,53,56],root:37}],
  related:[['trap','Drill grew out of trap']],
  lesson:[
    {title:'The drill snare', targets:{snare:[8,13]}, body:'Drill keeps trap\'s snare on beat 3 and adds a second, off-beat snare. That late hit is what makes drill feel tense.', task:'Add snares on steps 9 and 14.'},
    {title:'Sparse kick', targets:{kick:[0,10]}, body:'The kick stays out of the way because the 808 does most of the work.', task:'Add kicks on steps 1 and 11.'},
    {title:'Stuttering hats', targets:{hat:[0,3,6,10,12]}, rolls:{hat:[14]}, body:'Drill hats skip and stutter instead of running straight. Tap a square twice for a roll.', task:'Add hats on steps 1, 4, 7, 11 and 13, plus a roll on step 15.'},
    {title:'The moving 808', targets:{sub808:[0,6,11]}, body:'In drill the 808 is almost a melody of its own. Gliding 808 slides are coming in a later version.', task:'Add 808s on steps 1, 7 and 12.'},
    {title:'An eerie melody', targets:{pluck:[0,2,5,8,11]}, body:'Dark, repeating piano or string lines sit on top of drill beats.', task:'Add melody notes on steps 1, 3, 6, 9 and 12.'},
  ],
  outro:'That is the drill bounce. Try moving the second snare one step and listen to how the tension changes.' },

{ id:'afrobeats', group:'hiphop', name:'Afrobeats', bpm:104, swing:0.1, key:'A♭ major', origin:'Lagos and Accra, 2000s',
  producers:'Sarz, P2J',
  blurb:'Bouncy, sunny and built on a 3-3-2 rhythm that also runs through reggaeton and dancehall.',
  rows:['kick','clap','rim','shaker','bass','pluck'],
  chords:[{name:'A♭maj7',notes:[56,60,63,67],root:44},{name:'Fm7',notes:[53,56,60,63],root:41},{name:'D♭maj7',notes:[49,53,56,60],root:37},{name:'E♭6',notes:[51,55,58,60],root:39}],
  related:[['afrohouse','Shares the same percussion language'],['amapiano','Often blended together in crossover hits']],
  lesson:[
    {title:'The 3-3-2 rhythm', targets:{rim:[0,3,6,8,11,14]}, body:'Afrobeats groups eight steps as 3 + 3 + 2. Play it on the rim and you will hear the bounce straight away.', task:'Add rims on steps 1, 4, 7, 9, 12 and 15.'},
    {title:'A light kick', targets:{kick:[0,8]}, body:'The kick stays simple and lets the rim carry the rhythm.', task:'Add kicks on steps 1 and 9.'},
    {title:'Clap on 2 and 4', targets:{clap:[4,12]}, body:'The clap gives dancers a steady place to land.', task:'Add claps on steps 5 and 13.'},
    {title:'Shakers', targets:{shaker:OFF}, body:'Shakers on the off-beats add lift.', task:'Add shakers on steps 3, 7, 11 and 15.'},
    {title:'A sparse bass', targets:{bass:[0,6,10]}, body:'Afrobeats basslines are melodic but leave lots of space for vocals.', task:'Add bass on steps 1, 7 and 11.'},
    {title:'A guitar-like melody', targets:{pluck:[1,4,9,12]}, body:'Bright, plucked melodies are a big part of the sound. The app picks notes from the chord.', task:'Add melody notes on steps 2, 5, 10 and 13.'},
  ],
  outro:'That is the afrobeats bounce. Try moving the rim pattern by one step and hear how the 3-3-2 feel shifts.' },
];
const GROUPS = [['dance','Dance floor'],['hiphop','Hip-hop and Afro-pop']];
const byId = Object.fromEntries(GENRES.map(g=>[g.id,g]));
GENRES.forEach(g=>{ g.lessonFull=[...g.lesson,{final:true,title:'Make it yours',body:g.outro,task:'No rules from here. Tap anything.'}]; });

/* ---------- song skeletons: [name, type, bars, layers, note, flags] ---------- */
const ALL='all';
const SK = {
house:{stream:[
  ['Intro','intro',4,['kick','hat','openHat'],'A short intro. In a streaming edit the groove arrives within seconds.'],
  ['Drop','hook',8,ALL,'The full groove with chords straight away. This is your 15-second clip moment.',{clip:true}],
  ['Breakdown','break',8,['keys','hat'],'Take the kick out. Removing it now makes its return hit much harder.'],
  ['Build','build',4,['hat','openHat','clap'],'The filter opens and a riser climbs, so listeners feel the drop coming.',{build:true}],
  ['Drop 2','hook',32,ALL,'Everything back in for the main stretch of the song.'],
  ['Outro','outro',4,['kick','hat'],'Strip back to drums and end cleanly.']],
 dj:[
  ['DJ intro','intro',32,['kick','hat'],'DJs need 16 to 32 bars of plain drums to blend your track into the one before it.'],
  ['Groove','verse',16,['kick','hat','openHat','clap','bass'],'Bass and clap come in. Still no chords, so it stays easy to mix.'],
  ['Main','hook',32,ALL,'The chords arrive and the full groove plays.'],
  ['Breakdown','break',16,['keys'],'Only chords. The dance floor gets a breather.'],
  ['Build','build',8,['hat','openHat','clap'],'Filter sweep and riser into the drop.',{build:true}],
  ['Drop','hook',32,ALL,'The peak of the track.',{clip:true}],
  ['DJ outro','outro',32,['kick','hat'],'Plain drums again, so the next DJ can mix out.']]},
kwaito:{stream:[
  ['Intro','intro',2,['kick','openHat','keys'],'Two bars to set the tempo, then straight in.'],
  ['Hook','hook',8,ALL,'Kwaito hooks were chanted call-and-response lines. Leading with the hook makes the song instantly recognisable.',{clip:true}],
  ['Verse 1','verse',16,['kick','clap','openHat','hat','bass'],'The chords drop out to leave room for the vocal. The bassline carries the verse.'],
  ['Hook','hook',8,ALL,'The hook returns with everything in.'],
  ['Verse 2','verse',8,['kick','clap','openHat','hat','bass','keys'],'A shorter second verse keeps the song tight.'],
  ['Hook','hook',8,ALL,'Final hook.'],
  ['Outro','outro',4,['kick','bass'],'Kick and bass ride it out.']]},
amapiano:{stream:[
  ['Intro','intro',4,['keys','shaker'],'Many amapiano tracks open on piano chords and shakers with no kick, which sets the mood fast.'],
  ['Log drum drop','hook',8,ALL,'The kick and log drum land together. This is the moment people clip and dance to, so it comes early.',{clip:true}],
  ['Verse','verse',32,['kick','clap','shaker','keys','logLow'],'The log drum simplifies under the vocals so the words come through.'],
  ['Log drum break','break',4,['logLow','logHigh','keys'],'The kick drops out and the log drum plays almost alone. This break is a signature amapiano move.'],
  ['Build','build',2,['shaker','openHat','clap'],'A short filter rise into the return.',{build:true}],
  ['Log drum drop','hook',16,ALL,'Everything back for the final stretch.'],
  ['Outro','outro',4,['keys','shaker'],'Back to piano and shakers, mirroring the intro.']],
 dj:[
  ['DJ intro','intro',16,['kick','shaker','openHat'],'Plain drums so DJs can mix in.'],
  ['Keys enter','verse',16,['kick','clap','shaker','openHat','keys'],'The chords arrive, but the log drum is held back.'],
  ['Log drum entry','hook',32,ALL,'In the long version the log drum entry is the payoff, often more than a minute in.',{clip:true}],
  ['Log drum break','break',16,['logLow','logHigh','keys'],'The kick drops out and the log drum takes the spotlight.'],
  ['Build','build',8,['shaker','openHat','clap'],'Riser and filter into the return.',{build:true}],
  ['Main','hook',32,ALL,'Full groove.'],
  ['DJ outro','outro',16,['kick','shaker'],'Drums only for mixing out. Full-length amapiano tracks often run six minutes or more.']]},
afrohouse:{stream:[
  ['Intro','intro',4,['perc','shaker'],'Open on percussion so the style is clear in the first seconds.'],
  ['Drop','hook',8,ALL,'The full groove with the pad, early, as your clip moment.',{clip:true}],
  ['Groove','verse',16,['kick','hat','shaker','perc','bass'],'The pad steps back and the percussion carries the hypnotic middle.'],
  ['Breakdown','break',8,['pad','perc'],'No kick. Just chords and congas.'],
  ['Build','build',4,['hat','shaker','perc'],'Filter and riser lift into the drop.',{build:true}],
  ['Drop','hook',32,ALL,'Everything back.'],
  ['Outro','outro',4,['perc','shaker'],'Percussion fades the track out.']],
 dj:[
  ['DJ intro','intro',32,['kick','hat','perc'],'A long percussion intro for mixing. Afro house sets are built from long blends.'],
  ['Groove','verse',32,['kick','hat','shaker','perc','bass'],'The bass enters and the groove deepens slowly.'],
  ['Breakdown','break',16,['pad','perc'],'The emotional moment: deep chords over congas, no kick.'],
  ['Build','build',8,['hat','shaker','perc'],'Tension builds with the riser.',{build:true}],
  ['Main','hook',32,ALL,'The full drop.',{clip:true}],
  ['DJ outro','outro',32,['kick','hat','perc'],'Percussion only, ready for the next blend.']]},
gqom:{stream:[
  ['Intro','intro',2,['perc'],'Toms alone. Gqom gets to the point.'],
  ['Main','hook',8,ALL,'The full broken groove arrives almost immediately.',{clip:true}],
  ['Break','break',4,['pad','perc'],'Kick out. Only the dark chord and toms.'],
  ['Main','verse',16,ALL,'Gqom is built on repetition. The groove keeps hammering.'],
  ['Strip','break',4,['kick','perc'],'Strip back to kick and toms for raw tension.'],
  ['Build','build',2,['perc','hat'],'A quick rise.',{build:true}],
  ['Main','hook',8,ALL,'Final hit.'],
  ['Outro','outro',4,['perc','kick'],'Ends as raw as it started.']]},
boombap:{stream:[
  ['Intro','intro',2,['keys'],'The sample-style chords play alone so the listener recognises the loop.'],
  ['Hook','hook',8,ALL,'Modern rap often opens on the chorus to grab listeners in the first seconds.',{clip:true}],
  ['Verse 1','verse',16,['kick','snare','hat','bass','keys'],'Rap verses are traditionally 16 bars. The open hat drops out to leave space.'],
  ['Hook','hook',8,ALL,'Hooks are traditionally 8 bars.'],
  ['Verse 2','verse',16,['kick','snare','hat','bass','keys'],'Second verse.'],
  ['Hook','hook',8,ALL,'Final hook.'],
  ['Outro','outro',2,['keys'],'The loop alone again to close.']]},
lofi:{stream:[
  ['Intro','intro',2,['keys'],'Chords and crackle set the mood.'],
  ['Loop A','hook',8,['kick','snare','hat','bass','keys'],'The drums come in. Lo-fi is made to sit in the background, so there is no big drop.',{clip:true}],
  ['Loop B','verse',8,ALL,'The melody enters to give the track a second idea.'],
  ['Break','break',4,['keys','pluck'],'The drums drop out for a breath.'],
  ['Loop B','verse',8,ALL,'Back in.'],
  ['Outro','outro',2,['keys'],'Ends where it started. Lo-fi tracks are often short, made for playlists.']]},
trap:{stream:[
  ['Intro','intro',2,['pluck'],'The melody alone, often where the producer tag goes. Only a few seconds.'],
  ['Hook','hook',8,ALL,'Hook first. The best part of the beat arrives in the first seconds.',{clip:true}],
  ['Verse 1','verse',16,['kick','snare','hat','sub808'],'The melody drops out to give the rapper space. The 808 and hats carry it.'],
  ['Hook','hook',8,ALL,'Everything back for the hook.'],
  ['Verse 2','verse',16,['kick','snare','hat','sub808','pluck'],'The melody returns under the second verse for variety.'],
  ['Hook','hook',8,ALL,'Final hook.'],
  ['Outro','outro',2,['pluck'],'Melody alone to close. The whole song is under two minutes, which is common now.']]},
drill:{stream:[
  ['Intro','intro',2,['pluck'],'The eerie melody alone.'],
  ['Hook','hook',8,ALL,'Straight into the hook.',{clip:true}],
  ['Verse 1','verse',16,['kick','snare','hat','sub808'],'Drums and 808 only. Leaving the melody out makes the flow stand out.'],
  ['Hook','hook',8,ALL,'Hook.'],
  ['Verse 2','verse',16,['kick','snare','hat','sub808','pluck'],'The melody comes back under the second verse.'],
  ['Hook','hook',8,ALL,'Final hook.'],
  ['Outro','outro',2,['pluck'],'Melody out.']]},
afrobeats:{stream:[
  ['Intro','intro',2,['pluck','shaker'],'A bright melody sets the mood in seconds.'],
  ['Chorus','hook',8,ALL,'Opening on the chorus means the catchiest part is the first thing people hear.',{clip:true}],
  ['Verse 1','verse',8,['kick','rim','shaker','bass'],'Pull back to the rhythm section so the vocal sits on top.'],
  ['Pre-chorus','build',4,['rim','shaker','pluck'],'The kick drops out to create lift before the chorus.',{build:true}],
  ['Chorus','hook',8,ALL,'Full groove.'],
  ['Verse 2','verse',8,['kick','rim','shaker','bass','pluck'],'Second verse, with the melody for variety.'],
  ['Pre-chorus','build',4,['rim','shaker','pluck'],'Lift again.',{build:true}],
  ['Chorus','hook',8,ALL,'Final chorus.'],
  ['Outro','outro',4,['pluck','shaker'],'Melody and shakers fade out.']]},
};
const NOW = {
  house:'House climbed from the fifth to the second most-downloaded genre on Splice between 2023 and 2025.',
  afrohouse:'Splice and MIDiA named afro house the sound of the year after its downloads grew 778% in 2025.',
  amapiano:'The big names are crossing over. Kabza De Small and DJ Maphorisa previewed afro house for Scorpion Kings Live, and producers like Sam Deep are folding kwaito back in.',
  trap:'Trap is still dominant, but its growth is slowing. Rage and pluggnb are the offshoots rising underground.',
  boombap:'Boom bap is coming back. New York had the biggest rise in boom bap sound downloads in the US.',
};
const TYPE_COLOR = {intro:'--muted',outro:'--muted',verse:'--c-bass',hook:'--accent',break:'--c-chord',build:'--c-snare'};
const STREAM_TEXT = 'Modern songs are built hook-first. Most hits now land their best moment in the first 15 seconds, because that is when people decide whether to keep listening on TikTok and streaming apps. Intros are shrinking or disappearing.';
const DJ_TEXT = 'DJ mixes break the 15-second rule on purpose. Long intros and outros of plain drums give DJs room to blend tracks, so the main moment arrives much later. Club tracks are often released in both versions.';
const fmt = s => { const t=Math.round(s); return `${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`; };

/* ---------- state ---------- */
const blankFor = g => Object.fromEntries(g.rows.map(r=>[r,Array(16).fill(0)]));
const freshFor = g => ({pattern:blankFor(g),lesson:0,swing:g.swing,bpm:g.bpm,muted:{}});
let store = {current:'amapiano', g:{}};
try {
  const s = JSON.parse(localStorage.getItem('bb-v1')||'null');
  if (s && s.g) store = s;
  else {
    const old = JSON.parse(localStorage.getItem('ldl-v1')||'null');
    if (old && old.pattern){
      const st = freshFor(byId.amapiano);
      Object.entries(old.pattern).forEach(([k,arr])=>{ const key = k==='hat'?'openHat':k; if(st.pattern[key]) st.pattern[key]=arr.map(v=>v?1:0); });
      st.lesson = Math.min(old.lesson||0, byId.amapiano.lessonFull.length-1); st.swing=old.swing||0; st.bpm=old.bpm||112;
      store.g.amapiano = st;
    }
  }
} catch(e) {}
if (!byId[store.current]) store.current='amapiano';
const save = () => { try { localStorage.setItem('bb-v1', JSON.stringify(store)); } catch(e) {} };
function gs(id){
  const g=byId[id];
  if (!store.g[id]) store.g[id]=freshFor(g);
  const s=store.g[id]; g.rows.forEach(r=>{ if(!s.pattern[r]) s.pattern[r]=Array(16).fill(0); });
  if (!s.muted) s.muted={};
  s.lesson=Math.min(s.lesson||0, g.lessonFull.length-1);
  return s;
}
let G = byId[store.current], S = gs(G.id);

function variantOf(){ return (SK[G.id].dj && S.variant==='dj') ? 'dj' : 'stream'; }
function sections(){
  const v=variantOf(), defs=SK[G.id][v];
  if (!S.arr) S.arr={};
  if (!S.arr[v] || S.arr[v].length!==defs.length) S.arr[v]=defs.map(d=>d[3]===ALL?[...G.rows]:d[3].slice());
  return defs.map((d,i)=>({name:d[0],type:d[1],bars:d[2],note:d[4],clip:!!(d[5]&&d[5].clip),build:!!(d[5]&&d[5].build),layers:S.arr[v][i]}));
}
function refPattern(g){
  const p=blankFor(g);
  g.lesson.forEach(L=>{
    if(L.targets) Object.entries(L.targets).forEach(([r,ix])=>ix.forEach(k=>p[r][k]=1));
    if(L.rolls) Object.entries(L.rolls).forEach(([r,ix])=>ix.forEach(k=>p[r][k]=2));
  });
  if(g.extra) Object.entries(g.extra).forEach(([r,ix])=>ix.forEach(k=>{ if(!p[r][k]) p[r][k]=1; }));
  return p;
}
const refSwing = g => { let s=g.swing; g.lesson.forEach(L=>{ if(L.swingSet!=null) s=L.swingSet; }); return s; };

/* ---------- audio ---------- */
let ctx, master, tone, fxIn, noiseBuf, curve;
function initAudio(){
  if (ctx) return;
  ctx = new (window.AudioContext||window.webkitAudioContext)();
  const comp=ctx.createDynamicsCompressor(); comp.threshold.value=-14; comp.ratio.value=4;
  master=ctx.createGain(); master.gain.value=0.8;
  tone=ctx.createBiquadFilter(); tone.type='lowpass'; tone.frequency.value=20000;
  master.connect(tone); tone.connect(comp); comp.connect(ctx.destination);
  fxIn=ctx.createGain(); fxIn.gain.value=0.2;
  const dly=ctx.createDelay(1); dly.delayTime.value=0.27;
  const fb=ctx.createGain(); fb.gain.value=0.28;
  const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2500;
  fxIn.connect(dly); dly.connect(lp); lp.connect(fb); fb.connect(dly); lp.connect(master);
  noiseBuf=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);
  const d=noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  curve=new Float32Array(1024); for(let i=0;i<1024;i++){ const x=i/512-1; curve[i]=Math.tanh(2.6*x); }
  applyTone();
}
function applyTone(){ if(tone) tone.frequency.setTargetAtTime(G.lofi?2600:20000, ctx.currentTime, 0.05); }
const mtof = m => 440*Math.pow(2,(m-69)/12);
function noise(t,dur){ const s=ctx.createBufferSource(); s.buffer=noiseBuf; s.start(t,Math.random()*0.5); s.stop(t+dur); return s; }
function env(g,t,peak,att,dec){ g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(peak,t+att); g.gain.exponentialRampToValueAtTime(0.001,t+att+dec); }
function filt(type,f,q){ const b=ctx.createBiquadFilter(); b.type=type; b.frequency.value=f; if(q) b.Q.value=q; return b; }
function osc(type,f){ const o=ctx.createOscillator(); o.type=type; o.frequency.value=f; return o; }

const V = {
  kick(t){ const o=osc('sine',150), g=ctx.createGain();
    o.frequency.setValueAtTime(150,t); o.frequency.exponentialRampToValueAtTime(45,t+0.12);
    g.gain.setValueAtTime(1,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.42);
    o.connect(g); g.connect(master); o.start(t); o.stop(t+0.45); },
  snare(t){ const s=noise(t,0.25), f=filt('highpass',1500), g=ctx.createGain();
    env(g,t,0.55,0.002,0.18); s.connect(f); f.connect(g); g.connect(master);
    const o=osc('triangle',200), g2=ctx.createGain(); o.frequency.exponentialRampToValueAtTime(150,t+0.08);
    env(g2,t,0.45,0.002,0.1); o.connect(g2); g2.connect(master); o.start(t); o.stop(t+0.15); },
  clap(t){ const s=noise(t,0.32), f=filt('bandpass',1300,0.9), g=ctx.createGain();
    g.gain.setValueAtTime(0,t);
    for(let i=0;i<3;i++){ const tt=t+i*0.012; g.gain.setValueAtTime(0.75,tt); g.gain.exponentialRampToValueAtTime(0.06,tt+0.011); }
    g.gain.setValueAtTime(0.6,t+0.036); g.gain.exponentialRampToValueAtTime(0.001,t+0.28);
    s.connect(f); f.connect(g); g.connect(master); g.connect(fxIn); },
  rim(t){ const o=osc('triangle',1750), f=filt('bandpass',1800,2), g=ctx.createGain();
    env(g,t,0.5,0.001,0.045); o.connect(f); f.connect(g); g.connect(master); o.start(t); o.stop(t+0.07); },
  perc(t,step){ const base=(step%4===3?330:220)*(G.percPitch||1), o=osc('sine',base), g=ctx.createGain();
    o.frequency.setValueAtTime(base*1.35,t); o.frequency.exponentialRampToValueAtTime(base,t+0.03);
    env(g,t,0.55,0.002,0.22); o.connect(g); g.connect(master); o.start(t); o.stop(t+0.28); },
  hat(t,v=1){ const s=noise(t,0.08), f=filt('highpass',8000), g=ctx.createGain();
    env(g,t,0.2*v,0.001,0.045); s.connect(f); f.connect(g); g.connect(master); },
  openHat(t){ const s=noise(t,0.35), f=filt('highpass',7600), g=ctx.createGain();
    g.gain.setValueAtTime(0.17,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.32); s.connect(f); f.connect(g); g.connect(master); },
  shaker(t,step){ const s=noise(t,0.1), f=filt('highpass',5200), g=ctx.createGain();
    env(g,t,step%4===2?0.3:0.18,0.008,0.065); s.connect(f); f.connect(g); g.connect(master); },
  log(t,midi){ const f0=mtof(midi), o1=osc('sine',f0), o2=osc('triangle',f0*2), g2=ctx.createGain(), mix=ctx.createGain(), sh=ctx.createWaveShaper(), lp=filt('lowpass',1400), g=ctx.createGain();
    o1.frequency.setValueAtTime(f0*2.3,t); o1.frequency.exponentialRampToValueAtTime(f0,t+0.05);
    o2.frequency.setValueAtTime(f0*4,t); o2.frequency.exponentialRampToValueAtTime(f0*2,t+0.05);
    g2.gain.value=0.35; sh.curve=curve; env(g,t,0.75,0.004,0.5);
    o1.connect(mix); o2.connect(g2); g2.connect(mix); mix.connect(sh); sh.connect(lp); lp.connect(g); g.connect(master);
    o1.start(t); o2.start(t); o1.stop(t+0.55); o2.stop(t+0.55); },
  bass(t,midi){ const f0=mtof(midi), o=osc('sawtooth',f0), o2=osc('sine',f0), lp=filt('lowpass',700,4), g=ctx.createGain();
    lp.frequency.setValueAtTime(900,t); lp.frequency.exponentialRampToValueAtTime(220,t+0.25);
    env(g,t,0.32,0.004,0.32); o.connect(lp); o2.connect(lp); lp.connect(g); g.connect(master);
    o.start(t); o2.start(t); o.stop(t+0.4); o2.stop(t+0.4); },
  sub(t,midi){ const f0=mtof(midi), o=osc('sine',f0), sh=ctx.createWaveShaper(), g=ctx.createGain(), dec=G.subDecay||1.0;
    o.frequency.setValueAtTime(f0*1.6,t); o.frequency.exponentialRampToValueAtTime(f0,t+0.035);
    sh.curve=curve; env(g,t,0.6,0.003,dec); o.connect(sh); sh.connect(g); g.connect(master); o.start(t); o.stop(t+dec+0.05); },
  keys(t,ch){ const dec=G.keysDecay||0.75;
    ch.notes.forEach((m,i)=>{ const tt=t+i*0.004, o=osc('triangle',mtof(m)), o2=osc('sine',mtof(m)), f=filt('lowpass',3200), g=ctx.createGain();
      o2.detune.value=6; f.frequency.setValueAtTime(3200,tt); f.frequency.exponentialRampToValueAtTime(700,tt+0.5);
      env(g,tt,0.055,0.008,dec); o.connect(f); o2.connect(f); f.connect(g); g.connect(master); g.connect(fxIn);
      o.start(tt); o2.start(tt); o.stop(tt+dec+0.05); o2.stop(tt+dec+0.05); }); },
  pad(t,ch,len){ ch.notes.forEach(m=>{ const o=osc('sawtooth',mtof(m)), o2=osc('sawtooth',mtof(m)), f=filt('lowpass',1000), g=ctx.createGain();
      o2.detune.value=9; o.detune.value=-7;
      g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(0.028,t+0.18); g.gain.setValueAtTime(0.028,t+len*0.85); g.gain.exponentialRampToValueAtTime(0.001,t+len+0.3);
      o.connect(f); o2.connect(f); f.connect(g); g.connect(master); g.connect(fxIn);
      o.start(t); o2.start(t); o.stop(t+len+0.35); o2.stop(t+len+0.35); }); },
  pluck(t,ch,step){ const order=[0,2,1,3,2,4,1,3], n=ch.notes, m=n[order[step%8]%n.length]+12;
    const o=osc('square',mtof(m)), lp=filt('lowpass',3000), g=ctx.createGain();
    lp.frequency.setValueAtTime(3200,t); lp.frequency.exponentialRampToValueAtTime(500,t+0.3);
    env(g,t,0.07,0.003,0.38); o.connect(lp); lp.connect(g); g.connect(master); g.connect(fxIn); o.start(t); o.stop(t+0.45); },
  crackle(t){ const s=noise(t,0.004), f=filt('highpass',2000), g=ctx.createGain(); g.gain.value=0.04+Math.random()*0.08; s.connect(f); f.connect(g); g.connect(master); },
};
function trigger(row,t,step,bar,val,sd){
  const ch=G.chords[bar%G.chords.length];
  switch(row){
    case 'hat': if(val===2){ for(let i=0;i<3;i++) V.hat(t+i*sd/3, i?0.65:1); } else V.hat(t); break;
    case 'logLow': V.log(t,ch.root); break;
    case 'logHigh': V.log(t,ch.root+7); break;
    case 'bass': V.bass(t,ch.root); break;
    case 'sub808': V.sub(t,ch.root); break;
    case 'keys': V.keys(t,ch); break;
    case 'pad': V.pad(t,ch,sd*16*0.95); break;
    case 'pluck': V.pluck(t,ch,step); break;
    default: V[row](t,step);
  }
}

/* ---------- scheduler ---------- */
let playing=false, timer=null, nextTime=0, step=0, bar=0, queue=[], shownStep=-1;
let mode='loop', secs=[], REF=null, songSec=0, songBar=0, loopSec=null, shownSec=-1, risers=[];
const baseTone = () => G.lofi ? 2600 : 20000;
const secLen = i => store.quick ? Math.min(2, secs[i].bars) : secs[i].bars;
function riser(t,dur){
  const s=ctx.createBufferSource(); s.buffer=noiseBuf; s.loop=true;
  const f=filt('bandpass',300,1.2), g=ctx.createGain();
  f.frequency.setValueAtTime(300,t); f.frequency.exponentialRampToValueAtTime(7000,t+dur);
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.13,t+dur); g.gain.linearRampToValueAtTime(0.0001,t+dur+0.03);
  s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t+dur+0.05); risers.push(s);
}
function sectionStart(i,t,sd){
  const dur=secLen(i)*16*sd;
  tone.frequency.cancelScheduledValues(t);
  if(secs[i].build){ tone.frequency.setValueAtTime(450,t); tone.frequency.exponentialRampToValueAtTime(baseTone(),t+dur); riser(t,dur); }
  else tone.frequency.setValueAtTime(baseTone(),t);
}
function schedule(){
  const sd=60/S.bpm/4, sw = mode==='song' ? refSwing(G) : S.swing;
  while(nextTime < ctx.currentTime+0.12){
    if(mode==='song' && step===0){
      if(songBar>=secLen(songSec)){ songSec = loopSec!=null ? loopSec : (songSec+1)%secs.length; songBar=0; }
      if(songBar===0){ bar=0; sectionStart(songSec,nextTime,sd); }
    }
    const t=nextTime+(step%2 ? sw*sd*0.66 : 0);
    const pat = mode==='song' ? REF : S.pattern, mask = mode==='song' ? secs[songSec].layers : null;
    G.rows.forEach(r=>{ const v=pat[r][step]; if(v && !S.muted[r] && (!mask || mask.includes(r))) trigger(r,t,step,bar,v,sd); });
    if (G.lofi){ for(let i=0;i<2;i++) if(Math.random()<0.35) V.crackle(nextTime+Math.random()*sd); }
    queue.push({step,bar,time:t,sec:songSec,sbar:songBar});
    nextTime+=sd; step++;
    if(step===16){ step=0; bar=(bar+1)%G.chords.length; if(mode==='song') songBar++; }
  }
}
function draw(){
  if(!playing) return;
  while(queue.length && queue[0].time<=ctx.currentTime){
    const q=queue.shift();
    if(mode==='loop'){
      setPlayhead(q.step);
      if(q.step===0) nowPlaying.innerHTML=`Bar <b>${q.bar+1}</b> of ${G.chords.length} · chord <b>${G.chords[q.bar].name}</b>`;
    } else if(secs[q.sec]) {
      if(q.sec!==shownSec){ shownSec=q.sec; markSections(); }
      const len=secLen(q.sec), el=document.querySelector(`.sec-h[data-sec="${q.sec}"] .prog`);
      if(el) el.style.width=((q.sbar*16+q.step+1)/(len*16)*100)+'%';
      if(q.step===0) nowPlaying.innerHTML=`<b>${secs[q.sec].name}</b> · bar ${q.sbar+1} of ${len} · <b>${G.chords[q.bar].name}</b>`;
    }
  }
  requestAnimationFrame(draw);
}
function start(from=0, loop=null){
  initAudio(); ctx.resume();
  if(playing) stop();
  mode = S.mode==='song' ? 'song' : 'loop';
  if(mode==='song'){ secs=sections(); REF=refPattern(G); songSec=from; songBar=0; loopSec=loop; shownSec=-1; }
  applyTone();
  playing=true; step=0; bar=0; queue=[]; nextTime=ctx.currentTime+0.06;
  schedule(); timer=setInterval(schedule,25); requestAnimationFrame(draw);
  playBtn.setAttribute('aria-label','Stop'); playIcon.innerHTML='<rect x="6" y="6" width="12" height="12" rx="1.5"/>';
}
function stop(){
  playing=false; clearInterval(timer); setPlayhead(-1);
  risers.forEach(s=>{ try{ s.stop(); }catch(e){} }); risers=[];
  if(tone){ tone.frequency.cancelScheduledValues(ctx.currentTime); tone.frequency.setValueAtTime(baseTone(),ctx.currentTime); }
  shownSec=-1; loopSec=null; markSections();
  playBtn.setAttribute('aria-label','Play'); playIcon.innerHTML='<path d="M7 4.5v15l13-7.5z"/>';
  nowPlaying.textContent = S.mode==='song' ? 'Press play to hear the whole song' : 'Press play to hear your loop';
}

/* ---------- UI ---------- */
const $=id=>document.getElementById(id);
const grid=$('grid'), playBtn=$('play'), playIcon=$('playIcon'), nowPlaying=$('nowPlaying');
let cells={}, cols=[], nums=[], labels={};
const rowName = r => (G.rowNames && G.rowNames[r]) || ROWDEF[r].name;

function renderShelf(){
  $('shelf').innerHTML = GROUPS.map(([gid,label])=>`<div class="shelf-group"><p class="shelf-label">${label}</p><div class="chips">${
    GENRES.filter(g=>g.group===gid).map(g=>`<button class="chip" data-g="${g.id}" aria-pressed="${g.id===G.id}">${g.name}<small>${g.bpm}</small></button>`).join('')
  }</div></div>`).join('');
}
function renderCard(){
  $('genreCard').innerHTML = `<div>
      <div class="meta"><span><b>${G.bpm}</b> BPM</span><span>Key <b>${G.key}</b></span><span>${G.origin}</span></div>
      <h2>${G.name}</h2>
      <p class="learn">Learn from <b>${G.producers}</b></p>
      <p>${G.blurb}</p>
      ${NOW[G.id] ? `<p class="now-line"><b>In 2026:</b> ${NOW[G.id]}</p>` : ''}
    </div>
    <div class="links"><h3>Connects to</h3><ul>${
      G.related.map(([id,why])=>`<li><button class="link" data-g="${id}"><b>${byId[id].name}</b><span>${why}</span></button></li>`).join('')
    }</ul></div>`;
}
function buildGrid(){
  grid.innerHTML=''; cells={}; cols=Array.from({length:16},()=>[]); nums=[]; labels={}; shownStep=-1;
  grid.appendChild(document.createElement('div'));
  for(let s=0;s<16;s++){ const n=document.createElement('div'); n.className='num'+(s%4===0?' beat':''); n.textContent=s+1; grid.appendChild(n); nums.push(n); }
  G.rows.forEach(r=>{
    const color=`var(${ROLE_COLOR[ROWDEF[r].role]})`, nm=rowName(r);
    const lb=document.createElement('button'); lb.className='rowlabel'; lb.style.setProperty('--row',color);
    lb.innerHTML=`<span class="dot"></span><span class="nm">${nm}</span>`; lb.title=`Mute or unmute ${nm}`;
    lb.addEventListener('click',()=>{ S.muted[r]=!S.muted[r]; render(); save(); });
    grid.appendChild(lb); labels[r]=lb; cells[r]=[];
    for(let s=0;s<16;s++){
      const c=document.createElement('button'); c.className='cell'+(Math.floor(s/4)%2?' alt':'');
      c.style.setProperty('--row',color); c.setAttribute('aria-label',`${nm}, step ${s+1}`);
      c.addEventListener('click',()=>{
        const cur=S.pattern[r][s], max=ROWDEF[r].roll?2:1, v=cur>=max?0:cur+1;
        S.pattern[r][s]=v;
        if(v && !playing && !S.muted[r]){ initAudio(); ctx.resume(); applyTone(); trigger(r,ctx.currentTime+0.01,s,0,v,60/S.bpm/4); }
        render(); save();
      });
      grid.appendChild(c); cells[r].push(c); cols[s].push(c);
    }
  });
  const hasRoll=G.rows.some(r=>ROWDEF[r].roll);
  $('legend').textContent='Tap a square to add a hit. Tap an instrument name to mute it. Bold numbers are the four beats you would count.'+(hasRoll?' Tap a hi-hat square twice to make it a roll.':'')+(G.lofi?' The crackle and warm filter are part of the lo-fi sound.':'');
}
function setPlayhead(s){
  if(shownStep>=0 && cols[shownStep]){ cols[shownStep].forEach(c=>c.classList.remove('now')); nums[shownStep].classList.remove('now'); }
  shownStep=s;
  if(s>=0){ cols[s].forEach(c=>c.classList.add('now')); nums[s].classList.add('now'); }
}
function stepDone(L){
  if(L.final) return true;
  if(L.swing!=null && S.swing < L.swing) return false;
  if(L.targets && !Object.entries(L.targets).every(([r,ix])=>ix.every(k=>S.pattern[r][k]))) return false;
  if(L.rolls && !Object.entries(L.rolls).every(([r,ix])=>ix.every(k=>S.pattern[r][k]===2))) return false;
  return true;
}
/* ---------- song skeleton view ---------- */
function renderSong(){
  secs=sections();
  const v=variantOf(), sk=SK[G.id];
  $('variants').innerHTML = sk.dj
    ? [['stream','Streaming edit'],['dj','DJ extended mix']].map(([k,l])=>`<button class="chip" data-variant="${k}" aria-pressed="${v===k}">${l}</button>`).join('')
    : '<span class="shelf-label" style="margin:0">Streaming edit</span>';
  const barSec=240/S.bpm; let total=0, hookAt=null, bars=0;
  secs.forEach(s=>{ if(hookAt===null && s.type==='hook') hookAt=total; total+=s.bars*barSec; bars+=s.bars; });
  const verdict = hookAt===null ? '' : (hookAt<=15 ? '<span class="ok">✓ inside 15 s</span>' : '<span class="late">after the 15-second window</span>');
  $('stats').innerHTML=`<span>Length <b>${fmt(total)}</b></span><span>Hook arrives at <b>${fmt(hookAt||0)}</b> ${verdict}</span><span><b>${bars}</b> bars at ${S.bpm} BPM</span>`;
  const arr=$('arr');
  arr.style.gridTemplateColumns='var(--label) '+secs.map(s=>`minmax(${Math.max(66,Math.min(s.bars*6,170))}px, ${s.bars}fr)`).join(' ');
  let h='<div></div>';
  secs.forEach((s,i)=>{ h+=`<button class="sec-h" data-sec="${i}" style="--t:var(${TYPE_COLOR[s.type]})" title="Play from ${s.name}"><b>${s.name}</b><small>${s.bars} bars</small>${s.clip?'<span class="clipb">15s clip</span>':''}<span class="prog"></span></button>`; });
  G.rows.forEach(r=>{
    const color=`var(${ROLE_COLOR[ROWDEF[r].role]})`, nm=rowName(r);
    h+=`<div class="lane-l" style="--row:${color}"><span class="dot"></span>${nm}</div>`;
    secs.forEach((s,i)=>{ const on=s.layers.includes(r); h+=`<button class="clip${on?' on':''}" style="--row:${color}" data-clip="${i}" data-row="${r}" aria-pressed="${on}" aria-label="${nm} in ${s.name}"></button>`; });
  });
  arr.innerHTML=h;
  $('quick').checked=!!store.quick;
  markSections();
}
function markSections(){
  const focus = S.mode==='song' && S.skelStep>0 && S.skelStep<=secs.length ? S.skelStep-1 : -1;
  document.querySelectorAll('.sec-h').forEach(el=>{
    const i=+el.dataset.sec;
    el.classList.toggle('now', i===shownSec && playing && mode==='song');
    el.classList.toggle('focus', i===focus);
    if(i!==shownSec || !playing){ const p=el.querySelector('.prog'); if(p) p.style.width='0'; }
  });
}
function renderSongCoach(){
  const n=secs.length+2; S.skelStep=Math.min(S.skelStep||0, n-1);
  const k=S.skelStep, v=variantOf();
  let title, body, task;
  if(k===0){ title=`The skeleton of a ${G.name} song`; body=(v==='dj'?DJ_TEXT:STREAM_TEXT)+` Here is a typical ${v==='dj'?'DJ extended mix':'streaming edit'} for ${G.name}, section by section.`; task='Press play to hear the whole song, or step through each section.'; }
  else if(k<=secs.length){ const s=secs[k-1]; title=`${s.name} · ${s.bars} bars`; body=s.note; task='Play this section, then tap blocks to add or remove layers and hear the difference.'; }
  else { title='Make your own edit'; body=`Change which layers play in each section and watch the length and hook time update.${SK[G.id].dj?' Switch to the DJ extended mix to compare the two versions.':''} A good test for any edit: does it still reach the best part within 15 seconds?`; task='Tap blocks to build your own version.'; }
  $('stepCount').textContent=`${G.name} skeleton · step ${k+1} of ${n}`;
  $('dots').innerHTML=Array.from({length:n},(_,i)=>`<i class="${i===k?'cur':(i<k?'done':'')}"></i>`).join('');
  $('lTitle').textContent=title; $('lBody').textContent=body; $('lTaskText').textContent=task;
  $('lTask').classList.remove('ok'); $('lTick').textContent='→';
  $('showMe').hidden=true; $('playSec').hidden=!(k>0 && k<=secs.length);
  const next=$('next'); next.disabled=false; next.textContent = k===n-1 ? 'Back to start' : 'Next';
  $('prev').hidden=k===0;
  markSections();
}
function applyMode(){
  const song=S.mode==='song';
  $('grooveView').hidden=song; $('songView').hidden=!song;
  $('tabGroove').setAttribute('aria-selected',String(!song)); $('tabSong').setAttribute('aria-selected',String(song));
  if(song) renderSong();
  if(!playing) nowPlaying.textContent = song ? 'Press play to hear the whole song' : 'Press play to hear your loop';
}
function setMode(m){ if(playing) stop(); S.mode=m; applyMode(); render(); save(); if(typeof aiChips==='function') aiChips(); }

function render(){
  if(S.mode==='song'){ renderSongCoach(); $('bpm').value=S.bpm; $('bpmOut').textContent=`${S.bpm} BPM`; $('swing').value=Math.round(S.swing*100); $('swingOut').textContent=`${Math.round(S.swing*100)}%`; return; }
  $('playSec').hidden=true;
  const LF=G.lessonFull, L=LF[S.lesson];
  G.rows.forEach(r=>{
    labels[r].classList.toggle('muted',!!S.muted[r]); labels[r].setAttribute('aria-pressed',S.muted[r]?'true':'false');
    cells[r].forEach((c,s)=>{
      const v=S.pattern[r][s];
      c.classList.toggle('on',v===1); c.classList.toggle('roll',v===2);
      c.setAttribute('aria-pressed',v?'true':'false');
      const hint=(L.targets&&L.targets[r]&&L.targets[r].includes(s)&&!v) || (L.rolls&&L.rolls[r]&&L.rolls[r].includes(s)&&v!==2);
      c.classList.toggle('hint',!!hint);
    });
  });
  $('stepCount').textContent=`${G.name} · step ${S.lesson+1} of ${LF.length}`;
  $('dots').innerHTML=LF.map((_,i)=>`<i class="${i===S.lesson?'cur':(i<S.lesson?'done':'')}"></i>`).join('');
  $('lTitle').textContent=L.title; $('lBody').textContent=L.body; $('lTaskText').textContent=L.task;
  const done=stepDone(L);
  $('lTask').classList.toggle('ok',done&&!L.final); $('lTick').textContent=L.final?'→':(done?'✓':'○');
  const next=$('next');
  if(L.final){ next.disabled=false; next.textContent='Restart lesson'; }
  else { next.disabled=!done; next.textContent=done?'Nice. Next step':'Next step'; }
  $('showMe').hidden=!!L.final; $('prev').hidden=S.lesson===0;
  $('bpm').value=S.bpm; $('bpmOut').textContent=`${S.bpm} BPM`;
  $('swing').value=Math.round(S.swing*100); $('swingOut').textContent=`${Math.round(S.swing*100)}%`;
}
function selectGenre(id){
  if(!byId[id] || id===G.id) return;
  if(playing) stop();
  const m=S.mode; store.current=id; G=byId[id]; S=gs(id); S.mode=m;
  renderShelf(); renderCard(); buildGrid(); applyMode(); render(); applyTone(); save(); aiReset();
  $('genreCard').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth', block:'start'});
}
document.addEventListener('click',e=>{ const b=e.target.closest('[data-g]'); if(b) selectGenre(b.dataset.g); });

playBtn.addEventListener('click',()=>playing?stop():start());
$('bpm').addEventListener('input',e=>{ S.bpm=+e.target.value; if(S.mode==='song') renderSong(); render(); save(); });
$('swing').addEventListener('input',e=>{ S.swing=+e.target.value/100; render(); save(); });
$('showMe').addEventListener('click',()=>{
  const L=G.lessonFull[S.lesson];
  if(L.targets) Object.entries(L.targets).forEach(([r,ix])=>ix.forEach(k=>{ if(!S.pattern[r][k]) S.pattern[r][k]=1; }));
  if(L.rolls) Object.entries(L.rolls).forEach(([r,ix])=>ix.forEach(k=>S.pattern[r][k]=2));
  if(L.swingSet!=null) S.swing=Math.max(S.swing,L.swingSet);
  render(); save();
});
$('next').addEventListener('click',()=>{
  if(S.mode==='song'){ const n=secs.length+2; S.skelStep = (S.skelStep||0) >= n-1 ? 0 : (S.skelStep||0)+1; render(); save(); return; }
  if(G.lessonFull[S.lesson].final){ S.lesson=0; S.pattern=blankFor(G); S.swing=G.swing; }
  else S.lesson++;
  render(); save();
});
$('prev').addEventListener('click',()=>{
  if(S.mode==='song'){ if(S.skelStep>0){ S.skelStep--; render(); save(); } return; }
  if(S.lesson>0){ S.lesson--; render(); save(); }
});
$('playSec').addEventListener('click',()=>{ const i=S.skelStep-1; if(i>=0) start(i,i); });
$('tabGroove').addEventListener('click',()=>setMode('groove'));
$('tabSong').addEventListener('click',()=>setMode('song'));
$('variants').addEventListener('click',e=>{
  const b=e.target.closest('[data-variant]'); if(!b) return;
  if(playing) stop(); S.variant=b.dataset.variant; S.skelStep=0; renderSong(); render(); save();
});
$('arr').addEventListener('click',e=>{
  const h=e.target.closest('[data-sec]');
  if(h){ start(+h.dataset.sec,null); return; }
  const c=e.target.closest('[data-clip]'); if(!c) return;
  const L=S.arr[variantOf()][+c.dataset.clip], r=c.dataset.row, ix=L.indexOf(r);
  if(ix>=0) L.splice(ix,1); else L.push(r);
  renderSong(); save();
});
$('quick').addEventListener('change',e=>{ store.quick=e.target.checked; save(); });
$('resetSkel').addEventListener('click',()=>{ if(S.arr) delete S.arr[variantOf()]; renderSong(); save(); });
$('clear').addEventListener('click',()=>{ S.pattern=blankFor(G); render(); save(); });
$('loadGroove').addEventListener('click',()=>{
  S.pattern=blankFor(G);
  G.lesson.forEach(L=>{
    if(L.targets) Object.entries(L.targets).forEach(([r,ix])=>ix.forEach(k=>S.pattern[r][k]=1));
    if(L.rolls) Object.entries(L.rolls).forEach(([r,ix])=>ix.forEach(k=>S.pattern[r][k]=2));
    if(L.swingSet!=null) S.swing=L.swingSet;
  });
  if(G.extra) Object.entries(G.extra).forEach(([r,ix])=>ix.forEach(k=>{ if(!S.pattern[r][k]) S.pattern[r][k]=1; }));
  S.lesson=G.lessonFull.length-1; render(); save();
});
document.addEventListener('keydown',e=>{
  if(e.code==='Space' && !['INPUT','BUTTON'].includes(document.activeElement.tagName)){ e.preventDefault(); playing?stop():start(); }
});

/* ---------- AI coach ---------- */
// The coach runs on each person's own Claude account, so it only works inside Claude.
// On your own website, people get a button that opens the Claude version instead.
// Paste your artifact's shared link here after turning on sharing in Claude.
const CLAUDE_URL = 'https://claude.ai/artifact/1EH5FhSG4h6VjEqL5SvoRo';
function showClaudeLink(){
  aiOff=true; aiInput.disabled=true; aiSetBusy(false);
  $('aiForm').hidden=true; $('aiChips').hidden=true;
  aiLog.innerHTML='';
  addMsg('ai','The AI coach runs on your own Claude account, so it lives in the Claude version of Beat Bridge. Open it there to ask questions, get feedback on your groove, and let the coach change your beat. Everything else here works without it.');
  $('aiNote').innerHTML='<a class="btn primary" href="'+CLAUDE_URL+'" target="_blank" rel="noopener" style="display:inline-block;text-decoration:none">Open the coach in Claude</a>';
}
let sample=null, aiTools=false, aiTurns=[], aiCtl=null, aiSnap=null, aiChanged=false, aiBusy=false, aiOff=false;
const aiLog=$('aiLog'), aiInput=$('aiInput');
const esc = s => s.replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmtAI = s => esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/^#+\s*/gm,'');
function addMsg(cls, html){ const p=document.createElement('p'); p.className='msg '+cls; p.innerHTML=html; aiLog.appendChild(p); aiLog.scrollTop=aiLog.scrollHeight; return p; }
const stepsOf = arr => arr.map((v,i)=>v?(i+1)+(v===2?'R':''):null).filter(Boolean);
function stateText(){
  const L=[], ref=refPattern(G);
  L.push(`Genre: ${G.name} (${G.origin}). Producers associated with it: ${G.producers}. Key ${G.key}. Chord loop, one chord per bar: ${G.chords.map(c=>c.name).join(', ')}.`);
  L.push(`Tempo ${S.bpm} BPM (typical for the genre: ${G.bpm}). Swing ${Math.round(S.swing*100)}%.`);
  L.push(`The learner is looking at: ${S.mode==='song'?'the Song skeleton view':'the Groove view'}.`);
  if(S.mode!=='song'){ const ls=G.lessonFull[S.lesson]; L.push(`Lesson step ${S.lesson+1} of ${G.lessonFull.length}: "${ls.title}". Task: ${ls.task}`); }
  L.push('Learner\'s 16-step pattern (steps 1-16; beats fall on 1, 5, 9, 13; R means a hi-hat roll):');
  G.rows.forEach(r=>{ const st=stepsOf(S.pattern[r]); L.push(`- ${r} "${rowName(r)}"${S.muted[r]?' [muted]':''}: ${st.length?st.join(' '):'empty'}`); });
  L.push('Reference groove the lesson teaches:');
  G.rows.forEach(r=>{ const st=stepsOf(ref[r]); L.push(`- ${r}: ${st.length?st.join(' '):'empty'}`); });
  if(S.mode==='song'){
    const sc=sections(), v=variantOf();
    L.push(`Song skeleton (${v==='dj'?'DJ extended mix':'streaming edit'}). Each section plays the reference groove with only the listed layers:`);
    sc.forEach((s,i)=>L.push(`- section ${i+1} "${s.name}" (${s.type}, ${s.bars} bars): ${s.layers.join(', ')||'nothing'}`));
  }
  return L.join('\n');
}
const RULES = () => `You are the coach inside Beat Bridge, an app that teaches beginners to make beats in different genres. Teach in plain, friendly language: say what to listen for and why it works in this genre. Keep answers short: two to four short paragraphs or a short list, no headings, no tables. Refer to positions by step number (1-16) and to sections by name.
Teach the techniques producers are known for, but never claim to recreate a specific real song and never write out lyrics.
${aiTools ? `You can change the learner's beat with the tools. Use them when the learner asks for a change, or when hearing a change is the clearest way to teach. After changing anything, say exactly what you changed and tell them to press play. Instrument ids: ${G.rows.join(', ')}. Bass, 808, log drum, keys, pad and melody notes follow the chord automatically, so you can only change rhythm, not pitch. Only "hat" can roll.` : 'You cannot change the beat yourself, so tell the learner which squares to tap.'}
Each message from the learner ends with the current state of the app.`;

const TOOLS = () => [
  { name:'set_steps', description:'Change which of the 16 steps an instrument plays in the Groove pattern. mode "add" turns steps on, "remove" turns them off, "replace" clears the row first. Set roll true to make hi-hat steps rolls. Returns the row afterwards.',
    inputSchema:{type:'object',properties:{row:{type:'string',enum:G.rows},steps:{type:'array',items:{type:'integer',minimum:1,maximum:16}},mode:{type:'string',enum:['add','remove','replace']},roll:{type:'boolean'}},required:['row','steps']},
    execute(inp){
      const r=String(inp.row); if(!G.rows.includes(r)) throw new Error('Unknown instrument '+r+'. Use one of: '+G.rows.join(', '));
      const steps=(Array.isArray(inp.steps)?inp.steps:[]).map(Number).filter(n=>n>=1&&n<=16), mode=String(inp.mode||'add');
      const val = inp.roll && ROWDEF[r].roll ? 2 : 1;
      if(mode==='replace') S.pattern[r]=Array(16).fill(0);
      steps.forEach(n=>{ S.pattern[r][n-1] = mode==='remove' ? 0 : val; });
      aiChanged=true; render(); save();
      addMsg('tool',`✎ Coach changed ${esc(rowName(r))}`);
      return {row:r, steps:stepsOf(S.pattern[r])};
    }},
  { name:'set_tempo_swing', description:'Set the tempo in BPM (70-150) and/or the swing percentage (0-60). Returns the new values.',
    inputSchema:{type:'object',properties:{bpm:{type:'integer',minimum:70,maximum:150},swing:{type:'integer',minimum:0,maximum:60}}},
    execute(inp){
      if(inp.bpm!=null) S.bpm=Math.max(70,Math.min(150,Math.round(Number(inp.bpm))||S.bpm));
      if(inp.swing!=null) S.swing=Math.max(0,Math.min(60,Math.round(Number(inp.swing))||0))/100;
      aiChanged=true; if(S.mode==='song') renderSong(); render(); save();
      addMsg('tool',`✎ Coach set tempo ${S.bpm} BPM, swing ${Math.round(S.swing*100)}%`);
      return {bpm:S.bpm, swing:Math.round(S.swing*100)};
    }},
  { name:'set_section_layers', description:'In the Song skeleton, set exactly which instruments play in one section (numbered from 1). Returns the section afterwards.',
    inputSchema:{type:'object',properties:{section:{type:'integer',minimum:1},layers:{type:'array',items:{type:'string',enum:G.rows}}},required:['section','layers']},
    execute(inp){
      const sc=sections(), i=Number(inp.section)-1; if(!sc[i]) throw new Error('There are only '+sc.length+' sections.');
      const arr=S.arr[variantOf()][i]; arr.splice(0,arr.length,...(Array.isArray(inp.layers)?inp.layers:[]).map(String).filter(r=>G.rows.includes(r)));
      aiChanged=true; renderSong(); render(); save();
      addMsg('tool',`✎ Coach changed the layers in ${esc(sc[i].name)}`);
      return {section:i+1, name:sc[i].name, layers:arr.slice()};
    }},
];

function aiChips(){
  const lead=G.producers.split(',')[0].trim();
  const list = S.mode==='song'
    ? ['Explain this song structure','How do I make the hook hit harder?','Make the intro shorter and punchier']
    : ['Check my groove','What should I listen for?',`How would ${lead} approach this?`,'Give me a variation to try'];
  $('aiChips').innerHTML=list.map(t=>`<button class="chip" type="button" data-ask="${esc(t)}">${esc(t)}</button>`).join('');
}
function aiReset(){
  if(aiOff && !sample){ showClaudeLink(); return; }
  if(aiCtl) aiCtl.abort();
  aiTurns=[]; aiSnap=null; aiChanged=false; $('aiUndo').hidden=true; aiLog.innerHTML='';
  addMsg('ai',`I'm your ${esc(G.name)} coach. I can see your pattern${S.mode==='song'?' and song skeleton':''}. Ask me why something works, ask for feedback, or ask me to change something so you can hear it.`);
  aiChips();
}
function aiSetBusy(b){ aiBusy=b; $('aiSend').disabled=b||aiOff; $('aiStop').hidden=!b; document.querySelectorAll('#aiChips .chip').forEach(c=>c.disabled=b||aiOff); }
function aiDisable(msg){ aiOff=true; $('aiNote').textContent=msg; aiInput.disabled=true; aiSetBusy(false); }
const AI_ERR = {rate_limited:'The coach needs a short break. Try again in a minute.', refused:'The coach could not answer that. Try asking it a different way.', session_expired:'Sign in to Claude again to keep using the coach.', empty_completion:'The coach had nothing to say to that. Try asking more simply.', prompt_too_large:'That was too much to send at once. Try a shorter question.'};
const AI_OFF = ['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'];

async function ask(q){
  q=q.trim(); if(!q || aiBusy || aiOff || !sample) return;
  addMsg('user',esc(q)); aiInput.value='';
  aiSnap=JSON.stringify({pattern:S.pattern,bpm:S.bpm,swing:S.swing,arr:S.arr||{}});
  aiTurns.push({role:'user',content:q});
  const recent=aiTurns.slice(-8);
  const input=[{role:'user',content:RULES()}, ...recent.slice(0,-1), {role:'user',content:q+'\n\n[Current state of the app]\n'+stateText()}];
  while(input.length>1 && input[1].role==='assistant') input.splice(1,1);
  const bubble=addMsg('ai thinking','Thinking…');
  aiCtl=new AbortController(); aiSetBusy(true);
  const opts={signal:aiCtl.signal, cache:false, modelTier:'quick', onText:({text})=>{ bubble.classList.remove('thinking'); bubble.innerHTML=fmtAI(text); aiLog.scrollTop=aiLog.scrollHeight; }};
  if(aiTools){ opts.tools=TOOLS(); delete opts.cache; }
  try {
    const {text,truncated}=await sample(input,opts);
    bubble.classList.remove('thinking'); bubble.innerHTML=fmtAI(text)+(truncated?'<br><i>(cut short)</i>':'');
    aiTurns.push({role:'assistant',content:text});
  } catch(e){
    const code=e&&e.code;
    if(code==='refused'||!e.text) bubble.remove(); else { bubble.classList.remove('thinking'); bubble.innerHTML=fmtAI(e.text); }
    aiTurns.pop();
    if(AI_OFF.includes(code)) aiDisable('The coach is turned off for this view. You can allow it from the artifact\'s Permissions menu.');
    else if(code!=='cancelled') addMsg('ai',esc(AI_ERR[code]||'Something went wrong reaching the coach. Try again.'));
  } finally {
    aiSetBusy(false); aiCtl=null;
    $('aiUndo').hidden=!aiChanged;
  }
}
$('aiForm').addEventListener('submit',e=>{ e.preventDefault(); ask(aiInput.value); });
aiInput.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); ask(aiInput.value); } });
$('aiChips').addEventListener('click',e=>{ const b=e.target.closest('[data-ask]'); if(b) ask(b.dataset.ask); });
$('aiStop').addEventListener('click',()=>aiCtl&&aiCtl.abort());
$('aiUndo').addEventListener('click',()=>{
  if(!aiSnap) return; const s=JSON.parse(aiSnap);
  S.pattern=s.pattern; S.bpm=s.bpm; S.swing=s.swing; S.arr=s.arr; aiChanged=false; $('aiUndo').hidden=true;
  if(S.mode==='song') renderSong(); render(); save(); addMsg('tool','↺ Undid the coach\'s last changes');
});
aiSetBusy(false); $('aiSend').disabled=true;
(async()=>{
  try {
    sample = window.claude && window.claude.use ? await window.claude.use('sample') : null;
    if(!sample){ showClaudeLink(); return; }
    const lim = await sample.limits().catch(()=>null);
    aiTools = !!(lim && lim.tools);
    $('aiNote').textContent = aiTools ? 'Uses your Claude account. Claude asks you to allow it the first time.' : 'Uses your Claude account. In this view the coach can advise but not edit your beat.';
    aiSetBusy(false);
  } catch(e){ showClaudeLink(); }
})();

renderShelf(); renderCard(); buildGrid(); applyMode(); render(); aiReset();
})();
