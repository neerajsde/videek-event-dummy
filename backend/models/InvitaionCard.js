const mongoose = require('mongoose');

const createdInvitationCard = new mongoose.Schema({
    couple_name:{
        type:String,
        default:''
    },
    date:{
        type:String,
        default:''
    },
    time:{
        type:String,
        default:''
    },
    desc:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    location:{
        type:String,
        default:''
    },
    venue_name:{
        type:String,
        default:''
    },
    isPublish:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Invitation-Card', createdInvitationCard);