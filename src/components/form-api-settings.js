import React from 'react';
import { Api, ApiClass } from '/src/api';
import { SettingsContext, SettingsMeta } from '/src/context/settings-context';
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
      .then((response) => {
        Api.useSettings(settings); // salvam in instanta permanenta intantiata la lansarea aplicatie
        this.context.setApiSettings(settings); // va declansa render pe aplicatie
      })
      .catch((error) => this.error(error.message));
  }

  render() {
    const { api } = this.context;
    const { labels, editable, types } = SettingsMeta;
    return (
      <section className="block blue fullscreen p-3 top-right">
        <span className="icon">
          <Img />
        </span>

        <div className="content">
          <form onSubmit={this.handleSubmit}>
            {editable.map((key) => (
              <FormRow
                key={key}
                type={types[key]}
                label={labels[key]}
                name={key}
                value={api[key]}
              />
            ))}
            <button type="submit" className="btn btn-success w-100">
              Next
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
