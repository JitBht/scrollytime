
import React, { useState, useEffect, useCallback } from 'react';
import { Story } from './types';
import { generateStories } from './services/geminiService';
import ScrollContainer from './components/ScrollContainer';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';

const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadInitialStories = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const fetchedStories = await generateStories();
      setStories(fetchedStories);
    } catch (err) {
      console.error(err);
      setError('Oops! We couldn\'t create any stories right now. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center text-white p-8">
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-300">Something Went Wrong</h2>
            <p className="text-red-200">{error}</p>
            <button
              onClick={loadInitialStories}
              className="mt-6 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (stories.length > 0) {
      return <ScrollContainer stories={stories} />;
    }

    return null;
  };

  return (
    <main className="h-screen w-screen bg-black overflow-hidden">
      <Header />
      {renderContent()}
    </main>
  );
};

export default App;
