import React from 'react';
import SettingsContextProvider from '/src/context/settings-provider';
import Header from '/src/components/header';
import FormValidate from '/src/components/form-validate';
import Menu from '/src/components/menu';
import '/src/res/validator.css';

export default class Validator extends React.Component {
  render() {
    return (
      <div id="validator">
        <SettingsContextProvider>
          <Header />
          <FormValidate />
          <Menu />
        </SettingsContextProvider>
      </div>
    );
  }
}
