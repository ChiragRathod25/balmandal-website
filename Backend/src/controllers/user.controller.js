import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateRefreshAccessToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "user not exist");
  console.log("User", user);

  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Refreshing token error", error);
    throw new ApiError(
      500,
      "Something went wrong while refreshing tokens !!",
      error
    );
  }
};

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, mobile, password } = req.body;
  if (
    [firstName, lastName, mobile, password].some(
      (field) => (field?.trim() ?? "") === ""
    )
  )
    throw new ApiError(404, "All fields are required");

  const existedUser = await User.findOne({
    $and: [{ firstName: { $regex: new RegExp(firstName, "i") } }, { mobile }],
  });
  console.log("Already existed user: \n", existedUser);

  if (existedUser && existedUser.length > 0)
    throw new ApiError(
      404,
      `User already exist with same name and mobile number`
    );

  const user = await User.create({
    firstName,
    lastName,
    mobile,
    password,
  });
  if (!user)
    throw new ApiError(404, `Something went wrong while creating account`);

  res
    .status(200)
    .json(new ApiResponce(200, user, `user created successfully !!`));
});

const login = asyncHandler(async (req, res) => {
  const { firstName, mobile, password } = req.body;
  if (
    [firstName, mobile, password].some((field) => (field?.trim() ?? "") === "")
  )
    throw new ApiError(404, `All fields are required`);
  const user = await User.findOne({
    $and: [{ firstName: { $regex: new RegExp(firstName, "i") } }, { mobile }],
  });

  if (!user) throw new ApiError(404, `invalid user request`);
  try {
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(404, `Invalid user password !!`);
  } catch (error) {
    console.log("password", password);
    console.log(error);
    throw new ApiError(404, `Error while validating password`, error);
  }
  const { accessToken, refreshToken } = await generateRefreshAccessToken(
    user._id
  );
  //remove password from the obj
  delete user.password;

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponce(
        200,
        { user, accessToken, refreshToken },
        `User logged in successfully !!`
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponce(200, {}, `User logged out successfully !!`));
});

const updateuserDetails = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const {
    firstName,
    lastName,
    middleName,
    email,
    mobile,
    DOB,
    school,
    std,
    mediumOfStudy,
  } = req.body;

  const user = await User.findById(id);
  if (!user) throw new ApiError(404, `invalid user request`);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        middleName,
        email,
        mobile,
        DOB,
        school,
        std,
        mediumOfStudy,
      },
      { new: true }
    );
    if (!updatedUser)
      throw new ApiError(404, `Error while updating user details`);

    res
      .status(200)
      .json(
        new ApiResponce(
          200,
          updatedUser,
          `User details updated successfully !!`
        )
      );
  } catch (error) {
    console.log("Error while updating user details", error);
    throw new ApiError(404, `Error while updating user details`, error);
  }
});

const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file.path;
  if (!avatarLocalPath) throw new ApiError(404, `Avatar is required`);
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar || !avatar.url)
    throw new ApiError(404, `Error while uploading avatar`);

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, `invalid user request`);
  user.avatar = avatar.url;
  await user.save({ validateBeforeSave: false });

  //delete previouse avatar
  const oldAvatar = req.user.avatar;
  if (oldAvatar && oldAvatar.length > 0) {
    try {
      console.log("Old avatar", oldAvatar);
      const deleteExistingAvatar = await deleteFromCloudinary(oldAvatar);
      console.log("deleteExistingAvatar", deleteExistingAvatar);

      if (deleteExistingAvatar.result !== "ok")
        throw new ApiError(404, `Error while deleting old avatar`);
    } catch (error) {
      console.log("Error while deleting old avatar", error);
      throw new ApiError(404, `Error while deleting old avatar`, error);
    }
  }
  res

    .status(200)
    .json(new ApiResponce(200, user, `User avatar updated successfully !!`));
});

const deleteFile=asyncHandler (async(req,res)=>{
  console.log("Delete file",req.body);
  const {url}=req.body;
  console.log("Url",url);
  if(!url) throw new ApiError(404, `Url is required to delete file`);
  const deleteFile = await deleteFromCloudinary(url);
  if (deleteFile.result !== "ok")
    throw new ApiError(404, `Error while deleting file`);
  res
    .status(200)
    .json(new ApiResponce(200, {}, `File deleted successfully !!`));

})

const updatePassword = asyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword)
    throw new ApiError(404, `Password and new password are required`);

  if (password === newPassword)
    throw new ApiError(404, `Password and new password should not be same`);
  const user = await User.findById(req.user._id);
  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) throw new ApiError(404, `Invalid password`);
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponce(200, user, `User password updated successfully !!`));
});

//TODO: implement forget password
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.user._id;
  if (!email) throw new ApiError(404, `Email is required to reset password`);
});

const getCurrentuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  if (!user) throw new ApiError(404, `Invalid user request`);

  res
    .status(200)
    .json(new ApiResponce(200, user, `User details fetched successfully !!`));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken)
    throw new ApiError(404, `Refresh token is required`);
  const decodeToken = await jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  try {
    const user = await User.findById(decodeToken._id);
    if (!user) throw new ApiError(404, `Invalid refresh token`);
    if (user.refreshToken !== incomingRefreshToken)
      throw new ApiError(404, `Invalid refresh token or token is expired`);
  } catch (error) {
    console.log("Error while refreshing access token", error);
    throw new ApiError(404, `Error while refreshing access token`, error);
  }
  const { accessToken, refreshToken } = await generateRefreshAccessToken(
    decodeToken._id
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponce(
        200,
        { accessToken, refreshToken },
        `Access token refreshed successfully !!`
      )
    );
});

const getUserById = asyncHandler(async (req, res) => {
  console.log("getUserById :: User id", req.params.id);
  console.log(req.params);
  const user = await User.findById(req.params.id).select(
    "-password -refreshToken"
  );
  if (!user) throw new ApiError(404, `User not found`);
  res
    .status(200)
    .json(new ApiResponce(200, user, `User fetched successfully !!`));
});

export {
  register,
  login,
  logout,
  updateuserDetails,
  updateAvatar,
  updatePassword,
  forgetPassword,
  getCurrentuser,
  refreshAccessToken,
  getUserById,
  deleteFile,
};
