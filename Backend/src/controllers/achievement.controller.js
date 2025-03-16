import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Achievement } from "../models/achievement.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { googleDrive } from "../utils/GoogleDriveMediaClound.js";

const addAchievement = asyncHandler(async (req, res) => {
  const id = req?.user?._id || 500;

  const { title, description } = req.body;
  if (!title) throw new ApiError(400, `Title is required`);

  const userFiles = [];

  if (req.files) {
    const FilesArray = Array.isArray(req.files) ? req.files : [req.files.image];

    for (const file of FilesArray) {
      const path = file.path;
      try {
        // const file = await googleDrive.uploadFile(path);
        const file=await uploadOnCloudinary(path);
        if (!file || !file.url)
          throw new ApiError(400, `Error while uploading file`);
        // console.log("File",file)
        userFiles.push(file.url);
      } catch (error) {
        console.error(`Error while uploading file`, error);
        throw new ApiError(400, `Error while uploading file`, error);
      }
    }
  }

  const achievement = await Achievement.create({
    title,
    description,
    userId: id,
    media: userFiles,
  });
  res
    .status(200)
    .json(
      new ApiResponce(200, achievement, `Achievement added successfully !!`)
    );
});

const updateAchievement = asyncHandler(async (req, res) => {
  try {
    const { title, description, cloudFiles } = req.body;
    const achievementId = req.params.id;
    const achievement = await Achievement.findById(achievementId);
    if (!achievement) throw new ApiError(404, `Invalid achievement request`);

    // console.log("cloudFiles", typeof cloudFiles, Array.isArray(cloudFiles));
    // console.log("req.files", req.files);
    // console.log("cloudFiles", cloudFiles);
    const newFiles = [];
    if (req.files) {
      const FilesArray = Array.isArray(req.files)
        ? Array.from(req.files)
        : [req.files];
      // console.log("Image Array", FilesArray);
      for (const file of FilesArray) {
        const path = file.path;
        try {
          const file = await googleDrive.uploadFile(path);
          if (!file || !file.url)
            throw new ApiError(400, `Error while uploading file`);
          newFiles.push(file);
        } catch (error) {
          console.error(`Error while uploading file`, error);
          throw new ApiError(400, `Error while uploading file`, error);
        }
      }
    }
    let cloudFilesArray = JSON.parse(cloudFiles);
    // console.log("cloudFilesArray", cloudFilesArray);
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

    // console.log("newFiles", newFiles);
    // console.log("files", files);
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      achievementId,
      {
        title,
        description,
        media: files,
      },
      { new: true }
    );
    if (!updatedAchievement) {
      throw new ApiError(404, `Error while updating achievement`);
    }

    console.log("here");
    res
      .status(200)
      .json(
        new ApiResponce(
          200,
          updatedAchievement,
          `Achievement updated successfully !!`
        )
      );
  } catch (error) {
    console.error(`Error while updating achievement`, error);
  }
});

const getUserAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({ userId: req?.user?._id });
  if (!achievements) throw new ApiError(404, `No achievements found for user`);

  res
    .status(200)
    .json(
      new ApiResponce(200, achievements, `Achievements found successfully !!`)
    );
});

const getAchievementById = asyncHandler(async (req, res) => {
  const achievementId = req.params.id;
  if (!achievementId) throw new ApiError(400, `Achievement id is required`);
  const achievement = await Achievement.findById(achievementId);
  if (!achievement) throw new ApiError(404, `Invalid achievement request`);
  res
    .status(200)
    .json(
      new ApiResponce(200, achievement, `Achievement found successfully !!`)
    );
});

const deleteAchievement = asyncHandler(async (req, res) => {
  const achievementId = req.params.id;
  if (!achievementId) throw new ApiError(400, `Achievement id is required`);
  const achievement = await Achievement.findByIdAndDelete(achievementId);
  if (!achievement) throw new ApiError(404, `Invalid achievement request`);
  res
    .status(200)
    .json(new ApiResponce(200, {}, `Achievement deleted successfully !!`));
});

export {
  addAchievement,
  updateAchievement,
  getUserAchievements,
  getAchievementById,
  deleteAchievement,
};
