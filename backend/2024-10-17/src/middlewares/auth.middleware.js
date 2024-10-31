const authService = require('../services/auth.service');

const verifyLoginBody = async (req, res, next) => {
    const body = req.body;
    if (!body.email || !body.password) {
        return res.status(400).json({
            error: true,
            message: 'Body must containc email and password.'
        });
    }

    const user = await authService.verifyIfIsUnique('email', body.email);
    if(!user) {
        return res.status(400).json({
            error: true,
            message: 'Invalid email or password.'
        });
    }

    req.user = user;
    next();
};

const verifyRegisterBody = async (req, res, next) => {
    const body = req.body;
    if (
        !body.first_name || !body.last_name ||
        !body.email || !body.username ||
        !body.password  || !body.password_confirm
    ) {
        return res.status(400).json({
            error: true,
            message: 'Body must contain first_name, last_name, email, username, password and password_confirm.'
        });
    }

    if (body.password !== body.password_confirm) {
        return res.status(400).json({
            error: true,
            message: 'Passwords do not match.'
        });
    }

    const isUniqueEmail = await authService.verifyIfIsUnique('email', body.email);
    if (isUniqueEmail) {
        return res.status(400).json({
            error: true,
            message: 'Email already exists.'
        });
    }

    const isUniqueUsername = await authService.verifyIfIsUnique('username', body.username);
    if (isUniqueUsername) {
        return res.status(400).json({
            error: true,
            message: 'Username already exists.'
        });
    }

    next();
};

const verifyIfUserIsLogged = async (req, res, next) => {
    const auth = req.header('Authorization');
    if (!auth) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. No token provided.'
        });
    }

    const verified = authService.tokenVerify(auth);
    if (!verified) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. Invalid token.'
        });
    }

    const user = await authService.verifyIfIsUnique('_id', verified.id);
    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. User not found.'
        });
    }

    req.auth = user;
    next();
};

module.exports = { verifyLoginBody, verifyRegisterBody, verifyIfUserIsLogged };

