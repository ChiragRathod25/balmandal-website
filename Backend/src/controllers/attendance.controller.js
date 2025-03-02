import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Attendance } from "../models/attendance.model.js";
import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";

// controllers list
// 1. addAttendance
// 2. updateAttendance
// 3. deleteAttendance
// 4. getAttendanceByEventId
// 5. getAttendanceByUserId
// 6. getAttendanceStatusByEventIdAndUserId
// 7. updateAttendanceStatus

const addAttendance = asyncHandler(async (req, res, next) => {
  const { eventId, userId, status } = req.body;
  if ([eventId, userId, status].some((field) => (field.trim() ?? "") === "")) {
    throw new ApiError(400, "EventId, UserId and Status are required");
  }
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const existingAttendance = await Attendance.findOne({ eventId, userId });
  if (existingAttendance) {
    throw new ApiError(400, "Attendance already marked");
  }
  const attendance = await Attendance.create({
    eventId,
    userId,
    status,
    markedBy: req.user._id,
  });

  if (!attendance) {
    throw new ApiError(500, "Error in creating attendance");
  }
  res
    .status(201)
    .json(new ApiResponce("Attendance marked successfully", attendance));
});

const updateAttendance = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const { attendanceId } = req.params;
  if ([status].some((field) => (field.trim() ?? "") === "")) {
    throw new ApiError(400, "Status is required");
  }
  const attendance = await Attendance.findByIdAndUpdate(
    attendanceId,
    { status, updatedBy: req.user._id },
    { new: true }
  );
  if (!attendance) {
    throw new ApiError(404, "Attendance not found");
  }
  res
    .status(200)
    .json(new ApiResponce("Attendance updated successfully", attendance));
});

const deleteAttendance = asyncHandler(async (req, res, next) => {
  const { attendanceId } = req.params;
  if (!attendanceId) {
    throw new ApiError(400, "Attendance Id is required");
  }
  const attendance = await Attendance.findByIdAndDelete(attendanceId);
  if (!attendance) {
    throw new ApiError(404, "Attendance not found");
  }
  res
    .status(200)
    .json(new ApiResponce("Attendance deleted successfully", attendance));
});

const getAttendanceByEventId = asyncHandler(async (req, res, next) => {
  const { eventId } = req.params;
  if (!eventId) {
    throw new ApiError(400, "Event Id is required");
  }
  const attendances = await Attendance.find({ eventId });
  res
    .status(200)
    .json(new ApiResponce("Attendances fetched successfully", attendances));
});

const getAttendanceByUserId = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "User Id is required");
  }
  const attendances = await Attendance.find({ userId });
  res
    .status(200)
    .json(new ApiResponce("Attendances fetched successfully", attendances));
});

const getAttendanceStatusByEventIdAndUserId = asyncHandler(
  async (req, res, next) => {
    const { eventId, userId } = req.params;
    if (!eventId || !userId) {
      throw new ApiError(400, "Event Id and User Id are required");
    }
    const attendance = await Attendance.findOne({ eventId, userId });
    if (!attendance) {
      throw new ApiError(404, "Attendance not found");
    }
    res.status(200).json(new ApiResponce("Attendance found", attendance));
  }
);

const updateAttendanceStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  const { attendanceId } = req.params;
  if (!attendanceId) {
    throw new ApiError(400, "Attendance Id is required");
  }

  const attendance = await Attendance.findByIdAndUpdate(
    attendanceId,
    { status },
    { new: true }
  );
  if (!attendance) {
    throw new ApiError(404, "Attendance not found");
  }
  res
    .status(200)
    .json(
      new ApiResponce("Attendance status updated successfully", attendance)
    );
});

export {
  addAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceByEventId,
  getAttendanceByUserId,
  getAttendanceStatusByEventIdAndUserId,
  updateAttendanceStatus,
};
