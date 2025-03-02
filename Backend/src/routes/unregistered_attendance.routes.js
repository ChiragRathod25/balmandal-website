import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addUnregisteredAttendance,
  updateUnregisteredAttendance,
  deleteUnregisteredAttendance,
  getUnregisteredAttendanceByEventId,
} from "../controllers/unregistered_attendance.controller.js";

const router = Router();
router.use(verifyJWT);

router
  .route("/:eventId")
  .post(addUnregisteredAttendance)
  .get(getUnregisteredAttendanceByEventId);
router
  .route("/:unregisteredAttendanceId")
  .put(updateUnregisteredAttendance)
  .delete(deleteUnregisteredAttendance);

export default router;
