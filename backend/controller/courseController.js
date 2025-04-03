import Course from "../model/courseSchema.js";
import User from "../model/userSchema.js";

// Add Course
export const addCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      syllabus,
      instructor,
      timing,
      benefits,
    } = req.body;

    const image = req.file
      ? {
          filename: req.file.originalname, // Store original filename
          contentType: req.file.mimetype, // Store MIME type
          imageBase64: req.file.buffer.toString("base64"), // Convert image to Base64
        }
      : null;

    console.log(req.body);

    const newCourse = new Course({
      title,
      description,
      price,
      duration,
      syllabus,
      instructor,
      timing,
      benefits,
      image,
    });

    await newCourse.save();
    console.log(newCourse);
    res
      .status(201)
      .json({ message: "Course added successfully!", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get All Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get Course by Title
export const getCourseByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const course = await Course.findOne({ title });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// controllers/courseController.js
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find the course
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update fields
    course.title = req.body.title || course.title;
    course.instructor = req.body.instructor || course.instructor;
    course.description = req.body.description || course.description;
    course.syllabus = req.body.syllabus || course.syllabus;
    course.price = req.body.price || course.price;
    course.duration = req.body.duration || course.duration;
    course.timing = req.body.timing || course.timing;

    // Handle image update if needed
    if (req.file) {
      course.image = {
        contentType: req.file.mimetype,
        imageBase64: req.file.buffer.toString("base64"),
      };
    }

    // Save the updated course
    const updatedCourse = await course.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Course by ID
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully!" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/userController.js
export const getUserCourses = async (req, res) => {
  console.log("Function invoked");
  try {
    console.log(req.params);
    const user = await User.findById(req.params.userId).populate({
      path: "courses",
      select: "title description price duration instructor image",
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      courses: user.courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
