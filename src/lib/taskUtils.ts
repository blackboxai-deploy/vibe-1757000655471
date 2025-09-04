import { Task, DayPlanner, TaskPriority } from '@/types/task';

export const taskUtils = {
  // Generate unique ID for tasks
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Format date to YYYY-MM-DD string
  formatDateToString: (date: Date): string => {
    return date.toISOString().split('T')[0];
  },

  // Parse date string to Date object
  parseDateString: (dateString: string): Date => {
    return new Date(dateString + 'T00:00:00');
  },

  // Get today's date as string
  getTodayString: (): string => {
    return taskUtils.formatDateToString(new Date());
  },

  // Create a new task
  createTask: (title: string, description: string = '', priority: TaskPriority = 'medium', date: string): Task => {
    return {
      id: taskUtils.generateId(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority,
      date,
      createdAt: new Date(),
    };
  },

  // Calculate day planner stats
  calculateDayStats: (tasks: Task[]): DayPlanner['stats'] => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      progress,
    };
  },

  // Sort tasks by priority and completion status
  sortTasks: (tasks: Task[]): Task[] => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    
    return [...tasks].sort((a, b) => {
      // Incomplete tasks first
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then by priority (high to low)
      if (a.priority !== b.priority) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      
      // Finally by creation date (newest first for incomplete, oldest first for completed)
      if (a.completed) {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });
  },

  // Filter tasks based on criteria
  filterTasks: (tasks: Task[], showCompleted: boolean, priority?: TaskPriority): Task[] => {
    return tasks.filter(task => {
      // Filter by completion status
      if (!showCompleted && task.completed) {
        return false;
      }
      
      // Filter by priority
      if (priority && task.priority !== priority) {
        return false;
      }
      
      return true;
    });
  },

  // Get priority color class for UI
  getPriorityColor: (priority: TaskPriority): string => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  },

  // Get priority badge color for dark mode
  getPriorityColorDark: (priority: TaskPriority): string => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-900/20 border-red-800';
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'low':
        return 'text-green-400 bg-green-900/20 border-green-800';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  },

  // Format date for display
  formatDisplayDate: (date: string): string => {
    const dateObj = taskUtils.parseDateString(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date === taskUtils.formatDateToString(today)) {
      return 'Today';
    } else if (date === taskUtils.formatDateToString(yesterday)) {
      return 'Yesterday';
    } else if (date === taskUtils.formatDateToString(tomorrow)) {
      return 'Tomorrow';
    } else {
      return dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  },

  // Get completion time text
  getCompletionTimeText: (task: Task): string => {
    if (!task.completedAt) return '';
    
    const now = new Date();
    const completed = task.completedAt;
    const diffMs = now.getTime() - completed.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }
  },
};