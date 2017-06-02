import Dispatcher from './Dispatcher'
// import userStore from './stores/UserStore'

export function checkLogin(){
  Dispatcher.dispatch({
    type: 'CHECK_LOGIN',
  })
}

export function updatePeople(){
  const params = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }
  fetch("http://localhost:3001/list", params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        Dispatcher.dispatch({
          type: 'UPDATE_PERSON',
          people: body.people
        })
      })
    }
  }).catch(function(error){
  })
}

export function createPerson(attributes){
  var self = this
  const params = {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attributes)
  }
  fetch("http://localhost:3001/add", params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        Dispatcher.dispatch({
          type: 'CREATE_PERSON',
          person: body.person
        })
      })
    }
  }).catch(function(error){
    self.setState({
      message: 'there was an error: ' + error.errors.join("\n")
    })
  })
}

// export function login(attributes){
//   const params = {
//     method:'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(attributes)
//   }
//   fetch("http://localhost:3001/login", params).then(function(response){
//     if(response.status === 200){
//       response.json().then(function(body){
//         Dispatcher.dispatch({
//           type: 'LOGIN_USER',
//           user: body.user
//         })
//       })
//     }
//   }).catch(function(error){
//     userStore.updateMessage("There was an error: " + error)
//   })
// }

export function createUser(attributes){
  const params = {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attributes)
  }
  fetch("http://localhost:3001/register", params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        Dispatcher.dispatch({
          type: 'CREATE_USER',
          user: body.user
        })
      })
    }
  }).catch(function(error){
    this.setState({
      message: 'there was an error: ' + error.errors.join("\n")
    })
  })
}
