import express from 'express';
 import{Home,registerUser,loginUser,user} from '../controllers/userControllers.js';
 import validate from '../../middlewares/validate-middleware.js';
 import {signupSchema,loginSchema} from '../../validator/auth-validator.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import passport from 'passport';

 const router = express.Router()


// Home route
router.get('/', Home);

// Registration route with validation
router.post('/register', validate(signupSchema), registerUser);

// Login route with validation
router.post('/login', validate(loginSchema) ,passport.authenticate("local"), loginUser);

// Protected user route with authentication middleware
router.get('/user', authMiddleware, user);




 export default router