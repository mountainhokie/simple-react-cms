import React, { Component } from 'react';
import firebase from './Firebase';
import { FaSave, FaTrash } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { navigate } from '@reach/router';

import FormError from './FormError';

class EditContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectionHeader: '',
      sectionSubheader: '',
      sectionContent: '',
      sections: [],
      formState: '',
      errorMessage: null,
      successMessage: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   componentDidMount() {
    const { showMessage } = this.props;
    showMessage(null);

    this.sectionsRef = firebase
      .database()
      .ref(`section/${this.props.sectionID}`);

    this.sectionsRef.on('value', snapshot => {
      let section = snapshot.val();
      let sectionList = [];
      for (let item in section) {
        if( ([item]!=='sectionType') && ([item]!=='sectionName') )
        sectionList.push({
            [item]: section[item]
        });
        this.setState({ [item]: section[item] });
      }
      this.setState({
        sections: sectionList,
        howManysections: sectionList.length
      });
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
      .ref(`section/${this.props.sectionID}`);

    let dynamicFormEls = document.querySelectorAll('.dynamic-form');
    let updates = {};
    var dynamicFormEls_array = [...dynamicFormEls]; // converts NodeList to Array
    dynamicFormEls_array.forEach(formEl => {
      updates[formEl.name] = formEl.value;
    });
    ref
    .update(updates)
    .then(()=>{
      showMessage('Your changes have been saved!', '/show-content');
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
    const sections = this.state.sections;
    const { showMessage } = this.props;
    const mySections = sections.map(item => { 
    const keyNames = Object.keys(item);
    let controlType = '';
    let controlLabel = '';
    let formControl = '';

    switch(keyNames[0]) {
      case 'sectionHeader':
        controlType = 'exampleForm.ControlInput1';
        controlLabel = 'Header';
        formControl =           <Form.Control 
          type="text" 
          placeholder="Header"
          name="sectionHeader" 
          value={this.state.sectionHeader}
          onChange={this.handleChange}
          className="dynamic-form"
        />;
        break;
      case 'sectionSubheader':
        controlType = 'exampleForm.ControlInput2';
        controlLabel = 'Subheader';
        formControl =           <Form.Control 
          type="text" 
          placeholder="Subheader"
          name="sectionSubheader" 
          value={this.state.sectionSubheader}
          onChange={this.handleChange}
          className="dynamic-form"
        />;
        break;
      case 'sectionContent':
        controlType = 'exampleForm.ControlTextarea1';
        controlLabel = 'Content'
        formControl =           <Form.Control 
          as="textarea" 
          rows="5" 
          name="sectionContent"
          value={this.state.sectionContent}
          onChange={this.handleChange}
          className="dynamic-form"
        />
        break;
      case 'sectionImage':
        controlType = 'exampleForm.ControlInputImage1';
        controlLabel = 'Image';
        formControl =           <Form.Control 
          type="text" 
          placeholder="Image"
          name="sectionImage" 
          value={this.state.sectionImage}
          onChange={this.handleChange}
          className="dynamic-form"
        />        
        break;
      default:
        break;
    }
      return(
          <Form.Group controlId={controlType}  key={item[Object.keys(item)[0]]}>
            <Form.Label>{controlLabel}</Form.Label>
            {formControl}
          </Form.Group>

      );


    });
    return (
      <div>
        <div className="container text-left">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Edit Content</h3>
                  <Form className="mt-3" onSubmit={this.handleSubmit}>
                    {this.state.errorMessage !== null ? (
                    <Form.Group>
                        <FormError
                          message={this.state.errorMessage}
                        />
                      
                    </Form.Group>
                    ) : null}
                    {mySections}

                    <Button variant="primary" type="submit">
                      <FaSave /> Save
                    </Button>
                    <Button
                      variant="danger"
                      className=""
                      title="Cancel"
                      onClick={(e) =>{
                        showMessage(null);
                        navigate('/show-content')}}
                    >
                      <FaTrash /> Cancel
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditContent;
