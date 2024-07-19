const blogModel = require('../models/newBlog.js');
const express = require('express');
const blogRouters = require('../controller/blog.js');
const { authMiddleware } = require('../middleware/verifytoken'); // Update this line

const blogrout = express.Router();

blogrout.post('/newBlog', authMiddleware, blogRouters.newBlog);
blogrout.get('/updateBlog/:id', authMiddleware, blogRouters.getBlog);
blogrout.put('/updateBlog/:id', authMiddleware, blogRouters.updateBlog);
blogrout.get('/allblogs', blogRouters.getBlogs);

module.exports = blogrout;