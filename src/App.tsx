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
import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import NavGrid from './components/NavGrid';
import BottomNav from './components/BottomNav';

import ItineraryModal from './components/ItineraryModal';
import BudgetModal, { ExpenseItem, initialMembers, initialExpenses } from './components/BudgetModal';
import AccommodationModal from './components/AccommodationModal';
import FlightModal from './components/FlightModal';
import TransportModal from './components/TransportModal';
import OtherModal from './components/OtherModal';

import { onSnapshot, setDoc, doc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db, expensesCollection } from './lib/firebase';

export default function App() {
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isAccommodationOpen, setIsAccommodationOpen] = useState(false);
  const [isFlightOpen, setIsFlightOpen] = useState(false);
  const [isTransportOpen, setIsTransportOpen] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);

  // Elevated state from BudgetModal for unified financial reactive calculations
  const [expenses, setExpensesState] = useState<ExpenseItem[]>(() => {
    try {
      const saved = localStorage.getItem('trip_expenses_v6');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage is blocked or unavailable:', e);
    }
    return initialExpenses;
  });

  const hasSyncedInitial = useRef(false);

  // Real-time listener for Firestore database updates with automatic local-cloud merging on startup
  useEffect(() => {
    const unsubscribe = onSnapshot(expensesCollection, async (snapshot) => {
      const fbExpenses: ExpenseItem[] = [];
      snapshot.forEach((d) => {
        fbExpenses.push(d.data() as ExpenseItem);
      });

      if (fbExpenses.length === 0 && snapshot.metadata.fromCache === false) {
        // Firestore is completely empty. Let's seed with current local state (preserving entered pocket money)
        console.log('Firestore is empty. Seeding with current local state...');
        const batch = writeBatch(db);
        
        let localData = initialExpenses;
        try {
          const saved = localStorage.getItem('trip_expenses_v6');
          if (saved) {
            localData = JSON.parse(saved);
          }
        } catch (e) {
          console.warn('Failed to parse localStorage on empty seed:', e);
        }

        localData.forEach((item) => {
          const docRef = doc(db, 'expenses', item.id);
          batch.set(docRef, item);
        });
        
        try {
          await batch.commit();
          console.log('Seeding with local state completed successfully.');
        } catch (err) {
          console.error('Seeding failed:', err);
        }
      } else if (fbExpenses.length > 0) {
        if (!hasSyncedInitial.current) {
          hasSyncedInitial.current = true;
          
          // First sync: merge any local-only entries (e.g. pocket money entered before Firebase or offline)
          let localData: ExpenseItem[] = [];
          try {
            const saved = localStorage.getItem('trip_expenses_v6');
            if (saved) {
              localData = JSON.parse(saved);
            }
          } catch (e) {
            console.warn('Failed to parse localStorage:', e);
          }

          // Find items in localData that are NOT in fbExpenses
          const localOnlyItems = localData.filter(
            (localItem) => !fbExpenses.some((fbItem) => fbItem.id === localItem.id)
          );

          if (localOnlyItems.length > 0) {
            console.log('Found local-only items. Syncing up to Firestore:', localOnlyItems);
            try {
              const batch = writeBatch(db);
              localOnlyItems.forEach((item) => {
                const docRef = doc(db, 'expenses', item.id);
                batch.set(docRef, item);
              });
              await batch.commit();
              console.log('Local-only items synced to Firestore successfully.');
            } catch (err) {
              console.error('Failed to sync local-only items to Firestore:', err);
            }
            return; // Exit, the next snapshot triggered by the batch.commit will contain everything
          }
        }

        // Standard update: update UI state and keep localStorage in sync with cloud
        setExpensesState(fbExpenses);
        try {
          localStorage.setItem('trip_expenses_v6', JSON.stringify(fbExpenses));
        } catch (e) {
          console.warn('Failed to write to LocalStorage:', e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Synchronizes modifications to Firestore safely using functional state updates (avoids stale closures)
  const setExpenses = (valueOrFunc: ExpenseItem[] | ((prev: ExpenseItem[]) => ExpenseItem[])) => {
    setExpensesState((prevExpenses) => {
      const nextExpenses = typeof valueOrFunc === 'function' 
        ? valueOrFunc(prevExpenses) 
        : valueOrFunc;

      // Sync changes to firestore (compare differences and push/delete)
      const syncToFirestore = async () => {
        try {
          // Find deleted items
          const deleted = prevExpenses.filter(e => !nextExpenses.some(ne => ne.id === e.id));
          for (const item of deleted) {
            await deleteDoc(doc(db, 'expenses', item.id));
          }

          // Find added or modified items
          for (const item of nextExpenses) {
            const existingItem = prevExpenses.find(e => e.id === item.id);
            if (!existingItem || JSON.stringify(existingItem) !== JSON.stringify(item)) {
              await setDoc(doc(db, 'expenses', item.id), item);
            }
          }
        } catch (err) {
          console.error('Failed to sync changes to Firestore:', err);
        }
      };

      syncToFirestore();

      // Write directly to local storage to ensure offline safety and immediate updates
      try {
        localStorage.setItem('trip_expenses_v6', JSON.stringify(nextExpenses));
      } catch (e) {
        console.warn('Failed to write to LocalStorage:', e);
      }

      return nextExpenses;
    });
  };


  const totalAccommodation = expenses.filter(e => e.category === 'accommodation').reduce((sum, item) => sum + item.amount, 0);
  const totalTransportation = expenses.filter(e => e.category === 'transportation').reduce((sum, item) => sum + item.amount, 0);
  
  // Dynamic Common Fund (2000 per person, 8 members total = 16000)
  const remainingCommonFund = (2000 * initialMembers.length) - (totalAccommodation + totalTransportation);

  // Dynamic Pocket Money Fund
  const pocketIn = expenses.filter(e => e.category === 'pocket_money_in').reduce((sum, item) => sum + item.amount, 0);
  const pocketOut = expenses.filter(e => e.category === 'pocket_money_out').reduce((sum, item) => sum + item.amount, 0);
  const remainingPocketMoney = pocketIn - pocketOut;

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
      setIsOtherOpen(false);
    }
  };

  const handleGoHome = () => {
    setIsItineraryOpen(false);
    setIsTransportOpen(false);
    setIsBudgetOpen(false);
    setIsAccommodationOpen(false);
    setIsFlightOpen(false);
    setIsOtherOpen(false);
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

        <SummaryCards remainingPocketMoney={remainingPocketMoney} />
        
        <NavGrid 
          onOpenTransport={() => setIsTransportOpen(true)}
          onOpenFlight={() => setIsFlightOpen(true)}
          onOpenAccommodation={() => setIsAccommodationOpen(true)}
          onOpenItinerary={() => setIsItineraryOpen(true)}
          onOpenBudget={() => setIsBudgetOpen(true)}
          onOpenOther={() => setIsOtherOpen(true)}
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
      <OtherModal isOpen={isOtherOpen} onClose={() => setIsOtherOpen(false)} />
    </div>
  );
}
