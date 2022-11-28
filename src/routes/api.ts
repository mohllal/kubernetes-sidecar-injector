import { Router } from 'express';

import healthRouter from './health';
import mutationRouter from './mutation';

const baseRouter = Router();

// Setup routers
baseRouter.use('/health', healthRouter);
baseRouter.use('/mutation', mutationRouter);

export default baseRouter;
