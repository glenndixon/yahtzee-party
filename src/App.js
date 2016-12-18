import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dice from './Dice';
import YahtzeeGame from './YahtzeeGame';

class App extends Component {
  constructor() {
    super();

    this.state = {
      dice: Math.floor(Math.random() * 6) + 1
    };
  }


  render() {
    return (
      <div className="App">
        {/*
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.rollClick.bind(this)}>Roll</button>

        <div>
          <Dice value={this.state.dice} lastRolled={this.state.lastRolled} animate={!!this.state.lastRolled} />
        </div>
        */}
        <YahtzeeGame />
      </div>
    );
  }

  rollClick(e) {

    this.setState({
      dice: Math.floor(Math.random() * 6) + 1,
      lastRolled: new Date().getTime(),
    });
  }
}

export default App;
