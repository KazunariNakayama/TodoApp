export interface Task {
  id: string;
  title: string;
  detail: string;
  due_date: string;
  status: TaskStatus;
  completed: boolean;
  selector?: string;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface UserFormInputs {
  name: string;
  email: string;
}

export interface DateForm {
  startDate: Date;
  endDate: Date;
}