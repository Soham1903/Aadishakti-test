import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TopCourses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const courses = [
    {
      id: 1,
      title: "Vedic Astrology Fundamentals",
      price: 199,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=600",
      description: "Master the ancient wisdom of Vedic astrology and unlock the secrets of the cosmos."
    },
    {
      id: 2,
      title: "Numerology Mastery",
      price: 149,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?auto=format&fit=crop&q=80&w=600",
      description: "Discover how numbers influence your life path and destiny through ancient numerology."
    },
    {
      id: 3,
      title: "Tarot Reading Professional",
      price: 299,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1566677914817-56426959ae9c?auto=format&fit=crop&q=80&w=600",
      description: "Learn the art of tarot reading from expert practitioners and unlock your intuitive abilities."
    },
    {
      id: 4,
      title: "Planetary Influences",
      price: 179,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
      description: "Understand how planetary movements affect your daily life and future prospects."
    },
    {
      id: 5,
      title: "Birth Chart Analysis",
      price: 249,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?auto=format&fit=crop&q=80&w=600",
      description: "Master the art of interpreting birth charts and providing accurate readings."
    },
    {
      id: 6,
      title: "Advanced Horoscope Reading",
      price: 399,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1515942661900-94b3d1972591?auto=format&fit=crop&q=80&w=600",
      description: "Take your horoscope reading skills to the next level with advanced techniques."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= courses.length - 3 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= courses.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? courses.length - 3 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-[#921a40]/5 to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Top Selling Courses</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Embark on a transformative journey through our carefully curated courses, designed to deepen your understanding of the celestial arts.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center text-white">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-2">{course.rating}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-[#921a40]">${course.price}</span>
                        <button className="bg-[#921a40] text-white px-4 py-2 rounded-full hover:bg-[#7a1635] transition-colors duration-300">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-[#921a40]" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-[#921a40]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopCourses;