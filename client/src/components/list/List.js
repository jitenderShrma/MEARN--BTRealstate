import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import TextInput from '../common/TextInput'
import Image from 'react-graceful-image';
import { getList } from '../../actions/listingAction';
import { getRealter } from '../../actions/realterAction';
import { getInquiry } from '../../actions/inquiryAction';
import { removeErrors } from '../../actions/authAction'
import $ from 'jquery';
import Materialize from 'materialize-css';
class List extends Component {
  constructor() {
    super();
    this.state = {
      listing: {},
      realter: {},
      proparty: '',
      name: '',
      email: '',
      phone: '',
      message: '',
      auth: {},
      errors: {},
      inquiry: {},
      response: 'Make An Inquiry'
    }
    this.onChange = this.onChange.bind(this);
  }
  componentDidUpdate() {
    $(function () {
      Materialize.updateTextFields();
    });
    const elem = document.querySelectorAll('.materialboxed');
    Materialize.Materialbox.init(elem, {});
  }
  componentWillMount() {
    this.props.getList(this.props.match.params.title);
    this.props.getRealter(this.props.match.params.realter);
    this.setState({ proparty: this.props.match.params.title });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.listing) {
      this.setState({ listing: nextProps.listing });
    }

    if (nextProps.realter) {
      this.setState({ realter: nextProps.realter });
    }

    if (nextProps.auth) {
      this.setState({ auth: nextProps.auth });
      if (Object.keys(nextProps.auth.user).length > 0) {
        this.setState({ name: nextProps.auth.user.name, email: nextProps.auth.user.email });
      }

      //Init Materialboxed
      setTimeout(function () {
        const modalElem = document.querySelectorAll('.modal');
        Materialize.Modal.init(modalElem,
          {
            dismissible: true,
            onCloseEnd: function () {
              document.body.style.removeProperty('overflow');
            }
          }
        );
      }, 1000)
    }

