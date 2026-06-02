import { X, Plane, Clock, MapPin, Users, Ticket, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FlightModal({ isOpen, onClose }: FlightModalProps) {
  const flights = [
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
          highlight: "行李可直掛"
        },
        {
          type: "layover",
          location: "香港 (HKG) T1",
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
      passengers: ["YANG KUNTAI", "SUN TZUNING", "CHIU YIWEN", "WU CHUNHSIEN"]
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
      passengers: ["YANG KUNTAI", "SUN TZUNING", "CHIU YIWEN", "WU CHUNHSIEN"]
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
            className="fixed inset-x-0 bottom-0 top-10 bg-surface z-[70] flex flex-col rounded-t-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-outline-variant/20 bg-white">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <Plane size={24} />
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
                      <h3 className="text-lg font-bold text-on-surface">{flight.title}</h3>
                      <p className="text-sm text-on-surface-variant font-medium">{flight.date}</p>
                    </div>
                  </div>

                  <div className="space-y-4 relative">
                    {flight.segments.map((segment, sIdx) => {
                      if (segment.type === 'layover') {
                        return (
                          <div key={sIdx} className="flex items-center gap-3 py-2 pl-2">
                            <div className="w-1 h-8 bg-dashed border-l-2 border-dashed border-outline-variant/40 ml-2.5"></div>
                            <div className="bg-surface-container-low px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-wider">
                              <Clock size={12} />
                              轉機：{segment.location} ({segment.duration})
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={sIdx} className="relative">
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                              </div>
                              {sIdx < flight.segments.length - 1 && (
                                <div className="w-0.5 flex-1 bg-primary/20 my-1"></div>
                              )}
                            </div>
                            <div className="flex-1 space-y-3 pb-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-primary">{segment.airline}</span>
                                {segment.highlight && (
                                  <span className="text-[10px] bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-md font-bold">
                                    {segment.highlight}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="text-center">
                                  <div className="text-xl font-black text-on-surface">{segment.depTime}</div>
                                  <div className="text-[10px] font-bold text-on-surface-variant/70 mt-0.5">{segment.from}</div>
                                </div>
                                <ArrowRight size={16} className="text-outline-variant" />
                                <div className="text-center">
                                  <div className="text-xl font-black text-on-surface">{segment.arrTime}</div>
                                  <div className="text-[10px] font-bold text-on-surface-variant/70 mt-0.5">{segment.to}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-outline-variant/10 space-y-3">
                    <div className="flex items-start gap-3">
                      <Users size={16} className="text-primary mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">乘客名單</p>
                        <p className="text-sm font-bold text-on-surface">{flight.passengers.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
