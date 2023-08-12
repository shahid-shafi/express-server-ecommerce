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
    var _a, _b;
    const key = (_a = Object === null || Object === void 0 ? void 0 : Object.keys(exports.globalMessages[requestType])) === null || _a === void 0 ? void 0 : _a.find(key => { var _a; return (_a = req === null || req === void 0 ? void 0 : req.url) === null || _a === void 0 ? void 0 : _a.includes(key); });
    return (_b = exports.globalMessages[requestType]) === null || _b === void 0 ? void 0 : _b[key];
};
exports.responseMessage = responseMessage;
