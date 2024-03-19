const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SEC, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next(); // Call next to proceed to the next middleware or route handler
            });
        } else {
            return res.status(401).json("Authorization header is missing");
        }
    } catch (error) {
        return res.status(403).json("You are not authorized");
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.is_admin) {
                next();
            } else {
                return res.status(403).json("You are not allowed to do that");
            }
        });
    } catch (error) {
        return res.status(403).json("You are not authorized");
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if (req.user.is_admin) {
                next();
            } else {
                return res.status(403).json("You are not allowed to do that");
            }
        });
    } catch (error) {
        return res.status(403).json("You are not authorized");
    }
}


module.exports = { verifyToken, verifyTokenAndAuthorization ,verifyTokenAndAdmin};
