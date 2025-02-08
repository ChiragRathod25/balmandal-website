import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const balakSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    DOB: {
      type: Date,
    },
    school: {
      type: String,
    },
    std: {
      type: String,
    },
    mediumOfStudy: {
      type: String,
      enum: ["Hindi", "Gujarati", "English", "Marathi"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

balakSchema.methods.generateAccessToken = () => {
  return jwt.sign(
    { _id: this._id, email: this._email, password: this._password },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
balakSchema.methods.generateRefreshToken = () => {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};
balakSchema.methods.isPasswordCorrect = async (password) => {
  return await bcrypt.compare(password, this.password);
};
balakSchema.pre("save", async () => {
  if (!this.modified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});
export const Balak = mongoose.model("Balak", balakSchema);
