import alt from '../alt';
import UserPageActions from '../actions/UserPageActions';

class UserPageStore {
  constructor() {
    this.bindActions(UserPageActions);
    this.pageOwner = {
    	username: '',
    	signUpDate: ''
    }
    this.grumbles = [];
    this.commentForms = [];
    this.hideComments = [];
  }

  onGetUserInfoSuccess(data) {
  	this.pageOwner.username = data.username;
    this.pageOwner.signUpDate = data.signUpDate;
  }

  onGetUserGrumblesSuccess(grumbles) {
    this.commentForms = [];
    this.grumbles = grumbles;

    for(let i = 0; i < grumbles.length; i++){
      	this.commentForms.push({
        	username: '',
        	text: ''
      	});
      	this.hideComments.push(false);
    }
  }

  onUpdateCommentFormUsername(data) {
    this.commentForms[data.index].username = data.event.target.value.trim();
  }

  onUpdateCommentFormText(data) {
    this.commentForms[data.index].text = data.text;
  }

  onAddCommentSuccess() {
    UserPageActions.getUserGrumbles(this.pageOwner.username);
  }

  onHideComments(index){
    this.hideComments[index] = !this.hideComments[index];
  }
}

export default alt.createStore(UserPageStore);