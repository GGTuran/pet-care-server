import express from "express";
import { PostControllers } from "./post.controller";
import { multerUpload } from "../../config/multer.config";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";


const router = express.Router();

router.post(
    "/",
    //  auth(USER_ROLE.admin, USER_ROLE.user),
    multerUpload.single('image'),
    PostControllers.CreatePost);


router.get("/", PostControllers.GetAllPosts);

router.get("/:id", PostControllers.GetPost)

router.patch(
    "/:id",
    //  auth(USER_ROLE.admin),
    PostControllers.UpdatePost);
router.delete(
    "/:id",
    auth(USER_ROLE.admin, USER_ROLE.user),
    PostControllers.DeletePost);

router.patch(
    "/:id/upvote",
    PostControllers.UpvotePost);


router.patch("/:id/downvote", PostControllers.DownvotePost);

router.post("/payment/:id", PostControllers.payment)

export const PostRoutes = router;
