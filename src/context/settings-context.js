import React from 'react';

const SettingsContext = React.createContext({
  api: {
    apiBaseUrl: '',
    apiLicense: '',
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
  haveApiSettings: () => {},
  setStorage: () => {},
  setApiSettings: () => {},
  haveUser: () => {},
  haveStorage: () => {},
});

const SettingsMeta = {
  labels: {
    apiBaseUrl: 'Api url',
    apiLicense: 'License',
  },
  types: {
    apiLicense: 'text',
  },
  visible: ['apiBaseUrl', 'apiLicense'],
  editable: ['apiBaseUrl', 'apiLicense'],
  required: ['apiBaseUrl', 'apiLicense'],
};

export { SettingsContext, SettingsMeta };
