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
  refreshAceesToken,
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
router.post("/refreshAceesToken", verifyJWT, refreshAceesToken);

export default router;
