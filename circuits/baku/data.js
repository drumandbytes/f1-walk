// Racing line: bacinger/f1-circuits (MIT), az-2016.geojson, 86 pts linearly
// densified to 182 (max gap 44m). All 20 turns placed via path-curvature
// analysis of the raw trace (grouping consecutive same-direction bends),
// matched in order and turn direction against a verified turn-by-turn
// source (racefans.net). T1-3, T12-15 and T17-20 are continuous same-
// direction arcs in the source data that the real circuit still numbers
// as separate corners — those positions are proportional-distance
// estimates within the confirmed arc, not independently pinned per corner.
//
// speed/gear: minimum corner speed (km/h) and gear, from a technical
// graphic recurring across autoracing1.com's Baku previews (seen
// unchanged on both the 2024 and 2025 editions). T13 and T18 show gear 2
// at 265-270 km/h, inconsistent with neighboring similar-speed corners
// (which show gear 6-8) -- likely an error in the source graphic itself.
// Included as-is; no telemetry-verified alternative was available.
const racingLine = [
  [40.372688,49.853247],[40.372833,49.853691],[40.372978,49.854135],[40.373123,49.854579],[40.373268,49.855023],[40.373325,49.855117],
  [40.373409,49.855177],[40.37349,49.855189],[40.373607,49.855159],[40.373963,49.854979],[40.374319,49.854798],[40.374619,49.854595],
  [40.37492,49.854391],[40.37522,49.854188],[40.375511,49.85402],[40.375801,49.853853],[40.376092,49.853685],[40.376134,49.853602],
  [40.376148,49.853496],[40.376019,49.853071],[40.375889,49.852646],[40.37576,49.852222],[40.37563,49.851797],[40.375507,49.851381],
  [40.375385,49.850966],[40.375262,49.85055],[40.37514,49.850135],[40.375017,49.849719],[40.374855,49.849246],[40.374693,49.848774],
  [40.374532,49.848302],[40.37437,49.847829],[40.374208,49.847357],[40.374046,49.846884],[40.373904,49.846477],[40.373762,49.846069],
  [40.37362,49.845662],[40.373477,49.845255],[40.373335,49.844847],[40.373193,49.84444],[40.373065,49.84428],[40.372891,49.84428],
  [40.372575,49.84444],[40.372259,49.8446],[40.371944,49.844759],[40.371628,49.844919],[40.371312,49.845079],[40.371189,49.845085],
  [40.371081,49.844961],[40.370914,49.844497],[40.370748,49.844034],[40.370581,49.84357],[40.370416,49.843176],[40.370251,49.842783],
  [40.370078,49.84243],[40.369906,49.842076],[40.369733,49.841723],[40.369667,49.841658],[40.369572,49.841682],[40.369276,49.841859],
  [40.369191,49.841853],[40.369125,49.841764],[40.36899,49.841563],[40.368856,49.841362],[40.368619,49.840959],[40.368381,49.840557],
  [40.368144,49.840154],[40.367907,49.839752],[40.367669,49.839349],[40.367432,49.838947],[40.367291,49.838743],[40.36715,49.838539],
  [40.36706,49.838367],[40.367065,49.838195],[40.367183,49.838053],[40.367541,49.837893],[40.3679,49.837733],[40.368258,49.837574],
  [40.368616,49.837414],[40.368677,49.837337],[40.368696,49.837219],[40.368696,49.837065],[40.368804,49.836834],[40.368832,49.836692],
  [40.368828,49.836544],[40.368818,49.836402],[40.368865,49.836248],[40.368955,49.836171],[40.369294,49.836035],[40.369356,49.83597],
  [40.369403,49.835875],[40.369408,49.835733],[40.369318,49.835394],[40.369229,49.835054],[40.369139,49.834715],[40.368988,49.83431],
  [40.368837,49.833904],[40.368686,49.833498],[40.368535,49.833093],[40.368372,49.832736],[40.368208,49.832379],[40.368045,49.832022],
  [40.367913,49.831809],[40.367744,49.831643],[40.367503,49.831489],[40.367162,49.831357],[40.366822,49.831226],[40.366481,49.831094],
  [40.366141,49.830963],[40.365957,49.830927],[40.365581,49.830961],[40.365205,49.830996],[40.364828,49.83103],[40.364452,49.831065],
  [40.364076,49.831099],[40.363958,49.831152],[40.363841,49.831282],[40.363666,49.831721],[40.36349,49.83216],[40.363315,49.8326],
  [40.363139,49.833039],[40.362964,49.833478],[40.36286,49.833786],[40.362756,49.834094],[40.362662,49.834431],[40.362639,49.83462],
  [40.362667,49.834839],[40.362747,49.834993],[40.362832,49.835094],[40.363143,49.835315],[40.363454,49.835536],[40.363765,49.835757],
  [40.363982,49.835911],[40.364156,49.836088],[40.364418,49.836466],[40.36468,49.836843],[40.364943,49.837221],[40.365205,49.837598],
  [40.365467,49.837976],[40.365632,49.83813],[40.365792,49.838207],[40.36608,49.838262],[40.366367,49.838318],[40.366655,49.838373],
  [40.366824,49.838444],[40.366985,49.838586],[40.367098,49.838752],[40.367328,49.83914],[40.367557,49.839528],[40.367787,49.839916],
  [40.368016,49.840305],[40.368246,49.840693],[40.368475,49.841081],[40.368705,49.841469],[40.368889,49.841836],[40.369059,49.84225],
  [40.3692,49.842635],[40.36933,49.843043],[40.369461,49.843452],[40.369591,49.84386],[40.36972,49.844223],[40.369849,49.844586],
  [40.369978,49.844949],[40.370123,49.845392],[40.370267,49.845835],[40.370412,49.846277],[40.370556,49.84672],[40.370701,49.847163],
  [40.370845,49.847606],[40.370969,49.847965],[40.371094,49.848325],[40.371218,49.848684],[40.371367,49.849144],[40.371516,49.849603],
  [40.371665,49.850063],[40.371815,49.850523],[40.371964,49.850982],[40.372113,49.851442],[40.372257,49.851893],[40.3724,49.852345],
  [40.372544,49.852796],[40.372688,49.853247]
];

