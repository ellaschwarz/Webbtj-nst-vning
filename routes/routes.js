const posts = {
findAllPosts,
findOnePost,
createNewPost,
updateNewPost,
deleteOnePost,
createNewComment,
findPostComments,
findOnePostComment,
} = require('../controllers/controller.js');

const express = require('express');
const router = new express.Router();

router.get('/posts', posts.findAllPosts);
router.get('/posts/:id', posts.findOnePost);
router.post('/posts', posts.createNewPost);
router.patch('/posts/:id', posts.updateNewPost);
router.delete('/posts/:id', posts.deleteOnePost);

router.get('/posts/:id/comments', posts.findPostComments);
router.get('/posts/comments/:id',posts.findOnePostComment);
router.post('/posts/comments', posts.createNewComment);
router.patch('/posts/comments/:id',/*posts.updateComment*/);
router.delete('/posts/comments/:id',/*posts.deleteComment*/);

/*router.get('/fullpost/:id',posts.);*/


module.exports = router;