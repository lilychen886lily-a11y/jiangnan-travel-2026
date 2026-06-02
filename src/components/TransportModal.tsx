import { useState } from 'react';
import { X, Car, MapPin, Clock, Info, Phone, Train, Compass, CreditCard, Bus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TransportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransportModal({ isOpen, onClose }: TransportModalProps) {
  const [activeTab, setActiveTab] = useState<'charter' | 'transit'>('charter');

  const transfers = [
    {
      title: "6/25 機場接送 (去程)",
      route: "上海浦東機場 (PVG) ➝ 烏鎮通安客棧",
      details: [
        { label: "日期", value: "2026年6月25日 (週四)" },
        { label: "集合時間", value: "14:00", highlight: true },
        { label: "集合地點", value: "浦東機場 T2 航廈", highlight: true },
        { label: "目的地", value: "烏鎮西柵通安客棧" },
        { label: "車型", value: "九人座商務車 (預估)" }
      ],
      note: "下飛機後請確保手機暢通，司機會在 T2 指定區域等候。"
    },
    {
      title: "6/26 包車接送 (南潯➝杭州)",
      route: "南潯古鎮求恕里 ➝ 杭州慶春路城際酒店",
      details: [
        { label: "日期", value: "2026年6月26日 (週五)" },
        { label: "集合時間", value: "13:00", highlight: true },
        { label: "集合地點", value: "南潯古鎮求恕里門口", highlight: true },
        { label: "目的地", value: "杭州市慶春路153號 (城際酒店)" },
        { label: "車型", value: "九人座商務車 (預估)" }
      ],
      note: "請於求恕里辦理退房後，在門口與司機會合。"
    },
    {
      title: "6/29 機場接送 (回程)",
      route: "橘子水晶豫園酒店 ➝ 上海浦東機場 (PVG)",
      details: [
        { label: "日期", value: "2026年6月29日 (週一)" },
        { label: "出發時間", value: "16:00 (建議)", highlight: true },
        { label: "出發地點", value: "橘子水晶上海豫園酒店門口" },
        { label: "目的地", value: "浦東機場 T2 航廈" }
      ],
      note: "回程航班為 20:05，建議提早 3-4 小時出發以防塞車。"
    }
  ];

  const transitInfo = [
    {
      date: "6/26 (週五)",
      title: "烏鎮 ➝ 南潯 跨市交通路程",
      type: "bus",
      icon: Bus,
      route: "烏鎮西柵 ➝ 南潯古鎮",
      highlights: [
        { label: "路程距離", value: "約 45 公里" },
        { label: "行車時間", value: "約 60 分鐘", highlight: true },
        { label: "交通方式", value: "包車直達 / 的士 (TAXI)" },
        { label: "建議時間", value: "09:30 出發" }
      ],
      note: "一早於烏鎮西柵漫步與辦理退房後，於 09:30 搭乘包車直達南潯古鎮，預計 11:00 抵達景區，剛好可以先快速遊覽小蓮莊及嘉業堂，隨後於 12:00 在求恕里·茴香餐廳享用午餐地道美味。"
    },
    {
      date: "6/27 (週六)",
      title: "杭州地鐵 景點穿梭＆西湖漫遊",
      type: "subway",
      icon: Train,
      route: "雷鋒塔、靈隱寺、河坊街、武林夜市",
      highlights: [
        { label: "推薦支付", value: "支付寶 乘車碼", highlight: true },
        { label: "地鐵票價", value: "2元 - 9元 (按里程計費)" },
        { label: "酒店近站", value: "2號線 萬安橋站 / 1號線 龍翔橋站" },
        { label: "熱門線路", value: "地鐵 1 號線、2 號線" }
      ],
      guides: [
        { name: "西湖湖濱/音樂噴泉", desc: "搭乘 1 號線至「龍翔橋站」C出口，步行即抵西湖核心地帶。" },
        { name: "河坊街/南宋御街", desc: "搭乘 1 號線至「定安路站」D出口，步行約 5 分鐘抵達歷史街區。" },
        { name: "靈隱寺、飛來峰", desc: "由於地鐵不直達景區內部，建議由「龍翔橋站」或「東岳站」轉乘景區接駁專線/公交，或直接打車前往。" },
        { name: "武林夜市", desc: "搭乘 1 號線至「鳳起路站」E出口，過街即可開逛。" }
      ],
      note: "杭州地鐵極度便利，推薦提前在「支付寶 (Alipay)」搜尋「杭州地鐵乘車碼」或「杭州公共交通碼」領取，不用排隊購票，隨掃即用！"
    },
    {
      date: "6/28 (週日)",
      title: "上海地鐵 豫園/外灘/南京路都會線路",
      type: "subway",
      icon: Train,
      route: "上海站/高鐵 ➝ 豫園 ➝ 外灘 ➝ 飯店",
      highlights: [
        { label: "推薦支付", value: "支付寶上海地鐵碼 / Metro大都會App", highlight: true },
        { label: "酒店近站", value: "10號線 / 14號線 豫園站 (極近)", highlight: true },
        { label: "高鐵轉乘", value: "從上海虹橋/上海站皆可轉乘地鐵" },
        { label: "核心樞紐", value: "南京東路站 (2號線、10號線雙線)" }
      ],
      guides: [
        { name: "豫園至橘子水晶酒店", desc: "地鐵「豫園站」出站即為豫園商城核心區及豫園地鐵商圈，至飯店步行幾分鐘內抵達。" },
        { name: "外灘 & 南京路步行街", desc: "搭乘 10 號線從「豫園站」往北僅搭 1 站，在「南京東路站」下車，沿南京東路漫步 10 分鐘即可直達外灘欣賞震憾夜景。" },
        { name: "虹橋火車站 ➝ 飯店", desc: "高鐵抵達虹橋站後，可直接搭乘地鐵 10 號線直達「豫園站」無須轉乘，車程約 40 分鐘，對行李多者非常友善！" }
      ],
      note: "上海地鐵與國內其他城市互聯互認，你可以直接在支付寶「切換城市至上海」，領取「上海地鐵乘車碼」掃碼進站。若搭乘高鐵帶大件行李，10 號線是完美的黃金線路！"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-1/12 bg-surface z-[70] flex flex-col rounded-t-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-outline-variant/10 bg-white">
              <h2 className="text-xl font-extrabold text-[#005d90] flex items-center gap-2">
                <Compass className="animate-spin text-[#005d90]" style={{ animationDuration: '6s' }} size={24} />
                交通 & 行程路網資訊
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Custom Interactive Tab Switcher */}
            <div className="bg-white px-6 py-2 border-b border-outline-variant/10 flex gap-2">
              <button
                onClick={() => setActiveTab('charter')}
                className={`flex-1 py-3 text-sm font-bold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'charter'
                    ? 'bg-[#e0f2fe] text-[#005d90] shadow-sm'
                    : 'text-slate-400 hover:text-[#005d90]'
                }`}
              >
                <Car size={18} />
                預訂專車 & 接送
              </button>
              <button
                onClick={() => setActiveTab('transit')}
                className={`flex-1 py-3 text-sm font-bold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'transit'
                    ? 'bg-[#e0f2fe] text-[#005d90] shadow-sm'
                    : 'text-slate-400 hover:text-[#005d90]'
                }`}
              >
                <Train size={18} />
                自由行 & 區域交通
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 bg-surface-container-low">
              {activeTab === 'charter' ? (
                <>
                  {transfers.map((transfer, idx) => (
                    <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#005d90]/10 flex items-center justify-center text-[#005d90]">
                          <Clock size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-on-surface tracking-tight">{transfer.title}</h3>
                          <p className="text-xs font-bold text-[#005d90] uppercase tracking-wider">{transfer.route}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 pt-2">
                        {transfer.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex justify-between items-center py-2 border-b border-outline-variant/5 last:border-0 text-sm">
                            <span className="text-on-surface-variant font-medium">{detail.label}</span>
                            <span className={`font-bold ${detail.highlight ? 'text-[#005d90]' : 'text-on-surface'}`}>
                              {detail.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-[#9d370c]/5 rounded-2xl p-4 flex gap-3 items-start">
                        <Info size={18} className="text-[#9d370c] mt-0.5 shrink-0" />
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {transfer.note}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-[#005d90] rounded-3xl p-6 text-white shadow-lg shadow-[#005d90]/20">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                      <Phone size={18} />
                      聯繫包車公司/司機
                    </h4>
                    <p className="text-sm text-white/80 mb-4 font-medium italic">
                      接機與包車司機詳細資料，將於出發前 24 小時由包車商提供派遣簡訊。
                    </p>
                    <button className="w-full bg-white/25 hover:bg-white/35 backdrop-blur-md py-3 rounded-2xl font-bold transition-colors cursor-pointer text-sm">
                      查閱完整預約細節
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Transit Guides */}
                  {transitInfo.map((info, idx) => (
                    <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/10 space-y-4">
                      {/* Title Bar */}
                      <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#00677d]/10 flex items-center justify-center text-[#00677d]">
                            <info.icon size={22} />
                          </div>
                          <div>
                            <span className="text-xs font-black text-[#9d370c] bg-[#9d370c]/10 px-2 py-0.5 rounded-full">{info.date}</span>
                            <h3 className="text-base font-black text-on-surface tracking-tight mt-0.5">{info.title}</h3>
                          </div>
                        </div>
                      </div>

                      {/* Route Map Header */}
                      <div className="bg-slate-50 rounded-2xl p-3 flex items-center justify-center gap-2 text-xs font-extrabold text-[#00677d] tracking-wide uppercase">
                        <span>{info.route.split(' ➝ ')[0]}</span>
                        <ArrowRight size={14} className="text-slate-400 animate-pulse" />
                        <span>{info.route.split(' ➝ ')[1]}</span>
                      </div>

                      {/* Highlights Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {info.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="bg-slate-50/50 p-3 rounded-2xl flex flex-col justify-center">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider small-caps">{highlight.label}</span>
                            <span className={`text-xs font-black mt-1 ${highlight.highlight ? 'text-[#005d90]' : 'text-on-surface'}`}>
                              {highlight.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Specific Guides (if any) */}
                      {info.guides && (
                        <div className="space-y-3 pt-2">
                          <h4 className="text-xs font-black text-on-surface-variant flex items-center gap-1.5 uppercase tracking-wider">
                            <Compass size={14} className="text-primary" />
                            熱門景點與酒店路網
                          </h4>
                          <div className="space-y-2.5">
                            {info.guides.map((guide, gIdx) => (
                              <div key={gIdx} className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-1.5 h-1.5 bg-[#005d90] rounded-full" />
                                  <span className="text-xs font-black text-on-surface">{guide.name}</span>
                                </div>
                                <p className="text-xs text-on-surface-variant pl-3.5 font-medium leading-relaxed">{guide.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Note */}
                      <div className="bg-[#005d90]/5 rounded-2xl p-4 flex gap-3 items-start">
                        <Info size={18} className="text-[#005d90] mt-0.5 shrink-0" />
                        <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                          {info.note}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Smart Travel Tips Card */}
                  <div className="bg-gradient-to-br from-[#00677d] to-[#005d90] rounded-3xl p-6 text-white shadow-lg space-y-3">
                    <h4 className="font-extrabold text-sm flex items-center gap-2">
                      <CreditCard size={18} />
                      行前地鐵乘車準備貼事
                    </h4>
                    <p className="text-xs text-white/90 leading-relaxed font-medium">
                      不論是在杭州還是上海，使用「支付寶 App (Alipay)」領取乘車碼，即可免去繁瑣的排隊現金購票流程。高鐵出站後便能即刻掃碼入閘，既高效又極為省時。
                    </p>
                    <div className="h-px bg-white/20 my-2" />
                    <div className="flex gap-4 text-[11px] font-black tracking-wider text-white/85">
                      <div className="flex items-center gap-1">✅ 支付寶一鍵切換城市</div>
                      <div className="flex items-center gap-1">✅ 實名認證免密扣款</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

