import React from 'react';

const SettingsContext = React.createContext({
  api: {
    apiBaseUrl: '',
    apiLicense: '',
  },
  haveApiSettings: () => {},
  setApiSettings: () => {},

  user: {
    id: null,
    username: null,
    token: null,
  },
  login: () => {},
  haveUser: () => {},

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
  selectStorage: () => {},

  setSettings: () => {},
});

const SettingsMeta = {
  labels: {
    apiBaseUrl: 'Api url',
    apiLicense: 'License',
  },
  types: {
    apiLicense: 'password',
  },
  visible: ['apiBaseUrl', 'apiLicense'],
  editable: ['apiBaseUrl', 'apiLicense'],
  required: ['apiBaseUrl', 'apiLicense'],
};

export { SettingsContext, SettingsMeta };
