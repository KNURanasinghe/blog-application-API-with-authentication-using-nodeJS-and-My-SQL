const models = require('../models');
const validator = require('fastest-validator');


//insert data in to the database
function save(req, res) {
    const post = {
        title: req.body.title,
        contet: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData.user
    }

    const schema = {
        title: {type: 'string', optional:false, max: "100"},
        contet: {type: 'string', optional:false, max: "500"},
        categoryId: {type: 'number', optional:false},
    }

    const v = new validator();
    const validationResponse =v.validate(post, schema) 

    if (validationResponse !== true) {
        return res.status(400).json({
            message: 'Validation failed',
            error: validationResponse
        })
    }

    models.Post.create(post).then((data) => {
        res.status(201).json({
            message: 'Post created successfully',
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        })
    })  
}

//show posts by is
function show(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id).then((data) => {
        if (data) {
            res.status(200).json({
                message: 'Post fetched successfully',
                data: data
            });
        } else {
            res.status(404).json({
                message: 'Post not found'
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        });
    });
}

function findAll(req, res){
    models.Post.findAll().then((data) => {
        res.status(200).json({
            message: 'Posts fetched successfully',
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        })
    })
}

//update users
function updateUser(req, res){
    const id = req.params.id;
    const updatedPost ={
        title: req.body.title,
        contet: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id
    }
    const userId = req.userData.user;

    const schema = {
        title: {type: 'string', optional:false, max: "100"},
        contet: {type: 'string', optional:false, max: "500"},
        categoryId: {type: 'number', optional:false},
    }

    const v = new validator();
    const validationResponse =v.validate(updatedPost, schema) 

    if (validationResponse !== true) {
        return res.status(400).json({
            message: 'Validation failed',
            error: validationResponse
        })
    }
    models.Post.update(updatedPost, {where: {id: id, userId: userId}}).then((data) => {
        res.status(200).json({
            message: 'Post updated successfully',
            data: updatedPost
        })
    }).catch((err) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        })
    })      
}

function deleteUser(req,res){
    const id = req.params.id;
    const userId = req.userData.user;   
    models.Post.destroy({where: {id: id,  userId: userId}}).then((data) => {
        res.status(200).json({
            message: 'Post deleted successfully',
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        })
    })

}

module.exports = {
    save: save,
    show: show,
    findAll: findAll,
    updateUser: updateUser,
    deleteUser: deleteUser
}