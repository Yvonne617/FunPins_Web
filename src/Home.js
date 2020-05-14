import React from 'react';
import Navbar from './Navbar';
import MyGallery from './Card';
import Menu from './topmenu';
import Subcontainer from './Subcontainer';
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from 'semantic-ui-react';
import './style/App.css';
import './style/Menu.css';
import ios_bnt from './img/ios_download_btn.png';
import android_bnt from './img/android_download_btn.png';
import $ from 'jquery';

export default class Home extends React.Component {
    state = { width: 0, height: 0 };
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
      }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
      }
    render(){
       return(
            <div id="outer-container">
               <Menu windowwidth={this.state.width?this.state.width:window.innerWidth}/>  
               <main id="page-wrap">
               <Grid centered>
               <Grid.Row id="row1" >
                    <Grid.Column mobile={16} tablet={16} computer={8}>
                        <div className="parent1">
                            <MyGallery/>
                        </div>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={8} className="intro">
                        <div className="parent2">
                            <div style={{textAlignVertical: "center",textAlign: "center",}}>Connecting Chinese with map</div>
                            <div className="intro_detail" style={{textAlignVertical: "center",textAlign: "center",}}>FunPins' mission is to provide an easy way for overseas Chinese to find great places that match their own taste and cultural background. We create an app basing on map that enable you to explore recommendation from your friends and other Chinese.</div>
                            <div className="download_bnts">
                                <a className="ios_btn" href="https://apps.apple.com/us/app/%E7%82%B9%E5%9C%88/id1483535140">
                                <img style={{width:"200px" ,height:"60px"}} src={ios_bnt} alt="Logo" />
                                </a>
                                <a className="and_btn" href="https://apps.apple.com/us/app/%E7%82%B9%E5%9C%88/id1483535140">
                                <img style={{width:"200px",height:"60px"}} src={android_bnt} alt="Logo" />
                                </a>
                             </div>
                        </div>
 
                    </Grid.Column>
        

               </Grid.Row>

               </Grid>
                </main>

            
                      
            </div>
       )
   
    }
 }
 
