import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { createTaskDto } from './task.dto';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @Get()
  getAllTask(): Task[] {
    return this.taskService.getAllTask();
  }

  @Post()
  createTask(
    @Body() createTaskDto: createTaskDto
  ): Task {
    return this.taskService.createTask(createTaskDto.title, createTaskDto.description);
  }
}
