//TODO: SETUP NODE.JS SERVER + ERROR HANDLING
const express = require("express");

const config = require('/config/config');

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);

app.all('*', (req, res, next) => {
    next();
});

const port = process.env.PORT || config.PORT;

const server = app.listen(port, () => {
   console.log('Server up and running!');
});



