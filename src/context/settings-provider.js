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

  tested = false;

  haveApiSettings() {
    const { required } = SettingsMeta;
    let has = required.reduce((has, key) => {
      has =
        has && this.state.api[key] && this.state.api[key].toString().length > 0;
      return has;
    }, true);
    if (has && !this.tested) {
      this.tested = true;
      Api.ping()
        .then((response) => {
          if (response.cinema) {
            this.context.cinema = response.cinema;
          }
        })
        .catch((error) => this.resetSettings());
    }
    return has;
  }

  haveUser() {
    return this.state.user.id > 0;
  }

  haveStorage() {
    return this.state.storage.id > 0;
  }

  haveStorageList() {
    return this.state.storageList && this.state.storageList.length > 0;
  }

  setSettings(settings) {
    this.tested = true;
    this.setState(settings);
  }

  resetSettings() {
    this.tested = false;
    window.localStorage.removeItem('apiBaseUrl');
    window.localStorage.removeItem('apiLicense');
    this.setState({
      api: {
        apiBaseUrl: '',
        apiLicense: '',
      },
    });
  }

  saveToApi() {
    Api.useSettings({
      apiBaseUrl: this.state.api.apiBaseUrl,
      apiLicense: this.state.api.apiLicense,
      token: this.state.user.token,
      storage_id: this.state.storage.id,
    });
    window.localStorage.setItem('apiBaseUrl', this.state.api.apiBaseUrl);
    window.localStorage.setItem('apiLicense', this.state.api.apiLicense);
  }

  render() {
    const content = !this.haveApiSettings() ? (
      <FormApiSettings />
    ) : !this.haveUser() ? (
      <FormLogin />
    ) : !this.haveStorage() && this.haveStorageList() ? (
      <SelectStorage />
    ) : (
      this.props.children
    );
    this.saveToApi();
    return (
      <SettingsContext.Provider
        value={{
          api: this.state.api,
          user: this.state.user,
          cinema: this.state.cinema,
          storage: this.state.storage,
          storageList: this.state.storageList,
          setSettings: (settings) => this.setSettings(settings),
          resetSettings: () => this.resetSettings(),
          haveApiSettings: () => this.haveApiSettings(),
          haveUser: () => this.haveUser(),
          haveStorage: () => this.haveStorage(),
          haveStorageList: () => this.haveStorageList(),
        }}
      >
        {content}
      </SettingsContext.Provider>
    );
  }
}
