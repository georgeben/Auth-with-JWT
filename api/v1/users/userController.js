const express = require('express');

const jwt = require('jsonwebtoken');

const router = express.Router();

const userModel = require('./userModel');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('My token', token);
    jwt.verify(token, 'supersecret', (err, match) => {
        if (err || match == null) {
            console.log('Tokens didnt match');
            res.sendStatus(403);
        } else {
            next();
        }
        
    });
};

router.get('/users', (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({
                message: 'Failed to fetch users',
            });
        }
        res.status(200).json({
            users,
        });
    });
});

router.post('/users/signup', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.email);

    userModel.checkIfUserExists(req.body.username, (err, user) => {
        if (user) {
            console.log('User already exists');
            res.status(401).json({
                message: 'User already exists',
            });
        }

        userModel.createNewUser({
            username: req.body.username,
            email: req.body.email,
         }, (error, data) => {
            if (err) {
                res.status(500).json({
                    message: 'Error creating user',
                });
            }
            res.status(200).json({
                message: 'Successfully registered',
            });
         });
    });

});

router.post('/users/login', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.email);
    userModel.checkIfUserExists(req.body.username, (err, user) => {
        if (err || user == null) {
            res.status(500).json({
                message: 'User does not exist',
            });
        }


        jwt.sign({ user }, 'supersecret', {expiresIn: '50s'}, (error, token) => {
            if (err) res.sendStatus(500);
            res.status(200).json({
                token,
            });
        });
    });

});

router.put('/users/:username', verifyToken, (req, res) => {
    console.log("In the PUT", req.params.username);
    userModel.findOne({
        username: req.params.username
    }, (err, user) =>{
        if(err){
            res.status(500).json({
                message:'User not found'
            })
        }else{
            user.email = req.body.email;
            user.save((err, success) =>{
                if(err){
                    res.status(500).json({
                        message: 'Error updating'
                    })
                }else{
                    res.status(200).json({
                        message: `User updated: ${success}`
                    })
                }
            })
            
        }
    })
    //res.send('With token')
})

module.exports = router;


