import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import {createUser} from '../actions'
// import userStore from '../stores/UserStore'


class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        // user_name:'',
        email: '',
        password: '',
        // first_name:'',
        // last_name:'',
        // city:'',
        // state:''
      },
      message:""
    }
  }

  handleSubmit(e){
    e.preventDefault()
    createUser(this.state)
  }

  handleChange(e){
    const target = e.target;
    const user = this.state.user
    user[target.name]=target.value
    this.setState({
      user:user
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className='pull-right'>
          <Link to={`/`} >Index of People </Link>
        </div>
        <br />
        <div className='pull-right'>
          <Link to={`/create`} >Create Person </Link>
        </div>
        <div className='col-md-4 col-md-offset-5'>
          <h2 className="App-intro">Please Register Yourself</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className='form-group'>
              <label>Email</label>
              <input type='text' name='email' value={this.state.user.email} onChange={this.handleChange.bind(this)} />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input type='password' name='password' value={this.state.user.password} onChange={this.handleChange.bind(this)} />
            </div>
            <div className='form-group'>
              <input type='submit' value='Submit' />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register
