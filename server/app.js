var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const AWS = require("aws-sdk");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const fs = require("fs");
// const fileType = require("file-type");
const multiparty = require("multiparty");
const multer = require("multer");
const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var ticketRouter = require("./routes/tickets");
var announcementRouter = require("./routes/announments-routes");
var faqRouter = require("./routes/faq-routes");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const uri =
  "mongodb+srv://bcheryala:bhanucheryala@se-assignment-2.45lwac2.mongodb.net/i-ticket?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("*********** Connected successfully..! ************");
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ticket", ticketRouter);
app.use("/announcement", announcementRouter);
app.use("/faq", faqRouter);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
