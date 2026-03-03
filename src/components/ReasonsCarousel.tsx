import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import img7 from '../assets/WhatsApp Image 2026-03-03 at 12.24.22 (4).jpeg';
import img8 from '../assets/WhatsApp Image 2026-03-03 at 12.24.22.jpeg';
import img9 from '../assets/WhatsApp Image 2026-03-03 at 12.29.52.jpeg';
import img10 from '../assets/WhatsApp Image 2026-03-03 at 12.29.53 (1).jpeg';
import img11 from '../assets/WhatsApp Image 2026-03-03 at 12.29.53 (2).jpeg';

const reasons = [
  {
    title: "IL TUO SORRISO",
    stats: [
      { value: "100%", label: "ILLUMINA LA MIA GIORNATA" },
      { value: "Infinito", label: "LA GIOIA CHE MI DAI" }
    ],
    image: img7
  },
  {
    title: "LA TUA DOLCEZZA",
    stats: [
      { value: "Unica", label: "COME IL TUO MODO DI FARE" },
      { value: "Sempre", label: "MI FAI SENTIRE AMATO" }
    ],
    image: img8
  },
  {
    title: "LA TUA FORZA",
    stats: [
      { value: "Ispirazione", label: "PER ME OGNI GIORNO" },
      { value: "Coraggio", label: "NELL'AFFRONTARE LA VITA" }
    ],
    image: img9
  },
  {
    title: "I TUOI OCCHI",
    stats: [
      { value: "Profondi", label: "COME L'OCEANO" },
      { value: "Sinceri", label: "IN CUI MI PERDO" }
    ],
    image: img10
  },
  {
    title: "NOI DUE",
    stats: [
      { value: "Insieme", label: "SIAMO PIÙ FORTI" },
      { value: "Per sempre", label: "IL MIO POSTO PREFERITO" }
    ],
    image: img11
  }
];

export function ReasonsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(2);

  const next = () => setCurrentIndex((prev) => (prev + 1) % reasons.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length);

  return (
    <section className="py-24 overflow-hidden flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 md:mb-16"
      >
        Per Te
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full max-w-6xl h-[500px] md:h-[600px] flex items-center justify-center perspective-[1000px]"
      >
        {reasons.map((reason, index) => {
          let diff = index - currentIndex;
          if (diff < -2) diff += reasons.length;
          if (diff > 2) diff -= reasons.length;

          if (Math.abs(diff) > 2) return null;

          const isCenter = diff === 0;
          const xOffset = diff * 40; // percentage
          const scale = 1 - Math.abs(diff) * 0.15;
          const zIndex = 10 - Math.abs(diff);
          const opacity = 1 - Math.abs(diff) * 0.3;

          return (
            <motion.div
              key={index}
              className="absolute w-[80vw] sm:w-[350px] md:w-[450px] h-[400px] md:h-[500px] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl cursor-pointer"
              initial={false}
              animate={{
                x: `${xOffset}%`,
                scale,
                zIndex,
                opacity,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={reason.image} alt={reason.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />

              {isCenter && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white"
                >
                  <h3 className="text-2xl md:text-4xl font-medium tracking-tight uppercase">{reason.title}</h3>

                  <div className="space-y-4 md:space-y-6 max-w-[75%] md:max-w-[60%]">
                    {reason.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-2xl md:text-3xl font-light">{stat.value}</div>
                        <div className="text-[9px] md:text-[10px] font-semibold tracking-widest uppercase opacity-80 mt-1 leading-tight">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute bottom-6 right-6 w-16 h-24 md:w-24 md:h-32 rounded-xl md:rounded-2xl overflow-hidden border-2 border-white/20">
                    <img src={reason.image} alt="detail" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 flex items-center gap-4 bg-black/5 backdrop-blur-sm rounded-full px-4 py-2"
      >
        <button onClick={prev} className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {reasons.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-black' : 'w-1.5 bg-black/30'}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <ChevronRight size={20} />
        </button>
      </motion.div>
    </section>
  );
}
