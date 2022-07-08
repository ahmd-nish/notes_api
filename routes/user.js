const {User } = require('../models/user');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

router.post('/', async(req, res) => {
    var email = req.body.email;
    var name = req.body.name;
    var randPassword = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    console.log(randPassword);
    try {
        
        const user = await User.findOne({ email: req.body.email });

        if (user) 
            return res.status(400).send('User already registered.');
        
        
        sendMail(req.body.email, req.body.name, randPassword);
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashedPassword}).save();
        res.status(201).send('User registered successfully.');


    } catch (error) {

        res.status(500).send({message: "Internal server error"});
        console.log(error);

    }
})




router.get('/', async(req, res) => {
    const users = await User.find();
    res.send(users);
})


router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.send(user);
})



router.put('/:id', async(req, res) => {

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user){
        return res.status(404).send('User not found.');
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});

    res.send(updatedUser);
})


router.delete('/:id', async(req, res) => {

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user){
        return res.status(404).send('User not found.');
    }

    const deletedUser = await User.findByIdAndDelete(id);

    res.send(deletedUser);
})



function sendMail (email, name, password) {
    
    console.log( email);
    console.log( password);
    console.log( name);
    // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();
        
        

        
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              service: 'outlook',
              secure: false, // true for 465, false for other ports
              auth: {
                  user: 'techincal.test@outlook.com',
                  pass: 'Basin@123'
              },
            });
        
                  // point to the template folder
                  const handlebarOptions = {
                     viewEngine: {
                       partialsDir: path.resolve("./views/"),
                       defaultLayout: false,
                     },
                     viewPath: path.resolve("./views/"),
                   };
               
                   // use a template file with nodemailer
                   transporter.use("compile", hbs(handlebarOptions));
               
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: "techincal.test@outlook.com", // sender address
              to: email, // list of receivers
              subject: "Notes management system", // Subject line
              template: 'email', // the name of the template file i.e email.handlebars
              context:{
                  mail: email, // replace {{name}} with Adebola
                  password: password ,// replace {{company}} with My Company
              }
            });
        
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }

          main().catch(console.error);
  

}




module.exports = router;