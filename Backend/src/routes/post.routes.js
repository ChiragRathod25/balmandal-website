import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addPost,
    updatePost,
    deletePost,
    getPostById,
    getPosts,
    getPostsByUserId,
    getPostsByTag,
    getPublishedPosts,
    togglePublishStatus,
    toggleIsCommentsEnabled,
    toggleIsApproved,
    updatePostStatus,

} from "../controllers/post.controller.js";
import { createNotification } from "../controllers/notification.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(addPost,createNotification).get(getPosts);
router.route("/published").get(getPublishedPosts);
router.route("/filter").get(getPostsByTag);
router.route("/user/:userId").get(getPostsByUserId);
router.route("/:postId").get(getPostById).put(updatePost).delete(deletePost);
router.route("/:postId/publish").put(togglePublishStatus);
router.route("/:postId/comments").put(toggleIsCommentsEnabled);
router.route("/:postId/approval").put(toggleIsApproved);
router.route("/:postId/status").put(updatePostStatus);

router.route("/uploadFile").post(upload.single("upload"), async (req, res) => {
    const response = await uploadOnCloudinary(req.file.path);
    res.status(200).json({ url: response.url });
});
router.route("/deleteFile").post(async (req, res) => {
    const response = await deleteFromCloudinary(req.body.url);
    res.status(200).json({ message: response.result });
});

export default router;