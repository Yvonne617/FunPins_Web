import React, { Component }  from 'react';
import "semantic-ui-css/semantic.min.css";
import './style/Map.css';
import * as utils from './Maprender';
import Menu from './topmenu';
import "semantic-ui-css/semantic.min.css";
export default class Map extends Component{
  constructor(props) {
    super(props);
    this.state = {
      width: 0, 
      height: 0
    }
  }
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight});
  };
componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  render() {
    utils.initMapbox();
    return (
      <div className="content_container"> 
        <div id="map_container"></div>
        <Menu windowwidth={this.state.width?this.state.width:window.innerWidth}/>
      </div>
    )
  }
}
