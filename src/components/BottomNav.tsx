import { Home, Calendar, Car, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: 'home' | 'itinerary' | 'transportation' | 'budget';
  onSelectTab: (tab: 'home' | 'itinerary' | 'transportation' | 'budget') => void;
}

export default function BottomNav({ activeTab, onSelectTab }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, label: '首頁', icon: Home },
    { id: 'itinerary' as const, label: '行程', icon: Calendar },
    { id: 'transportation' as const, label: '交通', icon: Car },
    { id: 'budget' as const, label: '帳本', icon: Wallet }
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-10 bg-white/80 backdrop-blur-2xl safe-bottom">
      <div className="fixed bottom-6 left-4 right-4 rounded-3xl overflow-hidden flex justify-around items-center bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center px-5 py-2 transition-all duration-150 ease-out cursor-pointer ${
                isActive 
                  ? 'bg-[#e0f2fe] text-[#0369a1] rounded-2xl font-bold' 
                  : 'text-slate-400 hover:text-[#0369a1]'
              }`}
            >
              <item.icon size={20} className={isActive ? 'fill-current text-[#0369a1]' : 'text-slate-400'} />
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-widest mt-1">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </footer>
  );
}
