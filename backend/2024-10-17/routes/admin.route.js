const { Router } = require('express');
const router = Router();

const adminController = require('../src/controllers/admin.controller');
const { verifyIfUserIsLogged } = require('../src/middlewares/auth.middleware');

router.get('/welcome', verifyIfUserIsLogged, adminController.welcome);

module.exports = router;
