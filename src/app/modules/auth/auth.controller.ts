/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./authService";

const signUp = catchAsync(async (req, res) => {
    const result = await AuthServices.signUp(req.body);
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User registered successfully",
        data: result,
    });
});

const login = catchAsync(async (req, res) => {
    const { accessToken, user } = await AuthServices.loginUser(req.body);
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'User logged in successfully',
        data: { user, accessToken, refreshToken },
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Access token is retrieved successfully!',
        data: result,
    });
})


const forgetPassword = catchAsync(async (req, res) => {
    // console.log(req, 'from controller')
    const result = await AuthServices.forgetPassword(req.body.email);
    // console.log(req.body.email, 'from controller')
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Reset password link sent successfully',
        data: result,
    });
});

const resetPassword = catchAsync(async (req, res) => {

    // const userID = req.body.id;
    // console.log(req.body.password, 'from controller')
    const token = req.headers.authorization;
    const result = await AuthServices.resetPassword(req.body, token as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Password is reset successful!!',
        data: result,
    });
});

export const AuthControllers = {
    signUp,
    login,
    refreshToken,
    forgetPassword,
    resetPassword,
}