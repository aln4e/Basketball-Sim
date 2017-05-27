import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../components/Header'

class Index extends Component {
  render() {
    return (
      <div>
        <Header />
        <Link to={`/create`}>Create Cat</Link>
      </div>
    );
  }
}

export default Index
