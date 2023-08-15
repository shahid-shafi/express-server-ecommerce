"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMessage = exports.globalMessages = void 0;
exports.globalMessages = {
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
};
const responseMessage = (req, requestType) => {
    const key = Object?.keys(exports.globalMessages[requestType])?.find(key => req?.url?.includes(key));
    return exports.globalMessages[requestType]?.[key];
};
exports.responseMessage = responseMessage;
