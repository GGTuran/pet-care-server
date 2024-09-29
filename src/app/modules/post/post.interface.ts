import { Types } from "mongoose";

export type TPost = {
    title: string;
    content: string;
    category: string;
    author: Types.ObjectId;
    premium: boolean;
    upVotes: number;
    downVotes: number;
    comments: string[];
};