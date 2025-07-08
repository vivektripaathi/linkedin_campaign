import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { UserDao } from '../dao/user.dao.js';
import { wrapAsync } from '../utils/errorHandler.js';

const router = Router();
const userDao = new UserDao();
const userController = new UserController(userDao);

router.post('/signup', wrapAsync(userController.signup.bind(userController)));
router.post('/login', wrapAsync(userController.login.bind(userController)));

export default router;
