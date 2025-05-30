"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const customError_1 = require("./customError");
const handleError = (error, c) => {
    if (error instanceof customError_1.CustomError) {
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
exports.handleError = handleError;
