import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const floatingImages = [
  { src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=500&auto=format&fit=crop", size: "18vmin", radius: "38vmin", angle: 0 },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop", size: "14vmin", radius: "45vmin", angle: 45 },
  { src: "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?q=80&w=500&auto=format&fit=crop", size: "22vmin", radius: "32vmin", angle: 90 },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop", size: "16vmin", radius: "48vmin", angle: 135 },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop", size: "20vmin", radius: "36vmin", angle: 180 },
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=500&auto=format&fit=crop", size: "15vmin", radius: "44vmin", angle: 225 },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop", size: "19vmin", radius: "34vmin", angle: 270 },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop", size: "17vmin", radius: "46vmin", angle: 315 },
];

export function Hero() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // 0 to 0.2: Video shrinks
  const shrinkProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  // Use CSS calc to interpolate between 100vw/vh and the target sizes
  const width = useTransform(shrinkProgress, p => `calc(100vw - ${p} * (100vw - min(90vw, 900px)))`);
  const height = useTransform(shrinkProgress, p => `calc(100vh - ${p} * (100vh - min(60vw, 600px)))`);
  const borderRadius = useTransform(shrinkProgress, p => `${p * 32}px`);

  // 0.2 to 0.3: Images fade in
  const imagesOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  
  // 0.2 to 1.0: Images orbit
  const globalRotation = useTransform(scrollYProgress, [0.2, 1], [0, 360]);
  const negativeGlobalRotation = useTransform(scrollYProgress, [0.2, 1], [0, -360]);

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
    <section ref={ref} className="relative h-[400vh] w-full bg-[#fafafa]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Orbiting Images */}
        {floatingImages.map((img, i) => {
          // Alternate z-index so some images pass in front of the video and some behind
          const isFront = i % 2 === 0;
          return (
            <motion.div 
              key={i}
              style={{ opacity: imagesOpacity, rotate: globalRotation }}
              className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isFront ? 'z-20' : 'z-0'}`}
            >
              <div 
                className="absolute"
                style={{ transform: `rotate(${img.angle}deg) translate(${img.radius})` }}
              >
                {/* Counter-rotate to keep images upright */}
                <motion.div style={{ rotate: negativeGlobalRotation }}>
                  <div style={{ transform: `rotate(${-img.angle}deg)` }}>
                    <img 
                      src={img.src} 
                      style={{ width: img.size, height: img.size }} 
                      className="rounded-2xl object-cover shadow-2xl border-4 border-white" 
                      alt=""
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}

        {/* Central Video */}
        <motion.div 
          style={{ width, height, borderRadius }} 
          className="relative overflow-hidden z-10 shadow-2xl bg-black"
        >
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-90"
          >
            <source src="https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4" type="video/mp4" />
            Il tuo browser non supporta i video.
          </video>
          <div className="absolute inset-0 bg-black/20" />

          {/* Top Navigation Overlay */}
          <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-center items-center z-30 text-white">
            <div className="text-4xl md:text-5xl font-bold tracking-tighter lowercase">
              alice
            </div>
          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-30 text-white">
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
        </motion.div>

      </div>
    </section>
  );
}
