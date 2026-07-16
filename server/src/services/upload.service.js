import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadImage = async (file) => {
  if (!file) {
    throw new Error("Please upload an image.");
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/services",
      resource_type: "image",
    });

    // Delete local file after successful upload
    fs.unlinkSync(file.path);

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    // Delete local file if upload fails
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    throw new Error(error.message);
  }
};

export { uploadImage };
