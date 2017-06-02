import alt from '../alt';
import GrumbleFormActions from '../actions/GrumbleFormActions';
import GrumbleStreamActions from '../actions/GrumbleStreamActions';

class GrumbleFormStore {
  constructor() {
    this.bindActions(GrumbleFormActions);
    this.text = '';
    this.annoyanceLevel = 0;
  }

  onUpdateText(event) {
    this.text = event.target.value;
  }

  onUpdateAnnoyanceLevel(event) {
    this.annoyanceLevel = event.target.value;
  }

  onAddGrumbleSuccess() {
    this.username = '';
    this.text = '';
    this.annoyanceLevel = 0;

    GrumbleStreamActions.getGrumbles();
  }

  onClearGrumbleForm() {
    this.text = '';
    this.annoyanceLevel = 0;
  }
}

export default alt.createStore(GrumbleFormStore);