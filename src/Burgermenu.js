import React from 'react';
import { bubble as Menu } from 'react-burger-menu'
import './style/Menu.css';
import hotpot_logo from './img/hotpot_icon.png'; 
import soup_logo from './img/soup.png'; 
import boba_logo from './img/milktea.png';
import meat_logo from './img/meat.png'
export default class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
  render () {
    return (
        
      <Menu noOverlay width="300px">
        <div>
            <a id="home" className="menu-item" href="/"><img style={{width:"50px"}} src={hotpot_logo} alt="Logo"/><span className="navtitle">Home</span></a>
        </div>
        <div>
            <a id="about" className="menu-item" href="/about"><img style={{width:"50px"}} src={soup_logo} alt="Logo" /><span className="navtitle">About</span></a>
        </div>
        <div>
            <a id="refer" className="menu-item" href="/refer"><img style={{width:"50px"}} src={boba_logo} alt="Logo" /><span className="navtitle">Refer A Friend</span></a>
        </div>
        <div>
            <a id="about" className="menu-item" href="/contact"><img style={{width:"50px"}} src={meat_logo} alt="Logo" /><span className="navtitle">Contact</span></a>
        </div>
        
      </Menu>
    );
  }
}