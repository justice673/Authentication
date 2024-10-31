const authService  = require('../services/auth.service');

const login = async (req, res) => {

    const verify = await authService.login(req.user, req.body.password);
    if (!verify.error) {
        return res.json(verify);
    }

    return res.status(400).json(verify);
};

const register = async (req, res) => {
    const create = await authService.register(req.body);
    res.status(201).json(create);
};

module.exports = { login, register };
