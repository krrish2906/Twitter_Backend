import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/twitter');
        console.log('Connected to MongoDB successfully!\n');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}