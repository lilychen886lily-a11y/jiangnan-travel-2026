import { X, Car, MapPin, Clock, Info, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TransportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransportModal({ isOpen, onClose }: TransportModalProps) {
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
            className="fixed inset-x-0 bottom-0 top-1/4 bg-surface z-[70] flex flex-col rounded-t-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-outline-variant/20 bg-white">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <Car size={24} />
                機場接送資訊
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-12 bg-surface-container-low">
              {transfers.map((transfer, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-on-surface tracking-tight">{transfer.title}</h3>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">{transfer.route}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {transfer.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex justify-between items-center py-2 border-b border-outline-variant/5 last:border-0 text-sm">
                        <span className="text-on-surface-variant font-medium">{detail.label}</span>
                        <span className={`font-bold ${detail.highlight ? 'text-primary' : 'text-on-surface'}`}>
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-tertiary/5 rounded-2xl p-4 flex gap-3 items-start">
                    <Info size={18} className="text-tertiary mt-0.5 shrink-0" />
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {transfer.note}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="bg-primary rounded-3xl p-6 text-white shadow-lg shadow-primary/20">
                <h4 className="font-bold flex items-center gap-2 mb-2">
                  <Phone size={18} />
                  聯繫司機
                </h4>
                <p className="text-sm text-white/80 mb-4 font-medium italic">
                  接機司機資訊將於出發前 24 小時由包車公司提供。
                </p>
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md py-3 rounded-2xl font-bold transition-colors">
                  查看包車訂單詳情
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
