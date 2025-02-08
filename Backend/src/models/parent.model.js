import mongoose from "mongoose";
const parentSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Father", "Mother"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    balakId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Balak",
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "business",
    },
  },
  {
    timestamps: true,
  }
);

export const Parent = mongoose.model("Parent", parentSchema);
