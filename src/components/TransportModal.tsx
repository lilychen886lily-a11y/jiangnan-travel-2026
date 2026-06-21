import { useState } from 'react';
import { X, Car, MapPin, Clock, Info, Phone, Train, Compass, CreditCard, Bus, ArrowRight, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TransportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransportModal({ isOpen, onClose }: TransportModalProps) {
  const [activeTab, setActiveTab] = useState<'charter' | 'transit'>('charter');
  const [copied, setCopied] = useState(false);

  const handleCopyOrder = () => {
    navigator.clipboard.writeText('EJ11282428');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      title: "6/27 包車接送 (南潯➝杭州)",
      route: "南潯古鎮求恕里 ➝ 杭州慶春路城際酒店",
      details: [
        { label: "日期", value: "2026年6月27日 (週六)" },
        { label: "集合時間", value: "09:30", highlight: true },
        { label: "集合地點", value: "南潯古鎮求恕里門口", highlight: true },
        { label: "目的地", value: "杭州市慶春路153號 (城際酒店)" },
        { label: "車型", value: "九人座商務車 (預估)" }
      ],
      note: "請於求恕里辦理退房後，在門口與司機會合。"
    },
    {
      title: "6/28 計程車接送 (飯店➝杭州東站)",
      route: "城際杭州西湖慶春路酒店 ➝ 杭州東站 (北一出口)",
      details: [
        { label: "日期", value: "2026年6月28日 (週日)" },
        { label: "出發時間", value: "13:00 (建議)", highlight: true },
        { label: "出發地點", value: "城際杭州西湖慶春路酒店大堂門口" },
        { label: "目的地", value: "杭州東站 (北一出口)", highlight: true },
        { label: "交通方式", value: "自理計程車 (TAXI) / 滴滴出行" }
      ],
      note: "從飯店搭乘計程車前往杭州東站北一出口，車程約 20-30 分鐘，乘高鐵 G7542 (14:05 開車)，請於 13:30 前完成安檢進站。"
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

  interface TransitItem {
    date: string;
    title: string;
    type: string;
    icon: any;
    route: string;
    highlights?: Array<{ label: string; value: string; highlight?: boolean }>;
    guides?: Array<{ name: string; desc: string }>;
    note: string;
    orderNo?: string;
    orderDate?: string;
    trainNo?: string;
    depTime?: string;
    arrTime?: string;
    duration?: string;
    gate?: string;
    passengers?: Array<{ name: string; seat: string; type: string; price: number }>;
  }

  const transitInfo: TransitItem[] = [
    {
      date: "6/26 (週五)",
      title: "烏鎮 ➝ 南潯 跨市交通路程",
      type: "bus",
      icon: Bus,
      route: "烏鎮西柵 ➝ 南潯古鎮",
      highlights: [
        { label: "路程距離", value: "約 45 公里" },
        { label: "行車時間", value: "約 60 分鐘", highlight: true },
        { label: "交通方式", value: "的士 (TAXI) / 包車直達" },
        { label: "建議時間", value: "13:30 出發", highlight: true }
      ],
      note: "午前全體成員繼續在烏鎮西柵景區悠閒漫步，12:00 於西柵景區外「金月亮小院餐廳」享用深受好評的在地江浙小院美饌。午餐後於 13:30 搭乘計程車或包車直接前往南潯古鎮下榻，約在 14:30 抵達求恕里辦理入住。"
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
        { name: "🚲 西湖公共自行車 (小紅車)", desc: "杭州世界聞名的「小紅車」，免押金、首小時免費、隨後僅 ¥1/小時。用手機「微信」或「支付寶」搜尋「叮嗒出行」小程序即可直接掃碼起騎！是用最在地、最愜意且免受塞車之苦漫遊西湖（白堤、蘇堤、楊公堤）的最佳方式！" },
        { name: "🛺 西湖環湖觀光遊覽車 (雷峰塔 ⇄ 岳墳)", desc: "西湖遊覽車中人氣最高、最精華的半環景觀路段。採用復古式木製敞篷設計，可隨風舒心欣賞湖光山色。票價依區間計費（約 ¥10/人/區，招手即停，隨上隨下），特別推薦「雷峰塔 ⇄ 岳墳」這段經由蘇堤的亮麗路線，對保留長輩體力、愜意乘車兜風而言堪稱絕配！" },
        { name: "靈隱寺、飛來峰", desc: "由於地鐵不直達景區內部，建議由「龍翔橋站」或「東岳站」轉乘景區接駁專線/公交，或直接打車前往。" },
        { name: "武林夜市", desc: "搭乘 1 號線至「鳳起路站」E出口，過街即可開逛。" },
        { name: "🚴‍♀️ LYVA 碳纖維電助力車 2小時租賃", desc: "去騎，更自由！超高顏值且特別省力的碳纖維電助力自行車！在西湖景區周邊多個自助租賃點聯網掃碼隨時起騎（免預約）。大眾點評特惠：【2小時租賃卡】約 ¥68/人，踩踏時會自動提供電能輔助，上堤、爬坡不費吹灰之力，極速捕抓西湖微風！" },
        { name: "🛵 出騎租行·租電動車 (西湖六公園店)", desc: "大眾點評超熱門的西湖電動小電驢租賃名鋪！座落在六公園與斷橋旁，取車極度便捷，為旅友們提供遊西湖和楊公堤環島零體耐力消耗的愜意追風出行體驗！大眾點評特惠：經典豪華款當日還僅需 ¥30/輛，24小時租賃僅需 ¥38/輛。店內備有安全帽並可提供行李寄放服務。" }
      ],
      note: "杭州地鐵極度便利，推薦提前在「支付寶 (Alipay)」搜尋「杭州地鐵乘車碼」或「杭州公共交通碼」領取，不用排隊購票，隨掃即用！"
    },
    {
      date: "6/28 (週日)",
      title: "🚄 高鐵 G7542 返程火車 (杭州東 ➔ 上海南)",
      type: "hsr",
      icon: Train,
      route: "杭州東站 ➝ 上海南站",
      orderNo: "EJ11282428",
      orderDate: "2026.06.14",
      trainNo: "G7542",
      depTime: "14:05",
      arrTime: "15:11",
      duration: "1小時6分",
      gate: "19A",
      passengers: [
        { name: "邱怡雯", seat: "09車 07C號", type: "過道", price: 138 },
        { name: "陳京慧", seat: "09車 07D號", type: "過道", price: 138 },
        { name: "陳瓊花", seat: "09車 06A號", type: "靠窗", price: 138 },
        { name: "孫子寧", seat: "09車 06D號", type: "過道", price: 138 },
        { name: "楊坤泰", seat: "09車 07A號", type: "靠窗", price: 138 },
        { name: "黃有強", seat: "09車 07F號", type: "靠窗", price: 138 },
        { name: "吳俊賢", seat: "09車 06C號", type: "過道", price: 138 },
        { name: "曾子庭", seat: "09車 06F號", type: "靠窗", price: 138 }
      ],
      note: "全體旅客請持「台胞證」直接在自動閘機或人工通道刷證件進站驗票，無須換取實體紙本車票。發車時間為 14:05，建議最遲於 13:25 抵達杭州東站，以留足安檢與進站步行時間。"
    },
    {
      date: "6/28 (週日)",
      title: "上海地鐵 豫園/外灘/南京路都會線路",
      type: "subway",
      icon: Train,
      route: "上海南站 (高鐵 G7542) ➝ 豫園 ➝ 外灘 ➝ 飯店",
      highlights: [
        { label: "推薦支付", value: "支付寶上海地鐵碼 / Metro大都會App", highlight: true },
        { label: "酒店近站", value: "10號線 / 14號線 豫園站 (極近)", highlight: true },
        { label: "高鐵轉乘", value: "從上海南站亦可快速搭乘地鐵至市區" },
        { label: "核心樞紐", value: "南京東路站 (2號線、10號線雙線)" }
      ],
      guides: [
        { name: "上海南站 ➝ 飯店 (最順路線)", desc: "抵達上海南站後，搭乘地鐵 1 號線（往富錦路方向）坐 6 站至「陝西南路站」，站內轉乘地鐵 10 號線（往基隆路/新江灣城方向）坐 3 站即可直達「豫園站」下車，步行數分鐘即抵達橘子水晶酒店。全程約 35 分鐘，極其省時！" },
        { name: "豫園至橘子水晶酒店", desc: "地鐵「豫園站」出站即為豫園商城核心區及豫園地鐵商圈，至飯店步行幾分鐘內抵達。" },
        { name: "外灘 & 南京路步行街", desc: "搭乘 10 號線從「豫園站」往北僅搭 1 站，在「南京東路站」下車，沿南京東路漫步 10 分鐘即可直達外灘欣賞震憾夜景。" }
      ],
      note: "上海地鐵與國內其他城市互聯互認，你可以直接在支付寶「切換城市至上海」，領取「上海地鐵乘車碼」掃碼進站. 10 號線是完美的黃金旅遊線路！"
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
                  {transitInfo.map((info, idx) => {
                    if (info.type === 'hsr') {
                      return (
                        <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-outline-variant/10 space-y-4">
                          {/* Title Bar */}
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Train size={22} className="animate-pulse" />
                              </div>
                              <div>
                                <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">{info.date}</span>
                                <h3 className="text-base font-black text-on-surface tracking-tight mt-0.5">{info.title}</h3>
                              </div>
                            </div>
                          </div>

                          {/* Ticket Header (Real 12306 app style) */}
                          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold border-b border-dashed border-slate-200 pb-2">
                              <span>訂單號: <span className="text-slate-800 font-extrabold font-mono">{info.orderNo}</span></span>
                              <div className="flex gap-2 items-center">
                                <button 
                                  onClick={handleCopyOrder}
                                  className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100/80 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                                  <span>{copied ? '已複製' : '複製'}</span>
                                </button>
                                <span className="text-slate-400">| 下單: {info.orderDate}</span>
                              </div>
                            </div>

                            {/* Train Segment info */}
                            <div className="grid grid-cols-3 items-center py-2">
                              {/* Left Station */}
                              <div className="text-left">
                                <div className="text-2xl font-black text-slate-900 tracking-tight">{info.depTime}</div>
                                <div className="text-xs font-black text-[#005d90] mt-1 bg-[#e0f2fe] px-2 py-0.5 rounded-md inline-block">杭州東站</div>
                              </div>
                              
                              {/* Center Train info */}
                              <div className="text-center flex flex-col items-center">
                                <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full">{info.trainNo}</span>
                                <span className="text-[10px] font-bold text-slate-400 mt-1.5 flex items-center gap-1">
                                  <Clock size={10} /> {info.duration}
                                </span>
                              </div>

                              {/* Right Station */}
                              <div className="text-right">
                                <div className="text-2xl font-black text-slate-900 tracking-tight">{info.arrTime}</div>
                                <div className="text-xs font-black text-indigo-700 mt-1 bg-indigo-50 px-2 py-0.5 rounded-md inline-block">上海南站</div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-bold">
                              <span>發車時間: 2026.06.28 (車票當日當次有效)</span>
                              <span className="text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 shadow-sm">
                                🚪 檢票口 {info.gate}
                              </span>
                            </div>
                          </div>

                          {/* Passengers seating info */}
                          <div className="space-y-2.5">
                            <h4 className="text-xs font-black text-slate-500 flex items-center gap-1.5 uppercase tracking-wider pl-1">
                              👥 8位團員一等座座艙分配資訊
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {info.passengers && info.passengers.map((passenger, pIdx) => (
                                <div key={pIdx} className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center justify-between text-xs font-bold transition-colors">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-805 font-black">{passenger.name}</span>
                                    <span className="text-[9px] text-[#005d90] bg-[#e0f2fe] px-1.5 py-0.5 rounded uppercase">成人票</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-slate-600 font-mono">1等座 {passenger.seat}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${
                                      passenger.type === '靠窗'
                                        ? 'text-indigo-600 bg-indigo-50 border-indigo-100'
                                        : 'text-slate-500 bg-slate-100 border-slate-150'
                                    }`}>
                                      {passenger.type}
                                    </span>
                                    <span className="text-emerald-700 text-[10px] font-black pl-1">
                                      ¥{passenger.price} 已付
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Warning / Note */}
                          <div className="bg-[#005d90]/5 rounded-2xl p-4 flex gap-3 items-start">
                            <Info size={18} className="text-[#005d90] mt-0.5 shrink-0" />
                            <p className="text-xs text-on-surface-variant leading-relaxed font-semibold">
                              {info.note}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
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
                          {info.highlights && info.highlights.map((highlight, hIdx) => (
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
                    );
                  })}

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

