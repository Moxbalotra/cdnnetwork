import React from 'react';
import { PortalConfig } from '../types';
import { ArrowRight, MapPin, FileText, Users, Trophy } from 'lucide-react';

interface DashboardPanelProps {
  config: PortalConfig;
  onNavigateToTab: (tab: 'wardmap' | 'voterlist' | 'candidate' | 'result') => void;
}

export const DashboardPanel: React.FC<DashboardPanelProps> = ({ config, onNavigateToTab }) => {
  const uploadedPdfsCount = Object.values(config.wardPDFs).filter(Boolean).length;

  return (
    <section className="space-y-4 sm:space-y-5 animate-fadeIn">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[var(--soft-text)]">डैशबोर्ड</span>
          <span className="text-xs text-[var(--muted-text)]">•</span>
          <span className="text-xs text-[var(--soft-text)]">नगर निकाय चुनाव 2026</span>
        </div>
        <div className="text-xs font-mono-code text-[var(--soft-text)] bg-[var(--card-bg)] px-3 py-1 rounded-full border border-[var(--card-border)] shadow-sm">
          अंतिम अपडेट: {config.lastUpdated}
        </div>
      </div>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-4 sm:gap-5">
        {/* Bento Hero Card (Span 8 on desktop) */}
        <div className="col-span-12 lg:col-span-8 bento-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="px-3 py-1 bg-[var(--saffron)]/10 text-[var(--saffron-deep)] dark:text-[var(--saffron)] rounded-full text-[11px] font-bold tracking-wider uppercase border border-[var(--saffron)]/20">
              आधिकारिक वार्ड पोर्टल 2026
            </div>
            <div className="text-xs font-medium text-[var(--soft-text)]">
              वार्ड 1 से 55
            </div>
          </div>

          <div className="my-2">
            <h2 className="font-rajdhani text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-3">
              नगर निकाय चुनाव<br />
              <span className="text-[var(--soft-text)] font-semibold">वार्ड सूचना एवं मतदाता केंद्र</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--soft-text)] max-w-xl leading-relaxed">
              बालोतरा नगर परिषद के सभी 55 वार्डों का आधिकारिक डिजिटल नक्शा, जीपीएस पिन और अद्यतन मतदाता सूची (PDF) एक ही स्थान पर।
            </p>
          </div>

          {/* Banner Embed inside Bento Hero */}
          {config.dashboardBanner && (
            <div className="my-4 rounded-2xl overflow-hidden border border-[var(--card-border)] max-h-48 sm:max-h-56 bg-zinc-950/20 shadow-inner">
              <img
                src={config.dashboardBanner}
                alt="नगर परिषद चुनाव 2026 बैनर"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Hero Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToTab('wardmap')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--page-text)] text-[var(--page-bg)] font-bold text-xs sm:text-sm hover:opacity-90 transition-all shadow-sm"
            >
              <span>वार्ड मैप खोलें</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onNavigateToTab('voterlist')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--saffron)] font-medium text-xs sm:text-sm text-[var(--page-text)] transition-all"
            >
              <span>वोटर लिस्ट देखें</span>
            </button>
          </div>
        </div>

        {/* Bento Contrast Dark Card (Span 4 on desktop) */}
        <div className="col-span-12 lg:col-span-4 rounded-[1.75rem] bg-zinc-950 text-white p-6 sm:p-8 flex flex-col justify-between border border-zinc-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">
            <span>डिजिटल सेवा</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>

          <div className="space-y-3 my-auto py-2">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl shadow-sm">
              📍
            </div>
            <h3 className="font-rajdhani text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              55 वार्ड GPS मैपिंग
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Google My Maps एवं ओपनस्ट्रीट आधारित इंटरएक्टिव मैप पर अपने वार्ड की सीमा और मतदान केंद्र की स्थिति देखें।
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-800/80">
            <button
              onClick={() => onNavigateToTab('wardmap')}
              className="w-full py-3 px-4 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-white text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
            >
              <span>नक्शा देखें</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Bento Metric Card 1 (Span 4) */}
        <div
          onClick={() => onNavigateToTab('voterlist')}
          className="col-span-6 sm:col-span-4 bento-card p-6 flex flex-col items-center justify-center text-center cursor-pointer group"
        >
          <div className="font-mono-code text-3xl sm:text-4xl font-bold text-[var(--page-text)] group-hover:scale-105 transition-transform">
            {config.wardCount}
          </div>
          <div className="text-[10px] sm:text-xs font-bold text-[var(--soft-text)] uppercase tracking-wider mt-1.5">
            कुल वार्ड (1-55)
          </div>
        </div>

        {/* Bento Metric Card 2 (Span 4) */}
        <div
          onClick={() => onNavigateToTab('voterlist')}
          className="col-span-6 sm:col-span-4 bento-card p-6 flex flex-col items-center justify-center text-center cursor-pointer group"
        >
          <div className="font-mono-code text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
            {uploadedPdfsCount}
          </div>
          <div className="text-[10px] sm:text-xs font-bold text-[var(--soft-text)] uppercase tracking-wider mt-1.5">
            वोटर लिस्ट अपलोड
          </div>
        </div>

        {/* Bento Metric Card 3 (Span 4) */}
        <div className="col-span-12 sm:col-span-4 bento-card p-6 flex flex-col items-center justify-center text-center">
          <div className="font-mono-code text-3xl sm:text-4xl font-bold text-[var(--saffron)]">
            5
          </div>
          <div className="text-[10px] sm:text-xs font-bold text-[var(--soft-text)] uppercase tracking-wider mt-1.5">
            सक्रिय पोर्टल सेक्शंस
          </div>
        </div>

        {/* 4 Bento Quick-Access Cells */}
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Bento Cell 1: Ward Map */}
          <div
            onClick={() => onNavigateToTab('wardmap')}
            className="bento-card p-6 flex flex-col justify-between group cursor-pointer hover:border-[var(--saffron)]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[var(--saffron)]/10 text-[var(--saffron-deep)] dark:text-[var(--saffron)] flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <span className="text-[10px] font-bold text-[var(--muted-text)] uppercase tracking-wider">
                GIS MAP
              </span>
            </div>
            <div>
              <h3 className="font-rajdhani font-bold text-lg text-[var(--page-text)] group-hover:text-[var(--saffron)] transition-colors">
                वार्ड मैप
              </h3>
              <p className="text-xs text-[var(--soft-text)] mt-1 line-clamp-2">
                55 वार्डों का इंटरएक्टिव नक्शा व लोकेशन
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-semibold text-[var(--page-text)]">
              <span>मैप खोलें</span>
              <div className="w-7 h-7 rounded-full border border-[var(--card-border)] flex items-center justify-center group-hover:bg-[var(--saffron)] group-hover:text-black group-hover:border-[var(--saffron)] transition-all">
                <ArrowRight size={12} />
              </div>
            </div>
          </div>

          {/* Bento Cell 2: Voter List */}
          <div
            onClick={() => onNavigateToTab('voterlist')}
            className="bento-card p-6 flex flex-col justify-between group cursor-pointer hover:border-[var(--leaf)]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <FileText size={20} />
              </div>
              <span className="text-[10px] font-bold text-[var(--muted-text)] uppercase tracking-wider">
                PDF LIST
              </span>
            </div>
            <div>
              <h3 className="font-rajdhani font-bold text-lg text-[var(--page-text)] group-hover:text-emerald-500 transition-colors">
                वार्ड वोटर लिस्ट
              </h3>
              <p className="text-xs text-[var(--soft-text)] mt-1 line-clamp-2">
                प्रत्येक वार्ड की आधिकारिक PDF मतदाता सूची
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-semibold text-[var(--page-text)]">
              <span>लिस्ट देखें</span>
              <div className="w-7 h-7 rounded-full border border-[var(--card-border)] flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all">
                <ArrowRight size={12} />
              </div>
            </div>
          </div>

          {/* Bento Cell 3: Candidates */}
          <div
            onClick={() => onNavigateToTab('candidate')}
            className="bento-card p-6 flex flex-col justify-between group cursor-pointer hover:border-blue-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Users size={20} />
              </div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                147 प्रत्याशी लाइव
              </span>
            </div>
            <div>
              <h3 className="font-rajdhani font-bold text-lg text-[var(--page-text)] group-hover:text-blue-500 transition-colors">
                उम्मीदवार सूची
              </h3>
              <p className="text-xs text-[var(--soft-text)] mt-1 line-clamp-2">
                सभी 55 वार्डों के फॉर्म-4 प्रत्याशियों की अधिकृत सूची
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-semibold text-[var(--page-text)]">
              <span>प्रत्याशी देखें</span>
              <div className="w-7 h-7 rounded-full border border-[var(--card-border)] flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all">
                <ArrowRight size={12} />
              </div>
            </div>
          </div>

          {/* Bento Cell 4: Results */}
          <div
            onClick={() => onNavigateToTab('result')}
            className="bento-card p-6 flex flex-col justify-between group cursor-pointer hover:border-purple-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Trophy size={20} />
              </div>
              <span className="text-[10px] font-bold text-[var(--muted-text)] uppercase tracking-wider">
                RESULTS
              </span>
            </div>
            <div>
              <h3 className="font-rajdhani font-bold text-lg text-[var(--page-text)] group-hover:text-purple-500 transition-colors">
                चुनाव परिणाम
              </h3>
              <p className="text-xs text-[var(--soft-text)] mt-1 line-clamp-2">
                घोषित होते ही वार्डवार लाइव चुनावी नतीजे
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-semibold text-[var(--page-text)]">
              <span>नतीजे देखें</span>
              <div className="w-7 h-7 rounded-full border border-[var(--card-border)] flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-500 transition-all">
                <ArrowRight size={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
