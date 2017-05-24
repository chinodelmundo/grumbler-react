import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore'
import LoginActions from '../actions/LoginActions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <div className="error-message">
          {this.state.message}
        </div>
        <div className="center-content">
          <div className="login-panel">
            <form className="pure-form pure-form-aligned" method="POST">
                <fieldset>
                  <legend> Login Form</legend>
                    <div className="pure-control-group">
                        <label>Username</label>
                        <input name="username" type="text" placeholder="Username" 
                          value={this.state.username} onChange={LoginActions.updateUsername} />
                    </div>

                    <div className="pure-control-group">
                        <label>Password</label>
                        <input name="password" type="password" placeholder="Password" 
                          value={this.state.password} onChange={LoginActions.updatePassword} />
                    </div>

                    <div className="pure-controls">
                        <button type="submit" className="pure-button pure-button-primary">Login</button>
                        <a href="/signup"> Sign Up </a>
                    </div>
                </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;