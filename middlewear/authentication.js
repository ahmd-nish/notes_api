const {verify} = require('jsonwebtoken')



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