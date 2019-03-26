import React, { Component } from 'react';
import firebase from './Firebase';
import { Button, Form } from 'react-bootstrap';

import FormError from './FormError';

class CreateContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sectionHeader: '',
      sectionSubheader: '',
      sectionContent: '',
      sectionImage: '',
      sectionType: 'Content',
      sectionName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateVisible = this.updateVisible.bind(this);
  }

  componentDidMount() {
    const { showMessage } = this.props;
    showMessage(null);
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
      .ref(
        `section`
      );

    let dynamicFormEls = document.querySelectorAll('.dynamic-form');
    let updates = {};
    var dynamicFormEls_array = [...dynamicFormEls]; // converts NodeList to Array
    dynamicFormEls_array.forEach(formEl => {
      updates[formEl.name] = formEl.value;
    });
    updates['sectionType'] = this.state.sectionType;
    updates['sectionName'] = this.state.sectionName;
    ref
    .push(updates)
    .then(()=>{
      showMessage('Your content has been created!', '/show-content');
    })
    .catch(error => {
      if(error.message !== null) {
        this.setState({errorMessage: error.message})
      } else {
        this.setState({errorMessage: null})
      }
    })  

  }

  updateVisible(e) {
    const itemValue = e.target.value;
    this.setState({sectionType:itemValue})
  }

  render() {
    let formSection;
    switch(this.state.sectionType) {
      case 'Content':
        formSection = <fieldset>
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label>Header</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Header"
                            name="sectionHeader" 
                            value={this.state.sectionHeader}
                            onChange={this.handleChange}
                            className="dynamic-form"
                          />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Content</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows="5" 
                            name="sectionContent"
                            value={this.state.sectionContent}
                            onChange={this.handleChange}
                            className="dynamic-form"
                            required
                          />
                        </Form.Group>
                      </fieldset>;
        break;
      case 'Content with Inset':
        formSection = <fieldset>
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label>Header</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Header"
                            name="sectionHeader" 
                            value={this.state.sectionHeader}
                            onChange={this.handleChange}
                            className="dynamic-form"
                          />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInputImage">
                          <Form.Label>Image</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Image"
                            name="sectionImage" 
                            value={this.state.sectionImage}
                            onChange={this.handleChange}
                            className="dynamic-form"
                          />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Content</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows="5" 
                            name="sectionContent"
                            value={this.state.sectionContent}
                            onChange={this.handleChange}
                            className="dynamic-form"
                            required
                          />
                        </Form.Group>
                      </fieldset>;
        break;
      case 'Masthead':
        formSection = <fieldset>
                        <Form.Group controlId="exampleForm.ControlInputImage">
                          <Form.Label>Masthead</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Image"
                            name="sectionImage" 
                            value={this.state.sectionImage}
                            onChange={this.handleChange}
                            className="dynamic-form"
                          />
                        </Form.Group>
                        
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label>Header</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Header"
                            name="sectionHeader" 
                            value={this.state.sectionHeader}
                            onChange={this.handleChange}
                            className="dynamic-form"
                          />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                          <Form.Label>Subheader</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Subheader"
                            name="sectionSubheader" 
                            value={this.state.sectionSubheader}
                            onChange={this.handleChange}
                            className="dynamic-form"
                          />
                        </Form.Group>
                      </fieldset>;
        break;
      default:
        break;
    }


    return (
      <div className="text-center mt-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <Form className="mt-3" onSubmit={this.handleSubmit}>
                  <div className="card">
                    <div className="card-body text-left">
                    <h3 className="font-weight-light mb-3">Create New Content</h3>
                      <Form.Group controlId="exampleForm.ControlSelect2">
                        {this.state.errorMessage !== null ? (
                        <Form.Group>
                            <FormError
                              message={this.state.errorMessage}
                            />
                          
                        </Form.Group>
                        ) : null}

                        <Form.Label>Section Type</Form.Label>
                        <Form.Control 
                          as="select"
                          name="sectionType"
                          onChange={this.updateVisible}
                        >
                          <option>Content</option>
                          <option>Content with Inset</option>
                          <option>Masthead</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlInputSecName">
                        <Form.Label>Section Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Section Name"
                          name="sectionName" 
                          value={this.state.sectionName}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="card bg-light">
                    <div className="card-body text-left">
                      {formSection}
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      
                    </div>
                  </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateContent;
