import { Router } from "express";
import {
  register,
  login,
  logout,
  updateuserDetails,
  updateAvatar,
  updatePassword,
  forgetPassword,
  getCurrentuser,
  refreshAccessToken,
  getUserById,
  deleteFile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", verifyJWT, logout);
router.put("/updateuserDetails", verifyJWT, updateuserDetails);
router.put("/updateAvatar", upload.single("avatar"), verifyJWT, updateAvatar);
router.put("/updatePassword", verifyJWT, updatePassword);
router.put("/forgetPassword", verifyJWT, forgetPassword);   //TODO
router.get("/getCurrentuser", verifyJWT, getCurrentuser);
router.post("/refreshAccessToken", refreshAccessToken);
router.get("/:id", verifyJWT, getUserById);
router.delete("/deleteFile", verifyJWT, deleteFile);


export default router;
