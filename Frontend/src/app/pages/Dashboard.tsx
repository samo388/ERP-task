import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { TasksAPI, Task, TaskStatus } from '../core/api/tasks.api';
import { getUserFromToken } from '../core/auth/token';
import { CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const user = getUserFromToken();
  const isAdmin = user?.role === 'admin';

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await TasksAPI.getMyTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // 📊 Stats
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'inProgress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  const completionRate =
    stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  // ➕ Create Task
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await TasksAPI.createTask({ title, description });
    setTitle('');
    setDescription('');
    loadTasks();
  };

  // ✏️ Update Status
  const handleStatusChange = async (id: string, status: TaskStatus) => {
    await TasksAPI.updateTaskStatus(id, status);
    loadTasks();
  };

  // 🗑 Delete Task
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this task?')) return;
    await TasksAPI.deleteTask(id);
    loadTasks();
  };

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">
          Welcome back 👋
        </h2>
        <p className="text-gray-600">
          Role: <strong>{user?.role}</strong>
        </p>
      </div>

      {/* Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Stat title="Total" value={stats.total} icon={<ListTodo />} />
        <Stat title="Pending" value={stats.pending} icon={<Clock />} />
        <Stat title="In Progress" value={stats.inProgress} icon={<TrendingUp />} />
        <Stat title="Completed" value={stats.completed} icon={<CheckCircle2 />} />
      </div>

      {/* Create Task */}
      <Card>
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateTask} className="space-y-3">
            <input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
              Add Task
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
          <CardDescription>
            Manage your tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-gray-500">No tasks yet</p>
          )}

          {tasks.map(task => (
            <div
              key={task._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <div>
                <h4 className="font-medium">{task.title}</h4>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>

              <div className="flex gap-2 items-center">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value as TaskStatus)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                {(isAdmin || user?.sub === task._id) && (
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={completionRate} />
          <p className="mt-2 text-sm">
            {completionRate.toFixed(1)}% completed
          </p>
        </CardContent>
      </Card>

      {/* Admin Section */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>
              Admin-only features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              You have full access to all tasks and management features.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* 🔹 Small reusable stat card */
function Stat({ title, value, icon }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}
