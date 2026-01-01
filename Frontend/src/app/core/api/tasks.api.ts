import { apiRequest } from '../http';

export type TaskStatus = 'pending' | 'inProgress' | 'completed';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
}

export const TasksAPI = {
  getMyTasks: () => apiRequest<Task[]>('/tasks'),

  createTask: (data: { title: string; description?: string }) =>
    apiRequest<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateTaskStatus: (id: string, status: TaskStatus) =>
    apiRequest<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  deleteTask: (id: string) =>
    apiRequest<void>(`/tasks/${id}`, {
      method: 'DELETE',
    }),
};
