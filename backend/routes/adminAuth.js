import express from "express";

const router = express.Router();

const ADMIN_EMAIL = "admin@vanitha.com";
const ADMIN_PASS = "admin123";

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    return res.json({ status: "ok", token: "secureadmintoken" });
  } else {
    return res.status(401).json({ status: "error", msg: "Invalid credentials" });
  }
});

export default router;
