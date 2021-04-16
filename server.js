var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

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


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Content-Length,Host,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
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
