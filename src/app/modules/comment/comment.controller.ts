import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";

const CreateComment = catchAsync(async (req, res) => {
    const result = await CommentServices.CreateCommentInDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Comment created successfully",
        data: result,
    });
});

const GetCommentsForPost = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const result = await CommentServices.GetCommentsForPostFromDB(postId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Comments retrieved successfully",
        data: result,
    });
});


const GetCommentById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CommentServices.getCommentById(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Comments retrieved successfully",
        data: result,
    });
});

const updateComment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CommentServices.updateCommentIntoDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Comments updated successfully",
        data: result,
    });
})

const DeleteComment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CommentServices.DeleteCommentFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Comment deleted successfully",
        data: result,
    });
});

export const CommentControllers = {
    CreateComment,
    GetCommentsForPost,
    GetCommentById,
    updateComment,
    DeleteComment,
};
