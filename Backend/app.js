const dotenv = require('dotenv');
dotenv.config();

const express = require('express');

const cors = require('cors');

const app = express();

const taskRoutes = require('./Routes/Tasks.route');

const userRoutes = require('./Routes/user.route');

const ConnectDB = require('./db/db');
ConnectDB();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use('/tasks', taskRoutes);

app.use('/users', userRoutes);

app.use('/' , function(req, res){
    res.send("server is running...");
})

module.exports = app;
