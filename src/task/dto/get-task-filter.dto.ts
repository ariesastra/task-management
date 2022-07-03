import { TaskStatus } from '../task.model';

// Using question mark is for optional statements
export class GetTaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
