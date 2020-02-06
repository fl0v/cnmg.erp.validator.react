import React from 'react';

export default class Block extends React.Component {
  state = {
    expanded: this.props.fullscreen,
    loading: false,
    error: '',
  };
  extraClassNames = '';

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
    let classNames = ['block', this.extraClassNames];
    if (!this.state.expanded) {
      classNames.push('collapsed m-3');
    } else if (this.props.fullscreen) {
      classNames.push('fullscreen p-3');
    } else {
      classNames.push('p-3');
    }
    classNames.push(this.state.loading ? 'loading' : '');
    return classNames.join(' ');
  }

  icon() {}
  content() {}

  render() {
    return (
      <section className={this.classNames()}>
        <a href="#" onClick={() => this.toggle()} className="icon">
          {this.icon()}
        </a>
        {this.content()}
      </section>
    );
  }
}
