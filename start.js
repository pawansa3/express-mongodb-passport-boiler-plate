const mongoose = require('mongoose');

//import sensitive data/environmental variables from our variables.env
require('dotenv').config({ path: 'variables.env' });

//connect to our database and handle any bad connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true});
// tell mongoose to use es6 promises
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error(`🛑⚠🚫🛑⚠🚫🛑 ➡ ${err.message}`);
});

//Now here import all of your models
require('./models/User');


// Start the server at port from env file/3000 
const app = require('./app');
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});