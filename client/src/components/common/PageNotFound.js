import React, { Component } from 'react'
import {Link } from 'react-router-dom';
export default class PageNotFound extends Component {
  render() {
    const styles = {
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      width:'100%',
      background: 'white'
    }
    return (
      <div style={styles}>
        <div className="container">
          <h2 className="center">Page Not Found</h2>
          <p className="text-flow center">Back to <Link to="/"> Home </Link> Page </p>
        </div>
      </div>
    )
  }
}
