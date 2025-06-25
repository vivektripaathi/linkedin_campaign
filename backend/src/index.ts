import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import campaignRoutes from './routes/campaign.routes.js';
import linkedinRoutes from './routes/linkedin.routes.js';
import { errorHandlerMiddleware } from './utils/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/personalized-message', linkedinRoutes);

// Error handling
app.use(errorHandlerMiddleware);

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}
connectDB(mongoUri);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the Express app for Vercel
export default app;
