import { Router } from "express";
import {
  addAchivement,
  updateAchivement,
  getUserAchivements,
  getAchievementById,
  deleteAchivement,
} from "../controllers/achivement.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);
router
  .route("/")
  .get(getUserAchivements)
  .post(upload.array("image"), addAchivement);
router
  .route("/:id")
  .put(upload.fields([{ name: "image" }]), updateAchivement)
  .delete(deleteAchivement)
  .get(getAchievementById);

export default router;
