//bodyparser since we need to read the form
//also need body parser to send/receive json
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
//2) Added the model
var Person = require('./models').Person
var User = require('./models').User
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

app.get('/list', function(request,response){
  Person.findAll().then(function(people){
    response.status(200)
    response.json({
      people:people
    })
  }).catch(function(err){
    response.status(400)
    response.json({message:error})
  })
})

//3) Ultimately we want to take the inputs and add a new row to the model using the create method.
//4) To update multiple fields, we pass an object of the field to be updated with the contents we wish to update them to
app.post('/add', function (request, response) {
  let personInputs = request.body.person
  Person.create(personInputs)
  .then((newPerson)=>{
    response.status(200)
    response.json({
      message: 'success',
      person: newPerson
    })
  }).catch((error)=>{
    response.status(400)
    response.json({
      message: error
    })
  })
})

app.post('/login', function (request, response) {
  let userInputs = request.body.user
  User.create(userInputs)
  .then((newUser)=>{
    response.status(200)
    response.json({
      message: 'you have registered!',
      user: newUser
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
