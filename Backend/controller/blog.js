const blogModel = require('../models/newBlog.js')

const getBlogs = async(req,res) =>{
    try{
        const blog = await blogModel.find()
        res.status(200).json({blog})
    }catch(error){
        res.status(500).json({message:"intenral server error"})
        console.log(error)
    }
}

const newBlog = async (req, res) => {
    try {
      const { title, content, type, username } = req.body;
      console.log(req.body); // Ensure you're logging the body
  
      // Create a new blog post
      const newBlog = new blogModel({
        title,
        content,
        type,
        username
      });
  
      // Save the blog post to the database
      await newBlog.save();
  
      // Send a response back to the client
      res.status(201).json(newBlog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
module.exports = {getBlogs , newBlog};