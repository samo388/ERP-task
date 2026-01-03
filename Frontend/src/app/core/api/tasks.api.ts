import { apiRequest } from '../http';

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

export const TasksAPI = {
  async getMyTasks(): Promise<Task[]> {
    return apiRequest('/tasks');
  },

  async createTask(data: {
    title: string;
    description?: string;
  }) {
    return apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateStatus(taskId: string, status: TaskStatus) {
    return apiRequest(`/tasks/${taskId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  
  async deleteTask(taskId: string) {
    return apiRequest(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },
};
