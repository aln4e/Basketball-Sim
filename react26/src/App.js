import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Create from './routes/Create'
import Index from './routes/Index'

class App extends Component {
  render() {
    return (
        <Router>
          <div>
              <Route exact path="/" component={Index} />
              <Route exact path="/create" component={Create} />
          </div>
        </Router>
    );
  }
}

export default App;
