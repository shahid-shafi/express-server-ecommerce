export const userRoles = {
    admin: 'admin',
    user: 'user',
    seller: 'seller',
}

//: Check respective schema for required fields. 
export const requiredFields = {
    createUser: ['name', 'email', 'password'],
    createProduct: ['title', 'description', 'price', 'category', 'thumbnail', 'createdby'],
    createReview: ['user', 'product', 'rating'],
    createCategory: ['title'],
    createRole: ['title'],
};