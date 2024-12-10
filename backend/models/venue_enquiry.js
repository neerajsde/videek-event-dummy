const mongoose = require('mongoose');

const creatednewVenue = new mongoose.Schema({
    user_name:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    phone:{
        type: String,
        default:''
    },
    venue_name:{
        type: String,
        required: true
    },
    venue_location:{
        type: String,
        required: true
    },
    submittedAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('venue_enquiery', creatednewVenue);