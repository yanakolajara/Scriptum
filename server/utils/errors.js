// server/utils/errors.js

/**
 * Represents a 400 Bad Request error when the input data is invalid.
 */
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400; // RFC 9110: 400 Bad Request
  }
}

/**
 * Represents a 401 Unauthorized error for missing or invalid authentication credentials.
 */
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401; // RFC 9110: 401 Unauthorized
  }
}

/**
 * Represents a 409 Conflict error, such as when a duplicate record is attempted.
 */
export class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateError';
    this.status = 409; // RFC 9110: 409 Conflict
  }
}

/**
 * Represents a 500 Internal Server Error for unexpected server or database failures.
 */
export class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
    this.status = 500; // RFC 9110: 500 Internal Server Error
  }
}

/**
 * Represents a 500 Internal Server Error for connection problems.
 */
export class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConnectionError';
    this.status = 500; // RFC 9110: 500 Internal Server Error
  }
}
