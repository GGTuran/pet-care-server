import { Comment } from "./comment.model";
import { TComment } from "./comment.interface";
import AppError from "../../errors/AppError";

const CreateCommentInDB = async (commentData: TComment) => {
    const newComment = await Comment.create(commentData);
    return newComment;
};

const GetCommentsForPostFromDB = async (postId: string) => {
    const comments = await Comment.find({ postId });
    return comments;
};

const DeleteCommentFromDB = async (id: string) => {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
        throw new AppError(404, "Comment not found");
    }
    return deletedComment;
};

export const CommentServices = {
    CreateCommentInDB,
    GetCommentsForPostFromDB,
    DeleteCommentFromDB,
};
