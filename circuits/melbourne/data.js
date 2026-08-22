// Racing line: bacinger/f1-circuits (MIT), au-1953.geojson. Direction
// verified clockwise (matches Wikipedia's "the current circuit which runs
// clockwise") via shoelace signed-area check calibrated against known CW/CCW
// test shapes -- no reversal needed. Source length (5273m) matches the
// CURRENT post-2022 14-turn layout (official 5278m) almost exactly, not the
// old 16-turn layout (~5303m) -- confirmed already up to date, unlike
// Singapore's source data. 146 raw points densified to 213 (max gap 39m).
//
// Corner numbering: the 2022 changes removed the old Turn 9/10 chicane,
// shifting every corner after it down by two (old T11->new T9, old T12->new
// T10, old T13/Ascari->new T11, old T14/Stewart->new T12, old T15/Senna->new
// T13, old T16/Prost->new T14). This was cross-checked against an
// independent source (grandprix.com.au) explicitly stating "Turn 9
// (Previously 11)" etc. before use, since most search results still describe
// the corners under the old 16-turn numbering.
//
// Corner positions are a FIRST-DRAFT estimate: proportionally placed along
// the lap using the confirmed corner order and the one hard distance known
// (the 1.3km flat-out straight from Turn 8 into Turn 9) -- not individually
// GPS-verified per corner. Needs a manual alignment pass against the real
// track, same as the other circuits' non-anchor corners.
const racingLine = [
[-37.849757,144.968644],[-37.849559,144.96839],[-37.849361,144.968136],[-37.849162,144.967881],[-37.848964,144.967627],[-37.848721,144.967326],
[-37.848479,144.967025],[-37.848236,144.966723],[-37.847994,144.966422],[-37.847751,144.966121],[-37.847681,144.966034],[-37.847585,144.965997],
[-37.847543,144.966003],[-37.847504,144.966028],[-37.847406,144.966079],[-37.847287,144.966164],[-37.847135,144.966217],[-37.846948,144.966247],
[-37.846811,144.966253],[-37.846544,144.9662],[-37.846408,144.966134],[-37.846266,144.966031],[-37.846152,144.96591],[-37.845941,144.965642],
[-37.845711,144.965324],[-37.84554,144.9651],[-37.845369,144.964876],[-37.845139,144.964603],[-37.844909,144.96433],[-37.844724,144.964111],
[-37.844532,144.963917],[-37.844339,144.963723],[-37.844147,144.963529],[-37.843995,144.963385],[-37.843842,144.96324],[-37.843657,144.963091],
[-37.843471,144.962941],[-37.843206,144.962749],[-37.842941,144.962558],[-37.842676,144.962366],[-37.842453,144.962224],[-37.842286,144.962138],
[-37.842193,144.962149],[-37.842127,144.962198],[-37.842079,144.962319],[-37.842023,144.962725],[-37.841961,144.963109],[-37.841899,144.963493],
[-37.841871,144.963582],[-37.841842,144.963638],[-37.8418,144.963676],[-37.841669,144.963732],[-37.841531,144.963743],[-37.841235,144.96373],
[-37.840939,144.963717],[-37.840643,144.963704],[-37.840347,144.963691],[-37.84013,144.963682],[-37.839913,144.963673],[-37.839876,144.963686],
[-37.839726,144.963849],[-37.839637,144.963998],[-37.839474,144.964283],[-37.839312,144.964569],[-37.839149,144.964855],[-37.838986,144.96514],
[-37.838871,144.965393],[-37.838744,144.965786],[-37.838618,144.966179],[-37.838491,144.966572],[-37.838427,144.966794],[-37.838364,144.967017],
[-37.838268,144.967219],[-37.838172,144.96742],[-37.838025,144.967726],[-37.838006,144.967863],[-37.838005,144.967972],[-37.838052,144.968073],
[-37.838176,144.968206],[-37.838288,144.968367],[-37.838411,144.968587],[-37.838494,144.968867],[-37.838529,144.96923],[-37.838541,144.969558],
[-37.838574,144.969836],[-37.838659,144.970146],[-37.838762,144.97042],[-37.838939,144.970722],[-37.839083,144.970926],[-37.839292,144.971129],
[-37.839552,144.971319],[-37.839817,144.971426],[-37.840022,144.971493],[-37.840194,144.971527],[-37.840492,144.971596],[-37.840789,144.971665],
[-37.841087,144.971734],[-37.841385,144.971803],[-37.841534,144.971805],[-37.841713,144.971775],[-37.841896,144.971701],[-37.842052,144.971614],
[-37.842226,144.971459],[-37.842364,144.971316],[-37.842532,144.971159],[-37.842654,144.97108],[-37.842792,144.971011],[-37.842949,144.970959],
[-37.843277,144.970881],[-37.843604,144.970802],[-37.843932,144.970724],[-37.84426,144.970646],[-37.84442,144.970622],[-37.84461,144.970609],
[-37.844784,144.970609],[-37.8451,144.970628],[-37.845345,144.970674],[-37.845626,144.970759],[-37.845898,144.970864],[-37.846132,144.971],
[-37.846349,144.971142],[-37.846641,144.971378],[-37.846825,144.971536],[-37.846958,144.971694],[-37.84709,144.971852],[-37.847274,144.972113],
[-37.847457,144.972375],[-37.847641,144.972636],[-37.847824,144.972897],[-37.847925,144.973062],[-37.847992,144.973217],[-37.848035,144.973331],
[-37.848088,144.973552],[-37.848102,144.973764],[-37.848094,144.974022],[-37.848093,144.974255],[-37.848086,144.974481],[-37.848091,144.974673],
[-37.848123,144.974837],[-37.848186,144.975001],[-37.848236,144.975113],[-37.848376,144.975312],[-37.84857,144.975601],[-37.848765,144.975889],
[-37.848959,144.976178],[-37.849153,144.976467],[-37.849295,144.976682],[-37.849437,144.976897],[-37.849636,144.977107],[-37.849779,144.977263],
[-37.849992,144.977433],[-37.850308,144.977605],[-37.850506,144.977691],[-37.850704,144.977777],[-37.851016,144.977891],[-37.851327,144.978005],
[-37.851638,144.978119],[-37.85195,144.978233],[-37.852214,144.978324],[-37.852478,144.978415],[-37.852742,144.978506],[-37.852962,144.978558],
[-37.853073,144.978587],[-37.853141,144.97859],[-37.853171,144.978518],[-37.853236,144.978304],[-37.853345,144.977961],[-37.853455,144.977619],
[-37.853564,144.977276],[-37.853675,144.976923],[-37.853786,144.97657],[-37.853897,144.976217],[-37.853915,144.976135],[-37.853926,144.976003],
[-37.853917,144.975842],[-37.853863,144.975676],[-37.853774,144.975508],[-37.853702,144.975409],[-37.853585,144.975314],[-37.85328,144.975105],
[-37.852975,144.974895],[-37.85267,144.974686],[-37.852427,144.974496],[-37.852184,144.974306],[-37.852119,144.974255],[-37.852081,144.974202],
[-37.852065,144.974149],[-37.852062,144.974058],[-37.852091,144.973994],[-37.852294,144.973767],[-37.852498,144.973539],[-37.852701,144.973312],
[-37.852776,144.973217],[-37.852823,144.973115],[-37.852863,144.972987],[-37.852884,144.972873],[-37.852883,144.972771],[-37.852864,144.972649],
[-37.852817,144.97248],[-37.852747,144.972355],[-37.852709,144.972306],[-37.852463,144.972001],[-37.852217,144.971696],[-37.851971,144.971391],
[-37.851725,144.971085],[-37.851479,144.97078],[-37.851233,144.970475],[-37.850987,144.97017],[-37.850741,144.969865],[-37.850495,144.96956],
[-37.850249,144.969254],[-37.850003,144.968949],[-37.849757,144.968644]
];

