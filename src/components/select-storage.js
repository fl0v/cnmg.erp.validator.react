import React from 'react';
import { SettingsContext } from '/src/context/settings-context';

function StorageItem(props) {
  const { active, storage, setStorage } = props;
  const onClick = () => setStorage(storage);
  return (
    <li className={(active && 'active').toString()}>
      <a href="#" className="text-reset" onClick={onClick}>
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
          setStorage={setStorage}
          active={storage.id === activeId}
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
          setStorage={(storage) =>
            this.context.setSettings({ storage: storage })
          }
          activeId={this.context.storage.id}
        />
      </section>
    );
  }
}

export { SelectStorage, StorageList };
