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
