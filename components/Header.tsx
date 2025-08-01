
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 w-full p-4 z-20">
      <h1 className="text-2xl font-bold text-white tracking-wider" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
        ScrollyTime
      </h1>
    </header>
  );
};

export default Header;
