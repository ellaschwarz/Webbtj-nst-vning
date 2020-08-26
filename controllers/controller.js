const {
  findPosts,
  findPost,
  createPost,
  updatePost,
  deletePost,
} = require("../models/model.js");

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
    author_id: req.user._id
  };
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
    content: req.body.content
  };
  try {
    const post = await findPost(req.params.id);
    console.log(req.user);
      if(req.user.owns(post)) {
        const updatedPost = await updatePost(id, postData);
        console.log(updatedPost);
        res.sendStatus(200).send(updatedPost);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteOnePost = async (req, res) => {
  try {
    const posts = await findPost(req.params.id);
    if(req.user.owns(posts)) {
      const deletedPosts = await deletePost(req.params.id);
      res.sendStatus(200).send(deletedPosts);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};



module.exports = {
  findAllPosts,
  findOnePost,
  createNewPost,
  updateNewPost,
  deleteOnePost,

};
