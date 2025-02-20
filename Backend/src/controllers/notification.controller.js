import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Notification } from "../models/notification.model.js";

const createNotification = asyncHandler(async (req, res) => {
  // createdBy -> from req.user._id
  const {
    createdFor,
    isBroadcast,
    targetGroup,
    title,
    message,
 notificationType,
    link,
    
  } = req.body;

  if ([title, message].some((field) => (field?.trim() ?? "") === "")) {
    throw new ApiError(404, "Title and message are required");
  }

  if (isBroadcast && targetGroup === "individual" && !createdFor) {
    throw new ApiError(404, "Created for is required for individual broadcast");
  }

  let poster = null;
  if (req.file) {
    try {``
      poster = await uploadOnCloudinary(req.file);
      if (!poster)
        throw new ApiError(404, "Error while uploading image on cloudinary");
      poster = poster.secure_url;
    } catch (error) {
      throw new ApiError(404, "Error while uploading image on cloudinary");
    }
  }


  try {
    const notification = await Notification.create({
      createdBy: req.user._id,
      isBroadcast,
      targetGroup,
      title,
      poster,
      message,
   notificationType,
      link,

    });

    if (!notification)
      throw new ApiError(404, "Error while creating new notification");

    res
      .status(200)
      .json(
        new ApiResponce(
          299,
          notification,
          "New notification created successfully !!"
        )
      );
  } catch (error) {
    throw new ApiError(
      404,
      `Something went wrong while creating notification !!`,
      error
    );
  }
});

const getAllNotifications = asyncHandler(async (req, res) => {
  // it will return all broadcasted notifications
  try {
    const notifications = await Notification.find({ isBroadcast: true });
    if (!notifications) throw new ApiError(404, `No notifications found`);

    res
      .status(200)
      .json(
        new ApiResponce(
          200,
          notifications,
          "All broadcasted notifications fetched successfully !!"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while getting all notifications`,
      error
    );
  }
});

const getUserNotifications = asyncHandler(async (req, res) => {
  // it will return all the notificatinos of the user, including broadcasted and personal notification
  const userId = req.user._id;

  try {
    const notifications = await Notification.find({
      $or: [
        {
          isBroadcast: true,
        },
        { createdFor: { $in: [userId] } },
      ],
    });
    if (!notifications) throw new ApiError(404, `No notifications found !!`);
    res
      .status(200)
      .json(
        new ApiResponce(
          200,
          notifications,
          `Users notificatinos fetched successfully !!`
        )
      );
  } catch (error) {
    throw new ApiError(
      404,
      `Something went wrong while getting user notifications`,
      error
    );
  }
});

const getNotificationsByCreaterId = asyncHandler(async (req, res) => {
  // only permitted for an admin
  const userId = req.user._id;
  try {
    const notification = await Notification.find({ createdBy: userId });
    if (!notification) throw new ApiError(404, `No notifications found`);

    res
      .status(200)
      .json(
        new ApiResponce(
          200,
          `Notification fetched successfully !!`,
          notification
        )
      );
  } catch (error) {
    throw new ApiError(
      404,
      `Error while fetching notificatino created by an admin`
    );
  }
});
const getNotificationById = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  console.log(req.params)
  if (!notificationId) throw new ApiError(404, `Notification Id is required`);
  try {
    const notifiacation = await Notification.findById(notificationId);
    if (!notifiacation) throw new ApiError(404, `Invalid notificaion request`);
    res
      .status(200)
      .json(
        new ApiResponce(
          404,
          notifiacation,
          "Notifications fetched successfully !!"
        )
      );
  } catch (error) {
    throw new ApiError(404, `Error while fetching notificaion !!`);
  }
});

export {
  createNotification,
  getAllNotifications,
  getNotificationById,
  getUserNotifications,
  getNotificationsByCreaterId,
};
