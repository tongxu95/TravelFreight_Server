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
            message: 'Signup successful',
            data: result
        })
    }).catch(err => {
        res.json({
            status: 'FAILED',
            message: 'An error occurred while saving your post!'
        })
    })
});

module.exports = router;