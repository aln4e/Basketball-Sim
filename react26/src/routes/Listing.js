import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class PersonListing extends Component {
  render(){
    return(
      <div className='col-xs-3'>
        <ul>
          <li>{this.props.person.name}</li>
          <li>{this.props.person.age}</li>
          <li>{this.props.person.sex}</li>
        </ul>
      </div>
    )
  }
}

export default PersonListing
