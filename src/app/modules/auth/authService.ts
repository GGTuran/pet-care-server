/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const signUp = async (payload: TUser) => {
    const result = await User.create(payload);
    //creating access token
    const jwtPayload = {
        userId: result?._id,
        email: result?.email,
        role: result?.role,
        name: result?.name,
        phone: result?.phone,
        address: result?.address,
        image: result?.image,
        followers: result?.followers,
        following: result?.following,
    };

    const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET as string, {
        expiresIn: config.jwt_access_expires_in,
    });

    //creating refresh token
    const refreshPayload = {
        userId: result?._id,
        email: result?.email,
        role: result?.role,
        name: result?.name,
        phone: result?.phone,
        address: result?.address,
        image: result?.image,
        followers: result?.followers,
        following: result?.following,
    };

    const refreshToken = jwt.sign(refreshPayload, config.JWT_REFRESH_SECRET as string, {
        expiresIn: config.jwt_refresh_expires_in,
    });


    return { result, accessToken, refreshToken };
};

const loginUser = async (payload: TLoginUser) => {
    const user = await User.findOne({ email: payload?.email }).select('-createdAt -updatedAt -__v');
    //checking if the user exist or not 
    if (!user) {
        throw new AppError(400, 'User does not exist!');
    }

    //matching the given password in database
    const comparePassword = await bcrypt.compare(payload?.password, user?.password);
    if (!comparePassword) {
        throw new AppError(404, 'Password does not match!');
    }

    //creating access token
    const jwtPayload = {
        userId: user?._id,
        email: user?.email,
        role: user?.role,
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
        image: user?.image,
        followers: user?.followers,
        following: user?.following,
    };

    const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET as string, {
        expiresIn: config.jwt_access_expires_in,
    });

    //creating refresh token
    const refreshPayload = {
        userId: user?._id,
        email: user?.email,
        role: user?.role,
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
        image: user?.image,
        followers: user?.followers,
        following: user?.following,
    };

    const refreshToken = jwt.sign(refreshPayload, config.JWT_REFRESH_SECRET as string, {
        expiresIn: config.jwt_refresh_expires_in,
    });

    return {
        accessToken,
        refreshToken,
        user,
    }


};

const refreshToken = async (token: string) => {
    const decoded = jwt.verify(
        token,
        config.JWT_REFRESH_SECRET as string,
    ) as JwtPayload;

    const { userId } = decoded;

    const user = await User.findById({ userId }).select('-createdAt -updatedAt -__v');
    //checking if the user exist or not 
    if (!user) {
        throw new AppError(400, 'User does not exist!');
    }

    const jwtPayload = {
        userId: user?._id,
        email: user?.email,
        role: user?.role,
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
        image: user?.image,
        followers: user?.followers,
        following: user?.following,
    };

    const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET as string, {
        expiresIn: config.jwt_access_expires_in,
    });

    return {
        accessToken
    };

};



export const AuthServices = {
    signUp,
    loginUser,
    refreshToken,
}