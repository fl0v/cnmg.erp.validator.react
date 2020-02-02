import React from "react";

const Context = React.createContext();
const Consumer = Context.Consumer;
const Provider = Context.Provider;
//const { Provider, Consumer } = React.createContext();

class StorageContextProvider extends React.Component {
  state = {
    storage: {
      id: 1,
      name: "Depozit"
    },
    storageList: [
      {
        id: 1,
        name: "Depozit"
      },
      {
        id: 2,
        name: "Bar 1"
      }
    ]
  };

  render() {
    return (
      <Provider
        value={{
          storage: this.state.storage,
          storageList: this.state.storageList,
          setStorageId: id => {
            const storage = this.state.storageList.find(
              storage => storage.id === id
            );            
            this.setState({ storage });
          },
          setStorageList: storageList => {
            this.setState({ storageList });
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export {
  StorageContextProvider,
  Consumer as StorageContextConsumer,
  Context as StorageContext
};
