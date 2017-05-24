import alt from '../alt';
import GrumbleStreamActions from '../actions/GrumbleStreamActions';

class GrumbleStreamStore {
  constructor() {
    this.bindActions(GrumbleStreamActions);
    this.grumbles = [];
    this.commentForms = [];
    this.hideComments = [];
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

  onGetGrumblesFail(grumbles) {
    this.grumbles = grumbles;
  }

  onUpdateCommentFormUsername(data) {
    this.commentForms[data.index].username = data.event.target.value.trim();
  }

  onUpdateCommentFormText(data) {
    this.commentForms[data.index].text = data.event.target.value;
  }

  onHideComments(index){
    this.hideComments[index] = !this.hideComments[index];
  }
}

export default alt.createStore(GrumbleStreamStore);