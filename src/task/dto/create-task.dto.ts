import { Task } from '../task.model';
// Handling Global Pipes
// You need to describe Global Pipes at main.ts
import { IsNotEmpty } from 'class-validator';

export class createTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}

export class UpdateTaskReturn {
  message: string;
  task: Task;
}
