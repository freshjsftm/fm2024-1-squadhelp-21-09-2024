const ApplicationError = require('./ApplicationError');

class LogInError extends ApplicationError{
  constructor (message) {
    super(message || 'invalid email or password', 401);
  }
}

module.exports = LogInError;
