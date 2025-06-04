import { UserService } from '../service/index.js'
const userService = new UserService();

const signup = async (req, res) => {
    try {
        const response = await userService.signup(req.body);
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully signed up a new user',
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const response = await userService.signin(req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully logged in',
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export {
    signup,
    login
}