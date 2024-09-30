import { Comment } from "./comment.model";
import { TComment } from "./comment.interface";
import AppError from "../../errors/AppError";
import { Post } from "../post/post.model";

const CreateCommentInDB = async (commentData: TComment) => {
    const newComment = await Comment.create(commentData);
    // Update the Post's comments array
    await Post.findByIdAndUpdate(
        commentData.postId,
        { $push: { comments: newComment._id } },
        { new: true }
    );
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
    // Update the Post's comments array
    await Post.findByIdAndUpdate(
        deletedComment.postId,
        { $pull: { comments: id } },
        { new: true }
    );
    return deletedComment;
};

export const CommentServices = {
    CreateCommentInDB,
    GetCommentsForPostFromDB,
    DeleteCommentFromDB,
};
