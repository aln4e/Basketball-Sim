import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../components/Header'

class Create extends Component {
  constructor(props){
    super(props)
    this.state = {
      person: {
        name:'',
        age: 1,
        sex: ''
      }
    }
  }

//this doesn't do anything at all
//eventually, it needs to fetch all of the rows in the table using the store
  handleSubmit(e){
    e.preventDefault()
    console.log(this.state.person)
  }

  handleChange(e){
    const target = e.target;
    const person = this.state.person
    person[target.name]=target.value
    this.setState({
      person:person
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Link to={`/`} >Index </Link>
        <h2 className="App-intro">Please fill out this form!</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Name</label>
            <input type='text' name='name' value={this.state.person.name} onChange={this.handleChange.bind(this)} />
          </div>
          <div>
            <label>Age</label>
            <input type='number' name='age' value={this.state.person.age} onChange={this.handleChange.bind(this)} />
          </div>
          <div>
            <label>Sex</label>
            <select name='sex' value={this.state.person.sex} onChange={this.handleChange.bind(this)}>
              <option></option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <input type='submit' value='Submit' />
          </div>
        </form>
      </div>
    );
  }
}

export default Create
