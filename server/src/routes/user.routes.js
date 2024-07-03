import { Router } from "express";
import {
  changeCurrentPassword,
  changeUserAvatar,
  loginUser,
  logoutUser,
  registerUser,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/mulder.middleware.js";
import { jwtVerify } from "../middleware/auth.middleware.js";
const router = Router();
{
  /*Register Route*/
}
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

// Login Route
router.post("/login", loginUser);

/*======= secure routes =========*/

// Change User Avatar Route
router.post(
  jwtVerify,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  changeUserAvatar
);
// Update User Details Route
router.post("/update/user", jwtVerify, updateUserDetails);

// logout route
router.route("/logout").post(jwtVerify, logoutUser);

// Change User Password Route
router.post("/change/password", jwtVerify, changeCurrentPassword);

export default router;
