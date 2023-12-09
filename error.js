// ./error.js

// Custom error class with custom data
class CustomError extends Error{
    constructor(message, customData) {
        // Initialize parent Error class with message received from the constructor
        super(message);

        // Example string showing we can add custom information to our custom error type, we can add multiple fields and different types of data
        this.customData = customData;
    }
}

module.exports = {
    CustomError
}
