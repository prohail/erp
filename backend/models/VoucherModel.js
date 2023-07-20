const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
  voucherNumber: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  account: {
    type: String,
    required: true,
  },
  debitAmount: {
    type: Number,
    required: true,
  },
  creditAmount: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Voucher", voucherSchema);
