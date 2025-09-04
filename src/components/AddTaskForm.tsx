'use client';

import { useState } from 'react';
import { TaskFormData, TaskPriority } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface AddTaskFormProps {
  onSubmit: (taskData: TaskFormData) => void;
  onCancel: () => void;
}

export default function AddTaskForm({ onSubmit, onCancel }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task-title" className="text-sm font-medium">
          Task Title *
        </Label>
        <Input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          required
          disabled={isSubmitting}
          className="w-full"
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="task-description" className="text-sm font-medium">
          Description (Optional)
        </Label>
        <Textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details about this task..."
          rows={3}
          disabled={isSubmitting}
          className="w-full resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Priority</Label>
        <Select value={priority} onValueChange={(value: TaskPriority) => setPriority(value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">
              <div className="flex items-center space-x-2">
                <span className="text-red-600 dark:text-red-400">🔴</span>
                <span>High Priority</span>
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600 dark:text-yellow-400">🟡</span>
                <span>Medium Priority</span>
              </div>
            </SelectItem>
            <SelectItem value="low">
              <div className="flex items-center space-x-2">
                <span className="text-green-600 dark:text-green-400">🟢</span>
                <span>Low Priority</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-3 pt-4">
        <Button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding Task...
            </>
          ) : (
            '✨ Add Task'
          )}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 pt-2">
        <p>💡 Tip: Use high priority for urgent tasks, medium for important ones, and low for nice-to-have items.</p>
      </div>
    </form>
  );
}