import React from 'react';
import Block from '/src/components/block';
import { StorageList } from '/src/components/select-storage';
import { SettingsContext } from '/src/context/settings-context';
import { ReactComponent as Img } from '/src/res/menu.svg';

export default class Menu extends Block {
  static contextType = SettingsContext;
  extraClassNames = 'blue top-right';

  icon() {
    return <Img />;
  }

  contentApiSettings() {
    return <span>api settings</span>;
  }

  contentUser() {
    return <span>current user + logout</span>;
  }

  content() {
    return (
      <div className="content">
        {this.contentApiSettings()}
        {this.contentUser()}
        <StorageList
          storageList={this.context.storageList}
          setStorage={this.context.setStorage}
          activeId={this.context.storage.id}
        />
      </div>
    );
  }
}
