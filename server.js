
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const otpStore = {};

app.post("/send-otp", (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[mobile] = otp;

  console.log("OTP for", mobile, "=", otp);
  return res.json({ success: true, message: "OTP sent" });
});

app.post("/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp) return res.status(400).json({ message: "Missing fields" });

  if (otpStore[mobile] == otp) {
    delete otpStore[mobile];
    return res.json({ success: true, message: "OTP verified" });
  }
  return res.status(401).json({ success: false, message: "Invalid OTP" });
});

app.listen(5001, () => console.log("OTP API running on port 5000"));
