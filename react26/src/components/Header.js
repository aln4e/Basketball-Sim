import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class Header extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Go Hoos!</h1>
        </div>
      </div>
    );
  }
}

export default Header;
