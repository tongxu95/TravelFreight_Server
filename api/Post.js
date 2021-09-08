const express = require('express');
const router = express.Router();

// Mongodb user model
const Post = require('./../models/Post');

// New Posting
router.post('/', (req, res) => {
    let {user, category, title, description, location, date} = req.body;
    title = title.trim();
    description = description.trim();
    location = location.trim();

    const newPost = new Post({
        user, 
        category, 
        title,
        description,
        location,
        date
    });
    newPost.save().then(result => {
        res.json({
            status: 'SUCCESS',
            message: 'Your ad have been successefully posted!',
            data: result
        })
    }).catch(err => {
        res.json({
            status: 'FAILED',
            message: 'An error occurred while saving your post!'
        })
    })
});

// Get a user's postings
router.get('/', (req, res) => {
    Post.find({ username: req.query.user }).then(result => {
        res.json({
            status: 'SUCCESS',
            message: 'Your posts are found!',
            data: result
        })
    }).catch(err => {
        res.json({
            status: 'FAILED',
            message: 'An error occurred while looking for your post!'
        })
    })
});

module.exports = router;