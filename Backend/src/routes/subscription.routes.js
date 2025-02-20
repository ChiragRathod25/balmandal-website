import { Router } from "express";


import { createSubscription } from "../controllers/subscription.controller.js";
const router=Router()

router.route('/add').post(createSubscription)

export default router