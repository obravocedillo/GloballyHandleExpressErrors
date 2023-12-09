// ./index.js

// Don't forget to import express-async-errors before you start using express or declare your express app
require('express-async-errors');

// Import app from "./app file
const app = require("./app");

// Port that will be uses to listen to requests
const port = process.env.PORT || 3015;

/**
 * Listen on port 3015
 */
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
