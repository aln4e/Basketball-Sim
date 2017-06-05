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
    localStorage.setItem('authToken', attributes.authToken)
    localStorage.setItem('authTokenExpiration', attributes.authTokenExpiration)
    localStorage.setItem('email', attributes.email)
    this.emit('userLoggedIn')
  }

  updateMessage(str){
    this.message = str
    this.emit('message')
  }

  setUserFromLocal(){
   let token = localStorage.getItem('authToken')
   let expire = new Date(localStorage.getItem('authTokenExpiration'))
   if(token && expire >= new Date()){
     this.user = {
       authToken: token,
       authTokenExpiration: expire,
       email: localStorage.getItem('email')
     }
     this.emit('userLoggedIn')
   }
 }

 logout(){
   this.user = null
   localStorage.setItem('authToken', null)
   localStorage.setItem('authTokenExpiration', null)
   localStorage.setItem('email', null)
   this.updateMessage('User logged out!')
   this.emit('loggedOut')

 }

  handleActions(action){
    switch(action.type){
      case('CREATE_USER'):{
        this.updateUser(action.user)
        this.updateMessage("User Created!")
        this.emit('userCreated')
        break
      }
      case('LOGIN_USER'):{
        this.updateUser(action.user)
        this.updateMessage("User Logged In!")
        this.emit('userLoggedIn')
        break
      }
      case("CHECK_LOGIN"):{
        this.setUserFromLocal()
        break
      }
      case("LOGOUT"):{
        this.logout()
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
