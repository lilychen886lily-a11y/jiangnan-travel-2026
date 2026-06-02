import { Home, Plane, Car, Calendar, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export default function BottomNav() {
  const navItems = [
    { label: '首頁', icon: Home, href: '#home', active: true },
    { label: '行程', icon: Calendar, href: '#itinerary' },
    { label: '交通', icon: Car, href: '#transportation' },
    { label: '帳本', icon: Wallet, href: '#budget' }
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-10 bg-white/80 backdrop-blur-2xl safe-bottom">
      <div className="fixed bottom-6 left-4 right-4 rounded-3xl overflow-hidden flex justify-around items-center bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] h-16">
        {navItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-col items-center justify-center px-5 py-2 transition-all duration-150 ease-out ${
              item.active 
                ? 'bg-[#e0f2fe] text-[#0369a1] rounded-2xl' 
                : 'text-slate-400 hover:text-[#0369a1]'
            }`}
          >
            <item.icon size={20} className={item.active ? 'fill-current' : ''} />
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>
    </footer>
  );
}
