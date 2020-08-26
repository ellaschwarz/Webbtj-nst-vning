const {
    loginUser,
    createNewUser
}  = require('../models/user-model.js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = "carola";

const authorizeUser = async (req, res, next) => {
    if(!req.headers.authorization) return res.sendStatus(403)
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
        const payload = jwt.verify(token, secret);
        req.user = {...payload,
            owns(document) {
            return this._id == document.author_id;
        }};
        
        next()
        //res.status(200).send(payload);
    } catch (error) {
        res.sendStatus(403);
    }
}

const userLogin = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await loginUser(username, password);
            const payload = {
                ...user,
            };

        const token = jwt.sign(payload, secret, {expiresIn: "1h"} )
        console.log(token);
        res.status(200).send(token);
    } catch (err) {
        res.status(404).send(err);
    }
};

const createUser = async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);

    let userData = {
        username: req.body.username,
        password: hash
    }
    try {        
        const user = await createNewUser(userData);
        res.status(200).send(user);
    } catch (err) {
        res.status(404).send(err);
    }
};

module.exports = { userLogin, createUser, authorizeUser }