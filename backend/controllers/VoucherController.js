const Voucher = require("../models/VoucherModel");

// Create a new voucher
exports.createVoucher = async (req, res) => {
  try {
    const {
      voucherNumber,
      date,
      description,
      account,
      debitAmount,
      creditAmount,
    } = req.body;

    // Calculate the balance
    const balance = creditAmount - debitAmount;

    const voucher = new Voucher({
      voucherNumber,
      date,
      description,
      account,
      debitAmount,
      creditAmount,
      balance,
    });

    await voucher.save();
    res.status(201).json({ success: true, voucher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all vouchers
exports.getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json({ success: true, vouchers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single voucher by ID
exports.getVoucherById = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) {
      return res
        .status(404)
        .json({ success: false, error: "Voucher not found" });
    }
    res.status(200).json({ success: true, voucher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a voucher
exports.updateVoucher = async (req, res) => {
  try {
    const {
      voucherNumber,
      date,
      description,
      account,
      debitAmount,
      creditAmount,
    } = req.body;

    // Calculate the balance
    const balance = creditAmount - debitAmount;

    const voucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      {
        voucherNumber,
        date,
        description,
        account,
        debitAmount,
        creditAmount,
        balance,
      },
      { new: true }
    );

    if (!voucher) {
      return res
        .status(404)
        .json({ success: false, error: "Voucher not found" });
    }

    res.status(200).json({ success: true, voucher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a voucher
exports.deleteVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id);

    if (!voucher) {
      return res
        .status(404)
        .json({ success: false, error: "Voucher not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Voucher deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Approve a voucher
exports.approveVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!voucher) {
      return res
        .status(404)
        .json({ success: false, error: "Voucher not found" });
    }

    res.status(200).json({ success: true, voucher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = exports;
