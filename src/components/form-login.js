import React from 'react';
import ExpandableBlock from '/src/components/expandableblock';
import FormRow from '/src/components/form-row';
import Api from '/src/api';
import { SettingsContext } from '/src/context/settings-context';

export default class AuthForm extends ExpandableBlock {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.extraClassNames = 'blue top-center';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.loading();

    const form = event.target;
    const data = new FormData(form);

    new Api(this.context)
      .login(data.get('pin'))
      .then((response) => {
        if (response.token) {
          this.context.login(response.user, response.token);
        } else {
          this.error('Invalid response! ' + JSON.stringify(response));
        }
      })
      .catch((errorMessage) => this.error(errorMessage));
  }

  content() {
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit}>
          <FormRow
            type="password"
            label="Pin"
            name="pin"
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
    );
  }
}
