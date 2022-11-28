import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import apiRouter from '@routes/api';
import { HTTPError } from '@shared/errors';
import logger, { requestLoggerMiddleware, errorLoggerMiddleware } from '@lib/logger'

const app = express();

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(requestLoggerMiddleware);

/***********************************************************************************
 *                                  API routes
 **********************************************************************************/
app.use('/', apiRouter);

/***********************************************************************************
 *                                 Error handling
 **********************************************************************************/
app.use(errorLoggerMiddleware);

app.use((err: Error | HTTPError, _: Request, res: Response, __: NextFunction) => {
    logger.error(err.message, true);
    const status = (err instanceof HTTPError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});

export default app;
