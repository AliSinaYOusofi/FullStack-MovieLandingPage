const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("X-auth-token");
    if (!token) return res.status(401).send("Access denied");
    try {
        const user = jwt.verify(token, "Secret");
        req.user = user;
        next();
    } catch(error) {
        res.status(401).send("Invalid Token");
    }
}