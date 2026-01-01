import { apiRequest } from '../http';

/* ================================
   Types
================================ */

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

/* ================================
   API
================================ */

export const TasksAPI = {
  /* Get logged-in user's tasks */
  async getMyTasks(): Promise<Task[]> {
    return apiRequest<Task[]>('/tasks', {
      method: 'GET',
    });
  },

  /* Create new task */
  async createTask(data: {
    title: string;
    description?: string;
  }): Promise<Task> {
    return apiRequest<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /* Update task status */
  async updateStatus(
    taskId: string,
    status: TaskStatus
  ): Promise<Task> {
    return apiRequest<Task>(`/tasks/${taskId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  /* Delete task (optional, future-proof) */
  async deleteTask(taskId: string): Promise<void> {
    return apiRequest<void>(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },
};
