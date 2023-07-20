const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const EmployeeRoutes = require("./routes/EmployeeRoutes");
const AttendanceRoutes = require("./routes/AttendanceRoutes");
const DashboardRoutes = require("./routes/DashboardRoutes");
const CustomerRoutes = require("./routes/CustomerRoutes");
const VoucherRoutes = require("./routes/VoucherRoutes");
const UserRoutes = require("./routes/UserRoutes");

// App setup
const app = express();

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/employees", EmployeeRoutes);
app.use("/api/attendance", AttendanceRoutes);
app.use("/api/dashboard", DashboardRoutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/vouchers", VoucherRoutes);
app.use("/api/user", UserRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening at", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
