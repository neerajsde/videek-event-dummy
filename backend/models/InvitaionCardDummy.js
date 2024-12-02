const mongoose = require('mongoose');

const createdInvitationCardDummy = new mongoose.Schema({
    dummy_img:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    couple_text:{
        color:{
            type: String,
            default:'gray-500'
        },
        size:{
            type: String,
            default:'30px'
        },
        top:{
            type: String,
            default:'300px'
        },
        left:{
            type: String,
            default:'200px'
        },
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Invitation-Card-Dummy', createdInvitationCardDummy);