import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import campaignRoutes from './routes/campaign.routes.js';
import linkedinRoutes from './routes/linkedin.routes.js';
import { errorHandlerMiddleware } from './utils/errorHandler.js';
import leadRoutes from './routes/lead.routes.js';
import webhookRoutes from './routes/webhook.routes.js';
import accountRoutes from './routes/account.routes.js';
import chatRoutes from './routes/chat.routes.js';
import messageRoutes from './routes/message.routes.js';
import http from 'http';
import { initSocket } from './utils/socket.js';


dotenv.config();

const app = express();
const server = http.createServer(app);

initSocket(server);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/personalized-message', linkedinRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/webhooks', webhookRoutes);

// Error handling
app.use(errorHandlerMiddleware);

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}
connectDB(mongoUri);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the Express app for Vercel
export default app;
