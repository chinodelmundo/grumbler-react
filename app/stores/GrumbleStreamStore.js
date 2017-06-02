import alt from '../alt';
import GrumbleStreamActions from '../actions/GrumbleStreamActions';

class GrumbleStreamStore {
  constructor() {
    this.bindActions(GrumbleStreamActions);
    this.grumbles = [];
    this.commentForms = [];
    this.hideComments = [];
    this.empathized = [];
    this.pageOwner = '';
  }

  onGetGrumblesSuccess(grumbles) {
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

  onHideComments(index){
    this.hideComments[index] = !this.hideComments[index];
    console.log(this);
  }

  onSetPageOwner(username){
    this.pageOwner = username;
  }

  onActionSuccess(){
    GrumbleStreamActions.updateGrumbles(this.grumbles.length, this.pageOwner);
  }
}

export default alt.createStore(GrumbleStreamStore);