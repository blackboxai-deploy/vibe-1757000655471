'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFormData, TaskPriority } from '@/types/task';
import { storageUtils } from '@/lib/storage';
import { taskUtils } from '@/lib/taskUtils';

export const useTaskManager = (initialDate?: string) => {
  const [currentDate, setCurrentDate] = useState<string>(
    initialDate || taskUtils.getTodayString()
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | undefined>(undefined);

  // Load tasks for current date
  const loadTasks = useCallback(() => {
    setLoading(true);
    const dateTasks = storageUtils.getTasksForDate(currentDate);
    setTasks(taskUtils.sortTasks(dateTasks));
    setLoading(false);
  }, [currentDate]);

  // Load tasks when date changes
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Add a new task
  const addTask = useCallback((taskData: TaskFormData) => {
    const newTask = taskUtils.createTask(
      taskData.title,
      taskData.description || '',
      taskData.priority,
      currentDate
    );

    storageUtils.addTask(newTask);
    loadTasks(); // Reload to get updated list
  }, [currentDate, loadTasks]);

  // Toggle task completion
  const toggleTask = useCallback((taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updates: Partial<Task> = {
      completed: !task.completed,
      completedAt: !task.completed ? new Date() : undefined,
    };

    storageUtils.updateTask(taskId, updates);
    loadTasks();
  }, [tasks, loadTasks]);

  // Update task
  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    storageUtils.updateTask(taskId, updates);
    loadTasks();
  }, [loadTasks]);

  // Delete task
  const deleteTask = useCallback((taskId: string) => {
    storageUtils.deleteTask(taskId);
    loadTasks();
  }, [loadTasks]);

  // Change current date
  const changeDate = useCallback((newDate: string) => {
    setCurrentDate(newDate);
  }, []);

  // Navigate to previous day
  const goToPreviousDay = useCallback(() => {
    const currentDateObj = taskUtils.parseDateString(currentDate);
    const previousDay = new Date(currentDateObj);
    previousDay.setDate(previousDay.getDate() - 1);
    setCurrentDate(taskUtils.formatDateToString(previousDay));
  }, [currentDate]);

  // Navigate to next day
  const goToNextDay = useCallback(() => {
    const currentDateObj = taskUtils.parseDateString(currentDate);
    const nextDay = new Date(currentDateObj);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(taskUtils.formatDateToString(nextDay));
  }, [currentDate]);

  // Go to today
  const goToToday = useCallback(() => {
    setCurrentDate(taskUtils.getTodayString());
  }, []);

  // Get filtered tasks
  const filteredTasks = taskUtils.filterTasks(tasks, showCompleted, priorityFilter);

  // Calculate stats
  const dayStats = taskUtils.calculateDayStats(tasks);

  // Check if current date is today
  const isToday = currentDate === taskUtils.getTodayString();

  // Get display date
  const displayDate = taskUtils.formatDisplayDate(currentDate);

  // Clear all tasks for current date (for testing)
  const clearTasks = useCallback(() => {
    tasks.forEach(task => {
      storageUtils.deleteTask(task.id);
    });
    loadTasks();
  }, [tasks, loadTasks]);

  return {
    // State
    currentDate,
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    showCompleted,
    priorityFilter,
    dayStats,
    isToday,
    displayDate,

    // Actions
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    changeDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    clearTasks,

    // Filters
    setShowCompleted,
    setPriorityFilter,

    // Utils
    loadTasks,
  };
};