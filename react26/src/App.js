import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Create from './routes/Create'
import Index from './routes/Index'
import Register from './routes/Register'
import Login from './routes/Login'
import {updatePeople, checkLogin} from './actions'
import userStore from './stores/UserStore'
import store from './stores/PersonStore'

class App extends Component {
  constructor(props){
    super(props)
    checkLogin()
    updatePeople()
    this.state = {
      message: store.getMessage(),
      currentUser: userStore.getUser()
    }
  }

  updateUserMessage(){
    this.setState({
      message: userStore.getMessage()
    })
  }

  updatePersonMessage(){
    this.setState({
      message: store.getMessage()
    })
  }

  handleLogin(){
  this.setState({
    currentUser: userStore.getUser()
  })
}

  componentWillMount(){
    userStore.on('userStore', this.updateUserMessage.bind(this))
    userStore.on('login', this.handleLogin.bind(this))
    store.on('message', this.updatePersonMessage.bind(this))
    store.on('allRows', this.updatePersonMessage.bind(this))
    store.on('newRow', this.updatePersonMessage.bind(this))
  }

  componentWillUpdate(){
    userStore.on('userStore', this.updateUserMessage.bind(this))
    store.on('message', this.updatePersonMessage.bind(this))
    store.on('allRows', this.updatePersonMessage.bind(this))
    store.on('newRow', this.updatePersonMessage.bind(this))
  }

  render() {
    return (
      <div>
        <div className='message'>{this.state.message}</div>
        <Router>
          <div>
              <Route exact path="/" component={Index} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
