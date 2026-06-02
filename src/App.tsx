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
import { useState, useEffect } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import NavGrid from './components/NavGrid';
import BottomNav from './components/BottomNav';

import ItineraryModal from './components/ItineraryModal';
import BudgetModal, { ExpenseItem, initialMembers, initialExpenses } from './components/BudgetModal';
import AccommodationModal from './components/AccommodationModal';
import FlightModal from './components/FlightModal';
import TransportModal from './components/TransportModal';

export default function App() {
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);
  const [isFlightOpen, setIsFlightOpen] = useState(false);
  const [isTransportOpen, setIsTransportOpen] = useState(false);

  // Elevated state from BudgetModal for unified financial reactive calculations
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('trip_expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  useEffect(() => {
    localStorage.setItem('trip_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const totalAccommodation = expenses.filter(e => e.category === 'accommodation').reduce((sum, item) => sum + item.amount, 0);
  const totalTransportation = expenses.filter(e => e.category === 'transportation').reduce((sum, item) => sum + item.amount, 0);
  
  // Dynamic Common Fund (2000 per person, 8 members total = 16000)
  const remainingCommonFund = (2000 * initialMembers.length) - (totalAccommodation + totalTransportation);

  const activeTab = isItineraryOpen
    ? 'itinerary'
    : isTransportOpen
    ? 'transportation'
    : isBudgetOpen
    ? 'budget'
    : 'home';

  const handleSelectTab = (tab: 'home' | 'itinerary' | 'transportation' | 'budget') => {
    setIsItineraryOpen(tab === 'itinerary');
    setIsTransportOpen(tab === 'transportation');
    setIsBudgetOpen(tab === 'budget');
    // Close other auxiliary modals on tab change
    if (tab === 'home' || tab === 'itinerary' || tab === 'transportation' || tab === 'budget') {
      setIsAccommodationOpen(false);
      setIsFlightOpen(false);
    }
  };

  const handleGoHome = () => {
    setIsItineraryOpen(false);
    setIsTransportOpen(false);
    setIsBudgetOpen(false);
    setIsAccommodationOpen(false);
    setIsFlightOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface pb-32">
      <Header onGoHome={handleGoHome} />
      
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

        <SummaryCards remainingCommonFund={remainingCommonFund} />
        
        <NavGrid 
          onOpenTransport={() => setIsTransportOpen(true)}
          onOpenFlight={() => setIsFlightOpen(true)}
          onOpenAccommodation={() => setIsAccommodationOpen(true)}
          onOpenItinerary={() => setIsItineraryOpen(true)}
          onOpenBudget={() => setIsBudgetOpen(true)}
        />
      </main>

      <BottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />

      <ItineraryModal isOpen={isItineraryOpen} onClose={() => setIsItineraryOpen(false)} />
      <BudgetModal 
        isOpen={isBudgetOpen} 
        onClose={() => setIsBudgetOpen(false)} 
        expenses={expenses} 
        setExpenses={setExpenses} 
      />
      <AccommodationModal isOpen={isAccommodationOpen} onClose={() => setIsAccommodationOpen(false)} />
      <FlightModal isOpen={isFlightOpen} onClose={() => setIsFlightOpen(false)} />
      <TransportModal isOpen={isTransportOpen} onClose={() => setIsTransportOpen(false)} />
    </div>
  );
}
