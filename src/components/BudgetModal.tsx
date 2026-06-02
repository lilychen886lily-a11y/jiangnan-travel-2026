import { motion, AnimatePresence } from 'motion/react';
import { X, Users, CreditCard, Hotel, Car, ReceiptText, Plus, Trash2, Edit2, Wallet, ArrowUpRight, ArrowDownLeft, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ExpenseItem {
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

const initialMembers = ['小花', '蘋果', '強哥', '京慧', '阿英', '泰哥', '俊賢', '小雯'];

const initialExpenses: ExpenseItem[] = [
  { id: '1', category: 'accommodation', title: '烏鎮通安客棧 & 昭明書舍', date: '06/25', amount: 3506, unitPrice: 877, quantity: 4, description: '4間房 (含西柵門票+雙人正餐)', splitMembers: initialMembers },
  { id: '2', category: 'accommodation', title: '南潯花間堂·求恕里', date: '06/26', amount: 2901, unitPrice: 725, quantity: 4, description: '藏·倚云/玉霄房型共4間 (含早餐)', splitMembers: initialMembers },
  { id: '3', category: 'accommodation', title: '城際杭州西湖慶春路酒店', date: '06/27', amount: 1435, unitPrice: 359, quantity: 4, description: '高級雙床房 4間', splitMembers: initialMembers },
  { id: '4', category: 'accommodation', title: '桔子水晶上海外灘豫園酒店', date: '06/28', amount: 2404, unitPrice: 601, quantity: 4, description: '大床房 4間', splitMembers: initialMembers },
  { id: '5', category: 'transportation', title: '機場 -> 烏鎮 包車', date: '06/25', amount: 800, unitPrice: 800, quantity: 1, description: '8人座商務包車', splitMembers: initialMembers },
  { id: '6', category: 'transportation', title: '烏鎮 -> 南潯 交通', date: '06/26', amount: 400, unitPrice: 400, quantity: 1, description: '包車/接駁', splitMembers: initialMembers },
  { id: '7', category: 'transportation', title: '南潯 -> 杭州 包車', date: '06/27', amount: 600, unitPrice: 600, quantity: 1, description: '包車前往杭州飯店', splitMembers: initialMembers },
  { id: '8', category: 'transportation', title: '杭州 -> 上海 高鐵商務艙', date: '06/28', amount: 2400, unitPrice: 300, quantity: 8, description: '高鐵商務艙預估 ¥300/人', splitMembers: initialMembers },
];

export default function BudgetModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<'total' | 'individual' | 'pocket'>('total');
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ExpenseItem>>({});

  // Local storage persistence
  useEffect(() => {
    const saved = localStorage.getItem('trip_expenses');
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('trip_expenses', JSON.stringify(expenses));
  }, [expenses]);

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

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalAccommodation = expenses.filter(e => e.category === 'accommodation').reduce((sum, item) => sum + item.amount, 0);
  const totalTransportation = expenses.filter(e => e.category === 'transportation').reduce((sum, item) => sum + item.amount, 0);
  const grandTotal = totalAccommodation + totalTransportation;
  
  // Pocket Money Calcs
  const pocketIn = expenses.filter(e => e.category === 'pocket_money_in').reduce((sum, item) => sum + item.amount, 0);
  const pocketOut = expenses.filter(e => e.category === 'pocket_money_out').reduce((sum, item) => sum + item.amount, 0);
  const pocketBalance = pocketIn - pocketOut;

  // Individual Calc (Dynamic based on splitMembers)
  const memberTotals: { [name: string]: number } = {};
  initialMembers.forEach(m => memberTotals[m] = 0);

  expenses.forEach(exp => {
    if (exp.category === 'accommodation' || exp.category === 'transportation' || exp.category === 'pocket_money_out') {
      const share = exp.amount / (exp.splitMembers?.length || initialMembers.length);
      exp.splitMembers?.forEach(m => {
        if (memberTotals[m] !== undefined) memberTotals[m] += share;
      });
    } else if (exp.category === 'pocket_money_in') {
      // Income reduces what they owe? Or just tracked?
      // Usually pocket money in is "collected", so we subtract if it's like a credit
      const credit = exp.amount / (exp.splitMembers?.length || initialMembers.length);
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
                { id: 'individual', label: '人均分攤', icon: Users }
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
                  <SummaryCard grandTotal={grandTotal} accom={totalAccommodation} trans={totalTransportation} />
                  
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
                    <div className="text-4xl font-black text-primary text-center">¥{pocketBalance.toLocaleString()}</div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-[10px] font-bold text-green-600 mb-1">總收入</div>
                        <div className="font-bold text-green-700">¥{pocketIn.toLocaleString()}</div>
                      </div>
                      <div className="text-center border-l">
                        <div className="text-[10px] font-bold text-error mb-1">總支出</div>
                        <div className="font-bold text-error">¥{pocketOut.toLocaleString()}</div>
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
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="text-primary" size={20} />
                      <span className="font-bold text-primary">每人均分明細</span>
                    </div>
                    <div className="space-y-4">
                      {initialMembers.map((m, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-black/5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">{m.charAt(0)}</div>
                            <span className="font-bold text-lg">{m}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-black text-primary">¥{Math.round(memberTotals[m]).toLocaleString()}</div>
                            <div className="text-[10px] text-on-surface-variant/60 font-bold italic">個人分擔額</div>
                          </div>
                        </div>
                      ))}
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
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={item.onClick}
                    className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-all ${item.active ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-on-surface-variant/40'}`}
                  >
                    <item.icon size={20} />
                    <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
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
                      <h3 className="text-2xl font-bold text-primary flex items-center gap-2">編輯項目</h3>
                      
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
                              inputMode="numeric"
                              className="w-full bg-surface-container rounded-2xl px-5 py-4 font-bold border-2 border-transparent focus:border-primary/20 transition-all outline-none text-lg"
                              value={editForm.unitPrice === 0 ? '' : editForm.unitPrice ?? ''} 
                              placeholder="0"
                              onChange={e => {
                                const val = e.target.value;
                                const up = val === '' ? 0 : Math.round(parseFloat(val) || 0);
                                setEditForm(prev => {
                                  const newQty = prev.quantity ?? 1;
                                  return { 
                                    ...prev, 
                                    unitPrice: up, 
                                    amount: up * newQty 
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
                                    amount: newUp * q 
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
                            inputMode="numeric"
                            className="w-full bg-surface-container rounded-2xl px-5 py-4 font-black border-2 border-transparent focus:border-primary/20 transition-all outline-none text-2xl text-primary"
                            value={editForm.amount === 0 ? '' : editForm.amount ?? ''} 
                            placeholder="0"
                            onChange={e => {
                              const val = e.target.value;
                              const amt = val === '' ? 0 : Math.round(parseFloat(val) || 0);
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
                        <button onClick={() => setIsEditing(null)} className="flex-1 py-4 bg-surface-container text-on-surface-variant rounded-2xl font-bold active:scale-95 transition-all text-sm uppercase tracking-widest">取消</button>
                        <button onClick={handleSave} className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all text-sm uppercase tracking-widest">儲存並更新</button>
                      </div>
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

function SummaryCard({ grandTotal, accom, trans }: any) {
  return (
    <div className="bg-primary/5 rounded-[32px] p-6 border border-primary/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white"><CreditCard size={20} /></div>
        <span className="text-primary font-bold">目前總金額預估</span>
      </div>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-black text-primary">¥{Math.round(grandTotal).toLocaleString()}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5">
          <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/60 mb-1 uppercase tracking-wider"><Hotel size={10} /> 住宿總額</div>
          <span className="text-xl font-bold">¥{accom.toLocaleString()}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5">
          <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/60 mb-1 uppercase tracking-wider"><Car size={10} /> 交通總額</div>
          <span className="text-xl font-bold">¥{trans.toLocaleString()}</span>
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
        {items.map((exp: any) => (
          <div key={exp.id} className="bg-white p-4 rounded-[24px] border border-outline-variant/10 shadow-sm group hover:border-primary/20 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-black ${textClass} bg-surface p-1 rounded px-2`}>{exp.date}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEdit(exp.id)} className="p-2 bg-surface rounded-full text-on-surface-variant hover:text-primary"><Edit2 size={14} /></button>
                <button onClick={() => onDelete(exp.id)} className="p-2 bg-surface rounded-full text-error hover:bg-error/10"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex-1">
                <h4 className="font-bold text-on-surface text-lg leading-tight">{exp.title}</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                  {exp.unitPrice !== undefined && exp.quantity !== undefined && (
                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded">
                      ¥{exp.unitPrice} × {exp.quantity}
                    </span>
                  )}
                  <p className="text-xs text-on-surface-variant line-clamp-1 italic">{exp.description || '無備註'}</p>
                </div>
              </div>
              <div className="text-right ml-4">
                <span className="text-2xl font-black tabular-nums tracking-tighter">¥{exp.amount.toLocaleString()}</span>
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
