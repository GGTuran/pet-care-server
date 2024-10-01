import express from 'express';
import validate from '../../middlewares/validate';

import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { userValidations } from '../user/user.validation';

const router = express.Router();

router.post(
    '/signup',
    validate(userValidations.createUserZod),
    AuthControllers.signUp
);

router.post(
    '/login',
    validate(AuthValidation.loginZod),
    AuthControllers.login
);

router.post(
    '/refresh-token',
    AuthControllers.refreshToken,
);

router.post(
    '/forget-password',
    AuthControllers.forgetPassword,
);

router.post(
    '/reset-password',
    AuthControllers.resetPassword,
);


export const AuthRoutes = router; 