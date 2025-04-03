import { motion } from "framer-motion";
import { Book, Star, Clock, Users, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";

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
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <img
            src={`data:${course.image.contentType};base64,${course.image.data.toString("base64")}`}
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
                ${course.price}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Course Benefits:</h3>
              <ul className="space-y-2">
                {course.benefits?.map((benefit, index) => (
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
                {course.includes?.map((item, index) => (
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

export default CourseDetailsModal;