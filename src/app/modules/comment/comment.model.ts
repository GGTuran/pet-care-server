import { Schema, model } from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema = new Schema<TComment>(
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Comment = model<TComment>("Comment", commentSchema);