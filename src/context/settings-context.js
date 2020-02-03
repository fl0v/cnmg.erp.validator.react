import React from 'react';

export const SettingsContext = React.createContext({
  settings: {
    title: 'Validator',
    apiBaseUrl: '',
    apiLicense: '',
  },
  setSettings: () => {},
});
