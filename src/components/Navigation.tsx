import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'dashboard', label: 'डैशबोर्ड' },
    { id: 'wardmap', label: 'वार्ड मैप' },
    { id: 'voterlist', label: 'वार्ड वोटर लिस्ट' },
    { id: 'candidate', label: 'उम्मीदवार' },
    { id: 'result', label: 'चुनाव परिणाम' },
  ];

  return (
    <nav className="sticky top-[58px] sm:top-[65px] z-40 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--line)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-2.5 flex gap-2 overflow-x-auto no-scrollbar items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`tab-btn whitespace-nowrap ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
