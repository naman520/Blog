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

const updateBlog = async (req, res) => {
  try {
    const {id} = req.params
    const {title, content, type} = req.body

    if(!id){
      return res.status(400).json({message:"Blog ID is required"})
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      {title,
      content,
      type},
      { new : true}
    );

    if(!updatedBlog){
      res.status(404).json({message:"Blog not found"})
    }
    res.status(200).json({ message: 'Update Success', blog: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog', error: error.message });
  }
};
  
module.exports = {getBlogs , newBlog, updateBlog, getBlog};