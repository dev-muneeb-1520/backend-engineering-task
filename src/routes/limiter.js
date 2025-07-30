const express = require("express");
const router = express.Router();
const rateLimiter = require("../middleware/rateLimiter");
const { rateLimitConfig } = require("./../config/config");

router.post("/request/:client_id", rateLimiter, (req, res) => {
  res.status(200).json({ message: "Request successful" });
});

router.get("/status/:client_id", (req, res) => {
  const clientId = req.params.client_id;
  res.status(200).json({
    message: "Rate limit status",
    client_id: clientId,
    config: rateLimitConfig,
  });
});

router.post("/admin/configure", (req, res) => {
  const { client_id, limit, windowMs } = req.body;

  if (typeof limit !== "number" || typeof windowMs !== "number") {
    return res.status(400).json({ message: "Invalid configuration values" });
  }

  rateLimitConfig.client_id = client_id || rateLimitConfig.client_id;
  rateLimitConfig.limit = limit || rateLimitConfig.limit;
  rateLimitConfig.windowMs = windowMs || rateLimitConfig.windowMs;

  res
    .status(200)
    .json({ message: "Configuration updated", config: rateLimitConfig });
});

module.exports = router;
