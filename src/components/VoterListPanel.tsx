import React, { useState } from 'react';
import { PortalConfig } from '../types';
import { ExternalLink, Search, FileText } from 'lucide-react';

interface VoterListPanelProps {
  config: PortalConfig;
  selectedWard: number;
  onSelectWard: (ward: number) => void;
}

export const VoterListPanel: React.FC<VoterListPanelProps> = ({
  config,
  selectedWard,
  onSelectWard,
}) => {
  const [jumpInput, setJumpInput] = useState('');

  const handleJump = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = parseInt(jumpInput, 10);
    if (val >= 1 && val <= config.wardCount) {
      onSelectWard(val);
      setJumpInput('');
    }
  };

  const currentPdf = config.wardPDFs[selectedWard] || '';

  return (
    <section className="space-y-4 sm:space-y-5 animate-fadeIn">
      {/* Bento Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[11px] font-bold tracking-wider uppercase border border-emerald-500/20">
              मतदाता सूची 2026
            </span>
            <span className="text-xs text-[var(--soft-text)] font-medium">वार्ड 1 से 55</span>
          </div>
          <h2 className="font-rajdhani font-bold text-2xl sm:text-3xl text-[var(--page-text)]">वार्ड वोटर लिस्ट</h2>
        </div>
        <div className="text-xs text-[var(--soft-text)]">
          चुना गया वार्ड: <span className="font-mono-code font-bold text-[var(--page-text)] text-sm">#{selectedWard}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
        {/* Ward Selector Bento Column (Span 4) */}
        <div className="md:col-span-4 bento-card p-5 sm:p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-rajdhani font-bold text-lg text-[var(--page-text)]">वार्ड चुनें</h3>
            <span className="text-xs font-mono-code px-2 py-0.5 rounded-md bg-[var(--page-bg)] border border-[var(--card-border)] text-[var(--soft-text)]">
              1 - {config.wardCount}
            </span>
          </div>

          {/* Quick jump */}
          <form onSubmit={handleJump} className="flex gap-2 mb-4">
            <input
              type="number"
              min={1}
              max={config.wardCount}
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              placeholder="वार्ड नं. (1-55)"
              className="w-full bg-[var(--page-bg)] text-[var(--page-text)] border border-[var(--card-border)] px-3.5 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[var(--saffron)] transition-colors"
            />
            <button
              type="submit"
              className="bg-[var(--page-text)] text-[var(--page-bg)] hover:opacity-90 font-bold px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Search size={13} />
              जाएं
            </button>
          </form>

          {/* 55 Ward Chips Grid */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 max-h-[380px] overflow-y-auto pr-1">
            {Array.from({ length: config.wardCount }, (_, i) => i + 1).map((wardNum) => {
              const hasPdf = Boolean(config.wardPDFs[wardNum]);
              const isSelected = selectedWard === wardNum;

              return (
                <button
                  key={wardNum}
                  onClick={() => onSelectWard(wardNum)}
                  className={`ward-chip ${hasPdf ? 'has-pdf' : ''} ${isSelected ? 'selected' : ''}`}
                  title={`वार्ड ${wardNum}${hasPdf ? ' (वोटर लिस्ट उपलब्ध)' : ''}`}
                >
                  {wardNum}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--card-border)] text-xs text-[var(--soft-text)] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm"></span>
            <span>हरे बिंदु: वोटर लिस्ट PDF उपलब्ध</span>
          </div>
        </div>

        {/* Voter Card / PDF Viewer Bento Column (Span 8) */}
        <div className="md:col-span-8 bento-card p-6 sm:p-8 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          <div>
            {/* Top Row in Bento Card */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 bg-[var(--page-bg)] border border-[var(--card-border)] rounded-md font-mono-code font-bold text-xs text-[var(--saffron)]">
                    WARD ID: #{String(selectedWard).padStart(2, '0')}
                  </span>
                  {currentPdf && (
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md font-medium text-xs">
                      PDF सक्रिय
                    </span>
                  )}
                </div>
                <h3 className="font-rajdhani font-bold text-2xl sm:text-3xl text-[var(--page-text)]">
                  वार्ड {selectedWard} — आधिकारिक मतदाता सूची
                </h3>
              </div>

              {/* Minimal Seal Indicator */}
              <div className="w-12 h-12 rounded-2xl bg-[var(--page-bg)] border border-[var(--card-border)] flex flex-col items-center justify-center font-mono-code font-bold text-xs shadow-sm flex-shrink-0">
                <span className="text-[9px] text-[var(--muted-text)]">WARD</span>
                <span className="text-sm text-[var(--page-text)]">{selectedWard}</span>
              </div>
            </div>

            {currentPdf ? (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[var(--page-bg)] rounded-2xl border border-[var(--card-border)]">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--page-text)] font-medium truncate max-w-full">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <FileText size={16} />
                    </div>
                    <span className="truncate">आधिकारिक मतदाता सूची (वार्ड {selectedWard})</span>
                  </div>
                  <a
                    href={currentPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[var(--page-text)] text-[var(--page-bg)] hover:opacity-90 text-xs font-bold px-3.5 py-2 rounded-full transition-all shadow-sm ml-auto"
                  >
                    <span>नए टैब में खोलें</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[var(--card-border)] bg-zinc-950/20">
                  <iframe
                    className="w-full h-[540px] sm:h-[620px] border-0 block"
                    src={`${currentPdf}#toolbar=0&navpanes=0&scrollbar=1`}
                    title={`वार्ड ${selectedWard} वोटर लिस्ट PDF`}
                  />
                </div>
              </div>
            ) : (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-[var(--page-bg)] border border-[var(--card-border)] mx-auto flex items-center justify-center text-zinc-400 shadow-sm">
                  <FileText size={32} />
                </div>
                <p className="text-base font-medium text-[var(--page-text)]">
                  वार्ड {selectedWard} की वोटर लिस्ट PDF अभी नहीं जोड़ी गई है।
                </p>
                <p className="text-xs text-[var(--soft-text)] max-w-md mx-auto leading-relaxed">
                  शीघ्र ही निर्वाचन विभाग द्वारा उपलब्ध कराने पर इसे यहाँ अपलोड कर दिया जाएगा। आप ऊपर दिए गए "एडिट करें" बटन से भी लिंक जोड़ सकते हैं।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
