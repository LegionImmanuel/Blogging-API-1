const express = require('express')
const postRouter = express.Router();
const mongoose = require('mongoose')
const Post = require('../models/blogs');


//create post 
// postRouter.post('/create', async (req,res)=> {
// try {
//     const savePost = await new Post(req.body);
//     const savedPost = await savedPost.save()
//     res.status(200).render('create_successful');

// } catch (error) {
//     res.status(500).json(error);
// }
// })

//create post
postRouter.post('/create', (req, res) => {
  const title = req.body.title
  const description = req.body.description
  const author = req.body.author
  const body = req.body.body

  const blog = new Post({
      title: title,
      description: description,
      author: author,
      body: body

  })

  blog.save(err => {
      if(err) {  res.send(err); }
      else { res.render('create_successful'); }
  });
})

//get All posts 
postRouter.get('/blogs', async (req,res) => {
  try {
   const posts = await Post.find();
  res.status(200).json(posts);

  } catch (error) {
   res.status(500).json(error); 
  }
})


//update post
postRouter.put('blogs/update/:id', async (req,res)=> {
 try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await Post.updateOne({$set:req.body});
     res.status(200).json('it has been updated');
    } else {
        res.status(403).json('you can only update your post');
    }
 } catch (error) {
     res.status(500).json(error)
 }
});

//get one post 
postRouter.get('blogs/:id',async(req,res)=> {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
})

//delete post 
postRouter.delete('blogs/delete/:id', async (req, res)=> {
  try {
   const post =  await Post.findById(req.params.id);
   if (post.userId === req.body.userId) {
      await Post.delete()
      res.status(200).json('the post is deleted')
   } else {
       res.status(403).json("you can only delete your post")
   }
  } catch (error) {
    res.status(500).json(error)  
  }
 });


module.exports = postRouter;