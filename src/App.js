import React, { PureComponent } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import { InputGroup, Button } from '@blueprintjs/core';

import logo from './logo.svg';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      key: "",
      hint: "",
      result: "",
    };
  }

  render() {
    const { password, key, hint, result } = this.state;

    return (
      <div className="App bp3-dark">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-content">
          <div className="App-row">
            <InputGroup large={true} type="password" placeholder="password" value={password} onChange={this.handlePasswordChange} />
          </div>
          <div className="App-row">
            <InputGroup large={true} placeholder="key" value={key} onChange={this.handleKeyChange} />
          </div>
          <div className="App-row">
            <CopyToClipboard text={result} onCopy={this.resetState}>
              <Button large={true}>Copy</Button>
            </CopyToClipboard>
          </div>
          <div className="App-row">
            {hint}
          </div>
        </div>
      </div>
    );
  }

  handlePasswordChange = (ev) => this.setState({
    password: ev.target.value,
  });

  handleKeyChange = (ev) => this.setState({
    key: ev.target.value,
  });

  static getDerivedStateFromProps(props, state) {
    const { password, key } = state;
    if (!password || !key) {
      return {
        hint: "",
        result: "",
      };
    }

    return {
      hint: window.genpass(password, "foo").substr(0, 6),
      result: window.genpass(password, key),
    };
  }

  resetState = () => this.setState({
    password: "",
    key: "",
  });
}

export default App;
