import { Router } from 'express';
import {
    addAchivement,
  updateAchivement,
  getUserAchivements,
  getAchievementById,
  deleteAchivement,
} from "../controllers/achivement.controller.js";

const router = Router();


router.route("/").get(getUserAchivements).post(addAchivement);
router.route("/:id").put(updateAchivement).delete(deleteAchivement).get(getAchievementById);

export default router;