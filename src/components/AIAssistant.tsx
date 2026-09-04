import React, { useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  X, 
  Send, 
  MessageCircle, 
  Sparkles, 
  ChevronRight,
  User,
  PhoneCall
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { COMPANY_INFO } from '../data/mockData';

interface AIAssistantProps {
  language: Language;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const t = translations[language];
  const isArabic = language === 'ar';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: t.aiGreeting,
      timestamp: 'Just now',
    }
  ]);

  const quickQuestions = [
    { q: t.aiQuickQ1, key: 'van-sales' },
    { q: t.aiQuickQ2, key: 'alsi-price' },
    { q: t.aiQuickQ3, key: 'delivery' },
    { q: t.aiQuickQ4, key: 'benefitpay' },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Simulate intelligent FMCG assistant response
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('van') || lower.includes('فان') || lower.includes('بقالة') || lower.includes('store') || lower.includes('cold store')) {
        reply = isArabic
          ? 'أسطول الفان سيلز لشركة داس البحرين يزور بقالات ومتاجر البحرين يومياً لتزويدهم بمشروبات الساي كولا وكود ريد بكميات مرنة وفواتير إلكترونية فورية وستاندات عرض مجانية. يمكنك التواصل مع المبيعات المركزية على 38269395 لتسجيل بقالتك في خط السير اليومي!'
          : 'Our Van Sales fleet services Bahrain cold stores daily with flexible small-batch quantities, on-the-spot electronic billing, and complimentary display racks. Contact our Central Sales team at +973 3826 9395 to add your store to tomorrow’s route!';
      } else if (lower.includes('alsi') || lower.includes('الساي') || lower.includes('سعر') || lower.includes('price') || lower.includes('كرتون') || lower.includes('carton')) {
        reply = isArabic
          ? 'سعر حبة الساي كولا 250 مل هو 0.200 د.ب، وسعر الكرتون الكامل (24 حبة) هو 4.200 د.ب. نوفر خصومات إضافية لطلبات الجملة عند طلب 10 كراتين فأكثر!'
          : 'A single 250ml can of Alsi Cola is 0.200 BHD, and a 24-can wholesale carton is 4.200 BHD. We offer tiered bulk discounts starting from 10 cartons!';
      } else if (lower.includes('توصيل') || lower.includes('delivery') || lower.includes('مناطق') || lower.includes('areas') || lower.includes('riffa') || lower.includes('hidd')) {
        reply = isArabic
          ? 'نعم، نوفر التوصيل لجميع مناطق مملكة البحرين (المنامة، المحرق، الحد، الرفاع، الشمالية والجنوبية). التوصيل مجاني تماماً للطلبات التي تزيد عن 7.000 د.ب!'
          : 'Yes! We deliver island-wide across Bahrain (Capital, Muharraq, Hidd, Riffa, Northern & Southern governorates). Delivery is completely FREE on orders above 7.000 BHD!';
      } else if (lower.includes('بنفت') || lower.includes('benefit') || lower.includes('pay') || lower.includes('دفع') || lower.includes('card')) {
        reply = isArabic
          ? 'نعم بالتأكيد! نقبل الدفع المباشر عبر تطبيق بنفت بي (BenefitPay QR)، والدفع بالبطاقة البنكية، والدفع نقداً عند استلام الطلب.'
          : 'Absolutely! We accept BenefitPay (QR transfer on delivery or online), Debit/Credit cards, and Cash on Delivery (COD).';
      } else {
        reply = isArabic
          ? 'شكراً لتواصلك مع دار البابا سلام. يمكنك أيضاً التحدث مباشرة مع موظف المبيعات عبر الواتساب على الرقم 32163438 أو 38269395 للإجابة الفورية!'
          : 'Thank you for your message! For personalized orders or wholesale quotes, you can also connect directly with our human sales desk on WhatsApp (+973 3216 3438 / +973 3826 9395).';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: reply,
          timestamp: 'Just now',
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-40 safe-bottom">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2.5 bg-leaf-600 hover:bg-leaf-500 text-white font-bold px-4 py-3 rounded-full shadow-lg shadow-leaf-600/30 hover:scale-105 transition-all group"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-leaf-400 rounded-full animate-ping" />
            </span>
          </div>
          <span className="text-xs font-bold hidden sm:inline">
            {isArabic ? 'مساعد داس الذكي' : 'DAS AI Assistant'}
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 h-[500px] max-h-[85vh] bg-white dark:bg-das-900 border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp transition-colors duration-300">
          
          {/* Chat Header */}
          <div className="p-4 bg-leaf-700 dark:bg-gradient-to-r dark:from-leaf-950 dark:via-das-900 dark:to-das-950 border-b border-leaf-800 dark:border-white/10 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-leaf-600 text-white flex items-center justify-center font-bold shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{t.aiAssistantTitle}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf-300 animate-pulse" />
                </h4>
                <span className="text-[10px] text-leaf-100 dark:text-leaf-300 font-medium block">
                  {t.aiAssistantOnline}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-leaf-100 hover:text-white dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-leaf-500/15 text-leaf-700 dark:text-leaf-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-leaf-600 text-white font-medium rounded-tr-none shadow-sm'
                      : 'bg-slate-100 dark:bg-das-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick Prompts Chips */}
            <div className="pt-2">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1.5 uppercase font-bold tracking-wider">
                {isArabic ? 'استفسارات شائعة:' : 'Quick Questions:'}
              </span>
              <div className="flex flex-col gap-1.5">
                {quickQuestions.map((qq) => (
                  <button
                    key={qq.key}
                    onClick={() => handleSendMessage(qq.q)}
                    className="text-left rtl:text-right p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-das-850 dark:hover:bg-das-800 text-[11px] text-slate-700 dark:text-slate-300 hover:text-leaf-700 dark:hover:text-leaf-300 border border-slate-200 dark:border-white/5 hover:border-leaf-500/30 transition-all flex items-center justify-between"
                  >
                    <span>{qq.q}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Human Escalation Link */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-das-850/80 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
            <a
              href={`https://wa.me/${COMPANY_INFO.primaryWhatsApp}?text=Hello%20DAS%20Bahrain,%20I%20need%20human%20assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-leaf-700 dark:text-leaf-400 hover:text-leaf-800 dark:hover:text-leaf-300 font-bold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.chatDirectWhatsApp}</span>
            </a>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-das-900 border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder={t.aiInputPlaceholder}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-100 dark:bg-das-800 border border-slate-200 dark:border-white/15 focus:border-leaf-500 focus:ring-1 focus:ring-leaf-500 rounded-xl py-2 px-3 text-xs text-slate-900 dark:text-white focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-leaf-600 hover:bg-leaf-500 disabled:opacity-40 text-white transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
