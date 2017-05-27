//bodyparser since we need to read the form
//also need body parser to send/receive json
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
//2) Added the model
var Person = require('./models').Person
//6)Add cors allows our express and react to make calls to each other
var cors = require('cors')
const corsOptions = { origin: 'http://localhost:3001' }
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())


//this get page is to test connectivity
app.get('/', function (request, response) {
 response.json({message: 'Homepage success'});
});

//3) Ultimately we want to take the inputs and add a new row to the model using the create method.
//4) To update multiple fields, we pass an object of the field to be updated with the contents we wish to update them to
app.post('/add', function (request, response) {
  Person.create(
    {
      name: request.body.person.name,
      age: request.body.person.age,
      sex: request.body.person.sex
    }
  ).then((newPerson)=>{
    response.status(200)
    response.json({
      person: newPerson
    })
  }).catch((error)=>{
    response.status(400)
    response.json({
      message: error
    })
  })
})

//need a port to listen for requests
app.listen(3001, function () {
 console.log('Example app listening on port 3001!');
});
