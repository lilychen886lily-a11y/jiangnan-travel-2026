import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, MapPin, Utensils, Star, Home as HomeIcon } from 'lucide-react';
import { useState } from 'react';

interface AlternativeOption {
  name: string;
  activityLabel: string;
  location: string;
  description: string;
  hours?: string;
  rating?: string;
  cost?: string;
  badge?: string;
}

interface ItineraryItem {
  time?: string;
  activity: string;
  location?: string;
  type?: 'food' | 'activity' | 'travel';
  description?: string;
  hours?: string;
  alternatives?: AlternativeOption[];
}

interface DayPlan {
  date: string;
  title: string;
  items: ItineraryItem[];
}

const itineraryData: DayPlan[] = [
  {
    date: '6/25',
    title: '抵達烏鎮',
    items: [
      { 
        time: '13:30', 
        activity: '抵達浦東機場', 
        location: '上海浦東國際機場 T2', 
        type: 'travel',
        description: '航班降落、領取行李並辦理入境集合'
      },
      { 
        time: '14:00', 
        activity: '包車出發前往烏鎮', 
        location: '上海浦東國際機場 T2', 
        type: 'travel',
        description: '預訂專屬兩岸包車，車程約一個半小時直達烏鎮'
      },
      { 
        time: '15:30', 
        activity: '入住烏鎮通安客棧', 
        location: '烏鎮西柵景區通安客棧', 
        type: 'activity',
        description: '辦理景區入住手續，放行李並稍作休息'
      },
      { 
        time: '18:30', 
        activity: '晚餐：明徽徽菜餐廳', 
        location: '烏鎮西柵景區內明徽餐廳', 
        type: 'food',
        description: '享用精美徽菜：二人套餐共4份',
        hours: '11:00-21:00'
      },
      { 
        time: '20:00', 
        activity: '西柵夜遊、搖櫓船體驗', 
        location: '烏鎮西柵景區', 
        type: 'activity',
        description: '感受極致夢幻的江南水鄉夜景與悠閒水道漫遊'
      }
    ]
  },
  {
    date: '6/26',
    title: '入住江南水鄉南潯',
    items: [
      { 
        time: '06:00', 
        activity: '烏鎮西柵水上集市「早茶客」體驗', 
        location: '烏鎮西柵景區水上集市', 
        type: 'food',
        description: '06:00-09:00 憑客房房卡預約，享用烏鎮傳統水上集市熱騰騰的在地早點：燒餅、油條、生煎、餛飩等，體驗晨間熱鬧而充滿煙火氣的水鄉古風'
      },
      { 
        time: '09:00', 
        activity: '慢步西柵景區，感受水鄉晨曦風情', 
        location: '烏鎮西柵景區', 
        type: 'activity',
        description: '晨霧繚繞中幽靜散步，避開日間人潮，細細品味原汁原味的古鎮典雅之美，並完成退房與寄託行李手續'
      },
      { 
        time: '12:00', 
        activity: '午餐：金月亮小院餐廳 (西柵外南門店)', 
        location: '桐鄉市甘泉西路195-201號 (近西柵外南門，步行約6分鐘)', 
        type: 'food',
        description: '地道江南風味江浙菜館，中式庭院意境滿滿。必點菜色：東坡肉、香干馬蘭頭、外婆家酥排骨、特色白水魚、古鎮醬鴨、柴火羊肉、油燜春筍',
        hours: '10:00-23:00'
      },
      { 
        time: '13:30', 
        activity: '搭乘計程車前往南潯古鎮', 
        location: '自烏鎮出發前往南潯', 
        type: 'travel',
        description: '餐後搭計程車直接前往南潯花間堂·求恕里，車程大約 40-50 分鐘，舒適便捷直達下榻客棧'
      },
      { 
        time: '14:30', 
        activity: '入住南潯花間堂·求恕里 / 寄放行李', 
        location: '南潯花間堂·求恕里', 
        type: 'activity',
        description: '辦理寄存行李與登記入住手續，親身感受求恕里中西合璧的精緻私家大宅莊園魅力'
      },
      { 
        time: '15:00', 
        activity: '景區漫遊 & 國風旅拍體驗 (點擊切換)', 
        type: 'activity',
        alternatives: [
          {
            name: '景區自主漫遊',
            activityLabel: '南潯古鎮名勝景點深度自主漫遊',
            location: '南潯古鎮景區內 (小蓮莊、嘉業堂等)',
            description: '放慢腳步，漫遊小蓮莊、嘉業堂藏書樓、中西合璧的張石銘舊宅和紅房子（劉氏梯號），感受南潯純樸典雅、極具文化底蘊且無商業喧嘩的最原味水鄉古鎮風光。',
            badge: '自主純玩/休閒慢生活'
          },
          {
            name: '夢格妝造旅拍',
            activityLabel: '旅拍佳選 A：夢格妝造旅拍 (南潯古鎮店)',
            location: '南潯鎮永安路53號 (距離南潯古鎮入口僅 20 米)',
            description: '大眾點評 4.8 顆星熱播名店！主打精巧漢服/旗袍與古典妝造設計，無隱形消費。人氣團購方案：¥168 單人精緻妝造+服裝租賃一天（自拍必備）、¥218 單人服裝+妝造+含 25 張底片（爆款推薦）、或 ¥288 外景專業拍攝搭配精修 9 張（私人定制）。換上唯美古裝在粉牆黛瓦前留影，體驗一日古風雅士！',
            rating: '4.8 🌟 (268+ 條精選口碑)',
            cost: '人均 ¥214',
            badge: '極高 CP 值/匠心妝造'
          },
          {
            name: '十里寻妆·国风摄影',
            activityLabel: '旅拍佳選 B：十里浔妆·国风摄影 (南浔景区店)',
            location: '南西街徐家弄10号 (景區精華核心地段，步行 2 分鐘內)',
            description: '南潯最頂尖規模的國風漢服館之一，坐擁 2000 多條高人氣點評、4.6 星強烈推薦！主打品質大牌漢服、古風仙氣攝影、精緻復古妝造。推薦團購：¥138 品質漢服妝造體驗、¥299 單人旅拍包精修 6 張且「底片全送」、¥566 甜蜜情侶/閨蜜雙人寫真（含全套美妝髮型）。身披飄逸水紗、站在百間樓河畔或手持油紙傘漫步臨河古道，成片效果極具江南古風意境風情！',
            rating: '4.6 🌟 (2129+ 條超人氣點評)',
            cost: '人均 ¥290',
            badge: '金牌連鎖/網紅打卡名店'
          }
        ]
      },
      { 
        time: '18:30', 
        activity: '晚餐方案選擇 (點擊切換)', 
        type: 'food', 
        alternatives: [
          {
            name: '求恕里·茴香餐廳',
            activityLabel: '晚餐方案 A：求恕里·茴香餐廳',
            location: '南潯區南西街109號 (求恕里茴香餐廳)',
            description: '於花間堂附設茴香餐廳享用豐盛高端的江南私房菜。主廚力推好菜：野蔥烤大蝦、花雕竹林雞、私房潯蹄等在地招牌美味。古宅莊園用餐氛圍格外精緻典雅。',
            hours: '11:00-21:30',
            rating: '4.5 🌟',
            cost: '人均 ¥120',
            badge: '古宅私房菜'
          },
          {
            name: '潯湘記·老味下飯菜',
            activityLabel: '晚餐方案 B：潯湘記·老味下飯菜 (南潯古鎮店)',
            location: '南潯區南潯鎮東大街79-1號 (景區內東大街79-1號，絕佳臨河伴水席)',
            description: '湖州農家菜新店熱門榜第1名！擁有絕佳臨河露台伴水位置，一邊賞景一邊品嚐。主打地道江南農家下飯菜，口味精緻、極佳性價比。特色推薦：東坡肉、香干馬蘭頭、清蒸白水魚、古鎮醬鴨、柴火羊肉、油燜春筍。',
            hours: '10:00-21:30',
            rating: '4.2 🌟 (438+ 條點評)',
            cost: '人均 ¥72',
            badge: '景區臨河第一'
          },
          {
            name: '百間樓·水宴餐廳',
            activityLabel: '晚餐方案 C：百間樓·水宴餐廳 (南潯古鎮店)',
            location: '南潯區南潯古鎮東大街111號 (景區內臨河河景)',
            description: '湖州江浙菜打卡人氣榜第1名！座落於百間樓歷史街區，享有絕佳臨河與江南水鄉古鎮景緻。入夜後紅燈高掛，波光瀲灩，用餐意境極富詩意。主打蘇浙名菜、太湖特產，並有特色網紅雕花糕點「我在南潯等你」，性價比與美譽度兼具。',
            hours: '10:00-21:00',
            rating: '4.7 🌟 (2039+ 條點評)',
            cost: '人均 ¥79',
            badge: '江浙菜人氣榜第一'
          }
        ]
      },
      { 
        time: '20:30', 
        activity: '百間樓幽靜夜景散步', 
        location: '南潯百間樓歷史街區', 
        type: 'activity',
        description: '漫步最精美的百間樓，欣賞沿河紅燈籠倒映在水中的幽靜夜景，別有一番寧靜祥和的古鎮韻味'
      },
      {
        time: '21:30',
        activity: '夜間舒壓按摩/SPA選擇 (點擊切換)',
        type: 'activity',
        alternatives: [
          {
            name: '鹿栖·精油SPA',
            activityLabel: '按摩方案 A：鹿栖·精油SPA (南潯吾悅店)',
            location: '南潯鎮南林路518號瑞麟商業中心B座218-219號 (南潯區中心城區)',
            description: '懂你所需，打造滿意服務。細心呵護讓您全程享有高級感的精緻 SPA。推薦方案：70分鐘按摩SPA經絡刷 (特惠 ¥159)、30分鐘小舒服採耳 (¥69)、50分鐘精油SPA放鬆、15分鐘刮痧/拔罐二選一 (¥24) 等，洗去一日旅途辛勞。',
            rating: '4.9 🌟 (519 條熱門好評)',
            cost: '人均 ¥186',
            badge: '連鎖高奢精油SPA'
          },
          {
            name: '圣园轩影院式足道',
            activityLabel: '按摩方案 B：圣园轩影院式足道 (年丰路店)',
            location: '南潯鎮年丰路258号 (距南浔文园步行1.3km)',
            description: '精湛技藝、品質服務！一邊享受專業足療，一邊躺在高清影院式包間內舒服地觀看大片，並配有貼心的輕奢簡餐（乾乾淨淨水餃、湯品等）與免費停車服務。推薦套餐：【嘗鮮體驗】保健一式足療+輕奢簡餐 (70分鐘 ¥139)、【技術之星】調理三式足療+輕奢簡餐 (90分鐘 ¥199)。',
            rating: '4.8 🌟 (1022+ 條高分點評)',
            cost: '人均 ¥131',
            badge: '影院式足道 · 含精美簡餐'
          }
        ]
      }
    ]
  },
  {
    date: '6/27',
    title: '南潯前往杭州與西湖初探',
    items: [
      { 
        time: '08:30', 
        activity: '享用求恕里精緻特色早餐', 
        location: '南潯花間堂·求恕里', 
        type: 'food',
        description: '享用精美養生雙人早餐，體驗古宅悠閒清晨'
      },
      { 
        time: '09:30', 
        activity: '退房，包車前往杭州市區', 
        location: '南潯花間堂·求恕里', 
        type: 'travel',
        description: '包車前往杭州慶春路城際酒店，車程約1.5小時'
      },
      { 
        time: '11:00', 
        activity: '抵達杭州，辦理城際酒店 Check-in / 寄存行李', 
        location: '城際杭州西湖慶春路酒店', 
        type: 'activity',
        description: '辦理入住流程並稍事休息，準備開啟杭州西湖之旅'
      },
      { 
        time: '12:00', 
        activity: '午餐：道地老字號杭幫菜', 
        location: '新豐小吃 / 知味觀 (慶春路店)', 
        type: 'food',
        description: '品嚐小籠包、蝦肉餛飩、貓耳朵、片兒川等經典杭州小吃與精緻名點',
        hours: '06:30-21:00'
      },
      { 
        time: '13:30', 
        activity: '西湖深度遊：雷峰塔、靈隱寺、飛來峰', 
        location: '雷峰塔景區 & 靈隱景區', 
        type: 'activity',
        description: '登臨雷峰塔俯瞰西湖全景，隨後前往千年古剎靈隱寺，參觀石窟藝術飛來峰，祈福許願'
      },
      { 
        time: '17:30', 
        activity: '步行街漫遊：河坊街、南宋御街逛街', 
        location: '河坊街歷史文化街區', 
        type: 'activity',
        description: '感受南宋京城的繁華，品味手工茶、特色伴手禮與西湖文創'
      },
      { 
        time: '19:00', 
        activity: '晚餐：高人氣特色杭幫餐館', 
        location: '綠茶餐廳 / 外婆家 (西湖周邊店)', 
        type: 'food',
        description: '特色：綠茶烤雞、東坡肉、龍井蝦仁、西湖醋魚等美味菜餚',
        hours: '11:00-21:30'
      },
      { 
        time: '20:30', 
        activity: '醉美西湖夜景與音樂噴泉', 
        location: '西湖湖濱公園音樂噴泉', 
        type: 'activity',
        description: '散步至湖濱路，欣賞華麗動人的西湖音樂噴泉（視當日開放時段而定）'
      }
    ]
  },
  {
    date: '6/28',
    title: '西湖與上海之夜',
    items: [
      { time: '09:30', activity: '西湖二遊 (蘇堤漫步)', type: 'activity' },
      { time: '13:00', activity: '高鐵商務艙回上海', type: 'travel' },
      { time: '16:00', activity: '南京步行街、外灘散策', type: 'activity' },
      { time: '20:30', activity: '上海豫園夜景', location: '豫園商城', type: 'activity' },
      { 
        time: '08:00', 
        activity: '杭州早市特色早餐', 
        location: '杭州市中山南路/河坊街周邊', 
        type: 'food',
        description: '特色：片兒川、小籠包、餛飩',
        hours: '06:00-10:00'
      },
      { 
        time: '14:30', 
        activity: '午餐：萊萊小籠 (米其林必比登)', 
        location: '上海市黃浦區天津路506號', 
        type: 'food',
        description: '特色：蟹粉小籠包、松茸小籠、薑絲醋',
        hours: '08:30-20:00'
      },
      { 
        time: '18:30', 
        activity: '晚餐：外灘家宴·上海菜', 
        location: '上海市黃浦區中山東二路22號2樓', 
        type: 'food', 
        description: '特色：紅燒肉、油爆蝦、蟹粉豆腐；飽覽黃浦江景',
        hours: '11:00-14:30, 17:00-21:30'
      },
      { 
        time: '21:30', 
        activity: '宵夜：玉蘭廂·上海老味道', 
        location: '上海市黃浦區豫園商城和豐樓3樓', 
        type: 'food',
        description: '特色：傳統上海名點、名廚工匠館手工點心',
        hours: '10:00-21:30'
      },
      { 
        time: '建議', 
        activity: '人和館 (南京東路店)', 
        location: '上海市黃浦區南京東路819號百聯世茂國際廣場7樓', 
        type: 'food',
        description: '特色：金牌紅燒肉、蟹粉豆腐、本幫熏魚；1930年代老上海懷舊風',
        hours: '11:00-14:30, 17:00-21:30'
      },
      { 
        time: '建議', 
        activity: '光明邨大酒家 (淮海中路店)', 
        location: '上海市黃浦區淮海中路588號 (近南京東路商圈)', 
        type: 'food',
        description: '特色：鮮肉月餅(排隊名物)、醬鴨、燻魚；上海必買老字號',
        hours: '07:00-21:00 (一樓熟食點心)'
      },
      { 
        time: '建議', 
        activity: '沈大成 (南京東路總店)', 
        location: '上海市黃浦區南京東路636號', 
        type: 'food',
        description: '特色：青團、條頭糕、雙釀團、蟹粉小籠；百年糕點名店',
        hours: '09:00-21:30'
      },
      { 
        time: '建議', 
        activity: '小楊生煎 (南京東路店)', 
        location: '上海市黃浦區南京東路212號L125室 (近長江大樓)', 
        type: 'food',
        description: '特色：三拼生煎、酸辣粉；皮脆汁多，經典平價推薦',
        hours: '10:00-22:00'
      },
      { 
        time: '建議', 
        activity: '鮮得來排骨年糕 (總店)', 
        location: '上海市黃浦區雲南南路46號 (地鐵大世界站附近)', 
        type: 'food',
        description: '特色：排骨年糕、小餛飩、單檔雙檔；上海童年記憶的味道',
        hours: '10:00-21:00'
      }
    ]
  },
  {
    date: '6/29',
    title: '上海收尾與歸途',
    items: [
      { time: '08:30', activity: '豫園商城最後漫步、伴手禮選購', location: '上海豫園', type: 'activity' },
      { time: '11:30', activity: '橘子水晶酒店辦理退房', location: '橘子水晶上海豫園酒店', type: 'activity' },
      { 
        time: '12:00', 
        activity: '午餐：豫園附近老字號美食', 
        location: '上海城隍廟/豫園周邊', 
        type: 'food',
        description: '推薦：南翔饅頭店 (蟹粉小籠)',
        hours: '08:00-20:00'
      },
      { time: '16:00', activity: '飯店門口集合，包車前往浦東機場', location: '橘子水晶上海豫園酒店', type: 'travel' },
      { time: '17:00', activity: '抵達浦東機場 T2，辦理登機手續', location: '上海浦東機場 T2', type: 'travel' },
      { time: '20:05', activity: '搭乘長榮航空 BR721 返回台北', type: 'travel' }
    ]
  }
];

