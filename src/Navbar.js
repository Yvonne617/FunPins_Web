import React,{ Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import hotpot_logo from './img/hotpot_icon.png'; 
import soup_logo from './img/soup.png'; 
import boba_logo from './img/milktea.png';
import meat_logo from './img/meat.png';
import funpin_logo from './img/funpin.png';
import en from './lan/en.json';
import cn from './lan/cn.json';
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
class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state
    const { t } = this.props;
    return (
      <Menu secondary>
        <Menu.Menu position='right' >
        <Link to="/" className="menu_btn">
          <img style={{width:"50px",height:"50px"}} src={hotpot_logo} alt="Logo"/>
          <span>{t('nav.nav_home')}</span>
        </Link>
   

          <Link to="/News/" className="menu_btn">
            <img style={{width:"50px",height:"50px"}} src={boba_logo} alt="Logo" />
            <span>{t('nav.nav_news')}</span>
          </Link>
        
          <Link to="/Map/" className="menu_btn">
            <img style={{width:"50px",height:"50px"}} src={funpin_logo} alt="Logo" />
            <span>{t('nav.nav_maps')}</span>
          </Link>
          

          {/* <Link to="/Refer/" className="menu_btn">
            <img style={{width:"50px",height:"50px"}} src={boba_logo} alt="Logo" />
            <span>{t('nav.nav_refer')}</span>
          </Link>
     */}
        
         
          <Link to="/Contact/" className="menu_btn">
            <img style={{width:"50px",height:"50px"}} src={meat_logo} alt="Logo" />
            <span>{t('nav.nav_contact')}</span>
          </Link>
        
         
        
        </Menu.Menu>
      </Menu>
    )
  }
}
MenuExampleSecondary.propTypes = {
  t: PropTypes.func.isRequired,
};
export default translate(MenuExampleSecondary);