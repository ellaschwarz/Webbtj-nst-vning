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
                    console.log(err);
                    reject (err);
                } else {
                    console.log(docs)
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
            db.posts.update({_id: id}, {$set: postData}, {},(err, updatedPost ) => {
                if (err) {
                    console.log(err);
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
    } 
};