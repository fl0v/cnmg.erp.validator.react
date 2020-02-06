import React from 'react';
import { SettingsContext, SettingsMeta } from './settings-context';
import FormApiSettings from '../components/form-api-settings';
import FormLogin from '/src/components/form-login';

export default class SettingsContextProvider extends React.Component {
  static contextType = SettingsContext;
  state = {
    api: this.context.api,
    user: this.context.user,
    cinema: this.context.cinema,
    storage: this.context.storage,
    storageList: this.context.storageList,
  };

  haveApiSettings() {
    const { required } = SettingsMeta;
    return required.reduce((has, key) => {
      has =
        has && this.state.api[key] && this.state.api[key].toString().length > 0;
      return has;
    }, true);
  }

  haveUser() {
    return this.state.user.id > 0;
  }

  render() {
    const content = !this.haveApiSettings() ? (
      <FormApiSettings fullscreen="true" />
    ) : !this.haveUser() ? (
      <FormLogin fullscreen="true" />
    ) : (
      this.props.children
    );

    return (
      <SettingsContext.Provider
        value={{
          api: this.state.api,
          user: this.state.user,
          cinema: this.state.cinema,
          storage: this.state.storage,
          storageList: this.state.storageList,
          setApiSettings: (api) => this.setState({ api }),
          haveApiSettings: () => this.haveApiSettings(),
          haveUser: () => this.haveUser(),
          login: (user, token) =>
            this.setState({ user: { ...user, token: token } }),
          selectStorage: (storage) => this.setState({ storage }),
          setSettings: (settings) => this.setState(settings),
        }}
      >
        {content}
      </SettingsContext.Provider>
    );
  }
}
