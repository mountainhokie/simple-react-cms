import React, { Component } from 'react';
import { FaTachometerAlt, FaRegEdit, FaListUl } from 'react-icons/fa';
import { Link } from '@reach/router';

class Sidebar extends Component {
  render() {
    const { hideMenu, activeSection, setActiveSection } = this.props;
    const sidebarVis = hideMenu ? 'toggled' : 'show';
    const activeSec = activeSection; 
    
    return (
      <ul className={`sidebar navbar-nav ${sidebarVis}`}>
        <li className={`nav-item ${activeSec === 'dashboard' ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={e => setActiveSection(e, 'dashboard')}>
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={`nav-item ${activeSec === 'create' ? 'active' : ''}`}>
          <Link to="/create-content" className="nav-link" onClick={e => setActiveSection(e, 'create')}>
            <FaRegEdit />
            <span>Create Content</span>
          </Link>
        </li>
        <li className={`nav-item ${activeSec === 'show' ? 'active' : ''}`}>
          <Link to="/show-content" className="nav-link" onClick={e => setActiveSection(e, 'show')}>
            <FaListUl />
            <span>Show Content</span>
          </Link>
        </li>
      </ul>
    );
  }
}

export default Sidebar;
