import TaskManager from '@/components/TaskManager';
import AppHeader from '@/components/AppHeader';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AppHeader />
          <TaskManager />
        </div>
      </div>
    </main>
  );
}