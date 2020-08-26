const {
    createNewComment,
    findPostComments,
    findOnePostComment,
    updateNewComment,
    deleteOneComment
} = require('../controllers/comment-controller.js');

const user = {
    authorizeUser
} = require('../middleware/middleware.js')

const express = require('express');
const router = express.Router();

router.get('/posts/:id/comments', findPostComments);
router.get('/posts/comments/:id', findOnePostComment);
router.post('/posts/comments', user.authorizeUser, createNewComment);
router.patch('/posts/comments/:id', user.authorizeUser, updateNewComment);
router.delete('/posts/comments/:id', user.authorizeUser, deleteOneComment);

module.exports = router;