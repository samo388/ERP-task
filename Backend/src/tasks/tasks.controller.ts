import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('Tasks')
@ApiBearerAuth('JWT-auth')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create new task (Authenticated)' })
  create(@Body() dto: CreateTaskDto, @Req() req: any) {
    return this.tasksService.create({
      ...dto,
      userId: req.user.userId,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get logged-in user tasks' })
  getMyTasks(@Req() req: any) {
    return this.tasksService.findUserTasks(req.user.userId);
  }
}
