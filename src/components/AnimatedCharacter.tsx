import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Eye, Zap } from 'lucide-react';

export const AnimatedCharacter = () => {
  const characterRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollDirection(direction);
      setLastScrollY(currentScrollY);

      if (characterRef.current) {
        const scrollPercent = currentScrollY / (document.body.scrollHeight - window.innerHeight);
        const scale = 1 + scrollPercent * 0.5; // Grows as user scrolls
        const rotation = scrollPercent * 360; // Rotates based on scroll
        const translateY = direction === 'down' ? scrollPercent * 20 : -scrollPercent * 20;

        characterRef.current.style.transform = 
          `scale(${scale}) rotateY(${rotation}deg) translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      ref={characterRef}
      className="relative w-64 h-64 mx-auto transition-transform duration-700 ease-out"
      style={{ perspective: '1000px' }}
    >
      {/* Main character body */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-2xl floating-element">
        {/* Character face */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/90 to-white/70 flex items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-4 mb-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-dark to-secondary-dark flex items-center justify-center">
              <Eye className="w-3 h-3 text-white" />
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-dark to-secondary-dark flex items-center justify-center">
              <Eye className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        
        {/* Character arms/appendages */}
        <div className="absolute -left-8 top-1/3 w-16 h-4 rounded-full bg-gradient-to-r from-primary to-secondary floating-delayed" />
        <div className="absolute -right-8 top-1/3 w-16 h-4 rounded-full bg-gradient-to-r from-secondary to-accent floating-element" />
        
        {/* Data visualization elements floating around */}
        <div className="absolute -top-6 left-1/4 floating-element">
          <div className="bg-white/90 rounded-lg p-2 shadow-lg">
            <TrendingUp className="w-4 h-4 text-primary-dark" />
          </div>
        </div>
        
        <div className="absolute -bottom-6 right-1/4 floating-delayed">
          <div className="bg-white/90 rounded-lg p-2 shadow-lg">
            <Users className="w-4 h-4 text-secondary-dark" />
          </div>
        </div>
        
        <div className="absolute top-1/4 -right-8 floating-element">
          <div className="bg-white/90 rounded-lg p-2 shadow-lg">
            <Zap className="w-4 h-4 text-accent" />
          </div>
        </div>
      </div>
      
      {/* Orbiting elements */}
      <div className="absolute inset-0 rotate-slow">
        <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/2 w-3 h-3 rounded-full bg-secondary -translate-x-1/2 translate-y-1/2" />
        <div className="absolute left-0 top-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-0 top-1/2 w-3 h-3 rounded-full bg-primary-dark translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};