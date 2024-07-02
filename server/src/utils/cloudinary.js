import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// Configuration
cloudinary.config({
  cloud_name: "djiqdz4jv",
  api_key: "936967824328812",
  api_secret: "KBc9Jy_hPc2ZNvchtbfotoWkaqM",
  secure: true,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("file has been uploaded on cloudinary", res.url);
    // remove the file from localPath after successfully uploading on cloudinary
    fs.unlinkSync(localFilePath);
    return res;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
