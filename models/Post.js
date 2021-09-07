const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: String,
    category: String,
    title: String,
    description: String,
    location: String,
    date: Date
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;