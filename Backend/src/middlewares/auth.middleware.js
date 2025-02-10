import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

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
    const user = await User.findById(decodeToken?._id).select(
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

export const verifyAdmin= asyncHandler(async (req, res, next) => {
  try {

    //mongoose doc to regular object conversion is required to access the properties of the user object
    //why => because the user object is a mongoose document and we can't access properties directly from it 

    // console.log(typeof req.user);
    req.user=req.user.toObject();
    // console.log(req.user);
    // console.log(req.user["isSanchalak"]);

    if (!req.user['isSanchalak']) throw new ApiError(403, `Not authorized as Sanchalak`);
    next();
  } catch (error) {
    console.error(`verifyAdmin Error`, error);
    throw new ApiError(403, `Error while validating Sanchalak`, error);
  }
});