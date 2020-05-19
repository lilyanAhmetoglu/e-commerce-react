const express = require("express");
const bodyParser = require("body-parser"); //important for requests
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config(); // dealing with env parameteres

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true })); // using middleware from query string
app.use(bodyParser.json());
app.use(cookieParser());

//Models
const { User } = require("./models/users");

//===========================
//           USERS
//============================
app.post("/api/users/register", (req, res) => {
  // afer sending request we need to get the response
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      userdata: doc,
    });
  });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Runing at ${port}`);
});
