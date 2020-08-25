const dataBase = require('nedb');
const bcrypt = require('bcryptjs');
const db = {} 
db.users = new dataBase({
    autoload: true,
    filename: 'users'
});

module.exports = {
    async loginUser(username, password) {
        return new Promise ( (resolve, reject) => {
            db.users.findOne({username: username}, {}, (err, docs ) => {
                if (err) {
                    reject (err);
                } else {
                    bcrypt.compare(password, docs.password, (err, success) => {
                        if (err) { return reject(err)}
                        if (success) {
                            //console.log(docs);
                            return resolve(docs)
                        }
                    }) 
                }
            });
        });
    },
    async createNewUser(userObject) {
        return new Promise ( (resolve, reject) => {
        
            db.users.insert(userObject, (err, newUser ) => {
                if (err) {
                    reject (err);
                } else {
                    resolve(newUser);
                }
            });
        });
    },
}