import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
};