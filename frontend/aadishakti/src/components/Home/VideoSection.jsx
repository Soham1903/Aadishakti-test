import { Play } from 'lucide-react';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.9 });

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Magic of Celestial Wisdom</h2>
            <p className="text-gray-600 mb-6">
              Dive into the mystical world of astrology through our curated collection of educational content. Our videos combine ancient wisdom with modern understanding to help you grasp the profound impact of celestial bodies on your life.
            </p>
            <div className="space-y-4">
              {["Planetary Movements", "Birth Chart Analysis", "Zodiac Insights"].map((title, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <div className="w-12 h-12 rounded-full bg-[#921a40]/10 flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#921a40]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-gray-500">
                      {index === 0 && "Understanding how planets influence your daily life"}
                      {index === 1 && "Learn to read and interpret astrological charts"}
                      {index === 2 && "Deep dive into each zodiac sign's unique characteristics"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            ref={ref}
            className="relative w-full rounded-xl overflow-hidden shadow-lg"
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ boxShadow: "0px 4px 10px #D9ABAB" }}
          >
            <video
              className="w-full h-80 md:h-96 object-cover rounded-xl"
              src="/assets/astro2.mp4"
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;