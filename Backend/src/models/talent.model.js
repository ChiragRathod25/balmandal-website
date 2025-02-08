import mongoose from "mongoose";

const talentSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    balakId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Balak",
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Talent = mongoose.model("Talent", talentSchema);
