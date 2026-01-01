export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  createdBy: string;
  assignedTo?: string;
}

export function getTasks(userId?: string, role?: string): Task[] {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  
  // Admins see all tasks, users see only their tasks
  if (role === 'admin') {
    return tasks;
  }
  
  return tasks.filter((task: Task) => task.createdBy === userId || task.assignedTo === userId);
}

export function getTaskById(id: string): Task | null {
  const tasks = getTasks();
  return tasks.find((task: Task) => task.id === id) || null;
}

export function createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Task {
  const tasks = getTasks();
  
  const newTask: Task = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  return newTask;
}

export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const tasks = getTasks();
  const index = tasks.findIndex((task: Task) => task.id === id);
  
  if (index === -1) return null;
  
  tasks[index] = { ...tasks[index], ...updates };
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  return tasks[index];
}

export function deleteTask(id: string): boolean {
  const tasks = getTasks();
  const filtered = tasks.filter((task: Task) => task.id !== id);
  
  if (filtered.length === tasks.length) return false;
  
  localStorage.setItem('tasks', JSON.stringify(filtered));
  return true;
}

export function getTaskStats(userId?: string, role?: string) {
  const tasks = getTasks(userId, role);
  
  return {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };
}
