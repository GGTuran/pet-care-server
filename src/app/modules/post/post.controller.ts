import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";

const CreatePost = catchAsync(async (req, res) => {
    const result = await PostServices.CreatePostInDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Post created successfully",
        data: result,
    });
});

const GetAllPosts = catchAsync(async (req, res) => {
    const result = await PostServices.GetAllPostsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Posts retrieved successfully",
        data: result,
    });
});

const UpdatePost = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PostServices.UpdatePostInDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Post updated successfully",
        data: result,
    });
});

const DeletePost = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PostServices.DeletePostFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Post deleted successfully",
        data: result,
    });
});

export const PostControllers = {
    CreatePost,
    GetAllPosts,
    UpdatePost,
    DeletePost,
};
