const {
    loginUser,
    createNewUser
}  = require('../models/user-model.js');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = "carola";



const userLogin = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await loginUser(username, password);   

        const token = jwt.sign(user, secret, {expiresIn: "1h"} )
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