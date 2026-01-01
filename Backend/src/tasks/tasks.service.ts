import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) {}

  create(data: Partial<Task>) {
    return this.taskModel.create(data);
  }

  findByUser(userId: string) {
    return this.taskModel.find({ userId }).sort({ createdAt: -1 });
  }

  // 🔥 THIS IS THE KEY METHOD
  async updateStatus(
    taskId: string,
    status: 'pending' | 'in_progress' | 'completed',
    userId: string,
  ) {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId },
      { status },
      { new: true },
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
