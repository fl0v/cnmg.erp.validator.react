import React from 'react';
import { ApiClass } from '/src/api';
import { SettingsContext } from '/src/context/settings-context';
import FormRow from '/src/components/form-row';
import { ReactComponent as Img } from '/src/res/settings.svg';

export default class FormApiSettings extends React.Component {
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
    let settings = {};
    for (var pair of data.entries()) {
      settings[pair[0]] = pair[1];
    }

    // instanta noua ca sa testam setarile
    new ApiClass(settings)
      .ping()
      .then(() => this.context.setSettings({ api: settings }))
      .catch((error) => this.error(error.message || error));
  }

  contentForm() {
    const { api } = this.context;
    return (
      <div>
        <FormRow
          type="text"
          label="Api url"
          name="apiBaseUrl"
          value={api.apiBaseUrl}
          disabled={this.props.disabled}
          className="text-center"
        />
        <FormRow
          type="text"
          label="License"
          name="apiLicense"
          value={api.apiLicense}
          disabled={this.props.disabled}
          className="text-center"
        />
      </div>
    );
  }

  render() {
    return this.props.disabled ? (
      this.contentForm()
    ) : (
      <section className="block blue fullscreen p-3">
        <span className="icon">
          <Img />
        </span>
        <form className="content" onSubmit={this.handleSubmit}>
          {this.contentForm()}
          <button type="submit" className="btn btn-success w-100">
            Next
          </button>
          {this.state.error.length > 0 && (
            <div className="alert alert-danger text-center my-3">
              {this.state.error}
            </div>
          )}
        </form>
      </section>
    );
  }
}
