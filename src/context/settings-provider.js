import React from 'react';
import { SettingsContext, SettingsMeta } from './settings-context';
import FormApiSettings from '/src/components/form-api-settings';
import FormLogin from '/src/components/form-login';
import { SelectStorage } from '/src/components/select-storage';
import { Api } from '/src/api';

export default class SettingsContextProvider extends React.Component {
  static contextType = SettingsContext;
  state = {
    api: this.context.api,
    user: this.context.user,
    cinema: this.context.cinema,
    storage: this.context.storage,
    storageList: this.context.storageList,
  };

  componentDidMount() {
    window.localStorage.setItem('apiBaseUrl', this.state.api.apiBaseUrl);
    window.localStorage.setItem('apiLicense', this.state.api.apiLicense);
  }

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

  haveStorage() {
    return this.state.storage.id > 0;
  }

  setSettings(settings) {
    const all = Object.assign(this.state, settings);
    Api.useSettings({
      apiBaseUrl: all.api.apiBaseUrl,
      apiLicense: all.api.apiLicense,
      token: all.user.token,
      storage_id: all.storage.id,
    });
    this.setState(settings);
  }

  resetSettings() {
    //window.localStorage.removeItem('apiBaseUrl');
    //window.localStorage.removeItem('apiLicense');
    this.setState({
      api: {
        apiBaseUrl: '',
        apiLicense: '',
      },
    });
  }

  render() {
    const content = !this.haveApiSettings() ? (
      <FormApiSettings />
    ) : !this.haveUser() ? (
      <FormLogin />
    ) : !this.haveStorage() ? (
      <SelectStorage />
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
          setSettings: (settings) => this.setSettings(settings),
          resetSettings: () => {
            console.log('asd');
            //this.resetSettings();
          },
          haveApiSettings: () => this.haveApiSettings(),
          haveUser: () => this.haveUser(),
          haveStorage: () => this.haveStorage(),
        }}
      >
        {content}
      </SettingsContext.Provider>
    );
  }
}
