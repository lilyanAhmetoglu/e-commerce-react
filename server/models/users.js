const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // in order to hash the password
const SALT_I = 10;
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

// creating the model from the schema
const User = mongoose.model("User", userSchema);
module.exports = { User };