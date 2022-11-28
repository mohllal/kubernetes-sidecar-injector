import winston, { transports, format } from 'winston';
import expressWinston, { LoggerOptions, ErrorLoggerOptions } from 'express-winston';
import { Request, Response, ErrorRequestHandler, RequestHandler } from 'express';

const logger = winston.createLogger({
  level: 'info',
  format: format.json(),
  transports: [new transports.Console()],
  exitOnError: false,
});

export default logger;

const requestLoggerMiddlewareOptions: LoggerOptions = {
  winstonInstance: logger,
  requestWhitelist: ['query', 'body'],
  responseWhitelist: ['body'],
  expressFormat: true,
  level: (__: Request, res: Response): string => {
    let logLevel = '';
    if (res.statusCode >= 400) {
      logLevel = 'warn';
    } else if (res.statusCode >= 500) {
      logLevel = 'error';
    } else {
      logLevel = 'info';
    }
    return logLevel;
  },
};

export const requestLoggerMiddleware: RequestHandler = 
  expressWinston.logger(requestLoggerMiddlewareOptions);

const errorLoggerMiddlewareOptions: ErrorLoggerOptions = {
  winstonInstance: logger,
  metaField: null,
  requestWhitelist: ['query', 'body'],
  msg: '{{req.method}} {{req.path}} {{err.message}}',
};

export const errorLoggerMiddleware: ErrorRequestHandler =
  expressWinston.errorLogger(errorLoggerMiddlewareOptions);