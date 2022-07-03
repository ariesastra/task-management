import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { createTaskDto, UpdateTaskReturn } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: createTaskDto): Task {
    // Destructure
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    const getTaskById = this.getTaskById(id);

    if (getTaskById) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }
  }

  updateTaskById(id: string, status: TaskStatus): UpdateTaskReturn {
    let result: UpdateTaskReturn = new UpdateTaskReturn();
    let getTaskById: Task = this.getTaskById(id);

    if (getTaskById) {
      getTaskById.status = status;
      result.message = `Task has be change to ${status}`;
      result.task = getTaskById;

      return result;
    }
  }
}
