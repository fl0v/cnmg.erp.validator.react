import React from 'react';
import SettingsContextProvider from './context/settings-provider';
import { CinemaContextProvider } from './context/cinema';
import { StorageContextProvider } from './context/storage';
import Header from './components/header';
import LeftMenu from './components/leftmenu';
import SettingsMenu from './components/settingsmenu';
import CodeForm from './components/codeform';
import './res/validator.css';

export default class Validator extends React.Component {
  render() {
    return (
      <SettingsContextProvider>
        <div id="validator">
          <StorageContextProvider>
            <CinemaContextProvider>
              <Header />
            </CinemaContextProvider>
            <LeftMenu />
          </StorageContextProvider>
          <SettingsMenu />
          <CodeForm />
        </div>
      </SettingsContextProvider>
    );
  }
}
