const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true,
    },
    body: {
        type:String,
        required: true
    },
    state: {
        type: String,   
        enum:['draft', 'published'],
        default: 'draft'
    },
  
    readCount:{
        type: Number,
        default:0
    },
     readTime:{
        type: Number
     },
    tags: String,  
},  {timestamps: true}
);

const BlogModel = mongoose.model('blogs', BlogSchema);

module.exports = BlogModel;
