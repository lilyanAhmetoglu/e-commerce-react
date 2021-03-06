const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // in order to hash the password
const jwt = require("jsonwebtoken");
const SALT_I = 10;
require("dotenv").config();
// creating the schema

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});
// we need to hash the password before saving the user

userSchema.pre("save", function (next) {
  // next means exucting after hashing
  var user = this; // whenever i want to make reference to user it will use user of schema not the function
  if (user.isModified("password")) {
    // this condition is only to execute the hashing only when we want to modify the password not all the time
    bcrypt.genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// creating method to compare password
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });

  //the token is encryption of userId + password
};

userSchema.statics.findByToken = function(token,cb){
    var user=this;
    jwt.verify(token,process.env.SECRET,function(err,decode){
        user.findOne({
            "_id":decode,
            "token":token
        },function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}

// creating the model from the schema
const User = mongoose.model("User", userSchema);
module.exports = { User };
