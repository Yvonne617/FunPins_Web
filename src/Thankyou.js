import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import { Item } from 'semantic-ui-react'
import Menu from './topmenu';
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from 'semantic-ui-react';
import Contactform from './Contactform';
import thanks_logo from './img/thankyou.png';
import firebase from './firebase';
import {
    setTranslations,
    setDefaultLanguage,
    setLanguageCookie,
    getLanguage,
    setLanguage,
    translate,
  } from 'react-switch-lang';
import PropTypes from 'prop-types';
import './style/Contact.css';
setDefaultLanguage(getLanguage());
class Thankyou extends Component {
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
    render() {
        const { activeItem } = this.state
        const { t } = this.props;
        return (
            <div id="outer-container">
                <Helmet>
                    <style>{'body {background-image:url(/bg.jpeg);backdrop-filter: blur(5px);-webkit-backdrop-filter:blur(5px);min-height:100%'}</style>
                </Helmet>
                <Menu windowwidth={this.state.width?this.state.width:window.innerWidth}/>  
                <main id="page-wrap">
                <div className="thankstitle">{t('thanks.title')}</div>
                <Grid centered>
                <Grid.Row id="row2" >
                    <Grid.Column mobile={16} tablet={7} computer={5} >
                        <div className="thankyou_icon">
                            <img src={thanks_logo}/>
                        </div>
                    
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={6} >
                        <div className="thanksinfo">
                            {t('thanks.other')}
                        </div>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </main>          
         </div>
        )
    }
}
Thankyou.propTypes = {
    t: PropTypes.func.isRequired,
  };
  export default translate(Thankyou);