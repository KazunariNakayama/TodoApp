export interface Task {
  id: string;
  title: string;
  detail: string;
  due_date: string;
  status: TaskStatus;
  completed: boolean;
  selector?: string;
}

export interface SubTask {
  id: string;
  task: Task;
  taskID: string;
  title: string;
  detail: string;
  status: TaskStatus;
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

//↓これはいる？削除予定
export interface UserFormInputs {
  name: string;
  email: string;
}

export interface DateForm {
  startDate: Date;
  endDate: Date;
}

export interface SearchType {
  keyword: string;
  due_date: Date;
  status: TaskStatus;
}



