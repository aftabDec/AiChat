import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { characterProfile } from "../models/character.profile.schema.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

{
  /*Character profile creation controller here*/
}
const fictionalCharacterProfile = asyncHandler(async (req, res) => {
  // Extract character profile fields from request body
  const {
    name,
    description,
    personality,
    greetings,
    tagline,
    likes,
    chats,
    catchphrases,
  } = req.body;
  try {
    // get avatar local path
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "avatar is required");
    }
    // store avatar image to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      throw new ApiError(500, "failed to upload avatar on cloudinary");
    }
    // save new character
    const newCharacter = await characterProfile.create({
      name,
      description,
      personality,
      greetings,
      tagline,
      avatar: avatar.url,
      likes,
      chats,
      catchphrases,
    });
    res
      .status(201)
      .json(
        new ApiResponse(200, newCharacter, "Character created successfully")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        new ApiError(500),
        error.message,
        "Server error: Unable to create character profile"
      );
  }
});

export { fictionalCharacterProfile };
