import React from 'react';
import Navbar from './Navbar';
import Burger from './Burgermenu';
import { Grid, Image } from 'semantic-ui-react';
import './style/Menu.css';
export default class topmenu extends React.Component {
    state = {
        windowwidth: this.props.windowwidth,
    };
    render () {
        if (this.props.windowwidth<700) {
            return(<Burger/>)
        } else {
            return(<Navbar />)
        }
        
  }
}