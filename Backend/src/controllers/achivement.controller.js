import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Achivement } from "../models/achivement.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addAchivement = asyncHandler(async (req, res) => {
  const id = req?.user?._id || 500;
  console.log(req.body);
  console.log(req.files);

  const { title, description } = req.body;
  if (!title) throw new ApiError(400, `Title is required`);

  const userImages = [];

  if (req.files) {
    const imagesArray = Array.isArray(req.files)
      ? req.files
      : [req.files.image];
    console.log("Image Array", imagesArray);

    for (const img of imagesArray) {
      const path = img.path;
      console.log(img);
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
  }

  const achivement = await Achivement.create({
    title,
    description,
    userId: id,
    images: userImages,
  });
  res
    .status(200)
    .json(
      new ApiResponce(200, achivement, `Achievement added successfully !!`)
    );
});

const updateAchivement = asyncHandler(async (req, res) => {
  try {
    const { title, description,cloudFiles} = req.body;
    const achivementId = req.params.id;
    const achivement = await Achivement.findById(achivementId);
    if (!achivement) throw new ApiError(404, `Invalid achivement request`);

    console.log("cloudFiles", typeof cloudFiles, Array.isArray(cloudFiles));
    console.log("req.files", req.files);
    console.log("cloudFiles", cloudFiles);
    const newFiles = [];
    if (req.files) {
      const imageArray = Array.isArray(req.files)
        ? Array.from(req.files)
        : [req.files];
      console.log("Image Array", imageArray);
      for (const img of imageArray) {
        const path = img.path;
        try {
          const image = await uploadOnCloudinary(path);
          if (!image || !image.url)
            throw new ApiError(400, `Error while uploading image`);
          newFiles.push(image.url);
        } catch (error) {
          console.error(`Error while uploading image`, error);
          throw new ApiError(400, `Error while uploading image`, error);
        }
      }
    }
    let cloudFilesArray = JSON.parse(cloudFiles);
    console.log("cloudFilesArray", cloudFilesArray);
    // cloudFiles=JSON.parse(cloudFiles);
    let files = [];
    if (cloudFilesArray.length > 0) {
      files = Array.isArray(cloudFilesArray)
        ? cloudFilesArray
        : [cloudFilesArray];
    }
    if (newFiles.length > 0) {
      if (files?.length > 0) files = [...files, ...newFiles];
      else files = newFiles;
    }

    console.log("newFiles", newFiles);
    console.log("files", files);
    const updatedAchivement = await Achivement.findByIdAndUpdate(
      achivementId,
      {
        title,
        description,
        images: files,
      },
      { new: true }
    );
    if (!updatedAchivement) {
      throw new ApiError(404, `Error while updating achivement`);
    }

    console.log("here");
    res
      .status(200)
      .json(
        new ApiResponce(
          200,
          updatedAchivement,
          `Achievement updated successfully !!`
        )
      );
  } catch (error) {
    console.error(`Error while updating achivement`, error);
  }
});

const getUserAchivements = asyncHandler(async (req, res) => {
  const achivements = await Achivement.find({ userId: req?.user?._id });
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
