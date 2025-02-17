import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Talent } from "../models/talent.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const addTalent = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const { heading, description } = req.body;
  if (!heading) throw new ApiError(400, `Heading is required`);
  const images = [];

  if (req.files) {
    const imageArray = Array.isArray(req.files)
      ? Array.from(req.files)
      : [req.files];
    for (const img of imageArray) {
      const path = img.path;
      try {
        const image = await uploadOnCloudinary(path);
        if (!image || !image.url)
          throw new ApiError(400, `Error while uploading image`);
        images.push(image.url);
      } catch (error) {
        console.error(`Error while uploading image`, error);
        throw new ApiError(400, `Error while uploading image`, error);
      }
    }
  }

  const talent = await Talent.create({
    heading,
    description,
    userId: id,
    images,
  });
  if (!talent) throw new ApiError(400, `Error while adding talent`);
  res
    .status(200)
    .json(new ApiResponce(200, talent, "Talent added successfully"));
});

const updateTalent = asyncHandler(async (req, res) => {
  const talentId = req.params.id;
  const { heading, description, cloudFiles } = req.body;
  const talent = await Talent.findById(talentId);
  if (!talent) throw new ApiError(404, `Invalid talent request`);

  // const existingImages = talent.images;
  // console.log("existingImages", existingImages);
  // const updatedImages= images;
  // console.log("updatedImages", updatedImages);
  // const currenImages=images;

  // console.log("currenImages", currenImages);
  console.log("cloudFiles", typeof cloudFiles, Array.isArray(cloudFiles));

  const newFiles = [];
  if (req.files) {
    const imageArray = Array.isArray(req.files)
      ? Array.from(req.files)
      : [req.files];

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
  const updatedTalent = await Talent.findByIdAndUpdate(
    talentId,
    {
      heading,
      description,
      images: files,
    },
    { new: true }
  );
  if (!updatedTalent) throw new ApiError(404, `Error while updating talent`);
  res
    .status(200)
    .json(
      new ApiResponce(200, updatedTalent, `Talent updated successfully !!`)
    );
});

const deleteTalent = asyncHandler(async (req, res) => {
  const talentId = req.params.id;
  console.log(talentId);

  const talent = await Talent.findByIdAndDelete(
    new mongoose.Types.ObjectId(talentId)
  );
  if (!talent) throw new ApiError(404, `Invalid talent request`);
  res
    .status(200)
    .json(new ApiResponce(200, {}, `Talent deleted successfully !!`));
});

const getUserTalents = asyncHandler(async (req, res) => {
  console.log("get user talents called");
  const id = req.user._id;
  const talents = await Talent.find({ userId: id });
  if (!talents) throw new ApiError(404, `No talent found`);
  res
    .status(200)
    .json(new ApiResponce(200, talents, `Talents found successfully !!`));
});

const getTalentById = asyncHandler(async (req, res) => {
  const talentId = req.params.id;
  const talent = await Talent.findById(talentId);
  if (!talent) throw new ApiError(404, `No talent found`);
  res
    .status(200)
    .json(new ApiResponce(200, talent, `Talent found successfully !!`));
});

export { addTalent, updateTalent, deleteTalent, getUserTalents, getTalentById };
