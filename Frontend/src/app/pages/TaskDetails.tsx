import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Task } from '../lib/tasks';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { Separator } from '../components/ui/separator';

interface TaskDetailsProps {
  task: Task;
  onBack: () => void;
}

export function TaskDetails({ task, onBack }: TaskDetailsProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'outline', className: string }> = {
      pending: { variant: 'outline', className: 'border-orange-200 bg-orange-50 text-orange-700' },
      'in-progress': { variant: 'default', className: 'bg-blue-600' },
      completed: { variant: 'secondary', className: 'bg-green-100 text-green-700' },
    };

    const config = variants[status] || variants.pending;

    return (
      <Badge variant={config.variant} className={config.className}>
        {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Task Details</h2>
          <p className="text-gray-600 mt-1">View complete task information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{task.title}</CardTitle>
              {getStatusBadge(task.status)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <p className="text-gray-900">
              {task.description || 'No description provided'}
            </p>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created Date</p>
                  <p className="font-medium text-gray-900">
                    {format(new Date(task.createdAt), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Created By</p>
                  <p className="font-medium text-gray-900">User #{task.createdBy}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Tag className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Task ID</p>
                  <p className="font-medium text-gray-900">#{task.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Assigned To</p>
                  <p className="font-medium text-gray-900">
                    {task.assignedTo ? `User #${task.assignedTo}` : 'Unassigned'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Activity Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Task created</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(task.createdAt), 'MMMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
              {task.status !== 'pending' && (
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Status updated to {task.status}</p>
                    <p className="text-xs text-gray-500">Recently</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}