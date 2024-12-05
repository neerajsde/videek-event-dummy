const mongoose = require('mongoose');

const creatednewVendorCategory = new mongoose.Schema({
    category: {
        type: String,
        default: ''
    },
    name: {
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
    password: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    user_img: {
        type: String,
        default: ''
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
    clientInformation: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'contact-for-vendor' 
        }
    ],
    albums:[
        {type: String}
    ],
    youtube_links:[
        {type: String}
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vendor', creatednewVendorCategory);