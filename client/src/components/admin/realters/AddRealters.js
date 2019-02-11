import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import classnames from 'classnames';
import TextInput from '../../common/TextInput';
import { addRealter, addErrors, realterNameValidate } from '../../../actions/realterAction';
import realterFieldValidate from '../../../validate/realter';
import Spinner from '../../common/Spinner';
class AddRealters extends Component {

  constructor() {
    super();
    this.state = {
      errors: {},
      realters: {},
      name: '',
      email: '',
      phone: '',
      description: '',
      isMVP: false,
      image: null,
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.realters.name !== undefined) {
      if (nextProps.realters.name === true) {
        this.setState({ errors: {} });
      } else {
        this.setState({ errors: nextProps.realters });
      }
    }
  }

  // componentDidUpdate() {
  //   // setTimeout(function () {
  //   //   Materialize.updateTextFields();
  //   //   const timeElem = document.querySelectorAll('.timepicker');
  //   //   Materialize.Timepicker.init(timeElem, {});
  //   // }, 2000)
  // }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'name') {
      setTimeout(() => {
        if (this.state.name.length >= 2) {
          this.props.realterNameValidate(this.state.name);
        }
      }, 0)
    }
  }

  onClick() {
    this.setState(preState => ({isMVP: !preState.isMVP}));
  }

  handleselectedFile = event => {
    this.setState({
      image: event.target.files[0],
      loaded: 0,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { isValid, errors } = realterFieldValidate(this.state);
    if (!isValid) {
      this.setState({ errors: errors });
    } else {
      const data = new FormData();
      data.append('image', this.state.image);
      data.append('name', this.state.name);
      data.append('email', this.state.email);
      data.append('phone', this.state.phone);
      data.append('isMVP', this.state.isMVP);
      data.append('description', this.state.description);

      if (Object.keys(this.state.errors).length === 0) {
        this.props.addRealter(data, this.props.history);
      }
    }

  }
  render() {
    let realterContent;
    const { errors, realters } = this.state;
    setTimeout(function () {
      // const elems = document.querySelectorAll('.datepicker');
      // Materialize.Datepicker.init(elems, {});
      // const desc = document.getElementById('description');
      // Materialize.textareaAutoResize(desc);
    }, 0);
    if (realters.loading) {
      realterContent = <Spinner />
    } else {
      realterContent = (<div>
        {/* section: edit-listing */}
        <section className="section edit-section">
          <div className="container">
            <Link to="/admin/realterList" className="btn grey lighten-4 grey-text text-darken-4 z-depth-0">BACK TO REALTERS</Link>
            <h4 className="center">Add Realter</h4>
            <div className="row">
              <div className="col s12 m8 offset-m2">
                <form onSubmit={this.onSubmit}>
                  <TextInput
                    type="text"
                    id="name"
                    name="name"
                    htmlFor="name"
                    labelText="Name"
                    value={this.state.name}
                    error={errors.name}
                    onChange={this.onChange}
                  />
                  {errors.name !== undefined ? <br></br> : null}
                  <TextInput
                    type="email"
                    id="email"
                    name="email"
                    htmlFor="email"
                    labelText="Email"
                    value={this.state.email}
                    error={errors.email}
                    onChange={this.onChange}
                  />
                  {errors.email !== undefined ? <br></br> : null}
                  <TextInput
                    type="text"
                    id="phone"
                    name="phone"
                    htmlFor="phone"
                    labelText="Phone"
                    value={this.state.phone}
                    error={errors.phone}
                    onChange={this.onChange}
                  />
                  {errors.phone !== undefined ? <br></br> : null}
                  <div className="input-field">
                    <textarea
                      name="description"
                      id="description"
                      className={classnames('materialize-textarea', { 'error': errors.description })}
                      value={this.state.description}
                      onChange={this.onChange}
                    >
                    </textarea>
                    <label htmlFor="description">Description</label>
                    {errors.description !== undefined ? <br></br> : null}
                    <span className={classnames('helper-text left', { 'label-error': errors.description })}>{errors.description}</span>
                  </div>
                  {errors.description !== undefined ? <br></br> : null}
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        className="filled-in"
                        name="seller"
                        value={this.state.seller}
                        onClick={this.onClick}
                      />
                      <span>isMVP</span>
                    </label>
                  </p>
                  <div className="file-field input-field inline">
                    <div className="btn">
                      <span>Image</span>
                      <input
                        type="file"
                        name="image"
                        onChange={this.handleselectedFile}
                      />
                    </div>
                    <div className="file-path-wrapper">
                      <input
                        type="text"
                        className={classnames('file-path', { 'error': errors.image })}
                      />
                      <span className={classnames('helper-text left', { 'label-error': errors.image })}>{errors.image}</span>
                    </div>
                  </div>
                  <div>
                    <br></br><br></br>
                    <input type="submit" className="btn teal white-text" value="SAVE AND GO BACK" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>);
    }
    return (
      <div>
        {realterContent}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  realters: state.realters
});
export default connect(mapStateToProps, { addRealter, addErrors, realterNameValidate })(withRouter(AddRealters));