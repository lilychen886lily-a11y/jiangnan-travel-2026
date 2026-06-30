import { motion, AnimatePresence } from 'motion/react';
import { X, Users, CreditCard, Hotel, Car, ReceiptText, Plus, Trash2, Edit2, Wallet, ArrowUpRight, ArrowDownLeft, Home, Printer, Download, Sparkles, Check } from 'lucide-react';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export interface ExpenseItem {
  id: string;
  category: 'accommodation' | 'transportation' | 'pocket_money_in' | 'pocket_money_out';
  title: string;
  date: string;
  amount: number;
  unitPrice?: number;
  quantity?: number;
  description: string;
  splitMembers: string[]; // List of members sharing this expense
  pairIndex?: number; // For accommodation pairs (2 people per room)
}

export const initialMembers = ['小花', '蘋果', '強哥', '京慧', '阿英', '泰哥', '俊賢', '小雯'];

export const initialExpenses: ExpenseItem[] = [
  { id: '1', category: 'accommodation', title: '烏鎮西柵景區＋住宿套票', date: '06/25', amount: 3506.00, unitPrice: 876.50, quantity: 4, description: '4套 (含通安客棧大床/雙床房1晚、西柵門票8張、明徽徽菜精緻雙人正餐4份、非遺漆扇DIY、免費遊覽車/行李託運)', splitMembers: initialMembers },
  { id: '2-1', category: 'accommodation', title: '南潯花間堂·求恕里 (藏·玉霄大床房)', date: '06/26', amount: 1314.92, unitPrice: 657.46, quantity: 2, description: '大床房 2間 (俊賢、小雯、強哥、京慧)', splitMembers: ['俊賢', '小雯', '強哥', '京慧'] },
  { id: '2-2', category: 'accommodation', title: '南潯花間堂·求恕里 (藏·倚雲大床房)', date: '06/26', amount: 773.62, unitPrice: 773.62, quantity: 1, description: '大床房 1間 (泰哥、阿英)', splitMembers: ['泰哥', '阿英'] },
  { id: '2-3', category: 'accommodation', title: '南潯花間堂·求恕里 (藏·映桃家庭房)', date: '06/26', amount: 858.32, unitPrice: 858.32, quantity: 1, description: '家庭房 1間 (小花、蘋果)', splitMembers: ['小花', '蘋果'] },
  { id: '9', category: 'accommodation', title: '華住會金卡會員卡', date: '06/27', amount: 135.92, unitPrice: 16.99, quantity: 8, description: '團體辦理華住會員金卡 (單價 ¥16.99 × 8人) | 提供大宗酒店訂單折扣、免費早餐禮遇及房型升等權益，平均於城際、水晶等住處享最大化優惠', splitMembers: initialMembers },
  { id: '3', category: 'accommodation', title: '杭州西湖大春路城際酒店 (慶春路)', date: '06/27', amount: 1434.56, description: '雙床房 3間(¥1,075.92) / 雙床房 1間(¥358.64)。(含自助雙人早餐4份/共8人份)', splitMembers: initialMembers },
  { id: '4', category: 'accommodation', title: '上海外灘豫園桔子水晶酒店', date: '06/28', amount: 2444.08, description: '大床房 3間(¥1,803.36) / 高級雙床房 1間(¥640.72) 共4間。(含早餐8份)', splitMembers: initialMembers },
  { id: '5', category: 'transportation', title: '全行程大包車費用 (上海－杭州－南京－烏鎮)', date: '06/25', amount: 2000.00, unitPrice: 100.00, quantity: 20, description: '實付包車款 (¥100 × 20計費單元) 全程管家隨行商務座大巴/用車', splitMembers: initialMembers },
  { id: '8', category: 'transportation', title: '高鐵：杭州東站 ➝ 上海南站 (G7542 一等座)', date: '06/28', amount: 1104.00, unitPrice: 138.00, quantity: 8, description: '全體8人高鐵票 | 14:05 杭州東站開 ➔ 15:11 抵達上海南站 | 座位與實名證件詳見高鐵詳情', splitMembers: initialMembers },
  
  // 零用金收入項目 (pocket_money_in)
  { id: 'p-in-1', category: 'pocket_money_in', title: '零用金', date: '06/26', amount: 4000.00, unitPrice: 500.00, quantity: 8, description: '每人預交 ¥500 (共8人)', splitMembers: initialMembers },
  
  // 零用金支出項目 (pocket_money_out)
  { id: 'p-out-1', category: 'pocket_money_out', title: '綠豆糕', date: '06/25', amount: 28.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-2', category: 'pocket_money_out', title: '晚餐', date: '06/25', amount: 103.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-3', category: 'pocket_money_out', title: '霸王茶姬', date: '06/25', amount: 118.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-4', category: 'pocket_money_out', title: '小龍蝦', date: '06/25', amount: 365.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-5', category: 'pocket_money_out', title: '全家花生茶點', date: '06/26', amount: 57.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-6', category: 'pocket_money_out', title: '水果', date: '06/26', amount: 63.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-7', category: 'pocket_money_out', title: '滷味', date: '06/26', amount: 72.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-8', category: 'pocket_money_out', title: '烤肉', date: '06/26', amount: 170.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-9', category: 'pocket_money_out', title: '古鎮到按摩車資', date: '06/26', amount: 9.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-10', category: 'pocket_money_out', title: '按摩回古鎮車資', date: '06/26', amount: 3.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-11', category: 'pocket_money_out', title: '豬肉干', date: '06/26', amount: 66.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-12', category: 'pocket_money_out', title: '綠豆糕', date: '06/26', amount: 30.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-13', category: 'pocket_money_out', title: '聖園軒按摩', date: '06/26', amount: 1112.00, unitPrice: 139.00, quantity: 8, description: '¥139 × 8人 | 聖園軒足浴按摩', splitMembers: initialMembers },
  { id: 'p-out-14', category: 'pocket_money_out', title: '烏鎮到南潯車費', date: '06/26', amount: 160.00, unitPrice: 80.00, quantity: 2, description: '¥80 × 2人 | 烏鎮到南潯包車車費', splitMembers: initialMembers },
  { id: 'p-out-15', category: 'pocket_money_out', title: '栗子餅', date: '06/26', amount: 10.00, unitPrice: 2.00, quantity: 5, description: '¥2 × 5個 | 栗子餅點心', splitMembers: initialMembers },
  { id: 'p-out-16', category: 'pocket_money_out', title: '楊莓干', date: '06/26', amount: 11.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-17', category: 'pocket_money_out', title: '梅干菜餅', date: '06/26', amount: 5.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-18', category: 'pocket_money_out', title: '烏鎮船', date: '06/26', amount: 500.00, description: '無備註', splitMembers: initialMembers },
  { id: 'p-out-19', category: 'pocket_money_out', title: '蘿蔔絲餅', date: '06/26', amount: 12.00, unitPrice: 3.00, quantity: 4, description: '¥3 × 4個 | 蘿蔔絲餅點心', splitMembers: initialMembers },
];

