import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'
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
class FormExampleFieldControlId extends Component {
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSubmit = () => {
    // Popup.alert('Thanks for the message! We will get back to you as soon as possible :)');
    console.log(this.state.message)
    this.setState({ email: '', first_name:'',last_name:'',message:'' })
    
  }
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
      const { first_name, last_name, email,message } = this.state
      const { activeItem } = this.state
      const { t } = this.props;
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input required
              id='form-input-control-first-name'
              label={t('contact.f_name')}
              placeholder={t('contact.f_name')}
              name="first_name"
              value={first_name}
              onChange={this.handleChange}
              width={6}
            />
            <Form.Input
              id='form-input-control-last-name'
              label={t('contact.l_name')}
              placeholder={t('contact.l_name')}
              name="last_name"
              value={last_name}
              onChange={this.handleChange}
              width={6}
            />
          
          </Form.Group>
          <Form.Input required
            label='Email' 
            placeholder='neil@gmail.com' 
            width={12}
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <Form.Field required
            id='form-textarea-control-opinion'
            control={TextArea}
            label={t('contact.message')}
            placeholder={t('contact.message')}
            name="message"
            value={message}
            onChange={this.handleChange}
          />
        
          <Form.Field
            id='form-button-control-public'
            control={Button}
            content= {t('contact.submit')}
          />
        </Form>
  )
  }
}
FormExampleFieldControlId.propTypes = {
  t: PropTypes.func.isRequired,
};
export default translate(FormExampleFieldControlId);
