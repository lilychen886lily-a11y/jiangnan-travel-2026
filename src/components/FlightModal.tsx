import { useState } from 'react';
import { X, Plane, Clock, MapPin, Users, Ticket, ArrowRight, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FlightSegment {
  airline?: string;
  from?: string;
  to?: string;
  depTime?: string;
  arrTime?: string;
  highlight?: string;
  type?: string;
  location?: string;
  duration?: string;
}

interface BookingGroup {
  group: string;
  code: string;
  passengers: string[];
}

interface FlightData {
  title: string;
  date: string;
  segments: FlightSegment[];
  passengers: string[];
  bookings?: BookingGroup[];
  reminders?: string[];
}

function BookingCodeBadge({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        fallbackCopy(code);
      });
    } else {
      fallbackCopy(code);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1 text-[11px] font-black font-mono px-2.5 py-1 rounded-xl border transition-all active:scale-[0.97] ${
        copied 
          ? 'bg-emerald-55/10 text-emerald-700 border-emerald-300' 
          : 'bg-primary/5 hover:bg-primary/10 text-primary border-primary/10 hover:border-primary/25'
      }`}
      title="點擊複製訂位代號"
    >
      <span>{code}</span>
      {copied ? <Check size={11} className="text-emerald-700 font-extrabold" /> : <Copy size={11} className="opacity-75" />}
    </button>
  );
}

export default function FlightModal({ isOpen, onClose }: FlightModalProps) {
  const flights: FlightData[] = [
    {
      title: "去程：高雄 (KHH) ➝ 上海 (PVG)",
      date: "2026年6月25日 (週四)",
      segments: [
        {
          airline: "國泰航空 CX449",
          from: "高雄國際機場 (KHH) T1",
          to: "香港國際機場 (HKG) T1",
          depTime: "07:30",
          arrTime: "09:05",
          highlight: "行李直掛上海"
        },
        {
          type: "layover",
          location: "香港 T1 (轉機)",
          duration: "1小時 20分鐘"
        },
        {
          airline: "國泰航空 CX376",
          from: "香港國際機場 (HKG) T1",
          to: "上海浦東國際機場 (PVG) T2",
          depTime: "10:25",
          arrTime: "13:15"
        }
      ],
      passengers: [
        "YANG/KUNTAI", 
        "SUN/TZUNING", 
        "CHIU/YIWEN", 
        "WU/CHUNHSIEN", 
        "TSENG/TZUTING", 
        "CHEN/CHIUNGHUA"
      ],
      bookings: [
        {
          group: "第一組 (4位)",
          code: "74CPPL",
          passengers: ["YANG/KUNTAI", "SUN/TZUNING", "CHIU/YIWEN", "WU/CHUNHSIEN"]
        },
        {
          group: "第二組 (1位)",
          code: "D337J9",
          passengers: ["TSENG/TZUTING"]
        },
        {
          group: "第三組 (1位)",
          code: "DXM7Y8",
          passengers: ["CHEN/CHIUNGHUA"]
        }
      ],
      reminders: [
        "託運行李：每人限託運 1 件，單件行李限重 23 公斤。",
        "手提行李：每人限 1 件手提行李 + 1 件個人物品，總重量不得超過 7 公斤。",
        "出發提醒：國泰航空建議旅客最晚於「航班起飛前 3 小時」（即 04:30 左右）抵達高雄國際機場 T1 辦理報到與託運登機手續。"
      ]
    },
    {
      title: "去程：台北 (TPE) ➝ 上海 (PVG)",
      date: "2026年6月25日 (週四)",
      segments: [
        {
          airline: "春秋航空",
          from: "台灣桃園國際機場 (TPE) T1",
          to: "上海浦東國際機場 (PVG) T2",
          depTime: "11:15",
          arrTime: "13:20",
          highlight: "直飛 2小時5分"
        }
      ],
      passengers: ["強哥", "京慧"]
    },
    {
      title: "回程：上海 (PVG) ➝ 高雄 (KHH)",
      date: "2026年6月29日 (週一)",
      segments: [
        {
          airline: "長榮航空 BR0705",
          from: "上海浦東機場 (PVG) T2",
          to: "高雄國際機場 (KHH) T1",
          depTime: "20:05",
          arrTime: "22:20",
          duration: "2小時 15分鐘"
        }
      ],
      passengers: [
        "YANG/KUNTAI", 
        "SUN/TZUNING", 
        "CHIU/YIWEN", 
        "WU/CHUNHSIEN", 
        "TSENG/TZUTING", 
        "CHEN/CHIUNGHUA"
      ]
    },
    {
      title: "回程：上海 (PVG) ➝ 台北 (TPE)",
      date: "2026年6月29日 (週一)",
      segments: [
        {
          airline: "長榮航空",
          from: "上海浦東國際機場 (PVG) T2",
          to: "台灣桃園國際機場 (TPE) T2",
          depTime: "20:05",
          arrTime: "22:00",
          highlight: "直飛 1小時55分"
        }
      ],
      passengers: ["強哥", "京慧"]
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
            className="fixed inset-x-0 bottom-0 top-10 bg-surface z-[70] flex flex-col rounded-t-3xl overflow-hidden animate-in fade-in"
          >
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-outline-variant/20 bg-white">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <Plane size={24} className="text-primary animate-bounce" />
                航班資訊
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-12">
              {flights.map((flight, fIdx) => (
                <div key={fIdx} className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/10 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[17px] font-black text-on-surface">{flight.title}</h3>
                      <p className="text-sm text-on-surface-variant font-medium">{flight.date}</p>
                    </div>
                  </div>

                  <div className="space-y-4 relative">
                    {flight.segments.map((segment, sIdx) => {
                      if (segment.type === 'layover') {
                        return (
                          <div key={sIdx} className="flex items-center gap-3 py-2 pl-2">
                            <div className="w-1 h-8 bg-dashed border-l-2 border-dashed border-outline-variant/40 ml-2.5"></div>
                            <div className="bg-surface-container-low px-3.5 py-1.5 rounded-full flex items-center gap-2 text-[10.5px] font-bold text-secondary uppercase tracking-wider">
                              <Clock size={12} className="text-secondary" />
                              在 {segment.location} 停靠短暫中轉 ({segment.duration})
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={sIdx} className="relative">
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                              </div>
                              {sIdx < flight.segments.length - 1 && (
                                <div className="w-0.5 flex-1 bg-primary/20 my-1"></div>
                              )}
                            </div>
                            <div className="flex-1 space-y-3 pb-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-black text-primary flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                                  {segment.airline}
                                </span>
                                {segment.highlight && (
                                  <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded-lg font-bold">
                                    {segment.highlight}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between bg-slate-50/40 p-3 rounded-2xl border border-slate-100">
                                <div className="text-center flex-1">
                                  <div className="text-xl font-black text-slate-800 tracking-tight">{segment.depTime}</div>
                                  <div className="text-[10px] font-bold text-on-surface-variant/70 mt-0.5">{segment.from}</div>
                                </div>
                                <ArrowRight size={16} className="text-slate-400 shrink-0 mx-2" />
                                <div className="text-center flex-1">
                                  <div className="text-xl font-black text-slate-800 tracking-tight">{segment.arrTime}</div>
                                  <div className="text-[10px] font-bold text-on-surface-variant/70 mt-0.5">{segment.to}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Booking Groups or fallback to traditional passengers card */}
                  {flight.bookings ? (
                    <div className="pt-4 border-t border-outline-variant/15 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11.5px] font-black text-slate-700 uppercase tracking-wider">
                          <Users size={14} className="text-primary" />
                          <span>訂位分組與代號 (可複製)</span>
                        </div>
                        
                        <div className="grid gap-3 sm:grid-cols-1">
                          {flight.bookings.map((b, bIdx) => (
                            <div key={bIdx} className="bg-slate-50/75 border border-slate-200/45 p-4 rounded-2xl space-y-2.5 shadow-sm">
                              <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200/50">
                                <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                                  {b.group}
                                </span>
                                <BookingCodeBadge code={b.code} />
                              </div>
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {b.passengers.map((p, pIdx) => (
                                  <span key={pIdx} className="text-[11px] bg-white border border-slate-200/80 px-2.5 py-1 rounded-xl text-slate-600 font-mono font-bold shadow-sm">
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reminders list */}
                      {flight.reminders && (
                        <div className="bg-amber-50/50 border border-amber-200/45 p-4 rounded-2xl space-y-2">
                          <div className="flex items-center gap-1.5 text-[11.5px] font-black text-amber-900 uppercase tracking-wider">
                            <span className="text-base leading-none">🧳</span>
                            <span>登機拖運與行李提醒</span>
                          </div>
                          <ul className="space-y-1.5">
                            {flight.reminders.map((r, rIdx) => (
                              <li key={rIdx} className="text-xs text-amber-900/80 font-semibold leading-relaxed flex items-start gap-1.5">
                                <span className="text-amber-500 font-bold select-none">•</span>
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-outline-variant/10 space-y-3">
                      <div className="flex items-start gap-3">
                        <Users size={16} className="text-primary mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">乘客名單</p>
                          <p className="text-sm font-bold text-on-surface">{flight.passengers.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
