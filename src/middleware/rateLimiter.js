const { rateLimitConfig } = require("../config/config");

const rateLimiters = new Map();

const rateLimiter = (req, res, next) => {
  const clientId = req.params.client_id || req.body.client_id;

  if (!clientId) {
    return res.status(400).json({ message: "Client ID is required" });
  }

  const { limit, windowMs } = rateLimitConfig;

  const currentTime = Date.now();
  const windowStart = currentTime - windowMs;

  let clientData = rateLimiters.get(clientId);

  if (!clientData) {
    clientData = { count: 1, startTime: currentTime };
    rateLimiters.set(clientId, clientData);
    return next();
  }

  if (clientData.startTime < windowStart) {
    clientData.count = 1;
    clientData.startTime = currentTime;
    rateLimiters.set(clientId, clientData);
    return next();
  }

  if (clientData.count < limit) {
    clientData.count++;
    rateLimiters.set(clientId, clientData);
    return next();
  }

  res
    .status(429)
    .json({ message: "Too many requests. Please try again later." });
};

module.exports = rateLimiter;
