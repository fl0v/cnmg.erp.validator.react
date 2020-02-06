import React from 'react';
import Block from '/src/components/block';
import { StorageList } from '/src/components/select-storage';
import { SettingsContext } from '/src/context/settings-context';
import { ReactComponent as Img } from '/src/res/menu.svg';

export default class Menu extends Block {
  static contextType = SettingsContext;
  extraClassNames = 'blue';

  icon() {
    return <Img />;
  }

  content() {
    return (
      <StorageList
        storageList={this.context.storageList}
        setStorage={this.context.setStorage}
        activeId={this.context.storage.id}
      />
    );
  }
}
