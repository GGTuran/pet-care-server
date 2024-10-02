import express from "express";
import { CommentControllers } from "./comment.controller";
import { USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";


const router = express.Router();

router.post("/",
    auth(USER_ROLE.user, USER_ROLE.admin),
    CommentControllers.CreateComment);

router.get("/:postId", CommentControllers.GetCommentsForPost);

router.get("/:id", CommentControllers.GetCommentById);

router.patch(
    "/:id",
    auth(USER_ROLE.user, USER_ROLE.admin),
    CommentControllers.updateComment
)

router.delete(
    "/:id",
    auth(USER_ROLE.user, USER_ROLE.admin),
    CommentControllers.DeleteComment);

export const CommentRoutes = router;
