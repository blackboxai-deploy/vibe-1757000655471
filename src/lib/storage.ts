import { Task } from '@/types/task';

const STORAGE_KEY = 'daily-planner-tasks';

export const storageUtils = {
  // Get all tasks from localStorage
  getTasks: (): Task[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const tasks = JSON.parse(stored);
      // Convert date strings back to Date objects
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    } catch (error) {
      console.error('Error loading tasks from storage:', error);
      return [];
    }
  },

  // Save all tasks to localStorage
  saveTasks: (tasks: Task[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to storage:', error);
    }
  },

  // Get tasks for a specific date
  getTasksForDate: (date: string): Task[] => {
    const allTasks = storageUtils.getTasks();
    return allTasks.filter(task => task.date === date);
  },

  // Add a new task
  addTask: (task: Task): void => {
    const tasks = storageUtils.getTasks();
    tasks.push(task);
    storageUtils.saveTasks(tasks);
  },

  // Update an existing task
  updateTask: (taskId: string, updates: Partial<Task>): void => {
    const tasks = storageUtils.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
      storageUtils.saveTasks(tasks);
    }
  },

  // Delete a task
  deleteTask: (taskId: string): void => {
    const tasks = storageUtils.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    storageUtils.saveTasks(filteredTasks);
  },

  // Clear all tasks (for testing/reset)
  clearAllTasks: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },

  // Export tasks as JSON (backup feature)
  exportTasks: (): string => {
    const tasks = storageUtils.getTasks();
    return JSON.stringify(tasks, null, 2);
  },

  // Import tasks from JSON (restore feature)
  importTasks: (jsonData: string): boolean => {
    try {
      const tasks = JSON.parse(jsonData);
      if (Array.isArray(tasks)) {
        storageUtils.saveTasks(tasks);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing tasks:', error);
      return false;
    }
  },
};