import React, { Component } from 'react';
import './Box.css';

class Box extends Component {
  render() {
    return (
      <div className="Box">
        <div className="Box__label">{this.props.label}</div>
        <div className="Box__value">45</div>
        <div className="Box__secondary">
          {this.props.children ? this.props.children : null}
        </div>
      </div>
    );
  }
}

export default Box;
