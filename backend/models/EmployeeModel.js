const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  join_date: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  e_mail: {
    type: String,
    default: "Not Added",
    unique: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
