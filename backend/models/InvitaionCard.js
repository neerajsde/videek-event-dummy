const mongoose = require('mongoose');

const createdInvitationCard = new mongoose.Schema({
    cardImg:{
        type:String,
        required: true
    },
    url:{
        type:String,
        required: true
    },
    userId:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Invitation-Card', createdInvitationCard);