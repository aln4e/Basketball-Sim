import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import {updatePeople} from '../actions'


class Create extends Component {
  constructor(props){
    super(props)
    this.state = {
      person: {
        name:'',
        age: 1,
        sex: ''
      },
      message:""
    }
  }

//REVIEW!!!
  handleSubmit(e){
    var self = this
    e.preventDefault()
    const params = {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    }
    fetch("http://localhost:3001/add", params).then(function(response){
      if(response.status === 200){
        response.json().then(function(body){
          self.setState({
            person:body.person,
            message:'added person to registry'
          })
          updatePeople()
        })
      } else {
        self.setState({
          message:'error'
        })
      }
    }).catch(function(error){
      console.log(error)
      self.setState({
        message:"there was an error"
      })
    })
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
        <div className='pull-right'>
          <Link to={`/`} >Index </Link>
        </div>
        <h2 className="App-intro">Please fill out this form!</h2>
        <h4>{this.state.message}</h4>
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
