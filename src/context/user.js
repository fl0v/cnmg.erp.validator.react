import React from 'react';

const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = {
    user: {
      id: 123,
      token: 'sdflf3r435',
      username: 'admin',
    },
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          setUser: (user) => {
            this.setState({ user });
          },
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserContext, UserProvider };
