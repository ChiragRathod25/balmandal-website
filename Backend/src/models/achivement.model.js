import mongoose from "mongoose";
const achivementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Achivement = mongoose.model("Achivement", achivementSchema);
