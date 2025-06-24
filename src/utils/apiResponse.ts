/**
 * Sends a successful JSON response with a message, data, and status code.
 *
 * @param res - Express response object
 * @param data - Data to return in the response
 * @param statusCode - HTTP status code (default: 200)
 */
export const successResponse = (res: any, data: any, statusCode = 200) => {
    return res.status(statusCode).json(data);
};