export function parseDateToSortValue(dateStr: string): number {
  if (!dateStr) return 0;
  const cleanStr = dateStr.replace(/-/g, '/').trim();
  const parts = cleanStr.split('/');
  
  if (parts.length === 3) {
    let year = 2026;
    let month = 1;
    let day = 1;
    if (parts[0].length === 4) {
      year = parseInt(parts[0], 10) || 2026;
      month = parseInt(parts[1], 10) || 1;
      day = parseInt(parts[2], 10) || 1;
    } else if (parts[2].length === 4) {
      year = parseInt(parts[2], 10) || 2026;
      month = parseInt(parts[0], 10) || 1;
      day = parseInt(parts[1], 10) || 1;
    } else {
      month = parseInt(parts[0], 10) || 1;
      day = parseInt(parts[1], 10) || 1;
      year = (parseInt(parts[2], 10) || 26) + 2000;
    }
    return new Date(year, month - 1, day).getTime();
  } else if (parts.length === 2) {
    const month = parseInt(parts[0], 10) || 1;
    const day = parseInt(parts[1], 10) || 1;
    return new Date(2026, month - 1, day).getTime();
  }
  
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.getTime();
  }
  
  return 0;
}

export function sortExpensesByDate(list: ExpenseItem[]): ExpenseItem[] {
  return [...list].sort((a, b) => {
    const valA = parseDateToSortValue(a.date);
    const valB = parseDateToSortValue(b.date);
    return valA - valB;
  });
}

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: ExpenseItem[];
  setExpenses: Dispatch<SetStateAction<ExpenseItem[]>>;
}

