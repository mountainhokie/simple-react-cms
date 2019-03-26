import React, { Component } from 'react';
import firebase from './Firebase';
import { GoTrashcan } from 'react-icons/go';
import { FaEdit } from 'react-icons/fa';
import { navigate } from '@reach/router';

import FormSuccess from './FormSuccess';

class ShowContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sections: [],
    };

    this.deleteSection = this.deleteSection.bind(this);
  }

   componentDidMount() {
    this.sectionsRef = firebase
      .database()
      .ref('section');

    this.sectionsRef.on('value', snapshot => {
      let sections = snapshot.val();
      let sectionsList = [];

      for (let item in sections) {
        sectionsList.push({
          sectionID: item,
          sectionName: sections[item].sectionName,
          sectionHeader: sections[item].sectionHeader,
          sectionContent: sections[item].sectionContent
        });
      }
      this.setState({
        sections: sectionsList,
        howManysections: sectionsList.length
      });
    });
  }

  componentWillUnmount() {
    this.sectionsRef.off();
  }

  deleteSection = (e, whichSection) => {
    e.preventDefault();
    const { showMessage } = this.props;
    const ref = firebase
      .database()
      .ref(`section/${whichSection}`);
    ref.remove();
    showMessage('Your content has been deleted!');
  };

  render() {
    const sections = this.state.sections;
    const mySections = sections.map(item => {
      return (          
        
          <div href="#" className="list-group-item list-group-item-action" key={item.sectionID}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{item.sectionName}</h5>
              <small>                
                <button
                  className="btn btn-sm btn-outline-secondary"
                  title="Edit"
                  onClick={() =>
                    navigate(
                      `/edit-content/${item.sectionID}`
                    )
                  }
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  title="Delete Meeting"
                  onClick={e =>
                      window.confirm("Are you sure you wish to delete this item?") &&
                      this.deleteSection(e, item.sectionID)
                  }
                >
                  <GoTrashcan />
                </button>
              </small>
            </div>
            <p className="mb-1">{item.sectionHeader}</p>
            <small>{item.sectionContent}</small>
          </div>
      );
    });
    return ( 
      <div className="container">
        <h3 className="font-weight-light mb-3">Content Sections</h3>
        {this.props.message !== null ? (
          <FormSuccess
           showMessage={this.props.showMessage}
           message={this.props.message}
          />
        ): null}

        <div className="list-group">{mySections}</div>
      </div>
    );
  }
}

export default ShowContent;
