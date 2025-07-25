const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            message : "No token, authorization denied"
        });
    };

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token , JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error){
        return res.status(401).json({
            message : "Token is not available"
        })
    }
}

module.exports = authMiddleware;