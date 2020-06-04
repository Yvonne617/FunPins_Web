import React from 'react';
import "semantic-ui-css/semantic.min.css";
import './style/Map.css';
import * as utils from './Maprender';
utils.initMapbox();
function Map() {
  return (
    <div id="map_container"></div>
  );
}

export default Map;
