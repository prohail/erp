const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "Not Added",
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  e_mail: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
