const express = require('express');
const validators = require('../middlewares/validators');
const AuthController = require('../controllers/authController');
const authRouter = express.Router();

authRouter.post(
  '/sign-up',
  validators.validateRegistrationData,
  AuthController.signUp
);
authRouter.post('/sign-in', validators.validateLogin, AuthController.signIn);
authRouter.post('/refresh', AuthController.refresh);

module.exports = authRouter;
