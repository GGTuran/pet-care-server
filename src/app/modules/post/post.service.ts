
import AppError from "../../errors/AppError";
import { initiatePayment, verifyPayment } from "../payment/payment.utils";
import { TPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../user/user.model";
import { Request } from "express";

const CreatePostInDB = async (postData: TPost) => {
    const newPost = await Post.create(postData);
    return newPost;
};

const GetAllPostsFromDB = async (req: Request) => {

    const { category, searchTerm } = req.query;

    // Construct the category filter
    const categoryQuery = category && category !== 'all' ? { category } : {};

    // Construct the search query using regex for partial matching
    const searchQuery = searchTerm
        ? {
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { content: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ],
        }
        : {};

    // Combine both category and search queries
    const query = { ...categoryQuery, ...searchQuery };

    const posts = await Post.find(query).populate("comments").populate("author").sort({ upVotes: -1 });
    return posts;
};

const GetPostsById = async (id: string) => {
    const posts = await Post.find({ author: id }).populate("comments").populate("author").sort({ createdAt: -1 });
    return posts;
}

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

const UpVotePostInDB = async (id: string) => {
    const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $inc: { upVotes: 1 } },
        { new: true }
    );
    if (!updatedPost) {
        throw new AppError(404, "Post not found");
    }
    return updatedPost;
};

const DownVotePostInDB = async (id: string) => {
    const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $inc: { downVotes: 1 } },
        { new: true }
    );
    if (!updatedPost) {
        throw new AppError(404, "Post not found");
    }
    return updatedPost;
};


const paymentIntoDB = async (id: string) => {
    const me = await User.findById(id);
    // console.log(me, 'from service')
    const userId = me?._id;

    const transactionId = `TXN-${Date.now()}`;


    const paymentData = {
        transactionId,
        userId,
        amount: 1000,
        customerName: me?.name,
        customerEmail: me?.email,
        customerPhone: me?.phone,
        customerAddress: me?.address,
    };

    // console.log(paymentData, 'from service payment data')

    const paymentSession = await initiatePayment(paymentData);

    const verifyResponse = await verifyPayment(transactionId);

    return {
        paymentSession,
        verifyResponse,

    }


}


const searchPostFromDB = async (searchTerm: string) => {
    const querySearch = searchTerm
        ? {
            $or: [                                                               //using or operator will take all the conditions and apply any of them   
                { title: { $regex: searchTerm, $options: 'i' } },
                { content: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
                // { tags: { $regex: searchTerm, $options: 'i' } },
            ],
        }
        : {};
    const result = await Post.find(querySearch).populate("comments").populate("author");                              //search by text or fetch all data
    return result;
}


export const PostServices = {
    CreatePostInDB,
    GetAllPostsFromDB,
    UpdatePostInDB,
    DeletePostFromDB,
    UpVotePostInDB,
    DownVotePostInDB,
    GetPostsById,
    paymentIntoDB,
    searchPostFromDB,
};








