import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { Balak } from "../models/balak.model.js";

const generateRefreshAccessToken = async (userId) => {
  const user = await Balak.findById(userId);
  if (!user) throw new ApiError(404, "user not exist");
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
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

  const existedUser = await Balak.find({
    $and: [{ firstName }, { mobile }],
  });
  if (existedUser)
    throw new ApiError(
      404,
      `User already exist with same name and mobile number`
    );

  const user = await Balak.create({
    firstName,
    lastName,
    mobile,
    password,
  }).select("-passwrod -refreshToken");
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
  const user = await find({
    $and: [{ firstName }, { mobile }],
  });
  if (!user) throw new ApiError(404, `invalid user request`);
  try {
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(404, `Invalid user password !!`);
  } catch (error) {
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
    .stats(200)
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
  await Balak.findByIdAndUpdate(
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
    .stats(200)
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
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

  const user = await Balak.findById(id);
  if (!user) throw new ApiError(404, `invalid user request`);

  try {
    const updatedUser = await Balak.findByIdAndUpdate(
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
  } catch (error) {
    console.log("Error while updating user details", error);
    throw new ApiError(404, `Error while updating user details`, error);
  }

  res
    .status(200)
    .json(
      new ApiResponce(200, updatedUser, `User details updated successfully !!`)
    );
});

const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file.path;
  if (!avatarLocalPath) throw new ApiError(404, `Avatar is required`);
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar || !avatar.url)
    throw new ApiError(404, `Error while uploading avatar`);

  const user = await Balak.findById(req.user._id);
  if (!user) throw new ApiError(404, `invalid user request`);
  user.avatar = avatar.url;
  await user.save({ validateBeforeSave: false });

  //delete previouse avatar
  const oldAvatar = req.user.avatar;
  try {
    const deleteExistingAvatar = await deleteFromCloudinary(oldAvatar);
    if (deleteExistingAvatar.result !== "ok")
      throw new ApiError(404, `Error while deleting old avatar`);
  } catch (error) {
    console.log("Error while deleting old avatar", error);
    throw new ApiError(404, `Error while deleting old avatar`, error);
  }

  res
    .status(200)
    .json(new ApiResponce(200, user, `User avatar updated successfully !!`));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword)
    throw new ApiError(404, `Password and new password are required`);

  if (password === newPassword)
    throw new ApiError(404, `Password and new password should not be same`);
  const user = await Balak.findById(req.user._id);
  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) 
    throw new ApiError(404, `Invalid password`);
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponce(200, user, `User password updated successfully !!`));
});

//TODO: implement forget password
const forgetPassword = asyncHandler(async (req, res) => {
  const {email}=req.user._id
  if(!email) throw new ApiError(404, `Email is required to reset password`);

});

const getCurrentuser=asyncHandler(async(req,res)=>{
  const user=await Balak.findById(req.user._id).select("-password -refreshToken");
  if(!user) throw new ApiError(404, `Invalid user request`);
  res
  .status(200)
  .json(new ApiResponce(200,user,`User details fetched successfully !!`));
})

const refreshAceesToken=asyncHandler(async(req,res)=>{
  const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken
  if(!incomingRefreshToken) throw new ApiError(404, `Refresh token is required`);
  try {
    const decodeToken=await jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
    const user=await Balak.findById(decodeToken._id);
    if(!user) throw new ApiError(404, `Invalid refresh token`);
    if(user.refreshToken!==incomingRefreshToken) throw new ApiError(404, `Invalid refresh token or token is expired`);

  } catch (error) {
    console.log("Error while refreshing access token",error);
    throw new ApiError(404, `Error while refreshing access token`,error);
  }
  const {accessToken,refreshToken}=await generateRefreshAccessToken(decodeToken._id);
  const options={
    httpOnly:true,
    secure:true,
  }

  res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(new ApiResponce(200,{accessToken,refreshToken},`Access token refreshed successfully !!`));
})

export {
  register,
  login,
  logout,
  updateuserDetails,
  updateAvatar,
  updatePassword,
  forgetPassword,
  getCurrentuser,
  refreshAceesToken,
};
