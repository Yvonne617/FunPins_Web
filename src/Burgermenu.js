import React from 'react';
import { bubble as Menu } from 'react-burger-menu'
import './style/Menu.css';
import hotpot_logo from './img/hotpot_icon.png'; 
import soup_logo from './img/soup.png'; 
import boba_logo from './img/milktea.png';
import meat_logo from './img/meat.png';
import { Link } from 'react-router-dom';

export default class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
  render () {
    return (
      <Menu noOverlay width="300px">
        <div>
            <Link to="/" className="menu-item" href="/"><img style={{width:"50px"}} src={hotpot_logo} alt="Logo"/><span className="navtitle">Home</span></Link>
        </div>
        <div>
            <Link to="/News" className="menu-item"><img style={{width:"50px"}} src={soup_logo} alt="Logo" /><span className="navtitle">About</span></Link>
        </div>
        <div>
            <Link to="/Refer"  className="menu-item" href="/refer"><img style={{width:"50px"}} src={boba_logo} alt="Logo" /><span className="navtitle">Refer A Friend</span></Link>
        </div>
        <div>
            <Link to="/Contact"  className="menu-item" href="/contact"><img style={{width:"50px"}} src={meat_logo} alt="Logo" /><span className="navtitle">Contact</span></Link>
        </div>
        
      </Menu>
    );
  }
}

         