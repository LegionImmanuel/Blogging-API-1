const { json } = require('body-parser');
const express = require('express')
const postRouter = express.Router();
const mongoose = require('mongoose')
const Post = require('../models/blogs');
const articles = require('../models/users');


// Create blogpost/article
postRouter.post('/create', async (req, res, next) => {
  const title = req.body.title
  const description = req.body.description
  const author = req.body.author
  const body = req.body.body
  const blog = new Post({
      title: title,
      description: description,
      author: author,
      body: body
  });
  console.log(blog)
  blog.save(err => {
    if(err) {  res.status(404).send(err); 

    }else 
      res.render('create_successful.ejs');
  });
})

//Get All Blogposts 
postRouter.get('/blogs', async (req,res) => {
  try {
   const posts = await Post.find();
  res.status(200).json(posts);

  } catch (error) {
   res.status(500).json(error); 
  }
})

// postRouter.get('/:id', (req,res) =>{
//   console.log(req.params.id);
//   const id = mongoose.Types.ObjectId(req.params.id.trim());
//   Post.findById(id)
//   .then((result) =>{
//       // res.render('details',{blog:result,title:'Blog Details'})
//       console.log(result);
//       res.status(201).send(result)
//   })
//   .catch((err) => {
//       console.log(err);
//       res.status(404).send(err)
//   })
// })

// Working Partially
// postRouter.get('/:id', async ( req, res, next ) => {
//   try {
//     const id = req.params.id
//     const post = await Post.findById(id)
//     if (!post) {
//     return res.status(404).json('Blogpost does not exist')
//     }
//     res.status(200).send(post)
//   } 
//   catch (e) {
//     console.log(e)
//     res.status(500).send( e )
//   }
// });

// postRouter.get('/:id', (req, res))
// var findBlogById = (id, done) => {
//   Post.findById(id, (err, blogId) => {
//     if (err) return console.log(err)
//     res.status(404).send('Error');
//     done(null, res.status(200).send(blogId));
//   });
// };

// postRouter.get('/:id', (req, res, done) =>{
// Post.findById(id, function (err, posts) {
//     if (err) return console.log(err);
//     done(null, posts);
// });
// })

// postRouter.get('/:id', (req, res) => {
//   const id = req.params.id
//   Post.findById(id)
//       .then((id) => {
//           res.status(200).send({
//             message: "BLOG POST",
//             data: id
//           })
//       }).catch((err) => {
//           console.log(err)
//           res.status(404).send(err)
//       })
// });



// postRouter.get('/:id', function(req, res) {
//   const getById = (id) => Promise.resolve(users.find(u => u.id == id));

//   Post.findById(req.params.id)
//     .then(body => res.status(200).send(body))
//     .catch(err => res.status(500).send(err));
// });


// // Get Blogpost By ID
// postRouter.get('/:id', (req, res) => {
//   const id = req.params.id
//   Post.findById(id)
//       .then(blogs => {
//           res.status(200).send(blogs)
//       }).catch(err => {
//           console.log(err)
//           res.status(404).send(err)
//       })
// })



// postRouter.get('/:id', async(req,res)=> {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });


// Update Blogpost 
postRouter.put('/:id', (req, res) => {
  const id = req.params.id
  const blog = req.body
  
  Post.updatedAt = new Date() // set the lastUpdateAt to the current date
  Post.findByIdAndUpdate(id, blog, { new: true })
      .then(newBlog => {
          res.status(200).send({
            message: "Your blog post/article has been updated successfully",
            data: newBlog
          })
      }).catch(err => {
          console.log(err)
          res.status(500).send(err)
      })
})

// Delete Blogpost By ID
postRouter.delete('/:id', (req, res) => {
  const id = req.params.id
  Post.findByIdAndDelete(id)
      .then(() => {
          res.status(200).send({
            message: "Your blog post has been deleted successfully",
            data: ""
          })
      }).catch((err) => {
          console.log(err)
          res.status(401).send(err)
      })
});



module.exports = postRouter;