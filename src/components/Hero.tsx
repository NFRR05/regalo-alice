import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

import img1 from '../assets/WhatsApp Image 2026-03-03 at 12.24.21 (1).jpeg';
import img2 from '../assets/WhatsApp Image 2026-03-03 at 12.24.21 (2).jpeg';
import img3 from '../assets/WhatsApp Image 2026-03-03 at 12.24.21.jpeg';
import img4 from '../assets/WhatsApp Image 2026-03-03 at 12.24.22 (1).jpeg';
import img5 from '../assets/WhatsApp Image 2026-03-03 at 12.24.22 (2).jpeg';
import img6 from '../assets/WhatsApp Image 2026-03-03 at 12.24.22 (3).jpeg';

import mainVideo from '../assets/WhatsApp Video 2026-03-03 at 12.33.21.mp4';

const FLOATING_IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6
].map((src, i, arr) => {
  const angle = (i / arr.length) * Math.PI * 2;
  const radiusX = 30 + ((i % 3) * 6); // 30, 36, 42 vw
  const radiusY = 28 + ((i % 3) * 6); // 28, 34, 40 vh
  const sizeValue = 15 + ((i % 2) * 10); // 15vw or 25vw
  return {
    src,
    id: i,
    x: Math.cos(angle) * radiusX,
    y: Math.sin(angle) * radiusY,
    size: `clamp(140px, ${sizeValue}vw, 350px)`,
  };
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Video shrinks from 100% -> 60%x40% between 0 and 0.4 progress
  const videoWidth = useTransform(smoothProgress, [0, 0.4], ["100%", "60%"]);
  const videoHeight = useTransform(smoothProgress, [0, 0.4], ["100%", "40%"]);

  // Images appear and scale up between 0.4 and 0.6
  const imagesOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const imagesScale = useTransform(smoothProgress, [0.4, 0.6], [0.5, 1]);

  // Title fades out completely on mobile when box shrinks
  const mobileTitleOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full overflow-x-clip">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-2 md:p-4 bg-transparent">

        {/* Circling Images Layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
          style={{ opacity: imagesOpacity, scale: imagesScale }}
        >
          {/* Main spinning container */}
          <div className="relative w-full h-full max-w-[100vw] max-h-[100vh] flex items-center justify-center animate-[spin_60s_linear_infinite]">
            {FLOATING_IMAGES.map((img) => (
              <div
                key={img.id}
                className="absolute"
                style={{
                  transform: `translate(${img.x}vw, ${img.y}vh)`
                }}
              >
                {/* Counter-spin so images don't go upside down */}
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                  style={{
                    width: img.size,
                    height: img.size,
                    animation: 'spin 60s linear infinite',
                    animationDirection: 'reverse'
                  }}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Video Container */}
        <motion.div
          style={{ width: videoWidth, height: videoHeight }}
          className="relative rounded-2xl md:rounded-[2rem] overflow-hidden z-10 shadow-2xl"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
          >
            <source src={mainVideo} type="video/mp4" />
            Il tuo browser non supporta i video.
          </video>
          <div className="absolute inset-0 bg-black/20" />

          {/* Top Navigation Overlay */}
          <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-center items-center text-white">
            <motion.div style={{ opacity: mobileTitleOpacity }} className="text-4xl font-bold tracking-tighter lowercase md:hidden pointer-events-none">
              Love
            </motion.div>
            <div className="hidden md:block text-5xl font-bold tracking-tighter lowercase pointer-events-none">
              Love
            </div>
          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-white">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-2">
                Dal banco di scuola a noi.
              </h1>
              <button className="border border-white rounded-full px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors pointer-events-auto">
                Scopri di più
              </button>
            </div>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/20 transition-colors shrink-0 self-end md:self-auto pointer-events-auto"
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
