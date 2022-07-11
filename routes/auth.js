const router = require('express').Router();
const {User} = require('../models/user');
const joi = require('joi');
const bcrypt = require('bcrypt');



//API to authenticate a user with the system
router.post('/', async(req, res) => {
    try {
        const{error}=validate(req.body);
        if(error)
        {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({email:req.body.email});
        if(!user)
            return res.status(400).send('User not registered.');
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword)
            return res.status(400).send({message:'Invalid Email or Password.'});

        
        const token = user.generateAuthToken();
        let name = user.firstName + ' ' + user.lastName;
        res.status(200).send({data:token , message: 'User logged in successfully.',status:user.status,userId:user._id,accountType:user.accountType,name:name});


    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal is server error"});
    }
})


const validate = (data) => {
    const schema = joi.object({

        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
       
    });
    return schema.validate(data);
}


module.exports = router;
