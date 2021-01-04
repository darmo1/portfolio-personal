const mongoose = require('mongoose');
const {Schema} = mongoose

const blogSchema = new Schema({
    title:{
        type: String,
        trim:true
    },
    content:{
        type: String,
        trim:true
    },
    imagen : {
        type: String
    },
    author:{
        type: String,
        trim:true
    },
    email :{
        type: String,
        trim: true ,
        lowercase: true,
        unique : true
    },
    twitter:{
        type: String,
        trim: true ,
    },
    profession:{
        type: String,
        trim:true
    }
});

module.exports = mongoose.model('Blog', blogSchema ); 