
import AppError from "../../errors/AppError";
import { initiatePayment, verifyPayment } from "../payment/payment.utils";
import { TPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../user/user.model";

const CreatePostInDB = async (postData: TPost) => {
    const newPost = await Post.create(postData);
    return newPost;
};

const GetAllPostsFromDB = async () => {
    const posts = await Post.find().populate("comments").populate("author").sort({ createdAt: -1 });
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


export const PostServices = {
    CreatePostInDB,
    GetAllPostsFromDB,
    UpdatePostInDB,
    DeletePostFromDB,
    UpVotePostInDB,
    DownVotePostInDB,
    GetPostsById,
    paymentIntoDB
};








