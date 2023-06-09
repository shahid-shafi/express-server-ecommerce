exports.register = async (req, res) => {
    const existingUser = await User.findOne({ userName: req.body.userName });
    if (existingUser) {
        return res.status(400).json({ status: 'fail', message: 'Username already exists' });
    }

    const newUser = await User.create({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });
    console.log('user is', newUser);


    try {
        return res.status(200).json({
            status: 'success',
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 'fail', message: 'Something went wrong while creating user' });
    }
};

//*LOGIN 
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.body.userName,
            password: req.body.password,
        });

        console.log('req.body', req.body);
        console.log('user is', user);

        if (!user) {
            return res.status(401).json('Invalid Credentials!');
        }

        const accessToken = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        const { password, ...others } = user._doc;

        return res.status(200).json({
            status: 'success',
            message: 'Login successfully',
            data: user,
        });
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({ status: 'fail', message: 'Something went wrong while login' });
    }

}
const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.route('/register')
    .post(authController.register)


router.route('/login')
    .get(authController.loginUser)


module.exports = router