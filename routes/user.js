const {User } = require('../models/user');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const {validateToken} = require('../middlewear/authentication');

//Api to add a user into the database
router.post('/', async(req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email });

        if (user) 
            return res.status(400).send('User already registered.');
        
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashedPassword}).save();
        res.status(201).send('User registered successfully.');


    } catch (error) {

        res.status(500).send({message: "Internal server error"});
        console.log(error);

    }
})



//API to get the users profile registered for the system
router.post('/all/',validateToken, async(req, res) => {
    const users = await User.find({accountType: 'user'});
    res.send(users);
})


//API to get a single user
router.post('/single/:id', async(req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.send(user);
})


//API to update the user details while the first time usage
router.put('/:id',validateToken, async(req, res) => {

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user){
        return res.status(404).send('User not found.');
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});

    res.send(updatedUser);
})

//API to update the new user password
router.put('/pass/:id', async(req, res) => {

    const id = req.params.id;
    
    // const password = req.body.password;

    const user = await User.findById(id);

    if (!user){
        return res.status(404).send('User not found.');
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
        
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const updatedUser = await User.findByIdAndUpdate(id, {password:hashedPassword}, {new: true});

    res.send(updatedUser);
})

//API to delete a user from the system
router.delete('/:id', async(req, res) => {

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user){
        return res.status(404).send('User not found.');
    }

    const deletedUser = await User.findByIdAndDelete(id);

    res.send(deletedUser);
})




module.exports = router;