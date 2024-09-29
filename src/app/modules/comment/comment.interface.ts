import { Types } from "mongoose";

export type TComment = {
    postId: Types.ObjectId;
    author: string;
    text: string;
};