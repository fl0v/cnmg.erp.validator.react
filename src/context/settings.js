import React from "react";

const Context = React.createContext();
const Consumer = Context.Consumer;
const Provider = Context.Provider;
//const SettingsContext = React.createContext();

class SettingsContextProvider extends React.Component {
  state = {
    settings: {
      title: "Validator",
      apiBaseUrl: "http://localhost",
      apiLicense: "my-license-1231231"
    }
  };

  render() {
    return (
      <Provider
        value={{
          settings: this.state.settings,
          setSettings: settings => this.setState({ settings })
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export {
  SettingsContextProvider,
  Consumer as SettingsContextConsumer,
  Context as SettingsContext
};
