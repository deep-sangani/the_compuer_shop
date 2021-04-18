import dotenv from 'dotenv';
dotenv.config();

export const {
    PORT,
    DEBUG_MODE,
    JWT_SECRET,
    REFRESH_SECRET
} = process.env;