export class AppError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number = 500) {
        super(message)
        this.statusCode = statusCode
        Object.setPrototypeOf(this, AppError.prototype)
    }
}

export class AiApiKeyMissingException extends AppError {
    constructor(message = "AI API key is missing. Pass it using environment variable.") {
        super(message, 401)
        Object.setPrototypeOf(this, AiApiKeyMissingException.prototype)
    }
}