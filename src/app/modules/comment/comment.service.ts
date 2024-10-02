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
    const comments = await Comment.find({ postId }).populate('author');
    return comments;
};

const getCommentById = async (id: string) => {
    const comments = await Comment.findOne({ id }).populate('author');
    return comments;
}

const updateCommentIntoDB = async (id: string, updateData: Partial<TComment>) => {
    const updatedComment = await Comment.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    if (!updatedComment) {
        throw new AppError(404, "Post not found");
    }
    return updatedComment;
}

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
    getCommentById,
    DeleteCommentFromDB,
    updateCommentIntoDB,
};
