import { LogOut, Sparkles } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export function Header({ isLoggedIn = true, onLogout }: HeaderProps) {
  if (!isLoggedIn) return null;
  
  return (
    <header className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg sticky top-0 z-40 border-b border-neutral-100 dark:border-neutral-800 px-6 py-5 flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-xl tracking-tight leading-none bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Lumina
          </span>
          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-1">
            Daily Wisdom
          </span>
        </div>
      </div>
      <button onClick={onLogout} className="p-2.5 bg-neutral-50 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
        <LogOut className="w-5 h-5" />
      </button>
    </header>
  );
}