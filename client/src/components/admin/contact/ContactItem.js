import React, { Component } from 'react'
import Moment from 'react-moment';

export default class UsersItem extends Component {
  render() {
    const { inqu, i, onDelete } = this.props;
    return (
      <tr>
        <td>{i}</td>
        <td>{inqu.name}</td>
        <td>{inqu.proparty}</td>
        <td>{inqu.email}</td>
        <td><Moment format="DD/MM/YYYY">{inqu.date}</Moment></td>
        <td>
          <a href="#!"  onClick={onDelete.bind(this, inqu._id)} ><i className="material-icons red-text">close</i></a>
        </td>
      </tr>
    )
  }
}
