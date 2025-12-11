const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "24h";

function authMiddleware(req, res, next) {
  console.log("AUTH HEADER:", req.headers.authorization);
  
  let token = req.headers.authorization || req.body?.token || req.query?.token;

  // Extract Bearer token
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  // If no token found
  if (!token) {
    return res.status(403).json({ message: "Please login" });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    next(); // authentication success 
  } catch (err) {
    console.log("Invalid token:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

function signToken({ username, email, _id }) {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}



module.exports = {
  authMiddleware,
  signToken,
};
