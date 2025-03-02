import { ApiResponce } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";

//controllers list
//1. addPost
//2. updatePost
//3. deletePost
//4. getPostById
//5. getPosts
//6. getPostsByUserId
//7. getPostsByTag
//8. getPublishedPosts
//9. togglePublishStatus
//10. toggleIsCommentsEnabled
//11. updatePostApprovalStatus
//12. updatePostStatus

const addPost = asyncHandler(async (req, res, next) => {
  const { title, content, slug, status, tags, commentsEnabled } = req.body;
  if ([title, content, slug].some((field) => (field.trim() ?? "") === "")) {
    throw new ApiError(400, "Title, Content and Slug are required");
  }
  let featuredImage = "";
  if (req.file) {
    try {
      const result = await uploadOnCloudinary(req.file);
      featuredImage = result.secure_url;
    } catch (error) {
      console.log(
        "Error in uploading post featured image to cloudinary",
        error
      );
      throw new ApiError(500, "Error in uploading post featured image");
    }
  }
  const post = await Post.create({
    title,
    content,
    featuredImage,
    slug,
    status,
    tags,
    commentsEnabled,
    meta: {
      title,
      description: content.slice(0, 100),
      keywords: tags.join(","),
    },
    createdBy: req.user._id,
  });

  if (!post) {
    throw new ApiError(500, "Error in creating post");
  }
  res.status(201).json(new ApiResponce("Post created successfully", post));
});

const updatePost = asyncHandler(async (req, res, next) => {
  const { title, content, slug, status, tags, commentsEnabled } = req.body;

  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(400, "Post Id is required");
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  let featuredImage = post.featuredImage;
  if (req.file) {
    try {
      const result = await uploadOnCloudinary(req.file);
      featuredImage = result.secure_url;
    } catch (error) {
      console.log(
        "Error in uploading post featured image to cloudinary",
        error
      );
      throw new ApiError(500, "Error in uploading post featured image");
    }
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      title,
      content,
      featuredImage,
      slug,
      status,
      tags,
      commentsEnabled,
      meta: {
        title,
        description: content.slice(0, 100),
        keywords: tags.join(","),
      },
    },
    { new: true }
  );

  if (!updatedPost) {
    throw new ApiError(500, "Error in updating post");
  }
  res
    .status(200)
    .json(new ApiResponce("Post updated successfully", updatedPost));
});

const deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(400, "Post Id is required");
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  const deletedPost = await Post.findByIdAndDelete(postId);
  if (!deletedPost) {
    throw new ApiError(500, "Error in deleting post");
  }

  res.status(200).json(new ApiResponce("Post deleted successfully", {}));
});

const getPostById = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(400, "Post Id is required");
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  res.status(200).json(new ApiResponce("Post found", post));
});

const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json(new ApiResponce("Posts found", posts));
});

const getPostsByUserId = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "User Id is required");
  }
  const posts = await Post.find({ createdBy: userId });
  res.status(200).json(new ApiResponce("Posts found", posts));
});
const getPostsByTag = asyncHandler(async (req, res, next) => {
  const { tag } = req.query;
  if (!tag) {
    throw new ApiError(400, "Tag is required");
  }
  const posts = await Post.find(
    {
      tags: { $in: [tag] },
    },
    { title: 1, content: 0 }
  );
  res.status(200).json(new ApiResponce("Posts found", posts));
});

const getPublishedPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ status: "published" });
  res.status(200).json(new ApiResponce("Posts found", posts));
});

const togglePublishStatus = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(400, "Post Id is required");
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      status: post.status === "published" ? "draft" : "published",
    },
    { new: true }
  );
  if (!updatedPost) {
    throw new ApiError(500, "Error in updating post status");
  }
  res
    .status(200)
    .json(new ApiResponce("Post status updated successfully", updatedPost));
});

const toggleIsCommentsEnabled = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(400, "Post Id is required");
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      commentsEnabled: !post.commentsEnabled,
    },
    { new: true }
  );
  if (!updatedPost) {
    throw new ApiError(500, "Error in updating post comments enabled status");
  }
  res
    .status(200)
    .json(
      new ApiResponce(
        "Post comments enabled status updated successfully",
        updatedPost
      )
    );
});

const updatePostApprovalStatus = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { approvalStatus } = req.body;
  if (!postId) {
    throw new ApiError(400, "Post Id is required");
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      approvalStatus,
    },
    { new: true }
  );
  if (!updatedPost) {
    throw new ApiError(500, "Error in updating post approval status");
  }
  res
    .status(200)
    .json(
      new ApiResponce("Post approval status updated successfully", updatedPost)
    );
});

const updatePostStatus = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { status } = req.body;
  if (!postId) {
    throw new ApiError(400, "Post Id is required");
  }
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      status,
    },
    { new: true }
  );
  if (!updatedPost) {
    throw new ApiError(500, "Error in updating post status");
  }
  res
    .status(200)
    .json(new ApiResponce("Post status updated successfully", updatedPost));
});

export {
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
  updatePostApprovalStatus,
  updatePostStatus,
};
