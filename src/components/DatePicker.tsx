'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { taskUtils } from '@/lib/taskUtils';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onClose: () => void;
}

export default function DatePicker({ selectedDate, onDateChange, onClose }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = taskUtils.parseDateString(selectedDate);
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  const today = new Date();
  const todayString = taskUtils.formatDateToString(today);
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    
    // Start from Sunday
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      days.push({
        date: new Date(date),
        dateString: taskUtils.formatDateToString(date),
        isCurrentMonth: date.getMonth() === month,
        isToday: taskUtils.formatDateToString(date) === todayString,
        isSelected: taskUtils.formatDateToString(date) === selectedDate,
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    onDateChange(todayString);
    onClose();
  };

  const handleDateSelect = (dateString: string) => {
    onDateChange(dateString);
    onClose();
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
            ←
          </Button>
          
          <div className="text-center">
            <h3 className="font-semibold text-lg">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
          </div>
          
          <Button variant="outline" size="sm" onClick={goToNextMonth}>
            →
          </Button>
        </div>

        {/* Today Button */}
        <div className="mb-4 text-center">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Go to Today
          </Button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => handleDateSelect(day.dateString)}
              className={`
                h-10 w-full p-0 text-sm transition-all duration-200
                ${!day.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                ${day.isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                ${day.isToday && !day.isSelected ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800' : ''}
                ${!day.isSelected && !day.isToday ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
              `}
            >
              {day.date.getDate()}
            </Button>
          ))}
        </div>

        {/* Close Button */}
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" onClick={onClose} className="w-full">
            Close Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}