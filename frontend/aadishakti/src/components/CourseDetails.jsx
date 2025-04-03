import React from "react";
import { useCart } from "../contexts/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import {
  Star,
  Clock,
  Calendar,
  Award,
  BookOpen,
  Video,
  Users,
  CheckCircle,
  ShoppingCart,
  User,
  GraduationCap,
} from "lucide-react";

export default function CourseDetails() {
  const { title } = useParams();
  const { addToCart } = useCart(); // ✅ Import the addToCart function
  const [course, setCourse] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch(`http://localhost:4000/api/courses/${title}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setCourse(data);
        } else {
          setError(data.error || "Course not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch course details.");
        setLoading(false);
      });
  }, [title]);

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();

      // Append all editable fields to formData
      formData.append("title", course.title);
      formData.append("instructor", course.instructor);
      formData.append("description", course.description);
      formData.append("syllabus", course.syllabus);
      formData.append("price", course.price);
      formData.append("duration", course.duration);
      formData.append("timing", course.timing);

      // If you want to allow image updates, you'd need to add:
      // if (imageFile) {
      //   formData.append('image', imageFile);
      // }

      const response = await fetch(
        `http://localhost:4000/api/courses/update/${course._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update course");
      }

      const updatedCourse = await response.json();
      setCourse(updatedCourse);
      setIsEditing(false);
      alert("Course updated successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
      alert(error.message || "Error updating course");
    }
  };

  const handleAddToCart = () => {
    addToCart(course); // ✅ Call the addToCart with course data
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/courses/${course.title}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Course deleted successfully!");
        window.location.href = "/"; // Redirect to home or courses list
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete course.");
      }
    } catch (error) {
      alert("An error occurred while deleting the course.");
    }
  };

  const handleBuyNow = () => {
    navigate(`/courses/${course.title}/buy`); // Dynamically inserting title
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f3f5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#921a40] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9f3f5] flex items-center justify-center">
        <div className="text-[#921a40] text-center">
          <Star className="w-16 h-16 mx-auto mb-4" />
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f3f5]">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Title and Image Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#921a40] mb-8 text-center">
            {isEditing ? (
              <input
                className="border rounded p-2 w-full"
                name="title"
                value={course.title}
                onChange={handleChange}
              />
            ) : (
              course.title
            )}
          </h1>
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={`data:${course.image.contentType};base64,${course.image.imageBase64}`}
              alt={course.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructor Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#921a40] mb-6 flex items-center gap-2">
                <User className="w-6 h-6" />
                Course Instructor
              </h2>
              <div className="flex items-center gap-4">
                <div className="bg-[#921a40] rounded-full p-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {isEditing ? (
                      <input
                        className="border rounded p-2 w-full"
                        name="title"
                        value={course.instructor}
                        onChange={handleChange}
                      />
                    ) : (
                      course.instructor
                    )}
                  </h3>
                  <p className="text-gray-600">Expert Astrology Instructor</p>
                </div>
              </div>
            </div>

            {/* Course Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#921a40] mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Course Overview
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  {isEditing ? (
                    <textarea
                      className="border rounded p-2 w-full"
                      name="description"
                      value={course.description}
                      onChange={handleChange}
                    />
                  ) : (
                    course.description
                  )}
                </p>
              </div>
            </div>

            {/* Syllabus */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#921a40] mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Course Syllabus
              </h2>
              {isEditing ? (
                <textarea
                  className="border rounded p-2 w-full"
                  name="syllabus"
                  value={course.syllabus}
                  onChange={handleChange}
                />
              ) : (
                <ul className="list-disc list-inside space-y-2">
                  {course.syllabus.split("\n").map((item, index, arr) => {
                    const isAathvda = item.includes("आठवडा"); // Check if the line contains 'आठवडा'
                    const previousHadAathvda =
                      index > 0 && arr[index - 1].includes("आठवडा"); // Check if the previous line was also 'आठवडा'

                    return (
                      <React.Fragment key={index}>
                        {/* Add empty space before "आठवडा" (except for the first occurrence) */}
                        {isAathvda && index !== 0 && !previousHadAathvda && (
                          <li className="h-4 list-none"></li>
                        )}

                        {/* Add the actual list item */}
                        {item.trim() && (
                          <li className="text-gray-600">{item}</li>
                        )}
                      </React.Fragment>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#921a40] mb-6">
                What's Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-[#921a40] rounded-xl">
                  <Award className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Certification
                  </h3>
                  <p className="text-white">
                    Receive an official certification upon completion
                  </p>
                </div>
                <div className="text-center p-6 bg-[#921a40] rounded-xl">
                  <Video className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Recordings
                  </h3>
                  <p className="text-white">
                    Lifetime access to course recordings
                  </p>
                </div>
                <div className="text-center p-6 bg-[#921a40] rounded-xl">
                  <Users className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Live Sessions
                  </h3>
                  <p className="text-white">
                    Interactive live sessions with experts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 sticky top-8 shadow-lg">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-[#921a40] mb-2">
                  {isEditing ? (
                    <input
                      className="border rounded p-2 w-full"
                      name="price"
                      value={course.price}
                      onChange={handleChange}
                    />
                  ) : (
                    `₹${course.price}`
                  )}
                </div>
                <div className="text-gray-600">One-time payment</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-[#921a40]" />
                  {isEditing ? (
                    <input
                      className="border rounded p-2 w-full"
                      name="duration"
                      value={course.duration}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{course.duration} hours of content</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-[#921a40]" />
                  {isEditing ? (
                    <input
                      className="border rounded p-2 w-full"
                      name="duration"
                      value={course.timing}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{course.timing} hours of content</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#921a40]" />
                  <span>Lifetime access</span>
                </div>
              </div>

              <button
                className="w-full px-6 py-4 bg-[#921a40] hover:bg-[#921a40]/90 text-white rounded-xl font-bold text-lg transition-all duration-200 mb-4"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

              {/* ✅ "Add to Cart" button with onClick */}
              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-4 border-2 border-[#921a40] text-[#921a40] hover:bg-[#921a40] hover:text-white rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
              {user?.role === "admin" && (
                <>
                  <button
                    className={`w-full px-6 py-4 mt-5 text-white rounded-xl font-bold text-lg transition-all duration-200 ${
                      isEditing
                        ? "bg-green-600 hover:bg-green-700" // Green for Save
                        : "bg-blue-600 hover:bg-blue-700" // Blue for Edit
                    }`}
                    onClick={isEditing ? handleSaveChanges : toggleEdit}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-6 py-4 mt-5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-all duration-200"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
