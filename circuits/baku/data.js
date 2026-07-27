// Racing line: bacinger/f1-circuits (MIT), az-2016.geojson, 86 pts linearly
// densified to 182 (max gap 44m). Corner positions are geographically
// anchored (Old City / castle section matches Icherisheher's real coordinates)
// but exact official turn numbers are only asserted where independently
// verified — see circuits/baku/meta.json for sourcing notes.
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
    ]},
  { id:1, label:'T1', name:'Turn 1',
    ...rl(8), sector:1, speed:null, gear:null, dist:'0.21',
    desc:'A 90-degree left-hander, heavy on the brakes at the end of the long start/finish straight. A short burst of throttle then leads to Turn 2, another 90-degree left onto the first DRS straight.',
    facts:[]},
  { id:2, label:'Old City', name:'Old City',
    ...rl(51), sector:2, speed:null, gear:null, dist:'1.75',
    desc:"The track runs alongside Icherisheher, Baku's walled Old City and a UNESCO World Heritage Site, before narrowing into the tight Turns 8–11 sequence ahead.",
    facts:[
      {icon:'🏛',tag:'fact',title:'A UNESCO World Heritage old town',text:'Icherisheher (the Old City) has been a UNESCO World Heritage Site since 2000. Its streets, some dating back to the 12th century, are open to pedestrians year-round outside race week.'},
    ]},
  { id:3, label:'T8–11', name:'The Castle Section',
    ...rl(114), sector:2, speed:null, gear:null, dist:'3.58',
    desc:"Turns 8 to 11 form the narrowest point on the entire Formula 1 calendar — barely wide enough for two cars side by side, right alongside the Old City's medieval fortress wall. The track keeps climbing through this sequence, cresting at Turn 12, the highest point on the circuit.",
    facts:[
      {icon:'📏',tag:'record',title:'Narrowest point in F1: 7.6 metres',text:"At its tightest, the track here is just <strong>7.6 metres wide</strong> — the narrowest point on the F1 calendar. Drivers commit to one steering line through Turns 8 to 11 and hold it, since there's no room to correct a mistake next to the stone wall."},
    ]},
  { id:4, label:'Home', name:'The Home Straight',
    ...rl(155), sector:3, speed:null, gear:null, dist:'4.93',
    desc:'The run back down toward the seafront and the start/finish line — part of the longest straight in Formula 1, at roughly 2.2 km along Neftchilar Avenue.',
    facts:[
      {icon:'📐',tag:'record',title:'Longest straight in F1',text:'At around <strong>2.2 km</strong>, the run along Neftchilar Avenue back to the S/F line is the longest straight on the current F1 calendar.'},
      {icon:'💥',tag:'crash',title:'2017 — Vettel drives into Hamilton',text:"Behind the Safety Car on lap 19, <strong>Sebastian Vettel</strong> ran into the back of Lewis Hamilton's car, then steered into him alongside. Vettel was handed a 10-second stop-go penalty and apologised afterwards, calling it the wrong decision."},
      {icon:'💥',tag:'crash',title:"2021 — Verstappen's late tyre failure",text:"Leading with four laps to go, <strong>Max Verstappen's</strong> left-rear tyre failed at high speed, sending him into the wall and triggering a red flag. Sergio Pérez went on to win from the restart."},
    ]},
];

const sectors = [
  {id:0,name:"S/F"},{id:1,name:"Turn 1"},{id:2,name:"Old City"},{id:3,name:"Home Straight"},
];
