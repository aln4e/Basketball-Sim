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

  setUserFromLocal(){
   let token = localStorage.getItem('authToken')
   let expire = new Date(localStorage.getItem('authTokenExpiration'))
   if(token && expire >= new Date()){
     this.user = {
       authToken: token,
       authTokenExpiration: expire,
       email: localStorage.getItem('email')
     }
     this.emit('login')
   }
 }

  handleActions(action){
    switch(action.type){
      case('CREATE_USER'):{
        this.updateUser(action.user)
        this.message = "User Created!"
        debugger
        this.emit('userStore')
        break
      }
      case('LOGIN_USER'):{
        this.updateUser(action.user)
        this.message = "User Logged In!"
        this.emit('userStore')
        break
      }
      case("CHECK_LOGIN"):{
        this.setUserFromLocal()
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
