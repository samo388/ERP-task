import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Users, Shield, UserCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({ total: 0, admins: 0, users: 0 });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]').map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
    }));

    setUsers(allUsers);
    setStats({
      total: allUsers.length,
      admins: allUsers.filter(u => u.role === 'admin').length,
      users: allUsers.filter(u => u.role === 'user').length,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
        <p className="text-gray-600 mt-1">Manage users and their roles</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
            <Users className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-1">
              All registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Administrators
            </CardTitle>
            <Shield className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-indigo-600">{stats.admins}</div>
            <p className="text-xs text-gray-500 mt-1">
              Admin access
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Regular Users
            </CardTitle>
            <UserCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">{stats.users}</div>
            <p className="text-xs text-gray-500 mt-1">
              Standard access
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all registered users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">No users found</h3>
              <p className="text-sm text-gray-500">Users will appear here once they register</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>User ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.role === 'admin' ? 'default' : 'secondary'}
                        className={user.role === 'admin' ? 'bg-indigo-600' : ''}
                      >
                        {user.role === 'admin' ? (
                          <Shield className="mr-1 h-3 w-3" />
                        ) : (
                          <UserCircle className="mr-1 h-3 w-3" />
                        )}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">#{user.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
