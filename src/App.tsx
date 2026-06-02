/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import NavGrid from './components/NavGrid';
import BottomNav from './components/BottomNav';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface pb-32">
      <Header />
      
      <main className="mt-20 px-4 max-w-lg mx-auto">
        {/* Minimalist Header */}
        <section className="mb-8 px-2 pt-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-on-surface text-3xl font-extrabold tracking-tight mb-2"
          >
            江南五日遊
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-on-surface-variant font-medium"
          >
            <Calendar size={14} />
            <span className="text-sm">2026/06/25 - 06/29</span>
          </motion.div>
        </section>

        <SummaryCards />
        
        <NavGrid />
      </main>

      <BottomNav />
    </div>
  );
}
