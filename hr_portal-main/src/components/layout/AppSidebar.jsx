import {
  LayoutDashboard, Users, CalendarCheck, CalendarOff, DollarSign,
  Briefcase, TrendingUp, Settings, LogOut, ChevronLeft, Shield, UserPlus } from
'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar } from
'@/components/ui/sidebar';








const navItems = [
{ title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard, roles: ['it-admin', 'hr', 'employee'] },
{ title: 'User Management', url: '/user-management', icon: Shield, roles: ['it-admin'] },
{ title: 'Employees', url: '/employees', icon: Users, roles: ['it-admin', 'hr'] },
{ title: 'Attendance', url: '/attendance', icon: CalendarCheck, roles: ['it-admin', 'hr', 'employee'] },
{ title: 'Leaves', url: '/leaves', icon: CalendarOff, roles: ['it-admin', 'hr', 'employee'] },
{ title: 'Payroll', url: '/payroll', icon: DollarSign, roles: ['it-admin', 'hr', 'employee'] },
{ title: 'Recruitment', url: '/recruitment', icon: Briefcase, roles: ['it-admin', 'hr'] },
{ title: 'Performance', url: '/performance', icon: TrendingUp, roles: ['it-admin', 'hr', 'employee'] },
{ title: 'My Profile', url: '/profile', icon: UserPlus, roles: ['employee'] },
{ title: 'Settings', url: '/settings', icon: Settings, roles: ['it-admin', 'hr'] }];


const roleLabels = {
  'it-admin': 'IT Admin',
  'hr': 'HR Manager',
  'employee': 'Employee'
};

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { user, logout } = useAuth();

  const visibleItems = navItems.filter((item) => user && item.roles.includes(user.role));

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-border">
        {!collapsed &&
        <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">HR</span>
            </div>
            <span className="font-semibold text-foreground text-[15px]">PeopleOS</span>
          </div>
        }
        {collapsed &&
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-sm">H</span>
          </div>
        }
        <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-secondary transition-colors ml-auto">
          <ChevronLeft className={`h-4 w-4 text-muted-foreground transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!collapsed &&
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-3 mb-1">
              Navigation
            </SidebarGroupLabel>
          }
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                        isActive ?
                        'bg-sidebar-accent text-sidebar-accent-foreground' :
                        'text-sidebar-foreground hover:bg-secondary hover:text-foreground'}`
                        }
                        activeClassName="">
                        
                        <item.icon className="h-[18px] w-[18px] shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>);

              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
        {!collapsed && user &&
        <div className="flex items-center gap-3 px-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{roleLabels[user.role]}</p>
            </div>
          </div>
        }
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full">
          
          <LogOut className="h-[18px] w-[18px]" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </SidebarFooter>
    </Sidebar>);

}