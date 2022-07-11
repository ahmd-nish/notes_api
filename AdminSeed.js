const {User } = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const seedUser =[
   new User ({
        firstName: 'Admin',
        lastName: 'Seeder',
        email: 'admin@seed.com',
        status: true,
        accountType: 'admin',

    })
]


async function seedDB(){

    mongoose.connect('mongodb+srv://nishad:basin123@surge.daapw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true}).then(()=>{
        console.log('Connected to MongoDB');
    }).catch((error)=>{
        console.log(error);
        console.log('Error connecting to MongoDB');
    })
    
        let password = 'admin';
        const salt = await  bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await  bcrypt.hash(password, salt);
        seedUser[0].password = hashedPassword;
        await seedUser[0].save();
        console.log('Seeded DB');


        mongoose.disconnect();
};

seedDB();

