const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const authorization = req.headers.authorization;
    let token = null;

    if (authorization && authorization.split(" ").length == 2) {
        token = authorization.split(" ")[1];
        console.log(token);
    } else {
        console.log("Unauthorized user");
        return;
    }

    try {
        const decoded = jwt.verify(token, "secret key");

        if (decoded.exp < Date.now()) {
            console.log("Token has expired");
            return;
        }

        next();
    } catch(err) {
        console.log("Token invalid:", err);
    }
};