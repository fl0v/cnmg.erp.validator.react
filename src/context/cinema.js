import React from "react";

const Context = React.createContext();
const Consumer = Context.Consumer;
const Provider = Context.Provider;
//const { Provider, Consumer } = React.createContext();

class CinemaContextProvider extends React.Component {
  state = {
    cinema: {
      id: 123,
      code: "BUCMVX",
      name: "Moviplex"
    }
  };

  render() {
    return (
      <Provider
        value={{
          cinema: this.state.cinema,
          setCinema: cinema => this.setState({ cinema })
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export {
  CinemaContextProvider,
  Consumer as CinemaContextConsumer,
  Context as CinemaContext
};
