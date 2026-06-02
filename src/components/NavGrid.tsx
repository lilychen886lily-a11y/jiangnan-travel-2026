import { PlaneTakeoff, Building2, MapPinned, CalendarDays, Wallet, Bus, ExternalLink, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import ItineraryModal from './ItineraryModal';
import BudgetModal from './BudgetModal';
import AccommodationModal from './AccommodationModal';
import FlightModal from './FlightModal';
import TransportModal from './TransportModal';

export default function NavGrid() {
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);
  const [isFlightOpen, setIsFlightOpen] = useState(false);
  const [isTransportOpen, setIsTransportOpen] = useState(false);

  const navItems = [
    {
      title: '機場接送/停車',
      icon: Bus,
      color: 'bg-[#0e7490]',
      onClick: () => setIsTransportOpen(true)
    },
    {
      title: '機票詳情',
      icon: PlaneTakeoff,
      color: 'bg-[#0077b6]',
      onClick: () => setIsFlightOpen(true)
    },
    {
      title: '住宿詳細資料',
      icon: Building2,
      color: 'bg-[#00677d]',
      onClick: () => setIsAccommodationOpen(true)
    },
    {
      title: '交通資訊',
      icon: MapPinned,
      color: 'bg-[#4da3ff]',
      href: `https://uri.amap.com/search?keyword=${encodeURIComponent('江南旅遊')}&callnative=1`,
      external: true
    },
    {
      title: '每日行程',
      icon: CalendarDays,
      color: 'bg-[#005d90]',
      onClick: () => setIsItineraryOpen(true)
    },
    {
      title: '費用與分攤',
      icon: Wallet,
      color: 'bg-[#9d370c]',
      onClick: () => setIsBudgetOpen(true)
    },
    {
      title: '其它',
      icon: MoreHorizontal,
      color: 'bg-[#64748b]',
      href: '#other'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {navItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={item.onClick}
            className={`${item.color} h-20 rounded-2xl overflow-hidden shadow-sm group transition-all duration-200 active:scale-[0.98] cursor-pointer`}
          >
            {item.href ? (
              <a href={item.href} target={item.external ? "_blank" : "_self"} className="relative h-full flex items-center justify-between px-6">
                <ItemContent item={item} />
              </a>
            ) : (
              <div className="relative h-full flex items-center justify-between px-6">
                <ItemContent item={item} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <ItineraryModal isOpen={isItineraryOpen} onClose={() => setIsItineraryOpen(false)} />
      <BudgetModal isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} />
      <AccommodationModal isOpen={isAccommodationOpen} onClose={() => setIsAccommodationOpen(false)} />
      <FlightModal isOpen={isFlightOpen} onClose={() => setIsFlightOpen(false)} />
      <TransportModal isOpen={isTransportOpen} onClose={() => setIsTransportOpen(false)} />
    </>
  );
}

function ItemContent({ item }: { item: any }) {
  const ChevronRight = () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <item.icon className="text-white" size={24} />
        </div>
        <span className="text-white text-lg font-bold tracking-tight">{item.title}</span>
      </div>
      
      <div className="flex items-center gap-3">
        {item.external && (
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Go to</span>
        )}
        {item.external ? (
          <ExternalLink className="text-white/50" size={18} />
        ) : (
          <ChevronRight />
        )}
      </div>
    </>
  );
}
