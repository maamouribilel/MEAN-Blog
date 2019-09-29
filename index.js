// Express
const express = require('express');
// Router
const router = express.Router();
// Mongoose
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
// import config
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
// Body parser
const bodyParser = require('body-parser');
// connect to mongoose
mongoose.connect(config.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log('Could NOT connect to database', err);
    } else {
        console.log('Connected to database : ', config.db);
    }
});
// initialize express
const app = express();

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect node to angular
app.use(express.static(__dirname + '/client/dist/client'));
app.use('/authentication', authentication);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'))
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});