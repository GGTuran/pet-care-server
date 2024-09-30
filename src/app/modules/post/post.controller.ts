/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";

const CreatePost = catchAsync(async (req, res) => {
    console.log(req.body.data);
    console.log(req.file);
    const result = await PostServices.CreatePostInDB({
        ...JSON.parse(req?.body?.data),
        image: req.file?.path,
    });
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

const UpvotePost = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PostServices.UpVotePostInDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Post upVoted successfully",
        data: result,
    });
});

const DownvotePost = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await PostServices.DownVotePostInDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Post downVoted successfully",
        data: result,
    });
});

export const PostControllers = {
    CreatePost,
    GetAllPosts,
    UpdatePost,
    DeletePost,
    UpvotePost,
    DownvotePost,
};
