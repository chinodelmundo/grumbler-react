import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.username = '';
    this.password = '';
    this.message = '';
  }

  onUpdateUsername(event) {
    this.username = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }
}

export default alt.createStore(LoginStore);