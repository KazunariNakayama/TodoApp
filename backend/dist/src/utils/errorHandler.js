import { CustomError } from './customError';
export const handleError = (error, c) => {
    if (error instanceof CustomError) {
        return c.json({
            error: error.message,
            statusCode: error.statusCode
        }, error.statusCode);
    }
    else {
        return c.json({
            error: 'Internal Server Error',
            statusCode: 500
        }, 500);
    }
};
