'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { useTaskManager } from '@/hooks/useTaskManager';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import ProgressStats from './ProgressStats';
import DatePicker from './DatePicker';

export default function TaskManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const {
    currentDate,
    tasks,
    loading,
    dayStats,
    isToday,
    displayDate,
    showCompleted,
    priorityFilter,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    goToPreviousDay,
    goToNextDay,
    goToToday,
    setShowCompleted,
    setPriorityFilter,
    changeDate,
  } = useTaskManager();

  const handleAddTask = (taskData: any) => {
    addTask(taskData);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      {/* Date Navigation */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousDay}
                className="flex items-center space-x-1"
              >
                <span>← Previous</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center space-x-2"
                >
                  <span>📅</span>
                  <span className="font-medium">{displayDate}</span>
                </Button>
                
                {!isToday && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={goToToday}>
                    Go to Today
                  </Badge>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextDay}
                className="flex items-center space-x-1"
              >
                <span>Next →</span>
              </Button>
            </div>

            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2"
            >
              <span>+ Add Task</span>
            </Button>
          </div>
        </CardHeader>
        
        {showDatePicker && (
          <CardContent className="pt-0">
            <DatePicker
              selectedDate={currentDate}
              onDateChange={changeDate}
              onClose={() => setShowDatePicker(false)}
            />
          </CardContent>
        )}
      </Card>

      {/* Progress Stats */}
      <ProgressStats
        stats={dayStats}
        isToday={isToday}
        displayDate={displayDate}
      />

      {/* Add Task Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <AddTaskForm
              onSubmit={handleAddTask}
              onCancel={() => setShowAddForm(false)}
            />
          </CardContent>
        </Card>
      )}

      {/* Task Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCompleted}
                  onChange={(e) => setShowCompleted(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Show completed tasks
                </span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Priority:</span>
              <div className="flex space-x-1">
                <Badge
                  variant={priorityFilter === undefined ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setPriorityFilter(undefined)}
                >
                  All
                </Badge>
                <Badge
                  variant={priorityFilter === 'high' ? "destructive" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setPriorityFilter('high')}
                >
                  High
                </Badge>
                <Badge
                  variant={priorityFilter === 'medium' ? "default" : "outline"}
                  className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={() => setPriorityFilter('medium')}
                >
                  Medium
                </Badge>
                <Badge
                  variant={priorityFilter === 'low' ? "secondary" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setPriorityFilter('low')}
                >
                  Low
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        loading={loading}
        onToggleTask={toggleTask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}