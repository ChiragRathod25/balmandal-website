import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addComment,
    updateComment,
    deleteComment,
    getPostComments,
    getCommentsByUserId,
} from "../controllers/comment.controller.js";
const router=Router();
router.use(verifyJWT);

router.route("/:postId")
.post(addComment)
.get(getPostComments);

router.route("/:commentId")
.put(updateComment)
.delete(deleteComment);

router.route("/user/:userId")
.get(getCommentsByUserId);

export default router;