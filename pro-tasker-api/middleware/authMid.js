const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "24h";

function authMiddleware(req, res, next) {
  let token = req.headers.authorization 
    ? req.headers.authorization.split(" ").pop().trim()
    : null;

  if (!token) {
    return res.status(403).json({ message: "Please login" });
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
}






function signToken({ username, email, _id }) {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}



module.exports = {
  authMiddleware,
  signToken,
};
