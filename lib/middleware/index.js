const { Logger } = require("node-core-utils");
const logger = new Logger("Middleware");
const jwt = require("jsonwebtoken");
const config = require("config");

function logRequest(req, res, next) {
  logger.info(`logRequest`);
  // Get Token from header
  
  logger.info(req.method, req.headers);
  try {
    const token = req.header("x-auth-token");
  // Check Token
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization failed" });
  }

  // Verify Token
  
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token not valid" });
  }
 // next();
}

module.exports = { logRequest };
