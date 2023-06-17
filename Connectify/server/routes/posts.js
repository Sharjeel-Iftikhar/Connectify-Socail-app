import express  from "express";
import { verifyToken } from "../middleware/auth.js";
import { GetFeedPosts, GetUserPosts, LikePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", verifyToken, GetFeedPosts);
router.get("/:userId/posts", verifyToken, GetUserPosts);


// Update
router.patch("/:id/like",verifyToken,LikePost);

export default router;