import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  	constructor() {
    	this.bindActions(AppActions);
    	this.username = '';
    	this.authenticated = false;
    	this.imgLink = '';
  	}

  	onGetUserSuccess(user) {
    	this.username = user.username;
    	this.authenticated = true;
    	this.imgLink = user.imgLink;
  	}
}

export default alt.createStore(AppStore);