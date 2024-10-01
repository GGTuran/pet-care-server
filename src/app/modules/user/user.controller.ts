import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./userService";

const GetProfile = catchAsync(async (req, res) => {
    const result = await UserServices.GetProfileFromDB(req);        //only sending req will extract the data and give to client

    // console.log('controller',result);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'User profile retrieved successfully',
        data: result,
    });
});

const UpdateProfile = catchAsync(async (req, res) => {
    const result = await UserServices.UpdateProfileIntoDB(req);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Profile updated successfully',
        data: result
    });
});

const GetAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.GetAllUsersFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'User profiles retrieved successfully',
        data: result,
    });
});

const PromoteUserToAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.PromoteUserToAdminInDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Profile updated successfully',
        data: result
    });

});

const DeleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.DeleteUserFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User deleted successfully",
        data: result,
    })
})

const followUser = catchAsync(async (req, res) => {
    const result = await UserServices.followUser(req);
    console.log(req)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User followed successfully!',
        data: result,
    });
});

const getFollowedUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getFollowedUsers(req);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Fetched followers successfully!',
        data: result,
    });
});




export const UserControllers = {
    GetProfile,
    UpdateProfile,
    GetAllUsers,
    PromoteUserToAdmin,
    DeleteUser,
    followUser,
    getFollowedUsers,
}