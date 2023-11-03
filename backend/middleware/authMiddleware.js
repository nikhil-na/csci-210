const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);

    if(token){
        jwt.verify(token, 'nikhil secret key', async (err, decodedToken) => {
            if(err){
                return res.json({Error: "Not a valid token!"});
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                req.name = user.name;
                next();
            }
        })
    } else {
        return res.json({Error: "Not Authenticated"});
    }
}

module.exports = { requireAuth };