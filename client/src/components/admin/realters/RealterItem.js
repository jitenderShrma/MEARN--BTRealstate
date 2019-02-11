import React, { Component } from 'react'
import Moment from 'react-moment';

export default class UsersItem extends Component {
  render() {
    const { realter, i, onDelete } = this.props;
    const string = new Buffer (realter.image.data.data).toString('base64');
    return (
      <tr>
        <td>{i}</td>
        <td>
          <img src={`data: ${realter.image.contentType};base64, ${string}`}
            className="circle"
            style={{ height: '50px', width: '50px' }}
            alt="realter"
          />
        </td>
        <td>{realter.name}</td>
        <td>
          <Moment format="DD/MM/YYYY">{realter.date}</Moment>
        </td>
        <td>
          <a href="#!" onClick={onDelete.bind(this, realter._id)} ><i className="material-icons red-text">close</i></a>
        </td>
      </tr>
    )
  }
}
