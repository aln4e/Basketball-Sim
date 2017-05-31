import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Create from './routes/Create'
import Index from './routes/Index'
import Login from './routes/Login'
import {updatePeople} from './actions'
import userStore from './stores/UserStore'
import store from './stores/HumanStore'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      message:""
    }
    updatePeople()
  }

  updateUserMessage(){
    this.setState({
      message: userStore.getMessage()
    })
  }

  updateHumanMessage(){
    this.setState({
      message: store.getMessage()
    })
  }

  componentWillMount(){
    userStore.on('created', this.updateUserMessage.bind(this))
    store.on('change', this.updateHumanMessage.bind(this))
  }

  render() {
    return (
      <div>
        <div className='message'>{this.state.message}</div>
        <Router>
          <div>
              <Route exact path="/" component={Index} />
              <Route exact path="/create" component={Create} />
              <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
