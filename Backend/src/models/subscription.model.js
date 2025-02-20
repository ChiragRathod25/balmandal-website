import mongoose, { Schema } from "mongoose";
const subscriptionSchema = new Schema(
  {
    endpoint: {
      type: String,
    },
    expirationTime: { type: Number },
    keys: {
      p256dh: String,
      auth: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
