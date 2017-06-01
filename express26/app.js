var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var Person = require('./models').Person
var User = require('./models').User

var cors = require('cors')
const corsOptions = { origin: 'http://localhost:3001' }
app.use(cors())

app.use(express.static('public'))
app.use(bodyParser.json())

// const authorization = function(request, response, next){
//   const token = request.query.authToken || request.body.authToken
//   if(token){
//     User.findOne({
//       where: {authToken:token}
//     }).then(user)=>{
//       if(user){
//         request.currentUser = user
//         next()
//       }else{
//         response.status(401)
//         response.json({message:'Authorization Invalid'})
//       }
//     }
//   }else{
//     response.status(401)
//     response.json({message:'Authorization Invalid'})
//   }
// };

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

// app.post('/login', function(request,response){
//   User.findOne({where:{email: request.body.user.email}}).then(function(user){
//     if(user){
//       if(user.verifyPassword(request.body.user.password)){
//         response.status(200)
//         response.json({
//           user:user,
//           message:"User Logged In!"
//         })
//       }else{
//         response.status(401)
//         response.json({
//           message:"Could not log in!"
//         })
//       }
//     }else{
//       response.status(401)
//       response.json({
//         message:"Could not log in!"
//       })
//     }
//   })
// })

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

app.post('/register', function (request, response) {
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
