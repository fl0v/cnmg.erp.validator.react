import React from 'react';
import { Api } from '/src/api';
import { SettingsContext } from '/src/context/settings-context';

function CodeMessage(props) {
  const { code, error, message } = props;
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  } else if (message) {
    const html = message.map((m, index) => (
      <li key={index} dangerouslySetInnerHTML={{ __html: m }} />
    ));
    return <ul className="messages list-unstyled">{html}</ul>;
  } else {
    return (
      <ul className="messages list-unstyled">
        <li>
          <h1 className="text-success">{code}</h1>
        </li>
      </ul>
    );
  }
}

export default class FormValidate extends React.Component {
  static contextType = SettingsContext;
  state = {
    code: null,
    loading: false,
    message: [],
    error: null,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const form = event.target;
    const data = new FormData(form);
    const code = data.get('code');

    Api.validate(code)
      .then((response) => {
        if (response.error) {
          this.setState({
            code: null,
            loading: false,
            message: [],
            error: response.error,
          });
        } else {
          this.setState({
            loading: false,
            error: false,
            code: response.code,
            message: response.message,
          });
        }
      })
      .catch((error) => {
        this.setState({
          code: null,
          loading: false,
          message: [],
          error: error.message,
        });
      });
  }

  render() {
    return (
      <form className="code m-3" onSubmit={this.handleSubmit}>
        <CodeMessage
          code={this.state.code}
          message={this.state.message}
          error={this.state.error}
        />
        <div className="form-group fixed-bottom m-3 mx-auto">
          <input
            type="text"
            name="code"
            defaultValue={this.state.code}
            className="form-control text-center"
          />
          <button type="submit" className="btn btn-primary w-100">
            Validate
          </button>
        </div>
      </form>
    );
  }
}
