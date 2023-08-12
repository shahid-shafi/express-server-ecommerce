import { Request } from "express";

interface GlobalMessages {
    getAll?: KeyValue;
    getOne?: KeyValue;
    createOne?: KeyValue;
    deleteOne?: KeyValue;
    updateOne?: KeyValue;
}

type KeyValue = {
    [key: string]: string;
}

export const globalMessages: GlobalMessages = {
    getAll: {
        '/products': 'Products Fetched Successfully',
        '/users': 'Users Fetched Successfully',
        '/category': 'Catagories Fetched Successfully',
        '/roles': 'User Roles Fetched Successfully'
    },
    getOne: {
        '/products': 'Product Fetched Successfully',
        '/users': 'User Fetched Successfully',
        '/category': 'Category Fetched Successfully',
        '/roles': 'User Role Fetched Successfully'
    },
    createOne: {
        '/products': 'Product Created Successfully',
        '/users': 'User Created Successfully',
        '/category': 'Category Created Successfully',
        '/roles': 'User Role Created Successfully'
    },
    deleteOne: {
        '/products': 'Product Deleted Successfully',
        '/users': 'User Deleted Successfully',
        '/category': 'Category Deleted Successfully',
        '/roles': 'User Role Deleted Successfully'
    },
    updateOne: {
        '/products': 'Product Updated Successfully',
        '/users': 'User Updated Successfully',
        '/category': 'Category Updated Successfully',
        '/roles': 'User Role Updated Successfully'
    },
}

export const responseMessage = (req: Request, requestType: keyof GlobalMessages): string | undefined => {
    const key = Object?.keys(globalMessages[requestType])?.find(key =>
        req?.url?.includes(key)
    );
    return globalMessages[requestType]?.[key];
}