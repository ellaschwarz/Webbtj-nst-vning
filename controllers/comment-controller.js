const {
  createComment,
  findComments,
  findOneComment,
  updateComment,
  deleteComment
} = require("../models/comment-model.js");

const createNewComment = async (req, res) => {
  let id = req.body.id;
  console.log('Hello entering')
  let commentData = {
    author_id: req.user._id,
    comment: req.body.comment,
    post_id: req.body.post_id,
  };
  try {
    const comment = await createComment(id, commentData);
    console.log(comment);
    res.status(200).send(comment);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

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

const updateNewComment = async (req, res) => {
  let id = req.params.id;
  let commentData = {
    comment: req.body.comment
  };
  try {
    const comment = await findOneComment(req.params.id);
    if (req.user.owns(comment)) {
      const updatedComment = await updatePost(id, commentData);
      res.sendStatus(200).send(updatedComment);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteOneComment = async (req, res) => {
  try {
    const comment = await findOneComment(req.params.id);
    console.log(comment);
    if (req.user.owns(comment)) {
      console.log('IF-SATS')
      const deletedComment = await deleteComment(req.params.id);
      res.sendStatus(200).send(deletedComment);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  createNewComment,
  findPostComments,
  findOnePostComment,
  updateNewComment,
  deleteOneComment
};
