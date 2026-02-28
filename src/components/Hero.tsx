import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export function Hero() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center p-2 md:p-4">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-90"
          >
            {/* Sostituisci questo link con l'URL del tuo video */}
            <source src="https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4" type="video/mp4" />
            Il tuo browser non supporta i video.
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Top Navigation Overlay */}
        <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-center items-center z-20 text-white">
          <div className="text-4xl md:text-5xl font-bold tracking-tighter lowercase">
            alice
          </div>
        </div>

        {/* Bottom Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-20 text-white">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl font-medium tracking-tight mb-6"
            >
              Il nostro viaggio insieme.
            </motion.h1>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="border border-white rounded-full px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              Scopri di più
            </motion.button>
          </div>

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            onClick={togglePlay}
            className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/20 transition-colors shrink-0 self-end md:self-auto"
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