const SF_POS = [-37.849757, 144.968644];

const stops = [
  { id:0, label:'S/F', name:'Start / Finish Line', isSF:true,
    ...rl(0), sector:0, speed:null, gear:null, dist:'0.00',
    desc:'On the pit straight at the western edge of Albert Park, a public park just south of Melbourne’s CBD that stays open to walkers, joggers, and cyclists all year — closing only for the Grand Prix weekend.',
    facts:[
      {icon:'🏁',tag:'fact',title:'5.278 km, 14 corners',text:"The Albert Park Circuit is <strong>5.278 km</strong> long with 14 turns, raced clockwise. It's one of the shortest circuits on the calendar by lap time but among the highest-speed street circuits, after a full resurface and reprofile ahead of 2022."},
      {icon:'🦢',tag:'fact',title:'Shared with black swans',text:"Albert Park Lake is home to a breeding population of <strong>black swans</strong>, which regularly wander onto the road — sometimes with up to five cygnets in tow — holding up everyday traffic around the park, race week or not."},
      {icon:'🔁',tag:'fact',title:'A circuit that reversed direction',text:"When Albert Park was rebuilt for Melbourne's first race in 1996, the direction of travel was reversed from the original 1950s configuration — the modern circuit runs clockwise where the historic one ran anticlockwise."},
    ]},
  { id:1, label:'T1', name:'Jones',
    ...rl(11), sector:1, speed:null, gear:null, dist:'0.34',
    desc:'A sharp right-hander that kicks off the lap, with a blind apex that makes it a notorious first-lap bottleneck.',
    facts:[
      {icon:'🏆',tag:'fact',title:"Named for Australia's first F1 champion",text:"This corner is named <strong>Jones</strong>, after Alan Jones, who won the 1980 World Championship with Williams — the Jones Grandstand sits right alongside it."},
    ]},
  { id:2, label:'T2', name:'Brabham',
    ...rl(18), sector:1, speed:null, gear:null, dist:'0.43',
    desc:'A fast, sweeping left where drivers open the DRS on the way out.',
    facts:[
      {icon:'🏆',tag:'fact',title:'Named for a three-time champion',text:"Named after <strong>Sir Jack Brabham</strong>, the Australian who won three World Championships (1959, 1960, 1966) — still the only driver in F1 history to win a title in a car of his own construction."},
    ]},
  { id:3, label:'T3', name:'Turn 3',
    ...rl(43), sector:1, speed:110, gear:null, dist:'1.07',
    desc:'Heavy braking into a tight right-hander — one of the more reliable overtaking spots on the lap.',
    facts:[]},
  { id:4, label:'T4', name:'Turn 4',
    ...rl(49), sector:1, speed:null, gear:null, dist:'1.20',
    desc:'A quick move to the left before diving into this tight left-hander.',
    facts:[]},
  { id:5, label:'T5', name:'Whiteford',
    ...rl(59), sector:1, speed:null, gear:null, dist:'1.43',
    desc:'A flat-out right-hander that tests car balance at high speed.',
    facts:[
      {icon:'🏆',tag:'fact',title:'Named for a three-time local winner',text:"Named after <strong>Doug Whiteford</strong>, who won the Australian Grand Prix three times in the 1950s (1950, 1952, 1953) — plus several of the Moomba Trophy meetings held on this very circuit — long before Melbourne ever hosted a round of the F1 World Championship."},
    ]},
  { id:6, label:'T6', name:'Turn 6',
    ...rl(76), sector:1, speed:219, gear:null, dist:'1.86',
    desc:'A medium-speed right-hander requiring precision to keep momentum through the exit.',
    facts:[]},
  { id:7, label:'T7', name:'Marina',
    ...rl(82), sector:2, speed:null, gear:null, dist:'1.99',
    desc:'A fast, flat-out left-hand sweep, marking the start of Lakeside Drive alongside Albert Park Lake.',
    facts:[]},
  { id:8, label:'T8', name:'Lauda',
    ...rl(88), sector:2, speed:null, gear:null, dist:'2.16',
    desc:"A right-hand kink taken flat, named for three-time champion Niki Lauda, leading onto the circuit's longest flat-out section.",
    facts:[
      {icon:'📐',tag:'record',title:'1.3 km at over 330 km/h',text:"From here, cars run flat out for roughly <strong>1.3 km</strong> along Lakeside Drive at speeds over 330 km/h — this stretch used to end in a chicane (the old Turns 9 and 10), removed in 2022 to create the longest, fastest section on the lap."},
    ]},
  { id:9, label:'T9', name:'Turn 9',
    ...rl(132), sector:2, speed:null, gear:null, dist:'3.30',
    desc:"A high-speed left-hander — until 2022 this was the entry to a chicane (then numbered Turn 11); the chicane before it was removed and this corner renumbered down by two.",
    facts:[
      {icon:'⚡',tag:'record',title:'The highest G-forces of the season',text:"Drivers experience roughly <strong>5.1G</strong> through this new high-speed left-right — the highest cornering forces recorded anywhere on the 2025 calendar."},
    ]},
  { id:10, label:'T10', name:'Turn 10',
    ...rl(137), sector:2, speed:null, gear:null, dist:'3.40',
    desc:'The right-hander completing the high-speed left-right — formerly Turn 12, before the 2022 renumbering.',
    facts:[]},
  { id:11, label:'T11', name:'Ascari',
    ...rl(163), sector:3, speed:null, gear:null, dist:'4.09',
    desc:'A tightened, more pronounced 90-degree right-hander — widened from 12 to 15 metres in 2022 — named for two-time champion Alberto Ascari and formerly numbered Turn 13.',
    facts:[]},
  { id:12, label:'T12', name:'Stewart',
    ...rl(174), sector:3, speed:null, gear:null, dist:'4.35',
    desc:'A sharp right-hander named for three-time champion Sir Jackie Stewart, formerly numbered Turn 14.',
    facts:[]},
  { id:13, label:'T13', name:'Senna',
    ...rl(186), sector:3, speed:null, gear:null, dist:'4.61',
    desc:"A tight, widened left-hander that catches drivers out — named for Ayrton Senna, formerly numbered Turn 15, and the start of the lap's final, technical sequence.",
    facts:[]},
  { id:14, label:'T14', name:'Prost',
    ...rl(195), sector:3, speed:null, gear:null, dist:'4.76',
    desc:"A sweeping right-hander under power, named for four-time champion Alain Prost, leading onto the main straight — a strong exit here matters for the whole of next lap.",
    facts:[]},
];

const sectors = [
  {id:0,name:"S/F"},{id:1,name:"Turns 1–8"},{id:2,name:"Lakeside Drive"},{id:3,name:"Final Sequence"},
];
