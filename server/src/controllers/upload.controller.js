import { uploadImage } from "../services/upload.service.js";

const upload = async (req, res) => {
  try {
    const image = await uploadImage(req.file);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      data: image,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { upload };
