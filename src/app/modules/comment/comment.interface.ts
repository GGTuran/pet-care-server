import { Types } from "mongoose";

export type TComment = {
    postId: Types.ObjectId;
    author: Types.ObjectId;
    text: string;
};