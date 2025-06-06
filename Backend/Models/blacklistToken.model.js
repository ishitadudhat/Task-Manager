const mongoose = require('mongoose');

const blackListTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // Token will expire after 1 hour , 86400 = 24 hours
    }
});

module.exports = mongoose.model('blackListToken', blackListTokenSchema);