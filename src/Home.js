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
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  getLanguages,
  setLanguage,
  translate,
} from 'react-switch-lang';
import en from './lan/en.json';
import cn from './lan/cn.json';
 
// Do this two lines only when setting up the application
setTranslations({ en, cn });
setDefaultLanguage('en');
 
// If you want to remember selected language
setLanguageCookie();

class Home extends React.Component {
    handleSetLanguage = (key) => () => {
        setLanguage(key);
      };
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
       const { t } = this.props;
       return(
            <div id="outer-container">
                <Helmet>
                    <style>{'body {background-image:url(/bg.jpeg);backdrop-filter: blur(5px);min-height:100%;background-size: cover;}'}</style>
                </Helmet>
               <Menu windowwidth={this.state.width?this.state.width:window.innerWidth}/>  
               <main id="page-wrap">
               <Grid centered>
               <Grid.Row id="row1" >
                    <Grid.Column mobile={16} tablet={16} computer={1}></Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={8}>
                        <div className="parent1">
                            <MyGallery/>
                            <img className="border" src="/border.png"></img>
                           
                        </div>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={5} className="intro">
                        <div className="parent2">
                            <div style={{textAlignVertical: "center",textAlign: "center",}}>{t('home.title')}</div>
                            <div className="intro_detail" style={{textAlignVertical: "center",textAlign: "center",}}>{t('home.intro')}</div>
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
                    <Grid.Column mobile={16} tablet={16} computer={2}></Grid.Column>

               </Grid.Row>
                <Grid.Row className="lan">
                    Language: &nbsp;<span onClick={this.handleSetLanguage('en')}>English&nbsp;</span>&nbsp;|&nbsp;<span  onClick={this.handleSetLanguage('cn')}>&nbsp;Chinese</span>
                </Grid.Row>
               </Grid>
                </main>          
            </div>
       )
   
    }
 }
 
 Home.propTypes = {
    t: PropTypes.func.isRequired,
  };
   
  export default translate(Home);