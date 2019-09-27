// Express
const express = require('express');
// Mongoose
const mongoose = require('mongoose');
// import config
const config = require('./config/database');
const path = require('path');

// connect to mongoose
mongoose.connect(config.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log('Could NOT connect to database', err);
    }else{    
        console.log('Connected to database : ', config.db);
    }
});
// initialize express
const app = express();

// connect node to angular
app.use(express.static(__dirname + '/client/dist/client'));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'))
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});