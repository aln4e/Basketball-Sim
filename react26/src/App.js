import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Create from './routes/Create'
import Index from './routes/Index'
import {updatePeople} from './actions'

class App extends Component {
  constructor(props){
    super(props)
    updatePeople()
  }

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

// Why do we have a constructor here?
// what is the updateCats action? How does it work? What does it do?
//updateCats pings the database. if it's successful, it should parse the json then forward to the store for additional processing

//FLUX
//-->Need a DISPATCHER
//-->Add updateCats as an ACTION
//-->Create a store
//---->Within constructor: Have an array that points to the rows in your database
//---->Within constructor: Have an object literal containing a newly created row
//---->Method: to return the array of instances
//---->Method: to return the newly created rows
//---->Method: to update all cats and emit change
//---->Method: to update newly created cat and emit change
//-->Switch at bottom
