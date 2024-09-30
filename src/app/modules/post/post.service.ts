import AppError from "../../errors/AppError";
import { TPost } from "./post.interface";
import { Post } from "./post.model";

const CreatePostInDB = async (postData: TPost) => {
    const newPost = await Post.create(postData);
    return newPost;
};

const GetAllPostsFromDB = async () => {
    const posts = await Post.find().populate("comments").populate("author");
    return posts;
};

const UpdatePostInDB = async (id: string, updateData: Partial<TPost>) => {
    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
        new: true,
    }).populate("comments");
    if (!updatedPost) {
        throw new AppError(404, "Post not found");
    }
    return updatedPost;
};

const DeletePostFromDB = async (id: string) => {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
        throw new AppError(404, "Post not found");
    }
    return deletedPost;
};

export const PostServices = {
    CreatePostInDB,
    GetAllPostsFromDB,
    UpdatePostInDB,
    DeletePostFromDB,
};