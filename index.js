const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { mongoose } = require('./database/Database');
const Auth = require('./Route/Auth');
const Purchase = require('./Route/Purchase');
const AddURL = require('./Route/AddURL');
const Feedback = require('./Route/feedbck');
const Admin = require('./Route/Admin');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods" , "GET,POST,PATCH,DELETE,OPTIONS,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, x-auth, Accept");
    res.header("Access-Control-Expose-Headers", "x-auth");
    res.header("Access-Control-Allow-Credentials" , true);
    next();
})


// app.use(bodyParser.json());
// app.use(morgan('combined'));

Auth(app);
Purchase(app);
AddURL(app);
Feedback(app);
Admin(app);

app.listen(port, () => {
    console.log(`Application has started on port ${port}`);
})

module.exports = app; 
