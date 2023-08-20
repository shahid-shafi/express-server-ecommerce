import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/common/commonMethods";
import { createUserRoleService, deleteUserRoleByIdService, getAllUserRolesService, getUserRoleByIdService, updateUserRoleByIdService } from "./services/userRole.service";

export const createUserRole = catchAsync(async (req: Request, res: Response) => {
    const newUserRole = await createUserRoleService(req.body);
    sendResponse(res, 200, {
        status: true,
        data: newUserRole,
        message: "Role created successfully",
    });
});

export const getUserRoleById = catchAsync(async (req: Request, res: Response) => {
    const userRole = await getUserRoleByIdService(req.params.id);

    sendResponse(res, 200, {
        status: true,
        data: userRole,
        message: "Role fetched successfully"
    });
});

export const getAllUserRoles = catchAsync(async (req: Request, res: Response) => {
    const data = await getAllUserRolesService(req.query);

    if (!data?.roles?.length) {
        sendResponse(res, 204, {
            status: true,
            data: [],
            message: 'No roles found',
        })
    }

    sendResponse(res, 200, {
        status: true,
        data,
        message: 'Roles fetched successfully'
    });
});

export const updateUserRoleById = catchAsync(async (req: Request, res: Response) => {
    const updatedRole = await updateUserRoleByIdService(req.params.id, req.body);

    sendResponse(res, 200, {
        status: true,
        data: updatedRole,
        message: 'Role updated successfully',
    });
});

export const deleteUserRoleById = catchAsync(async (req: Request, res: Response) => {
    await deleteUserRoleByIdService(req.params.id);

    sendResponse(res, 200, {
        status: true,
        message: 'Role deleted successfully',
    });
});