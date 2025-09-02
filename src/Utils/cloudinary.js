import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload  funciton
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload file on cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File upload sucessful mesage
    console.log("File Uploaded Sucessfully", uploadResult.url);
    return uploadResult;
  } catch (error) {
    console.error("File Upload Failed", error);
    fs.unlinkSync(localFilePath); //removes the locally saved temporary file as the upload operation got failed

    return null;
  }
};
