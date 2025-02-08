import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Achivement } from "../models/achivement.model.js";

const addAchivement = asyncHandler(async (req, res) => {
  const id = req?.user?._id || 500;
  console.log(req.body);
  console.log(req.files);
  
  const { title, description } = req.body;
  if (!title) throw new ApiError(400, `Title is required`);
  const images = [];
  // const fileArray=Array.from(req.files)
  // for (path of fileArray) {
  //   try {
  //     const image = await uploadOnCloudinary(path);
  //     if (!image || !image.url)
  //       throw new ApiError(400, `Error while uploading image`);
  //     images.push(image.url);
  //   } catch (error) {
  //     console.error(`Error while uploading image`, error);
  //     throw new ApiError(400, `Error while uploading image`, error);
  //   }
  // }

  const achivement = await Achivement.create({
    title,
    description,
    balakId: id,
    images,
  });
  res
  .status(200)
  .json(new ApiResponce(200,achivement,`Achievement added successfully !!`))
});

const updateAchivement = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const achivementId = req.params.id;
  const achivement = await Achivement.findById(achivementId);
  if (!achivement) throw new ApiError(404, `Invalid achivement request`);
  const userImages = achivement.images;
  for (path of req.files) {
    try {
      const image = await uploadOnCloudinary(path);
      if (!image || !image.url)
        throw new ApiError(400, `Error while uploading image`);
      userImages.push(image.url);
    } catch (error) {
      console.error(`Error while uploading image`, error);
      throw new ApiError(400, `Error while uploading image`, error);
    }
  }
  const updatedAchivement = await Achivement.findByIdAndUpdate(
    achivementId,
    {
      title,
      description,
      images: userImages,
    },
    { new: true }
  );
  if (!updatedAchivement)
    throw new ApiError(404, `Error while updating achivement`);
  res
    .status(200)
    .json(
      new ApiResponce(
        200,
        updatedAchivement,
        `Achivement updated successfully !!`
      )
    );
});

const getUserAchivements = asyncHandler(async (req, res) => {

  const achivements = await Achivement.find({ balakId: req.user._id });
  if (!achivements) throw new ApiError(404, `No achivements found for user`);

  res 
    .status(200)
    .json(
      new ApiResponce(200, achivements, `Achivements found successfully !!`)
    );
});

const getAchievementById = asyncHandler(async (req, res) => {
  const achivementId = req.params.id;
  if (!achivementId) throw new ApiError(400, `Achivement id is required`);
  const achivement = await Achivement.findById(achivementId);
  if (!achivement) throw new ApiError(404, `Invalid achivement request`);
  res
    .status(200)
    .json(new ApiResponce(200, achivement, `Achivement found successfully !!`));
});

const deleteAchivement = asyncHandler(async (req, res) => {
  const achivementId = req.params.id;
  if (!achivementId) throw new ApiError(400, `Achivement id is required`);
  const achivement = await Achivement.findByIdAndDelete(achivementId);
  if (!achivement) throw new ApiError(404, `Invalid achivement request`);
  res
    .status(200)
    .json(new ApiResponce(200, {}, `Achivement deleted successfully !!`));
});

export {
  addAchivement,
  updateAchivement,
  getUserAchivements,
  getAchievementById,
  deleteAchivement,
};
