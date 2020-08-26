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

module.exports = {authorizeUser};