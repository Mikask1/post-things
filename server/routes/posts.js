import express from "express";

import {getPosts, createPost, updateLike, updatePost, deletePost, getImage, addComment, deleteComment} from "../controller/posts.js"

import tokenValidation from "../middleware/auth.js"

const router = express.Router()

router.get("/", getPosts)  
router.post("/", tokenValidation, createPost)
router.patch("/:postID", tokenValidation, updatePost)
router.delete("/:postID", tokenValidation, deletePost)
router.get("/:postID/image", getImage)
router.patch("/:postID/like", tokenValidation, updateLike)
router.post("/:postID/comments", addComment)
router.delete("/:postID/:commentID", deleteComment)

export default router