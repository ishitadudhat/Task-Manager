const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: false
    },
    createdAt: {
        type: String,
        default: Date.now()
    },
});

module.exports = mongoose.model('Task', TaskSchema);