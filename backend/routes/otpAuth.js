const router = require("express").Router();
const User = require("../models/User");

let otpStorage = {}; // Simulate OTP storage in memory

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStorage[phone] = otp;

  console.log(`📲 OTP for ${phone}: ${otp}`); // Replace with Twilio in production
  res.json({ status: "sent" });
});

router.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;
  if (otpStorage[phone] == otp) {
    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone, verified: true });
      await user.save();
    }
    return res.json({ status: "ok", user });
  }
  res.status(400).json({ status: "invalid" });
});

module.exports = router;
