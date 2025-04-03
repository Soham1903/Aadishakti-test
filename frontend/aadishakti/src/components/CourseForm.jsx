import React, { useState } from "react";
import {
  Upload,
  Clock,
  DollarSign,
  User,
  Calendar,
  BookOpen,
  Award,
} from "lucide-react";

function CourseForm() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    duration: "",
    instructor: "",
    timing: "",
    benefits: "",
    syllabus: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourse({ ...course, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const formData = new FormData();
      Object.entries(course).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await fetch("http://localhost:4000/api/courses/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("Course submitted successfully!");
        setCourse({
          title: "",
          description: "",
          image: null,
          price: "",
          duration: "",
          instructor: "",
          timing: "",
          benefits: "",
          syllabus: "",
        });
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        setSubmitMessage(`Error: ${data.error || "Failed to submit course"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("Failed to submit course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-[#921a40]" />
        Add New Course
      </h2>

      {submitMessage && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            submitMessage.includes("Error")
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Course Title */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              placeholder="Enter course title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#921a40] focus:border-transparent"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Course Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
                required
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-[#921a40] hover:text-[#7a1635] font-medium"
              >
                Click to upload image
              </label>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              placeholder="Enter course description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#921a40] focus:border-transparent"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">
                Instructor
              </label>
              <input
                type="text"
                name="instructor"
                value={course.instructor}
                onChange={handleChange}
                placeholder="Enter instructor name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#921a40] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Timing */}
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">
                Timing
              </label>
              <input
                type="time"
                name="timing"
                value={course.timing}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#921a40] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={course.price}
                onChange={handleChange}
                placeholder="Enter course price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#921a40] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">
                Duration (months)
              </label>
              <input
                type="number"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                placeholder="Enter course duration"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#921a40] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Benefits
            </label>
            <textarea
              name="benefits"
              value={course.benefits}
              onChange={handleChange}
              placeholder="Enter benefits of the course"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#921a40] focus:border-transparent"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Syllabus */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Syllabus
            </label>
            <textarea
              name="syllabus"
              value={course.syllabus}
              onChange={handleChange}
              placeholder="Enter syllabus details"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#921a40] focus:border-transparent"
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-[#921a40]/70" : "bg-[#921a40] hover:bg-[#7a1635]"
          } text-white py-3 rounded-lg transition flex items-center justify-center gap-2 font-medium`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Submitting...
            </>
          ) : (
            <>
              <Award className="h-5 w-5" />
              Create Course
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
