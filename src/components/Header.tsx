import { Home } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onGoHome?: () => void;
}

export default function Header({ onGoHome }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onGoHome}
          className="text-[#0369a1] hover:opacity-80 transition-all font-bold cursor-pointer"
        >
          <Home size={24} />
        </motion.button>
        <h1 className="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-2xl text-[#0369a1]">小花旅行社</h1>
      </div>
    </header>
  );
}
