import { Router } from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { justCheck } from "../controllers/admin.controller.js";
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
import {
  addTalent,
  updateTalent,
  deleteTalent,
  getUserTalents,
  getTalentById,
} from "../controllers/talent.controller.js";
import {
  addAchivement,
  updateAchivement,
  getUserAchivements,
  getAchievementById,
  deleteAchivement,
} from "../controllers/achivement.controller.js";
import {
  addParentDetails,
  getParentDetailsById,
  updateParentDetails,
  deleteParentDetails,
  getUserParents,
} from "../controllers/parent.controller.js";
import { upload } from "../middlewares/multer.middleware.js";



//admin routes
const router = Router();

router.use(verifyJWT, verifyAdmin);
router.route("/").get();

router.route("/updateuserDetails").put(updateuserDetails);
router.route("/updateAvatar").put(upload.single("avatar"), updateAvatar);

export default router;
