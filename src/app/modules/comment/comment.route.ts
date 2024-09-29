import express from "express";
import { CommentControllers } from "./comment.controller";


const router = express.Router();

router.post("/",
    // auth(USER_ROLE.user),
    CommentControllers.CreateComment);
router.get("/:postId", CommentControllers.GetCommentsForPost);
router.delete(
    "/:id",
    //  auth(USER_ROLE.admin),
    CommentControllers.DeleteComment);

export const CommentRoutes = router;
