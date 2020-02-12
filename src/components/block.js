import React from 'react';

export default class Block extends React.Component {
  state = {
    expanded: this.props.expanded,
    loading: false,
    error: '',
  };
  extraClassNames = '';
  id = '';

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
    this.setState({ expanded: !this.state.expanded });
  }

  classNames() {
    let classNames = ['block', this.extraClassNames];
    if (this.state.expanded && this.props.fullscreen) {
      classNames.push('expanded fullscreen p-3');
    } else if (this.state.expanded) {
      classNames.push('expanded p-3');
    } else {
      classNames.push('collapsed m-3');
    }
    classNames.push(this.state.loading ? 'loading' : '');
    return classNames.join(' ');
  }

  icon() {}
  content() {}

  render() {
    return (
      <section id={this.id} className={this.classNames()}>
        <a href="#" onClick={() => this.toggle()} className="icon">
          {this.icon()}
        </a>
        {this.content()}
      </section>
    );
  }
}
