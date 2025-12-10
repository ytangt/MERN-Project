const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Successfully connected to MongoDB!'))
.catch(err => console.error('Connection error', err));


const PORT = process.env.PORT || 4000;
const app = express();


// ========= Middlewares =================
app.use(morgan('dev')); // logger
app.use(express.json()); // body parser
app.use(cors({origin: process.env.FRONTEND_URL}));


// ========= Routes ======================
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/projects/:projectId/tasks", require("./routes/taskRoutes"));

// Use this route to setup the API documentation
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});