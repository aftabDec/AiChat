import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
{
  /*middleware function to verify token*/
}
export const jwtVerify = asyncHandler(async (req, res, next) => {
  try {
    // step 1 is to get token from cookie or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // step 2 is to throw an error if token is not provided
    if (!token) {
      throw new ApiError(401, "Unauthorized token");
    }
    // step 3 is to verify the token using jwt secret key
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // find the user associated with the decoded token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    // step 4 if user is not found then throw an error
    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
