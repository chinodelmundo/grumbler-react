import alt from '../alt';
import UserPageActions from '../actions/UserPageActions';

class UserPageStore {
  constructor() {
    this.bindActions(UserPageActions);
    this.pageOwner = {
    	username: '',
    	signUpDate: '',
      description: ''
    };
    this.showDescTextArea = false;
    this.description = '';
  }

  onGetUserInfoSuccess(data) {
  	this.pageOwner.username = data.username;
    this.pageOwner.signUpDate = data.signUpDate;
    this.pageOwner.description = data.description;
    this.description = data.description;
  }

  onShowDescTextarea(){
    this.showDescTextArea = true;
  }

  onUpdateDescription(event){
    this.description = event.target.value;
  }

  onActionSuccess(){
    UserPageActions.getUserInfo(this.pageOwner.username);
    this.showDescTextArea = false;
  }
}

export default alt.createStore(UserPageStore);