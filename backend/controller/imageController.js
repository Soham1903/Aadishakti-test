import multer from "multer";
import Image from "../model/imageSchema.js";

// Multer Configuration (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Image
const uploadImage = async (req, res) => {
  try {
    const { buffer, mimetype, originalname } = req.file;

    // Check if the limit of 5 images is reached
    const imageCount = await Image.countDocuments();
    if (imageCount >= 5) {
      return res
        .status(400)
        .json({ message: "Maximum upload limit reached (5 images)" });
    }

    const newImage = new Image({
      filename: originalname,
      contentType: mimetype,
      imageBase64: buffer.toString("base64"),
    });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch All Images
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the image
    const deletedImage = await Image.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { uploadImage, getAllImages, upload, deleteImage };