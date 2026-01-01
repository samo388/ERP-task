import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() body: any, @Req() req: any) {
    return this.tasksService.create({
      ...body,
      userId: req.user.userId,
    });
  }

  @Get()
  getMyTasks(@Req() req: any) {
    return this.tasksService.findByUser(req.user.userId);
  }

  // 🔥 THIS IS THE FIX
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'in_progress' | 'completed',
    @Req() req: any,
  ) {
    return this.tasksService.updateStatus(id, status, req.user.userId);
  }
}
