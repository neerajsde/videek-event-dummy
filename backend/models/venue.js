const mongoose = require('mongoose');

const createNewVenue = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Venue', createNewVenue);
