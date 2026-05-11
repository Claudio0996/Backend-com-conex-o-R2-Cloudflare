const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const slideRoute = require("./features/slide/routes/slideRoute");
const authRoute = require("./features/auth/routes/authRoute");
const { errorMiddleware } = require("./middlewares/errorMiddleware");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(slideRoute);
app.use(authRoute);
app.use(errorMiddleware);

module.exports = { app };
