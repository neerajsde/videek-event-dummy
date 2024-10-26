const mongoose = require('mongoose');

const createNewTestimonial = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    },
    publish:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Testimonal', createNewTestimonial);