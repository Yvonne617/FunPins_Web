import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import hotpot_logo from './img/hotpot_icon.png'; 
import soup_logo from './img/soup.png'; 
import boba_logo from './img/milktea.png';
import meat_logo from './img/meat.png'
export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Menu position='right' >
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}>
        <img style={{width:"50px"}} src={hotpot_logo} alt="Logo"/>
        <p>Home</p>
        </Menu.Item>
        <Menu.Item
          name='News'
          active={activeItem === 'news'}
          onClick={this.handleItemClick}>
          <img style={{width:"50px"}} src={soup_logo} alt="Logo" />
          <p>News</p>
        </Menu.Item>
          
    
        <Menu.Item
          name='Infer a Friend'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}>
          <img style={{width:"50px"}} src={boba_logo} alt="Logo" />
          <p>Refer a Friend</p>
        </Menu.Item>
        
         <Menu.Item
          name='About Us'
          active={activeItem === 'aboutUs'}
          onClick={this.handleItemClick}>
        <img style={{width:"50px"}} src={meat_logo} alt="Logo" />
        <p>Contact Us</p>

          </Menu.Item>
         
        
        </Menu.Menu>
      </Menu>
    )
  }
}