import { LayoutDashboard, ListTodo, Users, Settings } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { cn } from '../ui/utils';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { user } = useAuth();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'user'] },
    { id: 'tasks', label: 'Tasks', icon: ListTodo, roles: ['admin', 'user'] },
    { id: 'users', label: 'User Management', icon: Users, roles: ['admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'user'] },
  ];

  const allowedItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="flex h-full w-64 flex-col border-r bg-gray-50 dark:bg-sidebar dark:border-border">
      <nav className="flex-1 space-y-1 p-4">
        {allowedItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm dark:bg-sidebar-primary'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-sidebar-foreground dark:hover:bg-sidebar-accent'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t bg-white p-4 dark:bg-card dark:border-border">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950">
          <p className="text-xs font-medium text-indigo-900 dark:text-indigo-400">Need Help?</p>
          <p className="mt-1 text-xs text-indigo-700 dark:text-indigo-500">
            Check our documentation
          </p>
        </div>
      </div>
    </div>
  );
}