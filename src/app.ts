import express from 'express';
import campaignRoutes from './routes/campaign.routes.js';
import { errorHandlerMiddleware } from "./utils/errorHandler.js";

const app = express();
app.use(express.json());

app.use('/api/campaigns', campaignRoutes);

app.use(errorHandlerMiddleware)

export default app;
