import { User, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ThemeToggle } from '../ThemeToggle';

export function TopNav() {
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="sticky top-0 z-40 border-b bg-white dark:bg-card dark:border-border">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
            <span className="font-semibold text-white">TM</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-foreground">Task Manager</h1>
            <p className="text-xs text-gray-500 dark:text-muted-foreground">Enterprise Edition</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs dark:bg-indigo-950 dark:text-indigo-400">
                    {user ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-gray-500 dark:text-muted-foreground">{user?.email}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <span>My Account</span>
                  <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                    {user?.role}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}