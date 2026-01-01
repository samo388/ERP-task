import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../lib/auth-context';
import { toast } from 'sonner';
import { Bell, Lock, User, Palette } from 'lucide-react';

export function Settings() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [taskReminders, setTaskReminders] = useState(true);

  const handleSavePreferences = () => {
    toast.success('Preferences saved successfully');
  };

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleChangePassword = () => {
    toast.success('Password changed successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                <User className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue={user?.role} disabled className="bg-gray-50" />
              <p className="text-xs text-gray-500">Contact an administrator to change your role</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleUpdateProfile}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                <Lock className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your password and security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="Enter new password" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleChangePassword}>Change Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                <Bell className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive email updates about your tasks</p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-gray-500">Get push notifications in your browser</p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="task-reminders">Task Reminders</Label>
                <p className="text-sm text-gray-500">Receive reminders for pending tasks</p>
              </div>
              <Switch
                id="task-reminders"
                checked={taskReminders}
                onCheckedChange={setTaskReminders}
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={handleSavePreferences}>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                <Palette className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="grid grid-cols-3 gap-3">
                <button className="rounded-lg border-2 border-indigo-600 bg-white p-3 text-center text-sm font-medium">
                  Light
                </button>
                <button className="rounded-lg border-2 border-gray-200 bg-gray-900 p-3 text-center text-sm font-medium text-white">
                  Dark
                </button>
                <button className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-white to-gray-900 p-3 text-center text-sm font-medium">
                  Auto
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
