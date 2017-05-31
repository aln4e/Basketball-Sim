import Dispatcher from './Dispatcher'

export function updatePeople(){
  const params = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }
  fetch("http://localhost:3001/list", params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        Dispatcher.dispatch({
          type: 'UPDATE_PEOPLE',
          people: body.people
        })
      })
    }
  }).catch(function(error){
  })
}

export function createHuman(attributes){
  const params = {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attributes)
  }
  fetch("http://localhost:3001/add", params).then(function(response){
    if(response.status === 200){
      updatePeople()
      response.json().then(function(body){
        Dispatcher.dispatch({
          type: 'CREATE_PERSON',
          person: body.person
        })
      })
    }
  }).catch(function(error){
    this.setState({
      message: 'there was an error: ' + error.errors.join("\n")
    })
  })
}

export function createUser(attributes){
  const params = {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(attributes)
  }
  fetch("http://localhost:3001/login", params).then(function(response){
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