function ItineraryItemRow({ item, activeDay, iIdx }: { item: ItineraryItem; activeDay: number; iIdx: number; key?: string }) {
  const [selectedAltIndex, setSelectedAltIndex] = useState(0);

  const hasAlternatives = !!item.alternatives && item.alternatives.length > 0;
  const currentOption = (hasAlternatives && item.alternatives) ? item.alternatives[selectedAltIndex] : null;

  const displayActivity = currentOption ? currentOption.activityLabel : item.activity;
  const displayDescription = currentOption ? currentOption.description : item.description;
  const displayLocation = currentOption ? currentOption.location : item.location;
  const displayHours = currentOption ? currentOption.hours : item.hours;

  return (
    <motion.div 
      key={`${activeDay}-${iIdx}-${selectedAltIndex}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: iIdx * 0.05 }}
      className="relative pl-10"
    >
      <div className={`absolute left-[13px] top-4 w-2.5 h-2.5 rounded-full ring-4 ring-surface ${
        item.type === 'food' ? 'bg-tertiary' : 
        item.type === 'travel' ? 'bg-secondary' : 'bg-primary'
      }`} />
      
      <div className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${
        item.type === 'food' ? 'border-tertiary' : 
        item.type === 'travel' ? 'border-secondary' : 'border-primary'
      }`}>
        {item.time && (
          <span className="text-xs font-bold text-on-surface-variant/60 block mb-1.5">
            {item.time}
          </span>
        )}

        {/* Options tabs if alternatives exist */}
        {hasAlternatives && item.alternatives && (
          <div className="flex gap-1 mb-3.5 p-1 bg-slate-100 rounded-xl border border-slate-200/40">
            {item.alternatives.map((alt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedAltIndex(idx)}
                className={`flex-1 text-center py-2 px-1.5 rounded-lg text-xs font-black transition-all duration-200 ${
                  selectedAltIndex === idx
                    ? 'bg-primary text-white shadow-sm scale-[1.02]'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/40'
                }`}
              >
                {alt.name}
              </button>
            ))}
          </div>
        )}

        {currentOption && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {currentOption.badge && (
              <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-black">
                {currentOption.badge}
              </span>
            )}
            {currentOption.rating && (
              <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200/50 px-2 py-0.5 rounded-full font-black flex items-center gap-0.5">
                <Star size={10} className="fill-amber-500 stroke-amber-500" />
                {currentOption.rating}
              </span>
            )}
            {currentOption.cost && (
              <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200/50 px-2 py-0.5 rounded-full font-black">
                {currentOption.cost}
              </span>
            )}
          </div>
        )}

        <h3 className="text-xl font-bold text-on-surface leading-tight">
          {displayActivity}
        </h3>
        {displayDescription && (
          <p className="mt-1.5 text-xs text-on-surface-variant/80 font-medium leading-relaxed">
            {displayDescription}
          </p>
        )}
        {displayHours && (
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-tertiary font-bold bg-tertiary/5 w-fit px-2 py-0.5 rounded-lg">
            <Clock size={10} />
            <span>營業時間：{displayHours}</span>
          </div>
        )}
        {displayLocation && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
            <MapPin size={12} className="text-primary" />
            <span>{displayLocation}</span>
          </div>
        )}
        
        {/* Mapping Action Buttons if location exists */}
        {displayLocation && (
           <div className="mt-4">
              <a 
                href={`https://uri.amap.com/search?keyword=${encodeURIComponent(displayLocation)}&callnative=1`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-secondary bg-secondary/5 px-4 py-2 rounded-xl border border-secondary/10 hover:bg-secondary/10 transition-colors"
              >
                <MapPin size={14} />
                開啟高德地圖 App
              </a>
           </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ItineraryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-0 bg-surface z-[70] flex flex-col shadow-2xl safe-bottom"
          >
            {/* Header */}
            <div className="p-6 flex justify-between items-center bg-white/80 backdrop-blur shadow-sm">
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-primary transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold text-primary">
                {itineraryData[activeDay].date} 第 {activeDay + 1} 天行程
              </h2>
              <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Day Selector Tabs */}
            <div className="sticky top-0 z-40 bg-white border-b border-outline-variant/20">
              <div className="flex overflow-x-auto no-scrollbar py-4 px-4 gap-3">
                {itineraryData.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDay(idx)}
                    className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-bold transition-all ${
                      activeDay === idx 
                        ? 'bg-primary text-white shadow-md scale-105' 
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                  >
                    Day 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 max-w-md mx-auto w-full">
              <section className="mb-6 mt-2 space-y-4">
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 active:scale-95 transition-all"
                >
                  <HomeIcon size={20} />
                  返回首頁
                </button>
              </section>

              {/* Timeline */}
              <div className="space-y-6 relative pb-10">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-primary/10"></div>
                
                {itineraryData[activeDay].items.map((item, iIdx) => (
                  <ItineraryItemRow 
                    key={`${activeDay}-${iIdx}`}
                    item={item}
                    activeDay={activeDay}
                    iIdx={iIdx}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
