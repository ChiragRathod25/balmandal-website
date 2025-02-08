import { Router } from 'express';
import {
    addAchivement,
  updateAchivement,
  getUserAchivements,
  getAchivementById,
  deleteAchivement,
} from "../controllers/achivement.controller.js";

const router = Router();


router.route("/").get(getUserAchivements).post(addAchivement);
router.route("/:id").put(updateAchivement).delete(deleteAchivement).get(getAchivementById);

export default router;