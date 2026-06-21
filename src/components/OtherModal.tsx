import { motion, AnimatePresence } from 'motion/react';
import { X, Utensils, Gift, Train, MapPin, ExternalLink, Info, Star, Copy, Check, ZoomIn, ZoomOut, RotateCcw, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface OtherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OtherModal({ isOpen, onClose }: OtherModalProps) {
  const [activeTab, setActiveTab] = useState<'eat' | 'buy' | 'subway'>('eat');
  const [selectedStation, setSelectedStation] = useState<string>('南京東路');
  const [copiedText, setCopiedText] = useState<'gaode' | 'baidu' | 'official' | 'image' | null>(null);
  const [mapScale, setMapScale] = useState(1);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const handleCopy = (type: 'gaode' | 'baidu' | 'official' | 'image', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const mustEats = [
    {
      name: '本幫紅燒肉',
      tag: '海派傳奇本幫經典 🥩',
      places: '外灘家宴·上海菜 (中山東二路店)、滬江老正和 (四川南路店)',
      cost: '人均約 ¥90 - ¥150',
      description: '紅燒肉是上海本幫菜的靈魂！肥而不膩、入口即化。特色是以冰糖炒糖色，佐以濃油赤醬，外皮Q彈有嚼勁，肥瘦相間，醬汁濃稠微甜，拌飯堪稱一絕。',
    },
    {
      name: '蟹粉小籠包',
      tag: '皮薄汁滿、蟹香鮮美 🥟',
      places: '知名老字號 / 萊萊小籠、寄暢興、知味觀 (杭州段)',
      cost: '人均約 ¥40 - ¥70',
      description: '老上海排隊神包！手工現點現包，麵皮薄如蟬翼、輕輕一戳湯汁滾滾流出。餡料選用新鮮大閘蟹拆出的蟹黃與肉餡黃金比例混合，黃油閃爍，佐以薑絲與香醋，鮮美至極。',
    },
    {
      name: '海派生煎包',
      tag: '酥脆金黃、爆汁鮮肉 🥟',
      places: '小楊生煎 (各大地下商城如亞太盛匯地下街)、大壺春',
      cost: '人均約 ¥15 - ¥30',
      description: '底部煎得焦黃香脆，表面灑滿了芝麻與翠綠蔥花。一口咬下，外皮酥脆有麵香，飽滿的芝麻與滾燙香濃的鮮豬肉湯汁在口中爆發，上海最經典的庶民早點與小吃。',
    },
    {
      name: '排骨年糕',
      tag: '繁花同款上海回憶 🍖',
      places: '鮮得來排骨年糕、老字號小吃鋪',
      cost: '人均約 ¥20 - ¥35',
      description: '老上海最具代表性的街頭小吃之一。大片金黃酥脆的炸排骨，搭配軟糯雪白的滑溜年糕，淋上帶有甜辣香氣的特製老上海黑醬油，酥香與軟糯交織。',
    },
    {
      name: '條頭糕與海派糕點',
      tag: '百年老字號精緻甜點 🍡',
      places: '沈大成 (南京東路步行街店)、真老大房',
      cost: '人均約 ¥10 - ¥25',
      description: '條頭糕選用極細糯米，裹入細沙細膩 of 紅豆沙揉捏成長條，口感細軟黏糯，軟Q微甜，表面常淋有金黃桂花蜜，香氣高雅、歷久不衰。',
    },
    {
      name: '醃篤鮮',
      tag: '春筍鮮肉百葉結濃湯 🥣',
      places: '滬江老正和、外灘家宴等正宗海派餐館',
      cost: '人均約 ¥80 - ¥120',
      description: '「醃」指的是鹹肉，「鮮」指的是鮮豬肉，「鮮」與「醃」在老火沙鍋慢燉數小時，加入清甜脆嫩的春筍與千張百葉結。湯底呈現濃郁高雅的乳白色，鹹鮮醇厚。',
    }
  ];

  const mustBuys = [
    {
      name: '國際飯店西餅屋 ── 蝴蝶酥',
      tag: '上海糕點界傳奇排隊王 🦋',
      location: '黃浦區南京西路170號 (近人民廣場)',
      cost: '每袋約 ¥32 - ¥45',
      desc: '上海最傳奇的蝴蝶酥，長年大排長龍！純手工、精選優質進口黃油，烤得層層蓬鬆酥脆，入口即化，伴隨濃郁的奶香和砂糖顆粒，香甜不膩。原味和芝士味是超人氣熱門伴手禮。'
    },
    {
      name: '大白兔奶糖經典禮盒',
      tag: '東方甜蜜記憶與國潮跨界 🍬',
      location: '南京東路步行街旗艦店、各大連鎖超市',
      cost: '約 ¥15 - ¥50 (依包裝)',
      desc: '幾代人共同的童年味道！現在的大白兔奶糖更推出了上海限定復古鐵盒、精緻巨型糖果包裝。還有熱門跨界聯名產品（大白兔潤唇膏、大白兔香水、奶糖身體乳等），送禮極具話題性與趣味性。'
    },
    {
      name: '上海女人經典雪花膏',
      tag: '留住老上海精緻復古香氣 🌸',
      location: '豫園老街、南京東路步行街特色鋪面',
      cost: '單盒約 ¥10 - ¥15，禮盒約 ¥30 - ¥65',
      desc: '極具老上海名媛風情的護膚聖品！圓形小鐵盒上印有老式月份牌美人圖案，典雅別緻。雪花膏質地水潤，保濕力強，散發柔和舒緩草本香氣（熱賣香型：夜來香、茉莉、白蘭花、玫瑰），送禮大氣。'
    },
    {
      name: '沈大成傳統海派糕點',
      tag: '百年老字號傳統冷糕 🍡',
      location: '南京東路316號 (南京東路口/近豫園店)',
      cost: '單盒約 ¥15 - ¥30',
      desc: '創建於光緒六年的百年老餐鋪！必買新鮮攜帶的條頭糕、雙釀糰、紅豆青糰、桂花拉糕。口感綿軟Q彈，不黏牙且甜度適中，皆有精裝伴手禮盒可直接攜帶登機。'
    },
    {
      name: '上海故事絲巾',
      tag: '精緻典雅海派氣質伴手禮 🧣',
      location: '南京路步行街、新天地北里、亞太盛匯廣場',
      cost: '約 ¥100 - ¥350',
      desc: '代表精緻優雅的海派文化。絲巾花紋兼具經典中式與現代摩登，手感如膚般絲滑，做工細緻。非常適合選購作為伴手禮致贈長輩或親友女眷，富有濃郁的海派江南情調。'
    }
  ];

  // Subway Guide Map data (interactive)
  const subwayStations = [
    {
      name: '虹橋火車站',
      lines: ['2', '10'],
      color: 'bg-emerald-500 text-white',
      desc: '第 1 天及第 4 天高鐵往返起點，連接高鐵與地鐵，轉乘極速便利。',
      attractions: ['高鐵虹橋站', '虹橋機場 T2']
    },
    {
      name: '新天地',
      lines: ['10', '13'],
      color: 'bg-fuchsia-500 text-white',
      desc: '第 4 天晚間漫步石庫門老式洋房區、新天地林蔭大道。',
      attractions: ['新天地石庫門北里', '中共一大會址']
    },
    {
      name: '豫園',
      lines: ['10'],
      color: 'bg-purple-500 text-white',
      desc: '第 4 天、第 5 天飯店（桔子水晶）所在地，古風豫園商城、城隍廟老街。',
      attractions: ['豫園商城', '城隍廟', '外灘22號 (外灘家宴)']
    },
    {
      name: '南京東路',
      lines: ['2', '10'],
      color: 'bg-emerald-500 text-white',
      desc: '第 4 天漫步外灘、天津路必比登萊萊小籠、採購沈大成/真老大房。',
      attractions: ['外灘江邊防汛牆', '南京東路步行街', '天津路老街']
    },
    {
      name: '世紀公園',
      lines: ['2'],
      color: 'bg-green-600 text-white',
      desc: '第 5 天方案 A 的上海最大核心森林公園，寬闊自然。',
      attractions: ['世紀公園主景區', '上海圖書館東館']
    },
    {
      name: '科技館 / 亞太盛匯',
      lines: ['2'],
      color: 'bg-green-600 text-white',
      desc: '第 5 天高人氣伴手禮、服飾與小吃地下城（亞太盛匯），可吃生煎包。',
      attractions: ['亞太盛匯廣場', '上海科技館']
    }
  ];

  const currentStationInfo = subwayStations.find(s => s.name === selectedStation) || subwayStations[2];

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
            <div className="p-6 flex justify-between items-center bg-white border-b border-outline-variant/10">
              <div>
                <h2 className="text-2xl font-bold text-primary">其它指南及工具</h2>
                <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Must-Eat, Must-Buy & Metro Map Guide</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Sticky Tabs */}
            <div className="bg-white px-4 py-2 flex border-b border-slate-100 gap-1 flex-shrink-0">
              <button
                onClick={() => setActiveTab('eat')}
                className={`flex-1 py-3 text-center rounded-2xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'eat'
                    ? 'bg-amber-50 text-amber-700 font-bold border border-amber-200/50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Utensils size={15} />
                上海必吃
              </button>
              <button
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-3 text-center rounded-2xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'buy'
                    ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200/50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Gift size={15} />
                上海必買
              </button>
              <button
                onClick={() => setActiveTab('subway')}
                className={`flex-1 py-3 text-center rounded-2xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'subway'
                    ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Train size={15} />
                地鐵觀光引導
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 pb-12">
              
              {/* EAT TAB */}
              {activeTab === 'eat' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/30 flex gap-3 text-amber-900 text-xs">
                    <Info size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-semibold">
                      上海海派菜餚（本幫菜）講究「濃油赤醬、鹹甜適中」。為您精選最在地的特色小吃與必吃佳餚，在行程中的豫園、外灘與新天地皆能輕鬆品嚐！
                    </p>
                  </div>

                  {mustEats.map((eat, index) => (
                    <div key={index} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5">{eat.tag}</span>
                          <h4 className="text-lg font-extrabold text-slate-800">{eat.name}</h4>
                        </div>
                        <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-1 rounded-xl">{eat.cost}</span>
                      </div>
                      
                      <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                        {eat.description}
                      </p>

                      <div className="flex items-start gap-2 pt-1">
                        <MapPin size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                        <div className="text-[11px] text-slate-500 font-bold">
                          <span className="text-slate-600">行程推薦去處：</span>{eat.places}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* BUY TAB */}
              {activeTab === 'buy' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-200/30 flex gap-3 text-rose-900 text-xs">
                    <Info size={16} className="text-rose-700 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-semibold">
                      江南之行的最終站上海是伴手禮天堂！為您整理極具海派文化特色且深受喜愛的名物精品，回國送禮絕不出錯。
                    </p>
                  </div>

                  {mustBuys.map((buy, index) => (
                    <div key={index} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full inline-block mb-1.5">{buy.tag}</span>
                          <h4 className="text-lg font-extrabold text-slate-800 leading-tight">{buy.name}</h4>
                        </div>
                        <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-xl flex-shrink-0">{buy.cost}</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                        {buy.desc}
                      </p>

                      <div className="flex items-start gap-2 pt-1">
                        <MapPin size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                        <div className="text-[11px] text-slate-500 font-bold">
                          <span className="text-slate-600">推薦購買地址：</span>{buy.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SUBWAY TAB */}
              {activeTab === 'subway' && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* In-App Interactive High-Res Official Map */}
                  <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
                          <h4 className="text-sm font-black text-slate-800">
                            最新上海地鐵官方全線路線圖
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 font-bold mt-1">
                          最新版高解析度全網線路一覽（支援雙向捲動與放大）
                        </p>
                      </div>
                      <button
                        onClick={() => setIsMapExpanded(!isMapExpanded)}
                        className={`text-xs font-black px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          isMapExpanded
                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200/50 hover:bg-emerald-100/50'
                        }`}
                      >
                        {isMapExpanded ? '收起地鐵圖' : '展開地鐵圖'}
                      </button>
                    </div>

                    {isMapExpanded ? (
                      <div className="space-y-3 animate-fadeIn">
                        {/* Notice Banner */}
                        <div className="bg-amber-50/50 rounded-2xl p-3 border border-amber-200/20 flex gap-2.5 text-amber-900 text-xs font-semibold">
                          <AlertCircle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <div>由於 iframe 預覽環境的安全限制，部分瀏覽器可能會封鎖外連彈窗。</div>
                            <div className="text-[10px] text-amber-700 font-bold mt-0.5">💡 您可以直接在此處進行上下左右滑動並點擊縮放，或一鍵複製連結至瀏覽器開啟！</div>
                          </div>
                        </div>

                        {/* Control buttons */}
                        <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setMapScale(prev => Math.min(3, prev + 0.25))}
                              disabled={mapScale >= 3}
                              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-40 active:scale-[0.95] hover:bg-slate-50 transition-all cursor-pointer"
                              title="放大"
                            >
                              <ZoomIn size={18} />
                            </button>
                            <button
                              onClick={() => setMapScale(prev => Math.max(1, prev - 0.25))}
                              disabled={mapScale <= 1}
                              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-40 active:scale-[0.95] hover:bg-slate-50 transition-all cursor-pointer"
                              title="縮小"
                            >
                              <ZoomOut size={18} />
                            </button>
                            <button
                              onClick={() => setMapScale(1)}
                              disabled={mapScale === 1}
                              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 disabled:opacity-40 active:scale-[0.95] hover:bg-slate-50 transition-all cursor-pointer"
                              title="重設大小"
                            >
                              <RotateCcw size={16} />
                            </button>
                          </div>
                          
                          <div className="text-[11px] font-black text-slate-500 bg-slate-200/50 px-3 py-1.5 rounded-xl">
                            當前縮放比: {Math.round(mapScale * 100)}%
                          </div>
                        </div>

                        {/* Interactive Viewer Box */}
                        <div className="relative border border-slate-200 rounded-3xl bg-slate-950 overflow-hidden shadow-inner flex flex-col">
                          {/* Indicator label */}
                          <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                            滑動 / 雙向拖動縮放
                          </div>

                          <div className="overflow-auto h-80 md:h-[400px] w-full p-2 cursor-move scrollbar-thin">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Shanghai_Metro_network_map.svg/1600px-Shanghai_Metro_network_map.svg.png"
                              alt="上海地鐵官方全線路線圖"
                              style={{ width: `${mapScale * 100}%`, minWidth: '100%' }}
                              className="transition-all duration-150 max-w-none origin-top-left rounded-xl"
                            />
                          </div>
                        </div>

                        {/* One-click copy options */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleCopy('image', 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Shanghai_Metro_network_map.svg')}
                            className="flex-1 h-9 border border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/50 text-emerald-800 rounded-xl font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all text-xs cursor-pointer"
                          >
                            {copiedText === 'image' ? (
                              <>
                                <Check size={14} className="text-emerald-600" />
                                <span className="text-emerald-700 font-bold">地鐵圖圖片連結已複製！</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} className="text-emerald-600/70" />
                                <span>複製官方高解析圖片連結</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => setIsMapExpanded(true)}
                        className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 rounded-3xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all active:scale-[0.99] group"
                      >
                        <div className="w-12 h-12 bg-emerald-50 group-hover:bg-emerald-100/60 text-emerald-700 rounded-full flex items-center justify-center shadow-sm mb-1 transition-colors">
                          <Train size={24} />
                        </div>
                        <h5 className="text-xs font-black text-slate-800">展開內置官方高精度地鐵路線圖</h5>
                        <p className="text-[10px] text-slate-500 font-medium">可在 App 內直接上下左右滑動並縮放，完美免去在新分頁彈窗失敗的困擾</p>
                      </div>
                    )}
                  </div>

                  {/* Schematic Map Visualizer */}
                  <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <span className="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
                        上海地鐵觀光路線圖 (點擊車站查詢)
                      </h4>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full font-bold">高精度核心觀光站點</span>
                    </div>

                    {/* Highly aesthetic inline interactive metro schematic */}
                    <div className="relative bg-slate-900 rounded-3xl p-6 min-h-[220px] flex flex-col justify-between overflow-hidden shadow-inner border border-slate-800">
                      
                      {/* Decorative Grid Background */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

                      {/* Metro Line 10 (Light Purple) */}
                      <div className="absolute top-[32%] left-[8%] right-[8%] h-[3px] bg-purple-500/70 pointer-events-none flex items-center" />
                      
                      {/* Metro Line 2 (Light Green) */}
                      <div className="absolute top-[65%] left-[8%] right-[8%] h-[3px] bg-emerald-500/70 pointer-events-none" />

                      {/* Label Lines */}
                      <div className="absolute top-[32%] left-[64%] w-[3px] h-[35%] bg-emerald-500/40 pointer-events-none" />

                      {/* Station Buttons Layout */}
                      <div className="relative flex flex-col h-full justify-between z-10 gap-10">
                        {/* LINE 10 ROW */}
                        <div className="flex justify-between items-center px-2">
                          <span className="text-[9px] font-black bg-purple-900 border border-purple-500 text-purple-200 px-1.5 py-0.5 rounded-md transform -rotate-12">L10 觀光線</span>
                          
                          <div className="flex justify-around flex-1 px-4">
                            {['虹橋火車站', '新天地', '豫園', '南京東路'].map((name) => {
                              const isSelected = selectedStation === name;
                              return (
                                <button
                                  key={name}
                                  onClick={() => setSelectedStation(name)}
                                  className="relative flex flex-col items-center group cursor-pointer"
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center transition-all ${
                                    isSelected 
                                      ? 'bg-purple-500 scale-125 ring-4 ring-purple-500/30' 
                                      : 'bg-slate-700 hover:bg-purple-400'
                                  }`} />
                                  <span className={`text-[10px] mt-1.5 text-center font-bold px-1.5 py-0.5 rounded-lg whitespace-nowrap ${
                                    isSelected ? 'bg-purple-100 text-purple-950 font-black' : 'text-slate-300'
                                  }`}>{name === '虹橋火車站' ? '虹橋' : name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* LINE 2 ROW */}
                        <div className="flex justify-between items-center px-2">
                          <span className="text-[9px] font-black bg-emerald-950 border border-emerald-500 text-emerald-200 px-1.5 py-0.5 rounded-md transform -rotate-12">L2 核心線</span>
                          
                          <div className="flex justify-around flex-1 px-4">
                            {['南京東路', '科技館 / 亞太盛匯', '世紀公園'].map((name) => {
                              const isSelected = selectedStation === name;
                              return (
                                <button
                                  key={name}
                                  onClick={() => setSelectedStation(name)}
                                  className="relative flex flex-col items-center cursor-pointer"
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center transition-all ${
                                    isSelected 
                                      ? 'bg-emerald-500 scale-125 ring-4 ring-emerald-500/30' 
                                      : 'bg-slate-700 hover:bg-emerald-400'
                                  }`} />
                                  <span className={`text-[10px] mt-1.5 text-center font-bold px-1.5 py-0.5 rounded-lg whitespace-nowrap ${
                                    isSelected ? 'bg-emerald-100 text-emerald-950 font-black' : 'text-slate-300'
                                  }`}>{name.includes('科技館') ? '科技館/亞太' : name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="text-[9px] text-slate-500 text-center font-semibold mt-4">
                        💡 點擊上圖站點：查看對應行程、周邊景點及行車指南
                      </div>
                    </div>

                    {/* Expanded Detail based on click */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h5 className="text-base font-extrabold text-slate-800">{currentStationInfo.name}</h5>
                          <div className="flex gap-1">
                            {currentStationInfo.lines.map(line => (
                              <span key={line} className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                                line === '10' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                                line === '2' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                'bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200'
                              }`}>
                                地鐵 {line} 號線
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] text-[#005d90] font-bold">站點說明</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        {currentStationInfo.desc}
                      </p>

                      <div className="pt-2 border-t border-slate-200/50 space-y-1.5">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">📍 周邊直達目的地 / 推薦餐廳</div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentStationInfo.attractions.map((attr, i) => (
                            <span key={i} className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1">
                              <MapPin size={10} className="text-primary" />
                              {attr}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* General Tips & External Interactive official system map */}
                  <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
                    <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                      <Star size={16} className="text-amber-500" />
                      地鐵乘車貼心指南
                    </h4>

                    <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-semibold">
                      <div className="flex gap-2.5">
                        <span className="text-primary font-bold">1.</span>
                        <p><strong>掃碼乘車</strong>：直接打開手機「微信」或「支付寶」搜尋「乘車碼」小程序，切換定位到「上海市」即可直接掃碼過閘，免去排隊買實體票的煩惱。</p>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="text-primary font-bold">2.</span>
                        <p><strong>轉乘站點</strong>：南京東路站為 2 號線與 10 號線的大轉乘樞紐，尖峰時段人流量極大，出入站請預留 5-10 分鐘轉乘緩衝。</p>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="text-primary font-bold">3.</span>
                        <p><strong>首尾班車</strong>：市區主線（2、10號線）營運時間基本均為 05:30 - 23:00 左右，請留意當天夜間行程的返回時間。</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-3">
                      <div className="text-[10px] font-black text-[#005d90] uppercase tracking-wider flex items-center gap-1">
                        <MapPin size={11} className="text-slate-400" />
                        🗺️ 線上網頁版互動地鐵圖（支援手機一鍵複製網址）
                      </div>

                      {/* Explanation Banner */}
                      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/60 text-[11px] text-slate-600 leading-relaxed font-semibold flex gap-2">
                        <AlertCircle size={15} className="text-slate-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div>
                            部分瀏覽器預覽環境下可能無法直接彈窗。
                            <strong>如果點擊按鈕沒有作用，請點擊下方對應的『一鍵複製網址』並手動貼到新視窗開啟！</strong>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Gaode Option */}
                        <div className="flex flex-col gap-1.5 p-3 rounded-2xl border border-slate-100 bg-slate-50/50">
                          <div className="text-[10px] font-black text-slate-400 uppercase">高德地鐵</div>
                          <a
                            href="https://subway.amap.com/m.html?city=3100"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="w-full h-9 border border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50 text-emerald-800 rounded-xl font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all text-xs text-center"
                          >
                            <ExternalLink size={12} />
                            開啟線上版
                          </a>
                          <button
                            onClick={() => handleCopy('gaode', 'https://subway.amap.com/m.html?city=3100')}
                            className="w-full h-8 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-all text-[11px] cursor-pointer"
                          >
                            {copiedText === 'gaode' ? (
                              <>
                                <Check size={11} className="text-emerald-600" />
                                <span className="text-emerald-700 font-bold">已複製！</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} className="text-slate-400" />
                                <span>一鍵複製網址</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Baidu Option */}
                        <div className="flex flex-col gap-1.5 p-3 rounded-2xl border border-slate-100 bg-slate-50/50">
                          <div className="text-[10px] font-black text-slate-400 uppercase">百度地鐵</div>
                          <a
                            href="https://map.baidu.com/subway/index.html?c=shanghai"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="w-full h-9 border border-sky-200 bg-sky-50/30 hover:bg-sky-50 text-sky-800 rounded-xl font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all text-xs text-center"
                          >
                            <ExternalLink size={12} />
                            開啟線上版
                          </a>
                          <button
                            onClick={() => handleCopy('baidu', 'https://map.baidu.com/subway/index.html?c=shanghai')}
                            className="w-full h-8 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-all text-[11px] cursor-pointer"
                          >
                            {copiedText === 'baidu' ? (
                              <>
                                <Check size={11} className="text-emerald-600" />
                                <span className="text-emerald-700 font-bold">已複製！</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} className="text-slate-400" />
                                <span>一鍵複製網址</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Official Option */}
                        <div className="flex flex-col gap-1.5 p-3 rounded-2xl border border-slate-100 bg-slate-50/50">
                          <div className="text-[10px] font-black text-slate-400 uppercase">官方互動版</div>
                          <a
                            href="http://service.shmetro.com/yxxxt/index.htm"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="w-full h-9 border border-purple-200 bg-purple-50/30 hover:bg-purple-50 text-purple-800 rounded-xl font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all text-xs text-center"
                          >
                            <ExternalLink size={12} />
                            開啟線上版
                          </a>
                          <button
                            onClick={() => handleCopy('official', 'http://service.shmetro.com/yxxxt/index.htm')}
                            className="w-full h-8 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-all text-[11px] cursor-pointer"
                          >
                            {copiedText === 'official' ? (
                              <>
                                <Check size={11} className="text-emerald-600" />
                                <span className="text-emerald-700 font-bold">已複製！</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} className="text-slate-400" />
                                <span>一鍵複製網址</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
