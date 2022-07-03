import { Task } from '../task.model';

export interface createTaskDto {
  title: string;
  description: string;
}

export class UpdateTaskReturn {
  message: string;
  task: Task;
}
