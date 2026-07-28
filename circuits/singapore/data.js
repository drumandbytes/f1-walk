// Racing line: bacinger/f1-circuits (MIT), sg-2008.geojson. IMPORTANT: the
// source file traces the lap CLOCKWISE, but Marina Bay is raced
// COUNTERCLOCKWISE -- reversed here to match. Verified against two real
// landmarks: War Memorial Park lands at 36.2% of the lap (matches Turn 7,
// 36.8% proportionally) and Anderson Bridge at 56.7% (matches the Turn
// 12-13 sequence) -- both within the expected range once reversed, and
// swapped/wrong before the fix. 116 raw points densified to 181 (max gap
// 45m).
//
// Corner count reflects the CURRENT post-2023 layout (19 turns, Turns
// 16-19 of the old 23-turn layout removed and replaced by a straight on
// Raffles Avenue; old Turn 20 became the new Turn 16). Positions: T1, T7
// (War Memorial, GPS-confirmed), T12 (Anderson Bridge, GPS-confirmed) and
// T16 (start of the new post-2023 straight, structurally confirmed) are
// the strongest anchors. Everything else is proportional distance between
// those anchors, NOT independently verified per corner -- needs a manual
// alignment pass against the real track, same as Baku's T12-15/T17-20.
const racingLine = [
  [1.291728,103.864144],[1.292069,103.864097],[1.292411,103.864049],[1.292752,103.864002],[1.293094,103.863955],[1.293453,103.863926],
  [1.293811,103.863896],[1.29417,103.863867],[1.294298,103.863834],[1.294378,103.863777],[1.294423,103.863665],[1.294402,103.863447],
  [1.29445,103.863273],[1.294552,103.863066],[1.294628,103.862976],[1.294697,103.862926],[1.294765,103.862874],[1.294876,103.862778],
  [1.294899,103.862691],[1.29489,103.862595],[1.294775,103.862481],[1.294584,103.862398],[1.294342,103.862374],[1.294099,103.86235],
  [1.293881,103.86235],[1.293711,103.862378],[1.293572,103.86243],[1.293404,103.862507],[1.293141,103.862602],[1.292879,103.862696],
  [1.292616,103.862791],[1.292372,103.862838],[1.292128,103.862885],[1.291769,103.86291],[1.291618,103.862888],[1.291459,103.862801],
  [1.291363,103.862665],[1.291286,103.8625],[1.291261,103.862373],[1.291282,103.862009],[1.291304,103.861646],[1.291325,103.861282],
  [1.291347,103.860919],[1.291368,103.860555],[1.29139,103.860192],[1.291411,103.859828],[1.291433,103.859465],[1.291454,103.859101],
  [1.291503,103.858838],[1.291575,103.858649],[1.291648,103.858459],[1.29184,103.858128],[1.292031,103.857796],[1.292223,103.857465],
  [1.292415,103.857133],[1.292607,103.856802],[1.292798,103.85647],[1.29299,103.856139],[1.293037,103.856059],[1.293099,103.85592],
  [1.293071,103.855843],[1.292952,103.855763],[1.292706,103.855618],[1.29246,103.855472],[1.292214,103.855327],[1.291895,103.855164],
  [1.291576,103.855001],[1.291468,103.854944],[1.291453,103.854883],[1.291491,103.854809],[1.29178,103.854533],[1.292069,103.854258],
  [1.292358,103.853982],[1.292498,103.853781],[1.292596,103.853622],[1.29256,103.853442],[1.292516,103.853388],[1.292395,103.853257],
  [1.292139,103.853117],[1.291856,103.852959],[1.291572,103.852801],[1.291289,103.852644],[1.291005,103.852486],[1.290722,103.852328],
  [1.290448,103.852175],[1.290173,103.852022],[1.289899,103.851868],[1.289625,103.851715],[1.289366,103.851563],[1.289234,103.851501],
  [1.2891,103.851453],[1.288998,103.85156],[1.28883,103.851798],[1.288694,103.851992],[1.288593,103.85215],[1.28853,103.852334],
  [1.288496,103.852434],[1.288428,103.852462],[1.28832,103.852408],[1.288227,103.852386],[1.288105,103.852375],[1.287844,103.852452],
  [1.287737,103.852528],[1.287618,103.852651],[1.287436,103.852848],[1.287278,103.853046],[1.287119,103.853244],[1.287036,103.853328],
  [1.286867,103.853406],[1.286718,103.853511],[1.286585,103.853616],[1.286568,103.853658],[1.286566,103.853749],[1.286583,103.853823],
  [1.286628,103.853885],[1.28667,103.853918],[1.286718,103.853943],[1.2871,103.854018],[1.287481,103.854093],[1.287863,103.854168],
  [1.288245,103.854242],[1.288626,103.854317],[1.289008,103.854392],[1.289387,103.854465],[1.289767,103.854537],[1.290146,103.85461],
  [1.290522,103.854697],[1.290773,103.85478],[1.291024,103.854862],[1.29108,103.854919],[1.291138,103.855006],[1.291159,103.855122],
  [1.291144,103.855215],[1.291092,103.85528],[1.290925,103.855475],[1.290759,103.85567],[1.290492,103.855974],[1.290225,103.856278],
  [1.289958,103.856582],[1.289847,103.856806],[1.289788,103.857024],[1.289751,103.857335],[1.289731,103.857702],[1.289712,103.85807],
  [1.289692,103.858437],[1.289673,103.858804],[1.289653,103.859171],[1.289634,103.859539],[1.289614,103.859906],[1.289597,103.86021],
  [1.289579,103.860515],[1.289562,103.860819],[1.289558,103.860998],[1.289546,103.861171],[1.289494,103.861203],[1.289394,103.861198],
  [1.289226,103.861207],[1.289056,103.861272],[1.288971,103.86135],[1.288911,103.861449],[1.28887,103.861606],[1.288837,103.861915],
  [1.288804,103.862225],[1.288771,103.862534],[1.288738,103.862844],[1.288716,103.863246],[1.288694,103.863647],[1.288685,103.863821],
  [1.288694,103.863897],[1.288723,103.863957],[1.288802,103.864014],[1.289044,103.864172],[1.289286,103.864331],[1.289395,103.8644],
  [1.28952,103.864425],[1.289773,103.8644],[1.290164,103.864349],[1.290555,103.864298],[1.290946,103.864246],[1.291337,103.864195],
  [1.291728,103.864144]
];

