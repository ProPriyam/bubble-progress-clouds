
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BubbleCloud from '../components/BubbleCloud';
import { useProgress } from '../context/ProgressContext';

const Index = () => {
  const { categories } = useProgress();
  const navigate = useNavigate();

  const handleBubbleClick = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-8 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Progress Bubbles</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Track your progress with interactive bubbles. Click on any bubble to explore further.
        </p>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4">
        <BubbleCloud 
          items={categories.map(category => ({
            id: category.id,
            name: category.name,
            progress: category.progress
          }))} 
          onBubbleClick={handleBubbleClick}
        />
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Click on bubbles to explore categories</p>
      </footer>
    </div>
  );
};

export default Index;
