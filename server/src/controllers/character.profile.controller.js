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
      userId: req.user.id,
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
{
  /*Character avatar update controller here*/
}
const changeCharacterAvatar = asyncHandler(async (req, res) => {
  // Get the song ID and new image from the request
  const { CharId } = req.params;

  // get the local path of the avatar
  const avatarLocalPath = req?.files.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }
  // store avatar image to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(500, "failed to upload avatar on cloudinary");
  }
  // Extract character ID from the request body
  {
    /*wasted 3 hours cuz of bug function*/
  }
  const { characterId } = req.body;
  if (!characterId) {
    throw new ApiError(400, "Character ID is required");
  }
  // update the avatar here by using findbyidandupdate
  const updatedCharacter = await characterProfile.findByIdAndUpdate(
    characterId,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  );
  if (!updatedCharacter) {
    throw new ApiError(404, "Character profile not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedCharacter,
        "Character avatar updated successfully"
      )
    );
});

const getCharacterProfile = asyncHandler(async (req, res) => {
  try {
    const characters = await characterProfile.find({
      userId: req.params.userId,
    });
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* Show characters controller */
const showCharacters = asyncHandler(async (req, res) => {
  try {
    const characters = await characterProfile
      .find({})
      .populate("userId", "username")
      .exec();
    res.json(
      new ApiResponse(200, characters, "Characters retrieved successfully")
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(
        new ApiError(
          500,
          error.message,
          "Server error: Unable to retrieve characters"
        )
      );
  }
});
export {
  fictionalCharacterProfile,
  getCharacterProfile,
  changeCharacterAvatar,
  showCharacters,
};
