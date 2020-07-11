import React, { Component }  from 'react';
import "semantic-ui-css/semantic.min.css";
import './style/Map.css';
import * as utils from './Maprender';
export default class Map extends Component{

  render() {
    utils.initMapbox();
    return (
      <div id="map_container"></div>
    )
  }
}
