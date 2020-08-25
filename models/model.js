const dataBase = require('nedb');
const db = {} 
db.posts = new dataBase({
    autoload: true,
    filename: 'posts'
});

module.exports = {
    async findPosts() {
        return new Promise ( (resolve, reject) => {
            db.posts.find({}, (err, docs ) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(docs);
                }
            });
        });
    },
    async findPost(id) {
        return new Promise ( (resolve, reject) => {
            db.posts.findOne({_id: id}, {}, (err, docs ) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(docs);
                }
            });
        });
    },
    async createPost(postData) {
        return new Promise ( (resolve, reject) => {
            db.posts.insert(postData, (err, newPost ) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(newPost);
                }
            });
        });
    },
    async updatePost(id, postData) {
        return new Promise ( (resolve, reject) => {
            db.posts.update({_id: id}, postData, {},(err, updatedPost ) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(updatedPost);
                }
            });
        });
    },
    async deletePost(id) {
        return new Promise ( (resolve, reject) => {
            db.posts.remove({_id: id}, {}, (err, removedDoc ) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(removedDoc);
                }
            });
        });
    },
    async createComment(postId, commentData) {
        return new Promise ( (resolve, reject) => {
            db.posts.update({_id: postId}, {$push: {comments: commentData} }, {},(err, newComment ) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(newComment);
                }
            });
        });
    },
    async findComments(postId) {
        return new Promise ( (resolve, reject) => {
            db.posts.findOne({_id: postId}, (err, docs ) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(docs.comments);
                }
            });
        });
    },
    async findOneComment(commentId) {
        return new Promise ( (resolve, reject) => {
            //Super bra och granska ej kod här nere
            db.posts.findOne({"comments.comment_id": commentId}, (err, docs ) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(docs.comments[0]);
                }
            });
        });
    },  
};