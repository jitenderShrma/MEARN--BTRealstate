import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class DashboardItem extends Component {
  render() {
    const { inq, i } = this.props;
    return (
      <tr>
        <td>{i + 1}</td>
        <th>{inq.proparty}</th>
        <th><Link to={`/listing/${inq.proparty}/${inq.realter}`} className="btn grey lighten-4 grey-text text-darken-2 z-depth-0">View Listing</Link></th>
      </tr>
    )
  }
}
