import React from 'react';
import { SettingsContext } from '/src/context/settings-context';

function StorageItem(props) {
  const { active, storage, setStorage } = props;
  return (
    <li className={(active && 'active').toString()}>
      <a href="#" className="text-reset" onClick={() => setStorage(storage)}>
        {storage.name}
      </a>
    </li>
  );
}

function StorageList(props) {
  const { storageList, setStorage, activeId } = props;
  return (
    <ul className="content list-unstyled">
      {storageList.map((storage) => (
        <StorageItem
          key={storage.id}
          storage={storage}
          onClick={setStorage}
          active={storage.id === props.activeId}
        />
      ))}
    </ul>
  );
}

class SelectStorage extends React.Component {
  static contextType = SettingsContext;
  render() {
    return (
      <section className="block blue fullscreen top-center p-3">
        <StorageList
          storageList={this.context.storageList}
          setStorage={this.context.setStorage}
          activeId={this.context.storage.id}
        />
      </section>
    );
  }
}

export { SelectStorage, StorageList };
