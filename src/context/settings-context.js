import React from 'react';

const SettingsContext = React.createContext({
  api: {
    apiBaseUrl: window.localStorage.getItem('apiBaseUrl'),
    apiLicense: window.localStorage.getItem('apiLicense'),
  },
  user: {
    id: null,
    username: null,
    token: null,
  },
  cinema: {
    id: null,
    code: null,
    name: null,
  },
  storage: {
    id: null,
    name: null,
  },
  storageList: [],

  setSettings: () => {},
  resetSettings: () => {},
  haveApiSettings: () => {},
  haveUser: () => {},
  haveStorage: () => {},
  haveStorageList: () => {},
});

const SettingsMeta = {
  required: ['apiBaseUrl', 'apiLicense'],
};
export { SettingsContext, SettingsMeta };
