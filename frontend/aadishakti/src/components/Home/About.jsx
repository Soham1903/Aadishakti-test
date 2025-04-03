import { motion } from 'framer-motion';
import { Moon, Sun, Stars } from 'lucide-react';

const About = () => {
  return (
    <section className="py-16 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/aboutimg1.jpg')] bg-cover bg-center opacity-5" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#921a40] to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover the Ancient Wisdom of Astrology
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-6 text-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Embark on a mystical journey through the cosmos as we unveil the secrets written in the stars. Our expert astrologers combine ancient wisdom with modern insights to illuminate your path through life's greatest mysteries.
            </motion.p>
            <motion.p 
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Whether you seek guidance in love, career, or personal growth, our comprehensive astrological services provide clarity and direction through the ancient art of celestial divination.
            </motion.p>
            <motion.div 
              className="space-y-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#921a40]/10 flex items-center justify-center">
                  <Moon className="w-7 h-7 text-[#921a40]" />
                </div>
                <div>
                  <h3 className="font-semibold">Lunar Guidance</h3>
                  <p className="text-gray-500">Harness the moon's energy for personal transformation</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#921a40]/10 flex items-center justify-center">
                  <Sun className="w-7 h-7 text-[#921a40]" />
                </div>
                <div>
                  <h3 className="font-semibold">Solar Empowerment</h3>
                  <p className="text-gray-500">Align with the sun's vital force for success</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#921a40]/10 flex items-center justify-center">
                  <Stars className="w-7 h-7 text-[#921a40]" />
                </div>
                <div>
                  <h3 className="font-semibold">Stellar Insights</h3>
                  <p className="text-gray-500">Decode the messages hidden in the stars</p>
                </div>
              </div>
            </motion.div>
            <motion.button 
              className="bg-[#921a40] text-white px-8 py-4 rounded-full hover:bg-[#7a1635] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Your Journey
            </motion.button>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.img
              src="/assets/aboutimg1.jpg"
              alt="Astrology Chart"
              className="rounded-2xl shadow-2xl w-full h-[350px] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.img
              src="/assets/aboutimg2.jpg"
              alt="Tarot Reading"
              className="rounded-2xl shadow-2xl w-full h-[350px] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
