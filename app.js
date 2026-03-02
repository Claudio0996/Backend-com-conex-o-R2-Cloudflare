const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const slideRoute = require("./features/slide/routes/slideRoute");

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    mehtods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(slideRoute);

module.exports = { app };
