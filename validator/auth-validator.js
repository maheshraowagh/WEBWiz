import { z } from 'zod';

// Creating object schema

const signupSchema = z.object({
    name: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 chars." })
        .max(150, { message: "Name must not be more than 150 chars" }),

    email: z.string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 chars." })
        .max(255, { message: "Email must not be more than 255 chars" }),

    mobile: z.string({ required_error: "Phone number is required" })
        .length(10, { message: "Phone number must be exactly 10 digits" }),

    password: z.string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least 7 chars." })
        .max(250, { message: "Password must not be more than 250 chars" }),
});

const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 chars." })
        .max(255, { message: "Email must not be more than 255 chars" }),

    password: z.string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least 7 chars" })
        .max(25, { message: "Password must not be more than 25 chars" }),
});

export { signupSchema, loginSchema };
