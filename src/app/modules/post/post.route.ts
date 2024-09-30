import express from "express";
import { PostControllers } from "./post.controller";
import { multerUpload } from "../../config/multer.config";


const router = express.Router();

router.post(
    "/",
    //  auth(USER_ROLE.admin, USER_ROLE.user),
    multerUpload.single('image'),
    PostControllers.CreatePost);


router.get("/", PostControllers.GetAllPosts);
router.patch(
    "/:id",
    //  auth(USER_ROLE.admin),
    PostControllers.UpdatePost);
router.delete(
    "/:id",
    //  auth(USER_ROLE.admin), 
    PostControllers.DeletePost);

export const PostRoutes = router;
