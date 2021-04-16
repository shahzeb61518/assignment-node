var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// var cors = require("cors");

// user routes
const user_Router = require("./routes/user-routes");

const app = express();

// cloud mognodb allow from anywhere
const url =
  "mongodb+srv://shah:shah@cluster0.rsl27.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, (err, db) => {
  if (err) throw console.log("err>>>", err);
  console.log("DB is Connected");
});


// app.use(cors())
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Accept-Encoding,Origin,Referer,Cache-Control,Accept-Language,Connection,Accept,Content-Type,Content-Length,Host,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "5000mb" }));


app.use("/api/user", user_Router);

//Error handler any wrong routes
app.use("*", (req, res, next) => {
  res.status(404).json({ status: 404, message: "Page Not Found", data: null });
});

var port = 4000;
var server = app.listen(port, () =>
  console.log(`API listening on port ${port}`)
);
server.setTimeout(500000);
