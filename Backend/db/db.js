const mongoose = require('mongoose');

function ConnectDB() {
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("Connected To DB."))
    .catch(err => console.log("DB connection error: ", err));
}

module.exports = ConnectDB;