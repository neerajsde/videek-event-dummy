const mongoose = require('mongoose');

const FAQs = new mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    answere:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FAQ', FAQs);