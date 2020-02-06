import React from 'react';
import FormRow from '/src/components/form-row';
import { Api } from '/src/api';
import { SettingsContext } from '/src/context/settings-context';
import { ReactComponent as Img } from '/src/res/auth.svg';

export default class FormLogin extends React.Component {
  static contextType = SettingsContext;
  state = {
    loading: false,
    error: '',
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  error(message) {
    this.setState({
      loading: false,
      error: 'Invalid api url or license! (' + message + ')',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });

    const form = event.target;
    const data = new FormData(form);

    Api.login(data.get('pin'))
      .then((response) => {
        if (response.token) {
          Api.useSettings({ token: response.token }); // tinem token-ul in api ptr a-l folosi la urmatoarele apeluri
          this.context.setSettings({
            user: { ...response.user, token: response.token },
            cinema: response.cinema,
            storageList: response.storages,
          }); // va declansa render pe toata aplicatia
        } else {
          this.error('Invalid response! ' + JSON.stringify(response));
        }
      })
      .catch((error) => this.error(error.message));
  }

  render() {
    return (
      <section className="block blue fullscreen top-center p-3">
        <span className="icon">
          <Img />
        </span>
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <FormRow
              type="password"
              label="Pin"
              name="pin"
              value=""
              className="text-center"
            />
            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
          </form>
          {this.state.error.length > 0 && (
            <div className="alert alert-danger text-center my-3">
              {this.state.error}
            </div>
          )}
        </div>
      </section>
    );
  }
}
