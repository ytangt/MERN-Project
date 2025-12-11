const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = "24h";

function authMiddleware(req, res, next) {
  console.log("AUTH HEADER:", req.headers.authorization);
  
  let token = req.body?.token || req.query?.token;

  // Extract Bearer token
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  // If no token found
  if (!token) {
    // next();
     res.status(403).json({message: "Please login"})
  }

  //this is better
  // if (!token) {
  //   return res.status(403).json({ message: "You must be logged in" });
  // }
  
  // If token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
   
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
