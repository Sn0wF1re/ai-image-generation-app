import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

// Configure to access .env file
dotenv.config();

// start Express router
const router = express.Router();

// Configure connection to cloudinary to host images
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Get all posts
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch posts. Please try again...' });
  }
});

//Create posts
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const imageUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: imageUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create post. Please try again...' });
  }
});

export default router;