import React, { Component } from 'react'
const spinner = require('./spinner.gif');
export default class Spinner extends Component {
  render() {
    const style = {
      display: 'block',
      width: '200px',
      margin: 'auto'
    }
    return (
      <div style={{marginBottom:'50vh'}}>
        <img src={spinner} alt="Please Wait" style={style} />
      </div>
    )
  }
}
