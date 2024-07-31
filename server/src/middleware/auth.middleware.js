import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

// Middleware function to verify token
export const jwtVerify = asyncHandler(async (req, res, next) => {
  try {
    // Step 1: Get token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // Step 2: Throw an error if token is not provided
    if (!token) {
      return next(new ApiError(401, "Unauthorized: Token not provided"));
    }

    // Step 3: Verify the token using jwt secret key
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Step 4: Find the user associated with the decoded token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    console.log(
      user,
      "User verified successfully from backend auth middleware"
    );

    // Step 5: If user is not found, throw an error
    if (!user) {
      return next(new ApiError(401, "Unauthorized: Invalid access token"));
    }

    // Step 6: Attach user to request object and proceed
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, "Unauthorized: Invalid access token"));
  }
});
