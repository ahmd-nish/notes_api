const {verify} = require('jsonwebtoken')


//Middleware functions to verify the token and authenticate the user
const validateToken = (req, res, next) => {
    const accessToken = req.body.token;

    if (!accessToken) {
        return res.status(401).json({
            error: 'User is not logged in'
        });
    }

    try{
        const validateToken = verify(accessToken, process.env.JWTPRIVATEKEY);
        if (validateToken) {
            req.authenticated = true;
            return next();
        } 
    }catch(err){
        return res.status(401).json({
            error: err.message
        });
    }
};

module.exports = {validateToken};