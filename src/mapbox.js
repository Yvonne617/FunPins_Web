import React from 'react';
import {Grid} from 'semantic-ui-react';
import mapboxgl from 'mapbox-gl';
import './style/mapbox_map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibGFuaGVpZ2h0IiwiYSI6ImNrYjA3bWcwdzA1eTkyeHNoMzBsdHNtbjUifQ.KvxpOnRYDJmkwUEB32EiLw';

export default class mapbox_map extends React.Component{
    //this is for show the next few step
    constructor(props) {
        super(props);
        this.state = {
        lng: 5,
        lat: 34,
        zoom: 2
        };
    }
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight});
    };
    componentDidMount() {
        const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom
        });
    }
    render() {
        return (
            <div>
            <div ref={el => this.mapContainer = el} className="mapContainer"/>
        
            </div>
        )
    }
}