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
    type: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    whatsapp: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    rooms: {
        type: Number,
        default: 0
    },
    price_range: {
        type: String,
        default: ''
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review' 
        }
    ],
    FAQs: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'FAQ' 
        }
    ],
    albums:[
        {type: String}
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Venue', createNewVenue);
