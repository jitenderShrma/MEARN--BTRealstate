import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Home extends Component {
  render() {
    return (
      <div>
        <p className="flow-text">Site Admistration</p>
        <div className="row">
          <div className="col s12 l4 m6">
            <ul className="collection with-header">
              <li className="collection-header teal lighten-2 white-text">Authentication & Authorization</li>
              <li className="collection-item">
                Groups
                <span className="right">
                  <a href="#!"><i className="fas fa-plus"></i> Add </a> &nbsp;
                  <a href="#!"><i className="fas fa-pencil-alt"></i> Change</a>
                </span>
              </li>
              <li className="collection-item">
                <Link to="/admin/usersList">Users</Link>
                <span className="right">
                  <a href="#!"><i className="fas fa-plus"></i> Add </a> &nbsp;
                  <a href="#!"><i className="fas fa-pencil-alt"></i> Change</a>
                </span>
              </li>
            </ul>
            {/* contact */}
            <ul className="collection with-header">
              <li className="collection-header teal lighten-2 white-text">Contacts</li>
              <li className="collection-item">
                <Link to="/admin/contactList">Contacts</Link>
                <span className="right">
                  <a href="#!"><i className="fas fa-plus"></i> Add </a> &nbsp;
                  <a href="#!"><i className="fas fa-pencil-alt"></i> Change</a>
                </span>
              </li>
            </ul>
            {/* listing */}
            <ul className="collection with-header">
              <li className="collection-header teal lighten-2 white-text">Listing</li>
              <li className="collection-item">
              <Link to="/admin/realterList">Realters</Link>
                <span className="right">
                  <a href="#!"><i className="fas fa-plus"></i> Add </a> &nbsp;
                  <a href="#!"><i className="fas fa-pencil-alt"></i> Change</a>
                </span>
              </li>
            </ul>
            {/* realter */}
            <ul className="collection with-header">
              <li className="collection-header teal lighten-2 white-text">Realters</li>
              <li className="collection-item">
              <Link to="/admin/listingList">Listing</Link>
                <span className="right">
                  <a href="#!"><i className="fas fa-plus"></i> Add </a> &nbsp;
                  <a href="#!"><i className="fas fa-pencil-alt"></i> Change</a>
                </span>
              </li>
            </ul>
          </div>
          <div className="col s12 m6 l4">
            <ul className="collection with-header grey lighten-4">
              <li className="collection-header grey lighten-4">
                <p style={{ margin: '0' }} className="flow-text">Recent action</p>
              </li>
              <li className="collection-item grey lighten-4">
                <i className="fas fa-pencil-alt teal-text"></i>
               33 esses circle<span className="badge grey lighten-3 right">listing</span>
              </li>
              <li className="collection-item grey lighten-4">
                <i className="fas fa-pencil-alt teal-text"></i>33 esses circle
                <span className="badge grey lighten-3">listing</span>
              </li>
              <li className="collection-item grey lighten-4">
                <i className="fas fa-pencil-alt teal-text"></i> 33 esses circle
                <span className="badge grey lighten-3">listing</span>
              </li>
              <li className="collection-item grey lighten-4">
                <i className="fas fa-pencil-alt teal-text"></i> 33 esses circle
                <span className="badge grey lighten-3">listing</span>
              </li>
              <li className="collection-item grey lighten-4">
                <i className="fas fa-pencil-alt teal-text"></i> 33 esses circle
                <span className="badge grey lighten-3">listing</span>
              </li>
              <li className="collection-item grey lighten-4">
                <i className="fas fa-pencil-alt teal-text"></i> 33 esses circle
                <span className="badge grey lighten-3">listing</span>
              </li>
              <li className="collection-item grey lighten-4">
                <i className="fas fa-pencil-alt teal-text"></i> 33 esses circle
                <span className="badge grey lighten-3">listing</span>
              </li>
              <li className="collection-item grey lighten-4">
                <i className="fas fa-pencil-alt teal-text"></i> 33 esses circle
                <span className="badge grey lighten-3">listing</span>
              </li>
              <li className="collection-item grey lighten-4">
              <i className="fas fa-plus teal-text"></i> 33 esses circle
                <span className="badge grey lighten-3">listing</span>
              </li>
              <li className="collection-item grey lighten-4">
                <i className="fas fa-pencil-alt teal-text"></i> 33 esses circle
                <span className="badge grey lighten-3">listing</span>
              </li>
              <li className="collection-item grey lighten-4">
                <i className="fas fa-plus teal-text"></i> 33 esses circle
                <span className="badge grey lighten-3">listing</span>
              </li>
            </ul>
            
          </div>
        </div>
      </div>
    )
  }
}
