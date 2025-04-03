import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
// import { UserContext } from "../UserContext";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();
  // const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/api/courses/get")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setFilteredCourses(data);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  useEffect(() => {
    handleSearchAndSort();
  }, [searchTerm, sortOption]);

  const handleCourseClick = (title) => {
    navigate(`/courses/${title}`);
  };

  const handleSearchAndSort = () => {
    let tempCourses = [...courses];

    if (searchTerm) {
      tempCourses = tempCourses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "priceLowHigh") {
      tempCourses.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      tempCourses.sort((a, b) => b.price - a.price);
    }
    setFilteredCourses(tempCourses);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f3f5] to-[#ffffff] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-2 w-full md:w-1/2">
            <Search className="text-[#921a40]" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#921a40]/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-[#921a40]" />
            <select
              className="p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#921a40]/50"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-lg">Loading Courses..</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                key={course._id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl border border-[#921a40]/10 flex flex-col justify-between"
              >
                <div className="relative">
                  <img
                    src={`data:${course.image.contentType};base64,${course.image.imageBase64}`}
                    alt={course.title}
                    className="w-full h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <h3 className="text-xl font-bold text-[#921a40] mb-2">
                    {course.title}
                  </h3>
                  <div className="text-xl font-semibold text-gray-800 mb-4">
                    ₹ {course.price}
                  </div>

                  <div className="space-y-3 mt-auto">
                    <button
                      onClick={() => handleCourseClick(course.title)}
                      className="w-full px-4 py-2 bg-[#921a40] hover:bg-[#921a40]/90 text-white rounded-lg font-semibold transition-colors duration-200"
                    >
                      View Details
                    </button>
                    {/* <button className="w-full px-4 py-2 border-2 border-[#921a40] text-[#921a40] hover:bg-[#921a40] hover:text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
