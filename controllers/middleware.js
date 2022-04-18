const config = require("../config/config");
const jwt = require('jsonwebtoken');


const UserTypeID = 0;
const AdminTypeID = 1;


exports.verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");
    try {
        token = token.split(' ')[1] // Remove Bearer from string
        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');
        let verifiedUser = jwt.verify(token, config.TOKEN_SECRET);   // config.TOKEN_SECRET => 'secretKey'
        if (!verifiedUser) return res.status(401).send('Unauthorized request')
        req.user = verifiedUser; // user_id & user_type_id
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}

exports.IsUser = async (req, res, next) => {
    if (req.user.user_type_id === UserTypeID) {
        return next();
    }
    return res.status(401).send("Unauthorized!");   
}

exports.IsAdmin = async (req, res, next) => {
    if (req.user.user_type_id === AdminTypeID) {
        return next();
    }
    return res.status(401).send("Unauthorized!");
}