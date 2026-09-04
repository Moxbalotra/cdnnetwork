import { useState, useEffect } from 'react';
import { TabType, ThemeMode, PortalConfig } from './types';
import { INITIAL_CONFIG } from './data/config';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardPanel } from './components/DashboardPanel';
import { WardMapPanel } from './components/WardMapPanel';
import { VoterListPanel } from './components/VoterListPanel';
import { CandidatePanel } from './components/CandidatePanel';
import { ResultPanel } from './components/ResultPanel';
import { Footer } from './components/Footer';
import { EditSectionModal } from './components/EditSectionModal';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('portalTheme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedWard, setSelectedWard] = useState<number>(1);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const [config, setConfig] = useState<PortalConfig>(() => {
    const saved = localStorage.getItem('portalConfig');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CONFIG;
      }
    }
    return INITIAL_CONFIG;
  });

  // Apply theme to body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('portalTheme', theme);
  }, [theme]);

  // Content protection handlers as specified in user's original HTML
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        e.preventDefault();
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key ? e.key.toLowerCase() : '';
      // Disable Ctrl/Cmd + S, P, U
      if ((e.ctrlKey || e.metaKey) && ['s', 'p', 'u'].includes(k)) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSaveConfig = (updated: PortalConfig) => {
    setConfig(updated);
    localStorage.setItem('portalConfig', JSON.stringify(updated));
  };

  const handleResetConfig = () => {
    setConfig(INITIAL_CONFIG);
    localStorage.removeItem('portalConfig');
    setIsEditorOpen(false);
  };

  const handleGoToWardVoterList = (wardNumber: number) => {
    setSelectedWard(wardNumber);
    setActiveTab('voterlist');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--saffron)] selection:text-[#101B33]">
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />

      <main className="flex-grow px-4 sm:px-8 py-6 sm:py-8 max-w-[1280px] w-full mx-auto">
        {activeTab === 'dashboard' && (
          <DashboardPanel config={config} onNavigateToTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'wardmap' && (
          <WardMapPanel config={config} onGoToWardVoterList={handleGoToWardVoterList} />
        )}

        {activeTab === 'voterlist' && (
          <VoterListPanel
            config={config}
            selectedWard={selectedWard}
            onSelectWard={setSelectedWard}
          />
        )}

        {activeTab === 'candidate' && (
          <CandidatePanel
            selectedWard={selectedWard}
            onSelectWard={setSelectedWard}
            onNavigateToVoterList={handleGoToWardVoterList}
          />
        )}

        {activeTab === 'result' && <ResultPanel />}
      </main>

      <Footer lastUpdated={config.lastUpdated} />

      <EditSectionModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetConfig={handleResetConfig}
      />
    </div>
  );
}
