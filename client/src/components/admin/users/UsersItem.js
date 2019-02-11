import React, { Component } from 'react'

export default class UsersItem extends Component {
  render() {
    const { user, i } = this.props;
    return (
      <tr>
        <td>{i}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    )
  }
}
