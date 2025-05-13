export class CustomError extends Error {
    statusCode: number;
    constructor(message:string, statusCode = 500) {
        super(message);
        this.name= 'CustomError';
        this.statusCode = statusCode;
    }
}