const users = {
    userLogin,
    createUser,
    authorizeUser
} = require('../controllers/user-controller.js');

const express = require('express');
const router = express.Router();


router.post('/user/login', users.userLogin);
router.post('/user', users.createUser);
router.get('/protected', users.authorizeUser);

module.exports = router;