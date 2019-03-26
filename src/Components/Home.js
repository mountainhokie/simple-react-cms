import React, { Component } from 'react';
import firebase from './Firebase';
import FormError from './FormError';
import FormSuccess from './FormSuccess';
import { Button, Form } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: '',
      siteTitle: '',
      socialFacebook: '',
      socialInstagram: '',
      socialTwitter: '',
      formState: '',
      errorMessage: null,
      successMessage: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.sectionsRef = firebase
      .database()
      .ref();

    this.sectionsRef.on('value', snapshot => {
      let section = snapshot.val();
      let sectionList = [];
      for (let item in section) {        
        sectionList.push({
            [item]: section[item]
        });
        this.setState({ [item]: section[item] });
      }
    });
  }

  componentWillUnmount() {
    this.sectionsRef.off();
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { showMessage } = this.props;
    const ref = firebase
      .database()
      .ref();

    ref.update({
      siteName: this.state.siteName,
      siteTitle: this.state.siteTitle,
      socialFacebook: this.state.socialFacebook,
      socialInstagram: this.state.socialInstagram,
      socialTwitter: this.state.socialTwitter
    })
    .then(() => {
      showMessage('Your changes have been saved!');
    })
    .catch(error => {
      if(error.message !== null) {
        this.setState({errorMessage: error.message})
      } else {
        this.setState({errorMessage: null})
      }
    })
  }

  render() {
    return (
      <div className="container text-center">
        <Form className="mt-3" onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card bg-light">
                  <div className="card-body text-left">
                    <h3 className="font-weight-light mb-3">Site Dashboard</h3>
                    {this.props.message !== null ? (
                      <FormSuccess
                       showMessage={this.props.showMessage}
                       message={this.props.message}
                      />
                    ): null}
                    {this.state.errorMessage !== null ? (
                    <Form.Group>
                        <FormError
                          message={this.state.errorMessage}
                        />
                      
                    </Form.Group>
                    ) : null}
                    <Form.Group controlId="exampleForm.ControlInputSiteName">
                      <Form.Label>Site Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Site Name"
                        name="siteName" 
                        value={this.state.siteName}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInputSiteTitle">
                      <Form.Label>Site Title</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Site Title"
                        name="siteTitle" 
                        value={this.state.siteTitle}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInputSocialFacebook">
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Facebook"
                        name="socialFacebook" 
                        value={this.state.socialFacebook}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInputSocialInstagram">
                      <Form.Label>Instagram</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Instagram"
                        name="socialInstagram" 
                        value={this.state.socialInstagram}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInputSocialTwitter">
                      <Form.Label>Twitter</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Twitter"
                        name="socialTwitter" 
                        value={this.state.socialTwitter}
                        onChange={this.handleChange}
                      />
                    </Form.Group>

                    <div className="form-group mb-0">
                      <Button variant="primary" type="submit">Submit</Button>         
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default Home;
