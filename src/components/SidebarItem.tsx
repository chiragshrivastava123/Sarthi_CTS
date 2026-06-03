import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({ icon, label, active = false, onClick }: SidebarItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all outline-none ${
        active 
          ? 'bg-red-600 text-white shadow-md shadow-red-900/20' 
          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 focus:bg-slate-800/80'
    }`}
    >
      {icon}
      <span className="font-semibold text-sm">{label}</span>
      {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
    </button>
  );
}
