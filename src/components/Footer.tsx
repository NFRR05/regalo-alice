import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer
      className="bg-black text-white pt-40 md:pt-64 pb-8 px-4 md:px-8 relative min-h-[100svh] md:min-h-0 flex flex-col justify-end overflow-hidden"
      style={{ clipPath: 'inset(-100% 0 0 0)' }}
    >
      {/* Huge Text and Overlapping Image Container */}
      <div className="mt-auto md:mt-12 w-full relative flex justify-center items-end">

        {/* The Flower Image - Positioned absolutely to overlap the text and stem from the left border */}
        <motion.img
          initial={{ x: "-30vw", y: "15vw", opacity: 0, rotate: -20 }}
          whileInView={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} // Custom spring-like ease out
          viewport={{ once: true, margin: "100px" }}
          src="https://i.postimg.cc/wMm6q2b5/nobgflower.png"
          alt="Flower"
          className="absolute -left-[30%] md:-left-[15%] lg:-left-[10%] bottom-0 w-[140vw] md:w-[80vw] lg:w-[70vw] max-w-[1200px] object-contain z-20 pointer-events-none drop-shadow-2xl"
        />

        {/* The Huge Text */}
        <h1 className="text-[25vw] md:text-[22vw] font-bold tracking-tighter leading-none text-center relative z-10 w-full">
          Love<span className="text-[8vw] md:text-[6vw] align-top relative -top-[2vw]">®</span>
        </h1>
      </div>

      <div className="mt-12 text-center text-xs opacity-50 relative z-30">
        <p>© 2026</p>
      </div>
    </footer>
  );
}
