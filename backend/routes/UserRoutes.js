const express = require("express");
const router = express.Router();
const { LoginUser, SignUpUser } = require("../controllers/UserController");

// Login Route
router.post("/login", LoginUser);

// Sign Up Route
router.post("/signup", SignUpUser);

module.exports = router;
