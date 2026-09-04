import React, { useState } from 'react';
import { PortalConfig } from '../types';
import { X, Save, RotateCcw } from 'lucide-react';

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortalConfig;
  onSaveConfig: (updated: PortalConfig) => void;
  onResetConfig: () => void;
}

export const EditSectionModal: React.FC<EditSectionModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetConfig,
}) => {
  const [banner, setBanner] = useState(config.dashboardBanner);
  const [lastUpdated, setLastUpdated] = useState(config.lastUpdated);
  const [selectedWardForPdf, setSelectedWardForPdf] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(config.wardPDFs[1] || '');

  if (!isOpen) return null;

  const handleWardChange = (wardNum: number) => {
    setSelectedWardForPdf(wardNum);
    setPdfUrl(config.wardPDFs[wardNum] || '');
  };

  const handleSave = () => {
    const updatedPdfs = { ...config.wardPDFs };
    if (pdfUrl.trim()) {
      updatedPdfs[selectedWardForPdf] = pdfUrl.trim();
    } else {
      delete updatedPdfs[selectedWardForPdf];
    }

    onSaveConfig({
      ...config,
      dashboardBanner: banner.trim(),
      lastUpdated: lastUpdated.trim(),
      wardPDFs: updatedPdfs,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bento-card bg-[var(--card-bg)] text-[var(--page-text)] border border-[var(--card-border)] rounded-[2rem] w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[var(--card-border)]">
          <div>
            <div className="px-2.5 py-0.5 bg-[var(--saffron)]/10 text-[var(--saffron-deep)] dark:text-[var(--saffron)] rounded-full text-[11px] font-bold tracking-wider uppercase border border-[var(--saffron)]/20 w-fit mb-1">
              सेक्शन संपादक
            </div>
            <h3 className="font-rajdhani font-bold text-2xl text-[var(--page-text)]">
              पोर्टल डेटा एडिटर
            </h3>
            <p className="text-xs text-[var(--soft-text)] mt-0.5">
              यहाँ से आप बैनर लिंक, तारीख या किसी भी वार्ड की PDF लिंक आसानी से अपडेट कर सकते हैं।
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--soft-text)] hover:text-[var(--page-text)] hover:border-zinc-400 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5 text-sm">
          {/* Dashboard Banner */}
          <div className="space-y-2">
            <label className="font-semibold block text-xs uppercase tracking-wider text-[var(--soft-text)]">
              1. डैशबोर्ड बैनर इमेज लिंक (Banner URL)
            </label>
            <input
              type="url"
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
              placeholder="https://... image link"
              className="w-full bg-[var(--page-bg)] text-[var(--page-text)] border border-[var(--card-border)] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[var(--saffron)] transition-colors"
            />
            {banner && (
              <div className="h-24 w-full rounded-xl overflow-hidden border border-[var(--card-border)] mt-2">
                <img src={banner} alt="Banner Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Last Updated */}
          <div className="space-y-2">
            <label className="font-semibold block text-xs uppercase tracking-wider text-[var(--soft-text)]">
              2. अंतिम अपडेट तारीख (Last Updated Text)
            </label>
            <input
              type="text"
              value={lastUpdated}
              onChange={(e) => setLastUpdated(e.target.value)}
              placeholder="उदा. 30/08/2026, 11:56 am"
              className="w-full bg-[var(--page-bg)] text-[var(--page-text)] border border-[var(--card-border)] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[var(--saffron)] transition-colors"
            />
          </div>

          {/* Ward PDF Editor */}
          <div className="space-y-2.5 pt-4 border-t border-[var(--card-border)]">
            <label className="font-semibold block text-xs uppercase tracking-wider text-[var(--soft-text)]">
              3. वार्ड वोटर लिस्ट PDF लिंक (वार्ड 1 से 55)
            </label>
            <div className="flex gap-2.5 items-center">
              <span className="text-xs text-[var(--soft-text)]">वार्ड चुनें:</span>
              <select
                value={selectedWardForPdf}
                onChange={(e) => handleWardChange(Number(e.target.value))}
                className="bg-[var(--page-bg)] text-[var(--page-text)] border border-[var(--card-border)] px-3 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[var(--saffron)]"
              >
                {Array.from({ length: config.wardCount }, (_, i) => i + 1).map((w) => (
                  <option key={w} value={w}>
                    वार्ड नं. {w} {config.wardPDFs[w] ? '✓' : ''}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="url"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              placeholder={`वार्ड ${selectedWardForPdf} की PDF लिंक दर्ज करें`}
              className="w-full bg-[var(--page-bg)] text-[var(--page-text)] border border-[var(--card-border)] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[var(--saffron)] transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-[var(--card-border)] bg-[var(--page-bg)]/50 rounded-b-[2rem]">
          <button
            onClick={onResetConfig}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--saffron)] hover:underline font-medium"
          >
            <RotateCcw size={14} />
            डिफ़ॉल्ट रीसेट
          </button>

          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-xs font-semibold rounded-full border border-[var(--card-border)] hover:border-zinc-400 transition-colors"
            >
              रद्द करें
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-full bg-[var(--page-text)] text-[var(--page-bg)] hover:opacity-90 transition-all shadow-sm"
            >
              <Save size={14} />
              सुरक्षित करें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
