import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.username = '';
    this.newGrumbleCount = 0;
    this.loggedIn = false;
  }

  onUpdateUsername(username) {
  	this.username = username.trim();
  }

  onUpdateNewGrumbleCount(count) {
  	this.newGrumbleCount = count;
  }
}

export default alt.createStore(HomeStore);