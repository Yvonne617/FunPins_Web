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
        <Form>
          <Form.Group>
            <Form.Input
              id='form-input-control-first-name'
              label={t('contact.f_name')}
              placeholder={t('contact.f_name')}
              width={6}
            />
            <Form.Input
              id='form-input-control-last-name'
              label={t('contact.l_name')}
              placeholder={t('contact.l_name')}
              width={6}
            />
          
          </Form.Group>
          <Form.Input label='Email' placeholder='neil@gmail.com' width={12}/>

          <Form.Field
            id='form-textarea-control-opinion'
            control={TextArea}
            label={t('contact.message')}
            placeholder={t('contact.message')}
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
