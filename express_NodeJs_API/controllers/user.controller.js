const models = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function signUp(req, res) {
    models.User.findOne({where: {email: req.body.email}}).then((data) => {
        if (data) {
            return res.status(409).json({
                message: 'User already exists'
            })
        }else{
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                
                    models.User.create(user).then(result =>{
                        res.status(201).json({
                            message: 'User created successfully',
                            data: result
                        })
                    }).catch((err) => {
                        res.status(500).json({
                            message: 'Something went wrong',
                            error: err
                        })
                    })
                })
            })
        
        }
    }).catch((err) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        })
    }) 
}

function ligIn(req, res) {
    models.User.findOne({where:{email:req.body.email}}).then(user=>{
        if(user === null){
            return res.status(401).json({
                message: 'Authentication failed. User not found.'
            })
        }else{
            
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result){
                const token = jwt.sign({
                    email: user.email, 
                    userId: user.id
                }, process.env.JWT_KEY, function(err, token){
                    res.status(200).json({
                        "message": 'Authentication successful',
                        "token": token
                    })
                });
            }else{
                return res.status(401).json({
                    message: 'Authentication failed. Wrong credentials.'
                })
            }
            
        })
        }
    }).catch((err)=>{
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        })
    })
}

module.exports = {
    signUp : signUp,
    logIn : ligIn
}