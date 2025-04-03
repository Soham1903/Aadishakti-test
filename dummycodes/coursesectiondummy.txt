import { motion } from "framer-motion";
import { Book, Star, Clock, Users, X } from "lucide-react";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaPlus, FaChevronDown } from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "रेकी लेवल 1",
    duration: "6 days",
    price: "₹1,575",
    description:
      "आरोग्यप्राप्ती होणे आणि रात्रीची झोप येणे यासारख्या विविध समस्यांसाठी उपयुक्त कार्यशाळा",
    schedule: "सायंकाळी 7:30 - 9:00",
    image:
      "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&q=80&w=800",
    instructor: "सौ चारुशीला श्रीकांत कांबळे",
    benefits: [
      "रेकी शक्ती म्हणजे काय?",
      "रेकी शक्तीचा इतिहास व फायदे",
      "रेकी शक्ती चे मुख्य तत्त्वज्ञान आणि नियम",
      "स्वतःवर रेकी शक्ती कशी घ्यावी",
      "दुसऱ्या व्यक्तींवर रेकी शक्ती कशी द्यावी",
    ],
    includes: ["सर्टिफिकेट", "नोट्स", "रेकॉर्डिंग", "भरपूर प्रॅक्टिस"],
  },
  {
    id: 2,
    title: "वास्तुशास्त्र विशारद",
    duration: "10 days",
    price: "₹2,575",
    description: "वास्तुशास्त्राचे मूलभूत तत्व आणि उपाययोजना शिका",
    schedule: "सायंकाळी 7:00 - 8:30",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    instructor: "सौ चारुशीला श्रीकांत कांबळे",
    benefits: [
      "वास्तुशास्त्राचे मूलभूत तत्त्व",
      "गृह वास्तु",
      "कार्यालय वास्तु",
      "दुकान वास्तु",
      "वास्तुदोष निवारण",
    ],
    includes: ["प्रमाणपत्र", "अभ्यास साहित्य", "ऑनलाइन सपोर्ट"],
  },
  {
    id: 3,
    title: "टॅरो कार्ड रीडिंग",
    duration: "12 days",
    price: "₹3,300",
    description: "Professional Advance Tarot Card Reading Workshop",
    schedule: "सायंकाळी 7:30 - 9:00",
    image:
      "https://images.unsplash.com/photo-1633097254859-6e4e4dde7578?auto=format&fit=crop&q=80&w=800",
    instructor: "सौ चारुशीला श्रीकांत कांबळे",
    benefits: [
      "सम्पूर्ण टेरो कार्ड रिडीग",
      "प्रॅक्टिस सहीत शिक्षण",
      "स्प्रेड कसे मांडावे",
      "जातकाच्या प्रश्नाची उत्तरे",
      "उपाययोजना मार्गदर्शन",
    ],
    includes: ["Recording", "Certificate", "Study Material"],
  },
  {
    id: 4,
    title: "मोबाईल न्यूमरॉलॉजी",
    duration: "4 days",
    price: "₹1,575",
    description:
      "Learn the science of numbers and their influence on mobile numbers",
    schedule: "सायंकाळी 7:00 - 8:30",
    image:
      "https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=800",
    instructor: "सौ चारुशीला श्रीकांत कांबळे",
    benefits: [
      "मोबाईल नंबर मधील अंकांचे परिणाम",
      "भाग्यकारक मोबाईल नंबर",
      "पासवर्ड आणि स्क्रीन लॉक",
      "वैदिक ग्रिड नुसार मोबाईल नंबर",
      "नवीन नंबर निवडण्याची पद्धत",
    ],
    includes: ["प्रमाणपत्र", "नोट्स", "रेकॉर्डिंग"],
  },
  {
    id: 5,
    title: "स्विचवर्ड कार्यशाळा",
    duration: "5 days",
    price: "₹1,575",
    description: "Learn the power of switch words for various life aspects",
    schedule: "सायंकाळी 7:00 - 8:30",
    image:
      "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&q=80&w=800",
    instructor: "स्विच वर्ड ट्रेनर अनिता कलंत्री",
    benefits: [
      "स्विचवर्ड काय आहे",
      "जीवनातील प्रत्येक कामासाठी उपयोग",
      "शिक्षण आणि करिअर साठी स्विचवर्ड",
      "आरोग्य आणि समृद्धी साठी स्विचवर्ड",
      "व्यक्तिमत्व विकासासाठी स्विचवर्ड",
    ],
    includes: ["सर्टिफिकेट", "स्टडी मटेरियल", "प्रॅक्टिकल सेशन्स"],
  },
];

const categories = [
  "All Courses",
  "Reiki",
  "वास्तुशास्त्र",
  "Numerology",
  "टॅरो कार्ड",
  "स्विचवर्ड",
  "ज्योतिष",
  "संमोहन",
  "योगा",
];

function CourseDetailsModal({ course, onClose, onAddToCart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover rounded-lg mb-6"
          />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>{course.schedule}</span>
              </div>
              <span className="text-2xl font-bold text-[#921a40]">
                {course.price}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Course Benefits:</h3>
              <ul className="space-y-2">
                {course.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Star className="h-5 w-5 text-[#921a40] flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Course Includes:</h3>
              <ul className="space-y-2">
                {course.includes.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Book className="h-5 w-5 text-[#921a40] flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="h-5 w-5" />
              <span>Instructor: {course.instructor}</span>
            </div>

            <button
              onClick={() => {
                onAddToCart(course);
                onClose();
              }}
              className="w-full bg-[#921a40] text-white py-3 rounded-lg hover:bg-[#7d1636] transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <FaShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [cart, setCart] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCourses =
    selectedCategory === "All Courses"
      ? courses
      : courses.filter((course) => course.title.includes(selectedCategory));

  const addToCart = (course) => {
    if (!cart.find((item) => item.id === course.id)) {
      setCart([...cart, course]);
    }
  };

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Cart */}
        <div className="flex justify-between items-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900"
          >
            Our Courses
          </motion.h1>
          <div className="relative">
            <FaShoppingCart className="h-6 w-6 text-[#921a40]" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#921a40] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Dropdown for Mobile and Tablet */}
          <div className="md:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#921a40] text-white px-4 py-2 rounded-lg flex items-center justify-between"
            >
              <span>{selectedCategory}</span>
              <FaChevronDown className="h-5 w-5" />
            </button>
            {isDropdownOpen && (
              <div className="mt-2 bg-white rounded-lg shadow-sm">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-[#921a40] text-white"
                        : "hover:bg-[#FDF7FF] hover:text-[#921a40]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Categories Sidebar for Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block md:w-64 bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? "bg-[#921a40] text-white"
                      : "hover:bg-[#FDF7FF] hover:text-[#921a40]"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Courses Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#921a40] font-semibold">
                        {course.price}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="bg-[#921a40] text-white px-4 py-2 rounded-lg hover:bg-[#7d1636] transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => addToCart(course)}
                          className="bg-[#921a40] text-white p-2 rounded-lg hover:bg-[#7d1636] transition-colors"
                        >
                          <FaPlus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}
