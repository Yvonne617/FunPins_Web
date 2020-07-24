import React from 'react';
import { bubble as Menu } from 'react-burger-menu'
import './style/Menu.css';
import hotpot_logo from './img/hotpot_icon.png'; 
import soup_logo from './img/soup.png'; 
import boba_logo from './img/milktea.png';
import meat_logo from './img/meat.png';
import { Link } from 'react-router-dom';
import funpin_logo from './img/funpin.png';
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
class Burger extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  render () {
    const { activeItem } = this.state
    const { t } = this.props;
    return (
      <Menu noOverlay width="300px">
        <div>
            <Link to="/" className="menu-item" href="/"><img style={{width:"50px"}} src={hotpot_logo} alt="Logo"/><span className="navtitle">{t('nav.nav_home')}</span></Link>
        </div>
        <div>
            <Link to="/News" className="menu-item"><img style={{width:"50px"}} src={boba_logo} alt="Logo" /><span className="navtitle">{t('nav.nav_news')}</span></Link>
        </div>
        <div>
            <Link to="/Map" className="menu-item"><img style={{width:"50px"}} src={funpin_logo} alt="Logo" /><span className="navtitle">{t('nav.nav_maps')}</span></Link>
        </div>
        {/* <div>
            <Link to="/Refer"  className="menu-item" href="/refer"><img style={{width:"50px"}} src={boba_logo} alt="Logo" /><span className="navtitle">{t('nav.nav_refer')}</span></Link>
        </div> */}
        <div>
            <Link to="/Contact"  className="menu-item" href="/contact"><img style={{width:"50px"}} src={meat_logo} alt="Logo" /><span className="navtitle">{t('nav.nav_contact')}</span></Link>
        </div>
        
      </Menu>
    );
  }
}
Burger.propTypes = {
  t: PropTypes.func.isRequired,
};
export default translate(Burger);
         