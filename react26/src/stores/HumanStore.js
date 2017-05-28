import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'

class HumanStore extends EventEmitter{
  constructor(){
    super()
    this.people = []
    this.newPerson = {}
  }

  getPeople(){
    return this.people
  }

  getNewPerson(){
    return this.newPerson
  }

  updateNewPerson(attributes){
    this.newPerson = attributes
    this.emit('change')
  }

  updatePeople(attributes){
    this.people = attributes
    this.emit('change')
  }

  handleActions(action){
    switch(action.type){
      case('CREATE_PERSON'):{
        this.updateNewPerson(action.attributes)
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
