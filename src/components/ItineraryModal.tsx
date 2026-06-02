import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, MapPin, Utensils, Star, Home as HomeIcon } from 'lucide-react';
import { useState } from 'react';

interface ItineraryItem {
  time?: string;
  activity: string;
  location?: string;
  type?: 'food' | 'activity' | 'travel';
  description?: string;
  hours?: string;
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
      { time: '14:00', activity: '浦東機場 T2 集合，包車前往烏鎮通安客棧', location: '上海浦東機場 T2', type: 'travel' },
      { time: '16:30', activity: '西柵住宿 Check-in', location: '烏鎮西柵', type: 'activity' },
      { time: '20:00', activity: '西柵夜遊、搖櫓船體驗', type: 'activity' },
      { 
        time: '18:30', 
        activity: '景區內民俗家宴', 
        location: '烏鎮西柵景區內各民宿餐廳', 
        type: 'food',
        description: '特色：紅燒羊肉、白水魚、家常地道烏鎮菜',
        hours: '17:00-20:30'
      }
    ]
  },
  {
    date: '6/26',
    title: '南潯到杭州',
    items: [
      { time: '08:00', activity: '西柵早起，簡單遊覽後退房', type: 'activity' },
      { time: '09:30', activity: '包車前往南潯古鎮', type: 'travel' },
      { 
        time: '11:00', 
        activity: '南潯景點快閃：小蓮莊、嘉業堂藏書樓', 
        location: '南潯古鎮內',
        type: 'activity' 
      },
      { 
        time: '12:00', 
        activity: '午餐：求恕里·茴香餐廳', 
        location: '南潯區南西街109號 (南潯古鎮內)', 
        type: 'food', 
        description: '特色：野蔥烤大蝦、主廚特推基腿肉',
        hours: '08:00-22:00'
      },
      { 
        time: '13:00', 
        activity: '南潯求恕里集合，包車前往杭州慶春路城際酒店', 
        location: '杭州市慶春路153號', 
        type: 'travel',
        description: '目的地：城際杭州西湖慶春路酒店 (慶春路153號)'
      },
      { time: '15:00', activity: '抵達杭州，辦理城際酒店 Check-in', type: 'activity' },
      { time: '16:30', activity: '西湖初探：斷橋殘雪、北山路散策', location: '杭州西湖', type: 'activity' },
      { 
        time: '18:30', 
        activity: '晚餐：道地杭幫菜', 
        location: '杭州市西湖區延安路/龍游路', 
        type: 'food',
        description: '特色：西湖醋魚、東坡肉、龍井蝦仁',
        hours: '11:00-21:30'
      }
    ]
  },
  {
    date: '6/27',
    title: '漫遊杭州西湖',
    items: [
      { time: '09:00', activity: '西湖深度遊：雷峰塔、靈隱寺、飛來峰', type: 'activity' },
      { time: '14:30', activity: '河坊街、南宋御街逛街', type: 'activity' },
      { time: '19:00', activity: '武林夜市、西湖音樂噴泉', type: 'activity' },
      { 
        time: '08:30', 
        activity: '杭州早市特色早餐', 
        location: '杭州市中山南路/河坊街周邊', 
        type: 'food',
        description: '特色：片兒川、小籠包、餛飩',
        hours: '06:00-10:00'
      },
      { 
        time: '11:30', 
        activity: '午餐：樓外樓 / 知味觀', 
        location: '杭州西湖孤山路30號', 
        type: 'food', 
        description: '特色：叫花雞、宋嫂魚羹',
        hours: '10:30-20:00'
      },
      { 
        time: '18:00', 
        activity: '晚餐：小河直街美食探店', 
        location: '杭州市拱墅區小河直街', 
        type: 'food',
        description: '特色：體驗運河旁的文藝餐廳',
        hours: '11:00-22:00'
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
                    <motion.div 
                      key={`${activeDay}-${iIdx}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: iIdx * 0.05 }}
                      className="relative pl-10"
                    >
                      <div className={`absolute left-[13px] top-2 w-2.5 h-2.5 rounded-full ring-4 ring-surface ${
                        item.type === 'food' ? 'bg-tertiary' : 
                        item.type === 'travel' ? 'bg-secondary' : 'bg-primary'
                      }`} />
                      
                      <div className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${
                        item.type === 'food' ? 'border-tertiary' : 
                        item.type === 'travel' ? 'border-secondary' : 'border-primary'
                      }`}>
                        {item.time && (
                          <span className="text-xs font-bold text-on-surface-variant/60 block mb-1">
                            {item.time}
                          </span >
                        )}
                        <h3 className="text-xl font-bold text-on-surface leading-tight">
                          {item.activity}
                        </h3>
                        {item.description && (
                          <p className="mt-1.5 text-xs text-on-surface-variant/80 font-medium leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {item.hours && (
                          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-tertiary font-bold bg-tertiary/5 w-fit px-2 py-0.5 rounded-lg">
                            <Clock size={10} />
                            <span>營業時間：{item.hours}</span>
                          </div>
                        )}
                        {item.location && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                            <MapPin size={12} className="text-primary" />
                            <span>{item.location}</span>
                          </div>
                        )}
                        
                        {/* Mapping Action Buttons if location exists */}
                        {item.location && (
                           <div className="mt-4">
                              <a 
                                href={`https://uri.amap.com/search?keyword=${encodeURIComponent(item.location)}&callnative=1`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-bold text-secondary bg-secondary/5 px-4 py-2 rounded-xl border border-secondary/10"
                              >
                                <MapPin size={14} />
                                開啟高德地圖 App
                              </a>
                           </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
