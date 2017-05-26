import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);
    this.username = '';
    this.authenticated = false;
  }
  onGetUserSuccess(username) {
    this.username = username;
    this.authenticated = true;
  }
}

export default alt.createStore(AppStore);