import React from 'react';

import Block from '/src/components/block';
import { StorageList } from '/src/components/select-storage';
import { SettingsContext } from '/src/context/settings-context';
import { ReactComponent as Img } from '/src/res/menu.svg';

export default class Menu extends Block {
  static contextType = SettingsContext;
  extraClassNames = 'blue top-right';

  handleClickReset(event) {
    event.preventDefault();
    this.context.resetSettings();
  }

  handleClickLogout(event) {
    event.preventDefault();
    this.context.setSettings({
      user: {},
    });
  }

  icon() {
    return <Img />;
  }

  contentApiSettings() {
    return (
      <div>
        api settings
        <br />
        <a href="#" onClick={(event) => this.handleClickReset(event)}>
          reset
        </a>
      </div>
    );
  }

  contentUser() {
    return (
      <div>
        current user
        <br />
        <a href="#" onClick={(event) => this.handleClickLogout(event)}>
          logout
        </a>
      </div>
    );
  }

  content() {
    return (
      <div className="content">
        {this.contentApiSettings()}
        {this.contentUser()}
        <StorageList
          storageList={this.context.storageList}
          setStorage={(storage) =>
            this.context.setSettings({ storage: storage })
          }
          activeId={this.context.storage.id}
        />
      </div>
    );
  }
}
