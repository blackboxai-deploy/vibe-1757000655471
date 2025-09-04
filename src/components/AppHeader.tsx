'use client';

import { ThemeToggle, SimpleThemeToggle } from './ThemeToggle';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AppHeaderProps {
  useSimpleToggle?: boolean;
}

export default function AppHeader({ useSimpleToggle = false }: AppHeaderProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 border-blue-200/50 dark:border-blue-800/50 transition-colors duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">📋</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Daily Planner
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {currentDate}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="hidden sm:inline-flex transition-colors duration-300">
              📊 Productivity Tracker
            </Badge>
            {useSimpleToggle ? <SimpleThemeToggle /> : <ThemeToggle />}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Stay organized and track your daily tasks
          </p>
        </div>
      </CardContent>
    </Card>
  );
}