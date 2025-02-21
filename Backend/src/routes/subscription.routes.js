import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { createSubscription } from "../controllers/subscription.controller.js";
const router=Router()

router.use(verifyJWT)
router.route('/add').post(createSubscription)

export default router