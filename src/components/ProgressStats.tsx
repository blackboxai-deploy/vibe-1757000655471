'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ProgressStatsProps {
  stats: {
    total: number;
    completed: number;
    progress: number;
  };
  isToday: boolean;
  displayDate: string;
}

export default function ProgressStats({ stats, isToday, displayDate }: ProgressStatsProps) {
  const getProgressColor = () => {
    if (stats.progress === 100) return 'text-green-600 dark:text-green-400';
    if (stats.progress >= 75) return 'text-blue-600 dark:text-blue-400';
    if (stats.progress >= 50) return 'text-yellow-600 dark:text-yellow-400';
    if (stats.progress >= 25) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };



  const getMotivationMessage = () => {
    if (stats.total === 0) {
      return isToday ? "Ready to start your day? Add some tasks!" : "No tasks planned for this day.";
    }
    
    if (stats.progress === 100) {
      return isToday ? "🎉 Amazing! You've completed all tasks today!" : "🎉 All tasks completed for this day!";
    }
    
    if (stats.progress >= 75) {
      return "💪 Great progress! You're almost there!";
    }
    
    if (stats.progress >= 50) {
      return "👍 Good work! Keep it up!";
    }
    
    if (stats.progress >= 25) {
      return "🚀 You've made a start! Keep going!";
    }
    
    return "⏰ Let's get started on those tasks!";
  };

  const getStreakEmoji = () => {
    if (stats.progress === 100) return "🌟";
    if (stats.progress >= 75) return "🔥";
    if (stats.progress >= 50) return "⚡";
    if (stats.progress >= 25) return "💡";
    return "🎯";
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 transition-colors duration-300">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isToday ? "Today's Progress" : `Progress for ${displayDate}`}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getMotivationMessage()}
              </p>
            </div>
            
            <div className="text-3xl">
              {getStreakEmoji()}
            </div>
          </div>

          {/* Progress Bar */}
          {stats.total > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Completion Progress</span>
                <span className={`font-medium ${getProgressColor()}`}>
                  {stats.progress}%
                </span>
              </div>
              
              <Progress 
                value={stats.progress} 
                className="h-3"
                style={{
                  background: 'rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Total Tasks
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.completed}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Completed
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.total - stats.completed}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Remaining
              </div>
            </div>
          </div>

          {/* Achievement Badge */}
          {stats.progress === 100 && stats.total > 0 && (
            <div className="flex justify-center">
              <Badge className="bg-green-500 hover:bg-green-600 text-white px-4 py-1">
                ✨ Day Complete! ✨
              </Badge>
            </div>
          )}

          {/* Quick Stats */}
          {stats.total > 0 && (
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
              {stats.progress > 0 && stats.progress < 100 && (
                <p>
                  {stats.completed} of {stats.total} tasks completed
                  {stats.total - stats.completed === 1 ? ' • 1 task remaining' : ` • ${stats.total - stats.completed} tasks remaining`}
                </p>
              )}
              {stats.progress === 0 && stats.total > 0 && (
                <p>Ready to tackle {stats.total} task{stats.total === 1 ? '' : 's'}? Let's go! 🚀</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}