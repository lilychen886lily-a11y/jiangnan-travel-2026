import { Sun, PiggyBank } from 'lucide-react';
import { motion } from 'motion/react';

interface SummaryCardsProps {
  remainingCommonFund: number;
}

export default function SummaryCards({ remainingCommonFund }: SummaryCardsProps) {
  const cards = [
    {
      label: '今日天氣',
      value: '28°C',
      sub: '江南 晴朗',
      icon: Sun,
      color: 'text-secondary',
      fill: true
    },
    {
      label: '公積金剩餘',
      value: `¥${Math.round(remainingCommonFund).toLocaleString()}`,
      sub: '人民幣 (CNY)',
      icon: PiggyBank,
      color: 'text-secondary',
      link: '#'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-surface-container-lowest p-5 rounded-2xl flex flex-col justify-between border border-outline-variant/10 shadow-sm"
        >
          {card.link ? (
            <a href={card.link} target="_blank" rel="noopener noreferrer" className="h-full flex flex-col justify-between">
              <CardContent card={card} />
            </a>
          ) : (
            <div className="h-full flex flex-col justify-between">
              <CardContent card={card} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function CardContent({ card }: { card: any }) {
  const Icon = card.icon;
  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <span className="text-on-surface-variant font-semibold text-xs uppercase tracking-wider">{card.label}</span>
        <Icon className={`${card.color} ${card.fill ? 'fill-current' : ''}`} size={20} />
      </div>
      <div>
        <div className="text-3xl font-bold text-on-surface">{card.value}</div>
        <div className="text-[10px] text-on-surface-variant font-medium">{card.sub}</div>
      </div>
    </>
  );
}
