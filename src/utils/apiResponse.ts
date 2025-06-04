/**
 * Sends a successful JSON response with a message, data, and status code.
 *
 * @param res - Express response object
 * @param data - Data to return in the response
 * @param message - Optional success message (default: "Success")
 * @param code - HTTP status code (default: 200)
 */
export const successResponse = (res: any, data: any, message = 'Success', code = 200) => {
    return res.status(code).json({ success: true, message, data });
};

/**
 * Sends an error JSON response with a message and status code.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Something went wrong")
 * @param code - HTTP status code (default: 500)
 */
export const errorResponse = (res: any, message = 'Something went wrong', code = 500) => {
    return res.status(code).json({ success: false, message });
};
