import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-brand-black/5 last:border-0">
      <button
        onClick={() => onToggle(id)}
        className="w-full py-6 flex justify-between items-center text-left group transition-all"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        <span className={`text-sm uppercase tracking-widest font-bold transition-colors ${isOpen ? 'text-brand-gold' : 'text-brand-black hover:text-brand-gold'}`}>
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className={`shrink-0 ml-4 ${isOpen ? 'text-brand-gold' : 'text-brand-black/30'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-content-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-sm font-light text-brand-black/60 leading-relaxed max-w-2xl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionProps {
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="w-full">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          onToggle={toggle}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
