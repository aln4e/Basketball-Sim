import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import store from '../stores/PersonStore'
import PersonListing from '../components/Listing'

class Index extends Component {
  constructor(props){
    super(props)

    this.state = {
      people: store.getPeople(),
      message: store.getMessage()
    }
  }

  updatePeople2(){
    this.setState({
      people: store.getPeople(),
      message: store.getMessage()
    })
  }

  componentWillMount(){
    store.on('newRow', this.updatePeople2.bind(this))
    store.on('allRows', this.updatePeople2.bind(this))
  }

  renderPeople(){
    let personRender = []
    for(var i = 0; i<this.state.people.length; i++){
      let personId= 'person-' + i
      personRender.push(
        <PersonListing key={personId} person={this.state.people[i]}></PersonListing>
      )
    }
    return personRender
  }

  render() {
    return (
      <div>
        <Header />
        <div className= 'pull-right'>
          <Link to={`/create`}>Create</Link>
        </div>
        <br />
        <div className='pull-right'>
          <Link to={`/login`} >Login </Link>
        </div>
        <br />
        <div className='pull-right'>
          <Link to={`/register`} >Register </Link>
        </div>
        <h2>Person Registry</h2>
        <div className="cat-list row">
          {this.renderPeople()}
        </div>
      </div>
    );
  }
}

export default Index
