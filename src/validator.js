import React from 'react';
import SettingsContextProvider from '/src/context/settings-provider';
import Header from '/src/components/header';
import FormCode from '/src/components/form-code';
import '/src/res/validator.css';

export default class Validator extends React.Component {
  render() {
    return (
      <div id="validator">
        <SettingsContextProvider>
          <Header />
          <FormCode />
        </SettingsContextProvider>
      </div>
    );
  }
}
