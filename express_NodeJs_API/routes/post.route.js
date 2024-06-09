const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const middleware = require('../middleware/check-auth');

router.post('/',middleware.checkAuth, postController.save)
router.get('/:id', postController.show)
router.get('/', postController.findAll)
router.patch('/:id',middleware.checkAuth, postController.updateUser)
router.delete('/:id',middleware.checkAuth, postController.deleteUser)


module.exports = router;