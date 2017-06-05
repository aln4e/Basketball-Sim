import React, { Component } from 'react';
import Header from '../components/Header';
import {createPerson, loginOrRedirect} from '../actions';
import store from '../stores/PersonStore'
import ImagesUploader from 'react-images-uploader'
import 'react-images-uploader/styles.css';

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

  redirect(){
    this.props.history.push('/')
  }

  componentWillMount(){
    store.on('newRow', this.redirect.bind(this))
    return loginOrRedirect(this.props)
  }

  handleSubmit(e){
    e.preventDefault()
    createPerson(this.state)
  }

  handleChange(e){
    const target = e.target;
    const person = this.state.person
    person[target.name]=target.value
    this.setState({
      person:person
    })
  }

  handleImage(err, response){
    if(err){

    }else{
      let event = {
        target:{
          name:'imageUrl',
          value:response
        }
      }
      this.handleChange(event)
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <div className='1'>
            <div className='col-xs-6 col-xs-offset-3'>
              <div className='panel panel-default'>
                <div className='1'>
                  <h2>Please fill out this form!</h2>

                  <ImagesUploader
                    url="http://localhost:3001/files"
                    optimisticPreviews
                    multiple={false}
                    onLoadEnd={this.handleImage.bind(this)}
                    label="Upload a picture"
                    />

                    <form onSubmit={this.handleSubmit.bind(this)}>

                    <div className='row'>
                      <div className='col-xs-12'>
                        <div className='form-group'>
                          <label>Name</label>
                          <input type='text' name='name' value={this.state.person.name} onChange={this.handleChange.bind(this)} />
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-xs-12'>
                        <div className='form-group'>
                          <label>Age</label>
                          <input type='number' name='age' value={this.state.person.age} onChange={this.handleChange.bind(this)} />
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-xs-12'>
                        <div className='form-group'>
                          <label>Sex</label>
                          <select name='sex' value={this.state.person.sex} onChange={this.handleChange.bind(this)}>
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-xs-12'>
                        <div className='form-group'>
                          <input type='submit' value='Submit' />
                        </div>
                      </div>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Create
