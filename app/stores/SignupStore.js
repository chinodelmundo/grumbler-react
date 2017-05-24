import alt from '../alt';
import SignupActions from '../actions/SignupActions';

class SignupStore {
  constructor() {
    this.bindActions(SignupActions);
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

export default alt.createStore(SignupStore);