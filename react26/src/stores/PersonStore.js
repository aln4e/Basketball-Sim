import Dispatcher from '../Dispatcher'
import {EventEmitter} from 'events'

class PersonStore extends EventEmitter{
  constructor(){
    super()
    this.people = []
    this.newPerson = {}
    this.message = ""
  }

  getMessage(){
    return this.message
  }

  getPeople(){
    return this.people
  }

  getNewPerson(){
    return this.newPerson
  }

  updateNewPerson(attributes){
    this.newPerson = attributes
    this.people.push(attributes)
    this.updateMessage("New person created!")
    this.emit('newRow')
  }

  updatePeople(attributes){
    this.people = attributes
    this.updateMessage("Person Index is loaded!")
    this.emit('allRows')
  }

  updateMessage(newMessage){
    this.message = newMessage
    this.emit('message')
  }

  handleActions(action){
    switch(action.type){
      case('CREATE_PERSON'):{
        this.updateNewPerson(action.person)
        break
      }
      case('UPDATE_PERSON'):{
        this.updatePeople(action.people)
        break
      }
      default:{}
    }
  }
}

const store = new PersonStore()
Dispatcher.register(store.handleActions.bind(store))
window.store = store
export default store