const SF_POS = [40.372688, 49.853247];

const stops = [
  { id:0, label:'S/F', name:'Start / Finish Line', isSF:true,
    ...rl(0), sector:0, speed:null, gear:null, dist:'0.00',
    desc:'Neftchilar Avenue, on the Caspian seafront — this is also part of the longest straight in Formula 1, so cars are already at very high speed as they cross the line.',
    facts:[
      {icon:'🏁',tag:'fact',title:'6.003 km, 20 corners',text:'Baku City Circuit is <strong>6.003 km</strong> long with <strong>20 turns</strong> — the second-longest circuit on the F1 calendar. First held in 2016 as the European Grand Prix, it became the Azerbaijan Grand Prix from 2017.'},
      {icon:'🏙',tag:'fact',title:'A circuit through a capital city',text:'The track runs along the Caspian Sea seafront and through the walled <strong>Old City (Icherisheher)</strong>, a UNESCO World Heritage Site, before opening onto the longest straight in Formula 1.'},
      {icon:'⚙️',tag:'record',title:'Most gear changes of any circuit',text:'Drivers make <strong>71 gear changes per lap</strong> here — more than anywhere else on the 2025 calendar, a product of swinging between hairpin-tight corners and flat-out straights.'},
    ]},
  { id:1, label:'T1', name:'Turn 1',
    ...rl(6), sector:1, speed:120, gear:2, dist:'0.18',
    desc:'A 90-degree left-hander, heavy on the brakes at the end of the long start/finish straight.',
    facts:[
      {icon:'📏',tag:'record',title:'Second-shortest run to Turn 1',text:"At <strong>170 metres</strong> from the line, this is the second-shortest sprint to the first corner on the F1 calendar — behind only Monaco's Sainte Dévote."},
      {icon:'🏆',tag:'overtake',title:'2024 — Piastri takes the lead',text:"On lap 20, <strong>Oscar Piastri</strong> swooped past <strong>Charles Leclerc</strong> into Turn 1 for the race lead, going on to win — McLaren's first Baku victory, and a result that put them top of the Constructors' Championship for the first time since 2014."},
      {icon:'💥',tag:'crash',title:'2018 — Red Bulls collide',text:"On lap 40, <strong>Daniel Ricciardo</strong> ran into the back of team-mate <strong>Max Verstappen</strong> here while trying to pass, putting both Red Bulls out of the race. It was their third coming-together of the afternoon — Christian Horner reprimanded both drivers afterwards."},
      {icon:'💥',tag:'crash',title:"2021 — Hamilton's late-race mistake",text:"Fighting for the win on a late restart, <strong>Lewis Hamilton</strong> accidentally hit his 'brake magic' button, altering his brake balance, and missed the braking point here — ending a run of 55 consecutive points finishes."},
    ]},
  { id:2, label:'T2', name:'Turn 2',
    ...rl(17), sector:1, speed:95, gear:2, dist:'0.52',
    desc:'Another 90-degree left, straight off the back of Turn 1, leading onto the first DRS straight.',
    facts:[
      {icon:'💥',tag:'crash',title:'2025 — Bearman clips the wall',text:"<strong>Oliver Bearman's</strong> rear end stepped out exiting Turn 2 in Q2, striking the barrier — one of a record six red flags across that qualifying session, the most in F1 history."},
    ]},
  { id:3, label:'T3', name:'Turn 3',
    ...rl(40), sector:1, speed:100, gear:2, dist:'1.38',
    desc:'A right-angled left with a wide escape road — one that sees plenty of visitors across a race weekend.',
    facts:[
      {icon:'💥',tag:'crash',title:'2024 — Pérez and Sainz collide',text:"On the penultimate lap, <strong>Sergio Pérez</strong> and <strong>Carlos Sainz</strong> tangled while fighting for third place on the run down to Turn 3, both hitting the barrier at high speed and retiring on the spot."},
      {icon:'💥',tag:'crash',title:'2025 — Piastri in qualifying',text:"<strong>Oscar Piastri</strong> missed the apex here in Q3 and hit the opposite barrier — one of six red flags in a session that set F1's all-time record."},
    ]},
  { id:4, label:'T4', name:'Turn 4',
    ...rl(47), sector:1, speed:95, gear:2, dist:'1.60',
    desc:'The first right-hander of the lap, a 90-degree test. The track opens up slightly on exit, which can tempt drivers into the wall.',
    facts:[
      {icon:'💥',tag:'crash',title:'2025 — Chaos in one session',text:"In a single qualifying session, <strong>Nico Hülkenberg</strong> crashed here with front wing and floor damage, <strong>Pierre Gasly</strong> went off, and <strong>Franco Colapinto</strong> hit the wall nearby — all in Q1. In 2018, <strong>Nico Hülkenberg</strong> had also retired here after hitting the wall on lap 11, and in 2024 Colapinto crashed here in practice too."},
      {icon:'🛢',tag:'fact',title:"The city that funded the Nobel Prize",text:"Baku drilled the <strong>world's first industrial oil well</strong> in 1846, 13 years before Pennsylvania's famous one. The Nobel brothers made their fortune in Baku's oil boom — about <strong>12% of the Nobel Prize endowment</strong> traces back to it."},
    ]},
  { id:5, label:'T5', name:'Turn 5',
    ...rl(57), sector:1, speed:105, gear:2, dist:'1.94',
    desc:'A left-hander, immediately compromised by the switchback that follows at Turn 6.',
    facts:[
      {icon:'💥',tag:'crash',title:'2023 — Leclerc crashes, still takes pole',text:"<strong>Charles Leclerc</strong> locked up and crashed out here on his final lap of the Sprint Shootout — and still secured pole position."},
    ]},
  { id:6, label:'T6', name:'Turn 6',
    ...rl(60), sector:1, speed:95, gear:2, dist:'2.00',
    desc:'An instant switchback right after Turn 5, with the wall pinching in on exit.',
    facts:[
      {icon:'💥',tag:'crash',title:"2025 — The championship leader's disastrous day",text:"<strong>Oscar Piastri</strong>, then leading the championship, jumped the start and triggered anti-stall, dropping to last place — then crashed here on lap 1 for good measure."},
    ]},
  { id:7, label:'T7', name:'Turn 7',
    ...rl(73), sector:1, speed:75, gear:2, dist:'2.39',
    desc:'An acute right-hander as the track tightens further — tricky in low sun.',
    facts:[
      {icon:'💥',tag:'crash',title:'2025 — Albon collects Colapinto',text:"On lap 17, <strong>Alexander Albon</strong> hit the rear of <strong>Franco Colapinto's</strong> car here, spinning him and bringing out the safety car. Albon was handed a 10-second penalty."},
    ]},
  { id:8, label:'T8', name:'Turn 8',
    ...rl(79), sector:2, speed:115, gear:2, dist:'2.59',
    desc:"Entry to the castle section — Turns 8 to 11 form the narrowest point on the entire F1 calendar, right alongside the Old City's medieval fortress wall.",
    facts:[
      {icon:'📏',tag:'record',title:'Narrowest point in F1: 7.6 metres',text:'At its tightest, the track through Turns 8 to 11 is just <strong>7.6 metres wide</strong> — the narrowest point on the F1 calendar.'},
      {icon:'💥',tag:'crash',title:'2021 — Sainz outbrakes himself',text:"On lap 11, <strong>Carlos Sainz</strong> outbraked himself into the Turn 8 chicane, running wide and dropping from 6th to 15th in one move."},
    ]},
  { id:9, label:'T9', name:'Turn 9',
    ...rl(81), sector:2, speed:125, gear:3, dist:'2.61',
    desc:'Deep in the castle sequence, barely wide enough for two cars side by side.',
    facts:[
      {icon:'🗼',tag:'fact',title:'The Maiden Tower, right alongside',text:"The <strong>Qız Qalası</strong> (Maiden Tower) towers over this section — nobody actually knows when it was built or what it was for. One legend says a king built it to hide his daughter from a prophecy that a snake would kill her; a snake, smuggled in with fruit, killed her anyway."},
    ]},
  { id:10, label:'T10', name:'Turn 10',
    ...rl(83), sector:2, speed:115, gear:2, dist:'2.65',
    desc:'Still inside the castle walls — one steering line only, with no room to correct a mistake.',
    facts:[
      {icon:'💥',tag:'crash',title:"2016 — Hamilton's Q3 heartbreaker",text:"With just two minutes left in Q3, <strong>Lewis Hamilton</strong> clipped the barrier here, breaking his front suspension and triggering a red flag that ended the session."},
    ]},
  { id:11, label:'T11', name:'Turn 11',
    ...rl(86), sector:2, speed:95, gear:2, dist:'2.68',
    desc:'The castle sequence ends here as the track opens up again, near the top of the hill.',
    facts:[
      {icon:'🏎',tag:'fact',title:'A cambered blind corner',text:"Turn 11 is cambered and blind on entry — the last of the tight castle corners before the track opens into the faster sweepers that follow."},
    ]},
  { id:12, label:'T12', name:'Turn 12',
    ...rl(89), sector:2, speed:110, gear:2, dist:'2.74',
    desc:'A 90-degree left with room on exit, leading to the highest point on the circuit.',
    facts:[
      {icon:'⛰',tag:'record',title:'Highest point on the circuit',text:'Turn 12 leads to the highest elevation point of the lap, after the climb through the castle section.'},
    ]},
  { id:13, label:'T13', name:'Turn 13',
    ...rl(103), sector:2, speed:265, gear:2, dist:'3.16',
    desc:'The first of two left-hand kinks taken flat out, crossing the crest of the hill.',
    facts:[
      {icon:'💥',tag:'crash',title:"2023 — Tsunoda's rough sprint",text:"<strong>Yuki Tsunoda</strong> hit the wall here during the 2023 sprint race, stripping his rear-left tyre. He retired the following lap after an unsafe pit release."},
    ]},
  { id:14, label:'T14', name:'Turn 14',
    ...rl(109), sector:2, speed:295, gear:8, dist:'3.37',
    desc:'The second left-hand kink of the pair, still flat out over the crest.',
    facts:[
      {icon:'🏛',tag:'fact',title:'A lap through Baku\'s architecture',text:"In one lap, the circuit passes preserved ruins of the Old City, Soviet-era apartment blocks, and glass-fronted modern skyscrapers — a cross-section of Baku's history in 6 kilometres."},
    ]},
  { id:15, label:'T15', name:'Turn 15',
    ...rl(115), sector:2, speed:95, gear:2, dist:'3.60',
    desc:'Hard on the brakes as the track drops downhill into this left-hander — the exit wall here punishes any mistake.',
    facts:[
      {icon:'💥',tag:'crash',title:"Baku's most-crashed corner",text:"This downhill braking zone has claimed cars in practice sessions across multiple years: <strong>Daniel Ricciardo</strong> and <strong>Felipe Massa</strong> in 2016, and both <strong>Charles Leclerc</strong> and <strong>Max Verstappen</strong> in 2021."},
    ]},
  { id:16, label:'T16', name:'Turn 16',
    ...rl(126), sector:3, speed:130, gear:3, dist:'3.94',
    desc:'A fast left-hander that feeds the circuit onto the long run back to the start/finish line.',
    facts:[
      {icon:'🏎',tag:'fact',title:'A big kerb before the longest run',text:"The large exit kerb here can destabilise the car right before the longest full-throttle section of the lap, roughly 1.5 miles (2.4 km) of flat-out running."},
    ]},
  { id:17, label:'T17', name:'Turn 17',
    ...rl(133), sector:3, speed:215, gear:6, dist:'4.14',
    desc:'The first kink of the high-speed slalom into the final stretch, taken at full throttle.',
    facts:[
      {icon:'💨',tag:'fact',title:'The city of winds',text:"\"Baku\" likely derives from the Persian <em>bād-kube</em>, roughly \"wind-pounded\" or \"gust of wind\" — fitting for a seafront straight where crosswinds off the Caspian are a real factor at 300+ km/h."},
    ]},
  { id:18, label:'T18', name:'Turn 18',
    ...rl(139), sector:3, speed:270, gear:2, dist:'4.38',
    desc:'Still in the slalom, flat out, threading between the walls.',
    facts:[
      {icon:'🌍',tag:'fact',title:'A city on the old Silk Road',text:"Baku's position on the historic Silk Road trade routes helped make it home to <strong>70 different nationalities</strong> today — a legacy of centuries as a crossroads between Europe and Asia."},
    ]},
  { id:19, label:'T19', name:'Turn 19',
    ...rl(144), sector:3, speed:290, gear:8, dist:'4.52',
    desc:'The penultimate kink of the slalom, cars already carrying huge speed.',
    facts:[
      {icon:'⚡',tag:'record',title:'F1\'s fastest recorded speed',text:'A Baku speed trap recorded <strong>378 km/h (235 mph)</strong> in 2016 — the fastest speed ever recorded in a Formula 1 race.'},
    ]},
  { id:20, label:'T20', name:'Turn 20',
    ...rl(154), sector:3, speed:310, gear:8, dist:'4.89',
    desc:'The last corner of the lap, leading onto the DRS straight back to the line.',
    facts:[
      {icon:'📐',tag:'record',title:'Longest straight in F1',text:'The run from here back to the S/F line is around <strong>2.2 km</strong> — the longest straight on the current F1 calendar.'},
      {icon:'💥',tag:'crash',title:'2017 — Vettel drives into Hamilton',text:"Behind the Safety Car on lap 19, <strong>Sebastian Vettel</strong> ran into the back of Lewis Hamilton's car on the main straight, then steered into him alongside. Vettel was handed a 10-second stop-go penalty and apologised afterwards."},
      {icon:'💥',tag:'crash',title:"2021 — Two identical tyre failures",text:"Leading with four laps to go, <strong>Max Verstappen's</strong> left-rear tyre failed at high speed on the pit straight, sending him into the wall and triggering a red flag. Eerily, <strong>Lance Stroll</strong> had suffered the exact same left-rear failure exiting Turn 20 just 16 laps earlier. Sergio Pérez went on to win from the restart."},
    ]},
];

const sectors = [
  {id:0,name:"S/F"},{id:1,name:"Turns 1–7"},{id:2,name:"Old City"},{id:3,name:"Home Straight"},
];
