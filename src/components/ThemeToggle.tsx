'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  const getThemeIcon = () => {
    switch (actualTheme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      default:
        return '☀️';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'Theme';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 min-w-[90px]"
        >
          <span className="text-lg">{getThemeIcon()}</span>
          <span className="text-sm">{getThemeLabel()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <span className="text-lg">☀️</span>
          <span>Light Mode</span>
          {theme === 'light' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <span className="text-lg">🌙</span>
          <span>Dark Mode</span>
          {theme === 'dark' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <span className="text-lg">🖥️</span>
          <span>System</span>
          {theme === 'system' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Simple toggle button version (alternative)
export function SimpleThemeToggle() {
  const { actualTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(actualTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="flex items-center space-x-2"
      title={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="text-lg">
        {actualTheme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="text-sm">
        {actualTheme === 'light' ? 'Dark' : 'Light'}
      </span>
    </Button>
  );
}