"use strict";

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// CORS Middleware:
// https://expressjs.com/en/resources/middleware/cors.html
// npm i cors

// const cors = require('cors')
// Default using:
// app.use(cors())
// Default options:
// app.use(cors({
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
// }))
/*

    if (process.env.NODE_ENV=="development") {
        const corsOptions = {}
    } else {
        const corsOptions = {}
    }
    app.use(cors(corsOptions))
*/
// app.use(cors({
//     "origin": ["http://localhost:3000", "http://localhost:4173", "http://localhost:5173"], //"http://localhost:5173", // true // false // "*",
//     // "origin": function (origin, callback) { },
//     "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
// }))
/*
    app.get('*', cors({ origin: 'onlyget.com' }))
    app.all('*', cors({ origin: 'allmethods.com' }))
*/

app.use(require("cors")()); // Run with defaults.           Tüm sitelere izin vermek icin deploy öncesi alttaki 3 satiri kapatip burayi actik
/* app.use(require('cors')({
    origin: ["http://localhost:3000", "http://localhost:4173", "http://localhost:5173"]
})) */

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
// app.use(require('./src/middlewares/logger'))     log tutma ücretsiz servislerde olmadigi icin deploy öncesi kapattik

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Message API",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// Routes:
app.use(require("./src/routes"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
//app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))       deployda HOST parametresine izin verilmedigi icin deploy öncesi HOST parametresini sildik.
app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));

/* ------------------------------------------------------- */
// Syncronization
//require('./src/helpers/sync')() // !!! It clear database.
