import React from 'react';
import { SettingsContext } from '/src/context/settings-context';
import { ReactComponent as Img } from '/src/res/settings.svg';
import Api from '/src/api';

function SettingItem(props) {
  const { name, value } = props;
  return (
    <div className="form-group">
      <label>{name}</label>
      <input
        type="text"
        name={name}
        defaultValue={value}
        className="form-control"
      />
    </div>
  );
}

export default class SettingsMenu extends React.Component {
  static contextType = SettingsContext;
  state = {
    expanded: this.props.fullscreen,
    loading: false,
    error: '',
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
    let settings = {};
    for (var pair of data.entries()) {
      settings[pair[0]] = pair[1];
    }

    // test api
    new Api(settings)
      .pingApi()
      .then((response) => {
        this.context.setSettings(settings);
        if (!this.props.fullscreen) {
          this.setState({ loading: false, expanded: false });
        }
      })
      .catch((error) => {
        //this.setState({ loading: false, error: error.message });
        this.setState({ loading: false, error: 'Invalid api url or license!' });
      });
  }

  render() {
    let classNames = [];
    let onClick = null;
    classNames.push('expandable');
    if (this.props.fullscreen) {
      classNames.push(this.state.expanded ? 'fullscreen expanded p-3' : 'm-3');
      onClick = () => null;
    } else {
      classNames.push(this.state.expanded ? 'expanded p-3' : 'm-3');
      onClick = () => this.setState({ expanded: !this.state.expanded });
    }
    classNames.push(this.state.loading ? 'loading' : '');
    const settings = Object.assign({}, this.context.settings);
    return (
      <section id="settings-menu" className={classNames.join(' ')}>
        <a href="#settings-menu" onClick={onClick} className="icon">
          <Img />
        </a>
        <form className="content" onSubmit={this.handleSubmit}>
          {Object.keys(settings).map((key) => (
            <SettingItem key={key} name={key} value={settings[key]} />
          ))}
          <button type="submit" className="btn btn-success w-100">
            Save
          </button>
        </form>
        {this.state.error.length > 0 && (
          <div className="alert alert-danger text-center my-3">
            {this.state.error}
          </div>
        )}
      </section>
    );
  }
}
