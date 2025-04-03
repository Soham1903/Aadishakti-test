import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Stats = () => {
  const [counts, setCounts] = useState({
    clients: 0,
    consultations: 0,
    accuracy: 0,
    experts: 0
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const targets = {
    clients: 5000,
    consultations: 15000,
    accuracy: 98,
    experts: 50
  };

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setCounts(prev => ({
          clients: prev.clients < targets.clients ? Math.min(prev.clients + 100, targets.clients) : prev.clients,
          consultations: prev.consultations < targets.consultations ? Math.min(prev.consultations + 300, targets.consultations) : prev.consultations,
          accuracy: prev.accuracy < targets.accuracy ? Math.min(prev.accuracy + 2, targets.accuracy) : prev.accuracy,
          experts: prev.experts < targets.experts ? Math.min(prev.experts + 1, targets.experts) : prev.experts
        }));
      }, interval);

      return () => clearInterval(timer);
    }
  }, [inView]);

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#921a40]/5 transform -skew-y-6" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our Cosmic Achievements
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div 
            className="text-center"
            variants={statVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[#921a40] mb-2">{counts.clients.toLocaleString()}+</div>
            <p className="text-gray-600">Happy Souls Guided</p>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={statVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[#921a40] mb-2">{counts.consultations.toLocaleString()}+</div>
            <p className="text-gray-600">Celestial Consultations</p>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={statVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[#921a40] mb-2">{counts.accuracy}%</div>
            <p className="text-gray-600">Prediction Accuracy</p>
          </motion.div>
          <motion.div 
            className="text-center"
            variants={statVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[#921a40] mb-2">{counts.experts}+</div>
            <p className="text-gray-600">Master Astrologers</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stats;