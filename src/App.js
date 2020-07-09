import React from 'react';
import { HashRouter as Router,Route} from 'react-router-dom';
import Home from './Home';
import News from './News';
import Refer from './Refer';
import Maps from './Maps';
import Map from './Map';
import Contact from './Contact';
import ShowArticle from './ShowArticle';
import Pin from './Pin';
import Thankyou from './Thankyou';
import mapbox_map from './mapbox';
import UserMap from './UserMap';
import "semantic-ui-css/semantic.min.css";
import hotpot_logo from './img/hotpot_icon.png'; // Tell webpack this JS file uses this image
import './style/App.css';
function App() {
  return (
  <Router >
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/News" component={News} />
      <Route path="/Refer" component={Refer} />
      <Route path="/Contact" component={Contact} />
      <Route path="/Pins/:id" component={Pin} />
      <Route path="/UserMap" component={UserMap} />
      <Route path="/News/:id" component={ShowArticle} />
      <Route path="/Thanks" component={Thankyou} />
      <Route path="/Maps" component={Maps} />
      <Route path="/Map" component={Map} />
      <Route path="/mapbox" component={mapbox_map} />
    </div>
  </Router>
  );
}

export default App;
