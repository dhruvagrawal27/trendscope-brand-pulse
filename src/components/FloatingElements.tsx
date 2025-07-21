import { useEffect, useRef } from 'react';

export const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      
      containerRef.current.style.transform = `translateY(${parallax}px)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      const elements = containerRef.current.querySelectorAll('.floating-element');
      elements.forEach((element, index) => {
        const intensity = (index + 1) * 10;
        (element as HTMLElement).style.transform = 
          `translate(${x * intensity}px, ${y * intensity}px) rotateX(${y * 5}deg) rotateY(${x * 5}deg)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large floating spheres */}
      <div className="floating-element absolute top-20 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
      <div className="floating-element floating-delayed absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-secondary/30 to-accent/20 blur-lg" />
      <div className="floating-element absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-accent/15 to-primary/25 blur-2xl" />
      
      {/* Medium geometric shapes */}
      <div className="floating-element absolute top-1/2 left-1/5 w-16 h-16 bg-gradient-to-r from-primary/40 to-secondary/40 rotate-45 blur-sm" style={{ borderRadius: '30%' }} />
      <div className="floating-element floating-delayed absolute top-3/4 right-1/3 w-12 h-12 bg-gradient-to-br from-secondary/50 to-accent/30 blur-sm" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      
      {/* Small particles */}
      <div className="floating-element absolute top-1/6 right-1/5 w-4 h-4 rounded-full bg-primary/60 pulse-glow" />
      <div className="floating-element floating-delayed absolute bottom-1/3 left-1/6 w-3 h-3 rounded-full bg-secondary/70 pulse-glow" />
      <div className="floating-element absolute top-2/3 right-1/6 w-5 h-5 rounded-full bg-accent/50 pulse-glow" />
      
      {/* Rotating rings */}
      <div className="floating-element rotate-slow absolute top-1/4 right-1/2 w-20 h-20 border-2 border-primary/30 rounded-full" />
      <div className="floating-element rotate-slow absolute bottom-1/2 left-1/2 w-16 h-16 border border-secondary/40 rounded-full" style={{ animationDirection: 'reverse' }} />
    </div>
  );
};