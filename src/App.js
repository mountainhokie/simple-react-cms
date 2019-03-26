import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from './Components/Firebase';

import Home from './Components/Home';
import Navigation from './Components/Navigation';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import CreateContent from './Components/CreateContent';
import ShowContent from './Components/ShowContent';
import EditContent from './Components/EditContent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      siteTitle: 'Simple ReactJS CMS',
      user: null,
      displayName: null,
      userID: null,
      hideMenu: false,
      activeSection: 'dashboard',
      message: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      } else {
        this.setState({ user: null });
      }
    });
    document.title = this.state.siteTitle
  }

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/login');
      });
  };

  toggleSidebar = e => {
    e.preventDefault();
    this.setState({
      hideMenu: !this.state.hideMenu
    });
  };

  setActiveSection = (e,actSec) => {
    this.setState({
      activeSection: actSec
    });
  };

  showMessage = (message, url) => {
    this.setState({
      message: message
    });
    if(url)
      navigate(url)
  };


  render() {
    return (
      <div>
        <Navigation
          user={this.state.user}
          logOutUser={this.logOutUser}
          hideMenu={this.state.hideMenu}
          toggleSidebar={this.toggleSidebar}
          setActiveSection={this.setActiveSection}
        />
        <div id="wrapper">
          {this.state.user && (
              <Sidebar 
                hideMenu={this.state.hideMenu}
                activeSection={this.state.activeSection}
                setActiveSection={this.setActiveSection}
              />
            )}
          <div id="content-wrapper">          
            <Router>
              <Home path="/" 
                user={this.state.user}                 
                showMessage={this.showMessage}
                message={this.state.message} 
              />
              <Login path="/login" />
              <CreateContent 
                path="/create-content" 
                showMessage={this.showMessage}
                message={this.state.message}
              />
              <ShowContent
                path="/show-content"
                userID={this.state.userID}
                showMessage={this.showMessage}
                message={this.state.message}
              />
              <EditContent
                path="/edit-content/:sectionID"
                userID={this.state.userID}
                showMessage={this.showMessage}
              />
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
