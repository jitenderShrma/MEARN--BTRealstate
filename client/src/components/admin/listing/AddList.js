import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import classnames from 'classnames';
import Materialize from 'materialize-css';
import TextInput from '../../common/TextInput';
import { getRealters } from '../../../actions/realterAction';
import { addListing, listingLoading, titleValidate } from '../../../actions/listingAction';
import validatePropsInput from '../../../validate/propFields';
import Spinner from '../../common/Spinner';
class AddList extends Component {

  constructor() {
    super();
    this.state = {
      errors: {},
      realters: [],
      realter: '',
      title: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      description: '',
      price: '',
      badrooms: '',
      isPublish: false,
      bathrooms: '',
      garage: '',
      lot_size: '',
      image0: null,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      validate: '',
      listing: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.realters) {
      this.setState({ realters: nextProps.realters });
    }
    if (nextProps.listing.title !== undefined) {
      if (nextProps.listing.title === true) {
        this.setState({ errors: {} });
      } else {
        this.setState({ errors: nextProps.listing });
      }
    }
    if (nextProps.listing.loading) {
      this.setState({ listing: nextProps.listing });
    }
  }

  componentDidUpdate() {
    setTimeout(function () {
      Materialize.updateTextFields();
      const timeElem = document.querySelectorAll('.timepicker');
      Materialize.Timepicker.init(timeElem, {});
    }, 2000)
  }

