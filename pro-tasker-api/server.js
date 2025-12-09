const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route Mounting
app.use("/api/projects", projectRoutes);
app.use("/api/projects", taskRoutes); 

const PORT = process.env.PORT || 4000;

// This route to check and setup the API documentation
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});