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
} from "../controllers/balak.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", verifyJWT, logout);
router.put("/updateuserDetails", verifyJWT, updateuserDetails);
router.put("/updateAvatar", verifyJWT, updateAvatar);
router.put("/updatePassword", verifyJWT, updatePassword);
router.put("/forgetPassword", verifyJWT, forgetPassword);
router.get("/getCurrentuser", verifyJWT, getCurrentuser);
router.get("/refreshAceesToken", verifyJWT, refreshAceesToken);

export default router;
