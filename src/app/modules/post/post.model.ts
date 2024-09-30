import { Schema, model } from "mongoose";
import { TPost } from "./post.interface";


const postSchema = new Schema<TPost>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        premium: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            default: null,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to User model
            required: true,
        },
        upVotes: {
            type: Number,
            default: 0,
        },
        downVotes: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Post = model<TPost>("Post", postSchema);