const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/VoucherController");

// Create a new voucher
router.post("/", voucherController.createVoucher);

// Get all vouchers
router.get("/", voucherController.getVouchers);

// Get a single voucher by ID
router.get("/:id", voucherController.getVoucherById);

// Update a voucher
router.put("/:id", voucherController.updateVoucher);

// Delete a voucher
router.delete("/:id", voucherController.deleteVoucher);

module.exports = router;
