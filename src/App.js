import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './Home';
import "semantic-ui-css/semantic.min.css";
import hotpot_logo from './img/hotpot_icon.png'; // Tell webpack this JS file uses this image

// import Page1 from './Page1';
// import Page2 from './Page2';
// import Page3 from './Page3';
import './style/App.css';
function App() {
  return (
  <Router >
    <div>
      <Route path="/" component={Home} />
      {/* <Route path="/Page1" component={Page1} />
      <Route path="/Page2" component={Page2} />
      <Route path="/Page3" component={Page3} /> */}
    </div>
  </Router>
  );
}

export default App;
