import { Bell, Search } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/authSlice';

export function TopBar({ title }) {
  const user = useSelector(selectCurrentUser);

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="lg:hidden" />
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center bg-secondary rounded-lg px-3 py-1.5 gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search..."
            className="bg-transparent text-sm outline-none w-48 placeholder:text-muted-foreground" />
          
        </div>
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Bell className="h-[18px] w-[18px] text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs ml-1">
          {user?.name.split(' ').map((n) => n[0]).join('')}
        </div>
      </div>
    </header>);

}