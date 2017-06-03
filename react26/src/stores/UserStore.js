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

  updateMessage(str){
    this.message = str
    this.emit('message')
  }

 //  setUserFromLocal(){
 //   let token = localStorage.getItem('authToken')
 //   let expire = new Date(localStorage.getItem('authTokenExpiration'))
 //   if(token && expire >= new Date()){
 //     this.user = {
 //       authToken: token,
 //       authTokenExpiration: expire,
 //       email: localStorage.getItem('email')
 //     }
 //     this.emit('login')
 //   }
 // }

  handleActions(action){
    switch(action.type){
      case('CREATE_USER'):{
        this.updateUser(action.user)
        this.updateMessage("User Created!")
        this.emit('userCreated')
        break
      }
      case('LOGIN_USER'):{
        debugger
        this.updateUser(action.user)
        debugger
        this.updateMessage("User Logged In!")
        debugger
        this.emit('userLoggedIn')
        break
      }
      // case("CHECK_LOGIN"):{
      //   this.setUserFromLocal()
      //   break
      // }
      default:{}
    }
  }
}

const userStore = new UserStore()
Dispatcher.register(userStore.handleActions.bind(userStore))
window.userStore = userStore
export default userStore
