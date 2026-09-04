import React, { useState, useMemo } from 'react';
import { CANDIDATES_DATA } from '../data/candidates';
import { Candidate } from '../types';
import { 
  Users, 
  Search, 
  Filter, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  MapPin,
  Sparkles
} from 'lucide-react';

interface CandidatePanelProps {
  selectedWard?: number;
  onSelectWard?: (ward: number) => void;
  onNavigateToVoterList?: (ward: number) => void;
}

export const CandidatePanel: React.FC<CandidatePanelProps> = ({
  selectedWard: initialSelectedWard,
  onSelectWard,
  onNavigateToVoterList,
}) => {
  // 0 means "All Wards"
  const [activeWard, setActiveWard] = useState<number>(initialSelectedWard || 0);
  const [selectedParty, setSelectedParty] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jumpInput, setJumpInput] = useState<string>('');

  // Handle ward change
  const handleWardChange = (wardNum: number) => {
    setActiveWard(wardNum);
    if (onSelectWard && wardNum > 0) {
      onSelectWard(wardNum);
    }
  };

  // Jump to ward handler
  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput.trim(), 10);
    if (!isNaN(num) && num >= 1 && num <= 55) {
      handleWardChange(num);
      setJumpInput('');
    }
  };

  // Calculate party metrics dynamically
  const metrics = useMemo(() => {
    let bjp = 0;
    let inc = 0;
    let rlp = 0;
    let aap = 0;
    let ind = 0;

    CANDIDATES_DATA.forEach((c) => {
      const p = c.party;
      if (p.includes('BJP')) bjp++;
      if (p.includes('INC')) inc++;
      if (p.includes('RLP')) rlp++;
      if (p.includes('AAP')) aap++;
      if (p.includes('निर्दलीय') || p.includes('Independent')) ind++;
    });

    return {
      total: CANDIDATES_DATA.length,
      bjp,
      inc,
      rlp,
      aap,
      ind,
    };
  }, []);

  // Filter candidates based on ward, party, and search query
  const filteredCandidates = useMemo(() => {
    return CANDIDATES_DATA.filter((candidate) => {
      // Ward filter
      if (activeWard > 0 && candidate.ward !== activeWard) {
        return false;
      }

      // Party filter
      if (selectedParty !== 'ALL') {
        if (selectedParty === 'BJP' && !candidate.party.includes('BJP')) return false;
        if (selectedParty === 'INC' && !candidate.party.includes('INC')) return false;
        if (selectedParty === 'RLP' && !candidate.party.includes('RLP')) return false;
        if (selectedParty === 'AAP' && !candidate.party.includes('AAP')) return false;
        if (selectedParty === 'IND' && !candidate.party.includes('निर्दलीय') && !candidate.party.includes('Independent')) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesName = candidate.name.toLowerCase().includes(query);
        const matchesParty = candidate.party.toLowerCase().includes(query);
        const matchesSr = String(candidate.srNo).includes(query);
        const matchesWard = `वार्ड ${candidate.ward}`.toLowerCase().includes(query) || `ward ${candidate.ward}`.toLowerCase().includes(query) || String(candidate.ward) === query;
        if (!matchesName && !matchesParty && !matchesSr && !matchesWard) {
          return false;
        }
      }

      return true;
    });
  }, [activeWard, selectedParty, searchQuery]);

  // Group filtered candidates by ward for structured display
  const groupedByWard = useMemo(() => {
    const map = new Map<number, Candidate[]>();
    filteredCandidates.forEach((candidate) => {
      const list = map.get(candidate.ward) || [];
      list.push(candidate);
      map.set(candidate.ward, list);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [filteredCandidates]);

  // Count candidates per ward for badge markers
  const candidateCountPerWard = useMemo(() => {
    const counts: Record<number, number> = {};
    for (let i = 1; i <= 55; i++) {
      counts[i] = 0;
    }
    CANDIDATES_DATA.forEach((c) => {
      counts[c.ward] = (counts[c.ward] || 0) + 1;
    });
    return counts;
  }, []);

  // Helper for styling party badges
  const getPartyStyle = (party: string) => {
    if (party.includes('BJP') && !party.includes('निर्दलीय')) {
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/15',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-500/30',
        dot: 'bg-amber-500',
        badge: 'भाजपा (BJP)',
      };
    }
    if (party.includes('INC') && !party.includes('निर्दलीय')) {
      return {
        bg: 'bg-sky-500/10 dark:bg-sky-500/15',
        text: 'text-sky-700 dark:text-sky-300',
        border: 'border-sky-500/30',
        dot: 'bg-sky-500',
        badge: 'कांग्रेस (INC)',
      };
    }
    if (party.includes('RLP')) {
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-500',
        badge: 'रालोपा (RLP)',
      };
    }
    if (party.includes('AAP')) {
      return {
        bg: 'bg-blue-500/10 dark:bg-blue-500/15',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-500/30',
        dot: 'bg-blue-500',
        badge: 'आप (AAP)',
      };
    }
    if (party.includes('निर्दलीय') && party.includes('BJP')) {
      return {
        bg: 'bg-orange-500/10 dark:bg-orange-500/15',
        text: 'text-orange-700 dark:text-orange-300',
        border: 'border-orange-500/30',
        dot: 'bg-orange-500',
        badge: 'निर्दलीय / BJP',
      };
    }
    if (party.includes('निर्दलीय') && party.includes('INC')) {
      return {
        bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
        text: 'text-indigo-700 dark:text-indigo-300',
        border: 'border-indigo-500/30',
        dot: 'bg-indigo-500',
        badge: 'निर्दलीय / INC',
      };
    }
    return {
      bg: 'bg-zinc-500/10 dark:bg-zinc-500/15',
      text: 'text-zinc-700 dark:text-zinc-300',
      border: 'border-zinc-500/30',
      dot: 'bg-zinc-400',
      badge: 'निर्दलीय (Independent)',
    };
  };

  const clearFilters = () => {
    setActiveWard(0);
    setSelectedParty('ALL');
    setSearchQuery('');
  };

  return (
    <section className="space-y-5 animate-fadeIn">
      {/* Top Bento Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-[11px] font-bold tracking-wider uppercase border border-blue-500/20">
              फॉर्म-4 अधिकृत सूची 2026
            </span>
            <span className="text-xs text-[var(--soft-text)] font-medium">नगर परिषद बालोतरा</span>
          </div>
          <h2 className="font-rajdhani font-bold text-2xl sm:text-3xl text-[var(--page-text)]">
            वार्डवार उम्मीदवार सूची
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-code text-[var(--soft-text)] bg-[var(--card-bg)] px-3 py-1 rounded-full border border-[var(--card-border)] shadow-sm">
            कुल प्रत्याशी: {metrics.total}
          </span>
        </div>
      </div>

      {/* Bento Metric Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div 
          onClick={() => { setActiveWard(0); setSelectedParty('ALL'); }}
          className="bento-card p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--saffron)] transition-all group"
        >
          <div className="font-mono-code text-2xl sm:text-3xl font-bold text-[var(--page-text)] group-hover:scale-105 transition-transform">
            {metrics.total}
          </div>
          <div className="text-[10px] font-bold text-[var(--soft-text)] uppercase tracking-wider mt-1">
            कुल प्रत्याशी
          </div>
        </div>

        <div 
          onClick={() => setSelectedParty(selectedParty === 'BJP' ? 'ALL' : 'BJP')}
          className={`bento-card p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${selectedParty === 'BJP' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'hover:border-amber-500'}`}
        >
          <div className="font-mono-code text-2xl sm:text-3xl font-bold text-amber-500 group-hover:scale-105 transition-transform">
            {metrics.bjp}
          </div>
          <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mt-1">
            भाजपा (BJP)
          </div>
        </div>

        <div 
          onClick={() => setSelectedParty(selectedParty === 'INC' ? 'ALL' : 'INC')}
          className={`bento-card p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${selectedParty === 'INC' ? 'border-sky-500 ring-2 ring-sky-500/20' : 'hover:border-sky-500'}`}
        >
          <div className="font-mono-code text-2xl sm:text-3xl font-bold text-sky-500 group-hover:scale-105 transition-transform">
            {metrics.inc}
          </div>
          <div className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mt-1">
            कांग्रेस (INC)
          </div>
        </div>

        <div 
          onClick={() => setSelectedParty(selectedParty === 'RLP' ? 'ALL' : 'RLP')}
          className={`bento-card p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${selectedParty === 'RLP' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'hover:border-emerald-500'}`}
        >
          <div className="font-mono-code text-2xl sm:text-3xl font-bold text-emerald-500 group-hover:scale-105 transition-transform">
            {metrics.rlp}
          </div>
          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mt-1">
            रालोपा (RLP)
          </div>
        </div>

        <div 
          onClick={() => setSelectedParty(selectedParty === 'IND' ? 'ALL' : 'IND')}
          className={`bento-card p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${selectedParty === 'IND' ? 'border-purple-500 ring-2 ring-purple-500/20' : 'hover:border-purple-500'}`}
        >
          <div className="font-mono-code text-2xl sm:text-3xl font-bold text-purple-500 group-hover:scale-105 transition-transform">
            {metrics.ind}
          </div>
          <div className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mt-1">
            निर्दलीय (IND)
          </div>
        </div>

        <div 
          onClick={() => setSelectedParty(selectedParty === 'AAP' ? 'ALL' : 'AAP')}
          className={`bento-card p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${selectedParty === 'AAP' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'hover:border-blue-500'}`}
        >
          <div className="font-mono-code text-2xl sm:text-3xl font-bold text-blue-500 group-hover:scale-105 transition-transform">
            {metrics.aap}
          </div>
          <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mt-1">
            आप (AAP)
          </div>
        </div>
      </div>

      {/* Filter and Search Bento Controller */}
      <div className="bento-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--soft-text)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="उम्मीदवार का नाम, पति/पिता या क्र.सं. खोजें..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[var(--page-bg)] text-[var(--page-text)] border border-[var(--card-border)] text-xs sm:text-sm focus:outline-none focus:border-[var(--saffron)] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--soft-text)] hover:text-[var(--page-text)]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Party Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            <span className="text-xs text-[var(--soft-text)] font-semibold flex items-center gap-1 mr-1 flex-shrink-0">
              <Filter size={13} />
              पार्टी:
            </span>
            {[
              { key: 'ALL', label: 'सभी' },
              { key: 'BJP', label: 'भाजपा' },
              { key: 'INC', label: 'कांग्रेस' },
              { key: 'RLP', label: 'रालोपा' },
              { key: 'IND', label: 'निर्दलीय' },
              { key: 'AAP', label: 'आप' },
            ].map((party) => (
              <button
                key={party.key}
                type="button"
                onClick={() => setSelectedParty(party.key)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedParty === party.key
                    ? 'bg-[var(--page-text)] text-[var(--page-bg)] shadow-sm'
                    : 'bg-[var(--page-bg)] text-[var(--soft-text)] border border-[var(--card-border)] hover:text-[var(--page-text)]'
                }`}
              >
                {party.label}
              </button>
            ))}
          </div>

          {/* Ward Jump Form */}
          <form onSubmit={handleJump} className="flex gap-2 w-full md:w-auto">
            <input
              type="number"
              min={1}
              max={55}
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              placeholder="वार्ड नं. (1-55)"
              className="w-28 bg-[var(--page-bg)] text-[var(--page-text)] border border-[var(--card-border)] px-3 py-1.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[var(--saffron)]"
            />
            <button
              type="submit"
              className="bg-[var(--page-text)] text-[var(--page-bg)] hover:opacity-90 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all shadow-sm whitespace-nowrap"
            >
              जाएं
            </button>
          </form>
        </div>

        {/* 55 Ward Quick Selector Carousel / Grid */}
        <div className="pt-3 border-t border-[var(--card-border)] space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--soft-text)]">
            <span className="font-semibold flex items-center gap-1.5">
              <MapPin size={13} className="text-[var(--saffron)]" />
              वार्ड अनुसार देखें (1 से 55):
            </span>
            <div className="flex items-center gap-2">
              {activeWard > 0 && (
                <button
                  onClick={() => handleWardChange(0)}
                  className="text-xs font-bold text-[var(--saffron)] hover:underline flex items-center gap-1"
                >
                  सभी 55 वार्ड दिखाएं
                </button>
              )}
              <span className="font-mono-code">
                {activeWard === 0 ? 'सभी 55 वार्ड चयनित' : `वार्ड #${activeWard} चयनित`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
            <button
              type="button"
              onClick={() => handleWardChange(0)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 flex-shrink-0 ${
                activeWard === 0
                  ? 'bg-[var(--saffron)] text-[#090A0F] font-bold shadow-sm'
                  : 'bg-[var(--page-bg)] text-[var(--soft-text)] border border-[var(--card-border)] hover:text-[var(--page-text)]'
              }`}
            >
              <span>सभी वार्ड</span>
              <span className="text-[10px] opacity-80">({metrics.total})</span>
            </button>

            {Array.from({ length: 55 }, (_, i) => i + 1).map((wardNum) => {
              const count = candidateCountPerWard[wardNum] || 0;
              const isSelected = activeWard === wardNum;
              return (
                <button
                  key={wardNum}
                  type="button"
                  onClick={() => handleWardChange(wardNum)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 flex-shrink-0 ${
                    isSelected
                      ? 'bg-[var(--saffron)] text-[#090A0F] font-bold shadow-sm ring-2 ring-[var(--saffron)]/30'
                      : 'bg-[var(--page-bg)] text-[var(--page-text)] border border-[var(--card-border)] hover:border-[var(--saffron)]'
                  }`}
                >
                  <span>वार्ड {wardNum}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1 py-0.2 rounded-full font-mono-code ${isSelected ? 'bg-black/20 text-[#090A0F]' : 'bg-[var(--card-border)] text-[var(--soft-text)]'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Summary if any filter applied */}
        {(activeWard > 0 || selectedParty !== 'ALL' || searchQuery.trim()) && (
          <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-xs bg-[var(--page-bg)] p-2.5 rounded-xl border border-[var(--card-border)]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[var(--soft-text)]">सक्रिय फ़िल्टर:</span>
              {activeWard > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-[var(--card-border)] text-[var(--page-text)] font-semibold">
                  वार्ड: {activeWard}
                </span>
              )}
              {selectedParty !== 'ALL' && (
                <span className="px-2 py-0.5 rounded-md bg-[var(--card-border)] text-[var(--page-text)] font-semibold">
                  पार्टी: {selectedParty}
                </span>
              )}
              {searchQuery.trim() && (
                <span className="px-2 py-0.5 rounded-md bg-[var(--card-border)] text-[var(--page-text)] font-semibold">
                  खोज: "{searchQuery.trim()}"
                </span>
              )}
              <span className="text-[var(--soft-text)]">
                ({filteredCandidates.length} परिणाम मिले)
              </span>
            </div>

            <button
              onClick={clearFilters}
              className="text-xs text-[var(--saffron)] hover:underline font-bold flex items-center gap-1"
            >
              <XCircle size={13} />
              फ़िल्टर हटाएं
            </button>
          </div>
        )}
      </div>

      {/* Candidates List / Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="bento-card p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[var(--page-bg)] border border-[var(--card-border)] mx-auto flex items-center justify-center text-zinc-400">
            <Users size={28} />
          </div>
          <h3 className="font-rajdhani font-bold text-xl text-[var(--page-text)]">
            कोई प्रत्याशी नहीं मिला
          </h3>
          <p className="text-xs sm:text-sm text-[var(--soft-text)] max-w-md mx-auto leading-relaxed">
            आपके द्वारा चुने गए फ़िल्टर (वार्ड {activeWard || 'सभी'}, पार्टी: {selectedParty}) के अनुसार कोई उम्मीदवार उपलब्ध नहीं है। कृपया फ़िल्टर रीसेट करें।
          </p>
          <button
            onClick={clearFilters}
            className="mt-2 px-4 py-2 rounded-full bg-[var(--page-text)] text-[var(--page-bg)] text-xs font-bold hover:opacity-90 transition-all shadow-sm"
          >
            सभी उम्मीदवार देखें
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedByWard.map(([wardNum, candidates]) => (
            <div key={wardNum} className="bento-card p-5 sm:p-7 space-y-4">
              {/* Ward Group Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--saffron)] text-[#090A0F] font-mono-code font-bold text-sm flex items-center justify-center shadow-sm">
                    {String(wardNum).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-rajdhani font-bold text-xl sm:text-2xl text-[var(--page-text)] leading-tight">
                      वार्ड संख्या {wardNum}
                    </h3>
                    <p className="text-xs text-[var(--soft-text)]">
                      कुल उम्मीदवार: <b className="text-[var(--page-text)]">{candidates.length}</b>
                    </p>
                  </div>
                </div>

                {onNavigateToVoterList && (
                  <button
                    onClick={() => onNavigateToVoterList(wardNum)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--page-bg)] hover:border-emerald-500 hover:text-emerald-500 text-xs font-semibold text-[var(--page-text)] transition-all shadow-sm"
                  >
                    <FileText size={13} className="text-emerald-500" />
                    <span>वार्ड {wardNum} की वोटर लिस्ट देखें</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>

              {/* Candidates Grid for this Ward */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {candidates.map((candidate) => {
                  const partyStyle = getPartyStyle(candidate.party);
                  const firstChar = candidate.name.charAt(0);

                  return (
                    <div
                      key={candidate.srNo}
                      className="p-4 rounded-2xl bg-[var(--page-bg)] border border-[var(--card-border)] hover:border-[var(--saffron)] transition-all flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        {/* Top Meta info */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="font-mono-code text-[11px] font-bold text-[var(--soft-text)] bg-[var(--card-bg)] px-2 py-0.5 rounded border border-[var(--card-border)]">
                            क्र.सं. {candidate.srNo}
                          </span>
                          <span className="font-mono-code text-[11px] font-semibold text-[var(--soft-text)]">
                            वार्ड {candidate.ward}
                          </span>
                        </div>

                        {/* Candidate Name */}
                        <div className="flex items-start gap-3 my-2">
                          <div className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center font-rajdhani font-bold text-base text-[var(--page-text)] flex-shrink-0 group-hover:scale-105 group-hover:border-[var(--saffron)] transition-all">
                            {firstChar}
                          </div>
                          <div>
                            <h4 className="font-rajdhani font-bold text-base sm:text-lg text-[var(--page-text)] leading-snug group-hover:text-[var(--saffron)] transition-colors">
                              {candidate.name}
                            </h4>
                            <span className="text-[10px] text-[var(--soft-text)] uppercase tracking-wider font-semibold block mt-0.5">
                              फॉर्म-4 प्रत्याशी
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Party Badge */}
                      <div className="mt-3 pt-2.5 border-t border-[var(--card-border)] flex items-center justify-between gap-2">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${partyStyle.bg} ${partyStyle.text} ${partyStyle.border}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${partyStyle.dot}`}></span>
                          <span className="truncate max-w-[200px]" title={candidate.party}>
                            {candidate.party}
                          </span>
                        </div>

                        <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 flex-shrink-0">
                          <CheckCircle2 size={11} />
                          वैध
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Candidate Notice / Info Bento Card */}
      <div className="bento-card p-5 sm:p-6 text-xs text-[var(--soft-text)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <span className="font-semibold text-[var(--page-text)] block">
              आधिकारिक फॉर्म-4 डेटा स्रोतानुसार संकलित
            </span>
            <span>
              यह सूची निर्वाचन विभाग एवं नगरपालिका बालोतरा के सार्वजनिक फॉर्म-4 रिकॉर्ड के अनुसार प्रदर्शित की गई है।
            </span>
          </div>
        </div>
        <div className="font-mono-code text-[11px] text-[var(--muted-text)] whitespace-nowrap">
          55 Wards · Form-4 Verified
        </div>
      </div>
    </section>
  );
};
