import { z } from "zod";
import { USER_ROLE } from "./user.constants";

const createUserZod = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: "Invalid email" }),
    password: z.string({ required_error: 'Password is required' }),
    phone: z.string({ required_error: 'Phone Number is required' }),
    address: z.string({ required_error: 'Address is required' }),
    role: z.nativeEnum(USER_ROLE),
    image: z.string().optional(),
    followers: z.string().array().optional(),
    following: z.string().array().optional(),
  }),
});

const updateUserZod = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    email: z.string({ required_error: 'Email is required' }).email({ message: "Invalid email" }).optional(),
    password: z.string({ required_error: 'Password is required' }).optional(),
    phone: z.string({ required_error: 'Phone Number is required' }).optional(),
    address: z.string({ required_error: 'Address is required' }).optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    image: z.string().optional(),
    followers: z.string().array().optional(),
    following: z.string().array().optional(),
  }),
});

export const userValidations = {
  createUserZod,
  updateUserZod,
};
