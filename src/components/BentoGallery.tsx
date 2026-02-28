import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const galleryItems = [
  {
    title: "Il nostro primo viaggio",
    description: "Ricordi indelebili e risate infinite esplorando nuove città mano nella mano.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Cene romantiche",
    description: "I nostri posti preferiti, candele e sguardi che dicono più di mille parole.",
    image: "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Avventure nella natura",
    description: "Passeggiate, tramonti mozzafiato e la pace di stare semplicemente insieme.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Momenti di relax",
    description: "Le domeniche pigre sul divano, i film e le coccole senza fine.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
  }
];

export function BentoGallery() {
  return (
    <>
      <div className="block lg:hidden">
        <MobileGallery />
      </div>
      <div className="hidden lg:block">
        <DesktopGallery />
      </div>
    </>
  );
}

function MobileGallery() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // Translate the container to the left by its own width, minus the viewport width
  // This ensures the last item stops exactly at the right edge of the screen
  const x = useTransform(scrollYProgress, (p) => `calc(-${p * 100}% + ${p * 100}vw)`);

  return (
    <section ref={targetRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-6 w-max">
          
          {/* Intro Text */}
          <div className="w-[85vw] max-w-[400px] shrink-0 flex flex-col justify-center">
            <h2 className="text-4xl font-medium tracking-tight text-[#1a1a1a] mb-6 leading-[1.1]">
              I Nostri Momenti Più Belli
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Rivivi i nostri ricordi più dolci, i viaggi indimenticabili e tutte le piccole cose che rendono la nostra storia unica e speciale.
            </p>
            <button className="bg-[#e86352] text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#d64431] transition-colors w-fit shadow-md">
              <span>Scopri di più</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Cards */}
          {galleryItems.map((item, index) => (
            <div key={index} className="w-[75vw] max-w-[350px] shrink-0 flex flex-col justify-center">
              <div className="rounded-[2rem] overflow-hidden aspect-[4/5] mb-6 bg-gray-100 shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-medium text-[#1a1a1a] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
          
          {/* Spacer for right padding at the end of scroll */}
          <div className="w-2 shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}

function DesktopGallery() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        {/* Left Column - Sticky */}
        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#1a1a1a] mb-6 leading-[1.1]"
          >
            I Nostri Momenti Più Belli
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            Rivivi i nostri ricordi più dolci, i viaggi indimenticabili e tutte le piccole cose che rendono la nostra storia unica e speciale.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#e86352] text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#d64431] transition-colors w-fit group shadow-md hover:shadow-lg"
          >
            <span>Scopri di più</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Right Column - Scrolling Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {galleryItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
              className="flex flex-col"
            >
              <div className="rounded-[2rem] overflow-hidden aspect-[4/5] mb-6 bg-gray-100 shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                />
              </div>
              <h3 className="text-2xl font-medium text-[#1a1a1a] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 text-base leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