  componentWillMount() {
    this.props.getRealters();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'title') {
      setTimeout(() => {
        if (this.state.title.length >= 2) {
          this.props.titleValidate(this.state.title);
        }
      }, 0)
    }
  }
  onClick() {
    this.setState({ isPublish: !this.state.isPublish });
  }

  handleselectedFile = event => {
    this.setState({ [event.target.name]: event.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();

    const { isValid, errors } = validatePropsInput(this.state);
    if (!isValid) {
      this.setState({ errors: errors });
    } else {

      const data = new FormData();
      data.append('image0', this.state.image0);
      data.append('image1', this.state.image1);
      data.append('image2', this.state.image2);
      data.append('image3', this.state.image3);
      data.append('image4', this.state.image4);

      data.append('realter', this.state.realter);
      data.append('title', this.state.title);
      data.append('description', this.state.description);
      data.append('street', this.state.street);
      data.append('city', this.state.city);
      data.append('state', this.state.state);
      data.append('zipcode', this.state.zipcode);
      data.append('price', this.state.price);
      data.append('isPublish', this.state.isPublish);
      data.append('badrooms', this.state.badrooms);
      data.append('bathrooms', this.state.bathrooms);
      data.append('garage', this.state.garage);
      data.append('lot_size', this.state.lot_size);
      if (Object.keys(this.state.errors).length === 0) {
        this.props.addListing(data, this.props.history);
      }
    }
  }
  render() {
    const { errors, realters, listing } = this.state;
    let listContent;
    if (realters.loading || realters.length === 0 || listing.loading) {
      listContent = <Spinner />
    } else {
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        Materialize.FormSelect.init(elems, {});
      }, 0)
      listContent = (<div>
        <section class="section edit-section">
          <div class="container">
            <Link to="/admin/listingList" className="btn grey lighten-4 grey-text text-darken-4 z-depth-0">BACK TO LISTS</Link>
            <h4 class="center">Add Listing</h4>
            <form onSubmit={this.onSubmit.bind(this)} encType="multipart/form-data">
              <div className="row">
                <div className="col s12 m6">
                  <div class="input-field">
                    <select
                      name="realter"
                      value={this.state.realter}
                      onChange={this.onChange}
                      id="realter"
                      className={classnames('', { 'error': errors.realter })}
                    >
                      <option value="" disabled selected >Select Realter</option>
                      {
                        realters.realters.map(real => <option vlaue={real.name}>{real.name}</option>)
                      }
                    </select>
                    <label for="realter">Select a Realter</label>
                    <span className={classnames('helper-text left', { 'label-error': errors.realter })}>{errors.realter}</span>
                  </div>
                  <br></br>
                  <TextInput
                    type="text"
                    name="title"
                    id="title titleName"
                    labelText="Title"
                    onChange={this.onChange}
                    error={errors.title}
                  />
                  {errors.title !== undefined ? <br></br> : null}
                  <TextInput
                    type="text"
                    name="street"
                    id="street"
                    labelText="Street"
                    value={this.state.street}
                    onChange={this.onChange}
                    error={errors.street}
                  />
                  {errors.street !== undefined ? <br></br> : null}
                  <TextInput
                    type="text"
                    name="city"
                    id="city"
                    labelText="City"
                    value={this.state.city}
                    onChange={this.onChange}
                    error={errors.city}
                  />
                  {errors.city !== undefined ? <br></br> : null}
                  <TextInput
                    type="text"
                    name="state"
                    id="state"
                    labelText="State"
                    value={this.state.state}
                    onChange={this.onChange}
                    error={errors.state}
                  />
                  {errors.state !== undefined ? <br></br> : null}
                  <TextInput
                    type="number"
                    name="zipcode"
                    id="zipcode"
                    labelText="Zipcode"
                    value={this.state.zipcode}
                    onChange={this.onChange}
                    error={errors.zipcode}
                  />
                  {errors.zipcode !== undefined ? <br></br> : null}
                  <div class="input-field">
                    <textarea
                      name="description"
                      id="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      className={classnames('materialize-textarea', { 'error': errors.description })}
                    ></textarea>
                    <label htmlFor="description">Description</label>
                    <span className={classnames('helper-text left', { 'label-error': errors.description })}>{errors.description}</span>
                  </div>
                  {errors.description !== undefined ? <br></br> : null}
                  <div class="input-field inline">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={this.state.price}
                      onChange={this.onChange}
                      error={errors.price}
                    />
                    <label htmlFor="price">Price</label>
                    <span className={classnames('helper-text left', { 'label-error': errors.price })}>{errors.price}</span>
                  </div>
                  <div class="input-field inline">
                    <input
                      type="number"
                      id="badrooms"
                      name="badrooms"
                      value={this.state.badrooms}
                      onChange={this.onChange}
                      error={errors.badrooms}
                    />
                    <label htmlFor="badrooms">Badrooms</label>
                    <span className={classnames('helper-text left', { 'label-error': errors.badrooms })}>{errors.badrooms}</span>
                  </div>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        class="filled-in"
                        name="isPublish"
                        value={this.state.isPublish}
                        onChange={this.onClick}
                      />
                      <span>isPublish</span>
                    </label>
                  </p>
                </div>
                <div className="col s12 m6">
                  <div class="input-field inline">
                    <input
                      type="number"
                      id="bathrooms"
                      name="bathrooms"
                      value={this.state.bathrooms}
                      onChange={this.onChange}
                      className={classnames('', { 'error': errors.bathrooms })}
                    />
                    <label htmlFor="bathrooms">Bathrooms</label>
                    <span className={classnames('helper-text left', { 'label-error': errors.bathrooms })}>{errors.bathrooms}</span>
                  </div>

                  <div class="input-field inline">
                    <input
                      type="number"
                      id="garage"
                      name="garage"
                      value={this.state.garage}
                      onChange={this.onChange}
                      className={classnames('', { 'error': errors.garage })}
                    />
                    <label htmlFor="garage">Garage</label>
                    <span className={classnames('helper-text left', { 'label-error': errors.garage })}>{errors.garage}</span>
                  </div>

                  <div class="input-field inline">
                    <input
                      type="number"
                      id="lot-size"
                      name="lot_size"
                      value={this.state.lot_size}
                      onChange={this.onChange}
                      className={classnames('', { 'error': errors.lot_size })}
                    />
                    <label htmlFor="lot-size">Lot Size</label>
                    <span className={classnames('helper-text left', { 'label-error': errors.lot_size })}>{errors.lot_size}</span>
                  </div>

                  <div class="file-field input-field">
                    <div class="btn btn-small grey lighten-4 grey-text text-darken-3 z-depth-0">
                      <span>main image</span>
                      <input
                        type="file"
                        name="image0"
                        onChange={this.handleselectedFile}
                      />
                    </div>
                    <div class="file-path-wrapper">
                      <input
                        className={classnames('file-path', { 'error': errors.image0 })}
                        type="text"
                        placeholder="chose image" />
                      <span className={classnames('helper-text left', { 'label-error': errors.image0 })}>{errors.image0}</span>
                    </div>
                  </div>
                  <div class="file-field input-field">
                    <div class="btn btn-small grey lighten-4 grey-text text-darken-3 z-depth-0">
                      <span>image1</span>
                      <input
                        type="file"
                        name="image1"
                        onChange={this.handleselectedFile}
                      />
                    </div>
                    <div class="file-path-wrapper">
                      <input
                        className={classnames('file-path', { 'error': errors.image1 })}
                        type="text"
                        placeholder="chose image" />
                      <span className={classnames('helper-text left', { 'label-error': errors.image1 })}>{errors.image1}</span>
                    </div>
                  </div>
                  <div class="file-field input-field">
                    <div class="btn btn-small grey lighten-4 grey-text text-darken-3 z-depth-0">
                      <span>image2</span>
                      <input
                        type="file"
                        name="image2"
                        onChange={this.handleselectedFile}
                      />
                    </div>
                    <div class="file-path-wrapper">
                      <input
                        className={classnames('file-path', { 'error': errors.image2 })}
                        type="text"
                        placeholder="chose image" />
                      <span className={classnames('helper-text left', { 'label-error': errors.image2 })}>{errors.image2}</span>
                    </div>
                  </div>
                  <div class="file-field input-field">
                    <div class="btn btn-small grey lighten-4 grey-text text-darken-3 z-depth-0">
                      <span>image3</span>
                      <input
                        type="file"
                        name="image3"
                        onChange={this.handleselectedFile}
                      />
                    </div>
                    <div class="file-path-wrapper">
                      <input
                        className={classnames('file-path', { 'error': errors.image3 })}
                        type="text"
                        placeholder="chose image"
                      />
                      <span className={classnames('helper-text left', { 'label-error': errors.image3 })}>{errors.image3}</span>
                    </div>
                  </div>
                  <div class="file-field input-field">
                    <div class="btn btn-small grey lighten-4 grey-text text-darken-3 z-depth-0">
                      <span>image4</span>
                      <input
                        type="file"
                        name="image4"
                        onChange={this.handleselectedFile}
                      />
                    </div>
                    <div class="file-path-wrapper">
                      <input
                        className={classnames('file-path', { 'error': errors.image4 })}
                        type="text"
                        placeholder="chose image"
                      />
                      <span className={classnames('helper-text left', { 'label-error': errors.image4 })}>{errors.image4}</span>
                    </div>
                  </div>
                  <br></br>
                </div>
              </div>
              <div className="center">
                <input type="submit" class="btn white-text center" value="SAVE AND GO BACK" />
              </div>
            </form>
          </div>
        </section>
      </div>)
    }
    return (<div>
      {listContent}
    </div>)
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  realters: state.realters,
  listing: state.listing
});
export default connect(mapStateToProps, { getRealters, addListing, titleValidate, listingLoading })(withRouter(AddList));
