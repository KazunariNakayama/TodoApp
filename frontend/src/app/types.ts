export interface Task {
  id: string;
  title: string;
  detail: string;
  due_date: Date;
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
