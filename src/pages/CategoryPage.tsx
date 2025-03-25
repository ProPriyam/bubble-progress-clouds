
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BubbleCloud from '../components/BubbleCloud';
import CheckboxList from '../components/CheckboxList';
import ProgressBar from '../components/ProgressBar';
import { useProgress } from '../context/ProgressContext';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { categories, toggleSubtask, calculateTaskProgress } = useProgress();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // Find the category
  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Category not found</p>
        <button 
          className="mt-4 flex items-center text-primary hover:underline"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="mr-1" /> Return Home
        </button>
      </div>
    );
  }

  const handleBubbleClick = (taskId: string) => {
    setSelectedTask(taskId);
  };

  const handleToggleSubtask = (subtaskId: string) => {
    if (selectedTask) {
      toggleSubtask(category.id, selectedTask, subtaskId);
    }
  };

  const selectedTaskData = selectedTask 
    ? category.tasks.find(t => t.id === selectedTask) 
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-6 flex items-center">
        <button 
          className="flex items-center hover:text-primary transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back</span>
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
        </div>
        <div className="w-[80px]"></div> {/* Spacer to center title */}
      </header>

      <div className="px-6 py-4 max-w-xl mx-auto w-full">
        <div className="glass-panel p-4 mb-6">
          <h2 className="text-lg font-medium mb-2">Overall Progress</h2>
          <ProgressBar value={category.progress} height={8} />
        </div>
      </div>

      <main className="flex-1 w-full relative">
        <div className={`transition-opacity duration-500 ${selectedTask ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <BubbleCloud 
            items={category.tasks.map(task => ({
              id: task.id,
              name: task.name,
              progress: calculateTaskProgress(category.id, task.id)
            }))} 
            onBubbleClick={handleBubbleClick}
          />
        </div>

        {selectedTask && selectedTaskData && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative w-full">
              <button 
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-secondary rounded-full p-2 hover:bg-secondary/80 transition-colors"
                onClick={() => setSelectedTask(null)}
              >
                <ArrowLeft size={20} />
              </button>
              
              <CheckboxList 
                title={selectedTaskData.name}
                items={selectedTaskData.subtasks} 
                onToggle={handleToggleSubtask}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        {!selectedTask ? (
          <p>Click on a bubble to view tasks</p>
        ) : (
          <p>Check items to update progress</p>
        )}
      </footer>
    </div>
  );
};

export default CategoryPage;
