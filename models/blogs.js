const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const BlogSchema = new Schema({
    _id: ObjectId,
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

// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
  

// const BlogSchema = {
//     title: String,
//     content: String,
// }
  
// const BlogModel = mongoose.model("blogs", BlogSchema);
// module.exports = BlogModel

// // // // // // // // // // //

  
// app.get('/blogs', (req, res) => {
//     Blog.find({}, (err, blog) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(blog);
//         }
//     })
// })
  
// app.get('/blogs/:blogTitle', (req, res) => {
//     Blog.find({ title: req.params.blogTitle }, 
//     (err, blog) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(blog);
//         }
//     })
// })
  
// app.post('/blogs', (req, res) => {
//     const title = req.body.title
//     const content = req.body.content
  
//     const blog = new Blog({
//         title: title,
//         content: content
//     })
  
//     blog.save(err => {
//         if(err) {  res.send(err); }
//         else { res.send('blog added!'); }
//     });
// })
  
// app.delete('/blogs', (req, res) => {
//     const title = req.body.title
  
//     Blog.deleteOne({ tilte: title }, (err, blog) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send("blog deleted!");
//         }
//     })
// })