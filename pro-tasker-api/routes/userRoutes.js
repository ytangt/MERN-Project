const express = require("express");
const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
} = require("../controllers/userController");

const { authMiddleware, signToken} = require("../middleware/authMid");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/", authMiddleware, getAllUsers);
userRouter.get("/:id", getUserById);

module.exports = userRouter;