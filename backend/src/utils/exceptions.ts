export class AppError extends Error {
    code: string;
    statusCode: number

    constructor(message: string, statusCode: number = 500, code: string = "INTERNAL_SERVER_ERROR") {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export class AiApiKeyMissingException extends AppError {
    constructor(message = "AI API key is missing. Pass it using environment variable.") {
        super(message, 401, "AI_API_KEY_MISSING")
        Object.setPrototypeOf(this, AiApiKeyMissingException.prototype)
    }
}

export class InvalidRequestException extends AppError {
    constructor(message = "Invalid request") {
        super(message, 400, "INVALID_API_REQUEST")
        Object.setPrototypeOf(this, InvalidRequestException.prototype)
    }
}

export class NotFoundException extends AppError {
    constructor(message = "Not found") {
        super(message, 404, "NOT_FOUND")
        Object.setPrototypeOf(this, NotFoundException.prototype)
    }
}

export class BadResponseException extends AppError {
    constructor(message = "Bad response") {
        super(message, 400, "BAD_RESPONSE")
        Object.setPrototypeOf(this, BadResponseException.prototype)
    }
}

export class ErrorScrapingLeads extends AppError {
    constructor(message = "Error scraping for leads.") {
        super(message, 500, "SCRAPING_ERROR")
        Object.setPrototypeOf(this, ErrorScrapingLeads.prototype)
    }
}

export class AlreadyRetrievedSearchResultsException extends AppError {
    constructor(message = "We've already retrieved all results from that search.") {
        super(message, 400, "SCRAPING_ERROR")
        Object.setPrototypeOf(this, AlreadyRetrievedSearchResultsException.prototype)
    }
}

export class InvalidUnipileCredentialsException extends AppError {
    constructor(message = "Invalid LinkedIn credentials.") {
        super(message, 401, "INVALID_UNIPILE_CREDENTIALS")
        Object.setPrototypeOf(this, InvalidUnipileCredentialsException.prototype)
    }
}

export class AlreadyExistsException extends AppError {
    constructor(entity: string, field: string) {
        super(`${entity} with same ${field} already exists`, 400, "ALREADY_EXISTS_EXCEPTION")
        Object.setPrototypeOf(this, AlreadyExistsException.prototype)
    }
}

export class InvalidCredentialsException extends AppError {
    constructor(message = "Invalid credentials.") {
        super(message, 400, "INVALID_CREDENTIALS")
        Object.setPrototypeOf(this, InvalidCredentialsException.prototype)
    }
}
