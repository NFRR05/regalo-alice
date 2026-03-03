import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

import img12 from '../assets/WhatsApp Image 2026-03-03 at 12.29.53 (3).jpeg';
import img13 from '../assets/WhatsApp Image 2026-03-03 at 12.29.53.jpeg';
import img14 from '../assets/WhatsApp Image 2026-03-03 at 12.33.22 (1).jpeg';
import img15 from '../assets/WhatsApp Image 2026-03-03 at 12.33.22.jpeg';
import img16 from '../assets/WhatsApp Image 2026-03-03 at 12.33.23.jpeg';

const galleryItems = [
  {
    title: "Vacanza in Albania",
    description: "Orizzonti nuovi e scoperte.",
    image: img12
  },
  {
    title: "Estate in Corsica",
    description: "Il blu del mare.",
    image: img13
  },
  {
    title: "Lago d'Iseo",
    description: "La nostra fuga perfetta.",
    image: img14
  },
  {
    title: "Le cannette insieme",
    description: "Semplicità e complicità.",
    image: img15
  },
  {
    title: "Solo un inizio...",
    description: "...Insieme a te!",
    image: img16
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
