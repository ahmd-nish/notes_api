const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    };
    try{
        mongoose.connect(process.env.DB, connectionParams);
        console.log('Connected to MongoDB');
    }catch(err){
        console.log(err);
        console.log('Error connecting to MongoDB');
    }
}