import React, { Component } from 'react';
import './App.css';
import YahtzeeGame from './YahtzeeGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <YahtzeeGame />
      </div>
    );
  }
}

export default App;
