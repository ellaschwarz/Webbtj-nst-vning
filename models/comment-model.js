const dataBase = require('nedb');
const db = {} 
db.comments = new dataBase({
    autoload: true,
    filename: 'comments'
});

module.exports = {

async createComment(postId, commentData) {
    return new Promise ( (resolve, reject) => {
        db.comments.update({_id: postId}, {$push: {comments: commentData} }, {},(err, newComment ) => {
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
        db.comments.find({post_id: postId}, (err, docs ) => {
            if (err) {
                reject (err);
            } else {
                resolve(docs);
            }
        });
    });
},
async findOneComment(commentId) {
    return new Promise ( (resolve, reject) => {
        //Super bra och granska ej kod här nere
        db.comments.findOne({_id: commentId}, (err, docs ) => {
            if (err) {
                reject (err);
            } else {
                resolve(docs);
            }
        });
    });
},

async updateComment(commentId, commentData) {
    return new Promise ( (resolve, reject) => {
        db.comments.update({_id: commentId}, {$set: commentData}, {},(err, updatedComment ) => {
            if (err) {
                reject (err);
            } else {
                resolve(updatedComment);
            }
        });
    });
},

async deleteComment(commentId) {
    return new Promise ( (resolve, reject) => {
        db.comments.remove({_id: commentId}, {}, (err, removedDoc ) => {
            if (err) {
                reject (err);
            } else {
                resolve(removedDoc);
            }
        });
    });
} 

};