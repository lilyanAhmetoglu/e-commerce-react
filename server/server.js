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
const { Brand } = require("./models/brands");
const { Fabric } = require("./models/fabric");
const { Product } = require("./models/products");
const { Category } = require("./models/category");
//Middlewares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin"); // we are going to create an admin middleware in order to check the user role

//===========================
//           PRODUCTS
//============================

//BY ARRIVAL
// /article?sortBy=createdAt&order=desc&limit=4

//BT SELL
// /article?sortBy=sold&order=desc&limit=4

app.get("/api/product/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
    .populate("brand")
    .populate("fabric")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});

// /api/product/article?id=3243243,343434,4444,3222&type=single
// getting data from query string using bodyParser.urlencoded
app.get("/api/product/articles_by_id", (req, res) => {
  let type = req.query.type; // type params from query string
  let items = req.query.id; // the selected id's
  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }
  Product.find({ _id: { $in: items } })
    .populate("brand")
    .populate("fabric")
    .populate("category")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

app.post("/api/product/article", auth, admin, (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc,
    });
  });
});

//===========================
//           CATEGORY
//============================

app.post("/api/product/category", auth, admin, (req, res) => {
  const category = new Category(req.body);
  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      category: doc,
    });
  });
});

app.get("/api/product/categories", (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(categories);
  });
});
//===========================
//           FABRIC
//============================

app.post("/api/product/fabric", auth, admin, (req, res) => {
  const fabric = new Fabric(req.body);
  fabric.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      fabric: doc,
    });
  });
});

app.get("/api/product/fabrics", (req, res) => {
  Fabric.find({}, (err, fabrics) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(fabrics);
  });
});

//===========================
//           BRANDS
//============================

app.post("/api/product/brand", auth, admin, (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc,
    });
  });
});

app.get("/api/product/brands", (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});
//===========================
//           USERS
//============================
app.get("/api/users/auth", auth, (req, res) => {
  // we attached the user and token in request then we will jumb to this function
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

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
app.post("/api/users/login", (req, res) => {
  //find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    // the call back function of findone return user or empty obj
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failes , email not found",
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "Wrong password" });
      }
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });

  //if the email in the database check the password

  // if all upove is correct generate the token
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Runing at ${port}`);
});
