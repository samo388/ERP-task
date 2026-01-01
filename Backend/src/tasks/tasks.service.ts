import { Injectable } from '@nestjs/common';
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

  findUserTasks(userId: string) {
    return this.taskModel.find({ userId });
  }
}
