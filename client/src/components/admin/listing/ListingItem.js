import React, { Component } from 'react'
import Moment from 'react-moment';
export default class ListingItem extends Component {
  constructor() {
    super();
    this.state = {
      isPublish: null
    }
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    this.setState({ isPublish: this.props.list.isPublish });
  }
  onClick(list, e) {
    if (e.target.name === 'checkbox') {
      this.setState(preState => ({
        isPublish: !preState.isPublish
      }));
      setTimeout(() => {
        this.props.onClickHandle(list, this.state.isPublish)
      },1000)
    }
  }
  render() {
    const { list, i } = this.props;
    return (
      <tr>
        <td>{i}</td>
        <td>{list.title}</td>
        <td value={list._id}>
          <p>
            <label className="center">
              <input type="checkbox"
                name="checkbox"
                id="isPublish"
                className="filled-in check"
                checked={this.state.isPublish ? 'checked' : null}
                onClick={this.onClick.bind(this, this.props.list)}
              />
              <span></span>
            </label>
          </p>
        </td>
        <td>{list.price}</td>
        <td><Moment format="DD/MM/YYYY">{list.date}</Moment></td>
        <td>{list.realter}</td>
      </tr>
    )
  }
}
