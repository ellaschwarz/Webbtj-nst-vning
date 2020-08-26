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

const user = {
    authorizeUser,
} = require('../middleware/middleware.js');

const express = require('express');
const router = express.Router();

router.get('/posts', posts.findAllPosts);
router.get('/posts/:id', posts.findOnePost);
router.post('/posts', user.authorizeUser, posts.createNewPost);
router.patch('/posts/:id', user.authorizeUser, posts.updateNewPost);
router.delete('/posts/:id', user.authorizeUser, posts.deleteOnePost);

/*router.get('/fullpost/:id',posts.);*/


module.exports = router;