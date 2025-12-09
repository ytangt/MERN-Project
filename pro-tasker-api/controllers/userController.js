const User = require("../models/User");
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '24h'; 

//get all users
async function getAllUsers(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "You must be logged in" });
    }

    const users = await User.find().select("-password"); // don't return password
    res.json(users);

  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//get user bu ID
function getUserById(req, res) {
  res.send(`Data for user: ${req.params.id}`);
}

//register
async function registerUser(req, res) {
  try {
    // check if user exists
    const dbUser = await User.findOne({ email: req.body.email });

    if (dbUser) {
      return res.status(400).json({ message: "User already exist." });
    }

    // Create new user
    const user = await User.create(req.body);
    console.log(user);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
}


//login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Check user
    const dbUser = await User.findOne({ email: email });

    if (!dbUser) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    //check password
    const passwordMatched = await dbUser.isCorrectPassword(password);

    if (!passwordMatched) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    // Payload
    const payload = {
      _id: dbUser._id,
      username: dbUser.username,
      email: dbUser.email,
      role: dbUser.role
    }

    // Create Token
    const token = jwt.sign({data: payload}, secret, {expiresIn: expiration});

    //return
    res.json({token, user: dbUser});

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
};