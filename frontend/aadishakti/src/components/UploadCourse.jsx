import { useState } from "react";
import axios from "axios";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    syllabus: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please upload an image");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("syllabus", formData.syllabus);
    formDataToSend.append("image", selectedFile); // Correct file upload

    try {
      const response = await axios.post(
        "http://localhost:4000/api/courses/add",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Course added successfully!");
      console.log("Response:", response.data);

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        duration: "",
        syllabus: "",
      });
      setSelectedFile(null);
    } catch (error) {
      alert(
        "Error adding course: " +
          (error.response?.data?.message || error.message)
      );
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>

      <label className="block mb-2">
        Course Name:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 mt-1"
        />
      </label>

      <label className="block mb-2">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        Upload Image:
        <input
          type="file"
          onChange={handleImageUpload}
          required
          className="w-full p-2"
        />
      </label>

      <label className="block mb-2">
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
      </label>

      <label className="block mb-2">
        Duration:
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
      </label>

      <label className="block mb-2">
        Syllabus:
        <textarea
          name="syllabus"
          value={formData.syllabus}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
      </label>

      <button
        type="submit"
        className="w-full bg-[#C75B7A] text-white px-4 py-2 rounded"
      >
        Add Course
      </button>
    </form>
  );
};

export default CourseForm;