export default function BudgetModal({ isOpen, onClose, expenses, setExpenses }: BudgetModalProps) {
  const [tab, setTab] = useState<'total' | 'individual' | 'pocket' | 'print'>('total');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ExpenseItem>>({});

  const handleAdd = (category: 'accommodation' | 'transportation' | 'pocket_money_in' | 'pocket_money_out') => {
    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      category,
      title: '新項目',
      date: new Date().toLocaleDateString(),
      amount: 0,
      splitMembers: [...initialMembers],
      description: ''
    };
    setExpenses([...expenses, newItem]);
    setIsEditing(newItem.id);
    setEditForm(newItem);
  };

  const handleSave = () => {
    if (isEditing) {
      setExpenses(expenses.map(exp => exp.id === isEditing ? { ...exp, ...editForm } as ExpenseItem : exp));
      setIsEditing(null);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      const currentItem = expenses.find(e => e.id === isEditing);
      if (currentItem && currentItem.title === '新項目' && currentItem.amount === 0) {
        setExpenses(expenses.filter(e => e.id !== isEditing));
      }
      setIsEditing(null);
    }
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalAccommodation = expenses.filter(e => e.category === 'accommodation').reduce((sum, item) => sum + item.amount, 0);
  const totalTransportation = expenses.filter(e => e.category === 'transportation').reduce((sum, item) => sum + item.amount, 0);
  const grandTotal = totalAccommodation + totalTransportation;

  // Calculates the precise accommodation share for each member based on their individual assigned rooms
  const getMemberAccommodationShare = (m: string) => {
    let total = 0;
    
    // Day 1: 06/25 (id: '1' or title containing 烏鎮)
    const d1 = expenses.find(e => e.id === '1' || e.title.includes('烏鎮'));
    if (d1) {
      const splitList = d1.splitMembers || initialMembers;
      if (splitList.includes(m)) {
        total += d1.amount / splitList.length;
      }
    }
    
    // Day 2: 06/26 (Nanxun / 花間堂) - split dynamically if room types are different!
    const day2Accoms = expenses.filter(e => e.category === 'accommodation' && (e.date === '06/26' || e.id.match(/^2(-\d+)?$/) || e.title.includes('南潯')));
    day2Accoms.forEach(e => {
      const splitList = e.splitMembers || [];
      if (splitList.includes(m) && splitList.length > 0) {
        total += e.amount / splitList.length;
      }
    });
    
    // Day 3: 06/27 (id: '3' or title containing 杭州西湖)
    const d3 = expenses.find(e => e.id === '3' || e.title.includes('杭州') || e.title.includes('城際'));
    if (d3) {
      const splitList = d3.splitMembers || initialMembers;
      if (splitList.includes(m)) {
        total += d3.amount / splitList.length;
      }
    }
    
    // Day 4: 06/28 (id: '4' or title containing 桔子 or 水晶 or 上海)
    const d4 = expenses.find(e => e.id === '4' || e.title.includes('桔子') || e.title.includes('水晶') || e.title.includes('上海'));
    if (d4) {
      // Room 1 (大床, ¥601.12): 強哥 & 京慧  -> each pays 300.56
      // Room 2 (雙床, ¥640.72): 小花 & 蘋果  -> each pays 320.36
      // Room 3 (大床, ¥601.12): 泰哥 & 阿英  -> each pays 300.56
      // Room 4 (大床, ¥601.12): 小雯 & 俊賢  -> each pays 300.56
      const baseTotal = 2444.08;
      const splitList = d4.splitMembers || initialMembers;
      if (splitList.includes(m)) {
        if (m === '強哥' || m === '京慧' || m === '泰哥' || m === '阿英' || m === '小雯' || m === '俊賢') {
          total += d4.amount * (300.56 / baseTotal);
        } else if (m === '小花' || m === '蘋果') {
          total += d4.amount * (320.36 / baseTotal);
        } else {
          total += d4.amount / splitList.length;
        }
      }
    }
    
    // Fallback for custom or manually added accommodation expenses
    const standardIds = ['1', '2', '3', '4', '2-1', '2-2', '2-3'];
    const otherAccoms = expenses.filter(e => 
      e.category === 'accommodation' && 
      !standardIds.includes(e.id) && 
      !e.id.match(/^2(-\d+)?$/) &&
      !e.title.includes('烏鎮') && 
      !e.title.includes('南潯') && 
      !e.title.includes('城際') && 
      !e.title.includes('桔子') && 
      !e.title.includes('水晶')
    );
    otherAccoms.forEach(e => {
      const splitList = e.splitMembers || initialMembers;
      if (splitList.includes(m)) {
        total += e.amount / splitList.length;
      }
    });

    return total;
  };
  
  // Cumulative Common Fund: 2000 per person
  const totalCommonFundInput = 2000 * initialMembers.length; // 8 * 2000 = 16000
  const remainingCommonFund = totalCommonFundInput - grandTotal;

  // Pocket Money Calcs: Dedicated Pocket Fund of 0 per person (total ¥0)
  const totalPocketFundInput = 0 * initialMembers.length; // 8 * 0 = 0
  const pocketIn = expenses.filter(e => e.category === 'pocket_money_in').reduce((sum, item) => sum + item.amount, 0);
  const pocketOut = expenses.filter(e => e.category === 'pocket_money_out').reduce((sum, item) => sum + item.amount, 0);
  const pocketBalance = totalPocketFundInput + pocketIn - pocketOut;

  // Individual Calc (Dynamic based on splitMembers)
  const memberTotals: { [name: string]: number } = {};
  initialMembers.forEach(m => memberTotals[m] = 0);

  expenses.forEach(exp => {
    const splitCount = exp.splitMembers?.length || initialMembers.length;
    if (exp.category === 'accommodation' || exp.category === 'transportation' || exp.category === 'pocket_money_out') {
      const share = exp.amount / splitCount;
      exp.splitMembers?.forEach(m => {
        if (memberTotals[m] !== undefined) memberTotals[m] += share;
      });
    } else if (exp.category === 'pocket_money_in') {
      const credit = exp.amount / splitCount;
      exp.splitMembers?.forEach(m => {
        if (memberTotals[m] !== undefined) memberTotals[m] -= credit;
      });
    }
  });

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
                <h2 className="text-2xl font-bold text-primary">行程帳本</h2>
                <p className="text-sm text-on-surface-variant italic">貨幣：人民幣 (¥)</p>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex bg-white px-4 py-2 border-b overflow-x-auto no-scrollbar gap-2">
              {[
                { id: 'total', label: '主要明細', icon: CreditCard },
                { id: 'pocket', label: '零用金', icon: Wallet },
                { id: 'individual', label: '人均分攤', icon: Users },
                { id: 'print', label: 'A4 請款單', icon: Printer }
              ].map(t => (
                <button 
                  key={t.id}
                  onClick={() => setTab(t.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${tab === t.id ? 'bg-primary text-white shadow-md' : 'bg-surface-container text-on-surface-variant'}`}
                >
                  <t.icon size={16} />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
              {tab === 'total' && (
                <>
                  <SummaryCard 
                    grandTotal={grandTotal} 
                    accom={totalAccommodation} 
                    trans={totalTransportation} 
                    remainingCommonFund={remainingCommonFund} 
                  />
                  
                  <ExpenseSection 
                    title="住宿費用" 
                    icon={<Hotel size={18} />} 
                    items={expenses.filter(e => e.category === 'accommodation')} 
                    color="primary"
                    onEdit={(id) => { setIsEditing(id); setEditForm(expenses.find(e => e.id === id) || {}); }}
                    onDelete={handleDelete}
                    onAdd={() => handleAdd('accommodation')}
                  />

                  <ExpenseSection 
                    title="交通費用" 
                    icon={<Car size={18} />} 
                    items={expenses.filter(e => e.category === 'transportation')} 
                    color="secondary"
                    onEdit={(id) => { setIsEditing(id); setEditForm(expenses.find(e => e.id === id) || {}); }}
                    onDelete={handleDelete}
                    onAdd={() => handleAdd('transportation')}
                  />
                </>
              )}

              {tab === 'pocket' && (
                <div className="space-y-6">
                  <div className="bg-primary/10 rounded-[32px] p-6 border border-primary/20">
                    <div className="text-sm font-bold text-primary mb-2 uppercase tracking-widest text-center">零用金餘額</div>
                    <div className="text-4xl font-black text-primary text-center">¥{pocketBalance.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-[10px] font-bold text-green-600 mb-1">總收入</div>
                        <div className="font-bold text-green-700">¥{pocketIn.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</div>
                      </div>
                      <div className="text-center border-l">
                        <div className="text-[10px] font-bold text-error mb-1">總支出</div>
                        <div className="font-bold text-error">¥{pocketOut.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</div>
                      </div>
                    </div>
                  </div>

                  <ExpenseSection 
                    title="收入項目" 
                    icon={<ArrowDownLeft size={18} />} 
                    items={expenses.filter(e => e.category === 'pocket_money_in')} 
                    color="green"
                    onEdit={(id) => { setIsEditing(id); setEditForm(expenses.find(e => e.id === id) || {}); }}
                    onDelete={handleDelete}
                    onAdd={() => handleAdd('pocket_money_in')}
                    isPocket
                  />

                  <ExpenseSection 
                    title="支出項目" 
                    icon={<ArrowUpRight size={18} />} 
                    items={expenses.filter(e => e.category === 'pocket_money_out')} 
                    color="error"
                    onEdit={(id) => { setIsEditing(id); setEditForm(expenses.find(e => e.id === id) || {}); }}
                    onDelete={handleDelete}
                    onAdd={() => handleAdd('pocket_money_out')}
                    isPocket
                  />
                </div>
              )}

              {tab === 'individual' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline-variant/10">
                    <div className="flex items-center gap-2 mb-4 border-b pb-3 border-slate-100">
                      <Users className="text-[#005d90]" size={22} />
                      <div>
                        <span className="font-extrabold text-[#005d90] text-lg block">個人分攤與結算明細</span>
                        <span className="text-[10px] text-slate-400 font-bold block mt-0.5">預收與分帳採「公積金款項」與「隨行零用金」分開記帳結算</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {initialMembers.map((m, i) => {
                        const accomShare = getMemberAccommodationShare(m);
                        const transShare = expenses.filter(e => e.category === 'transportation').reduce((sum, item) => sum + ((item.splitMembers || initialMembers).includes(m) ? item.amount / (item.splitMembers?.length || initialMembers.length) : 0), 0);
                        const pocketOutShare = expenses.filter(e => e.category === 'pocket_money_out').reduce((sum, item) => sum + ((item.splitMembers || initialMembers).includes(m) ? item.amount / (item.splitMembers?.length || initialMembers.length) : 0), 0);
                        const pocketInShare = expenses.filter(e => e.category === 'pocket_money_in').reduce((sum, item) => sum + ((item.splitMembers || initialMembers).includes(m) ? item.amount / (item.splitMembers?.length || initialMembers.length) : 0), 0);
                        
                        // 1. Common Fund Settle: Prepaid 2000, actual cost is accomShare + transShare
                        const commonCost = accomShare + transShare;
                        const commonRefund = 2000 - commonCost;
                        
                        // 2. Pocket Money Settle: Prepaid pocketInShare, actual cost is pocketOutShare
                        const pocketRefund = pocketInShare - pocketOutShare;
                        
                        // Combined Settlement: Settle the 2000 prepaid and pocket money refund
                        const actualCost = commonCost + pocketOutShare;
                        const balance = commonRefund + pocketRefund;
                        
                        return (
                          <div key={i} className="bg-slate-50/50 rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
                            <div className="flex items-center justify-between border-b pb-2 border-slate-200">
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-[#005d90]/10 text-[#005d90] flex items-center justify-center font-black text-sm">{m.charAt(0)}</div>
                                <span className="font-extrabold text-base text-slate-800">{m}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] text-slate-400 font-bold block">本期合併應收退 (公積金與零用金合併結算)</span>
                                {balance >= 0 ? (
                                  <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-black inline-flex items-center gap-1 border border-emerald-100">
                                    應退還 ¥{balance.toFixed(1)} (NT${Math.round(balance * 4.15).toLocaleString()})
                                  </span>
                                ) : (
                                  <span className="bg-amber-50 text-amber-700 text-xs px-2.5 py-0.5 rounded-full font-black inline-flex items-center gap-1 border border-amber-100">
                                    應補繳 ¥{Math.abs(balance).toFixed(1)} (NT${Math.round(Math.abs(balance) * 4.15).toLocaleString()})
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Two Channels Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {/* Common Fund Account */}
                              <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1.5 shadow-xs">
                                <div className="flex justify-between items-center border-b pb-1 border-dashed border-slate-150">
                                  <span className="font-black text-[#005d90] flex items-center gap-1 text-[11px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#005d90] block animate-pulse"></span>
                                    公積金(大宗交通/宿)
                                  </span>
                                  <span className="text-[9px] font-extrabold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">已交 ¥2,000</span>
                                </div>
                                <div className="space-y-1 text-[11px] font-bold text-slate-500">
                                  <div className="flex justify-between">
                                    <span>住宿代付分攤</span>
                                    <span className="text-slate-700">¥{accomShare.toFixed(1)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>交通包車分攤</span>
                                    <span className="text-slate-700">¥{transShare.toFixed(1)}</span>
                                  </div>
                                  <div className="h-px bg-slate-100 my-1" />
                                  <div className="flex justify-between text-slate-800 font-extrabold">
                                    <span>公積費用總攤</span>
                                    <span>¥{commonCost.toFixed(1)}</span>
                                  </div>
                                  <div className="flex justify-between font-black text-[11px] pt-0.5 border-t border-slate-50">
                                    <span>公積金結算結果</span>
                                    <span className={commonRefund >= 0 ? "text-emerald-600" : "text-amber-600"}>
                                      {commonRefund >= 0 ? `應退 ¥${commonRefund.toFixed(1)}` : `應補 ¥${Math.abs(commonRefund).toFixed(1)}`}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Pocket Money Account */}
                              <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1.5 shadow-xs">
                                <div className="flex justify-between items-center border-b pb-1 border-dashed border-slate-150">
                                  <span className="font-black text-emerald-800 flex items-center gap-1 text-[11px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block animate-pulse"></span>
                                    隨手零用金
                                  </span>
                                  <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                    {pocketInShare > 0 ? `已交預收 ¥${pocketInShare.toFixed(1)}` : '不另預收 (¥0.0)'}
                                  </span>
                                </div>
                                <div className="space-y-1 text-[11px] font-bold text-slate-500">
                                  <div className="flex justify-between">
                                    <span>已預交零用金</span>
                                    <span className="text-emerald-600">¥{pocketInShare.toFixed(1)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>實際零用支出均攤</span>
                                    <span className="text-slate-700">¥{pocketOutShare.toFixed(1)}</span>
                                  </div>
                                  <div className="h-px bg-slate-100 my-1" />
                                  <div className="flex justify-between font-black text-[11px] pt-0.5 border-t border-slate-50">
                                    <span>零用金結算結果</span>
                                    <span className={pocketRefund >= 0 ? "text-emerald-600" : "text-amber-600"}>
                                      {pocketRefund >= 0 ? `餘額應退 ¥${pocketRefund.toFixed(1)}` : `實際應補 ¥${Math.abs(pocketRefund).toFixed(1)}`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Final Sum Footer */}
                            <div className="bg-[#005d90]/5 rounded-xl p-2.5 px-3 flex flex-wrap justify-between items-center text-xs font-black text-[#005d90] gap-2">
                              <span>全行程實際總應分攤 (公積 + 零用)</span>
                              <span className="text-sm">
                                ¥{actualCost.toFixed(1)} 
                                <span className="text-[10px] font-bold text-slate-400 ml-1.5">/ 折合約 NT${Math.round(actualCost * 4.15).toLocaleString()}</span>
                              </span>
                            </div>
                            
                            <div className="text-[10px] text-slate-400 italic font-medium px-1 text-center">
                              說明：目前公積金預付 ¥2,000 已支付。零用金已付 ¥{pocketInShare.toFixed(1)}。由公積金結算應退 (¥{commonRefund.toFixed(1)}) 加上零用金結算 {(pocketRefund >= 0 ? '應退' : '應補')} (¥{Math.abs(pocketRefund).toFixed(1)}) 後，得出本次最終合併多退少補狀態。
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'print' && (
                <div className="space-y-6">
                  {/* Action Bar */}
                  <div className="bg-gradient-to-r from-primary to-[#0077b6] text-white rounded-3xl p-5 shadow-md flex flex-wrap gap-4 items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-lg flex items-center gap-1.5"><Sparkles size={18} /> 請款單與拆帳工具箱</h4>
                      <p className="text-xs opacity-90 mt-0.5">點擊下方按鈕可調用系統列印，或一鍵複製 HTML A4 請款單文本。</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.print()}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 active:scale-95 transition-all animate-pulse"
                      >
                        <Printer size={14} />
                        瀏覽器列印
                      </button>
                      <button 
                        onClick={() => {
                          const sortedExpenses = sortExpensesByDate(expenses);
                          const memberLines = initialMembers.map(m => {
                            const accomShare = getMemberAccommodationShare(m);
                            const transShare = expenses.filter(e => e.category === 'transportation').reduce((sum, item) => sum + ((item.splitMembers || initialMembers).includes(m) ? item.amount / (item.splitMembers?.length || initialMembers.length) : 0), 0);
                            const pocketOutShare = expenses.filter(e => e.category === 'pocket_money_out').reduce((sum, item) => sum + ((item.splitMembers || initialMembers).includes(m) ? item.amount / (item.splitMembers?.length || initialMembers.length) : 0), 0);
                            const pocketInShare = expenses.filter(e => e.category === 'pocket_money_in').reduce((sum, item) => sum + ((item.splitMembers || initialMembers).includes(m) ? item.amount / (item.splitMembers?.length || initialMembers.length) : 0), 0);
                            
                            const commonCost = accomShare + transShare;
                            const commonRefund = 2000 - commonCost;
                            const pocketRefund = pocketInShare - pocketOutShare;
                            // Settle 2000 prepaid and pocket money refund:
                            const totalRefund = commonRefund + pocketRefund; 
                            
                            const totalStatusLabel = totalRefund >= 0 ? '本期合併應退還' : '本期合併應補繳';
                            
                            return `• ${m}:\n` +
                                   `  - 【公積金部分】預付 ¥2,000 (已付款) | 實際應攤 ¥${commonCost.toFixed(1)} | 結算：${commonRefund >= 0 ? '應退' : '應補'} ¥${Math.abs(commonRefund).toFixed(1)}\n` +
                                   `  - 【零用金部分】已交預收 ¥${pocketInShare.toFixed(1)} | 實際分攤 ¥${pocketOutShare.toFixed(1)} | 結算：${pocketRefund >= 0 ? '應退' : '應補'} ¥${Math.abs(pocketRefund).toFixed(1)}\n` +
                                   `  - 【本期合併多退少補】：${totalStatusLabel} ¥${Math.abs(totalRefund).toFixed(1)} (折合約 NT$${Math.round(Math.abs(totalRefund) * 4.15).toLocaleString()})`;
                          }).join('\n\n');

                          const expenseItemLines = sortedExpenses
                            .filter(e => e.category === 'accommodation' || e.category === 'transportation')
                            .map((e, idx) => {
                              const qtyPart = e.quantity ? ` [${e.quantity}${e.category === 'accommodation' ? '間' : '套'}]` : ' [1件]';
                              const descPart = e.description ? ` (${e.description})` : '';
                              return `${idx + 1}. [${e.date}] ${e.title}${qtyPart}: ¥${e.amount.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} (NT$${Math.round(e.amount * 4.15).toLocaleString()})${descPart}`;
                            })
                            .join('\n');

                          const pocketItemLines = sortedExpenses
                            .filter(e => e.category === 'pocket_money_in' || e.category === 'pocket_money_out')
                            .map((e, idx) => {
                              const typePart = e.category === 'pocket_money_in' ? '【預收】' : '【支出】';
                              const descPart = e.description ? ` (${e.description})` : '';
                              return `${idx + 1}. [${e.date}] ${typePart}${e.title}: ¥${e.amount.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} (NT$${Math.round(e.amount * 4.15).toLocaleString()})${descPart}`;
                            })
                            .join('\n');

                          const invoiceText = `【江南華東五日遊】8人請款與分帳結算單 (公積/零用獨立結算)\n` +
                            `結算時間: 2026年6月28日\n` +
                            `約定匯率: 1 RMB = 4.15 TWD\n\n` +
                            `【一、大宗代收代付項目清單】\n` +
                            `${expenseItemLines}\n` +
                            `大宗總支出: ¥${grandTotal.toFixed(2)} 人民幣 (約合 NT$${Math.round(grandTotal * 4.15).toLocaleString()})\n\n` +
                            `【二、隨手零用金明細清單】\n` +
                            `${pocketItemLines}\n` +
                            `零用金總預收: ¥${pocketIn.toFixed(2)} | 零用金總支出: ¥${pocketOut.toFixed(2)} | 零用金結餘剩餘: ¥${pocketBalance.toFixed(2)}\n\n` +
                            `【三、每人已付與最終合併結算明細 (已付公積 ¥2,000，已預收零用金隨各成員明細)】\n` +
                            `${memberLines}`.trim();
                          navigator.clipboard.writeText(invoiceText);
                          alert('請款結算文字已成功複製到剪貼簿，可直接粘貼至 WhatsApp / LINE / 微信等社交軟體或 Excel！');
                        }}
                        className="bg-white text-primary px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 hover:bg-white/90 active:scale-95 transition-all shadow-sm"
                      >
                        <Download size={14} />
                        複製到剪貼簿
                      </button>
                    </div>
                  </div>

                  {/* Printable A4 Container */}
                  <div className="bg-white border border-slate-200 shadow-lg rounded-3xl p-6 md:p-10 space-y-8 font-sans text-slate-800 printable-section">
                    
                    {/* Invoice Letterhead */}
                    <div className="border-b-2 border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <span className="text-xs font-black tracking-widest text-[#0077b6] uppercase block mb-1">江南華東五日行結算</span>
                        <h3 className="text-2xl font-black tracking-tight text-slate-900">費用結算與應退款明細表</h3>
                        <p className="text-xs font-bold text-slate-400 mt-0.5">列印尺寸：A4 / PDF 標準請款單格式</p>
                      </div>
                      <div className="text-left md:text-right text-xs space-y-1 font-bold text-slate-500">
                        <div><span className="text-slate-400">約定匯率：</span>1 RMB = 4.15 台幣</div>
                        <div><span className="text-slate-400">已收大宗：</span>公積金 ¥2,000 / 人 (預付已完成)</div>
                        <div><span className="text-slate-400">已收零用：</span>隨手零用金 ¥{(pocketIn / initialMembers.length).toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} / 人 (預收已完成)</div>
                        <div><span className="text-slate-400">結算日期：</span>2026年6月28日</div>
                      </div>
                    </div>

                    {/* Table 1: Expenses */}
                    <div className="space-y-3">
                      <div className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-l-4 border-slate-900 pl-2">
                        <span>一、大宗代收代付項目明細</span>
                      </div>
                      <div className="overflow-x-auto font-bold">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-300 text-[10px] text-slate-400 font-extrabold text-left">
                              <th className="py-2.5">日期</th>
                              <th className="py-2.5">項目與品項名稱</th>
                              <th className="py-2.5 text-right">數量/房數</th>
                              <th className="py-2.5 text-right font-black">金額 (RMB)</th>
                              <th className="py-2.5 text-right font-black">折合台幣 (TWD)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {sortExpensesByDate(expenses.filter(e => e.category === 'accommodation' || e.category === 'transportation')).map((exp) => (
                              <tr key={exp.id}>
                                <td className="py-3 font-semibold text-slate-400">{exp.date}</td>
                                <td className="py-3 text-left">
                                  <div className="font-extrabold text-slate-800">{exp.title}</div>
                                  <div className="text-[10px] text-slate-400 font-bold">{exp.description}</div>
                                </td>
                                <td className="py-3 text-right font-bold text-slate-500">{exp.quantity ? `${exp.quantity} ${exp.category === 'accommodation' ? '間' : '套'}` : '1 件'}</td>
                                <td className="py-3 text-right font-black text-slate-800">¥{exp.amount.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</td>
                                <td className="py-3 text-right font-black text-[#005d90]">NT${Math.round(exp.amount * 4.15).toLocaleString()}</td>
                              </tr>
                            ))}
                            <tr className="border-t-2 border-slate-900 bg-slate-50/50">
                              <td colSpan={3} className="py-3.5 font-black text-slate-800 text-sm">付款大計合計 (Grand Total)</td>
                              <td className="py-3.5 text-right font-black text-primary text-sm">¥{grandTotal.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</td>
                              <td className="py-3.5 text-right font-black text-[#005d90] text-sm">NT${Math.round(grandTotal * 4.15).toLocaleString()}</td>
                            </tr>
                            <tr className="bg-primary/5 text-xs">
                              <td colSpan={3} className="py-3 font-black text-primary">八人均攤應付額 (Per Person Avg)</td>
                              <td className="py-3 text-right font-black text-primary">¥{(grandTotal / initialMembers.length).toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</td>
                              <td className="py-3 text-right font-black text-[#005d90]">NT${Math.round((grandTotal / initialMembers.length) * 4.15).toLocaleString()}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Table 1B: Pocket Money details */}
                    <div className="space-y-3">
                      <div className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-l-4 border-slate-900 pl-2">
                        <span>二、隨手零用金項目明細 (預收與支出)</span>
                      </div>
                      <div className="overflow-x-auto font-bold">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-slate-300 text-[10px] text-slate-400 font-extrabold text-left">
                              <th className="py-2.5">日期</th>
                              <th className="py-2.5">項目名稱</th>
                              <th className="py-2.5">收支類型</th>
                              <th className="py-2.5 text-right font-black">金額 (RMB)</th>
                              <th className="py-2.5 text-right font-black">折合台幣 (TWD)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {sortExpensesByDate(expenses.filter(e => e.category === 'pocket_money_in' || e.category === 'pocket_money_out')).map((exp) => (
                              <tr key={exp.id} className={exp.category === 'pocket_money_in' ? 'bg-emerald-500/5' : ''}>
                                <td className="py-2.5 font-semibold text-slate-400">{exp.date}</td>
                                <td className="py-2.5 text-left">
                                  <div className="font-extrabold text-slate-800">{exp.title}</div>
                                  <div className="text-[10px] text-slate-400 font-bold">{exp.description}</div>
                                </td>
                                <td className="py-2.5 text-left">
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${exp.category === 'pocket_money_in' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                    {exp.category === 'pocket_money_in' ? '收入(預收)' : '支出(實支)'}
                                  </span>
                                </td>
                                <td className="py-2.5 text-right font-black text-slate-800">¥{exp.amount.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</td>
                                <td className="py-2.5 text-right font-black text-[#005d90]">NT${Math.round(exp.amount * 4.15).toLocaleString()}</td>
                              </tr>
                            ))}
                            <tr className="border-t-2 border-slate-900 bg-slate-50/50">
                              <td colSpan={3} className="py-2.5 font-black text-slate-800 text-xs">零用金總預收 (Total In)</td>
                              <td className="py-2.5 text-right font-black text-emerald-700 text-xs">¥{pocketIn.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</td>
                              <td className="py-2.5 text-right font-black text-[#005d90] text-xs">NT${Math.round(pocketIn * 4.15).toLocaleString()}</td>
                            </tr>
                            <tr className="bg-slate-50/50">
                              <td colSpan={3} className="py-2.5 font-black text-slate-800 text-xs">零用金總支出 (Total Out)</td>
                              <td className="py-2.5 text-right font-black text-amber-700 text-xs">¥{pocketOut.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</td>
                              <td className="py-2.5 text-right font-black text-[#005d90] text-xs">NT${Math.round(pocketOut * 4.15).toLocaleString()}</td>
                            </tr>
                            <tr className="bg-primary/5 text-xs">
                              <td colSpan={3} className="py-2.5 font-black text-primary">零用金結餘剩餘 (Balance)</td>
                              <td className="py-2.5 text-right font-black text-primary">¥{pocketBalance.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</td>
                              <td className="py-2.5 text-right font-black text-[#005d90]">NT${Math.round(pocketBalance * 4.15).toLocaleString()}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Table 2: Room Allocations */}
                    <div className="space-y-3">
                      <div className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-l-4 border-slate-900 pl-2">
                        <span>三、登記入住與房間分配一覽表 (誰住哪一間)</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="font-black text-[#005d90] mb-2 border-b pb-1">Day 1：06/25 烏鎮通安客棧</div>
                          <ul className="space-y-1 text-slate-600 font-bold">
                            <li className="flex justify-between"><span>• 房 1 (枕水大床)</span> <span className="text-slate-800">強哥 & 京慧 (¥876.50)</span></li>
                            <li className="flex justify-between"><span>• 房 2 (精品雙床)</span> <span className="text-slate-800">泰哥 & 俊賢 (¥876.50)</span></li>
                            <li className="flex justify-between"><span>• 房 3 (精品雙床)</span> <span className="text-slate-800">小雯 & 蘋果 (¥876.50)</span></li>
                            <li className="flex justify-between"><span>• 房 4 (精品雙床)</span> <span className="text-slate-800">小花 & 阿英 (¥876.50)</span></li>
                          </ul>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="font-black text-[#005d90] mb-2 border-b pb-1">Day 2：06/26 南潯求恕里 (花間堂)</div>
                          <ul className="space-y-1 text-slate-600 font-bold">
                            <li className="flex justify-between"><span>• 房 1 (藏·玉霄大床)</span> <span className="text-slate-800">強哥 & 京慧 (¥657.46)</span></li>
                            <li className="flex justify-between"><span>• 房 2 (藏·玉霄大床)</span> <span className="text-slate-800">俊賢 & 小雯 (¥657.46)</span></li>
                            <li className="flex justify-between"><span>• 房 3 (藏·映桃家庭房)</span> <span className="text-slate-800">小花 & 蘋果 (¥858.32)</span></li>
                            <li className="flex justify-between"><span>• 房 4 (藏·倚雲大床)</span> <span className="text-slate-800">泰哥 & 阿英 (¥773.62)</span></li>
                          </ul>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="font-black text-[#005d90] mb-2 border-b pb-1">Day 3：06/27 杭州慶春路城際</div>
                          <ul className="space-y-1 text-slate-600 font-bold">
                            <li className="flex justify-between"><span>• 房 1 (商務雙床)</span> <span className="text-slate-800">泰哥 & 俊賢 (¥358.64)</span></li>
                            <li className="flex justify-between"><span>• 房 2 (商務雙床)</span> <span className="text-slate-800">小雯 & 蘋果 (¥358.64)</span></li>
                            <li className="flex justify-between"><span>• 房 3 (商務雙床)</span> <span className="text-slate-800">小花 & 阿英 (¥358.64)</span></li>
                            <li className="flex justify-between"><span>• 房 4 (商務雙床)</span> <span className="text-slate-800">強哥 & 京慧 (¥358.64)</span></li>
                          </ul>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="font-black text-[#005d90] mb-2 border-b pb-1">Day 4：06/28 桔子水晶外灘豫園</div>
                          <ul className="space-y-1 text-slate-600 font-bold">
                            <li className="flex justify-between"><span>• 房 1 (水晶大床)</span> <span className="text-slate-800">強哥 & 京慧 (¥601.12)</span></li>
                            <li className="flex justify-between"><span>• 房 2 (高級雙床)</span> <span className="text-slate-800">小花 & 蘋果 (¥640.72)</span></li>
                            <li className="flex justify-between"><span>• 房 3 (水晶大床)</span> <span className="text-slate-800">泰哥 & 阿英 (¥601.12)</span></li>
                            <li className="flex justify-between"><span>• 房 4 (水晶大床)</span> <span className="text-slate-800">小雯 & 俊賢 (¥601.12)</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Table 4: Settlement Splits */}
                    <div className="space-y-3">
                      <div className="text-sm font-black text-slate-900 flex items-center gap-1.5 border-l-4 border-slate-900 pl-2">
                        <span>四、全團8位成員應攤/分款結算狀態一覽表 (公積與零用獨立計算)</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px] border-collapse font-extrabold text-right border border-slate-200">
                          <thead>
                            {/* Main headers */}
                            <tr className="bg-slate-100 text-[10px] text-slate-700 font-black border-b border-slate-300">
                              <th className="py-2 px-2 text-left border-r border-slate-200" rowSpan={2}>成員</th>
                              <th className="py-1 px-2 text-center border-r border-slate-200 bg-[#005d90]/5 text-[#005d90]" colSpan={3}>【公積金部分】(住宿與主要大宗交通)</th>
                              <th className="py-1 px-2 text-center border-r border-slate-200 bg-emerald-800/5 text-emerald-800" colSpan={3}>【隨手零用金部分】(小筆零散消費)</th>
                              <th className="py-1 px-2 text-center text-slate-800 bg-slate-100" rowSpan={2}>本期合併<br/>總收退 (台幣)</th>
                            </tr>
                            {/* Sub headers */}
                            <tr className="bg-slate-50 text-[9px] text-slate-400 font-extrabold border-b border-slate-300">
                              <th className="py-1.5 text-right px-1.5 bg-[#005d90]/5">每人已交</th>
                              <th className="py-1.5 text-right px-1.5 bg-[#005d90]/5">實際應攤</th>
                              <th className="py-1.5 text-right px-1.5 border-r border-slate-200 bg-[#005d90]/10 text-[#005d90]">應退/補</th>
                              
                              <th className="py-1.5 text-right px-1.5 bg-emerald-800/5 text-emerald-800">每人已付</th>
                              <th className="py-1.5 text-right px-1.5 bg-emerald-800/5 text-emerald-800">實際應攤</th>
                              <th className="py-1.5 text-right px-1.5 border-r border-slate-200 bg-emerald-800/10 text-emerald-800">應退/補</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {initialMembers.map((m, i) => {
                              const accomShare = getMemberAccommodationShare(m);
                              const transShare = expenses.filter(e => e.category === 'transportation').reduce((sum, item) => sum + ((item.splitMembers || initialMembers).includes(m) ? item.amount / (item.splitMembers?.length || initialMembers.length) : 0), 0);
                              const pocketOutShare = expenses.filter(e => e.category === 'pocket_money_out').reduce((sum, item) => sum + ((item.splitMembers || initialMembers).includes(m) ? item.amount / (item.splitMembers?.length || initialMembers.length) : 0), 0);
                              const pocketInShare = expenses.filter(e => e.category === 'pocket_money_in').reduce((sum, item) => sum + ((item.splitMembers || initialMembers).includes(m) ? item.amount / (item.splitMembers?.length || initialMembers.length) : 0), 0);
                              
                              const commonCost = accomShare + transShare;
                              const commonRefund = 2000 - commonCost;

                              const pocketRefund = pocketInShare - pocketOutShare;

                              // Settle 2000 prepaid and deduct actual pocket money cost:
                              const totalRefund = commonRefund + pocketRefund;
                              const totalRefundTwd = Math.round(totalRefund * 4.15);

                              return (
                                <tr key={i} className="hover:bg-slate-50/40 text-slate-700">
                                  {/* 名單 */}
                                  <td className="py-2.5 px-2 font-black text-slate-800 text-left border-r border-slate-200">{m}</td>
                                  
                                  {/* 公積金 */}
                                  <td className="py-2.5 px-1.5 text-slate-400 font-bold bg-[#005d90]/5">¥2,000.0</td>
                                  <td className="py-2.5 px-1.5 text-slate-800 font-bold bg-[#005d90]/5">¥{commonCost.toFixed(1)}</td>
                                  <td className={`py-2.5 px-1.5 font-black border-r border-slate-200 ${commonRefund >= 0 ? 'text-emerald-700 bg-emerald-500/5' : 'text-amber-700 bg-amber-500/5'}`}>
                                    {commonRefund >= 0 ? `退 ¥${commonRefund.toFixed(1)}` : `補 ¥${Math.abs(commonRefund).toFixed(1)}`}
                                  </td>
                                  
                                  {/* 零用金 */}
                                  <td className="py-2.5 px-1.5 text-slate-400 font-bold bg-emerald-500/5">¥{pocketInShare.toFixed(1)}</td>
                                  <td className="py-2.5 px-1.5 text-slate-800 font-bold bg-emerald-800/5">¥{pocketOutShare.toFixed(1)}</td>
                                  <td className={`py-2.5 px-1.5 font-black border-r border-slate-200 ${pocketRefund >= 0 ? 'text-emerald-700 bg-emerald-500/5' : 'text-amber-700 bg-amber-500/5'}`}>
                                    {pocketRefund >= 0 ? `退 ¥${pocketRefund.toFixed(1)}` : `補 ¥${Math.abs(pocketRefund).toFixed(1)}`}
                                  </td>

                                  {/* 明細合併 */}
                                  <td className={`py-2.5 px-2 font-black text-center ${totalRefund >= 0 ? 'text-[#005d90] bg-[#005d90]/5' : 'text-amber-800 bg-amber-500/10'}`}>
                                    {totalRefund >= 0 ? `應退 ¥${totalRefund.toFixed(1)}` : `應補 ¥${Math.abs(totalRefund).toFixed(1)}`}
                                    <div className="text-[9px] font-bold text-slate-400 mt-0.5">
                                      (NT$${Math.abs(totalRefundTwd).toLocaleString()})
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Sign-off footer */}
                    <div className="border-t border-dashed border-slate-300 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] text-slate-400 font-bold gap-4">
                      <div>
                        備註：本經費表已由記帳系統嚴格覆核。各項住宿及包車金額皆依最終預訂實付單據入帳。<br />
                        多退額度將於下船退房後，自公積金錢夾餘額直接結清轉發各人，如有出入請洽團長。
                      </div>
                      <div className="text-right">
                        <div>核准人 / 簽章：__________________</div>
                        <div className="mt-1 text-slate-300 font-mono">SYSTEM GENERATED DOC • SECURED</div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Global Bottom Nav for Budget Page */}
            <div className="fixed bottom-6 left-6 right-6 z-[80]">
              <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white flex justify-around items-center h-16">
                {[
                  { label: '首頁', icon: Home, active: false, onClick: onClose },
                  { label: '明細', icon: CreditCard, active: tab === 'total', onClick: () => setTab('total') },
                  { label: '零用金', icon: Wallet, active: tab === 'pocket', onClick: () => setTab('pocket') },
                  { label: '分攤', icon: Users, active: tab === 'individual', onClick: () => setTab('individual') },
                  { label: '請款單', icon: Printer, active: tab === 'print', onClick: () => setTab('print') },
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={item.onClick}
                    className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-2xl transition-all ${item.active ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-on-surface-variant/40'}`}
                  >
                    <item.icon size={18} />
                    <span className="text-[9px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Edit Portal Modal Overlay */}
            <AnimatePresence>
              {isEditing && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
                >
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
                    >
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-2">編輯項目</h3>
                    
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 pb-32">
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-2 block tracking-widest">日期</label>
                            <input 
                              type="text" 
                              placeholder="MM/DD"
                              className="w-full bg-surface-container rounded-2xl px-5 py-4 font-bold border-2 border-transparent focus:border-primary/20 transition-all outline-none"
                              value={editForm.date || ''} 
                              onChange={e => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-2 block tracking-widest">項目類型</label>
                            <div className="w-full bg-surface-container rounded-2xl px-5 py-4 font-bold text-primary/60 text-sm">
                              {editForm.category === 'accommodation' ? '住宿' : 
                               editForm.category === 'transportation' ? '交通' : 
                               editForm.category === 'pocket_money_in' ? '收入' : '支出'}
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-2 block tracking-widest">項目名稱</label>
                          <input 
                            type="text" 
                            className="w-full bg-surface-container rounded-2xl px-5 py-4 font-bold border-2 border-transparent focus:border-primary/20 transition-all outline-none"
                            value={editForm.title || ''} 
                            onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-2 block tracking-widest">單價 (¥)</label>
                            <input 
                              type="number" 
                              step="0.1"
                              inputMode="decimal"
                              className="w-full bg-surface-container rounded-2xl px-5 py-4 font-bold border-2 border-transparent focus:border-primary/20 transition-all outline-none text-lg"
                              value={editForm.unitPrice === 0 ? '' : editForm.unitPrice ?? ''} 
                              placeholder="0"
                              onChange={e => {
                                const val = e.target.value;
                                const up = val === '' ? 0 : parseFloat(parseFloat(val).toFixed(1)) || 0;
                                setEditForm(prev => {
                                  const newQty = prev.quantity ?? 1;
                                  return { 
                                    ...prev, 
                                    unitPrice: up, 
                                    amount: parseFloat((up * newQty).toFixed(1))
                                  };
                                });
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-2 block tracking-widest">數量</label>
                            <input 
                              type="number" 
                              inputMode="numeric"
                              className="w-full bg-surface-container rounded-2xl px-5 py-4 font-bold border-2 border-transparent focus:border-primary/20 transition-all outline-none text-lg"
                              value={editForm.quantity === 0 ? '' : editForm.quantity ?? ''} 
                              placeholder="1"
                              onChange={e => {
                                const val = e.target.value;
                                const q = val === '' ? 0 : parseInt(val) || 0;
                                setEditForm(prev => {
                                  const newUp = prev.unitPrice ?? 0;
                                  return { 
                                    ...prev, 
                                    quantity: q, 
                                    amount: parseFloat((newUp * q).toFixed(1))
                                  };
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-2 block tracking-widest">總金額 (¥)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            inputMode="decimal"
                            className="w-full bg-surface-container rounded-2xl px-5 py-4 font-black border-2 border-transparent focus:border-primary/20 transition-all outline-none text-2xl text-primary"
                            value={editForm.amount === 0 ? '' : editForm.amount ?? ''} 
                            placeholder="0"
                            onChange={e => {
                              const val = e.target.value;
                              const amt = val === '' ? 0 : parseFloat(parseFloat(val).toFixed(1)) || 0;
                              setEditForm(prev => ({ ...prev, amount: amt }));
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-3 block tracking-widest">分擔人員 ({editForm.splitMembers?.length ?? initialMembers.length}人)</label>
                          <div className="grid grid-cols-4 gap-2">
                            {initialMembers.map(m => {
                              const isIncluded = (editForm.splitMembers ?? initialMembers).includes(m);
                              return (
                                <button
                                  key={m}
                                  onClick={() => {
                                    setEditForm(prev => {
                                      const current = prev.splitMembers ?? [...initialMembers];
                                      const next = current.includes(m) ? current.filter(x => x !== m) : [...current, m];
                                      return { ...prev, splitMembers: next };
                                    });
                                  }}
                                  className={`py-3 rounded-xl text-xs font-bold transition-all border-2 ${isIncluded ? 'bg-primary text-white border-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant/40 border-transparent'}`}
                                >
                                  {m}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-on-surface-variant uppercase mb-2 block tracking-widest">備註</label>
                          <textarea 
                            className="w-full bg-surface-container rounded-2xl px-5 py-4 font-medium border-2 border-transparent focus:border-primary/20 transition-all outline-none h-24 text-sm"
                            value={editForm.description || ''} 
                            placeholder="點擊輸入備註..."
                            onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Fixed Bottom Action Bar */}
                    <div className="p-6 bg-white border-t border-outline-variant/10 flex flex-col gap-3">
                      <div className="flex gap-3">
                        <button onClick={handleCancel} className="flex-1 py-4 bg-surface-container text-on-surface-variant rounded-2xl font-bold active:scale-95 transition-all text-sm uppercase tracking-widest">取消</button>
                        <button onClick={handleSave} className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all text-sm uppercase tracking-widest">儲存並更新</button>
                      </div>
                      <button 
                        onClick={() => {
                          handleDelete(isEditing!);
                          setIsEditing(null);
                        }} 
                        className="w-full py-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-2xl font-bold active:scale-95 transition-all text-xs flex items-center justify-center gap-1.5 uppercase tracking-wider"
                      >
                        <Trash2 size={13} />
                        刪除此項目
                      </button>
                      <button 
                        onClick={onClose}
                        className="w-full py-3 flex items-center justify-center gap-2 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em] hover:text-primary transition-colors"
                      >
                        <Home size={12} />
                        返回首頁
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SummaryCard({ grandTotal, accom, trans, remainingCommonFund }: any) {
  return (
    <div className="bg-primary/5 rounded-[32px] p-6 border border-primary/10 space-y-5">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white"><CreditCard size={20} /></div>
          <div>
            <span className="text-primary font-bold block">目前交通 & 住宿總額</span>
            <span className="text-[10px] text-on-surface-variant/60 font-bold block">公共預算支出扣除項目</span>
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-primary">¥{grandTotal.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5">
          <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/60 mb-1 uppercase tracking-wider"><Hotel size={14} className="text-[#005d90]" /> 住宿總額</div>
          <span className="text-lg font-black text-slate-800">¥{accom.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5">
          <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/60 mb-1 uppercase tracking-wider"><Car size={14} className="text-[#005d90]" /> 交通總額</div>
          <span className="text-lg font-black text-slate-800">¥{trans.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</span>
        </div>
      </div>

      {/* Public Fund breakdown details */}
      <div className="bg-white p-4 rounded-2xl border border-primary/10 space-y-2.5 shadow-sm">
        <div className="text-xs font-black text-primary border-b pb-1.5 border-primary/5 flex justify-between">
          <span>公積金明細 (2,000 / 人)</span>
          <span>8 人共 ¥16,000.0</span>
        </div>
        <div className="flex justify-between items-center text-xs font-bold text-slate-500">
          <span>預交總公積金</span>
          <span>¥16,000.0</span>
        </div>
        <div className="flex justify-between items-center text-xs font-bold text-slate-500">
          <span>已支付 (住宿 + 交通)</span>
          <span className="text-red-500">- ¥{grandTotal.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</span>
        </div>
        <div className="h-px bg-slate-100 my-1" />
        <div className="flex justify-between items-center text-sm font-black text-[#00677d]">
          <span>公積金剩餘</span>
          <span>¥{remainingCommonFund.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</span>
        </div>
      </div>
    </div>
  );
}

function ExpenseSection({ title, icon, items, color, onEdit, onDelete, onAdd, isPocket }: any) {
  const colorClass = color === 'primary' ? 'bg-primary' : color === 'secondary' ? 'bg-secondary' : color === 'green' ? 'bg-green-600' : 'bg-error';
  const textClass = color === 'primary' ? 'text-primary' : color === 'secondary' ? 'text-secondary' : color === 'green' ? 'text-green-600' : 'text-error';

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-lg font-extrabold flex items-center gap-2">
          <div className={`${colorClass} w-8 h-8 rounded-lg flex items-center justify-center text-white`}>{icon}</div>
          {title}
        </h3>
        <button onClick={onAdd} className={`w-8 h-8 rounded-full ${colorClass}/10 ${textClass} flex items-center justify-center active:scale-95 transition-all`}>
          <Plus size={20} />
        </button>
      </div>
      <div className="space-y-3">
        {sortExpensesByDate(items).map((exp: any) => (
          <div 
            key={exp.id} 
            onClick={() => onEdit(exp.id)}
            className="bg-white p-4 rounded-[24px] border border-outline-variant/10 shadow-sm group hover:border-[#00677d]/30 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-black ${textClass} bg-[#00677d]/5 p-1 rounded px-2`}>{exp.date}</span>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => onEdit(exp.id)} className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-full text-slate-500 hover:text-primary transition-all flex items-center justify-center scale-95 hover:scale-105" title="編輯"><Edit2 size={13} /></button>
                <button onClick={() => onDelete(exp.id)} className="p-2 bg-red-50 hover:bg-red-100 border border-red-100 rounded-full text-red-500 transition-all flex items-center justify-center scale-95 hover:scale-105" title="刪除"><Trash2 size={13} /></button>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex-1">
                <h4 className="font-bold text-on-surface text-lg leading-tight">{exp.title}</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                  {exp.unitPrice !== undefined && exp.quantity !== undefined && (
                    <span className="text-[10px] font-bold text-[#00677d] bg-[#00677d]/5 px-1.5 py-0.5 rounded">
                      ¥{exp.unitPrice.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})} × {exp.quantity}
                    </span>
                  )}
                  <p className="text-xs text-on-surface-variant line-clamp-1 italic">{exp.description || '無備註'}</p>
                </div>
              </div>
              <div className="text-right ml-4">
                <span className="text-2xl font-black tabular-nums tracking-tighter">¥{exp.amount.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1})}</span>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="py-12 bg-surface-container/30 rounded-[24px] border-2 border-dashed border-outline-variant/10 flex flex-col items-center justify-center text-on-surface-variant/40">
            <ReceiptText size={32} className="mb-2 opacity-20" />
            <p className="text-sm font-bold">尚無項目</p>
          </div>
        )}
      </div>
    </section>
  );
}
