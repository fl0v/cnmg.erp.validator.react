import React from 'react';

export default class ExpandableBlock extends React.Component {
  state = {
    expanded: this.props.fullscreen,
    loading: false,
    error: '',
  };
  extraClassNames = '';

  constructor(props) {
    super(props);
    this.toggle.bind(this);
  }

  loading() {
    this.setState({ loading: true });
  }

  done() {
    this.setState({ loading: false, expanded: false });
  }

  error(message) {
    this.setState({
      loading: false,
      error: message,
    });
  }

  toggle() {
    if (!this.props.fullscreen) {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  classNames() {
    let classNames = ['expandable', this.extraClassNames];
    if (this.props.fullscreen) {
      classNames.push(this.state.expanded ? 'fullscreen expanded p-3' : 'm-3');
    } else {
      classNames.push(this.state.expanded ? 'expanded p-3' : 'm-3');
    }
    classNames.push(this.state.loading ? 'loading' : '');
    return classNames.join(' ');
  }

  icon() {}
  content() {}

  render() {
    const content = this.content();
    const icon = this.icon();
    return (
      <section className={this.classNames()}>
        <a href="#" onClick={this.toggle} className="toggle">
          {icon}
        </a>
        {content}
      </section>
    );
  }
}
