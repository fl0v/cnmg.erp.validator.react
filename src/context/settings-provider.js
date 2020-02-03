import React from 'react';
import SettingsMenu from '../components/settingsmenu';
import { SettingsContext } from './settings-context';

export default class SettingsContextProvider extends React.Component {
  static contextType = SettingsContext;
  state = {
    settings: this.context.settings,
  };
  hasSettings() {    
    return ['apiBaseUrl', 'apiLicense'].reduce((has, key) => {     
      has =
        has &&
        this.state.settings[key] &&
        this.state.settings[key].toString().length > 0;
      return has;
    },true);    
  }
  render() {
    let content = this.hasSettings() ? (
      this.props.children
    ) : (
      <SettingsMenu fullscreen="true" />
    );
    return (
      <SettingsContext.Provider
        value={{
          settings: this.state.settings,
          setSettings: (settings) => this.setState({ settings: settings }),
        }}
      >
        {content}
      </SettingsContext.Provider>
    );
  }
}
