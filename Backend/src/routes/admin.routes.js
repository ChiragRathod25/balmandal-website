import { Router } from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { justCheck } from "../controllers/admin.controller.js";



import userRoutes from "./user.routes.js";
import parentRoutes from "./parent.routes.js";
import talentRoutes from "./talent.routes.js";
import achievementRoutes from "./achievement.routes.js";

//admin routes
const router = Router();

router.use(verifyJWT, verifyAdmin);
router.route("/").get(justCheck);


router.use("/user", userRoutes);
router.use("/parent", parentRoutes);
router.use("/talent", talentRoutes);
router.use("/achievement", achievementRoutes);

export default router;
