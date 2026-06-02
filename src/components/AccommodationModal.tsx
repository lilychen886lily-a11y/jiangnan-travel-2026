import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Phone, Calendar, Clock, Building2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Accommodation {
  id: string;
  name: string;
  address: string;
  phone: string;
  checkIn: string; // e.g., '2026-06-25 14:00'
  roomType: string;
  image?: string;
  mapLink: string;
}

const accommodations: Accommodation[] = [
  {
    id: '1',
    name: '烏鎮通安客棧 / 昭明書舍',
    address: '浙江省嘉興市桐鄉市烏鎮西柵景區內',
    phone: '0573-88731088',
    checkIn: '2026-06-25 14:00 入住',
    roomType: '大床房C / 標間',
    mapLink: 'https://uri.amap.com/search?keyword=烏鎮通安客棧&callnative=1'
  },
  {
    id: '2',
    name: '南潯花間堂·求恕里',
    address: '浙江省湖州市南潯區南潯鎮南西街109號',
    phone: '0572-3061111',
    checkIn: '2026-06-26 14:00 入住',
    roomType: '藏·倚云 / 藏·玉霄',
    mapLink: 'https://uri.amap.com/search?keyword=南潯花間堂求恕里&callnative=1'
  },
  {
    id: '3',
    name: '城際杭州西湖慶春路酒店',
    address: '浙江省杭州市上城區慶春路153號',
    phone: '0571-87359555',
    checkIn: '2026-06-27 14:00 入住',
    roomType: '高級雙床房',
    mapLink: 'https://uri.amap.com/search?keyword=城際杭州西湖慶春路酒店&callnative=1'
  },
  {
    id: '4',
    name: '桔子水晶上海外灘豫園酒店',
    address: '上海市黃浦區人民路861號',
    phone: '021-63305599',
    checkIn: '2026-06-28 14:00 入住',
    roomType: '水晶大床房',
    mapLink: 'https://uri.amap.com/search?keyword=桔子水晶上海外灘豫園酒店&callnative=1'
  }
];

export default function AccommodationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
                <h2 className="text-2xl font-bold text-primary">住宿詳細資料</h2>
                <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Accommodation Details</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-12">
              {accommodations.map((hotel, idx) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[32px] overflow-hidden border border-outline-variant/10 shadow-sm"
                >
                  <div className="p-6 border-b border-outline-variant/5 bg-primary/5">
                    <div className="flex items-center gap-3 mb-2">
                       <Building2 size={20} className="text-primary" />
                       <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Day {idx + 1} 住宿</span>
                    </div>
                    <h3 className="text-xl font-black text-on-surface leading-tight">{hotel.name}</h3>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Check In Time */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary">
                        <Clock size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-on-surface-variant/60 uppercase mb-0.5">入住時間</div>
                        <div className="font-bold text-on-surface">{hotel.checkIn}</div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        <MapPin size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-on-surface-variant/60 uppercase mb-0.5">飯店住址</div>
                        <div className="text-sm font-medium text-on-surface leading-relaxed">{hotel.address}</div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-tertiary/10 flex items-center justify-center flex-shrink-0 text-tertiary">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-on-surface-variant/60 uppercase mb-0.5">聯絡電話</div>
                        <a href={`tel:${hotel.phone}`} className="font-bold text-on-surface underline decoration-tertiary/30 underline-offset-4">{hotel.phone}</a>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-surface-container-low flex gap-2">
                    <a 
                      href={hotel.mapLink}
                      className="flex-1 h-12 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                      <MapPin size={18} />
                      高德導航
                    </a>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-outline-variant/10 text-on-surface-variant">
                      <ExternalLink size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
