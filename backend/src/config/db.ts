import mongoose from 'mongoose';

export const connectDB = async (mongoUri: string) => {

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
