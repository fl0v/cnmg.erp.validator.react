import React from 'react';
import Api from '/src/api';
import ExpandableBlock from '/src/components/expandableblock';
import FormRow from '/src/components/form-row';
import { SettingsContext, SettingsMeta } from '/src/context/settings-context';
import { ReactComponent as Img } from '/src/res/settings.svg';

export default class SettingsMenu extends ExpandableBlock {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.extraClassNames = 'blue top-right';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.loading();

    const form = event.target;
    const data = new FormData(form);
    let apiSettings = {};
    for (var pair of data.entries()) {
      apiSettings[pair[0]] = pair[1];
    }

    // test api
    new Api({ api: apiSettings })
      .ping()
      .then((response) => {
        this.context.setApiSettings(apiSettings);
        //this.done();
      })
      .catch((error) =>
        this.error('Invalid api url or license! (' + error.message + ')')
      );
  }
  icon() {
    return <Img />;
  }

  content() {
    const { api } = this.context;
    const { labels, editable, types } = SettingsMeta;
    return (
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
    );
  }
}
