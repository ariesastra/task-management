import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';
import { createTaskDto, UpdateTaskReturn } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTask(@Query() filterDto: GetTaskFilterDto): Task[] {
    // if there any filter defines, call getTaskWithFilter
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilter(filterDto);
    }
    // else just getAllTask
    else {
      return this.taskService.getAllTask();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): UpdateTaskReturn {
    return this.taskService.updateTaskById(id, status);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.taskService.deleteTaskById(id);
  }
}
