
import React from 'react';
import type { Story } from '../types';

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <section className="h-screen w-screen snap-center flex-shrink-0 relative flex items-end justify-center">
      {/* Animated Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-kenburns"
        style={{ backgroundImage: `url(${story.imageUrl})` }}
      ></div>
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Story Content */}
      <div className="relative z-10 p-6 pb-20 text-white max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
          {story.title}
        </h2>
        <p className="text-base md:text-lg leading-relaxed whitespace-pre-line" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.9)' }}>
          {story.story}
        </p>
      </div>
    </section>
  );
};

export default StoryCard;
