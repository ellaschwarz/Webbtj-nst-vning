const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

console.log(secret);

const authorizeUser = async (req, res, next) => {
    if(!req.headers.authorization) return res.sendStatus(403)
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    try {
        const payload = jwt.verify(token, secret);
        
        req.user = {...payload,
            owns(document) {
            console.log(this._id);
            console.log(document.author_id);

            return this._id == document.author_id;
        }};
        
        next()
        //res.status(200).send(payload);
    } catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
}

module.exports = {authorizeUser};