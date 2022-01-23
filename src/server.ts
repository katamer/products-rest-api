import morgan from 'morgan';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors'
import 'express-async-errors';

import router from './routes';
import logger from '@shared/Logger';

const app = express();


app.use(express.urlencoded({extended: true}));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.use('/', router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(err.status || 500).json({
        error: err.message,
    });
});

export default app;
