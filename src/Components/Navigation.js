import React, { Component } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link } from '@reach/router';
import { Dropdown } from 'react-bootstrap';

class Navigation extends Component {

  render() {
    const { toggleSidebar, user, logOutUser, setActiveSection } = this.props;

    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark static-top" id={this.hideMenu ? "hideit" :"showit"}>
        <Link className="navbar-brand mr-1" to="/" onClick={e => setActiveSection(e, 'dashboard')}>Simple ReactJS CMS</Link>
        {!user && (
          <Link className="nav-item nav-link d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0" to="/login">
            log in
          </Link>
        )}

        {user && (
          <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" 
            href="#"
            onClick={e => toggleSidebar(e)}
          >
            <FaBars />
          </button>
        )}

        {user && (
          <ul className="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <li className="nav-item dropdown no-arrow">
              <Dropdown alignRight>
                <Dropdown.Toggle id="alertsDropdown" variant='custom' className="nav-link dropdown-toggle">
                  <FaUserCircle />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                  <Dropdown.Item eventKey="1" to="/login" onClick={e => logOutUser(e)}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          )}
      </nav>
    );
  }
}

export default Navigation;
