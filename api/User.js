const express = require('express');
const router = express.Router();

// Mongodb user model
const User = require('./../models/User');

// Password handler
const bcrypt = require('bcrypt');

// Signup
router.post('/signup', (req, res) => {
    let {username, email, password} = req.body;
    username = username.trim().toString().toLowerCase();
    email = email.trim().toString().toLowerCase();
    password = password.trim();

    // Check if user with provided email already exists
    User.find({email}).then(result => {
        if(result.length) {
            // A user already exist
            res.json({
                status: 'FAILED',
                message: 'User with the provided email already exists'
            })
        } else {
            // check if username is taken
                User.find({username}).then(result => {
                    if(result.length) {
                        // Username is taken
                        res.json({
                            status: 'FAILED',
                            message: 'Username is taken!'
                        })
                    } else {
                        // Create new user
                        // password handling
                        const saltRounds = 10;
                        bcrypt.hash(password, saltRounds).then(hashedPassword => {
                            const newUser = new User({
                                username, 
                                email, 
                                password: hashedPassword,
                                img: '',
                                location: ''
                            });
                            newUser.save().then(result => {
                                res.json({
                                    status: 'SUCCESS',
                                    message: 'Signup successful',
                                    data: result
                                })
                            }).catch(err => {
                                res.json({
                                    status: 'FAILED',
                                    message: 'An error occurred while saving user account!'
                                })
                            })

                        }).catch(err => {
                            res.json({
                                status: 'FAILED',
                                message: 'An error occurred while hashing password!'
                            })
                        })
                    }
                }).catch(err => {
                    console.log(err);
                    res.json({
                        status: 'FAILED',
                        message: 'An error occurred while checking username!'
                    })
                })
        }
    }).catch(err => {
        console.log(err);
        res.json({
            status: 'FAILED',
            message: 'An error occurred while checking email account!'
        })
    })
});

// Sign in
router.post('/signin', (req, res) => {
    let {email, password} = req.body;
    email = email.trim().toString().toLowerCase();
    password = password.trim();

    // Check if user with provided email already exists
    User.find({email}).then(data => {
        if (data.length) {
            const hashedPassword = data[0].password;
            bcrypt.compare(password, hashedPassword).then(result => {
                if (result) {
                    // Password match
                    res.json({
                        status: 'SUCCESS',
                        message: 'Signin successful',
                        data: data
                    })
                } else {
                    res.json({
                        status: 'FAILED',
                        message: 'Invalid password entered!',
                    })
                }
            }).catch(err => {
                console.log(err);
                res.json({
                    status: 'FAILED',
                    message: 'An error occurred while checking password!'
                })
            })
        } else {
            res.json({
                status: 'FAILED',
                message: 'Invalid email!'
            })
        }
    }).catch(err => {
        console.log(err);
        res.json({
            status: 'FAILED',
            message: 'An error occurred while checking email account!'
        })
    })
});

// Update User Location
router.post('/update/location', async (req, res) => {
    let {_id, location} = req.body;

    await User.findByIdAndUpdate(_id, {
        location: location
    }).then(result => {
        res.json({
            status: 'SUCCESS',
            message: 'Update successful',
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 'FAILED',
            message: 'An error occurred while updating user information!'
        })
    });
});

// Update User Profile Image
router.post('/update/img', async (req, res) => {
    let {_id, img} = req.body;

    await User.findByIdAndUpdate(_id, {
        img: img
    }).then(result => {
        res.json({
            status: 'SUCCESS',
            message: 'Update successful',
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 'FAILED',
            message: 'An error occurred while updating user information!'
        })
    });
});

module.exports = router;