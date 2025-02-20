import mongoose, { Schema } from "mongoose";
const notificationSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null, // null means it is a broadcast notification,
      },
    ],
    isBroadcast: {
      type: Boolean,
      default: true,
    },
    targetGroup: {
      type: String,
      enum: ['all', 'admin', 'individual'],
      default: 'all',
    },

    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    notificationType: {
      type: String,
      enum: ["info", "error", "warning", "success"],
      default: "info",
    },
    link: {
      type: String,
    },
    poster:{
        type:String,
        default : null
    },
    isReadBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: {
          type: Date,
          default: null,
        },
    },
    ],
    deliveredTo: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        deliveredAt: {
          type: Date,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model("Notification", notificationSchema);
