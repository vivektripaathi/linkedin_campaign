import express from 'express';
import campaignRoutes from './routes/campaign.routes.js';

const app = express();
app.use(express.json());

app.use('/api/campaigns', campaignRoutes);

export default app;
