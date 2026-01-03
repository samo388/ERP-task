import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TasksAPI, Task, TaskStatus } from '../core/api/tasks.api';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  /* ============================
     Load Tasks
  ============================ */
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await TasksAPI.getMyTasks();
      setTasks(data);
    } catch {
      // handled globally in apiRequest
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  /* ============================
     Create Task
  ============================ */
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setCreating(true);
      await TasksAPI.createTask({ title, description });
      toast.success('Task created');
      setTitle('');
      setDescription('');
      loadTasks();
    } catch {
    } finally {
      setCreating(false);
    }
  };

  /* ============================
     Update Status
  ============================ */
  const handleStatusChange = async (
    taskId: string,
    status: TaskStatus
  ) => {
    try {
      await TasksAPI.updateStatus(taskId, status);
      toast.success('Status updated');
      loadTasks();
    } catch {}
  };

  /* ============================
     Delete Task
  ============================ */
  const handleDelete = async (taskId: string) => {
    const confirmed = confirm('Delete this task?');
    if (!confirmed) return;

    try {
      await TasksAPI.deleteTask(taskId);
      toast.success('Task deleted');
      loadTasks();
    } catch {}
  };

  /* ============================
     Loading State
  ============================ */
  if (loading) {
    return (
      <div className="p-10 text-gray-500 text-center">
        Loading your tasks...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage your tasks efficiently
        </p>
      </div>

      {/* Create Task */}
      <form
        onSubmit={handleCreateTask}
        className="bg-white border rounded-lg p-4 space-y-3"
      >
        <h2 className="font-medium">Create New Task</h2>

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          disabled={creating}
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {creating ? 'Creating...' : 'Add Task'}
        </button>
      </form>

      {/* Tasks List */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="font-medium mb-4">My Tasks</h2>

        {tasks.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg">No tasks yet 🚀</p>
            <p className="text-sm mt-2">
              Create your first task to get started
            </p>
          </div>
        )}

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="border rounded p-3 flex justify-between items-start"
            >
              <div>
                <h3 className="font-medium">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-gray-600">
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(
                      task._id,
                      e.target.value as TaskStatus
                    )
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
