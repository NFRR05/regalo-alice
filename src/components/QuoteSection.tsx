import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { useRef, ReactNode } from 'react';

function AnimatedCharacter({ 
  char, 
  progress, 
  start, 
  end 
}: { 
  char: ReactNode; 
  progress: MotionValue<number>; 
  start: number; 
  end: number; 
}) {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  return <motion.span style={{ opacity }} className="inline-block">{char}</motion.span>;
}

export function QuoteSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Change offset to ensure the animation completes before the element leaves the viewport
    offset: ["start center", "end end"]
  });

  // The full text split into words and icons
  const tokens = [
    "Sei", "la", "persona", "più", "incredibile", "che", "io", "conosca.", 
    "Ogni", "giorno", "con", "te", 
    { isIcon: true, element: <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-pink-400 inline-block align-middle mx-1 -mt-2" /> }, 
    "è", "una", "magia,", "una", "scoperta", "continua,", "e", "un", "amore", "che", "cresce", "sempre", "di", "più.",
    { isIcon: true, element: <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-orange-400 inline-block align-middle mx-1 -mt-2" /> }
  ];

  // Calculate total characters for staggering
  const totalChars = tokens.reduce((acc, token) => {
    if (typeof token === 'string') return acc + Array.from(token).length;
    return acc + 1; // icon is 1 char equivalent
  }, 0);

  let globalCharIndex = 0;

  return (
    // The container is very tall (300vh) to allow for a long scrolling duration
    <section ref={containerRef} className="h-[300vh] relative">
      
      {/* The sticky content that stays in view while scrolling */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
        
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#1A1A1A] leading-[1.2] flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-y-4">
            {tokens.map((token, wordIndex) => {
              if (typeof token === 'string') {
                const chars = Array.from(token);
                return (
                  <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {chars.map((char, charIndex) => {
                      const currentGlobalIndex = globalCharIndex++;
                      const start = (currentGlobalIndex / totalChars) * 0.8;
                      const end = start + (1 / totalChars) * 0.8;
                      
                      return (
                        <AnimatedCharacter 
                          key={charIndex} 
                          char={char} 
                          progress={scrollYProgress} 
                          start={start} 
                          end={end} 
                        />
                      );
                    })}
                  </span>
                );
              } else {
                // Icon token
                const currentGlobalIndex = globalCharIndex++;
                const start = (currentGlobalIndex / totalChars) * 0.8;
                const end = start + (1 / totalChars) * 0.8;
                
                return (
                  <span key={wordIndex} className="inline-block whitespace-nowrap">
                    <AnimatedCharacter 
                      char={token.element} 
                      progress={scrollYProgress} 
                      start={start} 
                      end={end} 
                    />
                  </span>
                );
              }
            })}
          </h2>
        </div>
        
      </div>
    </section>
  );
}
