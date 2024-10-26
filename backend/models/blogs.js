const mongoose = require('mongoose');

const createNewBlog = new mongoose.Schema({
    category:{
        type:String,
        default:''
    },
    title:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    uId:{
        type:String,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Blog', createNewBlog);