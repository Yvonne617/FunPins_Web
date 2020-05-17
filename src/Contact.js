import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import { Item } from 'semantic-ui-react'
import Menu from './topmenu';
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from 'semantic-ui-react';
import Contactform from './Contactform';
import email_logo from './img/email.png';
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
setDefaultLanguage(getLanguage());
const items = [
    {
      childKey: 0,
      image: '/images/wireframe/image.png',
      header: 'Header',
      description: 'Description',
      meta: 'Metadata',
      extra: 'Extra',
    },
    {
      childKey: 1,
      image: '/images/wireframe/image.png',
      header: 'Header',
      description: 'Description',
      meta: 'Metadata',
      extra: 'Extra',
    },
  ]


class Contact extends Component {
    state = { width: 0, height: 0 };
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        const db = firebase.firestore();
        db.collection("users").doc("00000000000").get().then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', doc.data());
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
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
                <div className="contact_title">{t('contact.title')}</div>
                <div className="contact_subtitle">213-2040-710 | 1050 WILSHIRE BLVD, LOS ANGELES, CA, 90017</div>
                <Grid centered>
                <Grid.Row id="row2" >
                    <Grid.Column mobile={16} tablet={7} computer={5} >
                        <div className="contact_form_icon">
                            <img src={email_logo}/>
                        </div>
                    
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={6} >
                        <div className="contact_form">
                            <Contactform />
                        </div>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </main>          
         </div>
        )
    }
}
Contact.propTypes = {
    t: PropTypes.func.isRequired,
  };
  export default translate(Contact);