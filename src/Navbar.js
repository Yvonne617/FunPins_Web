import React,{ Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import hotpot_logo from './img/hotpot_icon.png'; 
import soup_logo from './img/soup.png'; 
import boba_logo from './img/milktea.png';
import meat_logo from './img/meat.png'
export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Menu position='right' >
        <Link to="/" className="menu_btn">
          <img style={{width:"50px",height:"50px"}} src={hotpot_logo} alt="Logo"/>
          <span>Home</span>
        </Link>
   

          <Link to="/News/" className="menu_btn">
            <img style={{width:"50px",height:"50px"}} src={soup_logo} alt="Logo" />
            <span>News</span>
          </Link>
 
          

          <Link to="/Refer/" className="menu_btn">
            <img style={{width:"50px",height:"50px"}} src={boba_logo} alt="Logo" />
            <span>Refer a Friend</span>
          </Link>
    
        
         
          <Link to="/Contact/" className="menu_btn">
            <img style={{width:"50px",height:"50px"}} src={meat_logo} alt="Logo" />
            <span>Contact Us</span>
          </Link>
        
         
        
        </Menu.Menu>
      </Menu>
    )
  }
}