    if (nextProps.inquiry) {
      this.setState({ inquiry: nextProps.inquiry })
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      const errors = nextProps.errors;
      if (errors.name !== undefined || errors.email !== undefined) {
        Materialize.toast({ html: 'Validate Error', displayLength: 3000 });
      }
    }
  }
  onChange = function (e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = function (e) {

    const newQuiry = {
      proparty: this.state.proparty,
      realter: this.state.listing.list.realter,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      message: this.state.message,
    }
    this.props.getInquiry(newQuiry);
    this.setState({ name: '', email: '', phone: '', message: '' });
    // prevetDefault
    e.preventDefault();
  }
  render() {

    const { list, loading } = this.state.listing;
    const { realter, loading: realterLoading } = this.state.realter;
    const { errors, inquiry } = this.state;
    let listContent;
    if (loading === true || list === undefined || realterLoading === true || realter === undefined) {
      listContent = <Spinner />
    } else {
      if (errors.name !== undefined || errors.email !== undefined) {
        setTimeout(function () {
          const elem = document.getElementById('modal1');
          const instance = Materialize.Modal.getInstance(elem);
          instance.open();
        }, 1000);
      }

      if (inquiry.success) {
        Materialize.toast({ html: 'Query Send', displayLength: 3000 });
        inquiry.success = false;
        document.body.style.removeProperty('overflow');
      }
      if (errors.inquiry !== undefined) {
        Materialize.toast({ html: 'You have already inquery for this proparty', displayLength: 2000 });
        this.props.removeErrors();
        document.body.style.removeProperty('overflow');
      }
      let picture64Bit = realter.image.data.data;
      let thumb = new Buffer(picture64Bit).toString('base64');
      listContent = (<div>
        <div className="showcase-of-list">
          <div className="showcase-of-list-overlay"></div>
          <div className="showcase-list-content">
            <h3>{list.title}</h3>
            <span><i className="fas fa-map-marker"></i> {list.address.city} {list.address.state}       {list.address.zipcode}</span>
          </div>
        </div>
        <br></br>
      
        {/* breadcrumb */}
        <div className="container">
          <nav className="grey lighten-2 z-depth-0">
            <div className="container">
              <div className="nav-wrapper">
                <Link to="/" className="breadcrumb  grey-text text-darken-1"><i className="material-icons">home</i> Home</Link>
                <Link to="/listing" className="breadcrumb grey-text text-darken-3">Listing</Link>
                <a href="#!" className="breadcrumb grey-text text-darken-3">{list.title}</a>
              </div>
            </div>
          </nav>
          {/* link to listing */}
          <br></br>
          <Link to="/listing" className="btn grey lighten-4 grey-text text-darken-4 z-depth-0 waves-effect">Back To Listing</Link>
          <br></br>
          {/* image and realter */}
          <div className="row">
            <br></br>
            <div className="col s12 m9">
              <Image
                src={`/props/listing/${list.image0}`}
                width="100%"
                height="auto"
                alt="pic..."
              />
            </div>
            <div className="col s10 offset-s1 m3">
              <div className="card z-depth-0 grey lighten-4">
                <div className="card-image">
                  <img
                    src={`data:${realter.image.contentType};base64,${thumb}`}
                    style={{
                      width: '70%',
                      height: 'auto',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                    alt='Realter pic.'
                  />
                </div>
                <div className="card-content center">
                  <span>Proparty Realter</span><br></br>
                  <span className="teal-text">{realter.name}</span>
                  <br></br><br></br>

                  {/* Modal */}
                  <a href="#modal1" className="modal-trigger btn teal waves-effect">Make An Inquiry</a>
                  <div id="modal1" className="modal">
                    <div className="modal-content">
                      <h5>{this.state.response} <i className="material-icons right modal-close waves-effect">close</i></h5>
                      {/* Inquiry Response */}
                      <form id="query-form">
                        <div className="input-field">
                          <input
                            type="text"
                            name="proparty"
                            id="proparty"
                            value={this.state.proparty}
                            onChange={this.onChange}
                            disabled
                          />
                          <label htmlFor="proparty">Proparty</label>
                        </div>
                        <TextInput
                          type="text"
                          name="name"
                          id="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          htmlFor="name"
                          labelText="Name"
                          error={errors.name}
                        />
                        <TextInput
                          type="email"
                          name="email"
                          id="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          htmlFor="email"
                          labelText="Email"
                          error={errors.email}
                        />
                        <TextInput
                          type="number"
                          name="phone"
                          id="phone"
                          value={this.state.phone}
                          onChange={this.onChange}
                          labelText='Phone'
                        />
                        <div className="input-field">
                          <textarea
                            name="message"
                            id="message"
                            value={this.state.message}
                            onChange={this.onChange}
                            className="materialize-textarea"
                          ></textarea>
                          <label htmlFor="message">Message</label>
                        </div>
                        <button type="button" className="btn teal waves-effect btn-block waves-light" onClick={this.onSubmit.bind(this)}>SEND</button>              </form>
                    </div>
                  </div>
                </div>
              </div>
            </div><br></br>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col s4 m2" style={{ marginBottom: '10px' }}>
              <Image
                src={`/props/listing/${list.image0}`}
                width="100%"
                height="100"
                alt="pic..."
                className="materialboxed"
              />
            </div>
            <div className="col s4 m2" style={{ marginBottom: '10px' }}>
              <Image
                src={`/props/listing/${list.image1}`}
                width="100%"
                height="100"
                alt="pic..."
                className="materialboxed"
              />
            </div>
            <div className="col s4 m2" style={{ marginBottom: '10px' }}>
              <Image
                src={`/props/listing/${list.image2}`}
                width="100%"
                height="100"
                alt="pic..."
                className="materialboxed"
              />
            </div>
            <div className="col s4 m2" style={{ marginBottom: '10px' }}>
              <Image
                src={`/props/listing/${list.image3}`}
                width="100%"
                height="100"
                alt="pic..."
                className="materialboxed"
              />
            </div>
            <div className="col s4 m2">
              <Image
                src={`/props/listing/${list.image4}`}
                width="100%"
                height="100"
                alt="pic..."
                className="materialboxed"
              />
            </div>
          </div>
        </div>
        {/* Modal */}
        <div class="modal" id="query">
          <h3>Modal</h3>
        </div>
      </div >);
    }
    return (
      <div>
        {listContent}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  listing: state.listing,
  realter: state.realters,
  inquiry: state.inquiry
});
export default connect(mapStateToProps, { getList, getRealter, getInquiry, removeErrors })(List);