import { decode } from "jsonwebtoken";
import { options } from "../constants.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
{
  // Function to generate access and refresh tokens for a user
}
const generateAccessAndRefreshToken = async (userId) => {
  try {
    // find user by there id in the database
    const user = await User.findById(userId);
    // throw an error if the user is not find
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    // generate access token for the user
    const accessToken = user.generateAccessToken();
    // generate refresh token for the user
    const refreshToken = user.generateRefreshToken();
    {
      /*note: the generateRefreshToken and generateAccessToken function is from user model not to get confuse*/
    }

    // assign the refresh token to the user object
    user.refreshToken = refreshToken;
    // Save the user object to the database without validation
    await user.save({ validateBeforeSave: false });

    // return both token !not to forget this step
    return { refreshToken, accessToken };
  } catch (error) {
    // Log the error in the console
    console.error("Error in generateAccessAndRefreshToken:", error);
    // Throw an error indicating something went wrong
    throw new ApiError(
      500,
      "Something went wrong while generating access/refresh token"
    );
  }
};
{
  /*Register user controller here*/
}
const registerUser = asyncHandler(async (req, res) => {
  const { username, gender, email, fullName, password } = req.body;
  // 1st step is validation
  if (
    [username, gender, email, password, fullName].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  // 2nd step is to check if user already exists
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }
  // 3rd step is to check for avatar image
  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  // 4th step is to store avatar image to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar image on cloudinary");
  }
  // 5th step is to create user
  const user = await User.create({
    username: username.toLowerCase(),
    gender,
    email,
    fullName,
    password,
    avatar: avatar.url,
  });
  // middle step to hide token and password
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(400, "error registering the user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
{
  /*login user controller here*/
}
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // 1st step is validation
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }
  // 2nd step is find the user
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  // 3rd step is check wether is password is correct
  const passValid = await user.isPasswordCorrect(password);
  if (!passValid) {
    throw new ApiError(400, "invalid user credential");
  }
  // access refresh and access token and assign it to user by there id
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  // remove the password and refresh token of the user
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  // options for cookie
  options;
  // send cookie in response
  res
    .status(200)
    .cookie("refreshToke", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user logged in successfully"
      )
    );
});
{
  /*Logout user controller here*/
}
const logoutUser = asyncHandler(async (req, res) => {
  // find user by id and then update there token to none
  await User.findByIdAndUpdate(
    req.user_id,
    { $set: { refreshToken: "" } },
    { new: true }
  );
  options;
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully"));
});
{
  /*Function to refresh access token*/
}
{
  /*note: this function is for maintaining secure and seamless
  user experience without requiring user to log in again frequently*/
}
const refreshAccessToken = asyncHandler(async (req, res) => {
  // get refresh token either from cookie or request body
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshAccessToken;
  // if no refresh token is provided, throw an unauthorized error
  if (!incomingRefreshToken) {
    throw new ApiError(400, "Unauthorized request");
  }
  // use try catch now for better debugging
  try {
    // verify the refresh token using secret key
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    // get user id from decoded refresh token
    const user = await User.findById(decoded._id);
    // if user is not found, throw an unauthorized error
    if (!user) {
      throw new ApiError(400, "Invalid refresh token");
    }
    {
      /*If the provided refresh token does 
      not match the user's stored token, throw an error*/
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired");
    }
    // Options for setting cookies
    options;
    // generate new access refresh token for the user
    const { newRefreshToken, accessToken } = generateAccessAndRefreshToken(
      req.user._id
    );
    // Respond with the new tokens, setting them as cookies
    res.status(200).cookie("refreshToken", newRefreshToken, options);
    res.status(200).cookie("accessToken", accessToken, options);
    json(
      new ApiResponse(
        200,
        { refreshToken: newRefreshToken, accessToken },
        "Refresh token generated successfully"
      )
    );
  } catch (error) {
    // If there is an error, throw an unauthorized error with the error message
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});
{
  /*this is function to change email or fullName*/
}
const updateUserDetails = asyncHandler(async (req, res) => {
  const { email, fullName } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { email, password, fullName },
    },
    { new: true }
  ).select("-password");
  res
    .status(200)
    .json(new ApiResponse(200, user, "account details updated successfully"));
});
{
  /*this is function to change user password*/
}
const changeCurrentPassword = asyncHandler(async (req, res) => {
  // Get old and new passwords from the request body
  const { oldPassword, newPassword } = req.body;
  // finf the user by there ID
  const user = await User.findById(req.user?._id);
  // check if the old password is correct
  const checkPassword = await user.isPasswordCorrect(oldPassword);
  if (!checkPassword) {
    throw new ApiError(401, "old password is incorrect");
  }
  // set the new password
  user.password = newPassword;
  // save the user with the new password
  await user.save({ validateBeforeSave: false });
  res.json(new ApiResponse(200, {}, "Password changed successfully"));
});
{
  /*this is function to change user avatar*/
}
const changeUserAvatar = asyncHandler(async (req, res) => {
  // Get the path of the uploaded avatar image from the request
  const localFilePath = req?.files.avatar[0]?.path;
  // If the avatar image path is not provided, throw an error
  if (!localFilePath) {
    throw new ApiError(400, "avatar image is required");
  }
  // Upload the avatar image to Cloudinary and get the result
  const avatar = await uploadOnCloudinary(localFilePath);
  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar on Cloudinary");
  }
  // find the user by there id and update the new avatar
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { avatar: avatar.url },
    },
    {
      new: true,
    }
  ).select("-password");
  res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});
export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateUserDetails,
  changeCurrentPassword,
  changeUserAvatar,
};
