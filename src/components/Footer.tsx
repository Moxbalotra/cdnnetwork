import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface FooterProps {
  lastUpdated: string;
}

export const Footer: React.FC<FooterProps> = ({ lastUpdated }) => {
  return (
    <footer className="mt-16 border-t border-[var(--line)] pt-10 pb-8 transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-6">
        {/* Bento Disclaimer & About Box */}
        <div className="bento-card p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-[var(--page-bg)] border border-[var(--card-border)] flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
              🏛️
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-rajdhani font-bold text-xl sm:text-2xl text-[var(--page-text)]">
                  नगर निकाय चुनाव 2026 — वार्ड सूचना पोर्टल
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-500/10 text-[var(--soft-text)]">
                  नागरिक सेवा
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--soft-text)] max-w-4xl">
                हमने नगर निकाय चुनाव से जुड़ी महत्वपूर्ण जानकारी आमजन तक आसानी से पहुंचाने के उद्देश्य से यह डिजिटल पोर्टल बनाया है।
                यहाँ नागरिक अपने वार्ड की मतदाता सूची (PDF), वार्ड मैप, उम्मीदवारों एवं चुनाव परिणाम से संबंधित जानकारी प्राप्त कर सकते हैं।
              </p>
            </div>
          </div>

          {/* Disclaimer Pill Card */}
          <div className="p-4 rounded-2xl bg-[var(--page-bg)] border border-[var(--card-border)] text-xs leading-relaxed text-[var(--soft-text)] space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--page-text)] font-semibold">
              <ShieldAlert size={14} className="text-[var(--saffron)]" />
              <span>अस्वीकरण (Disclaimer)</span>
            </div>
            <p>
              इस पोर्टल पर साझा की गई जानकारी सार्वजनिक रूप से उपलब्ध स्रोतों से संकलित की गई है।
              उपलब्ध जानकारी में त्रुटि, अपूर्णता अथवा पुराना डेटा हो सकता है। कृपया किसी भी महत्वपूर्ण
              निर्णय के लिए संबंधित आधिकारिक स्रोत से जानकारी की पुष्टि अवश्य करें।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[var(--soft-text)] pt-2 border-t border-[var(--card-border)]">
            <p>
              संचालित: <b className="text-[var(--page-text)] font-semibold">बालोतरा न्यूज़</b> · निर्मित एवं विकसित:{' '}
              <b className="text-[var(--page-text)] font-semibold">Morihix Private Limited</b>
            </p>
            <div className="flex items-center gap-2 font-mono-code text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                Last Updated: <b className="text-[var(--page-text)]">{lastUpdated}</b>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-wrap gap-4 justify-between items-center text-xs text-[var(--muted-text)] px-1">
          <span>© 2026 Nagar Parishad Election Portal</span>
          <span>Powered by Morihix · Balotra News</span>
        </div>
      </div>
    </footer>
  );
};
