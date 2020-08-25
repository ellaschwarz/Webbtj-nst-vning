const {
    findPosts,
    findPost,
    createPost,
    updatePost,
    deletePost,
    createComment,
    findComments,
    findOneComment
} = require('../models/model.js');


const findAllPosts = async (req, res) => {
    try {
        const posts = await findPosts();
        res.status(200).send(posts);
    } catch (err) {
        res.status(404).send(err);
    }
};

const findOnePost = async (req, res) => {
    try {
        const posts = await findPost(req.params.id);
        res.status(200).send(posts);
    } catch (err) {
        res.status(404).send(err);
    }
};

const createNewPost = async (req, res) => {
    let postData = {
        title: req.body.title,
        content: req.body.content,
        author_id: req.body.author_id,
        comments: []
    }
    try {
        const post = await createPost(postData);
        res.status(200).send(post);
    } catch (err) {
        res.status(404).send(err);
    }
};

const updateNewPost = async (req, res) => {
    let id = req.params.id;
    let postData = {
        title: req.body.title,
        content: req.body.content,
        author_id: req.body.author_id,
        comments: []
    }
    try {
        const post = await updatePost(id, postData);
        res.sendStatus(200).send(post);
    } catch (err) {
        res.status(404).send(err);
    }
}

const deleteOnePost = async (req, res) => {
    try {
        const posts = await deletePost(req.params.id);
        res.sendStatus(200).send(posts);
    } catch (err) {
        res.status(404).send(err);
    }
};

const createNewComment = async (req, res) => {
    let id = req.body.id;
    let commentData = {
        author_id: req.body.author_id,
        comment: req.body.comment,
        comment_id: getRandomInt()
    }
    try {
        const post = await createComment(id, commentData);
        res.sendStatus(200).send(post);
    } catch (err) {
        res.status(404).send(err);
    }
}

const findPostComments = async (req, res) => {
    try {
        let id = req.params.id;
        const comments = await findComments(id);
        res.status(200).send(comments);
    } catch (err) {
        res.status(404).send(err);
    }
};

const findOnePostComment = async (req, res) => {
    try {
        const comment = await findOneComment(req.params.id);
        res.status(200).send(comment);
    } catch (err) {
        res.status(404).send(err);
    }
};

function getRandomInt() {  
    let randomNumber = Math.floor(Math.random() * Math.floor(100000));
    return randomNumber.toString();
}

module.exports = { findAllPosts, findOnePost, createNewPost, updateNewPost, deleteOnePost, createNewComment, findPostComments, findOnePostComment }


