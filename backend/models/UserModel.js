const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All Fields Must Be Filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password Not Strong Enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email Already Used");
  }
  const salt = await bcrypt.genSalt(2);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All Fields Must Be Filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User Not Found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incrorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
