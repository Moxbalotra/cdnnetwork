import React from 'react';
import { ThemeMode } from '../types';
import { Sun, Moon, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--panel-bg)]/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="tricolor"></div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-zinc-900 to-black text-white dark:from-zinc-100 dark:to-white dark:text-zinc-950 flex items-center justify-center font-rajdhani font-bold text-lg sm:text-xl shadow-sm border border-zinc-700/30">
            MCB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-rajdhani font-bold text-xl sm:text-2xl tracking-tight leading-tight">
                BALOTRA NEWS पोर्टल
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 bg-[var(--saffron)]/10 text-[var(--saffron-deep)] dark:text-[var(--saffron)] rounded-full text-[11px] font-semibold border border-[var(--saffron)]/20">
                <ShieldCheck size={12} />
                2026 चुनाव
              </span>
            </div>
            <p className="text-[var(--soft-text)] text-xs tracking-wider uppercase font-medium">
              Morihix Digital · Ward Information System
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>पोर्टल सक्रिय</span>
          </div>

          <div className="hidden lg:block w-px h-5 bg-[var(--line)]"></div>

          <button
            onClick={onToggleTheme}
            type="button"
            aria-label="थीम बदलें"
            className="inline-flex items-center gap-1.5 border border-[var(--line)] bg-[var(--panel-bg)] hover:border-zinc-400 px-3.5 py-1.5 rounded-full font-medium text-xs sm:text-sm transition-all shadow-sm"
          >
            {theme === 'light' ? (
              <>
                <Moon size={15} className="text-zinc-700" />
                <span className="hidden sm:inline text-zinc-700">Dark</span>
              </>
            ) : (
              <>
                <Sun size={15} className="text-[var(--saffron)]" />
                <span className="hidden sm:inline text-zinc-300">Light</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
