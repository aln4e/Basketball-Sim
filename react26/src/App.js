import React, { Component } from 'react';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom'
import Create from './routes/Create'
import Index from './routes/Index'
import Register from './routes/Register'
import Login from './routes/Login'
import {updatePeople, userLogout, checkLogin} from './actions'
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

  login(){
    if(this.state.currentUser){
      return(<a onClick={this.handleLogout.bind(this)}>{this.state.currentUser.email}</a>)
    }else{
      return(<Link to='/login'>Login</Link>)
    }
  }

  handleLogout(){
    userLogout()
  }

  componentWillMount(){
    userStore.on('userAlreadyLoggedIn', this.handleLogin.bind(this))
    userStore.on('userCreated', this.updateUserMessage.bind(this))
    userStore.on('userLoggedIn', this.updateUserMessage.bind(this))
    userStore.on('message', this.updateUserMessage.bind(this))
    store.on('message', this.updatePersonMessage.bind(this))
    store.on('allRows', this.updatePersonMessage.bind(this))
    store.on('newRow', this.updatePersonMessage.bind(this))
  }

  componentWillUpdate(){
    userStore.on('userCreated', this.updateUserMessage.bind(this))
    userStore.on('userLoggedIn', this.updateUserMessage.bind(this))
    userStore.on('message', this.updateUserMessage.bind(this))
    store.on('message', this.updatePersonMessage.bind(this))
    store.on('allRows', this.updatePersonMessage.bind(this))
    store.on('newRow', this.updatePersonMessage.bind(this))
  }

  render() {
    return (
      <div>
        <div className='message'>{this.state.message}</div>
        <Router>
          <div className='App container'>
            <div className='navBar'>
              <div className='pull-right'>
                <Link to='/'>Index</Link> |
                <Link to='/create'>Create</Link> |
                <Link to='/register'>Register</Link> |
                {this.login()}
              </div>
            </div>

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
