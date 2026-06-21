import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, MapPin, Utensils, Star, Home as HomeIcon, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { AlternativeOption, ItineraryItem, DayPlan, itineraryData } from './itineraryData';

function ItineraryItemRow({ item, activeDay, iIdx }: { item: ItineraryItem; activeDay: number; iIdx: number; key?: string }) {
  const [selectedAltIndex, setSelectedAltIndex] = useState(0);
  const [copiedType, setCopiedType] = useState<'address' | 'name' | null>(null);

  const hasAlternatives = !!item.alternatives && item.alternatives.length > 0;
  const currentOption = (hasAlternatives && item.alternatives) ? item.alternatives[selectedAltIndex] : null;

  const displayActivity = currentOption ? currentOption.activityLabel : item.activity;
  const displayDescription = currentOption ? currentOption.description : item.description;
  const displayLocation = currentOption ? currentOption.location : item.location;
  const displayHours = currentOption ? currentOption.hours : item.hours;
  const isMapHidden = !!item.hideMap || !!(currentOption && currentOption.hideMap);

  const fallbackCopyText = (textToCopy: string, type: 'address' | 'name') => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2000);
      }
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
  };

  const handleCopy = (text: string, type: 'address' | 'name') => {
    const textToCopy = text.replace(/\s*[\(\（][^\)\）]*[\)\）]/g, '').trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2000);
      }).catch(() => {
        fallbackCopyText(textToCopy, type);
      });
    } else {
      fallbackCopyText(textToCopy, type);
    }
  };

  const rawAddress = displayLocation || '';
  const cleanAddress = rawAddress.replace(/\s*[\(\（][^\)\）]*[\)\）]/g, ' ').replace(/\s+/g, ' ').trim();

  const poiName = (() => {
    if (currentOption && currentOption.name) return currentOption.name;
    const rawAct = currentOption ? currentOption.activityLabel : item.activity;
    const cleanAct = rawAct
      .replace(/^(午餐方案 [A-Z]：|晚餐方案 [A-Z]：|旅拍佳選 [A-Z]：|按摩方案 [A-Z]：|午餐：|晚餐：|下午茶：|早餐：|退房，|下午：|上午：)/g, '')
      .replace(/\s*[\(\（][^\)\）]*[\)\）]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const isGeneric = /^(高鐵|退房|抵達|分組|散步|集合|搭乘|自由|求恕里早餐|下午|中午|上午)/.test(cleanAct) || cleanAct.includes('前往') || cleanAct.includes('返回');
    return isGeneric ? '' : cleanAct;
  })();

  const getSearchQuery = () => {
    return poiName || cleanAddress;
  };

  const searchQuery = getSearchQuery();

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

        {hasAlternatives && item.alternatives && (
          <div className="flex flex-wrap gap-1 mb-3.5 p-1 bg-slate-100 rounded-xl border border-slate-200/40">
            {item.alternatives.map((alt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedAltIndex(idx)}
                className={`flex-1 min-w-[70px] text-center py-2 px-1.5 rounded-lg text-xs font-black transition-all duration-200 ${
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
          <p className="mt-1.5 text-xs text-on-surface-variant/80 font-medium leading-relaxed bg-neutral-50 p-2.5 rounded-lg border border-slate-100 whitespace-pre-line">
            {displayDescription}
          </p>
        )}
        <div className="mt-3.5 pt-3.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {displayLocation && (
            <div className="flex items-start gap-2 text-on-surface-variant font-medium">
              <MapPin size={14} className="text-primary shrink-0 mt-0.5 animate-pulse" />
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">景點/起訖地址</span>
                <span className="font-bold text-slate-700 leading-tight block">{displayLocation}</span>
              </div>
            </div>
          )}
          {displayHours && item.type !== 'travel' && (
            <div className="flex items-start gap-2 text-on-surface-variant font-medium">
              <Clock size={14} className="text-tertiary shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">營業/行程時間</span>
                <span className="font-bold text-slate-700 leading-tight block">{displayHours}</span>
              </div>
            </div>
          )}
        </div>
        
        {displayLocation && item.type !== 'travel' && (
           <div className="mt-4 space-y-2.5">
              <div className="flex flex-wrap gap-2">
                {!isMapHidden && (
                  <a 
                    href={`https://uri.amap.com/search?keyword=${encodeURIComponent(searchQuery)}&callnative=1`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-black text-secondary bg-secondary/5 border border-secondary/20 hover:bg-secondary/10 px-3.5 py-2.5 rounded-xl transition-all shadow-sm active:scale-[0.98]"
                  >
                    <MapPin size={13} />
                    <span>開啟高德地圖</span>
                    <ExternalLink size={10} className="opacity-50" />
                  </a>
                )}
                
                <button
                  type="button"
                  onClick={() => handleCopy(rawAddress, 'address')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100/60 border border-slate-200 hover:bg-slate-200/50 hover:border-slate-300 px-3.5 py-2.5 rounded-xl transition-all shadow-sm active:scale-[0.98]"
                >
                  {copiedType === 'address' ? (
                    <>
                      <Check size={12} className="text-emerald-700" />
                      <span className="text-emerald-700 font-extrabold">地址已複製！</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} stopColor='currentColor' />
                      <span>複製地址</span>
                    </>
                  )}
                </button>
              </div>
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
              <div className="w-10" />
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

              {/* 6/27 Special Bottom Content */}
              {activeDay === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-amber-50/50 rounded-[32px] border border-amber-200/30 space-y-6 text-on-surface"
                >
                  <div className="flex items-center gap-2.5 pb-3 border-b border-amber-200/30">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                      <Utensils size={18} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-amber-900 leading-tight">6/27 杭州餐廳詳細菜色明細</h4>
                      <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider mt-0.5">Hangzhou Restaurant Menu Guides</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* 午餐推薦 */}
                    <div className="space-y-3">
                      <span className="inline-block text-[11px] font-black bg-amber-600/10 text-amber-800 px-3 py-1 rounded-full">
                        💡 河坊街午餐老字號推薦
                      </span>
                      
                      <div className="grid gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-amber-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">皇飯兒 (高銀路店)</h5>
                            <span className="text-[11px] font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">御賜名鋪 · 乾隆魚頭</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-amber-800">【熱門推薦菜色】</strong> 乾隆魚頭 (招牌必點，湯濃豆腐嫩)、東坡肉 (熟香肥而不膩)、宋嫂魚羹、西湖醋魚、手捏定勝糕。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥90 - ¥120</span>
                            <span>⏱ 營業時間 11:00-14:00, 16:30-21:00</span>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-amber-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">狀元館 (高銀街老鋪)</h5>
                            <span className="text-[11px] font-black text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">百年麵王 · 歷史名點</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-amber-800">【熱門推薦菜色】</strong> 蝦爆鱔面 (爆炒鱔片與Q彈河蝦吸汁細麵之頂級絕配)、片兒川 (筍片雪菜經典老湯麵)、狀元小籠包。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥45 - ¥75</span>
                            <span>⏱ 營業時間 10:00 - 21:00</span>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-amber-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">河坊街傳統老字號小吃</h5>
                            <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">街頭非遺江南古早味</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-amber-800">【熱門推薦小吃】</strong> 定勝糕 (現蒸鬆軟甜糯)、蔥包檜 (香脆香餅裹油條)、吳山酥油餅、胡慶餘堂草本涼茶、經典西湖藕粉。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥20 - ¥40</span>
                            <span>⏱ 營業時間 09:00 - 22:00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 晚餐推薦 */}
                    <div className="space-y-3 pt-2">
                      <span className="inline-block text-[11px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full">
                        🌙 晚間正餐經典明細 (西湖湖濱)
                      </span>
                      
                      <div className="grid gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-amber-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">外婆家 (西湖湖濱 in77 店)</h5>
                            <span className="text-[11px] font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">正宗杭幫排隊王</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-amber-800">【熱門推薦菜色】</strong> 外婆紅燒肉 (招牌軟糯伴鹹魚)、外婆茶香雞 (黃金外焦香)、蒜蓉粉絲蒸大蝦、綠豆泥 (經典甜點)、西湖牛肉羹、龍井蝦仁。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥75</span>
                            <span>⏱ 營業時間 10:30-14:00, 16:30-21:30</span>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-amber-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">綠茶餐廳 (慶春店)</h5>
                            <span className="text-[11px] font-black text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">江南茶秀意境文青雅宴</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-amber-800">【熱門推薦菜色】</strong> 綠茶烤雞 (脆皮肉嫩香)、麵包誘惑 (超級網紅甜點)、石鍋沸騰魚、龍井茶香排骨。古色古香，一邊品飯一邊感受水閣風情。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥78</span>
                            <span>⏱ 營業時間 11:00-14:00, 17:00-21:30</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-100/40 rounded-2xl border border-amber-200/30 text-center">
                      <p className="text-[11px] text-amber-800 font-bold leading-normal">
                        💡 貼心提醒：中午辦妥酒店行李寄存後，可直接打車 10 分鐘（約 2.5 公里）直奔河坊街展開步行健遊！在這裡享用完豐盛的午餐（如皇飯兒或狀元館）後，順道悠閒走進朱炳仁銅雕與胡慶餘堂，並步行 800m 參訪奢華奇趣的胡雪巖故居。傍晚暑氣消散時，橫過馬路即達西湖畔「柳浪聞鶯」觀賞金輝落日，完美無縫、體力輕鬆銜接！
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 6/28 Special Bottom Content */}
              {activeDay === 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-sky-50/50 rounded-[32px] border border-sky-200/30 space-y-6 text-on-surface"
                >
                  <div className="flex items-center gap-2.5 pb-3 border-b border-sky-200/30">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700">
                      <Utensils size={18} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-sky-900 leading-tight">6/28 杭州及上海經典餐食明細</h4>
                      <p className="text-[10px] text-sky-700 font-bold uppercase tracking-wider mt-0.5">Hangzhou / Shanghai Dining Guides</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* 午餐推薦 */}
                    <div className="space-y-3">
                      <span className="inline-block text-[11px] font-black bg-sky-600/10 text-sky-800 px-3 py-1 rounded-full">
                        🕛 中午午餐精選明細 (杭州慶春路周邊)
                      </span>
                      
                      <div className="grid gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-sky-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">新豐小吃 (慶春店)</h5>
                            <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">在地平民人氣天花板</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-amber-800">【熱門推薦菜色】</strong> 蝦肉小籠包 (皮薄湯鮮)、特製喉口饅頭 (香氣十足)、牛肉粉絲湯 (日常絕配)、手工蝦肉餛飩、經典片兒川。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥20 (高CP)</span>
                            <span>⏱ 營業時間 06:00 - 21:00</span>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-sky-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">知味觀 (慶春路店)</h5>
                            <span className="text-[11px] font-black text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">江南百年老餐鋪</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-amber-800">【熱門推薦菜色】</strong> 鮮肉及蟹粉小籠包、杭州貓耳朵、東坡肉、西湖醋魚、叫花童子雞、杭州片兒川。窗口另販售特色鮮肉月餅、條頭糕等熱烘糕點。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥45 - ¥90</span>
                            <span>⏱ 營業時間 07:30 - 21:00</span>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-sky-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">新周記·巷子里的江南味 (慶春店)</h5>
                            <span className="text-[11px] font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">高分金牌本幫老店</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-amber-800">【熱門推薦菜色】</strong> 新周記招牌烤雞 (外焦里嫩)、江南油爆蝦 (甜咸香脆)、秘製醬鴨、東坡肉、香干馬蘭頭、桂花糖藕。風味卓越，物超所值。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥93 (超高性價比)</span>
                            <span>⏱ 營業時間 10:30 - 14:30, 16:30 - 21:00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 晚餐推薦 (上海) */}
                    <div className="space-y-3 pt-2">
                      <span className="inline-block text-[11px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full">
                        🌙 上海晚間正餐經典明細 (新天地/外灘/豫園)
                      </span>
                      
                      <div className="grid gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-sky-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">寄畅兴·百年蟹黄面 (豫園城隍廟店)</h5>
                            <span className="text-[11px] font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full font-sans">豫園超人氣露台景觀餐廳</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-sky-800">【熱門推薦菜色】</strong> 招牌蟹黃黃金面、蟹粉小籠、精緻本幫澆頭。露台席位可直接俯瞰金碧輝煌的豫園商城古典夜色，迎著晚風拍照極美，美味與視覺雙重驚豔。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥110-¥150</span>
                            <span>⏱ 營業時間 10:00 - 21:30</span>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-sky-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">外灘家宴·上海菜 (中山東二路店)</h5>
                            <span className="text-[11px] font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full font-sans">外灘臨江海派本幫菜</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-sky-800">【熱門推薦菜色】</strong> 紅燒肉、油爆蝦、蟹粉豆腐、清蒸白絲魚。餐館享有絕佳的黃浦江一線璀璨夜景位，味道與格調兼具。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥150</span>
                            <span>⏱ 營業時間 11:00-14:30, 17:00-21:30</span>
                          </div>
                        </div>



                        <div className="bg-white p-4 rounded-2xl border border-sky-200/20 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <h5 className="font-extrabold text-slate-800 text-sm">沪江老正和 (四川南路店)</h5>
                            <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full font-sans">老字號地道海派本幫菜</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-sky-800">【熱門推薦菜色】</strong> 草頭圈子、經典紅燒肉、油爆河蝦、醬鴨以及八寶辣醬，口味醇厚而不膩，深受老上海饕客與市民的喜愛。
                          </p>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-bold pt-1">
                            <span>💰 人均約 ¥90-¥120</span>
                            <span>⏱ 營業時間 11:00-14:00, 17:00-21:00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 bg-sky-100/40 rounded-2xl border border-sky-200/30 text-center">
                      <p className="text-[11px] text-sky-800 font-bold leading-normal">
                        💡 貼心提醒：中午退房前在慶春路酒店周邊享用小點，隨後出發前往高鐵站。下午抵達上海入住酒店後，再前往新天地林蔭石庫門或外灘步行街徒步漫遊，享受精緻的上海之夜！
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
