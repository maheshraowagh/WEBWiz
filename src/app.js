import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import authRouter from './routes/user.routes.js';
import formRouter from './routes/contact.router.js';
import serviceRouter from './routes/service.router.js';
import adminRouter from './routes/admin.router.js';
import initializingPassport from './Passport/passport.js';
import errorMiddleware from '../middlewares/error_middleware.js';

dotenv.config({
    path: '../.env'
});

// Initialize Express app
const app = express();

// CORS options
const corsOptions = {
    origin: "http://localhost:5174",
    methods: "GET, POST, DELETE, PATCH, HEAD",
    credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON request bodies
app.use(express.json());

// Configure session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport and its session handling
initializingPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use("/api/user", authRouter);
app.use("/api/form", formRouter);
app.use("/api/data", serviceRouter);
app.use("/api/admin", adminRouter);

// Error handling middleware should be placed after all routes
app.use(errorMiddleware);

export { app };
