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
    balakId:{
      // type: mongoose.Schema.Types.ObjectId,
      type:String,
      ref: "Balak",
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
