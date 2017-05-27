var express = require('express');
//bodyparser since we need to read the form
var bodyParser = require('body-parser')
var app = express();
app.use(express.static('public'))
//need body parser to send/receive json
app.use(bodyParser.json())


//this get page is to test connectivity
app.get('/', function (request, response) {
 response.json({message: 'Homepage success'});
});

//need a route to post the data that we're collecting in the form
app.post('/add', function (request, response) {
 response.json('Add Success');
});

//need a port to listen for requests
app.listen(3001, function () {
 console.log('Example app listening on port 3001!');
});
