const express = require("express");
const bodyParser = require("body-parser"); //important for requests
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const async = require("async");
require("dotenv").config(); // dealing with env parameteres
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true })); // using middleware from query string
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Models
const { User } = require("./models/users");
const { Brand } = require("./models/brands");
const { Fabric } = require("./models/fabric");
const { Product } = require("./models/products");
const { Payment } = require("./models/payment");
const { Category } = require("./models/category");
const { Site } = require('./models/site');
//Middlewares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin"); // we are going to create an admin middleware in order to check the user role

//===========================
//           PRODUCTS
//============================

app.post("/api/product/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs["publish"] = true;

  Product.find(findArgs)
    .populate("brand")
    .populate("fabric")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length,
        articles,
      });
    });
});

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

app.post("/api/users/uploadimage", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    }
  );
});

app.get("/api/users/removeimage", auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ succes: false, error });
    res.status(200).send("ok");
  });
});

app.post("/api/users/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId),
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get("/api/users/removeFromCart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
    { new: true },
    (err, doc) => {
      //fetching the data again
      let cart = doc.cart;
      let array = cart.map((item) => {
        return mongoose.Types.ObjectId(item.id);
      });

      Product.find({ _id: { $in: array } })
        .populate("brand")
        .populate("fabric")
        .populate("category")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
});

app.post("/api/users/successBuy", auth, (req, res) => {
  let history = [];
  let transactionData = {};
  const date = new Date();
  /*const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(
    req.user._id
  )
    .toString()
    .substring(0, 8)}`;
*/
  // user history
  req.body.cartDetail.forEach((item) => {
    history.push({
     // porder: after,
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  // PAYMENTS DASH
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
  };
  transactionData.data = {
    ...req.body.paymentData,
    //porder: after,
  };
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id }, //condition
    { $push: { history: history }, $set: { cart: [] } }, // update
    { new: true }, // option
    (err, user) => {
      // callback
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback // means that this call back is done go to the next
            );
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            // sendEmail(user.email,user.name,null,"purchase",transactionData)
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});


app.post('/api/users/update_profile',auth,(req,res)=>{

  User.findOneAndUpdate(
      { _id: req.user._id },
      {
          "$set": req.body
      },
      { new: true },
      (err,doc)=>{
          if(err) return res.json({success:false,err});
          return res.status(200).send({
              success:true
          })
      }
  );
});


//=================================
//              SITE
//=================================

app.get('/api/site/site_data',(req,res)=>{
  Site.find({},(err,site)=>{
      if(err) return res.status(400).send(err);
      res.status(200).send(site[0].siteInfo)
  });
});

app.post('/api/site/site_data',auth,admin,(req,res)=>{
  Site.findOneAndUpdate(
      { name: 'Site'},
      { "$set": { siteInfo: req.body }},
      { new: true },
      (err,doc )=>{
          if(err) return res.json({success:false,err});
          return res.status(200).send({
              success: true,
              siteInfo: doc.siteInfo
          })
      }
  )
})


const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Runing at ${port}`);
});
