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

const router = Router();
router.use(verifyJWT);

router.route("/").post(addPost).get(getPosts);
router.route("/published").get(getPublishedPosts);
router.route("/filter").get(getPostsByTag);
router.route("/user/:userId").get(getPostsByUserId);
router.route("/:postId").get(getPostById).put(updatePost).delete(deletePost);
router.route("/:postId/publish").put(togglePublishStatus);
router.route("/:postId/comments").put(toggleIsCommentsEnabled);
router.route("/:postId/approval").put(toggleIsApproved);
router.route("/:postId/status").put(updatePostStatus);


export default router;