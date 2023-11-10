var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const fetch = (...args)=>
    import('node-fetch').then(({default : fetch}) => fetch(...args));




const CLIENT_ID = "c1c15041b40cebc5271e";
const CLIENT_SECRET = "cf9f755f052284e2c5c6d65227932ca20ff7f3bd";


var app = express();
app.use(cors());
app.use(bodyParser.json())
app.listen(4000 , function() { 
    console.log("4000 hi ")
});
