export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  date: string; // YYYY-MM-DD format
  createdAt: Date;
  completedAt?: Date;
}

export interface DayPlanner {
  date: string; // YYYY-MM-DD format
  tasks: Task[];
  stats: {
    total: number;
    completed: number;
    progress: number; // percentage 0-100
  };
}

export type TaskPriority = 'high' | 'medium' | 'low';

export interface TaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
}

export interface TaskFilter {
  showCompleted: boolean;
  priority?: TaskPriority;
}