import {EventEmitter} from 'events'
import Dispatcher from '../Dispatcher'

class UserStore extends EventEmitter{
  constructor(){
    super()
    // this.users = []
    this.user = null
    this.message = ""
  }

  getMessage(){
    return this.message
  }

  getUser(){
    return this.user
  }

  updateUser(attributes){
    this.user = attributes
  }

  handleActions(action){
    switch(action.type){
      case('CREATE_USER'):{
        this.updateUser(action.user)
        this.message = "User Created!"
        this.emit('userStore')
        break
      }
      case('LOGIN_USER'):{
        this.updateUser(action.user)
        this.message = "User Logged In!"
        this.emit('userStore')
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
