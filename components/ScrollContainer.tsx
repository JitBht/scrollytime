
import React from 'react';
import type { Story } from '../types';
import StoryCard from './StoryCard';

interface ScrollContainerProps {
  stories: Story[];
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ stories }) => {
  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
};

export default ScrollContainer;
