import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Balak } from "../models/balak.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new ApiError(401, `Token is required`);
    const decodeToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await Balak.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) throw new ApiError(401, `Invalid access token`);
    req.user = user;
    next();
  } catch (error) {
    console.error(`verifyJWT Error`, error);
    throw new ApiError(401, `Error while validating user`, error);
  }
});
