import React, { Component } from 'react';
import { Grid, Image, List, Divider } from 'semantic-ui-react';
import News_article from './News_article'
import {Helmet} from "react-helmet";
import Menu from './topmenu';
import './style/Maps.css'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
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
//check for google api
componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
}
componentDidMount() {
    this.loadMap();
  }
loadMap() {
    
}
render() {
    return (
        <div>
            <Menu windowwidth={this.state.width?this.state.width:window.innerWidth}/>
        <Map google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        {/* <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow> */}
      </Map>
        </div>
        
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyB4ciwN2vQVbAS0j4OUjAWz3e_3TILDz70")
})(MapContainer)