const SF_POS = [1.291728, 103.864144];

const stops = [
  { id:0, label:'S/F', name:'Start / Finish Line', isSF:true,
    ...rl(0), sector:0, speed:null, gear:null, dist:'0.00',
    desc:'Just off the pit straight, beside the Singapore Flyer — raced entirely at night under floodlights, a format Marina Bay pioneered in 2008.',
    facts:[
      {icon:'🏁',tag:'fact',title:'4.927 km, 19 corners',text:'Marina Bay Street Circuit is <strong>4.927 km</strong> long with <strong>19 turns</strong>. It hosted F1\'s first-ever night race in 2008 — Las Vegas is now the only other circuit run entirely after dark.'},
      {icon:'🌏',tag:'fact',title:"Asia's first F1 street circuit",text:'Singapore became the first street circuit in Asia designed for Formula One when it joined the calendar in 2008 — and one of the toughest races on it, thanks to heat, humidity, and minimal run-off.'},
      {icon:'💥',tag:'crash',title:'2008 — "Crashgate"',text:"F1's most notorious scandal happened here in the circuit's very first race: Renault ordered Nelson Piquet Jr. to crash deliberately, triggering a safety car that handed team-mate Fernando Alonso the win. It happened at the old Turn 17 — part of the waterfront section demolished in the 2023 rebuild, so the exact spot no longer exists on today's track."},
    ]},
  { id:1, label:'T1', name:'Sheares',
    ...rl(9), sector:0, speed:null, gear:null, dist:'0.30',
    desc:'A tight left-hander right after the start/finish straight — the first braking test of the lap.',
    facts:[
      {icon:'👑',tag:'fact',title:"Named after Singapore's first president",text:"This corner is informally known as <strong>Sheares</strong>, after Benjamin Henry Sheares, Singapore's second president — one of the few Marina Bay corners with a real name rather than just a number."},
    ]},
  { id:2, label:'T2', name:'Turn 2',
    ...rl(12), sector:0, speed:null, gear:null, dist:'0.36',
    desc:'A longer left curve, feeding into the T3 hairpin.',
    facts:[]},
  { id:3, label:'T3', name:'Turn 3',
    ...rl(18), sector:0, speed:null, gear:null, dist:'0.44',
    desc:'A left-handed hairpin, heavy on the brakes.',
    facts:[]},
  { id:4, label:'T4', name:'Turn 4',
    ...rl(24), sector:0, speed:null, gear:null, dist:'0.57',
    desc:'A right-hand kink as the track joins Republic Boulevard.',
    facts:[]},
  { id:5, label:'T5', name:'Turn 5',
    ...rl(35), sector:0, speed:null, gear:null, dist:'0.85',
    desc:"A long left-hander leading onto one of the circuit's DRS straights.",
    facts:[]},
  { id:6, label:'T6', name:'Turn 6',
    ...rl(48), sector:0, speed:null, gear:null, dist:'1.30',
    desc:'A right-hand kink before the run toward the bridge section.',
    facts:[]},
  { id:7, label:'T7', name:'Memorial Corner',
    ...rl(59), sector:0, speed:null, gear:null, dist:'1.67',
    desc:'A left-hander near the old War Memorial Park — a prime braking and overtaking zone.',
    facts:[
      {icon:'🏆',tag:'overtake',title:'A DRS overtaking zone',text:"Most passing moves into this corner come with DRS help on the long run beforehand — one of the circuit's more reliable overtaking spots despite its reputation as a street track where passing is hard."},
    ]},
  { id:8, label:'T8', name:'Stamford',
    ...rl(68), sector:0, speed:null, gear:null, dist:'1.89',
    desc:'A right-hander onto Stamford Road.',
    facts:[]},
  { id:9, label:'T9', name:'Padang',
    ...rl(75), sector:0, speed:null, gear:null, dist:'2.10',
    desc:'A sweeping left, taken flat out in qualifying trim.',
    facts:[]},
  { id:10, label:'T10', name:'Singapore Sling',
    ...rl(90), sector:0, speed:null, gear:null, dist:'2.55',
    desc:'Once a vicious triple-apex chicane, simplified to a single left-hander since 2013.',
    facts:[
      {icon:'📏',tag:'record',title:'The old "Singapore Sling"',text:"This was once the <strong>Singapore Sling</strong>, a brutal triple-apex chicane with kerbs so aggressive they wrecked cars in the circuit's very first race in 2008. It was simplified to a single corner in 2013."},
      {icon:'💥',tag:'crash',title:"2023 — Russell's last-lap heartbreak",text:"On the final lap, defending third place from Lando Norris, <strong>George Russell</strong> clipped the wall here with his right-rear tyre and speared into the barrier, ending his race on the spot."},
    ]},
  { id:11, label:'T11', name:'Turn 11',
    ...rl(97), sector:0, speed:null, gear:null, dist:'2.69',
    desc:'A fast right, funnelling the car toward Anderson Bridge.',
    facts:[]},
  { id:12, label:'T12', name:'Turn 12',
    ...rl(100), sector:0, speed:null, gear:null, dist:'2.72',
    desc:'The left onto Anderson Bridge itself, taken at high speed.',
    facts:[
      {icon:'🌉',tag:'fact',title:'A century-old bridge, at 190 km/h',text:"Anderson Bridge opened in 1910 to relieve traffic on the older Cavenagh Bridge next door. Once a year, F1 cars cross it at around <strong>190 km/h</strong>."},
    ]},
  { id:13, label:'T13', name:'Turn 13',
    ...rl(112), sector:0, speed:null, gear:null, dist:'2.96',
    desc:'A tight hairpin over the far side of Anderson Bridge — narrow, bumpy, and a serious traction test.',
    facts:[
      {icon:'🏃',tag:'fact',title:'2015 — A spectator on the track',text:"During a safety car period in 2015, a spectator squeezed through a gap in the fencing near here and ran onto the circuit before being arrested — a rare full track invasion during an active F1 session."},
    ]},
  { id:14, label:'T14', name:'Connaught',
    ...rl(130), sector:0, speed:null, gear:null, dist:'3.50',
    desc:'A right-hander onto Esplanade Drive.',
    facts:[]},
  { id:15, label:'T15', name:'Turn 15',
    ...rl(138), sector:0, speed:null, gear:null, dist:'3.73',
    desc:'A left across the Esplanade Bridge, leading onto the new back straight.',
    facts:[]},
  { id:16, label:'T16', name:'Turn 16',
    ...rl(153), sector:0, speed:null, gear:null, dist:'4.24',
    desc:'A sharp right — the start of the section rebuilt for 2023, replacing the old waterfront corners.',
    facts:[
      {icon:'🏗',tag:'record',title:'Ten seconds faster overnight',text:"Ahead of 2023, the old Turns 16 to 19 — a technical section past the waterfront and under a grandstand — were removed for a redevelopment project and replaced by a straight. Lap times dropped by about <strong>10 seconds</strong> overnight."},
    ]},
  { id:17, label:'T17', name:'Turn 17',
    ...rl(158), sector:0, speed:null, gear:null, dist:'4.31',
    desc:'A left into the final sequence, onto Raffles Avenue.',
    facts:[]},
  { id:18, label:'T18', name:'Turn 18',
    ...rl(167), sector:0, speed:null, gear:null, dist:'4.59',
    desc:'A sharp left, one of the trickiest late-lap braking zones.',
    facts:[]},
  { id:19, label:'T19', name:'Turn 19',
    ...rl(174), sector:0, speed:null, gear:null, dist:'4.71',
    desc:'The final corner, a right-hander back onto the start/finish straight.',
    facts:[]},
];

const sectors = [
  {id:0,name:"Lap"},
];
