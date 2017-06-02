import alt from '../alt';
import UserPageActions from '../actions/UserPageActions';

class UserPageStore {
  constructor() {
    this.bindActions(UserPageActions);
    this.pageOwner = {
    	username: '',
    	signUpDate: ''
    }
  }

  onGetUserInfoSuccess(data) {
  	this.pageOwner.username = data.username;
    this.pageOwner.signUpDate = data.signUpDate;
  }
}

export default alt.createStore(UserPageStore);