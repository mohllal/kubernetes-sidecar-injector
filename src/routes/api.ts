import { Router } from 'express';

import healthRouter from './health';

const baseRouter = Router();

// Setup routers
baseRouter.use('/health', healthRouter);

export default baseRouter;
