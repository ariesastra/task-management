import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { createTaskDto, UpdateTaskReturn } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    console.log(status);
    // define temp. array
    let tasks = this.getAllTask();
    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status.toLowerCase() === status);
    }
    // do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }
    return tasks;
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
    const result: UpdateTaskReturn = new UpdateTaskReturn();
    const getTaskById: Task = this.getTaskById(id);

    if (getTaskById) {
      getTaskById.status = status;
      result.message = `Task has be change to ${status}`;
      result.task = getTaskById;

      return result;
    }
  }
}
