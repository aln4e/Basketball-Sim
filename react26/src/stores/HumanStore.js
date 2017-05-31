import Dispatcher from '../Dispatcher'
import {EventEmitter} from 'events'

class HumanStore extends EventEmitter{
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
    this.message = "New human created!"
    this.emit('change')
  }

  updatePeople(attributes){
    this.people = attributes
    this.message = "Human Index is loaded!"
    this.emit('change')
  }

  handleActions(action){
    switch(action.type){
      case('CREATE_PERSON'):{
        this.updateNewPerson(action.person)
        break
      }
      case('UPDATE_PEOPLE'):{
        this.updatePeople(action.people)
        break
      }
      default:{}
    }
  }
}

const store = new HumanStore()
Dispatcher.register(store.handleActions.bind(store))
window.store = store
export default store
