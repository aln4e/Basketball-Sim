import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'

class UserStore extends EventEmitter{
  constructor(){
    super()
    // this.users = []
    this.newUser = {}
    this.message = ""
  }

  getMessage(){
    return this.message
  }

  getNewUser(){
    return this.newUser
  }

  addUser(attributes){
    this.newUser = attributes
    this.message = "User Created!"
    this.emit('created')
  }

  handleActions(action){
    switch(action.type){
      case('CREATE_USER'):{
        this.addUser(action)
        break
      }
      default:{}
    }
  }
}

const userStore = new UserStore()
Dispatcher.register(userStore.handleActions.bind(userStore))
window.userStore = userStore
export default userStore
