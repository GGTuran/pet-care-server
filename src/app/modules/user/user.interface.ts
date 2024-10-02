import { Types } from "mongoose";
import { USER_ROLE } from "./user.constants";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  image?: string;
  role: TUserRoles;
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  isPaid?: boolean;
};

export type TUserRoles = keyof typeof USER_ROLE;