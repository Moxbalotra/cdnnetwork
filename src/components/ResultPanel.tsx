import React from 'react';
import { Trophy, Radio, CheckCircle, BarChart2 } from 'lucide-react';

export const ResultPanel: React.FC = () => {
  return (
    <section className="space-y-4 sm:space-y-5 animate-fadeIn">
      {/* Bento Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-[11px] font-bold tracking-wider uppercase border border-purple-500/20">
              मतगणना एवं नतीजे
            </span>
            <span className="text-xs text-[var(--soft-text)] font-medium">वार्ड 1 से 55</span>
          </div>
          <h2 className="font-rajdhani font-bold text-2xl sm:text-3xl text-[var(--page-text)]">चुनाव परिणाम 2026</h2>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 sm:gap-5">
        {/* Main Bento Card */}
        <div className="col-span-12 lg:col-span-8 bento-card p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 shadow-sm">
              <Trophy size={28} />
            </div>
            <div className="px-3 py-1 bg-[var(--page-bg)] border border-[var(--card-border)] text-[var(--soft-text)] rounded-full text-xs font-bold uppercase tracking-wider w-fit mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span>लाइव टेलीकास्ट मतदान के बाद</span>
            </div>
            <h3 className="font-rajdhani font-bold text-3xl sm:text-4xl text-[var(--page-text)] mb-3 leading-tight">
              चुनाव परिणाम — Coming Soon
            </h3>
            <p className="text-sm sm:text-base text-[var(--soft-text)] max-w-xl leading-relaxed">
              मतदान एवं मतगणना दिवस पर सभी 55 वार्डों के राउंडवार रुझान, प्राप्त मत और विजेता प्रत्याशियों के परिणाम तुरंत यहाँ लाइव प्रकाशित किए जाएंगे।
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--card-border)] flex items-center gap-4 text-xs sm:text-sm text-[var(--soft-text)]">
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-purple-500" />
              <span>फास्ट लाइव अपडेट्स</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-500" />
              <span>प्रमाणित वार्डवार आंकड़े</span>
            </div>
          </div>
        </div>

        {/* Side Bento Card */}
        <div className="col-span-12 lg:col-span-4 bento-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-text)]">
              कवरेज विवरण
            </span>
            <h4 className="font-rajdhani font-bold text-xl text-[var(--page-text)] mt-1 mb-4">
              रिजल्ट डैशबोर्ड विशेषताएं
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[var(--soft-text)]">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">✓</span>
                <span>वार्डवार विजेता एवं उपविजेता मत अंतर</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">✓</span>
                <span>मतदान प्रतिशत व कुल पड़े वैध मत</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">✓</span>
                <span>पार्टी वार सीट टैली एवं बहुमत स्थिति</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--card-border)]">
            <div className="text-[11px] text-[var(--muted-text)] flex items-center gap-1.5">
              <BarChart2 size={14} className="text-purple-500" />
              <span>रियल-टाइम वार्डवार रुझान व आंकड़े</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
