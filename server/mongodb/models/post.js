import mongoose from 'mongoose';

// Describe the Post schema
const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

// create the model
const PostSchema = mongoose.model('Post', Post);

export default PostSchema;