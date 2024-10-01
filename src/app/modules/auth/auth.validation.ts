import { z } from "zod";

const loginZod = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});


const forgetPasswordZod = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
  }),
});


const resetPasswordZod = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
    newPassword: z.string({
      required_error: 'User password is required!',
    }),
  }),
});


export const AuthValidation = {
  loginZod,
  forgetPasswordZod,
  resetPasswordZod,
}
