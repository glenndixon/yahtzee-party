import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dice from './Dice';

class App extends Component {
  constructor() {
    super();

    this.state = {
      dice: 3
    };
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div onClick={this.diceClick.bind(this)}>
          <Dice value={this.state.dice} />
        </div>
      </div>
    );
  }

  diceClick(e) {
    this.setState({
      dice: Math.floor(Math.random() * 6) + 1
    });
  }
}

export default App;
