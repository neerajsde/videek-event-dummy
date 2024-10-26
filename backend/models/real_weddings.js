const mongoose = require('mongoose');

const createNewRealWeddingSchema = new mongoose.Schema({
    couple_name: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    images: [{
        type: String,
        default: ''
    }],
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: String,
        default: ''
    },
    taggedVendor:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Vendor' 
        }
    ], 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('RealWedding', createNewRealWeddingSchema);