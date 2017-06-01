import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import store from '../stores/HumanStore'
import PersonListing from '../components/Listing'

class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      people: store.getPeople(),
      message: store.getMessage()
    }
  }

  updatePeople(){
    this.setState({
      people: store.getPeople(),
      message: store.getMessage()
    })
  }

  componentWillMount(){
    store.on('newRow', this.updatePeople.bind(this))
    store.on('allRows', this.updatePeople.bind(this))
  }

  renderPeople(){
    let personRender = []
    for(var i = 0; i<this.state.people.length; i++){
      personRender.push(
        <PersonListing person={this.state.people[i]}></PersonListing>
      )
    }
    return personRender
  }

  render() {
    return (
      <div>
        <Header />
        <div className= 'pull-right'>
          <Link to={`/create`}>Create Human</Link>
        </div>
        <br />
        <div className='pull-right'>
          <Link to={`/login`} >Register as User </Link>
        </div>
        <h2>Human Registry</h2>
        <div className="cat-list row">
          {this.renderPeople()}
        </div>
      </div>
    );
  }
}

export default Index
