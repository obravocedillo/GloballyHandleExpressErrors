// ./app.js

const express = require("express");

// Import custom error class
const { CustomError } = require("./error");

// Initialize express app
const app = express();

// Converts incoming JSON data to objects
app.use(express.json());

// Basic route to test that the server is working
app.get("/health", (req, res) => {
    res.status(200).send('Working');
})

// Returns an error inside a promise
const promiseWithError = () => {
    return new Promise((res) => {
        throw new Error("Error found")
    });
}

// Returns a custom error inside a promise
const promiseWithCustomError = () => {
    return new Promise((res) => {
        throw new CustomError("Error found", "Custom data")
    });
}

// Route without try and catch encountering an error
app.get("/promise-with-error", async (req, res) => {

    await promiseWithError();

    res.status(200).send('Success');
})

// Controller for promise-with-error route
const promiseWithCustomErrorController = async (req, res) => {
    await promiseWithCustomError()

    res.status(200).send('Success');
}

// Route without try and catch encountering a custom error, using controller
app.get("/promise-with-custom-error", promiseWithCustomErrorController)


/**
 * Use express-async-errors middleware to catch all errors even-thought code is not surrounded in try...catch block,
 * use after adding routes or load them if using a loader, it works also with Typescript
 */
app.use((err, req, res, next) => {

    // Default error message
    let errorMessage = "Internal server error please contact support";

    // We can check if error is instance of a specific error type and return a specific message or data
    if (err instanceof CustomError) {
        errorMessage = `Custom error: ${err.message}, custom data: ${err.customData} )`;
    }

    // Check that headers were not already sent, to avoid "Can't set headers after they are sent to the client" error
    if (!res.headersSent) {
        res.status(500).json({ msg: errorMessage });
    }

    next();
});

module.exports = app;
