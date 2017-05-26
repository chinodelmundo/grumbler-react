import React from 'react';
import {Link} from 'react-router';
import SignupStore from '../stores/SignupStore'
import SignupActions from '../actions/SignupActions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = SignupStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SignupStore.listen(this.onChange);
  }

  componentWillUnmount() {
    SignupStore.unlisten(this.onChange);
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
                  <legend> Sign Up Form</legend>
                    <div className="pure-control-group">
                        <label>Username</label>
                        <input name="username" type="text" placeholder="Username" 
                          value={this.state.username} onChange={SignupActions.updateUsername} autofocus />
                    </div>

                    <div className="pure-control-group">
                        <label>Password</label>
                        <input name="password" type="password" placeholder="Password" 
                          value={this.state.password} onChange={SignupActions.updatePassword} />
                    </div>

                    <div className="pure-controls">
                        <button type="submit" className="pure-button pure-button-primary">Sign up</button>
                        <Link to={"/login"}> Login </Link>
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