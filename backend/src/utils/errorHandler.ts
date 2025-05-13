import { Context } from 'hono';
import { CustomError } from './customError';

type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

export const handleError = (error: unknown, c: Context) => {
    if (error instanceof CustomError) {
        return c.json({ 
            error: error.message,
            statusCode: error.statusCode 
        }, error.statusCode as StatusCode);
    } else {
        return c.json({ 
            error: 'Internal Server Error',
            statusCode: 500 
        }, 500);
    }
}